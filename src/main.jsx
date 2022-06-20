import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'tw-elements'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'

// const domain = process.env.REACT_APP_AUTH0_DOMAIN
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    // domain="my-pet.us.auth0.com"
    domain="dev-s5h3lzwa.us.auth0.com"
    // clientId="qECVeyW6eCPlPysAHRFPHNaohzU3EQJL"
    clientId="XWFLTuuXYdMHNtZGInSsgBMF7i0TztYZ"
    redirectUri={window.location.origin}
    audience="https://dev-s5h3lzwa.us.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata"
  >
    <App />
  </Auth0Provider>
)
