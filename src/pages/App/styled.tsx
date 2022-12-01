import styled from 'styled-components';

export const AppContainer = styled.div`
  height: calc(
    100% - var(--header-size) - var(--main-margin-top) -
      var(--main-margin-bottom)
  );
  max-width: var(--screen-max-width);
  margin: 0 auto;
  margin-top: var(--main-margin-top);
  margin-bottom: var(--main-margin-bottom);
`;

export const RootBackground = styled.div`
  height: 100%;
  background-color: ${props => props.theme.ROOT_BG};
`;
