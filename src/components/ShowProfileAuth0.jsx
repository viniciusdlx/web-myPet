import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const ProfileAuth0 = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading ...</div>
  }
  return (
    isAuthenticated && (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  )
}

export default ProfileAuth0
