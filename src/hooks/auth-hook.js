import { useState } from 'react';
import { getFromLocalStorage, setIntoLocalStorage } from '../utils/functions';

export const useAuth = () => {
  const data = getFromLocalStorage('auth-data');
  const [userData, setUserData] = useState({
    email: data?.email,
    _id: data?._id,
    first_name: data?.first_name,
    last_name: data?.last_name,
    bio: data?.bio,
    username: data?.username,
    img: data?.img,
    role: data?.role,
    token: data?.token
  });

  const getUserData = (user) => {
    setUserData(user);
    setIntoLocalStorage('auth-data', user);
  };

  return {
    email: userData?.email,
    _id: userData?._id,
    first_name: userData?.first_name,
    last_name: userData?.last_name,
    bio: userData?.bio,
    username: userData?.username,
    img: userData?.img,
    role: userData?.role,
    token: userData?.token,
    getData: getUserData,
  };
};
