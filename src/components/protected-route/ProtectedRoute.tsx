import React from 'react';
import { Navigate } from "react-router-dom";

import { isAuthenticated } from '../../services/authService';


export const ProtectedRoute = (props:any) => {

  if (isAuthenticated()) 
    return props.children;
  
  return <Navigate to="/" />;
}