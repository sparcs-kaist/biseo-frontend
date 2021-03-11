import axios from 'axios';

const AUTH_URL = process.env.AUTH_URL ?? process.env.SERVER_URL;
if (typeof AUTH_URL !== 'string') throw new Error('AUTH_URL not set!');

const auth = axios.create({
  baseURL: `${AUTH_URL}/api`,
  withCredentials: true,
});

auth.interceptors.request.use(config => {
  const token = localStorage.getItem('biseo-jwt');

  if (token)
    config.headers = {
      'X-Access-Token': `Bearer ${token}`,
    };

  return config;
});

export const getToken = (): string => localStorage.getItem('biseo-jwt');

export const saveToken = (token: string): void => {
  localStorage.setItem('biseo-jwt', token);
};

export const logout = (): void => {
  localStorage.removeItem('biseo-jwt');
};

export const requestToken = async (
  code: string,
  state: string
): Promise<string> => {
  type TokenResponse = { data: { token: string } };

  const response: TokenResponse = await auth
    .get(`${AUTH_URL}/api/auth/login/callback?code=${code}&state=${state}`)
    .catch(() => {
      throw new Error('Login callback error!');
    });

  return response.data.token;
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

export const checkLoginStatus = async (): Promise<boolean> => {
  type LoggedIn = { success: boolean };

  const { data }: { data: LoggedIn } = await auth
    .get(`${AUTH_URL}/api/auth/check`)
    .catch(() => {
      throw new Error('Login check error!');
    });

  return data.success;
};
