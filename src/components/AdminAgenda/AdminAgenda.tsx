import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { Agenda } from '@/common/types';
import { AgendaStatus } from '@/common/enums';
import BiseoButton from '@/components/BiseoButton';
import {
  AgendaContainer,
  AgendaContent,
  AgendaButton,
  AgendaContentLeft,
} from './styled';
import {
  ActiveContainerTitle,
  ActiveContainerProgress,
  ActiveContainerContent,
} from '../UserAgenda/styled';
import EditIcon from './Edit.svg';

interface Props extends Agenda {
  socket: SocketIOClient.Socket;
  onEdit: (_id: string) => void;
}

interface AgendaResponse {
  success: boolean;
}

const AdminAgenda: React.FC<Props> = ({
  _id,
  title,
  content,
  subtitle,
  choices,
  expires,
  votesCountMap,
  status,
  socket,
  onEdit,
}) => {
  const active = Date.now() < Date.parse(expires);
  const buttonProps = () => {
    if (active) {
      if (status === AgendaStatus.PREPARE)
        return { background: '#f2a024', foreground: '#ffffff' };
      else if (status === AgendaStatus.PROGRESS) return {};
    } else {
      return { disabled: true };
    }
  };

  const buttonText = () => {
    if (active) {
      if (status === AgendaStatus.PREPARE) return '시작하기';
      else if (status === AgendaStatus.PROGRESS) return '종료하기';
    } else {
      return '종료됨';
    }
  };

  const [showDetails, setShowDetails] = React.useState(false);
  const onClick = () => {
    setShowDetails(!showDetails);
  };

  const onClickPrepareAgenda = useCallback(
    (_id: string) => {
      socket.emit('admin:start', { _id }, (res: AgendaResponse) => {
        if (res.success) toast.success('🦄 Agenda Start Successfully!');
        else toast.error('Agenda Start Error!');
      });
    },
    [socket]
  );

  const onClickProgressAgenda = useCallback(
    (_id: string) => {
      socket.emit('admin:terminates', { _id }, (res: AgendaResponse) => {
        if (res.success) toast.success('🦄 Agenda terminated Successfully!');
        else toast.error('Error while terminating agenda!');
      });
    },
    [socket]
  );

  const onClickAdminAgenda = e => {
    e.stopPropagation();
    if (status === AgendaStatus.PREPARE) {
      onClickPrepareAgenda(_id);
    } else if (status === AgendaStatus.PROGRESS) {
      onClickProgressAgenda(_id);
    } else {
      return;
    }
  };

  const onClickEditIcon = e => {
    e.stopPropagation();
    onEdit(_id);
  };

  const totalParticipants = votesCountMap
    ? Object.values(votesCountMap).reduce((sum, count) => sum + count, 0)
    : 0;

  const voteResultMessage =
    votesCountMap && Object.keys(votesCountMap).length > 0
      ? '중 ' +
        Object.entries(votesCountMap)
          .sort()
          .map(([choice, count]) => `${choice} ${count}명`)
          .join(', ')
      : '';

  return showDetails ? (
    <AgendaContainer onClick={onClick} detailed={showDetails}>
      <AgendaContentLeft>
        <ActiveContainerTitle>{title}</ActiveContainerTitle>
        <ActiveContainerProgress>
          {`재석 ${totalParticipants}명 ${voteResultMessage}`}
        </ActiveContainerProgress>
        <ActiveContainerContent>{content}</ActiveContainerContent>
      </AgendaContentLeft>
      <AgendaButton>
        <BiseoButton {...buttonProps()} onClick={onClickAdminAgenda}>
          {buttonText()}
        </BiseoButton>
        <EditIcon onClick={onClickEditIcon} style={{ cursor: 'pointer' }} />
      </AgendaButton>
    </AgendaContainer>
  ) : (
    <AgendaContainer onClick={onClick} detailed={showDetails}>
      <AgendaContent>
        {title}
        <AgendaButton>
          <BiseoButton {...buttonProps()} onClick={onClickAdminAgenda}>
            {buttonText()}
          </BiseoButton>
          <EditIcon onClick={onClickEditIcon} style={{ cursor: 'pointer' }} />
        </AgendaButton>
      </AgendaContent>
    </AgendaContainer>
  );
};

export default AdminAgenda;
