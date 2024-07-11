import styled from 'styled-components';
import useGetProductListBySellerInfiniteQuery from '../hooks/useGetProductListBySellerInfiniteQuery';
import useFavoriteSellerController from '../hooks/useFavoriteSellerController';
import { queryKeys } from '../apis/querykeys';
import ProductCard from '../components/ProductCard';
import { useNavigate, useParams } from 'react-router-dom';
import MoreButton from '../components/MoreButton';

const ProductListBySellerPage = () => {
  const { seller } = useParams<{ seller: string }>();
  const navigate = useNavigate();
  const { productList, fetchNextPage, hasNextPage } =
    useGetProductListBySellerInfiniteQuery(seller ?? '');
  const { onToggleFavorite } = useFavoriteSellerController(
    queryKeys.productListBySeller(seller ?? ''),
  );

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
            onClickProductName={onClickProductName}
          />
        );
      })}
      {hasNextPage && <MoreButton onClick={handleClickMoreButton} />}
    </Wrapper>
  );
};

export default ProductListBySellerPage;

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
