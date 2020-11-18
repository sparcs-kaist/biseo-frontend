import styled from 'styled-components';

export const ActiveContainer = styled.div`
  background: #fdfbee;
  border-radius: 10px;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.25);
  padding: 20px 30px;
`;

export const ActiveContainerTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
`;

export const ActiveContainerContent = styled.div`
  border: none;
  border-bottom: 1px solid #f2a024;
  border-top: 1px solid #f2a024;
  margin: 20px 0px;
  padding: 15px 5px;
  white-space: pre-wrap;
`;

export const ActiveContainerSubtitle = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 15px;
`;

export const InactiveContainer = styled.div`
  align-items: center;
  background: #ffffff;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.25);
  font-size: 1.5rm;
  font-weight: 700;
  padding: 30px;
  position: relative;

  &::before {
    background: #f2a024;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 5px;
  }
`;

export const VoteItemContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonGroup = styled.div`
  display: flex;
`;
