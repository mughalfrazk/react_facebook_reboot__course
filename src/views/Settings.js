import React, { useContext, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import SettingsCard from '../components/SettingsCard';
import { AuthContext } from '../context/auth-context';


const Settings = () => {
  const setSpacing = useOutletContext();

  useEffect(() => {
    setSpacing(true);
  }, []);

  const auth = useContext(AuthContext)
  return <SettingsCard user={auth} />;
};

export default Settings;
