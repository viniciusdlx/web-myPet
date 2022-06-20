import React from 'react'
import Background from '../components/Background'
import Navbar from '../components/Navbar'

// function sendFormUser(e) {
//   e.preventDefault()
//   const formUser = document.getElementById('formUser')
//   const username = document.getElementById('username').value
//   const password = document.getElementById('password').value
//   const email = document.getElementById('email').value
//   const birthdate = document.getElementById('birthdate').value
//   const gender = document.getElementById('gender').value
//   const data = {
//     username: username,
//     password: password,
//     email: email,
//     birthdate: birthdate,
//     gender: gender
//   }
//   console.log(data)
//   formUser.reset()
// }

function submitFormTutor() {
  const formTutor = document.getElementById('formTutor')
  formTutor.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(this)
    const searchParams = new URLSearchParams()

    for (const pair of formData) {
      searchParams.append(pair[0], pair[1])
    }

    formTutor.reset()
  })
}

function CadastroUser() {
  //   e.preventDefault()

  //   const formTutor = new FormData(this)
  //   const searchParams = new URLSearchParams()

  //   for (const pair of formTutor) {
  //     console.log(pair)
  //   }

  //   options = {
  //     method: 'POST',
  //     body: formTutor
  //   }

  //   fetch('https://', {
  //     method: 'POST',
  //     body: formData
  //   })
  //     .then(response => {
  //       return response.text()
  //     })
  //     .then(data => {
  //       alert('Produto Cadastrado com Sucesso')
  //       console.log(data)
  //     })

  //   formCadastrarProduto.reset()
  // })

  document.getElementById('phone').addEventListener('input', function (e) {
    var x = e.target.value
      .replace(/\D/g, '')
      .match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
    e.target.value = !x[2]
      ? x[1]
      : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '')
  })

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
                id="formTutor"
                autoComplete="off"
                className="flex flex-col justify-center items-center h-full p-4 gap-y-4 text-black"
              >
                <input
                  type="text"
                  id="username"
                  name="username"
                  autoComplete="name"
                  className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                  placeholder="Digite seu nome"
                  required
                />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="phone"
                  className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                  placeholder="Digite seu telefone"
                  required
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                  placeholder="Digite seu email"
                  required
                />
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  autoComplete="birthdate"
                  className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic"
                  required
                />
                <select
                  name="gender"
                  id="gender"
                  autoComplete="gender"
                  className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic"
                  required
                >
                  <option value="">Selecione o gênero</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
                <button
                  type="submit"
                  id="btnSendFormUser"
                  onClick={submitFormTutor}
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
