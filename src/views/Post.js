import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/auth-context';

const Post = () => {
  const auth = useContext(AuthContext);
  const setSpacing = useOutletContext();
  const params = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    setSpacing(true);
  }, []);

  const getSingleItem = async (id) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/post/${id}`, {
        headers: {
          "Authorization": `Bearer ${auth.token}`
        }
      })
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
