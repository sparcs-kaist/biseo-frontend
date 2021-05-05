import styled from 'styled-components';
import { device, size } from '@/utils/device';

export const UserMainContainer = styled.div`
  column-gap: 30px;
  display: grid;
  grid-template-areas:
    'right'
    'left';
  row-gap: 30px;
  width: 100%;
  height: 100%;

  & > .left {
    display: flex;
    flex-direction: column;
    grid-area: left;
    gap: 20px 0;

    /* the agenda component needs this limit to stay scrollable */
    max-height: 80%;
  }

  & > .right {
    grid-area: right;
    height: 70vh;
  }

  & .agendas {
    display: flex;
    flex-direction: column;
    grid-area: agendas;
    gap: 10px 0;
    overflow: auto;
  }

  @media ${device.laptop} {
    & > .right {
      /* height limit when screen is horizontally large */
      max-height: 80%;
    }

    grid-template-columns: 3fr 4fr;
    grid-template-areas: 'left right';
  }

  @media ${device.laptopL} {
    max-width: ${size.laptopL};
  }
`;

export const AdminMainContainer = styled.div`
  display: grid;
  grid-template-areas:
    'right'
    'left';
  column-gap: 30px;
  row-gap: 30px;
  width: 100%;
  height: 100%;

  & > .left {
    display: flex;
    flex-direction: column;
    grid-area: left;
    gap: 20px 0;

    /* the agenda component needs this limit to stay scrollable */
    max-height: 80%;
  }

  & > .right {
    grid-area: right;
    height: 70vh;
  }

  & .agendas {
    display: flex;
    flex-direction: column;
    gap: 10px 0;
    flex: 1;
    overflow: auto;
  }

  @media ${device.laptop} {
    & > .right {
      /* height limit when screen is horizontally large */
      max-height: 80%;
    }

    grid-template-columns: 3fr 4fr;
    grid-template-areas: 'left right';
  }

  @media ${device.laptopL} {
    max-width: ${size.laptopL};
  }
`;
