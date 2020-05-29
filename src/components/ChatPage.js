import React from 'react'
import socketio from 'socket.io-client'
import ChatBox from './ChatBox'
import { getToken } from '../utils/auth'
import './ChatPage.css'

const ChatPage = () => {
  const socket = socketio.connect('kong.sparcs.org:32811', { query: `token=${getToken()}`})

  return (
    <div className="App">
      <div className="App-header">
        <h1>Chatting room</h1>
        <h2 id="username"></h2>
      </div>
      <ChatBox socket={socket} />
    </div>
  )
}

export default ChatPage
