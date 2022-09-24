import React, { useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { AuthContext } from '../context/auth-context';

const UpdatePost = ({ item, setUpdateModal }) => {
  const auth = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updatePostApi = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/post/${item._id}`,
        values
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
    title: item.title,
    description: item.description,
    img: item.img,
    user: auth._id,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    description: Yup.string(),
    img: Yup.string().required('Image is required.'),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      await updatePostApi(values)
      resetForm();
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
            <h2 className="text-center">Update Post</h2>
            {error && <h6 className="text-warning text-center">{error}</h6>}
            <div className="form-group has-success">
              <label className="form-label mt-4" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={props.values.title}
                onChange={props.handleChange}
                className={`form-control ${props.errors.title && 'is-invalid'}`}
                id="title"
              />
              <div className="invalid-feedback text-warning">
                {props.errors.title}
              </div>
            </div>
            <div className="form-group has-success">
              <label className="form-label mt-4" htmlFor="description">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={props.values.description}
                onChange={props.handleChange}
                className={`form-control ${
                  props.errors.description && 'is-invalid'
                }`}
                id="description"
              />
              <div className="invalid-feedback text-warning">
                {props.errors.description}
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

export default UpdatePost;
