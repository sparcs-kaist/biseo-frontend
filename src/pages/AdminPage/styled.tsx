import styled from 'styled-components';
import { device, size } from '@/utils/device';

export const AdminMainContainer = styled.div`
  display: grid;
  grid-template-areas:
    'admin'
    'agendas';
  column-gap: 30px;
  row-gap: 30px;
  width: 100%;
  height: 100%;

  & > .admin {
    grid-area: admin;
  }

  & > .agendas {
    grid-area: agendas;
    display: flex;
    flex-direction: column;
    gap: 10px 0;
    flex: 1 0 1px;
    padding: 5px;
    overflow: auto;
  }

  @media ${device.laptop} {
    grid-template-columns: 5fr 4fr;
    grid-template-rows: auto;
    grid-template-areas: 'admin agendas';
  }

  @media ${device.laptopL} {
    max-width: ${size.laptopL};
  }
`;
