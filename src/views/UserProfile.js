import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SettingsCard from '../components/SettingsCard';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState();

  const getUserApi = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/user/${id}`);
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
