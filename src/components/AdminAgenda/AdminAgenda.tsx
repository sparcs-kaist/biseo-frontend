import React, { useCallback, useState, useEffect, Fragment } from 'react';
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
import AgendaVoteStateView from './AgendaVoteStateView';

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
  participants,
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
  const [isVisibleState, setIsVisibleState] = useState<boolean>(false);
  const [votesMap, setVotesMap] = useState<Record<string, string[]>>(
    votesCountMap
  );

  useEffect(() => {
    if (votesCountMap) {
      // console.log("VOTESCOUNTMAP", votesCountMap);
      setVotesMap(votesCountMap);
    }
  }, [votesCountMap]);

  useEffect(() => {
    if (status === AgendaStatus.PROGRESS) {
      socket.on('agenda:voted', ({ agendaId, username, choice }) => {
        if (agendaId === _id) {
          setNotVote(l => l.filter(_n => _n !== username));

          setVotesMap(votesMap => ({
            ...votesMap,
            [choice]: [...votesMap[choice], username],
          }));
          //console.log(votesMap[choice]);
        }
      });
    } else {
      socket.off('agenda:voted');
    }

    return () => {
      socket.off('agenda:voted');
    };
  }, [status, setVotesMap, setNotVote]);

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
      socket.emit('admin:start', _id, (res: AgendaResponse) => {
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

  const onClickAgendaHurry = e => {
    e.stopPropagation();
    if (status === AgendaStatus.PROGRESS) {
      socket.emit('admin:hurry', { _id }, (res: AgendaResponse) => {
        if (res.success) toast.success('🦄 Agenda Hurried Successfully!');
        else toast.error('Error while Hurrying agenda!');
      });
    } else {
      return;
    }
  };

  const totalParticipants = participants.length;

  const voteResultMessage =
    votesMap && Object.keys(votesMap).length > 0
      ? '중 ' +
        Object.entries(votesMap)
          .map(([choice, voters]) => `${choice} ${voters.length}명`)
          .join(', ')
      : '';

  return (
    <AgendaContainer onClick={onClick} detailed={showDetails}>
      <AgendaContentLeft>
        <ActiveContainerTitle detailed={showDetails}>
          {title}
        </ActiveContainerTitle>
        <ActiveContainerProgress detailed={showDetails}>
          {`재석 ${totalParticipants}명 ${voteResultMessage}`}
        </ActiveContainerProgress>
        {showDetails && (
          <>
            <ActiveContainerContent>
              {content.split('\n').map((line, i) => {
                return (
                  <Fragment key={i}>
                    {line}
                    <br />
                  </Fragment>
                );
              })}
            </ActiveContainerContent>
            <ActiveContainerSubtitle>{subtitle}</ActiveContainerSubtitle>
            <AgendaNotVote
              onClick={e => {
                e.stopPropagation();
                setIsVisibleState(true);
              }}
            >
              {`${notVoteList.length}명이 아직 투표하지 않음`}
              <AgendaNotVoteList>
                {notVoteList.map((ppl, index) => {
                  if (index == 0) return `${ppl}`;
                  else return `, ${ppl}`;
                })}
              </AgendaNotVoteList>
              <span style={{ fontSize: '0.5rem' }}>&nbsp;(자세히)</span>
            </AgendaNotVote>
          </>
        )}
      </AgendaContentLeft>
      <AgendaButton>
        <BiseoButton {...buttonProps()} onClick={onClickAdminAgenda}>
          {buttonText()}
        </BiseoButton>
        <BiseoButton {...buttonProps()} onClick={onClickAgendaHurry}>
          {'독촉'}
        </BiseoButton>
        <EditIcon onClick={onClickEditIcon} style={{ cursor: 'pointer' }} />
      </AgendaButton>
      <AgendaVoteStateView
        visible={isVisibleState}
        setVisible={setIsVisibleState}
        voterCountMap={votesMap}
        notVoteList={notVoteList}
      />
    </AgendaContainer>
  );
};

export default AdminAgenda;
