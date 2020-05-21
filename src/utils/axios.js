import axios from 'axios'

const jwtHeader = () => {
  const token = localStorage.getItem('sparcssso-token')
  return token ? `Bearer ${token}` : ''
}

export default axios.create({
  baseURL: 'http://kong.sparcs.org:8030',
  headers: {
    'X-Access-Token': jwtHeader()
  },
  withCredentials: true
})
