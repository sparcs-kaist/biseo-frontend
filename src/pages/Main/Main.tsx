import React, { useState, useEffect, useMemo } from 'react';
import io from 'socket.io-client';
import AdminBoard from '@/components/AdminBoard';
import AdminVoteItem from '@/components/AdminVoteItem';
import ChatBox from '@/components/ChatBox';
import UserVoteItem, { UserVoteItemProps } from '@/components/UserVoteItem';
import { getToken } from '@/utils/auth';
import { mockTabs, mockVoteItems } from './mock';
import { AdminMainContainer, UserMainContainer } from './styled';

interface CommonMainProps {
  socket: SocketIOClient.Socket;
  voteItems: UserVoteItemProps[];
}

const UserMain: React.FC<CommonMainProps> = ({
  socket,
  voteItems
}: CommonMainProps) => {

  return (
    <UserMainContainer>
      <div className="vote-items">
        {voteItems.map(item => (
          <UserVoteItem
            key={item.title}
            active={item.active}
            title={item.title}
            subtitle={item.subtitle}
            content={item.content}
            choices={item.choices}
          />
        ))}
      </div>
      <div className="chat">
        <ChatBox socket={socket} />
      </div>
    </UserMainContainer>
  );
};

const AdminMain: React.FC<CommonMainProps> = ({
  socket,
  voteItems
}: CommonMainProps) => {
  return (
    <AdminMainContainer>
      <div className="vote-items">
        {voteItems.map(item => (
          <AdminVoteItem
            key={item.title}
            active={item.active}
            title={item.title}
            subtitle={item.subtitle}
            content={item.content}
            choices={item.choices}
          />
        ))}
      </div>
      <div className="chat">
        <ChatBox socket={socket} />
      </div>
      <div className="admin">
        <AdminBoard socket={socket} tabs={mockTabs} />
      </div>
    </AdminMainContainer>
  );
};

const Main: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [voteItems, setVoteItems] = useState<UserVoteItemProps[]>([]);

  const socket = useMemo(
    () =>
      io(process.env.SOCKET_URL, {
        transports: ['websocket'],
        upgrade: false,
        query: `token=${getToken()}`
      }),
    []
  );

  const MainComponent = isAdmin ? AdminMain : UserMain;
  return (
      <MainComponent socket={socket} voteItems={voteItems} />
  );
};

export default Main;
