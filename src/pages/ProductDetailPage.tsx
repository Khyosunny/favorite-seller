import styled from 'styled-components';

const ProductDetailPage = () => {
  return (
    <Wrapper>
      <h1>ProductDetailPage</h1>
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
  row-gap: 20px;
  padding: 20px;
`;
