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

export const EnteredContainer = styled.div`
  height: 0;
`;

export const VacantContainer = styled.div`
  position: absolute;
  height: calc(100vh - var(--header-size));
  width: 100vw;
  background: rgba(68, 68, 68, 0.6);
  z-index: 1;
  display: flex;
`;

export const MessageContainer = styled.div`
  height: min(100%, 74px);
  width: calc(0.5 * var(--screen-max-width));
  background: rgba(255, 255, 255, 1);
  z-index: 2;
  margin: auto auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 17px;
  font-style: normal;
`;
