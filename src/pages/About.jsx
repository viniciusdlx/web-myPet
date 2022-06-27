import React from 'react'
import { Navbar } from 'flowbite-react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
// import SetValuesAuth0 from '../components/SetValuesAuth0'
import GetTokenWEB from '../components/GetTokenWEB'
import GetTokenAPI from '../components/GetTokenAPI'
// import { Container } from './styles';
var tokenAPI = localStorage.getItem('tokenAPI')
var tokenWEB = localStorage.getItem('tokenWEB')

function About() {
  // (<SetValuesAuth0 />)
  return (
    <>
      {<GetTokenAPI />}
      {<GetTokenWEB />}
      <header>
        <Navbar />
      </header>
      <div>TokenAPI : {tokenAPI}</div>
      <br />
      <br />
      <br />
      <div>TokenWEB: {tokenWEB}</div>
    </>
  )
}

export default About
