import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';
import styled from 'styled-components';

interface Props {
  isChecked: boolean;
  onCheck: () => void;
}

function ChaeckIconButton({ isChecked, onCheck }: Props) {
  return (
    <ChaeckIconButtonStyle onClick={onCheck}>
      {isChecked ? <FaRegCheckCircle /> : <FaRegCircle />}
    </ChaeckIconButtonStyle>
  );
}

const ChaeckIconButtonStyle = styled.button`
  background: none;
  border: 0;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export default ChaeckIconButton;
