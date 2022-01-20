import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MessageEnum } from '@/common/enums';
import { MessageType } from '@/common/types';
import {
  ChatBoxScrollable,
  MessageContainer,
  MessageUsername,
  MessageContent,
  MessageDate,
  ChatBoxInputGroup,
  ChatBoxInternalContainer,
  ChatBoxExternalContainer,
} from './styled';
import useFetch from '@/hooks/useFetch';

interface Props {
  socket: SocketIOClient.Socket;
}

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const parseDate = (date: string) => {
    const splitted = date.split('T');
    const day = splitted[0];
    const time = splitted[1].split(':').slice(0, 2).join(':');
    return { day, time };
  };

  const content = (() => {
    switch (message.type) {
      case MessageEnum.MESSAGE:
        return message.message;
      case MessageEnum.NEW:
        return `${message.username} has entered`;
      case MessageEnum.OUT:
        return `${message.username} has left`;
    }
  })();

  const justification = (() => {
    switch (message.type) {
      case MessageEnum.MESSAGE:
        return message.username ? 'start' : 'end';
      case MessageEnum.NEW:
      case MessageEnum.OUT:
        return 'around';
      default:
        return '';
    }
  })();

  const user =
    message.type === MessageEnum.MESSAGE ? message.username || 'Me' : '';
  const date =
    message.type === MessageEnum.MESSAGE ? parseDate(message.date) : null;

  return (
    <MessageContainer justification={justification}>
      {user && <MessageUsername>{user}</MessageUsername>}
      <MessageContent>
        {content}
        {date && (
          <MessageDate justification={justification}>
            <span>{date.day}</span>
            <span>{date.time}</span>
          </MessageDate>
        )}
      </MessageContent>
    </MessageContainer>
  );
};

interface ChatBoxContentProps {
  socket: SocketIOClient.Socket;
}

const ChatBox: React.FC<Props> = ({ socket }) => {
  const [name, setName] = useState<string>('');
  const [_members, setMembers] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [chatlog, setChatlog] = useState<MessageType[]>([]);
  const { loading, list, error } = useFetch(query, page);
  const loader = useRef(null);

  /* Initialize socket events for 'name', 'enter', 'members', 'out'.
   * For detailed description on all socket events, please refer to
   *    https://github.com/sparcs-kaist/biseo_backend/blob/master/socket.js
   */
  useEffect(() => {
    socket.on('chat:name', (username: string) => setName(username));

    socket.on('chat:enter', (username: string) => {
      setChatlog(chatlog => [
        { type: MessageEnum.NEW, username: username },
        ...chatlog,
      ]);
      setMembers(members => [...members, username]);
    });

    socket.on('chat:members', (members: string[]) => setMembers(members));

    socket.on('chat:out', (username: string) => {
      setChatlog(chatlog => [
        { type: MessageEnum.OUT, username: username },
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
            message: msg.message,
            date: msg.date,
            username: user, // if user === name, then should be displayed as 'Me'
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
        message: msgObject.message,
        date: msgObject.date,
      },
      ...chatlog,
    ]);
  };

  const handleMessageKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  const handleObserver = useCallback(entries => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage(prev => prev + 1);
    }
  }, []);

  useEffect(() => {
    setChatlog(list);
    const lastChat: MessageType = list[list.length - 1];
    if (lastChat !== undefined) {
      setQuery(lastChat['_id']);
    }
  }, [list]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <ChatBoxExternalContainer>
      <ChatBoxInternalContainer>
        <ChatBoxScrollable>
          {chatlog.map((chat, idx) => (
            <Message key={idx} message={chat} />
          ))}
          {loading && <p>Loading...</p>}
          {error && <p>Error...</p>}
          <div ref={loader} />
        </ChatBoxScrollable>
      </ChatBoxInternalContainer>
      <ChatBoxInputGroup>
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          onKeyPress={handleMessageKeypress}
        />
        <button onClick={sendMessage}>SEND</button>
      </ChatBoxInputGroup>
    </ChatBoxExternalContainer>
  );
};

export default ChatBox;
