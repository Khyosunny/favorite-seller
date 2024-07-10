import styled from 'styled-components';

interface Props {
  onClick: () => void;
}

const MoreButton = ({ onClick }: Props) => {
  return <Button onClick={onClick}>더보기</Button>;
};

export default MoreButton;

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
