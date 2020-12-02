import styled from 'styled-components';

const BiseoButton = styled.button<{
  background?: string;
  foreground?: string;
  nocursor?: boolean;
}>`
  align-items: center;
  background: ${props => (props.background ? props.background : '#ffffff')};
  border: 1px solid #f2a024;
  border-radius: 16px;
  box-shadow: 2px 3px 5px -1px rgba(0, 0, 0, 0.4);
  color: ${props => (props.foreground ? props.foreground : '#000000')};
  display: inline-flex;
  font-size: 1.1rem;
  justify-content: center;
  margin-right: 15px;
  min-width: 70px;
  padding: 5px 20px;

  &:hover {
    cursor: ${props => (props.nocursor ? 'default' : 'pointer')};
  }
`;

export default BiseoButton;
