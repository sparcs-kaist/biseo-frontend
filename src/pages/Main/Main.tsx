import React, { useState, useEffect, useMemo } from 'react';
import io from 'socket.io-client';
import { Agenda } from '@/common/types';
import { AgendaStatus } from '@/common/enums';
import { useTypedSelector, useTypedDispatch } from '@/hooks';
import ChatBox from '@/components/ChatBox';
import UserAgenda from '@/components/UserAgenda';
import { getToken } from '@/utils/auth';
import axios from '@/utils/axios';
import { UserMainContainer } from './styled';
import { Redirect } from 'react-router-dom';
import {
  setAgendas,
  addAgendas,
  updateAgenda,
  deleteAgenda,
} from '@/store/slices/agendas';

interface CommonMainProps {
  socket: SocketIOClient.Socket;
}

const UserMain: React.FC<CommonMainProps> = ({ socket }) => {
  const agendas = useTypedSelector(state => state.agendas);

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
  const agendas = useTypedSelector(state => state.agendas);
  const dispatch = useTypedDispatch();
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
      dispatch(setAgendas(agendas));
    }

    getAgendas();
  }, []);

  useEffect(() => {
    socket.on('agenda:created', (payload: Agenda) => {
      const newAgenda = {
        ...payload,
        userChoice: null,
      };
      dispatch(addAgendas(newAgenda));
    });

    socket.on('agenda:started', (payload: Agenda) => {
      const newAgenda = {
        ...payload,
        userChoice: null,
      };
      dispatch(updateAgenda(newAgenda));
    });

    socket.on('agenda:terminated', (payload: Agenda) => {
      dispatch(updateAgenda(payload));
    });
    // TODO cleanup (agendas)
  }, []);

  useEffect(() => {
    socket.on('agenda:edited', (payload: Agenda) => {
      const newAgenda = {
        ...payload,
        userChoice: null,
      };
      dispatch(updateAgenda(newAgenda));
    });

    socket.on('agenda:deleted', (payload: string) => {
      dispatch(deleteAgenda(payload));
    });
  }, [agendas]);

  if (valid === false) return <Redirect to="/login" />;

  return (
    <div style={{ height: '100%' }}>
      <UserMain socket={socket} />
    </div>
  );
};

export default Main;
