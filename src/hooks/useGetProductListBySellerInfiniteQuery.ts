import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getProductListBySeller } from '../apis';
import { useMemo } from 'react';
import { queryKeys } from '../apis/querykeys';

const useGetProductListBySellerInfiniteQuery = (seller: string) => {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
    queryKey: queryKeys.productListBySeller(seller),
    queryFn: ({ pageParam = 0 }) => getProductListBySeller(seller, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextData ?? undefined,
    refetchOnWindowFocus: false,
  });

  const productList = useMemo(
    () => data?.pages.flatMap((data) => data.result) || [],
    [data?.pages],
  );

  return {
    productList,
    fetchNextPage,
    hasNextPage,
  };
};

export default useGetProductListBySellerInfiniteQuery;
