import styled from 'styled-components';

export const AdminContentContainer = styled.form`
  background: ${props => props.theme.AGENDA_CONTAINER_INACTIVE_BG};
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
  color: ${props => props.theme.DEFAULT_TEXT};
  background: ${props => props.theme.AGENDA_CONTAINER_INACTIVE_BG};

  ::placeholder {
    color: ${props => props.theme.DEFAULT_PLACEHOLDER};
  }

  &:focus {
    outline: none;
  }

  &.error::placeholder {
    color: #ff775e;
    opacity: 1;
  }
`;

export const ContentTextArea = styled.textarea`
  background: ${props => props.theme.AGENDA_CONTAINER_INACTIVE_BG};
  border: none;
  border-bottom: 1px solid #f2a024;
  border-top: 1px solid #f2a024;
  font-size: 1.1rem;
  font-family: 'NanumGothic';
  color: ${props => props.theme.DEFAULT_TEXT};
  min-height: 150px;
  padding: 15px 0;
  resize: none;

  ::placeholder {
    color: ${props => props.theme.DEFAULT_PLACEHOLDER};
  }

  &:focus {
    outline: none;
  }

  &.error::placeholder {
    color: #ff775e;
    opacity: 1;
  }
`;

export const SubtitleInput = styled.input`
  background: ${props => props.theme.AGENDA_CONTAINER_INACTIVE_BG};
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 15px 0;
  color: ${props => props.theme.DEFAULT_TEXT};

  ::placeholder {
    color: ${props => props.theme.DEFAULT_PLACEHOLDER};
  }

  &:focus {
    outline: none;
  }

  &.error::placeholder {
    color: #ff775e;
    opacity: 1;
  }
`;

export const ButtonGroup = styled.div<{ alignRight?: boolean }>`
  margin-top: 30px;
  ${({ alignRight }) =>
    alignRight && 'display: flex; justify-content: flex-end;'}
  overflow: auto;
  padding: 3px 0px;
  max-height: 150px;
`;

export const InputNewChoice = styled.input`
  width: 60px;
  align-items: center;
  background: ${props => props.theme.AGENDA_CONTAINER_INACTIVE_BG};
  border: 1px solid #f2a024;
  border-radius: 16px;
  box-shadow: 2px 3px 5px -1px rgba(0, 0, 0, 0.4);
  color: ${props => props.theme.DEFAULT_TEXT};
  display: inline-flex;
  font-size: 0.8rem;
  justify-content: center;
  margin-right: 15px;
  padding: 5px 9px;

  &:focus {
    outline: none;
  }
`;

export const AdminContentBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const AdminContentText = styled.div<{ isTitle?: boolean }>`
  font-size: 1rem;
  ${({ isTitle }) => isTitle && 'font-size: 1.3rem;'}
  font-weight: 700;
  word-wrap: break-word;
  color: ${props => props.theme.DEFAULT_TEXT};
`;
