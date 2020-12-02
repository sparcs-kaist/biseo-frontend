import React from 'react';
import BiseoButton from '@/components/BiseoButton';
import { UserVoteItemProps } from '@/components/UserVoteItem';
import { VoteItemContainer, VoteItemContent } from './styled';

const AdminVoteItem: React.FC<UserVoteItemProps> = ({
  active,
  title
}: UserVoteItemProps) => {
  const buttonProps = active
    ? { background: '#f2a024', foreground: '#ffffff' }
    : {};
  const buttonText = active ? '진행 중' : '시작하기';

  return (
    <VoteItemContainer>
      <VoteItemContent>
        {title}
        <BiseoButton {...buttonProps}>{buttonText}</BiseoButton>
      </VoteItemContent>
    </VoteItemContainer>
  );
};

export default AdminVoteItem;
