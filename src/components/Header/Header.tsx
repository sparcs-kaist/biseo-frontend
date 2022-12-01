import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import HomeIcon from './homeIcon.svg';
import HomeIconDark from './homeIcon_dark.svg';
import AdminIcon from './adminIcon.svg';
import AdminIconDark from './adminIcon_dark.svg';
import DarkIcon from './darkIcon.svg';
import DarkIconDark from './darkIcon_dark.svg';
import BiseoButton from '@/components/BiseoButton';
import { useTypedSelector, useTypedDispatch } from '@/hooks';
import useTitle from '@/hooks/useTitle';
import Logo from '@/public/biseoLogo.svg';
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
  OverlayContainer,
  NameChangeContainer,
  NameChangeInput,
} from './styled';
import { useState } from 'react';
import { AwayStatus } from '@/common/enums';
import { checkUserAdmin, logout } from '@/utils/auth';
import { logout as logoutAction } from '@/store/slices/login';
import { setUser } from '@/store/slices/user';
import axios from '@/utils/axios';

interface HeaderProps {
  socket: SocketIOClient.Socket;
  toggleTheme: () => void;
  dark: boolean;
}

enum ChangeNameStatus {
  NORMAL,
  LOADING,
  ERROR,
  DUPLICATE,
}

const Header: React.FC<HeaderProps> = ({ socket, toggleTheme, dark }) => {
  const title = useTitle();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useTypedDispatch();
  const isLoggedIn = useTypedSelector(state => state.loggedIn);
  const user = useTypedSelector(state => state.user);
  const [awayState, setAwayState] = useState<AwayStatus>(AwayStatus.Entered);
  const [buttonString, setButtonString] = useState<string>('enter');
  const [isSubmenu, setIsSubmenu] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [isNameChangeMode, SetIsNameChangeMode] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const [changeNameStatus, setChangeNameStatus] = useState<ChangeNameStatus>(
    ChangeNameStatus.NORMAL
  );

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
    dispatch(setUser({ sparcsID: null }));
    setIsSubmenu(false);
    history.replace('/login');
  };

  const changeAwayState = () => {
    switch (awayState) {
      case AwayStatus.Entered:
        setAwayState(AwayStatus.Vacant);
        setButtonString('vacant');
        socket.emit('vacant:on');
        break;
      case AwayStatus.Vacant:
        setAwayState(AwayStatus.Entered);
        setButtonString('enter');
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

  async function submitNewName() {
    setChangeNameStatus(ChangeNameStatus.LOADING);
    const res = await axios.patch('/users/changename', {
      newId: newName,
    });
    setChangeNameStatus(ChangeNameStatus.NORMAL);
    if (res.data.success) {
      SetIsNameChangeMode(false);
      handleLogout();
    } else {
      if (res.status === 200) {
        setChangeNameStatus(ChangeNameStatus.DUPLICATE);
      } else {
        handleLogout();
      }
    }
  }

  const statusText = (() => {
    switch (changeNameStatus) {
      case ChangeNameStatus.NORMAL:
        return ' ';
      case ChangeNameStatus.LOADING:
        return '로딩중...';
      case ChangeNameStatus.DUPLICATE:
        return '중복되는 닉네임이 있습니다.';
      case ChangeNameStatus.ERROR:
        return '에러';
      default:
        return '';
    }
  })();

  return (
    <div>
      <HeaderContainer>
        <HeaderContent>
          <Link to="/">
            <Logo style={{ height: 'var(--header-height)' }} />
          </Link>
          <RHS>
            <BiseoButton
              vacant={awayState === AwayStatus.Vacant}
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
              {dark ? (
                <HomeIconDark style={{ height: 24, width: 24 }} />
              ) : (
                <HomeIcon style={{ height: 24, width: 24 }} />
              )}
            </OptionButton>
            <OptionButton
              display_none={!isAdmin || isAdminPage}
              onClick={() => {
                history.push(adminPagePath);
                title('Biseo - admin');
              }}
            >
              {dark ? (
                <AdminIconDark style={{ height: 24, width: 24 }} />
              ) : (
                <AdminIcon style={{ height: 24, width: 24 }} />
              )}
            </OptionButton>
            <OptionButton onClick={toggleTheme}>
              {dark ? (
                <DarkIconDark style={{ height: 24, width: 24 }} />
              ) : (
                <DarkIcon style={{ height: 24, width: 24 }} />
              )}
            </OptionButton>
            <AccountDropdown
              onMouseOver={() => setIsSubmenu(true)}
              onMouseOut={() => setIsSubmenu(false)}
            >
              <AccountIcon size="24px" color={dark ? '#ffffff' : '#000000'} />
              <AccountSubmenu visible={isSubmenu}>
                <AccountSubitem>{user.sparcsID}</AccountSubitem>
                <hr
                  style={{ border: 'solid 1px #f2a024', margin: '0px 3px' }}
                />
                <AccountSubitem
                  onClick={() => SetIsNameChangeMode(true)}
                  style={{ cursor: 'pointer' }}
                >
                  닉네임 변경
                </AccountSubitem>
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
      {isNameChangeMode && (
        <OverlayContainer onClick={() => SetIsNameChangeMode(false)}>
          <NameChangeContainer onClick={e => e.stopPropagation()}>
            {'닉네임 변경'}
            <NameChangeInput
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
            />
            <p style={{ fontSize: '12px', marginBottom: '3px' }}>
              {statusText}
            </p>
            <BiseoButton
              style={{ position: 'absolute', marginRight: '0', bottom: '20px' }}
              onClick={submitNewName}
            >
              변경
            </BiseoButton>
          </NameChangeContainer>
        </OverlayContainer>
      )}
    </div>
  );
};

export default Header;
