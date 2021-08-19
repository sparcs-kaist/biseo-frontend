import React from 'react';
import { useHistory } from 'react-router-dom';
import { MdSettings, MdAccountCircle } from 'react-icons/md';
import BiseoButton from '@/components/BiseoButton';
import { useTypedSelector, useTypedDispatch } from '@/hooks';
import { logout as logoutAction } from '@/store/slices/login';
import Logo from '@/public/sparcs.svg';
import { setUser } from '@/store/slices/user';
import { COLOR } from '@/common/style';
import { logout } from '@/utils/auth';
import { HeaderContainer, HeaderContent, RHS, OptionButton } from './styled';

const Header: React.FC = () => {
  const history = useHistory();
  const isLoggedIn = useTypedSelector(state => state.loggedIn);
  const dispatch = useTypedDispatch();

  const handleClick = () => {
    if (isLoggedIn) {
      logout();
      dispatch(logoutAction());
      dispatch(setUser(null));
    }
    history.replace('/login');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo style={{ height: 'var(--header-height)' }} />
        <RHS>
          <BiseoButton
            onClick={handleClick}
            background={COLOR.primary}
            foreground="white"
          >
            {isLoggedIn ? 'logout' : 'login'}
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
