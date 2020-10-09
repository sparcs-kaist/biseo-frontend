import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from '@/utils/axios';
import {
  Container,
  HeaderGroup,
  MainHeader,
  SubHeader,
  RedirectAnchor
} from './styled';

const Login: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    axios.get('/auth/check').then(({ data }) => {
      setLoggedIn(data.success);
    });
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
