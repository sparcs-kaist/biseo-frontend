import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://kong.sparcs.org:8030',
  baseURL: 'http://kong.sparcs.org:32813/api',
  withCredentials: true
})

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('biseo-jwt')

  if (token)
    config.headers = {
      'X-Access-Token': `Bearer ${token}`
    }

  return config
})

export default instance

