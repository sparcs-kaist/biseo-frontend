import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { Agenda } from '@/common/types';
import { AgendaStatus } from '@/common/enums';
import BiseoButton from '@/components/BiseoButton';
import {
  AgendaContainer,
  AgendaContent,
  AgendaButton,
  AgendaContentLeft,
  AgendaNotVote,
  AgendaNotVoteList,
} from './styled';
import {
  ActiveContainerTitle,
  ActiveContainerProgress,
  ActiveContainerContent,
  ActiveContainerSubtitle,
} from '../UserAgenda/styled';
import EditIcon from './Edit.svg';

interface Props extends Agenda {
  socket: SocketIOClient.Socket;
  onEdit: (_id: string) => void;
}

interface AgendaResponse {
  success: boolean;
}

interface StatusResponse {
  pplWhoDidNotVote: string[];
  agendaId: string;
  agendaTitle: string;
  isExpired: boolean;
}

interface AgendaStatusResponse {
  success: boolean;
  payload: StatusResponse;
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

  const [showDetails, setShowDetails] = useState(false);
  const [notVoteList, setNotVote] = useState<string[]>([]);

  const onClick = () => {
    setShowDetails(!showDetails);
    socket.emit(
      'agenda:status',
      { agendaId: _id },
      (res: AgendaStatusResponse) => {
        if (res.success) setNotVote(res.payload.pplWhoDidNotVote);
      }
    );
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
        <ActiveContainerTitle detailed>{title}</ActiveContainerTitle>
        <ActiveContainerProgress detailed>
          {`재석 ${totalParticipants}명 ${voteResultMessage}`}
        </ActiveContainerProgress>
        <ActiveContainerContent>
          {content.split('\n').map(line => {
            return (
              <>
                {line}
                <br />
              </>
            );
          })}
        </ActiveContainerContent>
        <ActiveContainerSubtitle>{subtitle}</ActiveContainerSubtitle>
        <AgendaNotVote>
          {`${notVoteList.length}명이 아직 투표하지 않음`}
          <AgendaNotVoteList>
            {notVoteList.map((ppl, index) => {
              if (index == 0) return `${ppl}`;
              else return `, ${ppl}`;
            })}
          </AgendaNotVoteList>
        </AgendaNotVote>
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
        <AgendaContentLeft>
          <ActiveContainerTitle>{title}</ActiveContainerTitle>
          <ActiveContainerProgress>
            {`재석 ${totalParticipants}명 ${voteResultMessage}`}
          </ActiveContainerProgress>
        </AgendaContentLeft>
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
