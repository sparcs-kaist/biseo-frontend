import React, { useState, useEffect, useMemo } from 'react';
import io from 'socket.io-client';
import { Agenda } from '@/common/types';
import { AgendaStatus } from '@/common/enums';
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
      <div className="admin">
        <AdminBoard socket={socket} tabs={mockTabs} />
      </div>
      <div className="agendas">
        {agendas.map(item => (
          <AdminAgenda key={item._id} socket={socket} {...item} />
        ))}
      </div>
    </AdminMainContainer>
  );
};

const Main: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
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

  useEffect(() => {
    socket.on('agenda:started', (payload: Agenda) => {
      const newAgendas = agendas.map(agenda => {
        if (agenda._id == payload._id) return { ...payload, userChoice: null };
        else return agenda;
      });
      setAgendas(newAgendas);
    });

    socket.on('agenda:terminated', (payload: Agenda) => {
      const newAgendas = agendas.map(agenda => {
        if (agenda._id == payload._id) return payload;
        else return agenda;
      });
      setAgendas(newAgendas);
    });
  }, [agendas]);

  const MainComponent = isAdmin ? AdminMain : UserMain;
  const filteredAgendas = isAdmin
    ? agendas
    : agendas.filter(agenda => agenda.status != AgendaStatus.PREPARE);
  return (
    <div style={{ height: 'calc(100% - 80px)' }}>
      <button
        onClick={() => setIsAdmin(prevState => !prevState)}
        style={{ position: 'fixed', top: '0', left: '0' }}
      >
        {isAdmin ? 'To User' : 'To Admin'}
      </button>
      <MainComponent socket={socket} agendas={filteredAgendas} />
    </div>
  );
};

export default Main;
