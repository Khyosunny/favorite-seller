import { useNavigate } from 'react-router-dom';
import useGetAllProductListInfiniteQuery from '../hooks/useGetAllProductListInfiniteQuery';
import styled from 'styled-components';
import useFavoriteSellerController from '../hooks/useFavoriteSellerController';
import { HeartFilledIcon, HeartLinedIcon } from '../assets';
import { queryKeys } from '../apis/querykeys';

const HomePage = () => {
  const navigate = useNavigate();
  const { allProductList, fetchNextPage, hasNextPage } =
    useGetAllProductListInfiniteQuery();
  const { onToggleFavorite } = useFavoriteSellerController(
    queryKeys.allProductList,
  );

  const handleClickSellerName = (seller: string) => {
    navigate(`/seller/${seller}`);
  };

  const handleClickProductName = (name: string) => {
    navigate(`/product/${name}`);
  };

  const handleClickMoreButton = () => {
    fetchNextPage();
  };

  return (
    <Wrapper>
      {allProductList.map((product, index) => {
        return (
          <Item key={`${product.name}_${product.seller}_${index}`}>
            <SellerRow>
              <p onClick={() => handleClickSellerName(product.seller)}>
                {product.seller}
              </p>
              <p
                onClick={() =>
                  onToggleFavorite(product.seller, product.favorite)
                }
              >
                {product.favorite ? (
                  <HeartFilledIcon width={20} fill="#ff5a5a" />
                ) : (
                  <HeartLinedIcon width={20} />
                )}
              </p>
            </SellerRow>
            <p onClick={() => handleClickProductName(product.name)}>
              {product.name}
            </p>
            <p>{product.price.toLocaleString()}원</p>
          </Item>
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

const Item = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 12px;
  background-color: white;
`;

const SellerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
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
