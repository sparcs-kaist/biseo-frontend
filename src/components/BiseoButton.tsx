import styled from 'styled-components';

const BiseoButton = styled.button<{
  background?: string;
  foreground?: string;
  nocursor?: boolean;
}>`
  align-items: center;
  background: ${props => (props.background ? props.background : '#ffffff')};
  border: 1px solid
    ${props => (props.background ? props.background : '#f2a024')};
  border-radius: 16px;
  box-shadow: 2px 3px 5px -1px rgba(0, 0, 0, 0.4);
  color: ${props => (props.foreground ? props.foreground : '#000000')};
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
