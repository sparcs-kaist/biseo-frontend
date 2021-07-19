import React from 'react';
import styled from 'styled-components';
import Logo from '@/public/sparcs.svg';
import BiseoButton from '@/components/BiseoButton';
import { COLOR } from '@/common/style';
import { MdSettings, MdAccountCircle } from 'react-icons/md';

const HeaderContainer = styled.div`
  height: calc(var(--header-height) + 12px);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 6px solid var(--biseo-primary);
`;

const HeaderContent = styled.div`
  width: var(--screen-max-width);
  display: flex;
  justify-content: space-between;
`;

const RHS = styled.div`
  display: flex;
  align-items: center;
`;

const OptionButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  background: inherit;
  margin-right: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo style={{ height: 'var(--header-height)' }} />
        <RHS>
          <BiseoButton background={COLOR.primary} foreground="white">
            login
          </BiseoButton>
          <OptionButton>
            <MdSettings size="24px" />
          </OptionButton>
          <OptionButton>
            <MdAccountCircle size="24px" />
          </OptionButton>
        </RHS>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
