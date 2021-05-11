import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { Agenda } from '@/common/types';
import { AgendaStatus } from '@/common/enums';
import BiseoButton from '@/components/BiseoButton';
import { AgendaContainer, AgendaContent } from './styled';

interface Props extends Agenda {
  socket: SocketIOClient.Socket;
}

interface AgendaExpireResponse {
  success: boolean;
}

interface AgendaStartResponse {
  success: boolean;
}

const AdminAgenda: React.FC<Props> = ({
  _id,
  title,
  subtitle,
  content,
  choices,
  expires,
  votesCountMap,
  userChoice,
  status,
  socket,
}) => {
  const active = Date.now() < Date.parse(expires);
  const buttonProps = () => {
    if (active) {
      if (status == AgendaStatus.PREPARE)
        return { background: '#f2a024', foreground: '#ffffff' };
      else if (status == AgendaStatus.PROGRESS) return {};
    } else {
      return { disabled: true };
    }
  };

  const buttonText = () => {
    if (active) {
      if (status == AgendaStatus.PREPARE) return '시작하기';
      else if (status == AgendaStatus.PROGRESS) return '종료하기';
    } else {
      return '종료됨';
    }
  };

  const onClickPrepareAgenda = useCallback(
    (_id: String) => {
      socket.emit('admin:start', { _id }, (res: AgendaStartResponse) => {
        if (res.success) toast.success('🦄 Agenda Start Successfully!');
        else toast.error('Agenda Start Error!');
      });
    },
    [socket]
  );

  const onClickProgressAgenda = useCallback(
    (_id: String) => {
      socket.emit('admin:expires', { _id }, (res: AgendaExpireResponse) => {
        if (res.success) toast.success('🦄 Agenda Expired Successfully!');
        else toast.error('Agenda expire Error!');
      });
    },
    [socket]
  );

  const onClickAdminAgenda = () => {
    if (status == AgendaStatus.PREPARE) {
      onClickPrepareAgenda(_id);
    } else if (status == AgendaStatus.PROGRESS) {
      onClickProgressAgenda(_id);
    } else {
      return;
    }
  };

  return (
    <AgendaContainer>
      <AgendaContent>
        {title}
        <BiseoButton {...buttonProps()} onClick={onClickAdminAgenda}>
          {buttonText()}
        </BiseoButton>
      </AgendaContent>
    </AgendaContainer>
  );
};

export default AdminAgenda;
