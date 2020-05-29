import React from 'react'
import { useHistory } from 'react-router-dom'
import { logout } from '../utils/auth'

const Dashboard = () => {
  const history = useHistory()

  const handleLogout = () => {
    logout()
    history.replace('/login')
  }

  return (
    <div>
      <h1>Hello, Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => { history.push('/chat') }}>Chat</button>
    </div>
  )
}

export default Dashboard
