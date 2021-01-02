import React, { useState, useMemo } from 'react';
import BiseoButton from '@/components/BiseoButton';
import {
  ActiveContainer,
  ActiveContainerTitle,
  ActiveContainerContent,
  ActiveContainerSubtitle,
  ButtonGroup,
  InactiveContainer,
  VoteItemContent
} from './styled';
import axios from '@/utils/axios';

export interface UserVoteItemProps {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  choices: string[];
  expires: string; // ISO Date String
}

const UserVoteItem: React.FC<UserVoteItemProps> = ({
  _id,
  title,
  subtitle,
  content,
  choices,
  expires
}: UserVoteItemProps) => {
  /* if we're dealing with only single-choice options, we wouldn't have to
   * keep an entire array, but just the currently selected index.
   * here we use an array just for potential use of mult-choice options.
   */
  const [selectedState, setSelectedState] = useState<boolean[]>(
    choices.map(_ => false)
  );
  const [alreadySubmitted, setAlreadySubmitted] = useState<boolean>(false);

  const active = Date.now() < Date.parse(expires);

  const handleChoiceClick = (index: number) => {
    setSelectedState(state =>
      state.map((selected, idx) => (index === idx ? !selected : false))
    );
  };

  const handleSubmit = async () => {
    const { data } = await axios.put(`/votes/${_id}`, {
      choice: selectedState
        .filter(state => state)
        .map((_, idx) => choices[idx])[0]
    });

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

  return active ? (
    <ActiveContainer>
      <ActiveContainerTitle>{title}</ActiveContainerTitle>
      <ActiveContainerContent>{content}</ActiveContainerContent>
      <ActiveContainerSubtitle>{subtitle}</ActiveContainerSubtitle>
      <ButtonGroup>
        {choices.map((choice, index) => (
          <BiseoButton
            key={choice}
            onClick={() => handleChoiceClick(index)}
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
      <VoteItemContent>{title}</VoteItemContent>
    </InactiveContainer>
  );
};

export default UserVoteItem;
