import useGetAllProductListInfiniteQuery from '../hooks/useGetAllProductListInfiniteQuery';
import styled from 'styled-components';
import useFavoriteSellerController from '../hooks/useFavoriteSellerController';
import { queryKeys } from '../apis/querykeys';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { allProductList, fetchNextPage, hasNextPage } =
    useGetAllProductListInfiniteQuery();
  const { onToggleFavorite } = useFavoriteSellerController(
    queryKeys.allProductList,
  );

  const handleClickMoreButton = () => {
    fetchNextPage();
  };

  return (
    <Wrapper>
      {allProductList.map((product, index) => {
        return (
          <ProductCard
            key={`${product.name}_${product.seller}_${index}`}
            product={product}
            onToggleFavorite={onToggleFavorite}
          />
        );
      })}
      {hasNextPage && <Button onClick={handleClickMoreButton}>더보기</Button>}
    </Wrapper>
  );
};

export default HomePage;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  padding: 20px;
`;

const Button = styled.div`
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
  padding: 6px 8px;
  border-radius: 8px;
`;
