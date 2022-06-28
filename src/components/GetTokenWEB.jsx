import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const GetTokenWEB = () => {
  const { user, getAccessTokenSilently } = useAuth0()
  const getToken = async () => {
    const domain = import.meta.env.VITE_AUTH0_DOMAIN

    try {
      console.log('user', user)
      const acessToken = await getAccessTokenSilently({
        audience: 'https://my-pet.us.auth0.com/api/v2/',
        scope: 'read:current_user'
      })
      localStorage.removeItem('tokenWEB')
      localStorage.setItem('tokenWEB', acessToken)
      console.log('setado TokenWEB')

      let myHeaders = new Headers()
      myHeaders.append('Authorization', 'Bearer ' + accessToken)
      myHeaders.append('Content-Type', 'application/json')

      const optionSgetUserMetadata = {
        method: 'GET',
        headers: myHeaders
      }

      fetch(
        `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/users/${user.sub}`,
        optionSgetUserMetadata
      )
        .then(response => response.json())
        .then(result => {
          const tutorId = JSON.stringify(result.user_metadata)
          console.log(tutorId)
          localStorage.removeItem('tutorID')
          localStorage.setItem('tutorID', tutorId)
          console.log('setado TutorId')
        })
    } catch (e) {
      console.error('Error ->', e.message)
    }
  }

  getToken()
}
export default GetTokenWEB
