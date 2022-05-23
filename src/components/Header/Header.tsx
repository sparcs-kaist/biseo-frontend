import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import HomeIcon from './homeIcon.svg';
import AdminIcon from './adminIcon.svg';
import BiseoButton from '@/components/BiseoButton';
import { useTypedSelector, useTypedDispatch } from '@/hooks';
import useTitle from '@/hooks/useTitle';
import Logo from '@/public/biseoLogo.svg';
import { COLOR } from '@/common/style';
import {
  HeaderContainer,
  HeaderContent,
  RHS,
  OptionButton,
  VacantContainer,
  EnteredContainer,
  MessageContainer,
  AccountDropdown,
  AccountSubmenu,
  AccountSubitem,
  AccountIcon,
} from './styled';
import { useState } from 'react';
import { AwayStatus } from '@/common/enums';
import { checkUserAdmin, logout } from '@/utils/auth';
import { logout as logoutAction } from '@/store/slices/login';
import { setUser } from '@/store/slices/user';

interface HeaderProps {
  socket: SocketIOClient.Socket;
}

const Header: React.FC<HeaderProps> = ({ socket }) => {
  const title = useTitle();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useTypedDispatch();
  const isLoggedIn = useTypedSelector(state => state.loggedIn);
  const user = useTypedSelector(state => state.user);
  const [awayState, setAwayState] = useState<AwayStatus>(AwayStatus.Entered);
  const [buttonString, setButtonString] = useState<string>('enter');
  const [buttonColor, setButtonColor] = useState<string>(COLOR.primary);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    checkAdmin();
  }, [isLoggedIn]);

  async function checkAdmin() {
    const admin = await checkUserAdmin();
    setIsAdmin(admin);
  }

  const handleLogout = () => {
    logout();
    dispatch(logoutAction());
    dispatch(setUser({ sparcsID: null, ssoUID: null }));
    history.replace('/login');
  };

  const changeAwayState = () => {
    switch (awayState) {
      case AwayStatus.Entered:
        setAwayState(AwayStatus.Vacant);
        setButtonString('vacant');
        setButtonColor(COLOR.vacant);
        socket.emit('vacant:on');
        break;
      case AwayStatus.Vacant:
        setAwayState(AwayStatus.Entered);
        setButtonString('enter');
        setButtonColor(COLOR.primary);
        socket.emit('vacant:off');
        break;
    }
  };

  const loginClick = () => {
    history.replace('/login');
  };

  const AwayContainer =
    awayState !== AwayStatus.Entered ? VacantContainer : EnteredContainer;

  const AwayStateMessage =
    awayState === AwayStatus.Entered ? '' : '자리비움 상태입니다.';

  const userPagePath = '/';
  const adminPagePath = '/admin';

  const isUserPage = location.pathname == userPagePath;
  const isAdminPage = location.pathname == adminPagePath;

  return (
    <div>
      <HeaderContainer>
        <HeaderContent>
          <Link to="/">
            <Logo style={{ height: 'var(--header-height)' }} />
          </Link>
          <RHS>
            <BiseoButton
              background={buttonColor}
              foreground="white"
              onClick={isLoggedIn ? changeAwayState : loginClick}
            >
              {isLoggedIn ? buttonString : 'login'}
            </BiseoButton>
            <OptionButton
              display_none={isUserPage}
              onClick={() => {
                history.push(userPagePath);
                title('Biseo');
              }}
            >
              <HomeIcon style={{ height: 24, width: 24 }} />
            </OptionButton>
            <OptionButton
              display_none={!isAdmin || isAdminPage}
              onClick={() => {
                history.push(adminPagePath);
                title('Biseo - admin');
              }}
            >
              <AdminIcon style={{ height: 24, width: 24 }} />
            </OptionButton>
            <AccountDropdown>
              <AccountIcon size="24px" />
              <AccountSubmenu>
                <AccountSubitem>{user.sparcsID}</AccountSubitem>
                <hr
                  style={{ border: 'solid 1px #f2a024', margin: '0px 3px' }}
                />
                <AccountSubitem
                  onClick={handleLogout}
                  style={{ cursor: 'pointer' }}
                >
                  로그아웃
                </AccountSubitem>
              </AccountSubmenu>
            </AccountDropdown>
          </RHS>
        </HeaderContent>
      </HeaderContainer>
      <AwayContainer>
        <MessageContainer>{AwayStateMessage}</MessageContainer>
      </AwayContainer>
    </div>
  );
};

export default Header;
