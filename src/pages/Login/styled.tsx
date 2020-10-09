import styled from 'styled-components';

export const Container = styled.div`
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

export const HeaderGroup = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const MainHeader = styled.h1`
  margin: 0 0 15px 0;
`;

export const SubHeader = styled.h4`
  color: #f2a024;
  margin: 0 0 15px 0;
`;

export const RedirectAnchor = styled.a`
  background-color: #f2a024;
  border-radius: 13px;
  color: white;
  display: inline-block;
  padding: 10px 20px;
  text-decoration: none !important;
`;
