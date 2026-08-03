import React from 'react' 
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute() {
  const user = localStorage.getItem("user");
  const isAuthenticated = JSON.parse(user);

  if(isAuthenticated.isLogin) {
    return 'hello'
  }

  return children
}