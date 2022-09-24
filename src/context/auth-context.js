import { createContext } from 'react';

export const AuthContext = createContext({
  _id: '',
  first_name: '',
  last_name: '',
  bio: '',
  username: '',
  img: '',
  email: '',
  role: '',
  getData: () => {},
});
