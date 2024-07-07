import { useNavigate } from 'react-router-dom';
import useGetAllProductListInfiniteQuery from '../hooks/useGetAllProductListInfiniteQuery';
import styled from 'styled-components';
import useFavoriteController from '../hooks/useFavoriteController';
import heartFilledIcon from '../assets/heart-filled.svg';
import heartLinedIcon from '../assets/heart-lined.svg';

const HomePage = () => {
  const navigate = useNavigate();
  const { data, fetchNextPage, hasNextPage, favoriteList } =
    useGetAllProductListInfiniteQuery();
  const { postSellerMutate, deleteSellerMutate } = useFavoriteController();

  const handleClickSellerName = (seller: string) => {
    navigate(`/seller/${seller}`);
  };

  const handleClickProductName = (name: string) => {
    navigate(`/product/${name}`);
  };

  const handleClickMoreButton = () => {
    fetchNextPage();
  };

  const handleClickFavorite = (seller: string) => {
    if (!data) return;
    if (favoriteList.includes(seller)) {
      deleteSellerMutate(seller);
    } else {
      postSellerMutate(seller);
    }
  };

  return (
    <Wrapper>
      {data?.pages.map((page) => {
        return page.result.map((product, index) => {
          return (
            <Item key={`${product.name}_${product.seller}_${index}`}>
              <SellerRow>
                <p onClick={() => handleClickSellerName(product.seller)}>
                  {product.seller}
                </p>
                <p onClick={() => handleClickFavorite(product.seller)}>
                  {favoriteList.includes(product.seller) ? (
                    <img src={heartFilledIcon} width={20} />
                  ) : (
                    <img src={heartLinedIcon} width={20} />
                  )}
                </p>
              </SellerRow>
              <p onClick={() => handleClickProductName(product.name)}>
                {product.name}
              </p>
              <p>{product.price.toLocaleString()}원</p>
            </Item>
          );
        });
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
