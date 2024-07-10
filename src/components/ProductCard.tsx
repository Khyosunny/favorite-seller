import styled from 'styled-components';
import { ProductType } from '../types/products';
import { HeartFilledIcon, HeartLinedIcon } from '../assets';
import { useNavigate } from 'react-router-dom';

interface Props {
  product: ProductType;
  onToggleFavorite: (sellerId: string, favorite: boolean) => void;
}

const ProductCard = ({ product, onToggleFavorite }: Props) => {
  const navigate = useNavigate();

  const handleClickSellerName = (seller: string) => {
    navigate(`/seller/${seller}`);
  };

  const handleClickProductName = (name: string) => {
    navigate(`/product/${name}`);
  };

  return (
    <Card>
      <SellerRow>
        <p onClick={() => handleClickSellerName(product.seller)}>
          {product.seller}
        </p>
        <p onClick={() => onToggleFavorite(product.seller, product.favorite)}>
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
        </p>
      </SellerRow>
      <p onClick={() => handleClickProductName(product.name)}>{product.name}</p>
      <p>{product.price.toLocaleString()}원</p>
    </Card>
  );
};

export default ProductCard;

const Card = styled.div`
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

const IconBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 2px;
  color: #ff5a5a;
`;

const Text = styled.p<{ $color?: string }>`
  transform: translateY(-1px);
  font-size: 14px;
  color: ${({ $color }) => $color || 'black'};
`;
