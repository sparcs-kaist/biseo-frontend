import React from 'react';
import { Agenda } from '@/common/types';
import { AgendaStatus } from '@/common/enums';
import BiseoButton from '@/components/BiseoButton';
import { AgendaContainer, AgendaContent } from './styled';

const AdminAgenda: React.FC<Agenda> = ({ title, expires, status }: Agenda) => {
  // const active = Date.now() < Date.parse(expires);
  const active = status == AgendaStatus.PROGRESS;
  const buttonProps = active
    ? { background: '#f2a024', foreground: '#ffffff' }
    : {};

  const buttonText = status || AgendaStatus.PROGRESS;

  return (
    <AgendaContainer>
      <AgendaContent>
        {title}
        <BiseoButton {...buttonProps}>{buttonText}</BiseoButton>
      </AgendaContent>
    </AgendaContainer>
  );
};

export default AdminAgenda;
