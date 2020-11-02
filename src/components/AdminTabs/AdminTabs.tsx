import React from 'react';
import styled from 'styled-components';

interface AdminTabsProps {
  selected: number;
  handleTabClick: React.Dispatch<React.SetStateAction<number>>;
  children?: string[];
}

interface AdminTabProps {
  selected: boolean;
}

const AdminTab = styled.div`
  background-color: ${(props: AdminTabProps) =>
    props.selected ? '#ffffff' : '#f2a024'};
  border-left: 1px solid #f2a024;
  border-right: 1px solid #f2a024;
  border-top: 1px solid #f2a024;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: ${(props: AdminTabProps) => (props.selected ? '#f2a024' : '#ffffff')};
  font-family: monospace;
  font-size: 1.2rem;
  margin-bottom: -1px;
  margin-right: 3px;
  padding: 5px 30px;
  text-align: center;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
`;

const AdminTabs: React.FunctionComponent<AdminTabsProps> = ({
  selected,
  handleTabClick,
  children
}: AdminTabsProps) => {
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
