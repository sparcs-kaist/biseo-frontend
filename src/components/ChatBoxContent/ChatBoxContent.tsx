import React from 'react';
import {
  MessageContainer,
  MessageUsername,
  MessageContent,
  MessageDate,
  ChatBoxContainer,
  ChatBoxScrollable
} from './styled';

export enum MessageEnum {
  NEW = 'new',
  MEMBERS = 'members',
  MESSAGE = 'message',
  OUT = 'out'
}

export interface MessageType {
  type: MessageEnum;
  payload: string;
  issuer?: string;
  date?: string;
}

const Message: React.FC<{ message: MessageType }> = ({
  message
}: {
  message: MessageType;
}) => {
  const parseDate = (date: string) => {
    const splitted = date.split('T');
    const day = splitted[0];
    const time = splitted[1].split(':').slice(0, 2).join(':');
    return { day, time };
  };

  const content = (() => {
    switch (message.type) {
      case MessageEnum.MESSAGE:
        return message.payload;
      case MessageEnum.NEW:
        return `${message.payload} has entered`;
      case MessageEnum.OUT:
        return `${message.payload} has left`;
    }
  })();

  const justification = (() => {
    switch (message.type) {
      case MessageEnum.MESSAGE:
        return 'issuer' in message ? 'start' : 'end';
      case MessageEnum.NEW:
      case MessageEnum.OUT:
        return 'around';
      default:
        return '';
    }
  })();

  const user =
    message.type === MessageEnum.MESSAGE ? message.issuer || 'Me' : '';
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

const ChatBoxContent: React.FC<{ chatlog: MessageType[] }> = ({
  chatlog
}: {
  chatlog: MessageType[];
}) => {
  return (
    <ChatBoxContainer>
      <ChatBoxScrollable>
        {chatlog.map((chat, idx) => (
          <Message key={idx} message={chat} />
        ))}
      </ChatBoxScrollable>
    </ChatBoxContainer>
  );
};

export default ChatBoxContent;
