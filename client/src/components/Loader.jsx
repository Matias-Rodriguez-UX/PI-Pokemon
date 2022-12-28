import React from 'react'
import './Loader.css'

export const Loader = () => {
  return (
    <div>
      <h1>Cargando...</h1>
      <div className="lds-ripple"><div></div><div></div></div>
    </div>

  )
}