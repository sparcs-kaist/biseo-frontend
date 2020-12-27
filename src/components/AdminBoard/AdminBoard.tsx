import React, { useCallback, useState } from 'react';
import AdminTabs from '@/components/AdminTabs';
import AdminContent from '@/components/AdminContent';
import { toast } from 'react-toastify';

interface AdminBoardProps {
  socket: SocketIOClient.Socket;
  tabs: {
    title: string;
    choices: string[];
    extendableChoices?: boolean;
  }[];
}

interface VoteCreateResponse {
  success: boolean;
}

const AdminBoard: React.FC<AdminBoardProps> = ({
  socket,
  tabs
}: AdminBoardProps) => {
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

  return (
    <>
      <AdminTabs
        selected={selectedTabIndex}
        handleTabClick={setSelectedTabIndex}
      >
        {tabs.map(tab => tab.title)}
      </AdminTabs>
      <AdminContent
        choices={selectedTab.choices}
        extendable={selectedTab.extendableChoices}
        onVoteCreate={onVoteCreate}
      />
    </>
  );
};

export default AdminBoard;
