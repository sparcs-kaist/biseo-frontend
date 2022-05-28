import { device } from '@/utils/device';
import styled from 'styled-components';

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

export const VoterChoiceContainer = styled.div`
  width: 390px;
  height: 60vh;
  min-height: 400px;
  background: #ffffff;
  border-radius: 10px;
  z-index: 2;
  margin: auto auto;
  padding: 30px;

  @media ${device.mobile} {
    width: 512px;
  }

  @media ${device.tablet} {
    width: 630px;
  }

  @media ${device.laptop} {
    width: 768px;
  }

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

export const VoterChoiceHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  @media ${device.tablet} {
    flex-direction: row;
  }
`;

export const VoterChoiceHeaderTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 10px;
  margin-right: 15px;

  @media ${device.tablet} {
    margin-bottom: 0px;
  }
`;

export const VoterList = styled.div`
  height: calc(90% - 60px);
  margin-top: 30px;
  overflow: auto;
`;

export const VoterChoiceBottom = styled.div`
  display: flex;
  flex-direction: row-reverse;
  /* margin-top: auto; */

  @media ${device.tablet} {
    margin-top: 34px;
  }
`;

export const PresetChoiceContainer = styled.div`
  position: fixed;
  bottom: calc((40vh - var(--header-size)) / 2 + 35px);
  padding: 8px;
  padding-left: 23px;
  background: #f2a024;
  border-radius: 10px;
`;

export const CheckButton = styled.button<{
  check?: boolean;
}>`
  width: 120px;
  min-height: 45px;
  background-color: ${props => (props.check ? '#FFBF43' : '#ffffff')};
  border: ${props => (props.check ? '1px solid #FFBF43' : '1px solid #D6D6D6')};
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  color: #000000;
  display: inline-flex;
  font-size: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-right: 5px;
  margin-bottom: 12px;
  padding: 0px 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    cursor: pointer;
    filter: brightness(0.95);
    transition: filter 0.3s linear;
  }

  &:active {
    filter: brightness(0.95);
    transform: translateY(0.5px);
    box-shadow: 1px 2px 5px -1px rgba(0, 0, 0, 0.6);
  }
`;

export const CheckButtonInput = styled.input`
  width: 108px;
  min-height: 43px;
  background-color: #ffffff;
  border: 1px solid #d6d6d6;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  color: #000000;
  display: inline-flex;
  font-size: 1rem;
  align-items: center;
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 0px 5px;
  white-space: nowrap;
`;
