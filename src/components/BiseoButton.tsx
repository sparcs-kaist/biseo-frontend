import styled from 'styled-components';

const BiseoButton = styled.button<{
  background?: string;
  foreground?: string;
  nocursor?: boolean;
  select?: boolean;
  vacant?: boolean;
}>`
  align-items: center;
  background: ${props =>
    props.vacant
      ? '#3C3C3C'
      : props.select
      ? props.theme.BISEO_BUTTON_SELECT_BG
      : props.theme.BISEO_BUTTON_DEFAULT_BG};
  border: 1px solid ${props => props.theme.BISEO_BUTTON_BORDER};
  border-radius: 16px;
  box-shadow: 2px 3px 5px -1px rgba(0, 0, 0, 0.4);
  color: ${props => (props.vacant ? '#ffffff' : props.theme.DEFAULT_TEXT)};
  display: inline-flex;
  font-size: 0.9rem;
  justify-content: center;
  margin-right: 15px;
  min-width: 80px;
  padding: 5px 20px;
  white-space: nowrap;

  &:hover {
    cursor: ${props => (props.nocursor ? 'default' : 'pointer')};
    ${props => !props.nocursor && 'filter: brightness(0.98);'}
  }

  &:disabled,
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:active {
    ${props =>
      !props.nocursor &&
      `
        filter: brightness(0.95);
        transform: translateY(1px);
        box-shadow: 1px 2px 5px -1px rgba(0, 0, 0, 0.6);
      `}
  }
`;

export default BiseoButton;
