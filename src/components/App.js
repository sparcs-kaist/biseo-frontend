import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Login from './Login'
import LoginRedirect from './LoginRedirect'
import LoginCallback from './LoginCallback'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login/redirect">
          <LoginRedirect />
        </Route>
        <Route exact path="/login/callback">
          <LoginCallback />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}
export default App
