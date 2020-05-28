import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import axios from '../utils/axios'

const AuthedRoute = ({ children, ...rest }) => {
  const [authed, setAuthed] = useState(null)

  useEffect(() => {
    axios.get('/auth')
      .then(({ data }) => {
        setAuthed(data.success)
      })
  }, [])

  if (authed === null)
    return <div>Loading...</div>
  else
    return (
      <Route {...rest}>
        { authed ? { ...children } : <Redirect to='/login'/> }
      </Route>
    )
}

export default AuthedRoute
