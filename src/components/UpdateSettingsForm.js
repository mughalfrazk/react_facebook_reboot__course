import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { AuthContext } from '../context/auth-context';

const UpdateSettingsForm = ({ item, setUpdateModal }) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updateUserApi = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}api/user/${item._id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
      console.log(error);
    }
  };

  const initialValues = {
    first_name: item.first_name,
    last_name: item.last_name,
    bio: item.bio,
    username: item.username,
    img: item.img,
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required.'),
    last_name: Yup.string().required('Last Name is required.'),
    bio: Yup.string(),
    username: Yup.string(),
    img: Yup.string(),
  });

  const onSubmit = async (values, { resetForm }) => {
    console.log(values);
    try {
      const user = await updateUserApi(values);
      resetForm();
      if (item._id === auth._id) {
        auth.getData(user.data);
      } else {
        navigate('/users');
      }

      setUpdateModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(props) => (
        <Form className="card-body p-0 pt-4">
          <div className="p-4">
            <h2 className="text-center">Update User Settings</h2>
            {error && <h6 className="text-warning text-center">{error}</h6>}
            <div className="form-group has-success">
              <label className="form-label mt-4" htmlFor="first_name">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={props.values.first_name}
                onChange={props.handleChange}
                className={`form-control ${
                  props.errors.first_name && 'is-invalid'
                }`}
                id="first_name"
              />
              <div className="invalid-feedback text-warning">
                {props.errors.first_name}
              </div>
            </div>
            <div className="form-group has-success">
              <label className="form-label mt-4" htmlFor="last_name">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={props.values.last_name}
                onChange={props.handleChange}
                className={`form-control ${
                  props.errors.last_name && 'is-invalid'
                }`}
                id="last_name"
              />
              <div className="invalid-feedback text-warning">
                {props.errors.last_name}
              </div>
            </div>
            <div className="form-group has-success">
              <label className="form-label mt-4" htmlFor="bio">
                Bio
              </label>
              <input
                type="text"
                name="bio"
                value={props.values.bio}
                onChange={props.handleChange}
                className={`form-control ${props.errors.bio && 'is-invalid'}`}
                id="bio"
              />
              <div className="invalid-feedback text-warning">
                {props.errors.bio}
              </div>
            </div>
            <div className="form-group has-success">
              <label className="form-label mt-4" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={props.values.username}
                onChange={props.handleChange}
                className={`form-control ${
                  props.errors.username && 'is-invalid'
                }`}
                id="username"
              />
              <div className="invalid-feedback text-warning">
                {props.errors.username}
              </div>
            </div>
            <div className="form-group has-success">
              <label className="form-label mt-4" htmlFor="img">
                Image
              </label>
              <input
                type="text"
                name="img"
                value={props.values.img}
                onChange={props.handleChange}
                className={`form-control ${props.errors.img && 'is-invalid'}`}
                id="img"
              />
              <div className="invalid-feedback text-warning">
                {props.errors.img}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setUpdateModal(false)}
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              {loading ? (
                <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateSettingsForm;
