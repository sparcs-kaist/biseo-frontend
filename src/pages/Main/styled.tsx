import styled from 'styled-components';
import { device, size } from '@/utils/device';

export const UserMainContainer = styled.div`
  display: grid;
  grid-template-areas:
    'right'
    'left';
  grid-template-rows: 1fr 1fr;
  column-gap: 37px;
  row-gap: 30px;
  width: 100%;
  height: 100%;

  & > .left {
    grid-area: agendas;
    display: flex;
    flex-direction: column;
    grid-area: left;
    gap: 20px 0;
  }

  & > .right {
    grid-area: right;
    overflow: auto;
    -moz-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  & .agendas {
    display: flex;
    flex-direction: column;
    gap: 10px 0;
    flex: 1 0 1px;
    padding: 5px;
    overflow: auto;
  }

  @media ${device.laptop} {
    grid-template-areas: 'left right';
    grid-template-columns: 1.35fr 1fr;
    grid-template-rows: none;
  }

  @media ${device.laptopL} {
    max-width: ${size.laptopL};
  }
`;

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

export const DefaultText = styled.div`
  color: ${props => props.theme.DEFAULT_TEXT};
`;
