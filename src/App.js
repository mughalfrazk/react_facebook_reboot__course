import { useState } from 'react';
import AppRouter from './router';
import { AuthContext } from './context/auth-context';

import { useAuth } from './hooks/auth-hook';
import './App.css';

const App = () => {
  const values = useAuth()

  return (
    <AuthContext.Provider value={values} >
      <AppRouter />
    </AuthContext.Provider>
  );
};

export default App;
