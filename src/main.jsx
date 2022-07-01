import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App'
import 'tw-elements'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    // domain="my-pet.us.auth0.com"
    // clientId="qECVeyW6eCPlPysAHRFPHNaohzU3EQJL"
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID_WEB}
    redirectUri={window.location.origin}
    audience={`https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/`}
    scope="read:current_user update:current_user_metadata update:current_app_metadata"
  >
    <App />
  </Auth0Provider>
)
