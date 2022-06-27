import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react'
import { AddMedications } from '../components/AddMedications'
import { AddVaccines } from '../components/AddVaccines'
import { DeletePet } from '../components/DeletePet'
import Loading from '../components/Loading'
import { NavLink } from 'react-router-dom'
import SetValuesAuth0 from '../components/SetValuesAuth0'
// import { Container } from './styles';

var tutorId = JSON.parse(localStorage.getItem('tutorID'))
var tokenAPI = localStorage.getItem('tokenAPI')
var tokenWEB = localStorage.getItem('tokenWEB')
tutorId = tutorId.id

const initialValue = {
  name: '',
  breed: '',
  gender: '',
  birthday: '',
  specie: '',
  tutorId: tutorId
}

const FormCadastrarNovoPet = () => {
  const submitNewPet = e => {
    e.preventDefault()

    let data = values
    data = {
      ...data,
      tutorId
    }

    const optionsPutPet = {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + tokenAPI,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    fetch(`${import.meta.env.VITE_AUTH0_AUDIENCE}pets`, optionsPutPet)
      .then(response => response.json())
      .then(result => console.log(result))

    console.log(data)

    e.target.reset()
  }

  const [values, setValues] = useState(initialValue)
  function onChange(event) {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }
  return (
    <div>
      <form
        id="formNewPet"
        onSubmit={submitNewPet}
        autoComplete="off"
        className="flex flex-col justify-center items-center h-full p-4 gap-y-4 text-black"
      >
        <div className="form-floating mb-3 w-full xl:w-96">
          <input
            type="text"
            id="name"
            name="name"
            onChange={onChange}
            className="form-control block ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
            placeholder="Nome do seu Pet"
            required
          />
          <label htmlFor="name" className="text-gray-700">
            Nome
          </label>
        </div>
        <div className="form-floating mb-3 w-full xl:w-96">
          <input
            type="text"
            id="breed"
            name="breed"
            onChange={onChange}
            className="form-control block ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
            placeholder="Ex: Canina"
            required
          />
          <label htmlFor="breed" className="text-gray-700">
            Raça
          </label>
        </div>
        <div className="form-floating mb-3 w-full xl:w-96">
          <select
            id="gender"
            name="gender"
            onChange={onChange}
            className="form-select appearance-none block ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
            required
          >
            <option selected>Selecione o gênero do pet</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
        </div>
        <div className="mb-3 w-full xl:w-96">
          <input
            type="date"
            id="birthday"
            name="birthday"
            onChange={onChange}
            className="form-control h-[58px] max-h-[58px] block ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
            placeholder="Data de Nascimento"
            required
          />
        </div>
        <div className="form-floating mb-3 w-full xl:w-96">
          <input
            type="text"
            id="specie"
            name="specie"
            onChange={onChange}
            className="form-control block ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
            placeholder="Espécie"
            required
          />
          <label htmlFor="specie" className="text-gray-700">
            Espécie
          </label>
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-mpGradientInit via-mpGradientMiddle to-mpGradientEnd text-xl mbm:text-2xl text-white px-10 py-3 rounded-full font-semibold tracking-wider"
        >
          Cadastrar Pet
        </button>
      </form>
    </div>
  )
}

const ModalNewPet = () => {
  return (
    <div>
      <button
        type="button"
        title="Cadastrar Novo Pet"
        data-bs-toggle="modal"
        data-bs-target="#modalCadastrarNovoPet"
        className="text-mpPurple1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <div
        id="modalCadastrarNovoPet"
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        tabIndex="-1"
        aria-labelledby="cadastroPetModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-lg font-medium leading-normal text-gray-800"
                id="cadastroPetModalLabel"
              >
                Preencha o formulário com as informações do seu Pet!
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative p-4">
              <FormCadastrarNovoPet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const NewPet = () => {
  return (
    <div className="text-black">
      <button className="flex flex-col items-center">
        <ModalNewPet />
      </button>
    </div>
  )
}

function MyPets() {
  const { user, isAuthenticated } = useAuth0()
  const DivGetPets = () => {
    const optionsGetPets = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + tokenAPI,
        'Content-type': 'application/json'
      }
    }
    fetch(
      `${import.meta.env.VITE_AUTH0_AUDIENCE}tutor/${tutorId}`,
      optionsGetPets
    )
      .then(response => response.json())
      .then(result => {
        function TestDiv() {
          const listPet = result.pet
          listPet.map(pet => <div>{pet}</div>)
        }
      })
  }
  const petsList = [
    {
      id: '1',
      name: 'Gohan',
      breed: '',
      gender: 'Feminino',
      birthday: '2022-06-23',
      specie: 'Viralata'
    },
    {
      id: '2',
      name: 'Gohan',
      breed: 'Canina',
      gender: '',
      birthday: '2022-06-23',
      specie: 'Viralata'
    },
    {
      id: '3',
      name: 'Gohan',
      breed: 'Canina',
      gender: 'Feminino',
      birthday: '2022-06-23',
      specie: 'Viralata'
    },
    {
      id: '4',
      name: 'Gohan',
      breed: 'Canina',
      gender: 'Masculino',
      birthday: '2022-06-23',
      specie: 'Viralata'
    }
  ]

  const GetPets = () => {
    // fetch('https://my-petweb.herokuapp.com/tutor', {
    //   headers: { Authorization: `Bearer ${token.access_token}` }
    // })
    //   .then(response => response.json())
    //   .then(result => console.log(result))
  }

  const [disable, setDisable] = useState(false)
  const enableInputs = () => {
    setDisable(current => !current)
  }
  useEffect(() => {}, [disable])
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="flex md:flex-col items-center py-10">
        <div className="container mx-auto text-white">
          <div className="px-4 md:px-0 sm:w-3/4 lg:w-10/12 3xl:w-1/2 mx-auto">
            <div className="flex justify-between items-center">
              <h1 className="text-[30px] lg:text-5xl text-mpPurple2 font-bold">
                Seus pets,{' '}
                <NavLink to="/perfil" className="hover:underline">
                  {user.name}
                </NavLink>
                <GetPets />
                {/* <button onClick={GetPets}>hehe</button> */}
                {/* {console.log(JSON.stringify(user, null, 2))} */}
              </h1>
              <NewPet />
            </div>

            <div>
              <div className="accordion py-10" id="accordionExample">
                {petsList.map(pet => (
                  <div className="accordion-item bg-white border border-gray-200">
                    <h2
                      className="accordion-header mb-0"
                      id={`heading-${pet.id}`}
                    >
                      <button
                        className="accordion-button relative flex items-center w-full py-4 px-5 text-gray-800 text-left text-2xl bg-white border-0 rounded-none transition focus:outline-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${pet.id}`}
                        aria-expanded="true"
                        aria-controls={`collapse${pet.id}`}
                      >
                        {pet.name}
                      </button>
                    </h2>
                    <div
                      id={`collapse${pet.id}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`heading-${pet.id}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body py-4 px-5 text-black">
                        <div className="text-lg">
                          <div className="text-black flex justify-end py-2">
                            <button
                              className="active:scale-105"
                              onClick={enableInputs}
                              type="button"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                          </div>
                          <form
                            id="editDataPet"
                            className="grid grid-flow-row gap-y-4"
                          >
                            <div className="grid grid-cols-2 gap-x-4">
                              <input
                                type="text"
                                id="valueNamePet"
                                name="valueNamePet"
                                placeholder="Nome do Pet"
                                value={pet.name}
                                className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic  disabled:bg-[#e9ecef] disabled:opacity-[0.7] disabled:cursor-not-allowed"
                                disabled={disable ? false : true}
                              />
                              <input
                                type="text"
                                id="valueBreedPet"
                                name="valueBreedPet"
                                placeholder="Raça do Pet"
                                value={pet.breed}
                                className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black disabled:bg-[#e9ecef] disabled:opacity-[0.7] disabled:cursor-not-allowed"
                                disabled={disable ? false : true}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-x-4">
                              <select
                                name="valueGenderPet"
                                id="valueGenderPet"
                                className="form-select appearance-none block ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black disabled:cursor-not-allowed"
                                disabled={disable ? false : true}
                              >
                                <option selected defaultValue="test">
                                  {pet.gender == ''
                                    ? 'Selecione o gênero'
                                    : pet.gender}
                                </option>
                                <option
                                  value="masculino"
                                  className={
                                    pet.gender === 'Masculino'
                                      ? 'hidden'
                                      : 'flex'
                                  }
                                >
                                  Masculino
                                </option>
                                <option
                                  value="feminino"
                                  className={
                                    pet.gender === 'Feminino'
                                      ? 'hidden'
                                      : 'flex'
                                  }
                                >
                                  Feminino
                                </option>
                              </select>
                              <input
                                type="date"
                                id="valueBirthdayPet"
                                name="valueBirthdayPet"
                                value={pet.birthday !== '' ? pet.birthday : ''}
                                className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black disabled:bg-[#e9ecef] disabled:opacity-[0.7] disabled:cursor-not-allowed"
                                disabled={disable ? false : true}
                              />
                            </div>
                            <div className="flex justify-center items-center w-1/2 mx-auto">
                              <input
                                type="text"
                                id="valueSpeciePet"
                                name="valueSpeciePet"
                                placeholder="Espécie do Pet"
                                value={pet.specie}
                                className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black disabled:bg-[#e9ecef] disabled:opacity-[0.7] disabled:cursor-not-allowed"
                                disabled={disable ? false : true}
                              />
                            </div>
                            <div className="flex justify-center items-center w-1/2 mx-auto">
                              <button
                                type="submit"
                                className="hidden bg-gradient-to-r from-mpGradientInit via-mpGradientMiddle to-mpGradientEnd text-xl mbm:text-2xl text-white px-10 py-3 rounded-full font-semibold tracking-wider"
                              >
                                Atualizar Dados do Pet
                              </button>
                            </div>
                          </form>
                        </div>
                        <div className="w-fit md:w-full mx-auto text-center flex flex-col-reverse md:flex-row  justify-between gap-y-3">
                          <div>
                            <button
                              onClick={DeletePet}
                              className="bg-red-800 xl:text-2xl text-white px-4 xl:px-10 py-2 xl:py-3 rounded-full font-semibold tracking-wider"
                            >
                              Excluir
                            </button>
                          </div>
                          <div className="flex flex-col-reverse md:flex-row md:gap-x-2 gap-y-3">
                            <button
                              onClick={AddMedications}
                              className="bg-gradient-to-r from-mpGradientInit via-mpGradientMiddle to-mpGradientEnd xl:text-2xl text-white px-4 xl:px-10 py-2 xl:py-3 rounded-full font-semibold tracking-wider"
                            >
                              Adicionar Medicamentos
                            </button>
                            <button
                              onClick={AddVaccines}
                              className="bg-gradient-to-r from-mpGradientInit via-mpGradientMiddle to-mpGradientEnd xl:text-2xl text-white px-4 xl:px-10 py-2 xl:py-3 rounded-full font-semibold tracking-wider"
                            >
                              Adicionar Vacina
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withAuthenticationRequired(MyPets, {
  onRedirecting: () => <Loading />
})
