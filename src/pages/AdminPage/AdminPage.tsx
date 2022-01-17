import React, { useState, useEffect, useMemo } from 'react';
import io from 'socket.io-client';
import { Agenda } from '@/common/types';
import AdminBoard from '@/components/AdminBoard';
import AdminAgenda from '@/components/AdminAgenda';
import { getToken } from '@/utils/auth';
import axios from '@/utils/axios';
import { useTypedSelector, useTypedDispatch } from '@/hooks';
import { mockTabs } from './mock';
import { AdminMainContainer } from './styled';
import { Redirect } from 'react-router-dom';
import {
  setAgendas,
  addAgendas,
  updateAgenda,
  deleteAgenda,
} from '@/store/slices/agendas';

interface CommonMainProps {
  socket: SocketIOClient.Socket;
  agendas: Agenda[];
}

const AdminMain: React.FC<CommonMainProps> = ({ socket, agendas }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [targetAgenda, setTargetAgenda] = useState<Agenda>();

  const onEdit = (_id: string) => {
    if (!isEdit) {
      setTargetAgenda(agendas.find(agenda => agenda._id == _id));
    }
    setIsEdit(!isEdit);
  };

  const confirmEdit = (_id: string) => {
    setIsEdit(false);
  };

  return (
    <AdminMainContainer>
      <div className="admin">
        <AdminBoard
          socket={socket}
          tabs={mockTabs}
          isEdit={isEdit}
          targetAgenda={targetAgenda}
          confirmEdit={confirmEdit}
        />
      </div>
      <div className="agendas">
        {agendas.map(item => (
          <AdminAgenda
            key={item._id}
            socket={socket}
            onEdit={onEdit}
            {...item}
          />
        ))}
      </div>
    </AdminMainContainer>
  );
};

const AdminPage: React.FC = () => {
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

  const filteredAgendas = agendas;

  if (valid === false) return <Redirect to="/login" />;

  return (
    <div style={{ height: '100%' }}>
      <AdminMain socket={socket} agendas={filteredAgendas} />
    </div>
  );
};

export default AdminPage;
