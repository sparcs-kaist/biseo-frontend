import React, { useMemo } from 'react';
import { GlobalStyle } from '@/common/style';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthedRoute, AdminAuthedRoute } from '@/components/AuthedRoute';
import { Login, LoginRedirect, LoginCallback, Main, AdminPage } from '@/pages';
import BiseoToastContainer from '@/components/BiseoToastContainer';
import Header from '@/components/Header';
import { AppContainer } from './styled';
import io from 'socket.io-client';
import { getToken } from '@/utils/auth';
import { useTypedSelector } from '@/hooks';

const App: React.FC = () => {
  const isLoggedIn = useTypedSelector(state => state.loggedIn);
  const socket = useMemo(
    () =>
      io(process.env.SERVER_URL, {
        transports: ['websocket'],
        upgrade: false,
        query: `token=${getToken()}`,
      }),
    [isLoggedIn]
  );

  return (
    <Router>
      <GlobalStyle />
      <Header socket={socket} />
      <AppContainer>
        <Switch>
          <Route exact path="/login/redirect">
            <LoginRedirect />
          </Route>
          <Route exact path="/login/callback">
            <LoginCallback />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <AdminAuthedRoute path="/admin">
            <AdminPage socket={socket} />
          </AdminAuthedRoute>
          <AuthedRoute path="/">
            <Main socket={socket} />
          </AuthedRoute>
        </Switch>
      </AppContainer>
      <BiseoToastContainer />
    </Router>
  );
};

export default App;
