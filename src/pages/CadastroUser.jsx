import React from 'react'
import Background from '../components/Background'
import Navbar from '../components/Navbar'

function sendFormUser(e) {
  e.preventDefault()
  const formUser = document.getElementById('formUser')
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  const email = document.getElementById('email').value
  const birthdate = document.getElementById('birthdate').value
  const gender = document.getElementById('gender').value
  const data = {
    username: username,
    password: password,
    email: email,
    birthdate: birthdate,
    gender: gender
  }
  console.log(data)
  formUser.reset()
}

function CadastroUser() {
  const bgGradient =
    'bg-gradient-to-r from-mpGradientInit via-mpGradientMiddle to-mpGradientEnd'

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="flex items-center py-32">
        <div className="container mx-auto text-center text-white">
          <div className="w-5/6 sm:w-3/4 lg:w-2/6 3xl:w-[25%] mx-auto">
            <h1 className="text-[44px] lg:text-6xl text-mpPurple2 font-bold">
              Cadastro
            </h1>
            <div className="h-full border-2 border-white bg-white rounded-2xl shadow-xl mt-6 lg:mt-10">
              <form
                action=""
                id="formUser"
                method="POST"
                autoComplete="off"
                className="flex flex-col justify-center items-center h-full p-4 gap-y-4 text-black"
              >
                <input
                  type="text"
                  id="username"
                  autoComplete="name"
                  className="ease-in-out duration-300 w-full py-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                  placeholder="Digite seu nome"
                />
                <input
                  type="password"
                  id="password"
                  className="ease-in-out duration-300 w-full py-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                  placeholder="Digite sua senha"
                />
                <input
                  type="email"
                  id="email"
                  autoComplete="email"
                  className="ease-in-out duration-300 w-full py-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                  placeholder="Digite seu email"
                />
                <input
                  type="date"
                  id="birthdate"
                  className="ease-in-out duration-300 w-full py-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic"
                />
                <select
                  name="gender"
                  id="gender"
                  className="ease-in-out duration-300 w-full py-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic"
                >
                  <option value="nao selecionado" selected>
                    Selecione o gênero
                  </option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
                <button
                  type="submit"
                  id="btnSendFormUser"
                  onClick={sendFormUser}
                  className={`${bgGradient} text-2xl text-white px-10 py-3 rounded-full font-semibold tracking-wider`}
                >
                  Cadastrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CadastroUser
