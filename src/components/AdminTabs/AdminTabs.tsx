import React from 'react';
import { AdminTab } from './styled';

interface AdminTabsProps {
  selected: number;
  handleTabClick: React.Dispatch<React.SetStateAction<number>>;
  children?: string[];
}

const AdminTabs: React.FunctionComponent<AdminTabsProps> = ({
  selected,
  handleTabClick,
  children,
}) => {
  return (
    <div style={{ display: 'flex' }}>
      {children.map((title, index) => (
        <AdminTab
          key={title}
          onClick={() => handleTabClick(index)}
          selected={selected === index}
        >
          {title}
        </AdminTab>
      ))}
    </div>
  );
};

export default AdminTabs;
