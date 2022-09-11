import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PostList from '../components/PostList';

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);

  const getAllPostsApi = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/post')
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

export default NewsFeed;
