import React from 'react'
import './ChatBox.css'

const MessageTypes = {
  NEW: 'new',
  MEMBERS: 'members',
  MESSAGE: 'message',
  OUT: 'out'
}

const Message = ({ message }) => {
  const user = message.type === MessageTypes.MESSAGE ?  message.issuer || 'Me' : ''

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

  return (
    <div className={`message ${getJustification()}`} >
      {user && <span>{user}</span>}
      <div>
        {getContent()}
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
