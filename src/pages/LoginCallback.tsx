import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import querystring from 'querystring';
import { requestUserInfo, saveRefreshToken, saveToken } from '@/utils/auth';
import { useTypedDispatch } from '@/hooks';
import { login } from '@/store/slices/login';
import { setUser } from '@/store/slices/user';

const LoginCallback: React.FC = () => {
  const location = useLocation();
  const query = location.search;
  const { code, state } = querystring.parse(
    query[0] === '?' ? query.slice(1) : query
  );
  const [valid, setValid] = useState(null);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    requestUserInfo(code as string, state as string).then(
      ({ token, refreshToken, user }) => {
        if (token) {
          saveToken(token);
          saveRefreshToken(refreshToken);
          setValid(true);
          dispatch(login());
          dispatch(setUser(user));
        } else {
          setValid(false);
        }
      }
    );
  }, []);

  if (valid === null) return <div>Loading...</div>;
  else if (valid) return <Redirect to="/" />;
  else return <Redirect to="/login" />;
};

export default LoginCallback;
