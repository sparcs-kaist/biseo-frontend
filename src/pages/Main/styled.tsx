import styled from 'styled-components';
import { device, size } from '@/utils/device';

export const UserMainContainer = styled.div`
  column-gap: 30px;
  padding-top: 60px;
  display: grid;
  grid-template-areas:
    'chat'
    'agendas';
  grid-template-rows: 60vh auto;
  margin: 0 8vh;
  row-gap: 30px;

  & > .agendas {
    grid-area: agendas;
    display: flex;
    flex-direction: column;
    gap: 10px 0;
    align-self: start;
  }

  & > .chat {
    grid-area: chat;
  }

  @media ${device.laptop} {
    padding-top: 60px;
    grid-template-columns: 3fr 4fr;
    grid-template-rows: auto;
    grid-template-areas: 'agendas chat';
    height: 80vh;
  }

  @media ${device.laptopL} {
    max-width: ${size.laptopL};
    margin: 0 auto;
  }
`;

export const AdminMainContainer = styled.div`
  display: grid;
  padding-top: 60px;
  grid-template-areas:
    'chat'
    'admin'
    'agendas';
  grid-template-rows: 60vh auto auto;
  column-gap: 30px;
  row-gap: 30px;
  margin: 0 8vh;

  & > .Navbar {
    grid-area: Navbar;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }
  & > .agendas {
    grid-area: agendas;
    display: flex;
    flex-direction: column;
    gap: 10px 0;
    align-self: start;
  }

  & > .chat {
    grid-area: chat;
    height: 100%;
  }

  & > .admin {
    grid-area: admin;
  }

  @media ${device.laptop} {
    padding-top: 60px;
    grid-template-columns: 3fr 4fr;
    grid-template-rows: 40vh auto;
    grid-template-areas:
      'admin      chat'
      'agendas chat';
    height: 80vh;
  }

  @media ${device.laptopL} {
    padding-top: 60px;
    grid-template-columns: 3fr 4fr;
    grid-template-rows: 40vh auto;
    grid-template-areas:
      'admin      chat'
      'agendas chat';
    height: 80vh;
    max-width: ${size.laptopL};
    margin: 0 auto;
  }
`;
