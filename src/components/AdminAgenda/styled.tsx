import styled from 'styled-components';

export const AgendaContainer = styled.div`
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

export const AgendaContent = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const DetailContainer = styled.div`
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

export const DetailContainerTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
`;

export const DetailContainerContent = styled.div`
  border: none;
  border-bottom: 1px solid #f2a024;
  border-top: 1px solid #f2a024;
  margin: 20px 0px;
  padding: 15px 5px;
  white-space: pre-wrap;
`;

export const DetailContainerSubtitle = styled.div`
  font-weight: 700;
  margin-bottom: 15px;
`;
