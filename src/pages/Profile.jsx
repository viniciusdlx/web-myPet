import React, { useEffect, useState } from 'react'
import NavbarElements from '../components/Navbar'
import Swal from 'sweetalert2'

export default function Profile() {
  var tokenAPI = localStorage.getItem('tokenAPI')
  var tutorId = JSON.parse(localStorage.getItem('tutorID'))
  tutorId = tutorId?.id

  const [tutorData, setTutorData] = useState([])

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  useEffect(() => {
    GetProfileTutor()
  }, [])

  const GetProfileTutor = async () => {
    await fetch(`https://my-petweb.herokuapp.com/tutor/${tutorId}`, {
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
  async function handleSubmitTutor(e) {
    e.preventDefault()
    const body = {
      name: document.getElementById('nameTutor').value,
      phone: document.getElementById('phoneTutor').value,
      email: document.getElementById('emailTutor').value,
      birthday: document.getElementById('birthdayTutor').value,
      gender: document.getElementById('genderTutor').value
    }

    const optionsPutPet = {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + tokenAPI,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    console.log('body', body)
    await fetch(
      `${import.meta.env.VITE_AUTH0_AUDIENCE}tutor/${tutorId}`,
      optionsPutPet
    )
      .then(response => response.json())
      .then(() => {
        console.log('sucesso')
        Toast.fire({
          icon: 'success',
          title: 'Tutor alterado com sucesso'
        })
      })
      .catch(() => {
        Toast.fire({
          icon: 'error',
          title: 'Falha ao alterar tutor'
        })
      })
    console.log('depois do sucesso')
    GetProfileTutor()
  }
  return (
    <>
      <header>
        <NavbarElements />
      </header>
      <div className="container md:w-4/5 lg:w-3/5 xl:w-1/2 3xl:w-1/3 mx-auto">
        <div className="text-center p-3 mbl:p-8">
          <div className="text-lg mbl:text-xl md:text-3xl text-mpDarkPurple border-2 border-white bg-white rounded-2xl shadow-xl py-6 px-1 mbl:px-3">
            Bem vindo {tutorData.name}! <br /> Esse é seu perfil de Tutor
          </div>
          <div className="h-full border-2 border-white bg-white rounded-2xl shadow-xl mt-6 lg:mt-10 w-full mx-auto">
            <form
              id="formTutor"
              onSubmit={handleSubmitTutor}
              autoComplete="off"
              className="flex flex-col justify-center items-center h-full p-4 gap-y-4 text-black text-left"
            >
              <label htmlFor="nameTutor" className="w-full">
                <span>Nome:</span>
                <input
                  type="text"
                  id="nameTutor"
                  name="nameTutor"
                  autoComplete="name"
                  className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                  placeholder={tutorData.name}
                />
              </label>
              <label htmlFor="phoneTutor" className="w-full">
                <span>Telefone:</span>
                <input
                  type="tel"
                  id="phoneTutor"
                  name="phoneTutor"
                  autoComplete="phone"
                  className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                  placeholder={tutorData.phone}
                />
              </label>
              <label htmlFor="emailTutor" className="w-full">
                <span>Email:</span>
                <input
                  type="email"
                  id="emailTutor"
                  name="emailTutor"
                  autoComplete="email"
                  className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                  placeholder={tutorData.email}
                />
              </label>
              <label htmlFor="birthdayTutor" className="w-full">
                <span>Data de Nascimento: </span>
                <input
                  type="text"
                  id="birthdayTutor"
                  name="birthdayTutor"
                  onFocus={e => (e.target.type = 'date')}
                  onBlur={e => (e.target.type = 'text')}
                  className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic"
                  placeholder={tutorData.birthday}
                />
              </label>
              <label htmlFor="genderTutor" className="w-full">
                <span>Gênero</span>
                <select
                  id="genderTutor"
                  name="genderTutor"
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
              </label>
              <button
                type="submit"
                className="bg-gradient-to-r from-mpGradientInit via-mpGradientMiddle to-mpGradientEnd text-base md:text-2xl text-white px-6 md:px-10 py-3 rounded-full font-semibold tracking-wider"
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
