import React, { useState, useEffect, useMemo } from 'react';
import io from 'socket.io-client';
import AdminBoard from '@/components/AdminBoard';
import AdminVoteItem from '@/components/AdminVoteItem';
import ChatBox from '@/components/ChatBox';
import UserVoteItem, { UserVoteItemProps } from '@/components/UserVoteItem';
import { getToken } from '@/utils/auth';
import axios from '@/utils/axios';
import { mockTabs } from './mock';
import { AdminMainContainer, UserMainContainer } from './styled';

interface VoteCreatedPayload {
  _id: string;
  choices: string[];
  content: string;
  subtitle: string;
  title: string;
  expires: string; // Date ISO String
}

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
          <UserVoteItem key={item._id} {...item} />
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
          <AdminVoteItem key={item._id} {...item} />
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

  useEffect(() => {
    async function getAgendas() {
      const { data } = await axios.get('/agendas');
      const agendas: UserVoteItemProps[] = data.agendas ?? [];
      setVoteItems(agendas);
    }

    getAgendas();
  }, []);

  useEffect(() => {
    socket.on('agenda:created', (payload: VoteCreatedPayload) => {
      const newVoteItem = {
        ...payload,
        userChoice: null
      };
      setVoteItems(prevState => [newVoteItem, ...prevState]);
    });
  }, []);

  const MainComponent = isAdmin ? AdminMain : UserMain;
  return (
    <div>
      <button onClick={() => setIsAdmin(prevState => !prevState)}>
        {isAdmin ? 'To User' : 'To Admin'}
      </button>
      <MainComponent socket={socket} voteItems={voteItems} />
    </div>
  );
};

export default Main;
