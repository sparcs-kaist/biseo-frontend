import styled from 'styled-components';

export const AdminTab = styled.div<{ selected?: boolean }>`
  background-color: ${props =>
    props.selected
      ? props.theme.HEADER_TAB_ACTIVE_BG
      : props.theme.HEADER_TAB_INACTIVE_BG};
  border-left: 1px solid #f2a024;
  border-right: 1px solid #f2a024;
  border-top: 1px solid #f2a024;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: ${props =>
    props.selected
      ? props.theme.HEADER_TAB_INACTIVE_BG
      : props.theme.HEADER_TAB_ACTIVE_BG};
  font-family: monospace;
  font-size: 1.2rem;
  margin-bottom: -1px;
  margin-right: 3px;
  padding: 5px 30px;
  text-align: center;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
`;
