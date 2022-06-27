import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LoginAuth0 = () => {
  const bgGradient =
    'bg-gradient-to-r from-mpGradientInit via-mpGradientMiddle to-mpGradientEnd'

  const { loginWithRedirect } = useAuth0()

  return (
    <button
      className={`px-10 md:px-14 py-2 text-3xl md:text-4xl font-semibold rounded-full tracking-widest ${bgGradient} `}
      onClick={() => loginWithRedirect()}
    >
      Login
    </button>
  )
}

export default LoginAuth0
