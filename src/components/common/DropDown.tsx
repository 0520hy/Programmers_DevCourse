import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  toggleButton: React.ReactNode;
  isOpen?: boolean;
}
function Dropdown({ children, toggleButton, isOpen = false }: Props) {
  const [open, setOpen] = useState(isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭 다운 닫기
  useEffect(() => {
    function handelOutsideClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    // 드롭 다운 언마운트 시 이벤트 리스너 제거
    document.addEventListener('mousedown', handelOutsideClick);
  }, [dropdownRef]);
  return (
    <DropdownStyle $open={open} ref={dropdownRef}>
      <button className='toggle' onClick={() => setOpen(!open)}>
        {toggleButton}
      </button>
      {open && <div className='panel'>{children}</div>}
    </DropdownStyle>
  );
}

interface DropdownStyleProps {
  $open: boolean;
}
const DropdownStyle = styled.div<DropdownStyleProps>`
  position: relative;

  button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;

    svg {
      width: 30px;
      height: 30px;
      fill: ${({ theme, $open }) =>
        $open ? theme.color.primary : theme.color.text};
    }
  }

  .panel {
    position: absolute;
    top: 40px;
    right: 0;
    padding: 16px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: ${({ theme }) => theme.borderRadius.default};
    z-index: 100;
  }
`;

export default Dropdown;
