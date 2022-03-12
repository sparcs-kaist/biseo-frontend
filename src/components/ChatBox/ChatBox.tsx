import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MemberState, MessageEnum } from '@/common/enums';
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
  ChatBoxParticipants,
  ChatBoxParticipantsBox,
  Participant,
} from './styled';
import Green from '@/public/Green.svg';
import Orange from '@/public/Orange.svg';
import useFetch from '@/hooks/useFetch';
import { useTypedSelector } from '@/hooks';

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

interface ChatMemberState {
  sparcsId: string;
  state: MemberState; // ONLINE or VACANT
}

const ChatBox: React.FC<Props> = ({ socket }) => {
  const [_members, setMembers] = useState<ChatMemberState[]>([]);
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [chatlog, setChatlog] = useState<MessageType[]>([]);
  const { loading, list, error } = useFetch(query);
  const loader = useRef(null);
  const ownSparcsId = useTypedSelector(state => state.user.sparcsID);

  /* Initialize socket events for 'enter', 'members', 'out', 'vacant', 'message'. */
  useEffect(() => {
    socket.on('chat:enter', (username: string) => {
      setChatlog(chatlog => [
        { type: MessageEnum.NEW, username: username },
        ...chatlog,
      ]);
      setMembers(members => [
        ...members,
        { sparcsId: username, state: MemberState.ONLINE },
      ]);
    });

    /* Get members */
    socket.on('chat:members', (members: ChatMemberState[]) =>
      setMembers(members)
    );
    socket.emit('chat:members');

    socket.on('chat:out', (username: string) => {
      setChatlog(chatlog => [
        { type: MessageEnum.OUT, username: username },
        ...chatlog,
      ]);
      setMembers(members =>
        members.filter(member => member.sparcsId !== username)
      );
    });

    socket.on('vacant:on', (sparcsId: string) => {
      setMembers(members =>
        members.map(member => {
          if (member.sparcsId === sparcsId) {
            const memberNewState: ChatMemberState = {
              sparcsId: sparcsId,
              state: MemberState.VACANT,
            };
            return memberNewState;
          } else return member;
        })
      );
    });

    socket.on('vacant:off', (sparcsId: string) => {
      setMembers(members =>
        members.map(member => {
          if (member.sparcsId === sparcsId) {
            return { sparcsId: sparcsId, state: MemberState.ONLINE };
          } else return member;
        })
      );
    });

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

    return () => {
      socket.off('chat:enter');
      socket.off('chat:members');
      socket.off('chat:out');
      socket.off('vacant:on');
      socket.off('vacant:off');
      socket.off('chat:message');
    };
  }, []);

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

  const handleObserver = useCallback(
    entries => {
      const target = entries[0];
      if (target.isIntersecting) {
        const lastChat: MessageType = chatlog[chatlog.length - 1];
        if (lastChat !== undefined) setQuery(lastChat['_id']);
      }
    },
    [chatlog]
  );

  useEffect(() => {
    setChatlog(list);
  }, [list]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => {
      observer.unobserve(loader.current);
    };
  }, [handleObserver]);

  return (
    <ChatBoxExternalContainer>
      <ChatBoxInternalContainer>
        <ChatBoxParticipants>
          참여자: {_members.length}명
          <ChatBoxParticipantsBox>
            <Participant style={{ fontWeight: 'bold' }}>
              {ownSparcsId} (You)
              <Green />
            </Participant>
            {_members.map((member, index) => {
              if (member.sparcsId === ownSparcsId) return;
              if (member.state === MemberState.ONLINE)
                return (
                  <Participant key={index}>
                    {member.sparcsId}
                    <Green />
                  </Participant>
                );
              else return;
            })}
            {_members.map((member, index) => {
              if (member.sparcsId === ownSparcsId) return;
              if (member.state === MemberState.VACANT)
                return (
                  <Participant key={index}>
                    {member.sparcsId}
                    <Orange />
                  </Participant>
                );
              else return;
            })}
          </ChatBoxParticipantsBox>
        </ChatBoxParticipants>
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
