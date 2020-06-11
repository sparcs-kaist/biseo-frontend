import React from 'react'
import './ChatBox.css'

const MessageTypes = {
  NEW: 'new',
  MEMBERS: 'members',
  MESSAGE: 'message',
  OUT: 'out'
}

const Message = ({ message }) => {
  const parseDate = date => {
    const splitted = date.split('T')
    const day = splitted[0]
    const time = (splitted[1].split(":").slice(0, 2)).join(':')
    return { day, time }
  }

  const getContent = () => {
    switch (message.type) {
      case MessageTypes.MESSAGE:
        return message.payload
      case MessageTypes.NEW:
        return `${message.payload} has entered`
      case MessageTypes.OUT:
        return `${message.payload} has left`
    }
  }

  const getJustification = () => {
    switch (message.type) {
      case MessageTypes.MESSAGE:
        return 'issuer' in message ? 'start' : 'end'
      case MessageTypes.NEW:
      case MessageTypes.OUT:
        return 'around'
      default:
        return ''
    }
  }

  const user = message.type === MessageTypes.MESSAGE ?  message.issuer || 'Me' : ''
  const date = message.type === MessageTypes.MESSAGE ? parseDate(message.date) : null

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

const ChatBox = ({ chatlog }) => {
  return (
    <div id='biseo-chatbox'>
      <div id='biseo-chatbox-scrollable'>
        {chatlog.map((chat, idx) => <Message key={idx} message={chat} />)}
      </div>
    </div>
  )
}


export default ChatBox
