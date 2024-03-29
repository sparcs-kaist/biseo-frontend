import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MemberState, MessageEnum } from '@/common/enums';
import { Agenda, MessageType } from '@/common/types';
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
  ChatBroadcast,
  ChatURL,
} from './styled';
import Green from '@/public/Green.svg';
import Orange from '@/public/Orange.svg';
import useFetch from '@/hooks/useFetch';
import { useTypedSelector } from '@/hooks';
import { spawnNotification } from '@/utils/notification';

const CHATMAXLENGTH = 500;

interface Props {
  socket: SocketIOClient.Socket;
}

interface MessageProps {
  message: MessageType;
}

const messageParse = (message: string) => {
  return message;
};

const parseURL = content => {
  if (content.length <= 3) return <>{content}</>;

  let URL_index_start = content.search(/(https?:\/\/[^\s]+)/);
  if (URL_index_start === -1)
    URL_index_start = content.search(/(http?:\/\/[^\s]+)/);
  if (URL_index_start === -1) return <>{content}</>;

  let URL_index_end = URL_index_start;

  while (
    content[URL_index_end] !== ' ' &&
    content[URL_index_end] !== '\n' &&
    content.length > URL_index_end
  )
    URL_index_end++;
  const URL_String = content.slice(URL_index_start, URL_index_end);
  return (
    <>
      {content.slice(0, URL_index_start)}
      <ChatURL href={URL_String} target="_blank" rel="noreferrer">
        {URL_String}
      </ChatURL>
      {parseURL(content.slice(URL_index_end))}
    </>
  );
};

const Message: React.FC<MessageProps> = ({ message }) => {
  const parseDate = (date: string) => {
    const splitted = date.split('T');
    const day = splitted[0];
    const time = splitted[1].split(':').slice(0, 2).join(':');
    return { day, time };
  };

  const content = (() => {
    const str = messageParse(message.message);
    switch (message.type) {
      case MessageEnum.MESSAGE:
        return str;
      case MessageEnum.VOTESTART:
        return message.message;
      case MessageEnum.VOTEEND:
        return message.message;
    }
  })();

  const justification = (() => {
    switch (message.type) {
      case MessageEnum.MESSAGE:
        return message.username ? 'start' : 'end';
      case MessageEnum.VOTESTART:
      case MessageEnum.VOTEEND:
        return 'around';
      default:
        return '';
    }
  })();

  const date =
    message.type === MessageEnum.MESSAGE ? parseDate(message.date) : null;

  return (
    <MessageContainer justification={justification}>
      {message.username && (
        <MessageUsername>{message.username}</MessageUsername>
      )}
      <MessageContent username={message.username} messageType={message.type}>
        <div style={{ lineHeight: '140%' }}>{parseURL(content)}</div>
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

interface BroadcastType {
  active: boolean;
  sparcsId: string;
  kinds: 'Enter' | 'Out';
}

const ChatBox: React.FC<Props> = ({ socket }) => {
  const [_members, setMembers] = useState<ChatMemberState[]>([]);
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [chatlog, setChatlog] = useState<MessageType[]>([]);
  const [broadcast, setBroadcast] = useState<BroadcastType>({
    active: false,
    sparcsId: '',
    kinds: 'Enter',
  });
  const { loading, list, error } = useFetch(query);
  const loader = useRef(null);
  const ownSparcsId = useTypedSelector(state => state.user.sparcsID);

  /* Initialize socket events for 'enter', 'members', 'out', 'vacant', 'message'. */
  useEffect(() => {
    let broadcastId: number;
    socket.on('chat:enter', (username: string) => {
      setMembers(members => [
        ...members,
        { sparcsId: username, state: MemberState.ONLINE },
      ]);
      clearTimeout(broadcastId);
      setBroadcast({ active: true, sparcsId: username, kinds: 'Enter' });
      broadcastId = setTimeout(() => {
        setBroadcast(bc => {
          return { ...bc, active: false };
        });
      }, 3000);
    });

    /* Get members */
    socket.on('chat:members', (members: ChatMemberState[]) =>
      setMembers(members)
    );
    socket.emit('chat:members');

    socket.on('chat:out', (username: string) => {
      setMembers(members =>
        members.filter(member => member.sparcsId !== username)
      );
      clearTimeout(broadcastId);
      setBroadcast({ active: true, sparcsId: username, kinds: 'Out' });
      broadcastId = setTimeout(() => {
        setBroadcast(bc => {
          return { ...bc, active: false };
        });
      }, 3000);
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

    socket.on('agenda:started', (payload: Agenda) => {
      setChatlog(chatlog => [
        {
          type: MessageEnum.VOTESTART,
          message: `새로운 투표 : ${payload.title} 이(가) 시작되었습니다`,
          date: currentTime(),
          username: '',
        },
        ...chatlog,
      ]);
      spawnNotification('새로운 투표가 시작되었습니다.', `${payload.title}`);
    });

    socket.on('agenda:terminated', (payload: Agenda) => {
      setChatlog(chatlog => [
        {
          type: MessageEnum.VOTEEND,
          message: `투표 : ${payload.title} 이(가) 종료되었습니다`,
          date: currentTime(),
          username: '',
        },
        ...chatlog,
      ]);
      spawnNotification('투표가 종료되었습니다.', `${payload.title}`);
    });

    socket.on('agenda:hurry', (payload: string) => {
      setChatlog(chatlog => [
        {
          type: MessageEnum.VOTEEND,
          message: `관리자가 투표 : "${payload}"를 재촉합니다`,
          date: currentTime(),
          username: '',
        },
        ...chatlog,
      ]);
      spawnNotification(
        '투표를 해주세요.',
        `관리자가 투표 : "${payload}"를 재촉합니다.`
      );
    });

    return () => {
      clearTimeout(broadcastId);
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

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    const trimMsg = message.trim();
    if (trimMsg === '') return;
    const msgObject = { message: trimMsg, date: currentTime() };
    setMessage('');
    socket.emit('chat:message', msgObject);
    setChatlog([
      {
        type: MessageEnum.MESSAGE,
        username: '',
        message: msgObject.message,
        date: msgObject.date,
      },
      ...chatlog,
    ]);
  };

  const handleMessageKeypress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
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

  const broadcastContent = useCallback(() => {
    switch (broadcast.kinds) {
      case 'Enter':
        return `${broadcast.sparcsId}님이 입장하셨습니다.`;
      case 'Out':
        return `${broadcast.sparcsId}님이 퇴장하셨습니다.`;
    }
  }, [broadcast]);

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
          <span>참여자: {_members.length}명</span>
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
        <ChatBroadcast visible={broadcast.active}>
          {broadcastContent()}
        </ChatBroadcast>
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
        <textarea
          maxLength={CHATMAXLENGTH}
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
