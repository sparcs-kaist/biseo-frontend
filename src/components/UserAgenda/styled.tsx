import styled from 'styled-components';

export const ActiveContainer = styled.div`
  background: ${props => props.theme.AGENDA_CONTAINER_ACTIVE_BG};
  border-radius: 10px;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.25);
  padding: 30px;
  color: ${props => props.theme.DEFAULT_TEXT};
`;

export const ActiveContainerTitle = styled.div<{ detailed?: boolean }>`
  font-size: 1.3rem;
  font-weight: 700;
  ${({ detailed }) =>
    detailed
      ? 'word-wrap: break-word'
      : 'overflow: hidden; text-overflow: ellipsis;'}
`;

export const ActiveContainerProgress = styled.div<{ detailed?: boolean }>`
  font-size: 1rem;
  font-weight: 400;
  margin-top: 20px;
  ${({ detailed }) =>
    detailed
      ? 'word-wrap: break-word'
      : 'overflow: hidden; text-overflow: ellipsis;'}
`;

export const ActiveContainerContent = styled.div`
  border: none;
  border-bottom: 1px solid #f2a024;
  border-top: 1px solid #f2a024;
  margin: 20px 0px;
  padding: 15px 5px;
  font-size: 0.7rem;
  font-weight: 400;
  word-wrap: break-word;
`;

export const ActiveContainerSubtitle = styled.div`
  font-weight: 700;
  margin-bottom: 15px;
  word-wrap: break-word;
`;

export const InactiveContainer = styled.div`
  align-items: center;
  background: ${props => props.theme.AGENDA_CONTAINER_INACTIVE_BG};
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.25);
  padding: 15px 30px;
  position: relative;
  cursor: pointer;
  color: ${props => props.theme.DEFAULT_TEXT};

  &::before {
    background: ${props => props.theme.AGENDA_CONTAINER_DETAILED};
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 5px;
  }

  & > .title {
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 10px;
  }

  & > .result-info {
    font-size: 0.8rem;
  }

  &:hover {
    filter: brightness(0.98);
    transition: filter 0.3s linear;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
`;
