import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import './Login.css'
import axios from '../utils/axios'

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(null)

  useEffect(() => {
    axios.get('/auth/check')
      .then(({ data }) => {
        setLoggedIn(data.success)
      })
  }, [])


  if (loggedIn)
    return <Redirect to='/dashboard'/>

  return (
    <div id='login'>
      <a href='/login/redirect'>LOGIN</a>
    </div>
  )
}

export default Login
