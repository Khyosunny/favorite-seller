import { useSuspenseQuery } from '@tanstack/react-query';
import { getProductDetailByName } from '../apis';
import { queryKeys } from '../apis/querykeys';

const useGetProductDetailByNameQuery = (name: string) => {
  return useSuspenseQuery({
    queryKey: queryKeys.productDetailByName(name),
    queryFn: () => getProductDetailByName(name),
    refetchOnWindowFocus: false,
  });
};

export default useGetProductDetailByNameQuery;
