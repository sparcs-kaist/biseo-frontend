import { useState, useEffect } from 'react';
import { LoginStatus } from '@/common/enums';
import { checkLoginStatus } from '@/utils/auth';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/common/types';
import type { AppDispatch } from '@/store';

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

// eslint-disable-next-line
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
