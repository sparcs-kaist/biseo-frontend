import React from 'react'
import socketio from 'socket.io-client'
import ChatBox from './ChatBox'
import './ChatPage.css'

const ChatPage = () => {
  const socket = socketio.connect('aria.sparcs.org:32888')

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
