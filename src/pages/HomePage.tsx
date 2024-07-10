import useGetAllProductListInfiniteQuery from '../hooks/useGetAllProductListInfiniteQuery';
import styled from 'styled-components';
import useFavoriteSellerController from '../hooks/useFavoriteSellerController';
import { queryKeys } from '../apis/querykeys';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import MoreButton from '../components/MoreButton';

const HomePage = () => {
  const navigate = useNavigate();
  const { productList, fetchNextPage, hasNextPage } =
    useGetAllProductListInfiniteQuery();
  const { onToggleFavorite } = useFavoriteSellerController(
    queryKeys.allProductList,
  );

  const onClickSellerName = (seller: string) => {
    navigate(`/seller/${seller}`);
  };

  const onClickProductName = (productName: string) => {
    navigate(`/product/${productName}`);
  };

  const handleClickMoreButton = () => {
    fetchNextPage();
  };

  return (
    <Wrapper>
      {productList.map((product, index) => {
        return (
          <ProductCard
            key={`${product.name}_${product.seller}_${index}`}
            product={product}
            onToggleFavorite={onToggleFavorite}
            onClickSellerName={onClickSellerName}
            onClickProductName={onClickProductName}
          />
        );
      })}
      {hasNextPage && <MoreButton onClick={handleClickMoreButton} />}
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
