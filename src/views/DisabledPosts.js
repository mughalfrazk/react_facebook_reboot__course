import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

import PostList from '../components/PostList';

const DisabledPosts = () => {
  const setSpacing = useOutletContext();

  useEffect(() => {
    setSpacing(true);
  }, []);

  const [posts, setPosts] = useState([]);

  const getAllPostsApi = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/post?active=false')
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllPostsApi();
  }, [])

  return <PostList data={posts} />;
};

export default DisabledPosts;
