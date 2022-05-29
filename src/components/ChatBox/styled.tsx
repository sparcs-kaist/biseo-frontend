import styled from 'styled-components';

export const ChatBoxExternalContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const ChatBoxInternalContainer = styled.div`
  position: relative;
  background-color: #ffffff;
  box-sizing: border-box;
  height: 100%;
  min-height: 200px;
  width: 100%;
`;

export const ChatBoxParticipantsBox = styled.div`
  visibility: hidden;
  position: absolute;
  right: 3%;
  background-color: #ffffff;
  box-sizing: border-box;
  border: 1px solid #f2a024;
  border-radius: 10px;
  margin-top: 0px;
  padding: 10px 20px;
  width: 180px;
  height: 35%;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  overflow: auto;
  opacity: 0;

  transition: visibility 0.3s linear, opacity 0.2s linear;
  &:hover: {
    visibility: visible;
  }
`;

export const ChatBoxParticipants = styled.div`
  display: block;
  font-size: 0.9rem;
  padding: 10px 20px;
  text-align: right;

  &:hover ${ChatBoxParticipantsBox} {
    visibility: visible;
    opacity: 1;
    transition: visibility 0.3s linear, opacity 0.2s linear;
  }
`;

export const Participant = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0px;
`;

export const ChatBoxInputGroup = styled.div`
  background-color: #fffbf0;
  border-top: 0.7px solid #f2a024;
  display: flex;
  width: 100%;
  min-height: 60px;

  & input {
    background-color: inherit;
    border: 0;
    color: #444444;
    flex-grow: 1;
    font-size: 18px;
    font-weight: bold;
    height: 100%;
    outline: 0;
    padding: 0 20px;
  }

  & button {
    background-color: inherit;
    border: 0;
    border-radius: 5px;
    color: #f2a024;
    font-size: 15px;
    font-weight: bold;
    min-width: 80px;

    &:focus {
      outline: 0;
    }

    &:hover {
      filter: brightness(0.98);
      transition: filter 0.2s linear;
    }
  }
`;

interface JustificationProps {
  justification: string;
}

export const MessageContainer = styled.div<{ username: string }>`
  display: flex;
  justify-content: ${props => (props.username ? 'flex-start' : 'flex-end')};
  margin-top: ${props => (props.username ? '35px' : '10px')};
  position: relative;
  max-width: 100%;

  -webkit-animation: bound 1s linear;

  @keyframes bound {
    0% {
      bottom: 220px;
    }
    30% {
      bottom: 0px;
    }
    45% {
      bottom: 40px;
    }
    55% {
      bottom: 70px;
    }
    70% {
      bottom: 0px;
    }
    85% {
      bottom: 20px;
    }
    100% {
      bottom: 0px;
    }
  }
`;

export const MessageUsername = styled.span`
  bottom: calc(100% + 8px);
  font-size: 15px;
  font-weight: bold;
  position: absolute;
`;

export const MessageContent = styled.div<{ username: string }>`
  background-color: ${props => (props.username === '' ? '#fec46c' : '#f7f6f3')};
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 18px;
  max-width: 90%;
  padding: 10px 15px;
  position: relative;
  word-break: break-word;
`;

export const MessageDate = styled.div`
  position: absolute;
  display: flex;
  bottom: 5%;
  flex-direction: column;

  ${(props: JustificationProps) =>
    props.justification === 'start'
      ? `
        left: calc(100% + 8px);
        align-items: flex-start;
      `
      : `
        right: calc(100% + 8px);
        align-items: flex-end;
      `}

  & > span {
    font-size: 0.6rem;
    white-space: nowrap;
  }
`;

export const ChatBoxScrollable = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column-reverse;
  height: calc(100% - 50px);
  overflow: auto;
  padding: 0px 40px;
`;

export const ChatBroadcast = styled.div<{ visible: boolean }>`
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  opacity: ${props => (props.visible ? '1' : '0')};
  display: flex;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  background-color: #111111cc;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 1rem;
  color: #ffffff;
  max-width: 90%;
  padding: 7px 20px;
  word-break: break-word;
  transition: visibility 0.4s linear, opacity 0.3s linear;
  z-index: 1;
`;
