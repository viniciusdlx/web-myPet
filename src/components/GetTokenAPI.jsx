import React from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from './Loading'

const GetAccessToken = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
  myHeaders.append(
    'Cookie',
    'did=s%3Av0%3A8bbac860-f01b-11ec-9cf5-35cd03865123.jCRZYwHBI3BFkyPwGb7KWV%2BjfthmBwnuE6iLOY3vVJw; did_compat=s%3Av0%3A8bbac860-f01b-11ec-9cf5-35cd03865123.jCRZYwHBI3BFkyPwGb7KWV%2BjfthmBwnuE6iLOY3vVJw'
  )

  var urlencoded = new URLSearchParams()
  urlencoded.append('grant_type', 'client_credentials')
  urlencoded.append('client_id', 'qECVeyW6eCPlPysAHRFPHNaohzU3EQJL')
  urlencoded.append(
    'client_secret',
    'MtF_O7rcORR2djlrqCou4fVb3TUXeQOwee80aEaXuYACLifUfxZRvTBC8CG497ao'
  )
  urlencoded.append('audience', 'https://my-petweb.herokuapp.com/')

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  }

  fetch('https://my-pet.us.auth0.com/oauth/token', requestOptions)
    .then(response => response.json())
    .then(result => {
      let tokenAPI = result.access_token
      localStorage.removeItem('tokenAPI')
      localStorage.setItem('tokenAPI', tokenAPI)
    })
    .catch(error => console.log('error', error))
}

export default GetAccessToken
