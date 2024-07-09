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

  const updateFavoriteInCache = (newSeller: string, isFavorite: boolean) => {
    queryClient.setQueryData<InfiniteData<ResponseType<ProductType[]>>>(
      queryKey,
      (oldData) => {
        if (!oldData) return oldData;

        const newPages = oldData.pages.map((page) => {
          const newResult = page.result.map((item) => {
            if (item.seller === newSeller) {
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

  const { mutate: postFavoriteSellerMutate } = useMutation<
    string,
    AxiosError,
    string,
    { previousProductList: ProductType[] | undefined }
  >({
    mutationFn: postFavoriteSeller,
    onMutate: async (newSeller) => {
      await queryClient.cancelQueries({ queryKey });
      const previousProductList = getPreviousProductList();

      updateFavoriteInCache(newSeller, true);

      return { previousProductList };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (err, newSeller, context) => {
      if (context?.previousProductList) {
        updateFavoriteInCache(newSeller, false);
      }
    },
  });

  const { mutate: deleteFavoriteSellerMutate } = useMutation<
    string,
    AxiosError,
    string,
    { previousProductList: ProductType[] | undefined }
  >({
    mutationFn: deleteFavoriteSeller,
    onMutate: async (sellerToDelete) => {
      await queryClient.cancelQueries({ queryKey });
      const previousProductList = getPreviousProductList();

      updateFavoriteInCache(sellerToDelete, false);

      return { previousProductList };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (err, sellerToDelete, context) => {
      if (context?.previousProductList) {
        updateFavoriteInCache(sellerToDelete, true);
      }
    },
  });

  const onToggleFavorite = (seller: string, favorite: boolean) => {
    if (favorite) {
      deleteFavoriteSellerMutate(seller);
    } else {
      postFavoriteSellerMutate(seller);
    }
  };

  return {
    onToggleFavorite,
  };
};

export default useFavoriteSellerController;
