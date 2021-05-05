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
  // const active = Date.now() < Date.parse(expires);
  const active = status == AgendaStatus.PROGRESS;
  const buttonProps = () => {
    switch (status) {
      case AgendaStatus.PREPARE:
        return {};
      case AgendaStatus.PROGRESS:
        return { background: '#f2a024', foreground: '#ffffff' };
      case AgendaStatus.END:
        return { disabled: true };
      default:
        return {};
    }
  };

  const buttonText = status || AgendaStatus.PROGRESS;

  const onClickPrepareAgenda = useCallback(() => {
    console.log('next');
  }, []);

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
      return onClickPrepareAgenda;
    } else if (status == AgendaStatus.PROGRESS) {
      return onClickProgressAgenda(_id);
    } else {
      return;
    }
  };

  return (
    <AgendaContainer>
      <AgendaContent>
        {title}
        <BiseoButton {...buttonProps()} onClick={onClickAdminAgenda}>
          {buttonText}
        </BiseoButton>
      </AgendaContent>
    </AgendaContainer>
  );
};

export default AdminAgenda;
