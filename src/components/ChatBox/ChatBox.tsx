import React, { useState, useEffect } from 'react';
import { MessageEnum } from '@/common/enums';
import { MessageType } from '@/common/types';
import ChatBoxContent from '@/components/ChatBoxContent';
import { ChatBoxContainer, ChatBoxInputGroup } from './styled';

interface Props {
  socket: SocketIOClient.Socket;
}

const ChatBox: React.FC<Props> = ({ socket }) => {
  const [name, setName] = useState<string>('');
  const [chatlog, setChatlog] = useState<MessageType[]>([]); // elements of chatlog have two required fields: type, payload
  const [_members, setMembers] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  /* Initialize socket events for 'name', 'enter', 'members', 'out'.
   * For detailed description on all socket events, please refer to
   *    https://github.com/sparcs-kaist/biseo_backend/blob/master/socket.js
   */
  useEffect(() => {
    socket.on('chat:name', (username: string) => setName(username));

    socket.on('chat:enter', (username: string) => {
      setChatlog(chatlog => [
        { type: MessageEnum.NEW, payload: username },
        ...chatlog,
      ]);
      setMembers(members => [...members, username]);
    });

    socket.on('chat:members', (members: string[]) => setMembers(members));

    socket.on('chat:out', (username: string) => {
      setChatlog(chatlog => [
        { type: MessageEnum.OUT, payload: username },
        ...chatlog,
      ]);
      setMembers(members => members.filter(member => member !== username));
    });

    return () => {
      socket.off('chat:name');
      socket.off('chat:enter');
      socket.off('chat:members');
      socket.off('chat:out');
    };
  }, []);

  // this useEffect has a `name` dependency because it has to run once again
  //   if the `name` state changes.
  useEffect(() => {
    socket.on(
      'chat:message',
      (
        user: string,
        msg: { type: MessageEnum; message: string; date: string }
      ) => {
        setChatlog(chatlog => [
          {
            type: MessageEnum.MESSAGE,
            payload: msg.message,
            date: msg.date,
            ...(user !== name && { issuer: user }), // if user === name, then should be displayed as 'Me'
          },
          ...chatlog,
        ]);
      }
    );

    // remove the event listener on dependency modification
    return () => {
      socket.off('chat:message');
    };
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
    socket.emit('chat:message', msgObject);
    setChatlog([
      {
        type: MessageEnum.MESSAGE,
        payload: msgObject.message,
        date: msgObject.date,
      },
      ...chatlog,
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
