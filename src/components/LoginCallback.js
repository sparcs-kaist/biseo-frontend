import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import querystring from 'querystring'
import axios from '../utils/axios'

const LoginCallback = () => {
  const location = useLocation()
  const query = location.search
  const { code, state } = querystring.parse(query[0] === '?' ? query.slice(1) : query)

  useEffect(() => {
    axios.get(`/account/login/callback?code=${code}&state=${state}`)
      .then(res => {
        console.log(res.data)
      })
  }, [])

  return <div>{ `${code}-${state}` }</div>
}

export default LoginCallback

