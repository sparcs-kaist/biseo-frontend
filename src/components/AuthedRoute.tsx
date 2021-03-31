import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { LoginStatus } from '@/common/enums';

const AuthedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const loginStatus = useAuth();

  if (loginStatus === LoginStatus.Pending) return <div>Loading...</div>;
  else
    return (
      <Route {...rest}>
        {loginStatus === LoginStatus.LoggedIn ? (
          children
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
    );
};

export default AuthedRoute;
