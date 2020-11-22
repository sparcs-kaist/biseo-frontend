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

export interface UserVoteItemProps {
  active: boolean;
  title: string;
  subtitle: string;
  content: string;
  choices: string[];
}

const UserVoteItem: React.FC<UserVoteItemProps> = props => {
  const { choices } = props;

  /* if we're dealing with only single-choice options, we wouldn't have to
   * keep an entire array, but just the selected index.
   * here we use an array just for potential use of mult-choice options.
   */
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
            // use selectedStyle as props if button is selected, use unselectedStyle otherwise
            {...(selectedState[index] ? selectedStyle : unselectedStyle)}
          >
            {choice}
          </BiseoButton>
        ))}

        {/* adding `margin-left: auto` puts the rightmost element at the end */}
        <BiseoButton style={{ marginLeft: 'auto', fontWeight: 600 }}>
          제출
        </BiseoButton>
      </ButtonGroup>
    </ActiveContainer>
  ) : (
    <InactiveContainer>
      <VoteItemContent>{props.title}</VoteItemContent>
    </InactiveContainer>
  );
};

export default UserVoteItem;
