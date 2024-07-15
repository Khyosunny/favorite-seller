import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFavoriteSeller, postFavoriteSeller } from '../apis';

const useFavoriteSellerController = (queryKey: ReadonlyArray<unknown>) => {
  const queryClient = useQueryClient();

  const { mutate: postFavoriteSellerMutate } = useMutation({
    mutationFn: postFavoriteSeller,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const { mutate: deleteFavoriteSellerMutate } = useMutation({
    mutationFn: deleteFavoriteSeller,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
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
