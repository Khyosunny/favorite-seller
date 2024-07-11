import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useGetProductDetailByNameQuery from '../hooks/useGetProductDetailByNameQuery';
import useFavoriteSellerController from '../hooks/useFavoriteSellerController';
import { queryKeys } from '../apis/querykeys';
import { HeartFilledIcon, HeartLinedIcon } from '../assets';

const ProductDetailPage = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { data: product } = useGetProductDetailByNameQuery(name ?? '');
  const { onToggleFavorite } = useFavoriteSellerController(
    queryKeys.productDetailByName(name ?? ''),
  );

  const onClickSellerName = (seller: string) => {
    navigate(`/seller/${seller}`);
  };

  return (
    <Wrapper>
      <Item>
        <Box />
        <InfoBox>
          <SellerRow>
            <p onClick={() => onClickSellerName?.(product.seller)}>
              {product.seller}
            </p>
            <div
              onClick={() => onToggleFavorite(product.seller, product.favorite)}
            >
              {product.favorite ? (
                <IconBox>
                  <HeartFilledIcon width={20} fill="#ff5a5a" />
                  <Text $color="#ff5a5a">관심 셀러</Text>
                </IconBox>
              ) : (
                <IconBox>
                  <HeartLinedIcon width={20} />
                  <Text>관심 셀러</Text>
                </IconBox>
              )}
            </div>
          </SellerRow>
          <Name>{product.name}</Name>
          <Price>{product.price.toLocaleString()}원</Price>
        </InfoBox>
      </Item>
    </Wrapper>
  );
};

export default ProductDetailPage;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 20px;
  padding: 20px;
`;

const Item = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 12px;
  background-color: white;
`;

const Box = styled.div`
  width: 100%;
  height: 300px;
  background-color: #eee;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const SellerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 2px;
  color: #ff5a5a;
`;

const Name = styled.p`
  font-size: 18px;
`;

const Text = styled.p<{ $color?: string }>`
  transform: translateY(-1px);
  font-size: 14px;
  color: ${({ $color }) => $color || 'black'};
`;

const Price = styled.p`
  font-size: 20px;
  align-self: flex-end;
  font-weight: 700;
`;
