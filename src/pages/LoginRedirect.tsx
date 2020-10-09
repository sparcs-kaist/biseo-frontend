import React, { useEffect } from 'react';
import axios from '@/utils/axios';

const LoginRedirect: React.FC = () => {
  useEffect(() => {
    axios.post('/login').then(({ data: { url } }) => {
      window.location.href = url;
    });
  }, []);

  return null;
};

export default LoginRedirect;
