import React, { useEffect, useState } from 'react'
import NavbarElements from '../components/Navbar'

export default function Profile() {
  var tokenAPI = localStorage.getItem('tokenAPI')
  var tutorId = JSON.parse(localStorage.getItem('tutorID'))
  tutorId = tutorId?.id

  const [tutorData, setTutorData] = useState([])

  const SetNewValuesTutor = e => {
    e.preventDefault()
    alert('Atualizado com sucesso')
  }

  useEffect(() => {
    GetProfileTutor()
  }, [])

  const GetProfileTutor = () => {
    fetch(`https://my-petweb.herokuapp.com/tutor/${tutorId}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + tokenAPI,
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => setTutorData(result))
      .catch(error => {
        console.log('error', error)
      })
  }
  return (
    <>
      <header>
        <NavbarElements />
      </header>
      <div className="container lg:w-1/2 mx-auto">
        <div className="text-center p-3 mbl:p-8">
          <div className="text-lg mbl:text-xl md:text-3xl text-mpDarkPurple border-2 border-white bg-white rounded-2xl shadow-xl py-6 px-1 mbl:px-3">
            Bem vindo {tutorData.name}! <br /> Esse é seu perfil de Tutor
          </div>
          <div className="h-full border-2 border-white bg-white rounded-2xl shadow-xl mt-6 lg:mt-10">
            <form
              id="formTutor"
              onSubmit={SetNewValuesTutor}
              autoComplete="off"
              className="flex flex-col justify-center items-center h-full p-4 gap-y-4 text-black"
            >
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                placeholder={tutorData.name}
              />
              <input
                type="tel"
                id="phone"
                name="phone"
                autoComplete="phone"
                className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                placeholder={tutorData.phone}
              />
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                placeholder={tutorData.email}
              />
              <input
                type="text"
                id="birthday"
                name="birthday"
                className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic"
                placeholder={tutorData.birthday}
              />
              <select
                id="gender"
                name="gender"
                autoComplete="gender"
                className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic"
              >
                <option selected defaultValue="test">
                  {tutorData.gender == ''
                    ? 'Selecione o gênero'
                    : tutorData.gender}
                </option>
                <option
                  value="masculino"
                  className={
                    tutorData.gender === 'Masculino' ? 'hidden' : 'flex'
                  }
                >
                  Masculino
                </option>
                <option
                  value="feminino"
                  className={
                    tutorData.gender === 'Feminino' ? 'hidden' : 'flex'
                  }
                >
                  Feminino
                </option>
              </select>
              <button
                type="submit"
                className="bg-gradient-to-r from-mpGradientInit via-mpGradientMiddle to-mpGradientEnd text-lg md:text-2xl text-white px-6 md:px-10 py-3 rounded-full font-semibold tracking-wider"
              >
                Atualizar Dados
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
