import styled from 'styled-components';
import background from './background.png';

export const Background = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  min-height: 500px;
  position: absolute;
  left: 0px;
  top: 0px;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${background});
  background-size: cover;
`;

export const Container = styled.div`
  -moz-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  align-items: center;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  height: 345px;
  justify-content: space-evenly;
  margin: 25vh auto;
  width: 383px;
`;

export const HeaderGroup = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const SubHeader = styled.h4`
  margin: 0;
  font-weight: normal;
`;

export const RedirectAnchor = styled.a`
  background-color: #f2a024;
  border-radius: 13px;
  color: white;
  display: inline-block;
  padding: 10px 20px;
  text-decoration: none !important;
`;
