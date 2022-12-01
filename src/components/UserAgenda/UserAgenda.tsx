import React, { useState, useEffect, Fragment } from 'react';
import { toast } from 'react-toastify';
import BiseoButton from '@/components/BiseoButton';
import { Agenda } from '@/common/types';
import {
  ActiveContainer,
  ActiveContainerTitle,
  ActiveContainerContent,
  ActiveContainerSubtitle,
  ActiveContainerProgress,
  ButtonGroup,
  InactiveContainer,
} from './styled';
import { AgendaContainer, AgendaContentAll } from '../AdminAgenda/styled';

interface Props extends Agenda {
  socket: SocketIOClient.Socket;
}

const UserAgenda: React.FC<Props> = ({
  _id,
  title,
  subtitle,
  content,
  choices,
  expires,
  votesCountMap,
  userChoice,
  socket,
}) => {
  /* if we're dealing with only single-choice options, we wouldn't have to
   * keep an entire array, but just the currently selected index.
   * here we use an array just for potential use of mult-choice options.
   */
  const [selectedState, setSelectedState] = useState<boolean[]>(
    choices.map(choice => choice === userChoice)
  );
  const [alreadySubmitted, setAlreadySubmitted] = useState<boolean>(
    userChoice !== null
  );
  const [showDetails, setShowDetails] = useState(false);

  const onClick = () => {
    setShowDetails(!showDetails);
  };

  const active = Date.now() < Date.parse(expires);

  const handleChoiceClick = (index: number) => {
    setSelectedState(state =>
      state.map((selected, idx) => (index === idx ? !selected : false))
    );
  };

  const handleSubmit = async () => {
    // get first index containing true
    const selectedIndex = selectedState.findIndex(x => x);

    if (selectedIndex === -1) {
      toast.warning('❌ Please choose an option!');
      return;
    }

    socket.emit(
      'agenda:vote',
      { agendaId: _id, choice: choices[selectedIndex] },
      (res: { success: boolean; message: string }) => {
        if (res.success) toast.success('🎉 Vote Successful!');
        else toast.error(res.message || '알 수 없는 에러가 발생했습니다');
      }
    );

    setAlreadySubmitted(true);
  };

  const totalParticipants = votesCountMap
    ? Object.values(votesCountMap).reduce(
        (sum, voters) => sum + voters.length,
        0
      )
    : 0;

  const voteResultMessage =
    votesCountMap && Object.keys(votesCountMap).length > 0
      ? '중 ' +
        Object.entries(votesCountMap)
          .map(([choice, voters]) => `${choice} ${voters.length}명`)
          .join(', ')
      : '';

  useEffect(() => {
    socket.on('agenda:voted', ({ agendaId }) => {
      if (agendaId !== _id) {
        return;
      }
    });

    return () => {
      socket.off('agenda:voted');
    };
  }, []);

  return active ? (
    <ActiveContainer>
      <ActiveContainerTitle>{title}</ActiveContainerTitle>
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
      <ButtonGroup>
        {choices.map((choice, index) => (
          <BiseoButton
            key={choice}
            // clickable only if user has not submitted
            onClick={() => !alreadySubmitted && handleChoiceClick(index)}
            // use selectedStyle as props if button is selected, use unselectedStyle otherwise
            select={selectedState[index]}
          >
            {choice}
          </BiseoButton>
        ))}

        {/* adding `margin-left: auto` puts the rightmost element at the end */}
        <BiseoButton
          style={{ marginLeft: 'auto' }}
          onClick={handleSubmit}
          disabled={alreadySubmitted}
        >
          제출
        </BiseoButton>
      </ButtonGroup>
    </ActiveContainer>
  ) : showDetails ? (
    <AgendaContainer onClick={onClick} detailed={showDetails}>
      <AgendaContentAll>
        <ActiveContainerTitle detailed>{title}</ActiveContainerTitle>
        <ActiveContainerProgress detailed>
          {`재석 ${totalParticipants}명 ${voteResultMessage}`}
        </ActiveContainerProgress>
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
      </AgendaContentAll>
    </AgendaContainer>
  ) : (
    <InactiveContainer onClick={onClick}>
      <div className="title">{title}</div>
      <div className="result-info">{`재석 ${totalParticipants}명 ${voteResultMessage}`}</div>
    </InactiveContainer>
  );
};

export default UserAgenda;
