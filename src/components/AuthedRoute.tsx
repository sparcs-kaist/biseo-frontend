import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth, useTypedSelector } from '@/hooks';
import { LoginStatus } from '@/common/enums';

export const AuthedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
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

export const AdminAuthedRoute: React.FC<RouteProps> = ({
  children,
  ...rest
}) => {
  const loginStatus = useAuth();
  const user = useTypedSelector(state => state.user);

  if (loginStatus === LoginStatus.Pending) return <div>Loading...</div>;
  else if (loginStatus == LoginStatus.LoggedIn && user.isUserAdmin)
    return <Route {...rest}>{children}</Route>;
  else
    return (
      <AuthedRoute {...rest}>
        <Redirect to="/" />
      </AuthedRoute>
    );
};
