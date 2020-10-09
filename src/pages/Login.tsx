import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import axios from '@/utils/axios';

const Container = styled.div`
  -moz-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  align-items: center;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  font-weight: bold;
  height: 345px;
  justify-content: space-evenly;
  margin: 0 auto;
  margin-top: 100px;
  width: 440px;
`;

const HeaderGroup = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const MainHeader = styled.h1`
  margin: 0 0 15px 0;
`;

const SubHeader = styled.h4`
  color: #f2a024;
  margin: 0 0 15px 0;
`;

const RedirectAnchor = styled.a`
  background-color: #f2a024;
  border-radius: 13px;
  color: white;
  display: inline-block;
  padding: 10px 20px;
  text-decoration: none !important;
`;

const Login: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(null);

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
