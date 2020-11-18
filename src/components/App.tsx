import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthedRoute from '@/components/AuthedRoute';
import {
  Login,
  LoginRedirect,
  LoginCallback,
  Dashboard,
  Main,
  AdminPage
} from '@/pages';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin">
          <AdminPage />
        </Route>
        <Route exact path="/main">
          <Main />
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
