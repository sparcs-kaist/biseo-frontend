import styled from 'styled-components';

export const HeaderContainer = styled.div`
  height: calc(var(--header-height) + var(--header-margin));
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: var(--header-border) solid var(--biseo-primary);
`;

export const HeaderContent = styled.div`
  width: var(--screen-max-width);
  display: flex;
  justify-content: space-between;
`;

export const RHS = styled.div`
  display: flex;
  align-items: center;
`;

export const OptionButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  background: inherit;
  margin-right: 15px;
  &:hover {
    cursor: pointer;
  }
`;
