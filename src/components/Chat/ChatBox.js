import React from 'react'
import './ChatBox.css'

const MessageTypes = {
  NEW: 'new',
  MEMBERS: 'members',
  MESSAGE: 'message',
  OUT: 'out'
}

const Message = ({ message }) => {
  const justification = message.type === MessageTypes.MESSAGE ?
    ('issuer' in message ? 'flex-start' : 'flex-end') :
    (message.type === MessageTypes.NEW || message.type === MessageTypes.OUT ? 'space-around' : '')

  const getContent = () => {
    switch (message.type) {
      case MessageTypes.MESSAGE:
        if ('issuer' in message)
          return `${message.issuer}: ${message.payload}`
        else
          return `Me: ${message.payload}`
      case MessageTypes.NEW:
        return `${message.payload} has entered`
      case MessageTypes.OUT:
        return `${message.payload} has left`
    }
  }
  return (
    <div style={{ display: 'flex', justifyContent: justification}}>
      {getContent()}
    </div>
  )
}

const ChatBox = ({ chatlog }) => {
  return (
    <div className="chatbox">
      {chatlog.map((chat, idx) => <Message key={idx} message={chat} />)}
    </div>
  )
}


export default ChatBox
