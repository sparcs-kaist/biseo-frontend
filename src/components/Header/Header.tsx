import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { MdSettings } from 'react-icons/md';
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
import { logout } from '@/utils/auth';
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
  const handleLogout = () => {
    logout();
    dispatch(logoutAction());
    dispatch(setUser({ sparcsID: null, ssoUID: null, isUserAdmin: false }));
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
          <Logo style={{ height: 'var(--header-height)' }} />
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
              display_none={!user.isUserAdmin || isAdminPage}
              onClick={() => {
                history.push(adminPagePath);
                title('Biseo - admin');
              }}
            >
              <AdminIcon style={{ height: 24, width: 24 }} />
            </OptionButton>
            <OptionButton>
              <MdSettings size="24px" />
            </OptionButton>
            <AccountDropdown>
              <AccountIcon size="24px" />
              <AccountSubmenu>
                <AccountSubitem>panya</AccountSubitem>
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
