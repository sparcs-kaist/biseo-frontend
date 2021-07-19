import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { Agenda } from '@/common/types';
import { AgendaStatus } from '@/common/enums';
import BiseoButton from '@/components/BiseoButton';
import { AgendaContainer, AgendaContent } from './styled';

interface Props extends Agenda {
  socket: SocketIOClient.Socket;
}

interface AgendaTerminateResponse {
  success: boolean;
}

interface AgendaStartResponse {
  success: boolean;
}

interface AgendaEditResponse {
  success: boolean;
}

const AdminAgenda: React.FC<Props> = ({
  _id,
  title,
  content,
  subtitle,
  choices,
  expires,
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
    (_id: string) => {
      socket.emit('admin:start', { _id }, (res: AgendaStartResponse) => {
        if (res.success) toast.success('🦄 Agenda Start Successfully!');
        else toast.error('Agenda Start Error!');
      });
    },
    [socket]
  );

  const onClickProgressAgenda = useCallback(
    (_id: string) => {
      socket.emit(
        'admin:terminates',
        { _id },
        (res: AgendaTerminateResponse) => {
          if (res.success) toast.success('🦄 Agenda terminated Successfully!');
          else toast.error('Error while terminating agenda!');
        }
      );
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

  const onClickAdminEdit = useCallback(
    (_id, title, content, subtitle, choices): void => {
      socket.emit(
        'admin:edit',
        _id,
        { title, content, subtitle, choices },
        (res: AgendaEditResponse) => {
          if (res.success) toast.success('🦄 Agenda edited Successfully!');
          else toast.error('Agenda Edition Error!');
        }
      );
    },
    [socket]
  );

  return (
    <AgendaContainer>
      <AgendaContent>
        {title}
        <BiseoButton
          onClick={() =>
            onClickAdminEdit(_id, title, content, subtitle, choices)
          }
        >
          수정
        </BiseoButton>
        <BiseoButton {...buttonProps()} onClick={onClickAdminAgenda}>
          {buttonText()}
        </BiseoButton>
      </AgendaContent>
    </AgendaContainer>
  );
};

export default AdminAgenda;
