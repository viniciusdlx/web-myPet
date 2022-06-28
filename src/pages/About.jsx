import React from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import GetTokenWEB from '../components/GetTokenWEB'
import GetTokenAPI from '../components/GetTokenAPI'
import NavbarElements from '../components/Navbar'
var tokenAPI = localStorage.getItem('tokenAPI')
var tokenWEB = localStorage.getItem('tokenWEB')

function About() {
  return (
    <>
      {/* {<GetTokenAPI />} */}
      {/* {<GetTokenWEB />} */}
      <header>
        <NavbarElements />
      </header>
      <div className="text-black container mx-auto m-10">
        <div className="bg-white border shadow-xl m-4 p-4 mbl:p-6 md:p-10  rounded-3xl">
          <h1 className="text-center text-mpDarkPurple text-3xl font-semibold py-6">
            Cuidar do seu pet não precisa ser complicado.
          </h1>
          <div className="text-justify text-xl leading-8 tracking-wide">
            <p className="mb-4">
              Com a correria do cotidiano e nossos compromissos, se torna fácil
              esquecer os compromissos dos nossos animais de estimação. Foi
              pensando neste cenário tão comum que o MyPet foi idealizado.
            </p>
            <p className="mb-4">
              O MyPet permite que todas as consultas e vacinas sejam marcadas em
              único lugar e promove um sistema de notificação, para que você
              seja informado desta com antecedência. Em adição, permite que
              todas as informações do seu pet, como peso, data de nascimento e
              histórico, sejam armazenadas em um mesmo lugar, facilitando a
              comunicação com o veterinário posteriormente.
            </p>
            <p className="mb-4">
              A missão da MyPet é promover ao usuário um sistema que o auxilie
              nos cuidados com seu pet, permitindo a este uma qualidade de vida
              melhor.
            </p>
            <p className="mb-4">
              Com a MyPet, cuidar do seu pet não precisa ser complicado.
            </p>
          </div>
        </div>
      </div>

      {/* <div>TokenAPI : {tokenAPI}</div>
      <br />
      <br />
      <br />
      <div>TokenWEB: {tokenWEB}</div> */}
    </>
  )
}

export default About
