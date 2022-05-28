import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import BiseoButton from '../BiseoButton';
import VoterChoice from '../VoterChoice';
import {
  AdminContentBlock,
  AdminContentContainer,
  AdminContentText,
  ButtonGroup,
  InputNewChoice,
} from './styled';
import { useUsers } from './AdminContent';

interface AdminContentCreateProps {
  socket: SocketIOClient.Socket;
  onVoteCreate: (
    title: string,
    content: string,
    subtitle: string,
    choices: string[],
    participants: string[]
  ) => void;
}

const AdminContentCreateAuto: React.FC<AdminContentCreateProps> = ({
  socket,
  onVoteCreate,
}) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [isVoterChoice, setIsVoterChoice] = useState<boolean>(false);
  const [when, setWhen] = useState<boolean>(false); // 개강총회: false, 종강총회: true
  const [job, setJob] = useState<boolean>(false); // Developer === false, Designer === true
  const [candidates, setCandidates] = useState<string[]>([]);
  const [candidate, setCandidate] = useState<string>('');
  const [submit, setSubmit] = useState<boolean>(false);

  const {
    users,
    addUser,
    selectedUsers,
    setSelectedUsers,
    preset,
    updateUsers,
    clickPreset,
  } = useUsers(socket, []);

  const { handleSubmit, reset } = useForm();
  const onSubmit = () => {
    if (!submit) return;
    const choices: string[] = ['찬성', '반대'];
    // onVoteCreate(title, content, subtitle, choices, selectedUsers);
    const job_lang = job ? '디자이너' : '개발자';
    const when_lang = when ? '종강총회' : '개강총회';
    const title = ' 회원의 ' + job_lang + ' 프로그램 심사';
    // eslint-disable-next-line prettier/prettier
    const content =
      'SPARCS ' +
      when_lang +
      ' 안건 중 "' +
      job_lang +
      ' 프로그램 심사"를 투표하기 위한 설문조사입니다.\n각 안건이 진행될 당시 "활동중인 정회원" 만이 투표권을 갖습니다. 본인에게 투표권이 있는지 확인하고 투표해주세요.\n투표 결과는 집계가 완료되면 총회 진행중에 공지하도록 하겠습니다.';
    // eslint-disable-next-line prettier/prettier
    const subtitle =
      ' 회원의 ' +
      job_lang +
      ' 프로그램 이수를 인정하고, 정회원으로 승급시킨다.';
    candidates.forEach(c => {
      onVoteCreate(c + title, content, c + subtitle, choices, selectedUsers);
    });
    setWhen(false);
    setJob(false);
    setCandidates([]);
    setSubmit(false);
    reset();
  };

  const deleteCandidates = (index: number) => {
    setCandidates([
      ...candidates.slice(0, index),
      ...candidates.slice(index + 1),
    ]);
  };

  const addCandidate = () => {
    if (candidate.length === 0) return;
    setCandidates([...candidates, candidate]);
    setCandidate('');
  };

  const handleCancel = () => {
    setCandidate('');
    setExpand(false);
  };

  const enterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addCandidate();
    if (e.key === 'Escape') setExpand(false);
  };

  return (
    <>
      <AdminContentContainer onSubmit={handleSubmit(onSubmit)}>
        <AdminContentBlock>
          <AdminContentText isTitle>
            자동 투표 제작 서비스입니다.
          </AdminContentText>
          <BiseoButton
            type="button"
            onClick={() => {
              setIsVoterChoice(true);
            }}
            style={{ marginRight: '0' }}
          >
            대상 설정
          </BiseoButton>
        </AdminContentBlock>
        <AdminContentBlock>
          <AdminContentText>총회 유형을 선택해주세요.</AdminContentText>
          <BiseoButton
            type="button"
            onClick={() => setWhen(!when)}
            style={{ marginRight: '0' }}
          >
            {when ? '종강총회' : '개강총회'}
          </BiseoButton>
        </AdminContentBlock>
        <AdminContentBlock>
          <AdminContentText>투표 유형을 선택해주세요.</AdminContentText>
          <BiseoButton
            type="button"
            onClick={() => setJob(!job)}
            style={{ marginRight: '0' }}
          >
            {job ? '디자이너' : '개발자'}
          </BiseoButton>
        </AdminContentBlock>
        <hr style={{ border: 'solid 0.5px #f2a024', margin: '10px 0px' }} />
        <AdminContentBlock>
          <AdminContentText>
            심사 대상자들의 이름을 입력해주세요.
          </AdminContentText>
        </AdminContentBlock>
        <ButtonGroup>
          {candidates.map((candidate, index) => (
            // a button's default type is 'submit', but we don't want this button to submit
            <BiseoButton
              type="button"
              key={index}
              onClick={() => deleteCandidates(index)}
              style={{ marginBottom: '5px' }}
            >
              {candidate}
            </BiseoButton>
          ))}
          <>
            {expand ? (
              <InputNewChoice
                type="text"
                onChange={e => setCandidate(e.target.value)}
                value={candidate}
                onKeyUp={enterPress}
              />
            ) : (
              <BiseoButton type="button" onClick={() => setExpand(true)}>
                +
              </BiseoButton>
            )}
          </>
        </ButtonGroup>
        <ButtonGroup alignRight={true}>
          {expand ? (
            <>
              <BiseoButton
                type="button"
                background="#f2a024"
                foreground="#ffffff"
                onClick={addCandidate}
              >
                추가
              </BiseoButton>
              <BiseoButton type="button" onClick={handleCancel}>
                취소
              </BiseoButton>
            </>
          ) : (
            <BiseoButton
              type="submit"
              background="#f2a024"
              foreground="#ffffff"
              onClick={() => setSubmit(true)}
            >
              만들기
            </BiseoButton>
          )}
        </ButtonGroup>
      </AdminContentContainer>
      <VoterChoice
        users={users}
        addUser={addUser}
        shown={isVoterChoice}
        preset={preset}
        handlePreset={clickPreset}
        close={() => {
          setIsVoterChoice(false);
        }}
        confirm={() => setIsVoterChoice(false)}
        selectedUsers={selectedUsers}
        select={setSelectedUsers}
        updateUsers={updateUsers}
      />
    </>
  );
};

export default AdminContentCreateAuto;
