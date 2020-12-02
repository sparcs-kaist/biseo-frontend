import styled from 'styled-components';

export const VoteItemContainer = styled.div`
  align-items: center;
  background: #ffffff;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.25);
  font-weight: 700;
  padding: 20px 30px;
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
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
