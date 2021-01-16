import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import BiseoButton from '@/components/BiseoButton';
import {
  ActiveContainer,
  ActiveContainerTitle,
  ActiveContainerContent,
  ActiveContainerSubtitle,
  ButtonGroup,
  InactiveContainer
} from './styled';
import axios from '@/utils/axios';

interface PutVoteResponse {
  success: boolean;
}

export interface UserVoteItemProps {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  choices: string[];
  expires: string; // ISO Date String

  // contains a string if user has already voted to this item. null otherwise
  userChoice: string | null;
  submissions?: Record<string, number>;
}

const UserVoteItem: React.FC<UserVoteItemProps> = ({
  _id,
  title,
  subtitle,
  content,
  choices,
  expires,
  userChoice,
  submissions
}: UserVoteItemProps) => {
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

    const { data }: { data: PutVoteResponse } = await axios.put(
      `/votes/${_id}`,
      {
        choice: choices[selectedIndex]
      }
    );

    if (data.success) toast.success('🎉 Vote Successful!');
    else toast.error('Vote Failed');

    setAlreadySubmitted(true);
  };

  const selectedStyle = useMemo(
    () => ({ foreground: '#ffffff', background: '#f2a024' }),
    []
  );

  const unselectedStyle = useMemo(
    () => ({ foreground: '#000000', background: '#ffffff' }),
    []
  );

  const totalParticipants = submissions
    ? Object.values(submissions).reduce((sum, count) => sum + count, 0)
    : 0;

  const voteResultMessage =
    submissions && Object.keys(submissions).length > 0
      ? '중 ' +
        Object.entries(submissions)
          .sort()
          .map(([choice, count]) => `${choice} ${count}명`)
          .join(', ')
      : '';

  return active ? (
    <ActiveContainer>
      <ActiveContainerTitle>{title}</ActiveContainerTitle>
      <ActiveContainerContent>{content}</ActiveContainerContent>
      <ActiveContainerSubtitle>{subtitle}</ActiveContainerSubtitle>
      <ButtonGroup>
        {choices.map((choice, index) => (
          <BiseoButton
            key={choice}
            // clickable only if user has not submitted
            onClick={() => !alreadySubmitted && handleChoiceClick(index)}
            // use selectedStyle as props if button is selected, use unselectedStyle otherwise
            {...(selectedState[index] ? selectedStyle : unselectedStyle)}
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
  ) : (
    <InactiveContainer>
      <div className="title">{title}</div>
      <div className="result-info">{`재석 ${totalParticipants}명 ${voteResultMessage}`}</div>
    </InactiveContainer>
  );
};

export default UserVoteItem;
