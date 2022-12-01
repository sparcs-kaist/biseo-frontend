import React, { useState, useEffect } from 'react';
import { Agenda } from '@/common/types';
import { AgendaStatus } from '@/common/enums';
import ChatBox from '@/components/ChatBox';
import UserAgenda from '@/components/UserAgenda';
import axios from '@/utils/axios';
import { DefaultText, UserMainContainer } from './styled';
import { Redirect } from 'react-router-dom';
import Empty from './empty.svg';
import { useTypedSelector } from '@/hooks';
import { isUndefined } from 'lodash';

interface CommonMainProps {
  socket: SocketIOClient.Socket;
  agendas: Agenda[];
}

const UserMain: React.FC<CommonMainProps> = ({ socket, agendas }) => {
  return (
    <UserMainContainer>
      <div className="left">
        <div className="agendas">
          {agendas.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: 'auto',
              }}
            >
              <Empty style={{ marginBottom: '10px' }} />
              <DefaultText>안건이 없습니다. 안건을 추가해 주세요!</DefaultText>
            </div>
          ) : (
            agendas.map(item => (
              <UserAgenda key={item._id} socket={socket} {...item} />
            ))
          )}
        </div>
      </div>
      <div className="right">
        <ChatBox socket={socket} />
      </div>
    </UserMainContainer>
  );
};

interface MainProps {
  socket: SocketIOClient.Socket;
}

const Main: React.FC<MainProps> = ({ socket }) => {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [valid, setValid] = useState(true);
  const user = useTypedSelector(state => state.user);

  socket.on('error', (err: Error) => {
    setValid(false);
  });

  useEffect(() => {
    async function getAgendas() {
      const { data } = await axios.get('/agendas').catch(() => ({ data: [] }));
      const agendas: Agenda[] =
        data.agendas.filter(
          agenda =>
            isUndefined(agenda.participants) ||
            agenda.participants.includes(user.sparcsID)
        ) ?? [];
      setAgendas(agendas);
    }

    getAgendas();
  }, []);

  useEffect(() => {
    socket.on('agenda:started', (payload: Agenda) => {
      const newAgenda = {
        ...payload,
        userChoice: null,
      };
      setAgendas(prevState => [newAgenda, ...prevState]);
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
