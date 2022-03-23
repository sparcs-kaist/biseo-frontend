import styled from 'styled-components';

export const AdminContentContainer = styled.form`
  background: white;
  border: 1px solid #f2a024;
  box-shadow: 1px 4px 5px 0px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
`;

export const TitleInput = styled.input`
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 15px 0;
  display: block;

  &:focus {
    outline: none;
  }

  &.error::placeholder {
    color: #ff775e;
    opacity: 1;
  }
`;

export const ContentTextArea = styled.textarea`
  border: none;
  border-bottom: 1px solid #f2a024;
  border-top: 1px solid #f2a024;
  font-size: 1.1rem;
  min-height: 150px;
  padding: 15px 0;
  resize: none;

  &:focus {
    outline: none;
  }

  &.error::placeholder {
    color: #ff775e;
    opacity: 1;
  }
`;

export const SubtitleInput = styled.input`
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 15px 0;

  &:focus {
    outline: none;
  }

  &.error::placeholder {
    color: #ff775e;
    opacity: 1;
  }
`;

export const ButtonGroup = styled.div<{ alignRight?: boolean }>`
  display: flex;
  margin-top: 30px;
  ${({ alignRight }) => alignRight && 'justify-content: flex-end;'}
`;

export const InputNewChoice = styled.input`
  width: 60px;
  align-items: center;
  background: '#ffffff';
  border: 1px solid #f2a024;
  border-radius: 16px;
  box-shadow: 2px 3px 5px -1px rgba(0, 0, 0, 0.4);
  color: '#000000';
  display: inline-flex;
  font-size: 0.8rem;
  justify-content: center;
  margin-right: 15px;
  padding: 5px 9px;

  &:focus {
    outline: none;
  }
`;
