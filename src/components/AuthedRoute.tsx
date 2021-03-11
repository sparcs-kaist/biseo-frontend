import React, { useState, useEffect } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { checkLoginStatus } from '@/utils/auth';

const AuthedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const [authed, setAuthed] = useState(null);

  useEffect(() => {
    checkLoginStatus()
      .then(isLoggedIn => setAuthed(isLoggedIn))
      .catch(() => setAuthed(false));
  }, []);

  if (authed === null) return <div>Loading...</div>;
  else
    return (
      <Route {...rest}>{authed ? children : <Redirect to="/login" />}</Route>
    );
};

export default AuthedRoute;
