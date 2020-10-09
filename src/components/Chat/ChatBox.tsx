import React from 'react';
import styled from 'styled-components';

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

interface JustificationProps {
  justification: string;
}

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${(props: JustificationProps) =>
    props.justification === 'around'
      ? 'space-around'
      : `flex-${props.justification}`};
  margin-top: ${(props: JustificationProps) =>
    props.justification === 'around' ? '20px' : '50px'};
  ${(props: JustificationProps) =>
    props.justification === 'around' && `font-weight: bold`};
  position: relative;
`;

const MessageUsername = styled.span`
  bottom: calc(100% + 8px);
  font-size: 15px;
  font-weight: bold;
  position: absolute;
`;

const MessageContent = styled.div`
  background-color: #f7f6f3;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 18px;
  max-width: 500px;
  padding: 10px 15px;
  position: relative;
  word-break: break-word;
`;

const MessageDate = styled.div`
  ${(props: JustificationProps) =>
    props.justification === 'start'
      ? `
        right: calc(100% + 8px);
        align-items: flex-end;
      `
      : `
        left: calc(100% + 8px);
        align-items: flex-start;
      `}

  & > span {
    font-size: 0.6rem;
    white-space: nowrap;
  }
`;

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

const ChatBoxContainer = styled.div`
  background-color: #ffffff;
  box-sizing: border-box;
  height: 80vh;
  padding-top: 20px;
  width: 100%;
`;

const ChatBoxScrollable = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  overflow: auto;
  padding: 20px 40px;
`;

export const ChatBox: React.FC<{ chatlog: MessageType[] }> = ({
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
