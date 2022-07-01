import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [userMetadata, setUserMetadata] = useState(null)

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = import.meta.env.VITE_AUTH0_DOMAIN

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: 'read:current_user'
        })

        const setToken = isAuthenticated
          ? sessionStorage.setItem('TOKEN', accessToken)
          : sessionStorage.removeItem('TOKEN')

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        const { user_metadata } = await metadataResponse.json()
        setUserMetadata(user_metadata)
      } catch (e) {
        console.log(e.message)
      }
    }

    getUserMetadata()
  }, [getAccessTokenSilently, user?.sub])

  sessionStorage.setItem('tutor_id', JSON.stringify(userMetadata))
}

export default Profile
