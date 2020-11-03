import React, { useState } from 'react';
import AdminTabs from '@/components/AdminTabs';
import AdminContent from '@/components/AdminContent';

interface AdminProps {
  tabs: {
    title: string;
    choices: string[];
    extendableChoices?: boolean;
  }[];
}

const Admin: React.FC<AdminProps> = ({ tabs }: AdminProps) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const selectedTab = tabs[selectedTabIndex];

  return (
    <div>
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
    </div>
  );
};

export default Admin;
