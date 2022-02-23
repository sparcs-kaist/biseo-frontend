import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import BiseoButton from '@/components/BiseoButton';
import VoterChoice from '@/components/VoterChoice';
import { Agenda } from '@/common/types';
import { AgendaStatus } from '@/common/enums';
import {
  AdminContentContainer,
  ButtonGroup,
  ContentTextArea,
  SubtitleInput,
  TitleInput,
  InputNewChoice,
} from './styled';
import axios from '@/utils/axios';

interface AdminContentCreateProps {
  socket: SocketIOClient.Socket;
  tabLength: number;
  selected: number;
  choices: string[];
  extendable: boolean;
  onVoteCreate: (
    title: string,
    content: string,
    subtitle: string,
    choices: string[],
    participants: string[]
  ) => void;
}

interface AdminContentEditProps {
  agenda: Agenda;
  extendable: boolean;
  onVoteEdit: (
    _id: string,
    title: string,
    content: string,
    subtitle: string,
    choices: string[]
  ) => void;
  onVoteDelete: (_id: string) => void;
  exitEditMode: (_id: string) => void;
}

interface FormInputs {
  title: string;
  content: string;
  subtitle: string;
}

interface FormInputsStore {
  title: string;
  content: string;
  subtitle: string;
  newChoices: string[];
}

interface User {
  uid: string;
  sparcsId: string;
  isVotable: boolean;
  isOnline: boolean;
}

export const AdminContentCreate: React.FC<AdminContentCreateProps> = ({
  socket,
  tabLength,
  selected,
  choices,
  extendable,
  onVoteCreate,
}) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [newChoice, setNewChoice] = useState<string>('');
  const [submit, setSubmit] = useState<boolean>(false);
  const [isVoterChoice, setIsVoterChoice] = useState<boolean>(false);
  const [preset, setPreset] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [prevSelected, setPrevSelected] = useState<string[]>([]);

  async function getUsers(_preset: number) {
    const { data } = await axios
      .get('/users', {
        params: { preset: _preset },
      })
      .catch(() => ({ data: [] }));
    const _users: User[] = data.users;
    setUsers(_users);
  }

  useEffect(() => {
    getUsers(0);
  }, []);

  useEffect(() => {
    socket.on('chat:enter', (sparcsId: string) => {
      const index: number = users.findIndex(user => user.sparcsId === sparcsId);
      const newStateUser: User = { ...users[index], isOnline: true };
      setUsers(users => [
        ...users.slice(0, index),
        newStateUser,
        ...users.slice(index + 1),
      ]);
    });

    socket.on('chat:out', (sparcsId: string) => {
      const index: number = users.findIndex(user => user.sparcsId === sparcsId);
      const newStateUser: User = { ...users[index], isOnline: false };
      setUsers(users => [
        ...users.slice(0, index),
        newStateUser,
        ...users.slice(index + 1),
      ]);
    });
    return () => {
      socket.off('chat:enter');
      socket.off('chat:out');
    };
  }, [users]);

  async function updateUsers(_preset: number) {
    const _users = users.map(user => {
      if (selectedUsers.includes(user.uid)) {
        return {
          uid: user.uid,
          isVotable: true,
        };
      } else {
        return {
          uid: user.uid,
          isVotable: false,
        };
      }
    });
    await axios.patch(`/users?preset=${_preset}`, {
      users: _users,
    });
  }

  const clickPreset = async (n: number) => {
    const { data } = await axios
      .get('/users', {
        params: { preset: n },
      })
      .catch(() => ({ data: [] }));
    const _users: User[] = data.users;
    setUsers(_users);
    if (preset === n) {
      setSelectedUsers([]);
      setPreset(0);
    } else {
      setPreset(n);
      const _selectedUser = _users
        .filter(user => user.isVotable)
        .map(user => user.uid);
      setSelectedUsers(_selectedUser);
    }
  };

  const basicList = [];
  for (let i = 0; i < tabLength; i++) {
    basicList.push({ title: '', content: '', subtitle: '', newChoices: [] });
  }
  const [data, setData] = useState<FormInputsStore[]>(basicList);

  const { register, handleSubmit, errors, reset } = useForm<FormInputs>();
  const onSubmit = ({ title, content, subtitle }: FormInputs) => {
    if (!submit || choices.concat(data[selected].newChoices).length < 1) return;
    onVoteCreate(
      title,
      content,
      subtitle,
      choices.concat(data[selected].newChoices),
      selectedUsers
    );
    reset();
    setData([
      ...data.slice(0, selected),
      { title: '', content: '', subtitle: '', newChoices: [] },
      ...data.slice(selected + 1),
    ]);
    setSubmit(false);
  };

  const handleNewChoice = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setNewChoice(e.target.value),
    [newChoice]
  );

  const handleCancel = useCallback(() => {
    setExpand(false);
    setNewChoice('');
  }, [expand, newChoice]);

  const addNewChoice = useCallback(() => {
    setData([
      ...data.slice(0, selected),
      {
        ...data[selected],
        newChoices: [...data[selected].newChoices, newChoice],
      },
      ...data.slice(selected + 1),
    ]);
    setExpand(false);
    setNewChoice('');
  }, [data, expand, newChoice]);

  const deleteNewChoice = useCallback(
    (index: number) => {
      setData([
        ...data.slice(0, selected),
        {
          ...data[selected],
          newChoices: [
            ...data[selected].newChoices.slice(0, index),
            ...data[selected].newChoices.slice(index + 1),
          ],
        },
        ...data.slice(selected + 1),
      ]);
    },
    [data]
  );

  const enterPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') addNewChoice();
    },
    [newChoice]
  );

  const handleData = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setData([
        ...data.slice(0, selected),
        { ...data[selected], [name]: value },
        ...data.slice(selected + 1),
      ]);
    },
    [data]
  );

  return (
    <>
      <AdminContentContainer onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TitleInput
            name="title"
            placeholder="투표 제목을 입력하세요"
            className={errors.title && 'error'}
            ref={register({ required: true })}
            onChange={handleData}
            value={data[selected].title}
            style={{ width: '100%', marginRight: '5px' }}
          />
          <BiseoButton
            type="button"
            onClick={() => {
              setPrevSelected(selectedUsers);
              setIsVoterChoice(true);
            }}
            style={{ marginRight: '0' }}
          >
            대상 설정
          </BiseoButton>
        </div>
        <ContentTextArea
          name="content"
          placeholder="투표 내용을 입력하세요"
          className={errors.content && 'error'}
          ref={register({ required: true })}
          onChange={handleData}
          value={data[selected].content}
        />
        <SubtitleInput
          name="subtitle"
          placeholder="의결문안을 입력하세요"
          className={errors.subtitle && 'error'}
          ref={register({ required: true })}
          onChange={handleData}
          value={data[selected].subtitle}
        />
        <ButtonGroup>
          {choices.map(choice => (
            // a button's default type is 'submit', but we don't want this button to submit
            <BiseoButton type="button" nocursor key={choice}>
              {choice}
            </BiseoButton>
          ))}
          {data[selected].newChoices.map((choice, index) => (
            // a button's default type is 'submit', but we don't want this button to submit
            <BiseoButton
              type="button"
              key={choice}
              onClick={() => deleteNewChoice(index)}
            >
              {choice}
            </BiseoButton>
          ))}
          {extendable && (
            <>
              {expand ? (
                <InputNewChoice
                  onChange={handleNewChoice}
                  onKeyPress={enterPress}
                />
              ) : (
                <BiseoButton onClick={() => setExpand(true)}>+</BiseoButton>
              )}
            </>
          )}
        </ButtonGroup>
        <ButtonGroup alignRight={true}>
          {expand ? (
            <>
              <BiseoButton
                type="button"
                background="#f2a024"
                foreground="#ffffff"
                onClick={addNewChoice}
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
        shown={isVoterChoice}
        preset={preset}
        handlePreset={clickPreset}
        close={() => {
          setSelectedUsers(prevSelected);
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

export const AdminContentEdit: React.FC<AdminContentEditProps> = ({
  agenda,
  extendable,
  onVoteEdit,
  onVoteDelete,
  exitEditMode,
}) => {
  const { _id, title, content, subtitle, choices, expires, status } = agenda;

  const { register, handleSubmit, errors, reset } = useForm<FormInputs>({
    defaultValues: {
      title: title,
      content: content,
      subtitle: subtitle,
    },
  });

  const onSubmit = ({ title, content, subtitle }: FormInputs) => {
    if (choices.length < 1) return;
    onVoteEdit(_id, title, content, subtitle, choices);
    reset();
  };

  const active = Date.now() < Date.parse(expires);

  return (
    <AdminContentContainer onSubmit={handleSubmit(onSubmit)}>
      <TitleInput
        name="title"
        className={errors.title && 'error'}
        ref={register({ required: true })}
      />
      <ContentTextArea
        name="content"
        className={errors.content && 'error'}
        ref={register({ required: true })}
      />
      <SubtitleInput
        name="subtitle"
        className={errors.subtitle && 'error'}
        ref={register({ required: true })}
      />
      <ButtonGroup>
        {choices.map(choice => (
          // a button's default type is 'submit', but we don't want this button to submit
          <BiseoButton type="button" nocursor key={choice}>
            {choice}
          </BiseoButton>
        ))}
        {extendable && <BiseoButton>+</BiseoButton>}
      </ButtonGroup>
      <ButtonGroup alignRight={true}>
        <BiseoButton
          type="submit"
          background="#f2a024"
          foreground="#ffffff"
          disabled={!(active && status === AgendaStatus.PREPARE)}
        >
          수정
        </BiseoButton>
        <BiseoButton
          type="button"
          background="#f2a024"
          foreground="#ffffff"
          onClick={() => {
            onVoteDelete(_id);
          }}
          disabled={active && status === AgendaStatus.PROGRESS}
        >
          삭제
        </BiseoButton>
        <BiseoButton
          type="button"
          onClick={() => {
            exitEditMode(_id);
          }}
        >
          취소
        </BiseoButton>
      </ButtonGroup>
    </AdminContentContainer>
  );
};
