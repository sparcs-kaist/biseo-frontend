import React, { useState } from 'react';
import {
  OverlayContainer,
  VoterChoiceContainer,
  VoterChoiceHeader,
  VoterList,
  VoterChoiceBottom,
  PresetChoiceContainer,
} from './styled';
import { ActiveContainerTitle } from '../UserAgenda/styled';
import BiseoButton from '../BiseoButton';
import Green from './Green.svg';
import Red from './Red.svg';

interface VoterChoiceProps {
  users: User[];
  shown: boolean;
  preset: number;
  handlePreset: (n: number) => void;
  close: () => void;
  confirm: () => void;
  selectedUsers: User[];
  select: (u: User[]) => void;
  updateUsers: (_preset: number) => void;
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
  preset,
  handlePreset,
  close,
  confirm,
  selectedUsers,
  select,
  updateUsers,
}) => {
  const [expand, setExpand] = useState<boolean>(false);

  const addPreset = (_preset: number) => {
    setExpand(false);
    updateUsers(_preset);
  };

  return (
    shown && (
      <OverlayContainer onClick={close}>
        <VoterChoiceContainer onClick={e => e.stopPropagation()}>
          <VoterChoiceHeader>
            <ActiveContainerTitle style={{ marginRight: '10px' }}>
              투표 대상 설정
            </ActiveContainerTitle>
            {users.length === selectedUsers.length ? (
              <BiseoButton onClick={() => select([])}>전체 해제</BiseoButton>
            ) : (
              <BiseoButton
                background="#f2a024"
                foreground="#ffffff"
                onClick={() => select(users)}
              >
                전체 선택
              </BiseoButton>
            )}
            <CheckBiseoButton
              active={preset === 1}
              onClick={() => handlePreset(1)}
            >
              프리셋1
            </CheckBiseoButton>
            <CheckBiseoButton
              active={preset === 2}
              onClick={() => handlePreset(2)}
            >
              프리셋2
            </CheckBiseoButton>
            <CheckBiseoButton
              active={preset === 3}
              onClick={() => handlePreset(3)}
            >
              프리셋3
            </CheckBiseoButton>
          </VoterChoiceHeader>
          <VoterList>
            {users.map((user, index) => {
              if (preset !== 0) {
                if (user.isVotable) {
                  select([user, ...selectedUsers]);
                  return (
                    <BiseoButton
                      background="#f2a024"
                      foreground="#ffffff"
                      key={index}
                    >
                      {user.sparcsId} &nbsp;
                      {user.isOnline ? <Green /> : <Red />}
                    </BiseoButton>
                  );
                }
              } else if (selectedUsers.includes(user)) {
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
            {selectedUsers.length !== 0 && preset === 0 && (
              <BiseoButton
                background="#f2a024"
                foreground="#ffffff"
                onClick={() => setExpand(!expand)}
              >
                프리셋 추가
              </BiseoButton>
            )}
            {expand && (
              <PresetChoiceContainer>
                <BiseoButton onClick={() => addPreset(1)}>프리셋1</BiseoButton>
                <BiseoButton onClick={() => addPreset(2)}>프리셋2</BiseoButton>
                <BiseoButton onClick={() => addPreset(3)}>프리셋3</BiseoButton>
              </PresetChoiceContainer>
            )}
          </VoterChoiceBottom>
        </VoterChoiceContainer>
      </OverlayContainer>
    )
  );
};

export default VoterChoice;

interface CheckBiseoButtonProps {
  active: boolean;
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const CheckBiseoButton: React.FC<CheckBiseoButtonProps> = ({
  active,
  children,
  onClick,
}) =>
  active ? (
    <BiseoButton background="#f2a024" foreground="#ffffff" onClick={onClick}>
      {children}
    </BiseoButton>
  ) : (
    <BiseoButton onClick={onClick}>{children}</BiseoButton>
  );
