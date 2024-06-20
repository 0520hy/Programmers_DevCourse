import React, { useEffect, useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import { createPortal } from 'react-dom';

interface Props {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

function Modal({children, isOpen, onClose} : Props) {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const handleClose = () => {
        onClose();
    }
    
    const handleOverlayClick = (e:React.MouseEvent) => {
        if ( modalRef.current && !modalRef.current.contains(e.target as Node)){
            handleClose();
        }
    }

    const handlleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape"){
            handleClose();
        }
    }
    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", handlleKeyDown);
        } else {
            window.removeEventListener("keydown", handlleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handlleKeyDown);
        }
    }, [isOpen]);

    if (!isOpen) return null;

  return createPortal(
  
    <ModalStyle onClick={handleOverlayClick}>
    <div className="modal-body" ref={modalRef}>
      <div className="modal-contents">{children}</div>
      <button className="modal-close" onClick={handleClose}>
          <FaPlus/>
      </button>
    </div>
  </ModalStyle>
   , document.body
  )
}

const ModalStyle = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.6);

    .modal-body {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 56px 32px 32px;
        border-radius: ${({ theme }) => theme.borderRadius.default};
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

        background-color: #fff;
        max-width: 80%;
    }

    .modal-close {
        border: none;
        background-color: transparent;
        cursor: pointer;

        position: absolute;
        top: 0;
        right: 0;
        padding: 12px;

        svg {
            width: 20px;
            height: 20px;
            transform: rotate(45deg);
        }
    }
`;

export default Modal;