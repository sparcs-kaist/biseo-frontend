import React from 'react'
import './ChatBox.css'

export enum MessageEnum {
  NEW = 'new',
  MEMBERS = 'members',
  MESSAGE = 'message',
  OUT = 'out',
}

export interface MessageType {
  type: MessageEnum;
  payload: string;
  issuer?: string;
  date?: string;
}

const Message: React.FC<{ message: MessageType }> = ({ message }: { message: MessageType }) => {
  const parseDate = (date: string) => {
    const splitted = date.split('T')
    const day = splitted[0]
    const time = (splitted[1].split(":").slice(0, 2)).join(':')
    return { day, time }
  }

  const getContent = () => {
    switch (message.type) {
      case MessageEnum.MESSAGE:
        return message.payload
      case MessageEnum.NEW:
        return `${message.payload} has entered`
      case MessageEnum.OUT:
        return `${message.payload} has left`
    }
  }

  const getJustification = () => {
    switch (message.type) {
      case MessageEnum.MESSAGE:
        return 'issuer' in message ? 'start' : 'end'
      case MessageEnum.NEW:
      case MessageEnum.OUT:
        return 'around'
      default:
        return ''
    }
  }

  const user = message.type === MessageEnum.MESSAGE ?  message.issuer || 'Me' : ''
  const date = message.type === MessageEnum.MESSAGE ? parseDate(message.date) : null

  return (
    <div className={`message ${getJustification()}`} >
      {user && <span>{user}</span>}
      <div>
        {getContent()}
        {
          date &&
          <div>
            <span>{date.day}</span>
            <span>{date.time}</span>
          </div>
        }
      </div>
    </div>
  )
}

export const ChatBox: React.FC<{ chatlog: MessageType[] }> = ({ chatlog }: { chatlog: MessageType[] }) => {
  return (
    <div id='biseo-chatbox'>
      <div id='biseo-chatbox-scrollable'>
        {chatlog.map((chat, idx) => <Message key={idx} message={chat} />)}
      </div>
    </div>
  )
}
