import React, { useContext } from 'react';
import SettingsCard from '../components/SettingsCard';
import { AuthContext } from '../context/auth-context';


const Settings = () => {
  const auth = useContext(AuthContext)
  return <SettingsCard user={auth} />;
};

export default Settings;
