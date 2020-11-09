import styled from 'styled-components';

export const VoteItemContainer = styled.div`
  align-items: center;
  background: #ffffff;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.4);
  font-size: 1.5rem;
  font-weight: 700;
  padding: 30px;
  position: relative;

  &::before {
    background: #f2a024;
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 8px;
  }
`;

export const VoteItemContent = styled.div`
  display: flex;
  justify-content: space-between;
`;
