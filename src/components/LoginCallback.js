import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import querystring from 'querystring'

const LoginCallback = () => {
  const location = useLocation()
  const query = location.search
  const { code, state } = querystring.parse(query[0] === '?' ? query.slice(1) : query)

  useEffect(() => {
    console.log(code, state)
    fetch(`http://kong.sparcs.org:32807/api/login/callback?code=${code}&state=${state}`, { credentials: 'include' })
    // fetch(`http://kong.sparcs.org:8030/account/login/callback?code=${code}&state=${state}`, { credentials: 'include' })
      .then(data => data.json())
      .then(({ token }) => {
        return fetch('http://kong.sparcs.org:32807/api/authCheck', { credentials: 'include', headers: {
          'x-access-token': token
        }})
      })
      .then(data => data.json())
      .then(data => { console.log(data) })
  }, [])

  return <div>{ `${code}-${state}` }</div>
}

export default LoginCallback

