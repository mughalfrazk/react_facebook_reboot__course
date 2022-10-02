import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';

import PostList from '../components/PostList';
import { AuthContext } from '../context/auth-context';

const DisabledPosts = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const setSpacing = useOutletContext();

  useEffect(() => {
    setSpacing(true);
  }, []);

  const [posts, setPosts] = useState([]);

  const getAllPostsApi = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/post?active=false`, {
        headers: {
          "Authorization": `Bearer ${auth.token}`
        }
      })
      setPosts(data);
    } catch (error) {
      if (error.response.data.status === 401) {
        navigate("/401");
      }
      console.log(error);
    }
  }

  useEffect(() => {
    getAllPostsApi();
  }, [])

  return <PostList data={posts} />;
};

export default DisabledPosts;
