import React from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'

export const PrivatePage = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  console.log(getAccessTokenSilently)
  return isAuthenticated ? ' Logado' : 'Não logado'
}
