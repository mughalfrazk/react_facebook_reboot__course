import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/auth-context';

const CreatePost = (props) => {
  const navigate = useNavigate();
  const authData = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const createPostApi = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/post',
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
    title: '',
    description: '',
    img: '',
    user: authData._id,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    description: Yup.string(),
    img: Yup.string().required('Image is required.'),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const data = await createPostApi(values);
      navigate(`/post/${data._id}`);
      resetForm();
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="row align-items-center full-height">
      <div className="col-md-10 offset-md-1">
        <div className="card">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form className="card-body pt-4">
                <h2 className="text-center">Create New Post</h2>
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
                    className={`form-control ${
                      props.errors.title && 'is-invalid'
                    }`}
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
                    className={`form-control ${
                      props.errors.img && 'is-invalid'
                    }`}
                    id="img"
                  />
                  <div className="invalid-feedback text-warning">
                    {props.errors.img}
                  </div>
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button className="btn btn-lg btn-primary" type="submit">
                    {loading ? (
                      <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                      </div>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
