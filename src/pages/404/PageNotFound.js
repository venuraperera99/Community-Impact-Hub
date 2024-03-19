import React from 'react'
import "./PageNotFound.css"

export const PageNotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className='errorh1'>404</h1>
        <p>Page Not Found</p>
        <p>Oops! The page you are looking for does not exist.</p>
      </div>
    </div>
  )
}
