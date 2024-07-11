import styled from 'styled-components';
import { ProductType } from '../types/products';
import { HeartFilledIcon, HeartLinedIcon } from '../assets';

interface Props {
  product: ProductType;
  onToggleFavorite: (sellerId: string, favorite: boolean) => void;
  onClickProductName?: (productName: string) => void;
  onClickSellerName?: (seller: string) => void;
}

const ProductCard = ({
  product,
  onToggleFavorite,
  onClickSellerName,
  onClickProductName,
}: Props) => {
  return (
    <Card>
      <SellerRow>
        <p onClick={() => onClickSellerName?.(product.seller)}>
          {product.seller}
        </p>
        <div onClick={() => onToggleFavorite(product.seller, product.favorite)}>
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
      <p onClick={() => onClickProductName?.(product.name)}>{product.name}</p>
      <p>{product.price.toLocaleString()}원</p>
    </Card>
  );
};

export default ProductCard;

const Card = styled.div`
  width: 100%;
  max-width: 400px;
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
