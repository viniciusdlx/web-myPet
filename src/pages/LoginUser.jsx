import React, { useState } from 'react'
import Navbar from '../components/Navbar'
// import { useAuth0 } from '@auth0/auth0-react'
// import Profile from '../components/Profile'
import LoginAuth0 from '../components/LoginAuth0'
import LogoutAuth0 from '../components/LogoutAuth0'
import ProfileAuth0 from '../components/ShowProfileAuth0'

// import { Container } from './styles';
function initialState() {
  return { username: '', password: '' }
}

const LoginUser = () => {
  const [values, setValues] = useState(initialState)

  function onChange(event) {
    const { value, name } = event.target

    setValues({
      ...values,
      [name]: value
    })
  }

  const bgGradient =
    'bg-gradient-to-r from-mpGradientInit via-mpGradientMiddle to-mpGradientEnd'

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="container mx-auto py-6">
        <h1 className="text-[44px] lg:text-6xl text-mpPurple2 font-bold text-center mb-8">
          Login
        </h1>
        <div className="bg-white text-black w-fit mx-auto p-6 rounded-2xl">
          <form action="" className="text-center">
            <div className="grid grid-rows-2 justify-items-center items-center gap-y-6">
              <input
                id="username"
                name="username"
                type="text"
                onChange={onChange}
                value={values.username}
                className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                placeholder="Digite seu nome:"
                autoComplete="off"
              />
              <input
                id="password"
                name="password"
                type="password"
                onChange={onChange}
                value={values.password}
                className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                placeholder="Digite sua senha:"
              />
            </div>
            <button
              type="submit"
              className={`${bgGradient} text-2xl text-white px-10 mt-6 py-2 rounded-full font-semibold tracking-wider`}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
      <div className="text-white flex justify-center items-center w-fit mx-auto p-5">
        <LoginAuth0 />
      </div>
      <div className="border rounded bg-slate-500 text-white flex justify-center items-center w-fit mx-auto p-5">
        <LogoutAuth0 />
      </div>
      <div>{/* <ProfileAuth0 /> */}</div>
      <div>{/* <Profile /> */}</div>
    </>
  )
}

export default LoginUser
