import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

import PostList from '../components/PostList';
import { AuthContext } from '../context/auth-context';

const Profile = () => {
  const setSpacing = useOutletContext();

  useEffect(() => {
    setSpacing(true);
  }, []);

  const auth = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const getUserPosts = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/post?userId=${id}`)
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
