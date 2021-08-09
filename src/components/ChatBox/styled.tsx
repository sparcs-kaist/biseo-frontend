import styled from 'styled-components';

export const ChatBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
