import React from 'react';
import PostCard from './PostCard';

/**
props: {
  data: []
}
 */

const PostList = (props) => {
  if (!props.data.length)
    return (
      <div className='d-flex align-items-center justify-content-center bg-secondary' style={{ height: '200px' }}>
        <h3>No Posts Found!</h3>
      </div>
    );

  return props.data.map((item) => <PostCard key={item._id} item={item} />);
};

export default PostList;
