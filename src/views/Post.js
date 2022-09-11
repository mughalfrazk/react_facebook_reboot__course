import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';

const Post = () => {
  const params = useParams();
  const [post, setPost] = useState();

  const getSingleItem = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/post/${id}`)
      setPost(data[0])
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (params.id) getSingleItem(params.id)
  }, [params.id])

  return post && <PostCard item={post} />;
};

export default Post;
