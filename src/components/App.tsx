import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import LoginRedirect from './LoginRedirect';
import LoginCallback from './LoginCallback';
import AuthedRoute from './Authed';
import Dashboard from './Dashboard';
import ChatPage from './Chat';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/chat">
          <ChatPage />
        </Route>
        <Route exact path="/login/redirect">
          <LoginRedirect />
        </Route>
        <Route exact path="/login/callback">
          <LoginCallback />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <AuthedRoute path="/">
          <Dashboard />
        </AuthedRoute>
      </Switch>
    </Router>
  );
};

export default App;
