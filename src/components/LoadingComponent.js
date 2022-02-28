import React from 'react'
import { Spinner } from "react-bootstrap"

export const LoadingComponent = () => {
  return (
    <div className="mt-5 dflex justify-content-center text-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}
