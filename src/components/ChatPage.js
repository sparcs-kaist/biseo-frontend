import React from 'react'
import socketio from 'socket.io-client'
import Chatbox from './Chatbox'
import './ChatPage.css'

const ChatPage = () => {
  const socket = socketio.connect('aria.sparcs.org:32888')

  return (
    <div className="App">
      <div className="App-header">
        <h1>Chatting room</h1>
        <h2 id="username"></h2>
      </div>
      <Chatbox socket={socket}></Chatbox>
    </div>
  )
}

export default ChatPage
