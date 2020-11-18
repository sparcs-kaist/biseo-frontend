import styled from 'styled-components';
import { device, size } from '@/utils/device';

export const MainContainer = styled.div`
  display: grid;
  grid-template-areas:
    'chat'
    'vote-items';
  grid-template-rows: 60vh auto;
  column-gap: 30px;
  row-gap: 30px;

  @media ${device.laptop} {
    grid-template-columns: 3fr 4fr;
    grid-template-rows: 90vh auto;
    grid-template-areas: 'vote-items chat';
  }

  @media ${device.laptopL} {
    max-width: ${size.laptopL};
    margin: 0 auto;
  }
`;
