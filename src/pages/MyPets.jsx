import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react'
import { DeletePet } from '../components/DeletePet'
import Loading from '../components/Loading'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Navigate } from 'react-router-dom'
// import { Container } from './styles';

function MyPets() {
  const [tutorId, setTutorId] = useState(undefined)
  var intervalo = setInterval(() => {
    const tutorJson = JSON.parse(localStorage.getItem('tutorID'))

    if (tutorJson.id) {
      setTutorId(tutorJson.id)
      clearInterval(intervalo)
    }
  }, 500)
  var tokenAPI = localStorage.getItem('tokenAPI')
  var tokenWEB = localStorage.getItem('tokenWEB')

  const [selectedPet, setSelectedPet] = useState({})

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

  const initialValue = {
    name: '',
    breed: '',
    gender: '',
    birthday: '',
    specie: '',
    tutorId: tutorId
  }

  const ShowMoreInfos = props => {
    const [petVaccinesList, setPetVaccinesList] = useState([])
    const [loadVac, setLoadVac] = useState(false)

    useEffect(() => {
      loadVaccines()
    }, [loadVac])

    const loadVaccines = () => {
      console.log('selectedPet', selectedPet)
      fetch(`https://my-petweb.herokuapp.com/pet-vaccine/${selectedPet?.id}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + tokenAPI,
          'Content-type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(result => {
          console.log('wha >> ', result.content)
          setPetVaccinesList(result.content)
        })
        .catch(err => {
          console.log(err)
          // Toast.fire({
          //   icon: 'error',
          //   title: 'Vacina falhou ao carregar'
          // })
        })
    }

    return (
      <div
        class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="modalShowMoreInfosPet"
        tabindex="-1"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        role="dialog"
      >
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
          <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
              <h1 class="ml-auto text-lg text-black">
                Mais Informações sobre seu Pet
              </h1>
              <button
                type="button"
                class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body relative p-4 text-black">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item bg-white border border-gray-200">
                  <h2 class="accordion-header mb-0" id="headingOne">
                    <button
                      class=" accordion-button relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      onClick={() => setLoadVac(!loadVac)}
                    >
                      Vacinas
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body py-4 px-3">
                      {petVaccinesList.map(petVaccine => {
                        return (
                          <details className="bg-white border open:bg-white open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-4 mb-3 rounded-lg">
                            <summary className="flex justify-between items-center flex-row text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
                              <div className="flex">
                                <span className="mr-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </span>
                                <span>
                                  Vacina Aplicada: {petVaccine.vaccine.name}
                                </span>
                              </div>
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 inline-flex"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </span>
                            </summary>
                            <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                              <p>Descrição: {petVaccine.description}</p>
                              <p>
                                Data de Aplicação: {petVaccine.applicationDate}
                              </p>
                              <p>Próxima Data: {petVaccine.nextDate}</p>
                            </div>
                          </details>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div class="accordion-item bg-white border border-gray-200">
                  <h2 class="accordion-header mb-0" id="headingTwo">
                    <button
                      class=" accordion-button collapsed relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none
      "
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Medications
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body py-4 px-5"></div>
                  </div>
                </div>
              </div>
              <div class="accordion-item bg-white border border-gray-200">
                <h2 class="accordion-header mb-0" id="headingThree">
                  <button
                    class=" accordion-button collapsed relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none
      "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Cirurgias
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body py-4 px-5"></div>
                </div>
              </div>

              {/* <form
              id="formNewPet"
              autoComplete="off"
              className="flex flex-col justify-center items-center h-full p-4 gap-y-4 text-black"
            >
              <div className="form-floating mb-3 w-full xl:w-96">
                <select
                  id="vaccineId"
                  name="vaccineId"
                  className="form-select appearance-none block ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                  required
                >
                  <option selected>Selecione o gênero do pet</option>
                </select>
              </div>
              <div className="form-floating mb-3 w-full xl:w-96">
                <input
                  type="date"
                  id="applicationDate"
                  name="applicationDate"
                  className="form-control block ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                  placeholder="Nome do seu Pet"
                  required
                />
                <label htmlFor="applicationDate" className="text-gray-700">
                  Data de Aplicação
                </label>
              </div>

              <div className="form-floating mb-3 w-full xl:w-96">
                <input
                  type="date"
                  id="nextDate"
                  name="nextDate"
                  className="form-control h-[58px] max-h-[58px] block ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                  placeholder="Data de Nascimento"
                  required
                />
                <label htmlFor="nextDate" className="text-gray-700">
                  Próxima data de Aplicação
                </label>
              </div>
              <div className="form-floating mb-3 w-full xl:w-96">
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="form-control block ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                  placeholder="Espécie"
                  required
                />
                <label htmlFor="description" className="text-gray-700">
                  Descrição
                </label>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-mpGradientInit via-mpGradientMiddle to-mpGradientEnd text-xl mbm:text-2xl text-white px-10 py-3 rounded-full font-semibold tracking-wider"
              >
                Adicionar Vacina
              </button>
            </form> */}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const AddMedications = () => {
    const submitAddMedications = e => {
      e.preventDefault()
    }
  }

  const AddVaccines = () => {
    const submitAddVaccine = e => {
      e.preventDefault()

      const data = {
        petId: selectedPet?.id,
        vaccineId: document.getElementById('vaccineId').value,
        applicationDate: document.getElementById('applicationDate').value,
        nextDate: document.getElementById('nextDate').value,
        description: document.getElementById('description').value
      }

      fetch(`https://my-petweb.herokuapp.com/pet-vaccine`, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + tokenAPI,
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(result => {
          Toast.fire({
            icon: 'success',
            title: 'Vacina cadastrada com sucesso'
          })
          ;(document.getElementById('vaccineId').value = ''),
            (document.getElementById('applicationDat').value = ''),
            (document.getElementById('nextDate').value = ''),
            (document.getElementById('description').value = '')
        })
        .catch(err => {
          console.log(err)
          Toast.fire({
            icon: 'error',
            title: 'Vacina falhou ao cadastrar'
          })
        })
    }

    const [vaccineList, setVaccineList] = useState([])
    useEffect(() => {
      getVaccines()
    }, [])

    const getVaccines = () => {
      fetch(`https://my-petweb.herokuapp.com/vaccines`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + tokenAPI,
          'Content-type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(result => setVaccineList(result.map(e => e)))
    }

    return (
      <div
        class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="modalAddVaccines"
        tabindex="-1"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        role="dialog"
      >
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
          <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
              <button
                type="button"
                class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body relative p-4">
              <form
                id="formNewPet"
                onSubmit={submitAddVaccine}
                autoComplete="off"
                className="flex flex-col justify-center items-center h-full p-4 gap-y-4 text-black"
              >
                <div className="form-floating mb-3 w-full xl:w-96">
                  <select
                    id="vaccineId"
                    name="vaccineId"
                    className="form-select appearance-none block ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                    required
                  >
                    <option value="" selected>
                      Selecione a vacina
                    </option>
                    {vaccineList?.length > 0 ? (
                      vaccineList.map(e => (
                        <option value={e.id}>{e.name}</option>
                      ))
                    ) : (
                      <option value="">Nenhuma vacina encontrada</option>
                    )}
                  </select>
                </div>
                <div className="form-floating mb-3 w-full xl:w-96">
                  <input
                    type="date"
                    id="applicationDate"
                    name="applicationDate"
                    className="form-control block ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                    placeholder="Nome do seu Pet"
                    required
                  />
                  <label htmlFor="applicationDate" className="text-gray-700">
                    Data de Aplicação
                  </label>
                </div>

                <div className="form-floating mb-3 w-full xl:w-96">
                  <input
                    type="date"
                    id="nextDate"
                    name="nextDate"
                    className="form-control h-[58px] max-h-[58px] block ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                    placeholder="Data de Nascimento"
                    required
                  />
                  <label htmlFor="nextDate" className="text-gray-700">
                    Próxima data de Aplicação
                  </label>
                </div>
                <div className="form-floating mb-3 w-full xl:w-96">
                  <input
                    type="text"
                    id="description"
                    name="description"
                    className="form-control block ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black"
                    placeholder="Espécie"
                    required
                  />
                  <label htmlFor="description" className="text-gray-700">
                    Descrição
                  </label>
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="bg-gradient-to-r from-mpGradientInit via-mpGradientMiddle to-mpGradientEnd text-xl mbm:text-2xl text-white px-10 py-3 rounded-full font-semibold tracking-wider"
                >
                  Adicionar Vacina
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
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
        .then(result => {
          Toast.fire({
            icon: 'success',
            title: 'Pet cadastrado com sucesso'
          })
        })
        .catch(err => {
          Toast.fire({
            icon: 'error',
            title: 'Falha ao cadastrar pet'
          })
        })

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
            data-bs-dismiss="modal"
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

  const { user, isAuthenticated } = useAuth0()
  const [petsList, setPetsList] = useState([])

  useEffect(() => {
    if (tutorId) {
      GetPets()
    }
  }, [tutorId])

  function GetPets() {
    fetch(`https://my-petweb.herokuapp.com/pets/${tutorId}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + tokenAPI,
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => setPetsList(result?.content))
      .catch(error => {
        console.log('error', error)
      })
  }

  const [disable, setDisable] = useState(true)
  const enableInputs = () => {
    setDisable(!disable)
  }

  async function handleSubmit(e, pet, i) {
    e.preventDefault()
    console.log(
      'document.getElementById("valueNamePet_"+i)',
      document.getElementById('valueNamePet_' + i)
    )
    const body = {
      name: document.getElementById('valueNamePet_' + i).value || pet.name,
      breed: document.getElementById('valueBreedPet_' + i).value || pet.breed,
      gender:
        document.getElementById('valueGenderPet_' + i).value || pet.gender,
      birthday:
        document.getElementById('valueBirthdayPet_' + i).value || pet.birthday,
      specie:
        document.getElementById('valueSpeciePet_' + i).value || pet.specie,
      tutorId
    }

    const optionsPutPet = {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + tokenAPI,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    console.log('body', body, pet.id)
    await fetch(
      `${import.meta.env.VITE_AUTH0_AUDIENCE}pets/${pet.id}`,
      optionsPutPet
    )
      .then(response => response.json())
      .then(() => {
        console.log('sucesso')
        Toast.fire({
          icon: 'success',
          title: 'Pet alterado com sucesso'
        })
      })
      .catch(() => {
        Toast.fire({
          icon: 'error',
          title: 'Falha ao alterar pet'
        })
      })
    console.log('depois do sucesso')
    GetPets()
  }

  return (
    <>
      <ShowMoreInfos />
      <AddVaccines />
      <header>
        <Navbar />
      </header>
      <div className="flex md:flex-col items-center py-10">
        <div className="container mx-auto text-white">
          <div className="px-4 md:px-0 sm:w-3/4 lg:w-10/12 3xl:w-1/2 mx-auto">
            <div className="flex justify-between items-center">
              <h1 className="text-[30px] lg:text-5xl text-mpPurple2 font-bold">
                Seus pets{' '}
                <NavLink to="/perfil" className="hover:underline">
                  <span>{user?.name}</span>
                </NavLink>
                {/* <GetPets /> */}
                {/* <button onClick={GetPets}>hehe</button> */}
                {/* {console.log(JSON.stringify(user, null, 2))} */}
              </h1>
              <NewPet />
            </div>

            <div>
              <div className="accordion py-10" id="accordionPetList">
                {petsList?.length > 0 ? (
                  petsList.map((pet, i) => (
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
                          onClick={() => setSelectedPet(pet)}
                        >
                          {pet.name}
                        </button>
                      </h2>
                      <div
                        id={`collapse${pet.id}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading-${pet.id}`}
                        data-bs-parent="#accordionPetList"
                      >
                        <div className="accordion-body py-4 px-5 text-black">
                          <div className="text-lg">
                            <div className="text-black flex justify-end py-2">
                              <button
                                type="button"
                                className="active:scale-105"
                                data-bs-toggle="modal"
                                data-bs-target="#modalShowMoreInfosPet"
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
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </button>
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
                              onSubmit={e => handleSubmit(e, pet, i)}
                              action="post"
                            >
                              <div className="grid grid-cols-2 gap-x-4">
                                <input
                                  type="text"
                                  id={'valueNamePet_' + i}
                                  name="valueNamePet"
                                  placeholder={pet.name}
                                  className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black disabled:bg-[#e9ecef] disabled:opacity-[0.7] disabled:cursor-not-allowed"
                                  disabled={disable}
                                />
                                <input
                                  type="text"
                                  id={'valueBreedPet_' + i}
                                  name="valueBreedPet"
                                  placeholder={pet.breed}
                                  className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black disabled:bg-[#e9ecef] disabled:opacity-[0.7] disabled:cursor-not-allowed"
                                  disabled={disable}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-x-4">
                                <select
                                  name="valueGenderPet"
                                  id={'valueGenderPet_' + i}
                                  className="form-select appearance-none block ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black disabled:cursor-not-allowed"
                                  disabled={disable}
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
                                  type="text"
                                  name="valueBirthdayPet"
                                  id={'valueBirthdayPet_' + i}
                                  onFocus={e => (e.target.type = 'date')}
                                  onBlur={e => (e.target.type = 'text')}
                                  placeholder={
                                    pet.birthday !== '' ? pet.birthday : ''
                                  }
                                  className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black disabled:bg-[#e9ecef] disabled:opacity-[0.7] disabled:cursor-not-allowed"
                                  disabled={disable}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-x-4 mb-4">
                                <input
                                  type="text"
                                  id={'valueSpeciePet_' + i}
                                  name="valueSpeciePet"
                                  placeholder={pet.specie}
                                  className="ease-in-out duration-300 w-full p-4 rounded-xl bg-mpGrey bg-opacity-10 border-1 border-slate-300 text-sm md:text-base lg:text-lg focus:border-none focus:ring-2 focus:border-mpPurple1 focus:ring-mpPurple1 italic placeholder:italic placeholder:text-black disabled:bg-[#e9ecef] disabled:opacity-[0.7] disabled:cursor-not-allowed"
                                  disabled={disable}
                                />
                                <button
                                  type="submit"
                                  className={
                                    disable
                                      ? 'hidden '
                                      : ' ' +
                                        'ml-auto w-fit bg-gradient-to-r from-mpGradientInit via-mpGradientMiddle to-mpGradientEnd text-xl mbm:text-2xl text-white px-10 py-3 rounded-full font-semibold tracking-wider mb-4'
                                  }
                                >
                                  Atualizar Dados do Pet
                                </button>
                              </div>
                            </form>
                          </div>
                          <div className="w-fit md:w-full mx-auto text-center flex flex-col-reverse md:flex-row  justify-between gap-y-3">
                            <div>
                              <button
                                onClick={() =>
                                  DeletePet(pet.id, Toast, () => GetPets())
                                }
                                className="bg-red-800 xl:text-2xl text-white px-4 xl:px-10 py-2 xl:py-3 rounded-full font-semibold tracking-wider"
                              >
                                Excluir
                              </button>
                            </div>
                            <div className="flex flex-col-reverse md:flex-row md:gap-x-2 gap-y-3">
                              <button
                                type="button"
                                className="bg-gradient-to-r from-mpGradientInit via-mpGradientMiddle to-mpGradientEnd xl:text-2xl text-white px-4 xl:px-10 py-2 xl:py-3 rounded-full font-semibold tracking-wider"
                                data-bs-toggle="modal"
                                data-bs-target="#modalAddMedications"
                              >
                                Adicionar Medicamentos
                              </button>
                              <button
                                type="button"
                                class="bg-gradient-to-r from-mpGradientInit via-mpGradientMiddle to-mpGradientEnd xl:text-2xl text-white px-4 xl:px-10 py-2 xl:py-3 rounded-full font-semibold tracking-wider"
                                data-bs-toggle="modal"
                                data-bs-target="#modalAddVaccines"
                              >
                                Adicionar Vacina
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white border border-gray-200 text-black text-center py-4">
                    Nenhum pet cadastrado, cadastre um!
                  </div>
                )}
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
