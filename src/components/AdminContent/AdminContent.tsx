import React from 'react';
import {
  AdminContentContainer,
  TitleInput,
  ContentInput,
  FooterInput,
  ButtonGroup
} from './styled';
import BiseoButton from '@/components/BiseoButton';

interface AdminContentProps {
  choices: string[];
  extendable: boolean;
}

const AdminContent: React.FC<AdminContentProps> = ({
  choices,
  extendable
}: AdminContentProps) => {
  return (
    <AdminContentContainer>
      <TitleInput placeholder="투표 제목을 입력하세요" />
      <ContentInput placeholder="투표 내용을 입력하세요" />
      <FooterInput placeholder="의결문안을 입력하세요" />
      <ButtonGroup>
        {choices.map(choice => (
          <BiseoButton key={choice} nocursor>
            {choice}
          </BiseoButton>
        ))}
        {extendable && <BiseoButton>+</BiseoButton>}
      </ButtonGroup>
      <ButtonGroup alignRight={true}>
        <BiseoButton background="#f2a024" foreground="#ffffff">
          만들기
        </BiseoButton>
      </ButtonGroup>
    </AdminContentContainer>
  );
};

export default AdminContent;
