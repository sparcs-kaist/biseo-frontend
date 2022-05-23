import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { LoginStatus } from '@/common/enums';
import { checkUserAdmin } from '@/utils/auth';

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
  const isAdmin = checkUserAdmin();

  if (loginStatus === LoginStatus.Pending) return <div>Loading...</div>;
  else if (loginStatus == LoginStatus.LoggedIn && isAdmin)
    return <Route {...rest}>{children}</Route>;
  else
    return (
      <AuthedRoute {...rest}>
        <Redirect to="/" />
      </AuthedRoute>
    );
};
