import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import querystring from 'querystring';
import axios from '@/utils/axios';
import { saveToken } from '@/utils/auth';

const LoginCallback: React.FC = () => {
  const location = useLocation();
  const query = location.search;
  const { code, state } = querystring.parse(
    query[0] === '?' ? query.slice(1) : query
  );
  const [valid, setValid] = useState(null);

  useEffect(() => {
    axios
      .get(`/login/callback?code=${code}&state=${state}`)
      .then(({ data }) => {
        if (data.token) {
          saveToken(data.token);
          setValid(true);
        } else {
          setValid(false);
        }
      });
  }, []);

  if (valid === null) return <div>Loading...</div>;
  else if (valid) return <Redirect to="/dashboard" />;
  else return <Redirect to="/login" />;
};

export default LoginCallback;
