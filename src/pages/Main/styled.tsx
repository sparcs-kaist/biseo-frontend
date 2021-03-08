import styled from 'styled-components';
import { device, size } from '@/utils/device';

export const UserMainContainer = styled.div`
  column-gap: 30px;
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

  & > .admin {
    grid-area: admin;
  }

  @media ${device.laptop} {
    grid-template-columns: 3fr 4fr;
    grid-template-rows: 90vh;
    grid-template-areas: 'agendas chat';
  }

  @media ${device.laptopL} {
    max-width: ${size.laptopL};
    margin: 0 auto;
  }
`;

export const AdminMainContainer = styled.div`
  display: grid;
  grid-template-areas:
    'chat'
    'admin'
    'agendas';
  grid-template-rows: 60vh auto auto;
  column-gap: 30px;
  row-gap: 30px;
  margin: 0 8vh;

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

  & > .admin {
    grid-area: admin;
  }

  @media ${device.laptop} {
    grid-template-columns: 3fr 4fr;
    grid-template-rows: auto;
    grid-template-areas:
      'admin      chat'
      'agendas chat';
  }

  @media ${device.laptopL} {
    grid-template-columns: 3fr 4fr;
    grid-template-rows: auto;
    grid-template-areas:
      'admin      chat'
      'agendas chat';

    max-width: ${size.laptopL};
    margin: 0 auto;
  }
`;
