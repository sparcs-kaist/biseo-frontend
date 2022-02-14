import React, { useState, useEffect, useMemo } from 'react';
import io from 'socket.io-client';
import { Agenda } from '@/common/types';
import { AgendaStatus } from '@/common/enums';
import ChatBox from '@/components/ChatBox';
import UserAgenda from '@/components/UserAgenda';
import { getToken } from '@/utils/auth';
import axios from '@/utils/axios';
import { UserMainContainer } from './styled';
import { Redirect } from 'react-router-dom';

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

const Main: React.FC = () => {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [valid, setValid] = useState(true);

  const socket = useMemo(
    () =>
      io(process.env.SERVER_URL, {
        transports: ['websocket'],
        upgrade: false,
        query: `token=${getToken()}`,
      }),
    []
  );

  socket.on('error', (err: Error) => {
    setValid(false);
  });

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

    socket.on('agenda:started', (payload: Agenda) => {
      setAgendas(agendas => {
        return agendas.map(agenda => {
          if (agenda._id === payload._id)
            return { ...payload, userChoice: null };
          else return agenda;
        });
      });
    });

    socket.on('agenda:terminated', (payload: Agenda) => {
      setAgendas(agendas => {
        return agendas.map(agenda => {
          if (agenda._id === payload._id) return payload;
          else return agenda;
        });
      });
    });
    // TODO cleanup (agendas)
  }, []);

  useEffect(() => {
    socket.on('agenda:edited', (payload: Agenda) => {
      setAgendas(agendas => {
        return agendas.map(agenda => {
          if (agenda._id === payload._id)
            return { ...payload, userChoice: null };
          else return agenda;
        });
      });
    });

    socket.on('agenda:deleted', (payload: string) => {
      setAgendas(agendas => {
        return agendas.filter(agenda => agenda._id !== payload);
      });
    });
  }, [agendas]);

  if (valid === false) return <Redirect to="/login" />;

  return (
    <div style={{ height: '100%' }}>
      <UserMain
        socket={socket}
        agendas={agendas.filter(
          agenda => agenda.status !== AgendaStatus.PREPARE
        )}
      />
    </div>
  );
};

export default Main;
