import styled from 'styled-components';

export const ChatBoxExternalContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const ChatBoxInternalContainer = styled.div`
  background-color: #ffffff;
  box-sizing: border-box;
  height: 100%;
  min-height: 200px;
  padding-top: 20px;
  width: 100%;
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
      background-color: #f7f3e9;
    }
  }
`;

interface JustificationProps {
  justification: string;
}

export const MessageContainer = styled.div`
  display: flex;
  justify-content: ${(props: JustificationProps) =>
    props.justification === 'around'
      ? 'space-around'
      : `flex-${props.justification}`};
  margin-top: ${(props: JustificationProps) =>
    props.justification === 'around' ? '20px' : '50px'};
  ${(props: JustificationProps) =>
    props.justification === 'around' && `font-weight: bold`};
  position: relative;
  max-width: 100%;
`;

export const MessageUsername = styled.span`
  bottom: calc(100% + 8px);
  font-size: 15px;
  font-weight: bold;
  position: absolute;
`;

export const MessageContent = styled.div`
  background-color: #f7f6f3;
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
  height: 100%;
  overflow: auto;
  padding: 20px 40px;
`;
