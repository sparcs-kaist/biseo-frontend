import React from 'react';
import Logo from '@/public/sparcs.svg';
import BiseoButton from '@/components/BiseoButton';
import { COLOR } from '@/common/style';
import { MdSettings, MdAccountCircle } from 'react-icons/md';
import { HeaderContainer, HeaderContent, RHS, OptionButton } from './styled';

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
