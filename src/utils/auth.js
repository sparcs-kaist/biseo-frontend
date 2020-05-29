export const getToken = () => localStorage.getItem('biseo-jwt')

export const saveToken = token => {
  localStorage.setItem('biseo-jwt', token)
}

export const logout = () => {
  localStorage.removeItem('biseo-jwt')
}

