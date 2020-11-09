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

interface UserVoteItemProps {
  active?: boolean;
  title?: string;
  subtitle?: string;
  content?: string;
  choices?: string[];
}

const UserVoteItem: React.FC<UserVoteItemProps> = ({
  active,
  title,
  content,
  subtitle,
  choices
}: UserVoteItemProps) => {
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

  return active ? (
    <ActiveContainer>
      <ActiveContainerTitle>{title}</ActiveContainerTitle>
      <ActiveContainerContent>{content}</ActiveContainerContent>
      <ActiveContainerSubtitle>{subtitle}</ActiveContainerSubtitle>
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
      <VoteItemContent>hello world</VoteItemContent>
    </InactiveContainer>
  );
};

export default UserVoteItem;
