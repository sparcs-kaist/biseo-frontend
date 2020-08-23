import React, { ReactChild, useState, useEffect } from 'react'
import { Route, Redirect, RouteComponentProps } from 'react-router-dom'
import axios from '../utils/axios'

const AuthedRoute = ({ children, ...rest }: { children: ReactChild, rest: RouteComponentProps }) => {
  const [authed, setAuthed] = useState(null)

  useEffect(() => {
    axios.get('/auth/check')
      .then(({ data }) => {
        setAuthed(data.success)
      })
  }, [])

  if (authed === null)
    return <div>Loading...</div>
  else
    return (
      <Route {...rest}>
        { authed ? children : <Redirect to='/login'/> }
      </Route>
    )
}

export default AuthedRoute
