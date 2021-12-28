import styled from 'styled-components';

interface AgendaContainerProps {
  detailed: boolean;
}

export const AgendaContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #ffffff;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.25);
  font-weight: 700;
  padding: 20px 30px;
  position: relative;

  &::before {
    background: ${(props: AgendaContainerProps) =>
      props.detailed ? '#f2a024' : '#8c8c8c'};
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
  width: 100%;
`;

export const AgendaButton = styled.div`
  align-items: center;
  display: flex;
`;

export const AgendaContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 66%;
`;

export const AgendaNotVoteList = styled.div`
  width: auto;
  max-width: 50%;
  display: none;
  background: #8c8c8c;
  padding: 5px;
  position: absolute;
  word-wrap: break-word;
  z-index: 1;
`;

export const AgendaNotVote = styled.div`
  font-weight: 400;
  margin-bottom: 15px;
  word-wrap: break-word;

  &:hover ${AgendaNotVoteList} {
    display: block;
  }
`;
