import React from 'react';
import {
  OverlayContainer,
  VoterChoiceContainer,
  VoterChoiceHeader,
  VoterList,
  VoterChoiceBottom,
} from './styled';
import { ActiveContainerTitle } from '../UserAgenda/styled';
import BiseoButton from '../BiseoButton';
import Green from './Green.svg';
import Red from './Red.svg';

interface VoterChoiceProps {
  users: User[];
  shown: boolean;
  handlePreset: (n: number) => void;
  close: () => void;
  confirm: () => void;
  isAll: boolean;
  selectedUsers: User[];
  select: (u: User[]) => void;
}

interface User {
  uid: string;
  sparcsId: string;
  isVotable: boolean;
  isOnline: boolean;
}

const VoterChoice: React.FC<VoterChoiceProps> = ({
  users,
  shown,
  handlePreset,
  close,
  confirm,
  isAll,
  selectedUsers,
  select,
}) => {
  return (
    shown && (
      <OverlayContainer view={false} onClick={close}>
        <VoterChoiceContainer onClick={e => e.stopPropagation()}>
          <VoterChoiceHeader>
            <ActiveContainerTitle style={{ marginRight: '10px' }}>
              투표 대상 설정
            </ActiveContainerTitle>
            <BiseoButton background="#f2a024" foreground="#ffffff">
              전체 선택
            </BiseoButton>
            <BiseoButton onClick={() => handlePreset(0)}>전체 목록</BiseoButton>
            <BiseoButton onClick={() => handlePreset(1)}>프리셋1</BiseoButton>
            <BiseoButton onClick={() => handlePreset(2)}>프리셋2</BiseoButton>
            <BiseoButton onClick={() => handlePreset(3)}>프리셋3</BiseoButton>
          </VoterChoiceHeader>
          <VoterList>
            {users.map((user, index) => {
              if (isAll || user.isVotable) {
                if (selectedUsers.includes(user)) {
                  return (
                    <BiseoButton
                      background="#f2a024"
                      foreground="#ffffff"
                      key={index}
                      onClick={() => {
                        const temp = [...selectedUsers];
                        const idx = temp.findIndex(u => u.uid === user.uid);
                        temp.splice(idx, 1);
                        select(temp);
                        console.log(temp);
                      }}
                    >
                      {user.sparcsId} &nbsp;
                      {user.isOnline ? <Green /> : <Red />}
                    </BiseoButton>
                  );
                } else {
                  return (
                    <BiseoButton
                      key={index}
                      onClick={() => select([user, ...selectedUsers])}
                    >
                      {user.sparcsId} &nbsp;
                      {user.isOnline ? <Green /> : <Red />}
                    </BiseoButton>
                  );
                }
              }
            })}
          </VoterList>
          <VoterChoiceBottom>
            <BiseoButton onClick={close}>취소</BiseoButton>
            <BiseoButton
              background="#f2a024"
              foreground="#ffffff"
              onClick={confirm}
            >
              확인
            </BiseoButton>
          </VoterChoiceBottom>
        </VoterChoiceContainer>
      </OverlayContainer>
    )
  );
};

export default VoterChoice;
