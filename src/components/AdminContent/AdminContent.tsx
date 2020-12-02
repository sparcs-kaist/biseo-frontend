import React, { useState } from 'react';
import BiseoButton from '@/components/BiseoButton';
import {
  AdminContentContainer,
  TitleInput,
  ContentInput,
  SubtitleInput,
  ButtonGroup
} from './styled';

interface AdminContentProps {
  choices: string[];
  extendable: boolean;
  onVoteCreate: (
    title: string,
    content: string,
    subtitle: string,
    choices: string[]
  ) => void;
}

const AdminContent: React.FC<AdminContentProps> = ({
  choices,
  extendable,
  onVoteCreate
}: AdminContentProps) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');

  const handleButtonClick = (): void => {
    if (choices.length < 1) return;
    onVoteCreate(title, content, subtitle, choices);
  };

  return (
    <AdminContentContainer>
      <TitleInput
        placeholder="투표 제목을 입력하세요"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <ContentInput
        placeholder="투표 내용을 입력하세요"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <SubtitleInput
        placeholder="의결문안을 입력하세요"
        value={subtitle}
        onChange={e => setSubtitle(e.target.value)}
      />
      <ButtonGroup>
        {choices.map(choice => (
          <BiseoButton nocursor key={choice}>
            {choice}
          </BiseoButton>
        ))}
        {extendable && <BiseoButton>+</BiseoButton>}
      </ButtonGroup>
      <ButtonGroup alignRight={true}>
        <BiseoButton
          background="#f2a024"
          foreground="#ffffff"
          onClick={handleButtonClick}
        >
          만들기
        </BiseoButton>
      </ButtonGroup>
    </AdminContentContainer>
  );
};

export default AdminContent;
