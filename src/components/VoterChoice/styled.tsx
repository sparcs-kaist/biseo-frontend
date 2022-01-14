import styled from 'styled-components';

export const OverlayContainer = styled.div`
  position: absolute;
  top: var(--header-size);
  left: 0;
  height: calc(100vh - var(--header-size));
  width: 100vw;
  background: rgba(68, 68, 68, 0.6);
  z-index: 1;
  display: flex;
`;

export const VoterChoiceContainer = styled.div`
  width: calc(0.8 * var(--screen-max-width));
  height: 60vh;
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

export const VoterChoiceHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const VoterList = styled.div`
  height: calc(90% - 40px);
  margin-top: 30px;
  overflow: auto;
`;

export const VoterChoiceBottom = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: auto;
`;

export const PresetChoiceContainer = styled.div`
  position: fixed;
  bottom: calc((40vh - var(--header-size)) / 2 + 35px);
  padding: 8px;
  padding-left: 23px;
  background: #f2a024;
  border-radius: 10px;
`;
