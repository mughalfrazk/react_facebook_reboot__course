import React, { Fragment, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { AuthContext } from '../context/auth-context';
import UpdatePost from './UpdatePost';
import Modal from './Modal';

const PostCard = ({ item }) => {
  const auth = useContext(AuthContext);
  const [updateModal, setUpdateModal] = useState(false);

  // const [initialValues, setInitialValues] = useState({
  //   title: '',
  //   description: '',
  //   img: '',
  //   user: '',
  // });

  const deletePostHandler = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/post/${item._id}`
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div key={item._id} className="card mb-3">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-1">
              <img
                className="rounded-circle object-fit"
                src={
                  item.user.img
                    ? `http://localhost:5000${item.user.img}`
                    : 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png'
                }
                alt={item.user.name}
                width="40px"
                height="40px"
              />
            </div>
            <div className="col-9">
              <h5 className="card-title">
                {item.user.first_name} {item.user.last_name}
              </h5>
              <h6 className="card-subtitle text-muted">{item.user.username}</h6>
            </div>
          </div>
        </div>
        <img
          className="object-fit"
          src={`http://localhost:5000${item.img}`}
          alt="Post Image"
          width="100%"
          height="400px"
        />
        <div className="card-body">
          <h3 className="card-text">
            <Link className="text-white" to={`/post/${item._id}`}>
              {item.title}
            </Link>
          </h3>
          <p>{item.description}</p>
        </div>
        {(item.user._id === auth._id || auth.role === 'admin') && (
          <div className="d-flex justify-content-end p-2">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => setUpdateModal(true)}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-danger ms-2"
              data-bs-toggle="modal"
              data-bs-target="#deletePost"
            >
              Delete
            </button>
          </div>
        )}
        <div className="card-footer text-muted">2 days ago</div>
      </div>

      {updateModal && (
        <Modal>
          {<UpdatePost item={item} setUpdateModal={setUpdateModal} />}
        </Modal>
      )}

      <div
        className="modal fade"
        id="deletePost"
        tabIndex="-1"
        aria-labelledby="deletePostLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              Are you sure, you want to delete the Post?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deletePostHandler}
                className="btn btn-primary"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PostCard;
