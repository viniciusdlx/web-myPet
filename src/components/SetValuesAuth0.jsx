// import React, { useEffect, useState } from 'react'
// import Navbar from '../components/Navbar'
// import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
// import Loading from './Loading'

// const SetValuesAuth0 = () => {
//   const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
//   const [userMetadata, setUserMetadata] = useState(null)
//   useEffect(() => {
//     const getUserMetadata = async () => {
//       const domain = import.meta.env.VITE_AUTH0_DOMAIN

//       try {
//         const accessToken = await getAccessTokenSilently({
//           audience: `https://${domain}/api/v2/`,
//           scope: 'read:current_user'
//         })

//         console.log(accessToken)
//         const userDetailsByIdUrl =
//           await `https://${domain}/api/v2/users/${user.sub}`

//         const metadataResponse = await fetch(userDetailsByIdUrl, {
//           headers: { Authorization: `Bearer ${accessToken}` }
//         })

//         const { user_metadata } = await metadataResponse.json()
//         setUserMetadata({ user_metadata })
//         // console.log({ user_metadata })
//         // console.log(userMetadata)
//         console.log(userMetadata)
//       } catch (e) {
//         console.log(e.message)
//       }
//     }
//     getUserMetadata()
//   }, [getAccessTokenSilently, user?.sub])
// }

// export default withAuthenticationRequired(SetValuesAuth0, {
//   onRedirecting: () => <Loading />
// })
