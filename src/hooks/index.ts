import { useState, useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { logout, login } from '@/store/slices/login';
import { setUser } from '@/store/slices/user';
import { LoginStatus } from '@/common/enums';
import { checkLoginStatus } from '@/utils/auth';
import type { RootState } from '@/common/types';
import type { AppDispatch } from '@/store';

// eslint-disable-next-line
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = (): LoginStatus => {
  const [loggedIn, setLoggedIn] = useState<LoginStatus>(LoginStatus.Pending);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    checkLoginStatus()
      .then(isLoggedIn => {
        setLoggedIn(
          isLoggedIn ? LoginStatus.LoggedIn : LoginStatus.NotLoggedIn
        );
        dispatch(login());
      })
      .catch(() => {
        setLoggedIn(LoginStatus.NotLoggedIn);
        dispatch(logout());
        dispatch(setUser({ sparcsID: null, ssoUID: null }));
      });
  });

  return loggedIn;
};
