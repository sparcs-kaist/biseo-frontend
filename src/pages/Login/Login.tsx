import React from 'react';
import { Redirect } from 'react-router-dom';
import { LoginStatus } from '@/common/enums';
import { useAuth } from '@/hooks';
import {
  Container,
  HeaderGroup,
  MainHeader,
  SubHeader,
  RedirectAnchor,
} from './styled';

const Login: React.FC = () => {
  const loginStatus = useAuth();

  if (loginStatus === LoginStatus.LoggedIn) return <Redirect to="/dashboard" />;

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
