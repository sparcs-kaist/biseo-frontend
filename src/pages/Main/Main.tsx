import React, { useState, useEffect, useMemo } from 'react';
import ChatBox from '@/components/ChatBox';
import UserVoteItem from '@/components/UserVoteItem';
import { MainContainer } from './styled';

const Main: React.FC = () => {
  return (
    <MainContainer>
      <div
        style={{
          gridArea: 'vote-items',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px 0'
        }}
      >
        <UserVoteItem
          active={false}
          content="SPARCS 종강총회 개발자 - 홍길동"
        />
        <UserVoteItem
          active={false}
          content="SPARCS 종강총회 개발자 - 스팍스"
        />
        <UserVoteItem
          active={false}
          content="SPARCS 종강총회 개발자 - 스비서"
        />
      </div>
      <ChatBox style={{ gridArea: 'chat' }} />
    </MainContainer>
  );
};

export default Main;
