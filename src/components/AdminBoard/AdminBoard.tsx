import React, { useCallback, useState } from 'react';
import AdminTabs from '@/components/AdminTabs';
import AdminContent from '@/components/AdminContent';

interface AdminBoardProps {
  socket: SocketIOClient.Socket;
  tabs: {
    title: string;
    choices: string[];
    extendableChoices?: boolean;
  }[];
}

const AdminBoard: React.FC<AdminBoardProps> = ({
  socket,
  tabs
}: AdminBoardProps) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const selectedTab = tabs[selectedTabIndex];

  const onVoteCreate = useCallback(
    (title, content, subtitle, choices): void => {
      socket.emit('admin:create', { title, content, subtitle, choices });
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
