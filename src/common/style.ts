import { createGlobalStyle } from 'styled-components';
import { device, maxWidth } from '@/utils/device';

export const COLOR = {
  primary: '#f2a024',
};

export const GlobalStyle = createGlobalStyle`
  :root {
    --header-height: 50px;
    --biseo-primary: ${COLOR.primary};
  }

  @media screen and ${device.mobile} {
    :root {
      --screen-max-width: ${maxWidth.mobile};
    }
  }

  @media screen and ${device.tablet} {
    :root {
      --screen-max-width: ${maxWidth.tablet};
    }
  }

  @media screen and ${device.laptop} {
    :root {
      --screen-max-width: ${maxWidth.laptop};
    }
  }

  @media screen and ${device.laptopL} {
    :root {
      --screen-max-width: ${maxWidth.laptopL};
    }
  }
`;
