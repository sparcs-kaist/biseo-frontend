import { useState, useEffect } from 'react';
import { LoginStatus } from '@/common/enums';
import { checkLoginStatus } from '@/utils/auth';

export const useAuth = (): LoginStatus => {
  const [loggedIn, setLoggedIn] = useState<LoginStatus>(LoginStatus.Pending);

  useEffect(() => {
    checkLoginStatus()
      .then(isLoggedIn =>
        setLoggedIn(isLoggedIn ? LoginStatus.LoggedIn : LoginStatus.NotLoggedIn)
      )
      .catch(() => setLoggedIn(LoginStatus.NotLoggedIn));
  });

  return loggedIn;
};
