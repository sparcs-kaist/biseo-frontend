import React from 'react';
import { GlobalStyle } from '@/common/style';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthedRoute from '@/components/AuthedRoute';
import {
  Login,
  LoginRedirect,
  LoginCallback,
  Dashboard,
  Main,
  AdminPage,
} from '@/pages';
import BiseoToastContainer from '@/components/BiseoToastContainer';
import { AppContainer } from './styled';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
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
      </AppContainer>
      <BiseoToastContainer />
    </Router>
  );
};

export default App;
