import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';

const Guard = (props) => {
  const authData = useContext(AuthContext)

  if (authData.email) return props.children;
  return <Navigate to="/login" />
};

export default Guard;
