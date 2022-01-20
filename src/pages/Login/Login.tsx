import React from 'react';
import { Redirect } from 'react-router-dom';
import { LoginStatus } from '@/common/enums';
import { useAuth } from '@/hooks';
import {
  Background,
  Container,
  HeaderGroup,
  SubHeader,
  RedirectAnchor,
} from './styled';
import Logo from './Logo.svg';

const Login: React.FC = () => {
  const loginStatus = useAuth();

  if (loginStatus === LoginStatus.LoggedIn) return <Redirect to="/" />;

  return (
    <Background>
      <Container>
        <HeaderGroup>
          <Logo style={{ marginBottom: '15px' }} />
          <SubHeader>스팍스의 총회 서비스, 스비서입니다</SubHeader>
        </HeaderGroup>
        <RedirectAnchor href="/login/redirect">LOGIN</RedirectAnchor>
      </Container>
    </Background>
  );
};

export default Login;
