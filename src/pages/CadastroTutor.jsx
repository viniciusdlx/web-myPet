import React, { useState } from 'react'
import Background from '../components/Background'
import Navbar from '../components/Navbar'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../components/Loading'

var tokenAPI = localStorage.getItem('tokenAPI')
var tokenWEB = localStorage.getItem('tokenWEB')

const initialValue = {
  name: '',
  phone: '',
  email: '',
  birthday: '',
  gender: ''
}

const CadastroTutor = () => {
  const { user } = useAuth0()

  const submitTutor = e => {
    e.preventDefault()

    const data = values

    var myHeaders = new Headers()
    myHeaders.append('Authorization', 'Bearer ' + tokenAPI)
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify(data)

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
    fetch(`${import.meta.env.VITE_AUTH0_AUDIENCE}tutor`, requestOptions)
      .then(response => response.json())
      .then(result => {
        const tutorId = result.id
        const domain = import.meta.env.VITE_AUTH0_DOMAIN
        const data = {
          user_metadata: {
            id: tutorId
          }
        }
        localStorage.removeItem('tutorID')
        localStorage.setItem('tutorID', JSON.stringify({ id: tutorId }))
        const optionsPatchMetaData = {
          method: 'PATCH',
          headers: {
            Authorization: 'Bearer ' + tokenWEB,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
        fetch(
          `https://${domain}/api/v2/users/${user.sub}`,
          optionsPatchMetaData
        )
          .then(response => response.json())
          .then(result => {
            alert('Cadastro Realizado com Sucesso')
            console.log(result)
          })
      })
      .catch(error => console.log('error', error))

    e.target.reset()
  }

  const [values, setValues] = useState(initialValue)
  function onChange(event) {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

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
                onSubmit={submitTutor}
                id="formTutor"
                autoComplete="off"
                className="flex flex-col justify-center items-center h-full p-4 gap-y-4 text-black"
              >
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={onChange}
                  autoComplete="name"
                  className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                  placeholder="Digite seu nome"
                  required
                />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  onChange={onChange}
                  autoComplete="phone"
                  className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                  placeholder="Digite seu telefone"
                  required
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={onChange}
                  autoComplete="email"
                  className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                  placeholder="Digite seu email"
                  required
                />
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  onChange={onChange}
                  autoComplete="birthday"
                  className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic"
                  required
                />
                <select
                  id="gender"
                  name="gender"
                  onChange={onChange}
                  autoComplete="gender"
                  className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic"
                  required
                >
                  <option value="">Selecione o gênero</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
                <button
                  type="submit"
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

export default withAuthenticationRequired(CadastroTutor, {
  onRedirecting: () => <Loading />
})
