import React, { useEffect } from 'react';
import { ModalBox, ModalElement } from './styled';
import { FaTimes } from 'react-icons/fa';
import { IoMdCreate } from 'react-icons/io';
import { Agenda, MessageType } from '@/common/types';
import { MemberState, MessageEnum } from '@/common/enums';

interface ModalProps {
  isVisible: boolean;
  message: MessageType;
  deleteHandler: Function;
  editHandler: Function;
  // socket: SocketIOClient.Socket; // Add socket prop
}

const Modal: React.FC<ModalProps> = ({
  isVisible,
  message,
  deleteHandler,
  editHandler,
}) => {
  const onClickDelete = () => deleteHandler();
  const onClickEdit = () => editHandler();

  return (
    <ModalBox isVisible={isVisible}>
      <ModalElement onClick={onClickDelete}>
        <FaTimes style={{ marginRight: '8px' }} /> 삭제
      </ModalElement>
      <ModalElement onClick={onClickEdit}>
        <IoMdCreate style={{ marginRight: '8px' }} /> 수정
      </ModalElement>
    </ModalBox>
  );
};

export default Modal;
