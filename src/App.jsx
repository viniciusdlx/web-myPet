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
      <AppRoutes />
    </>
  )
}

function App() {
  const { isAuthenticated } = useAuth0()
  return (
    <>
      <GetAllTokens />
    </>
  )
}

export default App
