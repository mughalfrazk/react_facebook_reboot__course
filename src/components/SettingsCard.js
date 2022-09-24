import axios from 'axios';
import React, { Fragment, useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/auth-context';
import Modal from './Modal';
import UpdateSettingsForm from './UpdateSettingsForm';

const SettingsCard = ({ user }) => {
  const auth = useContext(AuthContext);
  const imageRef = useRef();
  const [updateProfileModal, setUpdateProfileModal] = useState(false);

  const onUpdatePicHandler = () => {
    imageRef.current.click();
  };

  const onImageSelectHandler = async (event) => {
    const file = event.target.files[0];

    let bodyFormData = new FormData();
    bodyFormData.append('avatar', file);

    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/user/image/${user._id}`,
        bodyFormData
      );
      console.log(data);
      auth.getData(data)

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="card mb-3">
        <div className="m-auto pt-5 pb-3">
          <img
            className="rounded-circle object-fit"
            src={`http://localhost:5000${user.img}`}
            alt="Profile Image"
            width="200px"
            height="200px"
          />
        </div>
        <div className="card-body text-center">
          <button
            type="button"
            className="btn btn-primary mb-2"
            onClick={onUpdatePicHandler}
          >
            Upload Profile Picture
          </button>

          <input
            ref={imageRef}
            type="file"
            className="d-none"
            onChange={onImageSelectHandler}
            accept=".png,.jpg,.jpeg"
          />
          <h5 className="card-title">{`${user.first_name} ${user.last_name}`}</h5>
          <h6 className="card-subtitle text-muted">{user.username}</h6>
        </div>
        <div className="card-body">
          <p className="card-text">{user.bio}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{user.email}</li>
        </ul>
        <div className="d-flex justify-content-end p-2">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => setUpdateProfileModal(true)}
          >
            Update
          </button>
          <button
            type="button"
            className="btn btn-danger ms-2"
            data-bs-toggle="modal"
            data-bs-target="#deletePost"
          >
            Deactivate
          </button>
        </div>
        <div className="card-footer text-muted">2 days ago</div>
      </div>

      {updateProfileModal && (
        <Modal>
          <UpdateSettingsForm
            item={user}
            setUpdateModal={setUpdateProfileModal}
          />
        </Modal>
      )}
    </Fragment>
  );
};

export default SettingsCard;
