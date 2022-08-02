import axios from 'axios';
import { auth, getToken, saveToken } from './auth';

const instance = axios.create({
  baseURL: `${process.env.SERVER_URL}/api`,
  withCredentials: true,
});

instance.interceptors.request.use(config => {
  const token = getToken();

  if (token)
    config.headers = {
      'X-Access-Token': `Bearer ${token}`,
    };
  return config;
});

instance.interceptors.response.use(
  res => res,
  async err => {
    const originalReq = err.config;
    if (err.response && err.response.status === 401) {
      originalReq.__isRetryRequest = true;
      auth.post('/auth/refresh').then(res => {
        if (res.status === 201) {
          const { token } = res.data;
          saveToken(token);
          originalReq.headers['X-Access-Token'] = `Bearer ${token}`;
          return axios(originalReq);
        } else return Promise.reject(err);
      });
    }

    return Promise.reject(err);
  }
);

export default instance;
