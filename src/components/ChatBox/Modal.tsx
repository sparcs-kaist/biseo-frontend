import React, { useEffect } from 'react';
import { ModalBox, ModalElement } from './styled';
import { FaTimes } from 'react-icons/fa';
import { IoMdCreate } from 'react-icons/io';
import { Agenda, MessageType } from '@/common/types';
import { MemberState, MessageEnum } from '@/common/enums';

interface ModalProps {
  isVisible: boolean;
  message: MessageType;
  socket: SocketIOClient.Socket; // Add socket prop
}

const Modal: React.FC<ModalProps> = ({ isVisible, message, socket }) => {
  const handleDelete = () => {
    // Arbitrary name
    socket.emit('delete:message', message);
    message.type = MessageEnum.MSGDELETED;
  };

  useEffect(() => {
    socket.on('delete:message', (receivedMessage: MessageType) => {
      message.type = MessageEnum.MSGDELETED;
      debugger;
    });
  }, []);

  return (
    <ModalBox isVisible={isVisible}>
      <ModalElement onClick={handleDelete}>
        <FaTimes style={{ marginRight: '8px' }} /> 삭제
      </ModalElement>
      <ModalElement>
        <IoMdCreate style={{ marginRight: '8px' }} /> 수정
      </ModalElement>
    </ModalBox>
  );
};

export default Modal;
