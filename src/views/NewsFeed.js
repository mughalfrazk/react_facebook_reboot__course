import React, { useContext, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

import PostList from '../components/PostList';
import { AuthContext } from '../context/auth-context';

const NewsFeed = () => {
  const auth = useContext(AuthContext);
  const setSpacing = useOutletContext();

  useEffect(() => {
    setSpacing(true);
  }, []);

  const [posts, setPosts] = useState([]);

  const getAllPostsApi = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/post`, {
        headers: {
          "Authorization": `Bearer ${auth.token}`
        }
      });
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPostsApi();
  }, []);

  return <PostList data={posts} />;
};

export default NewsFeed;
