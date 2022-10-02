import React, { useContext, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import SettingsCard from '../components/SettingsCard';
import { AuthContext } from '../context/auth-context';

const UserProfile = () => {
  const auth = useContext(AuthContext);
  const setSpacing = useOutletContext();

  useEffect(() => {
    setSpacing(true);
  }, []);

  const { id } = useParams();
  const [user, setUser] = useState();

  const getUserApi = async (id) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/user/${id}`, {
        headers: {
          "Authorization": `Bearer ${auth.token}`
        }
      });
      setUser(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  } 

  useEffect(() => {
    console.log('Render')
    if (id) getUserApi(id)
  }, [id])

  return user && <SettingsCard user={user} />;
};

export default UserProfile;
