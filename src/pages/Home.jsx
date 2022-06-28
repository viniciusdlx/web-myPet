import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Background from '../components/Background'
import { useAuth0 } from '@auth0/auth0-react'
import LoginAuth0 from '../components/LoginAuth0'
import LogoutAuth0 from '../components/LogoutAuth0'
import Navbar from '../components/Navbar'
import GetTokenAPI from '../components/GetTokenAPI'
import GetTokenWEB from '../components/GetTokenWEB'
// import GetUserMetadata from '../components/GetUserMetadata'

const AuthNav = () => {
  const { isAuthenticated } = useAuth0()
  return (
    <div className="my-16 ease-in-out duration-200 hover:scale-110">
      {isAuthenticated ? <LogoutAuth0 /> : <LoginAuth0 />}
    </div>
  )
}

function Home() {
  const { isAuthenticated } = useAuth0()
  const bgGradient =
    'bg-gradient-to-r from-mpGradientInit via-mpGradientMiddle to-mpGradientEnd'

  return (
    <>
      <header className="absolute w-full">
        <Navbar />
      </header>
      <div>
        <div
          className="h-screen md:bg-center bg-cover bg-no-repeat"
          id="backgroundHome"
        >
          <div className="h-full container mx-auto px-5 md:px-10">
            <div className="h-full flex flex-col justify-center items-center md:items-start text-white">
              <h1 className="mt-32 lg:mt-0 text-center md:text-left text-4xl mbl:text-[42px] md:text-6xl text-black tracking-wide md:tracking-wider font-semibold md:w-3/4 lg:w-3/5 xl:w-1/2 drop-shadow-2xl ">
                Sua carteira de vacinação digital
              </h1>
              <AuthNav />
              <p className="text-2xl font-bold text-center md:text-left text-black bg-white bg-opacity-20 rounded-lg bg-transparent p-6 lg:p-0">
                Não é um Tutor cadastrado?
                <br />
                <NavLink
                  to="/cadastro"
                  className="ease-in-out duration-200 hover:text-[26px]"
                >
                  <span className="font-semibold underline">
                    {' '}
                    Cadastre-se aqui!
                  </span>
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
