
export const saveToken = token => {
  localStorage.setItem('biseo-jwt', token)
}

export const logout = () => {
  localStorage.removeItem('biseo-jwt')
}

