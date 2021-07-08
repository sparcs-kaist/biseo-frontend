import React from 'react';
import { Agenda } from '@/common/types';
import BiseoButton from '@/components/BiseoButton';
import {
  AgendaContainer,
  AgendaContent,
  DetailContainer,
  DetailContainerContent,
  DetailContainerSubtitle,
  DetailContainerTitle,
} from './styled';

const AdminAgenda: React.FC<Agenda> = ({
  title,
  content,
  subtitle,
  expires,
}: Agenda) => {
  const active = Date.now() < Date.parse(expires);
  const buttonProps = active
    ? { background: '#f2a024', foreground: '#ffffff' }
    : {};
  const buttonText = active ? '진행 중' : '시작하기';

  // return (
  //   <AgendaContainer>
  //     <AgendaContent>
  //       {title}
  //       <BiseoButton {...buttonProps}>{buttonText}</BiseoButton>
  //     </AgendaContent>
  //   </AgendaContainer>
  // );
  return (
    <DetailContainer>
      <DetailContainerTitle>{title}</DetailContainerTitle>
      <DetailContainerContent>{content}</DetailContainerContent>
      <DetailContainerSubtitle>{subtitle}</DetailContainerSubtitle>
    </DetailContainer>
  );
};

export default AdminAgenda;
