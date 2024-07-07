import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllProductList } from '../apis';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { favoriteAtom } from '../state/products';

const useGetAllProductListInfiniteQuery = () => {
  const [favoriteList, setFavoriteList] = useRecoilState(favoriteAtom);
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['product', 'list'],
    queryFn: ({ pageParam = 0 }) => getAllProductList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextData ?? undefined,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!data || isLoading) return;
    const sellerFavorites: { [key: string]: boolean } = {};

    data.pages.forEach((page) => {
      page.result.forEach((item) => {
        sellerFavorites[item.seller] = item.favorite;
      });
    });

    const newFavoriteList = Object.keys(sellerFavorites).filter(
      (seller) => sellerFavorites[seller],
    );

    setFavoriteList(newFavoriteList);
  }, [data, isLoading, setFavoriteList]);

  return { data, fetchNextPage, hasNextPage, favoriteList };
};

export default useGetAllProductListInfiniteQuery;
