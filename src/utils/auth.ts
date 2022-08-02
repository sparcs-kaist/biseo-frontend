import axios from 'axios';
import { User } from '@/common/types';

const AUTH_URL = process.env.AUTH_URL ?? process.env.SERVER_URL;
if (typeof AUTH_URL !== 'string') throw new Error('AUTH_URL not set!');

export const auth = axios.create({
  baseURL: `${AUTH_URL}/api`,
  withCredentials: true,
});

auth.interceptors.request.use(config => {
  const token = getToken();
  const refreshToken = getRefreshToken();

  if (token && refreshToken)
    config.headers = {
      'X-Access-Token': `Bearer ${token}`,
      'X-Refresh-Token': `Bearer ${refreshToken}`,
    };

  return config;
});

export const getToken = (): string => localStorage.getItem('biseo-jwt');

export const getRefreshToken = (): string =>
  localStorage.getItem('biseo-refresh-jwt');

export const saveToken = (token: string): void => {
  localStorage.setItem('biseo-jwt', token);
};

export const saveRefreshToken = (token: string): void => {
  localStorage.setItem('biseo-refresh-jwt', token);
};

export const logout = (): void => {
  localStorage.removeItem('biseo-jwt');
  localStorage.removeItem('biseo-refresh-jwt');
};

export const requestUserInfo = async (
  code: string,
  state: string
): Promise<{ token: string; refreshToken: string; user: User }> => {
  type TokenResponse = {
    data: { token: string; refreshToken: string; user: User };
  };

  const response: TokenResponse = await auth
    .get(`${AUTH_URL}/api/auth/login/callback?code=${code}&state=${state}`)
    .catch(() => {
      throw new Error('Login callback error!');
    });

  return response.data;
};

export const requestRedirectURL = async (): Promise<string> => {
  type RedirectURLResponse = { data: { url: string } };

  const response: RedirectURLResponse = await auth
    .post(`${AUTH_URL}/api/auth/login`)
    .catch(() => {
      throw new Error('Redirect URL fetch error!');
    });

  return response.data.url;
};

export const checkLoginStatus = async (): Promise<{
  success: boolean;
  token?: string;
}> => {
  type LoggedIn = { success: boolean; token?: string };

  const { data }: { data: LoggedIn } = await auth
    .get(`${AUTH_URL}/api/auth/check`)
    .catch(() => {
      throw new Error('Login check error!');
    });

  return data;
};

export const checkUserAdmin = async (): Promise<boolean> => {
  type IsAdmin = { success: boolean };

  const { data }: { data: IsAdmin } = await auth
    .get(`${AUTH_URL}/api/auth/check/admin`)
    .catch(() => {
      throw new Error('Admin check error!');
    });

  return data.success;
};
