import styled from 'styled-components';
import { MdAccountCircle } from 'react-icons/md';

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
  align-items: center;
`;

export const RHS = styled.div`
  display: flex;
  align-items: center;
`;

export const OptionButton = styled.button<{
  display_none?: boolean;
}>`
  border: none;
  display: ${props => (props.display_none ? 'none' : 'flex')};
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

export const AccountSubmenu = styled.div`
  z-index: 1;
  visibility: hidden;

  align-items: center;
  text-align: center;
  position: absolute;
  top: 45px;
  /* right: 20px; */

  background: #ffffff;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  font-size: 14px;
  font-style: normal;
  transition: all 0.3s;

  &:hover {
    visibility: visible;
    transition-delay: 0s;
  }
`;

export const AccountSubitem = styled.div`
  z-index: 1;
  display: inline-block;
  padding: 5px 15px;
  line-height: inherit;
  cursor: default;

  &:hover {
    visibility: visible;
  }
`;

export const AccountIcon = styled(MdAccountCircle)`
  padding: 1px 6px;

  &:hover ~ ${AccountSubmenu} {
    visibility: visible;
  }
`;

export const AccountDropdown = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  margin-right: 15px;
`;
