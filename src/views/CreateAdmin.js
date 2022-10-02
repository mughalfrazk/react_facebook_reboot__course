import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Signup from './Signup';

const CreateAdmin = () => {
  const setSpacing = useOutletContext();

  useEffect(() => {
    setSpacing(false);
  }, []);

  return <Signup role="admin" />;
};

export default CreateAdmin;
