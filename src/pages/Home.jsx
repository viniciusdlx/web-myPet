import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Background from '../components/Background'
import Navbar from '../components/Navbar'

function Home() {
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
              <h1 className="text-center md:text-left text-4xl mbl:text-[42px] md:text-6xl tracking-wide md:tracking-wider font-semibold md:w-3/4 lg:w-3/5 xl:w-1/2 drop-shadow-2xl">
                Sua carteira de vacinação digital
              </h1>
              <NavLink
                to="/login"
                className="my-16 ease-in-out duration-200 hover:scale-110"
              >
                <span
                  className={`px-10 md:px-14 py-2 text-3xl md:text-4xl font-semibold rounded-full tracking-widest ${bgGradient} `}
                >
                  Login
                </span>
              </NavLink>
              <p className="text-2xl">
                Não é cadastrado?
                <br className="lg:hidden" />
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
