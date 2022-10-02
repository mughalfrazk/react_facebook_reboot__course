import axios from 'axios';
import React, { Fragment, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import Modal from './Modal';
import UpdateSettingsForm from './UpdateSettingsForm';

const SettingsCard = ({ user }) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const imageRef = useRef();
  const [updateProfileModal, setUpdateProfileModal] = useState(false);
  const [deactivateModal, setDeactivateModal] = useState(false);

  const onUpdatePicHandler = () => {
    imageRef.current.click();
  };

  const onImageSelectHandler = async (event) => {
    const file = event.target.files[0];

    let bodyFormData = new FormData();
    bodyFormData.append('avatar', file);

    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}api/user/image/${user._id}`,
        bodyFormData,
        {
          headers: {
            "Authorization": `Bearer ${auth.token}`
          }
        }
      );
      console.log(data);
      auth.getData(data);
    } catch (error) {
      if (error.response.data.status === 401) {
        navigate("/401");
      }
      console.log(error);
    }
  };

  const deactiveUserHandler = async (status) => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}api/user/active/${user._id}?active=${status}`
      );
      console.log(data);
      setDeactivateModal(false);
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
            src={`${process.env.REACT_APP_BACKEND_URL}${user.img}`}
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
          {auth.role === 'admin' && auth._id !== user._id && (
            <button
              type="button"
              className="btn btn-danger ms-2"
              onClick={() => setDeactivateModal(true)}
            >
              {user.active ? 'Deactivate' : 'Activate'}
            </button>
          )}
        </div>
        <div
          className={`card-footer ${user.active ? '' : 'bg-danger'} text-muted`}
        ></div>
      </div>

      {updateProfileModal && (
        <Modal>
          <UpdateSettingsForm
            item={user}
            setUpdateModal={setUpdateProfileModal}
          />
        </Modal>
      )}

      {deactivateModal && (
        <Modal>
          <div className="" id="disablePost" tabIndex="-1">
            <div className="modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  Are you sure, you want to {user.active ? 'disable' : 'enable'}{' '}
                  this Post?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setDeactivateModal(false)}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      deactiveUserHandler(user.active ? 'false' : 'true')
                    }
                    className="btn btn-primary"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Fragment>
  );
};

export default SettingsCard;
