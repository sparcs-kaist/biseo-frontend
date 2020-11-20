import React, { useState, useEffect, useMemo } from 'react';
import socketio from 'socket.io-client';
import AdminBoard from '@/components/AdminBoard';
import AdminVoteItem from '@/components/AdminVoteItem';
import ChatBox from '@/components/ChatBox';
import UserVoteItem from '@/components/UserVoteItem';
import { getToken } from '@/utils/auth';
import { mockTabs, mockVoteItems } from './mock';
import { AdminMainContainer, UserMainContainer } from './styled';

const UserMain: React.FC = () => {
  const socket: SocketIOClient.Socket = useMemo(
    () =>
      socketio.connect(process.env.SOCKET_URL, {
        transports: ['websocket'],
        upgrade: false,
        query: `token=${getToken()}`
      }),
    []
  );

  return (
    <UserMainContainer>
      <div className="vote-items">
        {mockVoteItems.map(item => (
          <UserVoteItem key={item.title} {...item} />
        ))}
      </div>
      <div className="chat">
        <ChatBox socket={socket} />
      </div>
    </UserMainContainer>
  );
};

const AdminMain: React.FC = () => {
  const socket: SocketIOClient.Socket = useMemo(
    () =>
      socketio.connect(process.env.SOCKET_URL, {
        transports: ['websocket'],
        upgrade: false,
        query: `token=${getToken()}`
      }),
    []
  );

  return (
    <AdminMainContainer>
      <div className="vote-items">
        {mockVoteItems.map(item => (
          <AdminVoteItem active={item.active} title={item.title} />
        ))}
      </div>
      <div className="chat">
        <ChatBox socket={socket} />
      </div>
      <div className="admin">
        <AdminBoard tabs={mockTabs} />
      </div>
    </AdminMainContainer>
  );
};

const Main: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return isAdmin ? <AdminMain /> : <UserMain />;
};

export default Main;
