import React from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from '@/utils/auth';
import { useTypedDispatch } from '@/hooks';
import { logout as logoutAction } from '@/store/slices/login';
import { setUser } from '@/store/slices/user';

const Dashboard: React.FC = () => {
  const history = useHistory();
  const dispatch = useTypedDispatch();

  const handleLogout = () => {
    logout();
    dispatch(logoutAction());
    dispatch(setUser({ sparcsID: null, ssoUID: null, isUserAdmin: false }));
    history.replace('/login');
  };

  return (
    <div>
      <h1>Hello, Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <button
        onClick={() => {
          history.push('/main');
        }}
      >
        Chat
      </button>
    </div>
  );
};

export default Dashboard;
