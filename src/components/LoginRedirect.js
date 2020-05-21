import React, { useEffect } from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';


const LoginRedirect = () => {// 32807
  // http://kong.sparcs.org:8030/login
  useEffect(() => {
    fetch('http://kong.sparcs.org:32807/api/login', { method: 'POST', credentials: 'include' })
    // fetch('http://kong.sparcs.org:8030/login', { method: 'POST', credentials: 'include'})
      .then(data => data.json())
      .then(({ url }) => {
        console.log(url)
        window.location.href = url
      })
  }, [])

  return null
}

export default LoginRedirect
