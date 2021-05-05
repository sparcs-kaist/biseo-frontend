import React, { useState, useEffect, useMemo } from 'react';
import io from 'socket.io-client';
import { Agenda } from '@/common/types';
import AdminBoard from '@/components/AdminBoard';
import AdminAgenda from '@/components/AdminAgenda';
import ChatBox from '@/components/ChatBox';
import UserAgenda from '@/components/UserAgenda';
import { getToken } from '@/utils/auth';
import axios from '@/utils/axios';
import { mockTabs } from './mock';
import { AdminMainContainer, UserMainContainer } from './styled';

interface CommonMainProps {
  socket: SocketIOClient.Socket;
  agendas: Agenda[];
}

const UserMain: React.FC<CommonMainProps> = ({ socket, agendas }) => {
  return (
    <UserMainContainer>
      <div className="left">
        <div className="agendas">
          {agendas.map(item => (
            <UserAgenda key={item._id} socket={socket} {...item} />
          ))}
        </div>
      </div>
      <div className="right">
        <ChatBox socket={socket} />
      </div>
    </UserMainContainer>
  );
};

const AdminMain: React.FC<CommonMainProps> = ({ socket, agendas }) => {
  return (
    <AdminMainContainer>
      <div className="left">
        <div className="admin">
          <AdminBoard socket={socket} tabs={mockTabs} />
        </div>
        <div className="agendas">
          {agendas.map(item => (
            <AdminAgenda key={item._id} {...item} />
          ))}
        </div>
      </div>
      <div className="right">
        <ChatBox socket={socket} />
      </div>
    </AdminMainContainer>
  );
};

const Main: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const socket = useMemo(
    () =>
      io(process.env.SERVER_URL, {
        transports: ['websocket'],
        upgrade: false,
        query: `token=${getToken()}`,
      }),
    []
  );

  useEffect(() => {
    async function getAgendas() {
      const { data } = await axios.get('/agendas').catch(() => ({ data: [] }));
      const agendas: Agenda[] = data.agendas ?? [];
      setAgendas(agendas);
    }

    getAgendas();
  }, []);

  useEffect(() => {
    socket.on('agenda:created', (payload: Agenda) => {
      const newAgenda = {
        ...payload,
        userChoice: null,
      };
      setAgendas(prevState => [newAgenda, ...prevState]);
    });
  }, []);

  const MainComponent = isAdmin ? AdminMain : UserMain;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <button
        onClick={() => setIsAdmin(prevState => !prevState)}
        style={{ alignSelf: 'flex-start' }}
      >
        {isAdmin ? 'To User' : 'To Admin'}
      </button>
      <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
        <MainComponent socket={socket} agendas={agendas} />
      </div>
    </div>
  );
};

export default Main;
