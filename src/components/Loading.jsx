import React from 'react'
import loading from '../assets/loading.svg'

export default function Loading() {
  return (
    <div className="h-full flex justify-center items-center">
      <img src={loading} alt="Loading" />
    </div>
  )
}
