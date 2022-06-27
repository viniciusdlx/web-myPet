import React from 'react'
import { AppRoutes } from './Routes'
import { useAuth0 } from '@auth0/auth0-react'
import GetTokenAPI from './components/GetTokenAPI'
import GetTokenWEB from './components/GetTokenWEB'

const GetAllTokens = () => {
  return (
    <>
      <GetTokenAPI />
      <GetTokenWEB />
    </>
  )
}

function App() {
  const { isAuthenticated } = useAuth0()
  return (
    <>
      {isAuthenticated ? <GetAllTokens /> : console.log('Não está logado')}
      <AppRoutes />
    </>
  )
}

export default App
