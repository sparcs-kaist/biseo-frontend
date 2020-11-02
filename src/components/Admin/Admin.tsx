import React, { useState } from 'react';
import styled from 'styled-components';
import AdminTabs from '@/components/AdminTabs';

interface AdminProps {
  tabs: {
    title: string;
    choices: string[];
    extendableChoices?: boolean;
  }[];
}

interface AdminContentProps {
  choices: string[];
  extendable: boolean;
}

const AdminContentContainer = styled.section`
  border: 1px solid #f2a024;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
`;

const TitleInput = styled.input`
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 15px 0;

  &:focus {
    outline: none;
  }
`;

const ContentInput = styled.textarea`
  border: none;
  border-bottom: 1px solid #f2a024;
  border-top: 1px solid #f2a024;
  font-size: 1.1rem;
  min-height: 150px;
  padding: 15px 0;
  resize: none;

  &:focus {
    outline: none;
  }
`;

const FooterInput = styled.input`
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 15px 0;

  &:focus {
    outline: none;
  }
`;

const ChoiceButton = styled.button<{
  background?: string;
  foreground?: string;
}>`
  align-items: center;
  background: ${props => (props.background ? props.background : '#ffffff')};
  border: 1px solid #f2a024;
  border-radius: 20px;
  color: ${props => (props.foreground ? props.foreground : '#000000')};
  display: inline-flex;
  font-size: 1.1rem;
  justify-content: center;
  min-width: 80px;
  padding: 5px 20px;

  &:hover {
    cursor: pointer;
  }
`;

const AdminContent: React.FC<AdminContentProps> = ({
  choices,
  extendable
}: AdminContentProps) => {
  return (
    <AdminContentContainer>
      <TitleInput placeholder="투표 제목을 입력하세요" />
      <ContentInput placeholder="투표 내용을 입력하세요" />
      <FooterInput placeholder="의결문안을 입력하세요" />
    </AdminContentContainer>
  );
};

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
      <ChoiceButton>+</ChoiceButton>
      <ChoiceButton foreground="#ffffff" background="#f2a024">
        만들기
      </ChoiceButton>
    </div>
  );
};

export default Admin;
