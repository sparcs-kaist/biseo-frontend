import React, { useState, useEffect, useMemo } from 'react';
import ChatBox, { MessageType, MessageEnum } from '@/components/ChatBox';
import styled from 'styled-components';
import socketio from 'socket.io-client';
import { getToken } from '@/utils/auth';

const ChatBoxContainer = styled.div`
  -moz-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  width: 70vw;
`;

const ChatBoxInputGroup = styled.div`
  background-color: #fffbf0;
  border-top: 0.7px solid #f2a024;
  display: flex;
  width: 100%;

  & input {
    background-color: inherit;
    border: 0;
    color: #444444;
    flex-grow: 1;
    font-size: 18px;
    font-weight: bold;
    min-height: 60px;
    outline: 0;
    padding: 0 20px;
  }

  & button {
    background-color: inherit;
    border: 0;
    border-radius: 5px;
    color: #f2a024;
    font-size: 15px;
    font-weight: bold;
    min-width: 80px;

    &:focus {
      outline: 0;
    }

    &:hover {
      background-color: #f7f3e9;
    }
  }
`;

const ChatPage: React.FC = () => {
  const socket = useMemo(
    () =>
      socketio.connect('kong.sparcs.org:32811', {
        transports: ['websocket'],
        upgrade: false,
        query: `token=${getToken()}`
      }),
    []
  );
  const [name, setName] = useState('');
  const [chatlog, setChatlog] = useState<MessageType[]>([]); // elements of chatlog have two required fields: type, payload
  const [members, setMembers] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('name', (username: string) => setName(username));

    socket.on('enter', (username: string) => {
      setChatlog(chatlog => [
        { type: MessageEnum.NEW, payload: username },
        ...chatlog
      ]);
      setMembers(members => [...members, username]);
    });

    socket.on('members', (members: string[]) => setMembers(members));

    socket.on('out', (username: string) => {
      setChatlog(chatlog => [
        { type: MessageEnum.OUT, payload: username },
        ...chatlog
      ]);
      setMembers(members => members.filter(member => member !== username));
    });
  }, []);

  useEffect(() => {
    socket.off('chat message');
    socket.on(
      'chat message',
      (
        user: string,
        msg: { type: MessageEnum; message: string; date: string }
      ) => {
        setChatlog(chatlog => [
          {
            type: MessageEnum.MESSAGE,
            payload: msg.message,
            date: msg.date,
            ...(user !== name && { issuer: user })
          },
          ...chatlog
        ]);
      }
    );
  }, [name]);

  const currentTime = () => {
    const offset = new Date().getTimezoneOffset() * 60000;
    return new Date(Date.now() - offset).toISOString();
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim() === '') return;
    const msgObject = { message, date: currentTime() };
    setMessage('');
    socket.emit('chat message', msgObject);
    setChatlog([
      {
        type: MessageEnum.MESSAGE,
        payload: msgObject.message,
        date: msgObject.date
      },
      ...chatlog
    ]);
  };

  const handleMessageKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
      <h3>Hello, {name}</h3>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            marginRight: '30px'
          }}
        >
          {members.map(member => (
            <div key={member}>{member}</div>
          ))}
        </div>
        <ChatBoxContainer>
          <ChatBox chatlog={chatlog} />
          <ChatBoxInputGroup>
            <input
              type="text"
              value={message}
              onChange={handleMessageChange}
              onKeyPress={handleMessageKeypress}
            />
            <button onClick={sendMessage}>SEND</button>
          </ChatBoxInputGroup>
        </ChatBoxContainer>
      </div>
    </>
  );
};

export default ChatPage;
