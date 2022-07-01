import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Background from '../components/Background'
import { useAuth0, User } from '@auth0/auth0-react'
import LoginAuth0 from '../components/LoginAuth0'
import LogoutAuth0 from '../components/LogoutAuth0'
import Navbar from '../components/Navbar'
import GetTokenAPI from '../components/GetTokenAPI'
import GetTokenWEB from '../components/GetTokenWEB'
// import GetUserMetadata from '../components/GetUserMetadata'

function Home() {
  GetTokenWEB()

  var tutorId = localStorage.getItem('tutorID')
  tutorId = 'undefined'
  tutorId = localStorage.getItem('tutorID')

  const { user, isAuthenticated } = useAuth0()

  useEffect(() => {
    if (isAuthenticated) {
      setInterval(() => {
        VerifyTutorId()
      }, 500)
    }
  }, [isAuthenticated])

  const InsertLoginOrSingUp = () => {
    return (
      <div className="text-2xl">
        <p className="mt-6">
          <NavLink
            to="/cadastro"
            className="ease-in-out duration-200 hover:text-[26px]"
          >
            <span className="font-semibold underline">Cadastre-se aqui!</span>
          </NavLink>
          <span className="ml-2">para ter seu perfil de tutor</span>
        </p>
      </div>
    )
  }

  const VerifyTutorId = () => {
    return (
      <>
        {isAuthenticated ? (
          <div className="text-center lg:text-left">
            <div className="mb-2">
              <h1 className="text-2xl md:text-3xl">Bem vindo {user.name}</h1>
            </div>
            <InsertLoginOrSingUp />
          </div>
        ) : (
          <p className="text-2xl font-bold text-center md:text-left rounded-lg bg-transparent p-6 lg:p-0">
            Não é um Tutor cadastrado?
            <br />
            <NavLink
              to="/cadastro"
              className="ease-in-out duration-200 hover:text-[26px]"
            >
              <span className="font-semibold underline">Cadastre-se aqui!</span>
            </NavLink>
          </p>
        )}
      </>
    )
  }

  const AuthNav = () => {
    return (
      <div className="my-16 ease-in-out duration-200 hover:scale-110">
        {isAuthenticated ? <LogoutAuth0 /> : <LoginAuth0 />}
      </div>
    )
  }

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
          <div className="h-full bg-black bg-opacity-40 bg-transparent">
            <div className="h-full container mx-auto px-5 md:px-10 ">
              <div className="h-full flex flex-col justify-center items-center md:items-start text-white">
                <h1 className="mt-32 lg:mt-0 text-center md:text-left text-4xl mbl:text-[42px] md:text-6xl text-white   tracking-wide md:tracking-wider font-semibold md:w-3/4 lg:w-3/5 xl:w-1/2 drop-shadow-2xl ">
                  Sua carteira de vacinação digital
                </h1>
                <AuthNav />
                <VerifyTutorId />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
