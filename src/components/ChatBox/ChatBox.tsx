import React, { useState, useEffect, useMemo } from 'react';
import ChatBoxContent, {
  MessageType,
  MessageEnum
} from '@/components/ChatBoxContent';
import socketio from 'socket.io-client';
import { getToken } from '@/utils/auth';
import { ChatBoxContainer, ChatBoxInputGroup } from './styled';

const ChatBox: React.FC = () => {
  const socket = useMemo(
    () =>
      socketio.connect(process.env.SOCKET_URL, {
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

    return function cleanup() {
      socket.close();
    };
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
    <ChatBoxContainer>
      <ChatBoxContent chatlog={chatlog} />
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
  );
};

export default ChatBox;
