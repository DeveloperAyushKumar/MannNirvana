import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router'
function PrivateRoute({children}) {
    const {currentUser}=useAuth()
    if(!currentUser){
        return <Navigate to="/login" replace />
    }

  return children
}

export default PrivateRoute