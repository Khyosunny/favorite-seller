import { useMutation } from '@tanstack/react-query';
import { deleteSeller, postSeller } from '../apis';
import { favoriteAtom } from '../state/products';
import { useSetRecoilState } from 'recoil';

const useFavoriteController = () => {
  const setFavoriteList = useSetRecoilState(favoriteAtom);
  const { mutate: postSellerMutate } = useMutation({
    mutationFn: postSeller,
    onSuccess: (_, variables) => {
      setFavoriteList((prev) => {
        return prev.includes(variables) ? prev : [...prev, variables];
      });
    },
  });

  const { mutate: deleteSellerMutate } = useMutation({
    mutationFn: deleteSeller,
    onSuccess: (_, variables) => {
      setFavoriteList((prev) => {
        return prev.filter((seller) => seller !== variables);
      });
    },
  });

  return {
    postSellerMutate,
    deleteSellerMutate,
  };
};

export default useFavoriteController;
