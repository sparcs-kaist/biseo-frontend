import React, { useEffect } from 'react';
import { requestRedirectURL } from '@/utils/auth';

const LoginRedirect: React.FC = () => {
  useEffect(() => {
    requestRedirectURL().then(url => {
      window.location.href = url;
    });
  }, []);

  return null;
};

export default LoginRedirect;
