import React, { useState, useEffect, useMemo } from 'react';
import ChatBoxContent, {
  MessageType,
  MessageEnum
} from '@/components/ChatBoxContent';
import socketio from 'socket.io-client';
import { getToken } from '@/utils/auth';
import { ChatBoxContainer, ChatBoxInputGroup } from './styled';

interface ChatBoxProps {
  socket: SocketIOClient.Socket;
}

const ChatBox: React.FC<ChatBoxProps> = ({ socket }: ChatBoxProps) => {
  const [name, setName] = useState<string>('');
  const [chatlog, setChatlog] = useState<MessageType[]>([]); // elements of chatlog have two required fields: type, payload
  const [members, setMembers] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  /* Initialize socket events for 'name', 'enter', 'members', 'out'.
   * For detailed description on all socket events, please refer to
   *    https://github.com/sparcs-kaist/biseo_backend/blob/master/socket.js
   */
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

    // close socket on component unmount
    return () => socket.close();
  }, []);

  // this useEffect has a `name` dependency because it has to run once again
  //   if the `name` state changes.
  useEffect(() => {
    socket.on(
      'chat',
      (
        user: string,
        msg: { type: MessageEnum; message: string; date: string }
      ) => {
        setChatlog(chatlog => [
          {
            type: MessageEnum.MESSAGE,
            payload: msg.message,
            date: msg.date,
            ...(user !== name && { issuer: user }) // if user === name, then should be displayed as 'Me'
          },
          ...chatlog
        ]);
      }
    );

    // remove the event listener on dependency modification
    return () => socket.off('chat');
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
    socket.emit('chat', msgObject);
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
