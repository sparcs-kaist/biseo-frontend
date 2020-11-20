import React, { useState } from 'react';
import AdminTabs from '@/components/AdminTabs';
import AdminContent from '@/components/AdminContent';

interface AdminBoardProps {
  tabs: {
    title: string;
    choices: string[];
    extendableChoices?: boolean;
  }[];
  style?: React.CSSProperties;
}

const AdminBoard: React.FC<AdminBoardProps> = ({ tabs }: AdminBoardProps) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const selectedTab = tabs[selectedTabIndex];

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
      />
    </>
  );
};

export default AdminBoard;
