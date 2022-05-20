import React from 'react';
import styled from 'styled-components';
import { device } from '@/utils/device';
import {
  OverlayContainer,
  VoterChoiceHeaderTitle,
} from '../VoterChoice/styled';
import { ActiveContainerSubtitle } from '@/components/UserAgenda/styled';

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  voterCountMap: Record<string, string[]>;
  notVoteList: string[];
}

const AgendaVoteStateView: React.FC<Props> = ({
  visible,
  setVisible,
  voterCountMap,
  notVoteList,
}) => {
  return (
    visible && (
      <OverlayContainer
        onClick={e => {
          e.stopPropagation();
          setVisible(false);
        }}
      >
        <Container onClick={e => e.stopPropagation()}>
          <VoterChoiceHeaderTitle>투표 참여자 현황</VoterChoiceHeaderTitle>
          <ActiveContainerSubtitle style={{ marginTop: '30px' }}>
            투표하지 않음 ({notVoteList.length}명)
          </ActiveContainerSubtitle>
          <div style={{ lineHeight: '200%' }}>
            {notVoteList.map((voter, j) => {
              if (j === 0) return `${voter}`;
              else return `, ${voter}`;
            })}
          </div>
          {voterCountMap &&
            Object.entries(voterCountMap).map(([choice, voters]) => {
              return (
                <div key={choice}>
                  <br />
                  <hr />
                  <ActiveContainerSubtitle style={{ marginTop: '30px' }}>
                    {choice} ({voters.length}명)
                  </ActiveContainerSubtitle>
                  <div style={{ lineHeight: '200%' }}>
                    {voters.map((voter, j) => {
                      if (j === 0) return `${voter}`;
                      else return `, ${voter}`;
                    })}
                  </div>
                </div>
              );
            })}
        </Container>
      </OverlayContainer>
    )
  );
};

export default AgendaVoteStateView;

const Container = styled.div`
  width: 390px;
  height: 60vh;
  min-height: 400px;
  background: #ffffff;
  border-radius: 10px;
  z-index: 2;
  margin: auto auto;
  padding: 30px;
  overflow: auto;

  @media ${device.mobile} {
    width: 512px;
  }

  @media ${device.tablet} {
    width: 630px;
  }

  @media ${device.laptop} {
    width: 768px;
  }

  -webkit-animation: scale-in-center 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  @keyframes scale-in-center {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
`;
