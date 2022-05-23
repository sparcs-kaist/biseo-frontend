import React, { useState, useEffect } from 'react';
import { Agenda } from '@/common/types';
import AdminBoard from '@/components/AdminBoard';
import AdminAgenda from '@/components/AdminAgenda';
import axios from '@/utils/axios';
import { mockTabs } from './mock';
import { AdminMainContainer } from './styled';
import { Redirect, useHistory } from 'react-router-dom';

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

interface AdminPageProps {
  socket: SocketIOClient.Socket;
}

const AdminPage: React.FC<AdminPageProps> = ({ socket }) => {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [valid, setValid] = useState(true);
  const history = useHistory();

  socket.on('error', (err: Error) => {
    setValid(false);
  });

  useEffect(() => {
    async function getAgendas() {
      axios
        .get('/admin/agendas')
        .then(response => {
          // Success 🎉
          const data = response.data;
          const agendas: Agenda[] = data.agendas ?? [];
          setAgendas(agendas);
        })
        .catch(function (error) {
          if (error.response && error.response.status == 403) {
            history.replace('/');
          } else {
            history.replace('/login');
          }
        });
    }
    getAgendas();
  }, []);

  useEffect(() => {
    socket.on('agenda:created', (payload: Agenda) => {
      const newAgenda = {
        ...payload,
        userChoice: null,
        pplWhoDidNotVote: payload.participants,
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
            return {
              ...payload,
              userChoice: null,
              pplWhoDidNotVote: payload.participants,
            };
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
      <AdminMain socket={socket} agendas={agendas} />
    </div>
  );
};

export default AdminPage;
