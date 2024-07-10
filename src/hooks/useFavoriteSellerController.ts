import { AxiosError } from 'axios';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteFavoriteSeller, postFavoriteSeller } from '../apis';
import { ProductType, ResponseType } from '../types/products';

const useFavoriteSellerController = (queryKey: ReadonlyArray<unknown>) => {
  const queryClient = useQueryClient();

  const getPreviousProductList = () => {
    const previousQueryData =
      queryClient.getQueryData<InfiniteData<ResponseType<ProductType[]>>>(
        queryKey,
      );
    const previousProductList =
      previousQueryData?.pages.flatMap((page) => page.result) || [];

    return previousProductList;
  };

  const updateFavoriteInCache = (sellerId: string, isFavorite: boolean) => {
    queryClient.setQueryData<InfiniteData<ResponseType<ProductType[]>>>(
      queryKey,
      (oldData) => {
        if (!oldData) return oldData;

        const newPages = oldData.pages.map((page) => {
          const newResult = page.result.map((item) => {
            if (item.seller === sellerId) {
              return { ...item, favorite: isFavorite };
            }
            return item;
          });
          return { ...page, result: newResult };
        });

        return { ...oldData, pages: newPages };
      },
    );
  };

  const onMutate = async (sellerId: string, isFavorite: boolean) => {
    await queryClient.cancelQueries({ queryKey });
    const previousProductList = getPreviousProductList();

    updateFavoriteInCache(sellerId, isFavorite);

    return { previousProductList };
  };

  const onError = (
    err: AxiosError,
    sellerId: string,
    context: { previousProductList: ProductType[] | undefined } | undefined,
    isFavorite: boolean,
  ) => {
    if (context?.previousProductList) {
      updateFavoriteInCache(sellerId, !isFavorite);
    }
  };

  const { mutate: postFavoriteSellerMutate } = useMutation<
    string,
    AxiosError,
    string,
    { previousProductList: ProductType[] | undefined }
  >({
    mutationFn: postFavoriteSeller,
    onMutate: (sellerId) => onMutate(sellerId, true),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError: (err, sellerId, context) => onError(err, sellerId, context, true),
  });

  const { mutate: deleteFavoriteSellerMutate } = useMutation<
    string,
    AxiosError,
    string,
    { previousProductList: ProductType[] | undefined }
  >({
    mutationFn: deleteFavoriteSeller,
    onMutate: (sellerId) => onMutate(sellerId, false),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError: (err, sellerId, context) => onError(err, sellerId, context, false),
  });

  const onToggleFavorite = (sellerId: string, favorite: boolean) => {
    if (favorite) {
      deleteFavoriteSellerMutate(sellerId);
    } else {
      postFavoriteSellerMutate(sellerId);
    }
  };

  return {
    onToggleFavorite,
  };
};

export default useFavoriteSellerController;
