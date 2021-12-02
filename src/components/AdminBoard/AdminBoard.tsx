import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import AdminTabs from '@/components/AdminTabs';
import {
  AdminContentCreate,
  AdminContentEdit,
} from '@/components/AdminContent';
import { Agenda } from '@/common/types';

interface Props {
  socket: SocketIOClient.Socket;
  tabs: {
    title: string;
    choices: string[];
    extendableChoices?: boolean;
  }[];
  isEdit: boolean;
  targetAgenda: Agenda;
  confirmEdit: (_id: string) => void;
}

interface VoteCreateResponse {
  success: boolean;
}

interface AgendaResponse {
  success: boolean;
}

const AdminBoard: React.FC<Props> = ({
  socket,
  tabs,
  isEdit,
  targetAgenda,
  confirmEdit,
}) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const selectedTab = tabs[selectedTabIndex];

  const onVoteCreate = useCallback(
    (title, content, subtitle, choices): void => {
      socket.emit(
        'admin:create',
        { title, content, subtitle, choices },
        (res: VoteCreateResponse) => {
          if (res.success) toast.success('🦄 Vote Created Successfully!');
          else toast.error('Vote Create Error!');
        }
      );
    },
    [socket]
  );

  const onAgendaEdit = useCallback(
    (_id, title, content, subtitle, choices): void => {
      socket.emit(
        'admin:edit',
        _id,
        { title, content, subtitle, choices },
        (res: AgendaResponse) => {
          if (res.success) toast.success('🦄 Agenda edited Successfully!');
          else toast.error('Agenda Edition Error!');
        }
      );
      confirmEdit(_id);
    },
    [socket]
  );

  const onClickAdminDelete = useCallback(
    (_id): void => {
      socket.emit('admin:delete', _id, (res: AgendaResponse) => {
        if (res.success) toast.success('🦄 Agenda deleted Successfully!');
        else toast.error('Agenda Deletion Error!');
      });
      confirmEdit(_id);
    },
    [socket]
  );

  return isEdit ? (
    <AdminContentEdit
      agenda={targetAgenda}
      extendable={false}
      onVoteEdit={onAgendaEdit}
      onVoteDelete={onClickAdminDelete}
      exitEditMode={confirmEdit}
    />
  ) : (
    <>
      <AdminTabs
        selected={selectedTabIndex}
        handleTabClick={setSelectedTabIndex}
      >
        {tabs.map(tab => tab.title)}
      </AdminTabs>
      <AdminContentCreate
        tabLength={tabs.length}
        selected={selectedTabIndex}
        choices={selectedTab.choices}
        extendable={selectedTab.extendableChoices}
        onVoteCreate={onVoteCreate}
      />
    </>
  );
};

export default AdminBoard;
