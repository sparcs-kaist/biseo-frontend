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
  const [showDetails, setShowDetails] = React.useState(false);
  const buttonText = active ? '진행 중' : '시작하기';
  const onClick = () => setShowDetails(!showDetails);

  return (
    <div onClick={onClick}>
      {showDetails ? (
        <DetailContainer>
          <DetailContainerTitle>{title}</DetailContainerTitle>
          <DetailContainerContent>{content}</DetailContainerContent>
          <DetailContainerSubtitle>{subtitle}</DetailContainerSubtitle>
        </DetailContainer>
      ) : (
        <AgendaContainer>
          <AgendaContent>
            {title}
            <BiseoButton {...buttonProps}>{buttonText}</BiseoButton>
          </AgendaContent>
        </AgendaContainer>
      )}
    </div>
  );
};

export default AdminAgenda;
