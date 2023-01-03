import React, { useEffect, useState } from 'react';
import {
  OverlayContainer,
  VoterChoiceContainer,
  VoterChoiceHeader,
  VoterChoiceHeaderTitle,
  VoterList,
  VoterChoiceBottom,
  PresetChoiceContainer,
  CheckButton,
  CheckButtonInput,
} from './styled';
import BiseoButton from '../BiseoButton';
import Green from '@/public/Green.svg';
import Red from '@/public/Red.svg';
import Orange from '@/public/Orange.svg';
import { MemberState } from '@/common/enums';

interface VoterChoiceProps {
  users: User[];
  addUser: (user: string) => void;
  shown: boolean;
  preset: number;
  handlePreset: (n: number) => void;
  close: () => void;
  confirm: () => void;
  selectedUsers: string[];
  select: (u: string[]) => void;
  updateUsers: (_preset: number) => void;
}

interface User {
  uid: string;
  sparcsId: string;
  isVotable: boolean;
  state: MemberState;
}

const VoterChoice: React.FC<VoterChoiceProps> = ({
  users,
  addUser,
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
  const [addMode, setAddMode] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    if (selectedUsers.length === 0) setExpand(false);
  }, [selectedUsers]);
  const addPreset = (_preset: number) => {
    setExpand(false);
    updateUsers(_preset);
  };

  const enterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addUser(userName);
      setAddMode(false);
      setUserName('');
    }
    if (e.key === 'Escape') setAddMode(false);
  };

  return (
    shown && (
      <OverlayContainer onClick={close}>
        <VoterChoiceContainer onClick={e => e.stopPropagation()}>
          <VoterChoiceHeader>
            <VoterChoiceHeaderTitle>투표 대상 설정</VoterChoiceHeaderTitle>
            <span>
              {users.length === selectedUsers.length ? (
                <BiseoButton
                  onClick={() => select([])}
                  style={{ marginRight: '5px' }}
                >
                  전체 해제
                </BiseoButton>
              ) : (
                <BiseoButton
                  background="#f2a024"
                  foreground="#ffffff"
                  onClick={() => select(users.map(user => user.sparcsId))}
                  style={{ marginRight: '5px' }}
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
            </span>
          </VoterChoiceHeader>
          <VoterList>
            {users
              .sort((a, b) => {
                if (a.sparcsId < b.sparcsId) return -1;
                else return 1;
              })
              .map((user, i) => {
                if (preset !== 0) {
                  if (user.isVotable && selectedUsers.includes(user.sparcsId)) {
                    return (
                      <UserCheckButton
                        key={i}
                        active={true}
                        user={user}
                        onClick={() => {
                          const temp = [...selectedUsers];
                          const idx = temp.findIndex(
                            sparcsId => sparcsId === user.sparcsId
                          );
                          temp.splice(idx, 1);
                          console.log(temp);
                          select(temp);
                        }}
                      />
                    );
                  } else {
                    return (
                      <UserCheckButton
                        key={i}
                        active={false}
                        user={user}
                        onClick={() =>
                          select([user.sparcsId, ...selectedUsers])
                        }
                      />
                    );
                  }
                } else if (selectedUsers.includes(user.sparcsId)) {
                  return (
                    <UserCheckButton
                      key={i}
                      active={true}
                      user={user}
                      onClick={() => {
                        const temp = [...selectedUsers];
                        const idx = temp.findIndex(
                          sparcsId => sparcsId === user.sparcsId
                        );
                        temp.splice(idx, 1);
                        console.log(temp);
                        select(temp);
                      }}
                    />
                  );
                } else {
                  return (
                    <UserCheckButton
                      key={i}
                      active={false}
                      user={user}
                      onClick={() => select([user.sparcsId, ...selectedUsers])}
                    />
                  );
                }
              })}
            {preset === 0 &&
              (addMode ? (
                <CheckButtonInput
                  onChange={e => setUserName(e.target.value)}
                  onKeyUp={enterPress}
                />
              ) : (
                <CheckButton
                  onClick={() => setAddMode(true)}
                  style={{ justifyContent: 'center' }}
                >
                  +
                </CheckButton>
              ))}
          </VoterList>
          <VoterChoiceBottom>
            <BiseoButton onClick={close} style={{ marginRight: '0px' }}>
              취소
            </BiseoButton>
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
    <BiseoButton
      background="#f2a024"
      foreground="#ffffff"
      onClick={onClick}
      style={{ marginRight: '5px' }}
    >
      {children}
    </BiseoButton>
  ) : (
    <BiseoButton onClick={onClick} style={{ marginRight: '5px' }}>
      {children}
    </BiseoButton>
  );

interface UserCheckButtonProps {
  active: boolean;
  user: User;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const UserCheckButton: React.FC<UserCheckButtonProps> = ({
  active,
  user,
  onClick,
}) => {
  return (
    <CheckButton check={active} onClick={onClick}>
      <span
        style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {user.sparcsId}
      </span>
      <span>
        {user.state === MemberState.ONLINE ? (
          <Green />
        ) : user.state === MemberState.VACANT ? (
          <Orange />
        ) : (
          <Red />
        )}
      </span>
    </CheckButton>
  );
};
