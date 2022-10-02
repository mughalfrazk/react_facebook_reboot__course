import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

import PostList from '../components/PostList';
import { AuthContext } from '../context/auth-context';

const Profile = () => {
  const auth = useContext(AuthContext)
  const setSpacing = useOutletContext();

  useEffect(() => {
    setSpacing(true);
  }, []);

  const [posts, setPosts] = useState([]);

  const getUserPosts = async (id) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/post?userId=${id}`, {
        headers: {
          "Authorization": `Bearer ${auth.token}`
        }
      })
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserPosts(auth._id);
  }, [auth._id])

  return <PostList data={posts} />;
};

export default Profile;
