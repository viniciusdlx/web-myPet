import React from 'react'
import { AppRoutes } from './Routes'
import { useAuth0 } from '@auth0/auth0-react'
import GetTokenAPI from './components/GetTokenAPI'
import GetTokenWEB from './components/GetTokenWEB'
import SetValuesAuth0 from './components/SetValuesAuth0'

const GetAllTokens = () => {
  return (
    <>
      <SetValuesAuth0 />
      <GetTokenAPI />
      <GetTokenWEB />
    </>
  )
}

function App() {
  const { isAuthenticated } = useAuth0()
  return (
    <>
      <GetAllTokens />
      <AppRoutes />
    </>
  )
}

export default App
