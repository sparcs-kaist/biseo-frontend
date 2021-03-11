import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { checkLoginStatus } from '@/utils/auth';
import {
  Container,
  HeaderGroup,
  MainHeader,
  SubHeader,
  RedirectAnchor,
} from './styled';

const Login: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    checkLoginStatus()
      .then(isLoggedIn => setLoggedIn(isLoggedIn))
      .catch(() => setLoggedIn(false));
  }, []);

  if (loggedIn) return <Redirect to="/dashboard" />;

  return (
    <Container>
      <HeaderGroup>
        <MainHeader>BISEO</MainHeader>
        <SubHeader>Login To Enter</SubHeader>
      </HeaderGroup>
      <RedirectAnchor href="/login/redirect">LOGIN</RedirectAnchor>
    </Container>
  );
};

export default Login;
