import React, { useState, useEffect, useMemo } from 'react'
import ChatBox from './ChatBox'
import socketio from 'socket.io-client'
import { getToken } from '../../utils/auth'
import './ChatPage.css'

const MessageTypes = {
  NEW: 'new',
  MEMBERS: 'members',
  MESSAGE: 'message',
  OUT: 'out'
}

const ChatPage = () => {
  const socket = useMemo(() => socketio.connect(
    'kong.sparcs.org:32811',
    {
      transports: ['websocket'],
      upgrade: false,
      query: `token=${getToken()}`
    }
  ), [])
  const [name, setName] = useState('')
  const [chatlog, setChatlog] = useState([]) // elements of chatlog have two required fields: type, payload
  const [members, setMembers] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    socket.on('name', username => setName(username))

    socket.on('enter', username => {
      setChatlog(chatlog => [{ type: MessageTypes.NEW, payload: username }, ...chatlog])
      setMembers(members => [...members, username])
    })

    socket.on('members', members => setMembers(members))

    socket.on('chat message', (user, message) => {
      setChatlog(chatlog => [{
        type: MessageTypes.MESSAGE,
        payload: message,
        ...(user !== name && { issuer: user })
      }, ...chatlog])
    })

    socket.on('out', username => {
      setChatlog(chatlog => [{ type: MessageTypes.OUT, payload: username }, ...chatlog])
      setMembers(members => members.filter(member => member !== username))
    })
  }, [])

  const handleMessageChange = e => { setMessage(e.target.value) }

  const sendMessage = () => {
    if (message.trim() === '') return;

    setMessage('')
    socket.emit('chat message', message)
    setChatlog([{ type: MessageTypes.MESSAGE, payload: message }, ...chatlog])
  }

  const handleMessageKeypress = e => { if (e.key === 'Enter') sendMessage() }

  return (
    <>
      <h3>Hello, {name}</h3>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {members.map(member => <div key={member}>{member}</div>)}
        </div>
        <div id='biseo-chat'>
          <ChatBox chatlog={chatlog} />
          <div id='biseo-chatbox-input'>
            <input type="text" value={message} onChange={handleMessageChange} onKeyPress={handleMessageKeypress}/>
            <button onClick={sendMessage}>SEND</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatPage
