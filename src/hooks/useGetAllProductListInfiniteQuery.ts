import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getAllProductList } from '../apis';
import { useMemo } from 'react';
import { queryKeys } from '../apis/querykeys';

const useGetAllProductListInfiniteQuery = () => {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
    queryKey: queryKeys.allProductList,
    queryFn: ({ pageParam = 0 }) => getAllProductList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextData ?? undefined,
    refetchOnWindowFocus: false,
  });

  const allProductList = useMemo(
    () => data.pages.flatMap((data) => data.result),
    [data.pages],
  );

  return {
    allProductList,
    fetchNextPage,
    hasNextPage,
  };
};

export default useGetAllProductListInfiniteQuery;
