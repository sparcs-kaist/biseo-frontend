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

interface ActiveUserVoteItemProps {
  active: true;
  title: string;
  subtitle: string;
  content: string;
  choices: string[];
}

interface InactiveUserVoteItemProps {
  active: false;
  content: string;
  choices?: string[];
}

type UserVoteItemProps = ActiveUserVoteItemProps | InactiveUserVoteItemProps;

const UserVoteItem: React.FC<UserVoteItemProps> = props => {
  const choices = props.choices || [];
  const [selectedState, setSelectedState] = useState(choices.map(_ => false));

  const handleButtonClick = (index: number) => {
    setSelectedState(state =>
      state.map((selected, idx) => (index === idx ? !selected : false))
    );
  };

  const selectedStyle = useMemo(
    () => ({ foreground: '#ffffff', background: '#f2a024' }),
    []
  );

  const unselectedStyle = useMemo(
    () => ({ foreground: '#000000', background: '#ffffff' }),
    []
  );

  return props.active ? (
    <ActiveContainer>
      <ActiveContainerTitle>{props.title}</ActiveContainerTitle>
      <ActiveContainerContent>{props.content}</ActiveContainerContent>
      <ActiveContainerSubtitle>{props.subtitle}</ActiveContainerSubtitle>
      <ButtonGroup>
        {choices.map((choice, index) => (
          <BiseoButton
            key={choice}
            onClick={() => handleButtonClick(index)}
            {...(selectedState[index] ? selectedStyle : unselectedStyle)}
          >
            {choice}
          </BiseoButton>
        ))}
        <BiseoButton style={{ marginLeft: 'auto' }}>
          <strong>제출</strong>
        </BiseoButton>
      </ButtonGroup>
    </ActiveContainer>
  ) : (
    <InactiveContainer>
      <VoteItemContent>{props.content}</VoteItemContent>
    </InactiveContainer>
  );
};

export default UserVoteItem;
