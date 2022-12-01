import styled from 'styled-components';
import { MdAccountCircle } from 'react-icons/md';

export const HeaderContainer = styled.div`
  height: calc(var(--header-height) + var(--header-margin));
  background: ${props => props.theme.HEADER_BG};
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

export const OptionButton = styled.button<{ display_none?: boolean }>`
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

export const AccountSubmenu = styled.div<{ visible?: boolean }>`
  z-index: 1;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};

  align-items: center;
  text-align: center;
  position: absolute;
  top: 40px;

  background: ${props => props.theme.HEADER_BG};
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  font-size: 14px;
  font-style: normal;
  color: ${props => props.theme.DEFAULT_TEXT};
  opacity: ${props => (props.visible ? '1' : '0')};
  transition: ${props =>
    props.visible ? 'visibility 0.4s linear, opacity 0.3s linear' : 'none'};
`;

export const AccountSubitem = styled.div`
  z-index: 1;
  display: inline-block;
  padding: 10px 30px;
  line-height: inherit;
  cursor: default;
`;

export const AccountIcon = styled(MdAccountCircle)`
  padding: 1px 6px;
`;

export const AccountDropdown = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  margin-right: 15px;
`;

export const OverlayContainer = styled.div`
  position: fixed;
  top: var(--header-size);
  left: 0;
  height: calc(100vh - var(--header-size));
  min-height: 635px;
  width: 100%;
  min-width: 500px;
  background: rgba(68, 68, 68, 0.6);
  z-index: 1;
  display: flex;
`;

export const NameChangeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 130px;
  background: #ffffff;
  border-radius: 10px;
  z-index: 2;
  margin: auto auto;
  padding: 30px;

  -webkit-animation: scale-in-center 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  @keyframes scale-in-center {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const NameChangeInput = styled.input`
  width: calc(100% - 50px);
  height: 25px;
  outline: none;
  border: 1px solid #f2a024;
  border-radius: 5px;
  padding: 5px;
  margin: 20px 20px 0px 20px;
`;
