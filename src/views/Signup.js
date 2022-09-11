import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/auth-context';

const Signup = (props) => {
  const navigate = useNavigate();
  const authData = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const SignUpApi = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/user/register',
        values
      );
      setLoading(false);
      return data;
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required.'),
    last_name: Yup.string().required('Last Name is required.'),
    email: Yup.string().email().required('Email is required.'),
    password: Yup.string().min(8).required('Password is required.'),
  });

  const onSubmit = async (values) => {
    const data = await SignUpApi(values);
    if (data) {
      authData.getData(data);
      navigate('/');
    }
  };

  return (
    <div className="container">
      <div className="row align-items-center full-height">
        <div className="col-md-6 offset-md-3 pt-3">
          <div className="card">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(props) => (
                <Form className="card-body pt-4">
                  <h2 className="text-center">Register a new account.</h2>
                  {error && (
                    <h6 className="text-warning text-center">{error}</h6>
                  )}
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
                    <label className="form-label mt-4" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={props.values.email}
                      onChange={props.handleChange}
                      className={`form-control ${
                        props.errors.email && 'is-invalid'
                      }`}
                      id="email"
                    />
                    <div className="invalid-feedback text-warning">
                      {props.errors.email}
                    </div>
                  </div>
                  <div className="form-group has-success">
                    <label className="form-label mt-4" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={props.values.password}
                      onChange={props.handleChange}
                      className={`form-control ${
                        props.errors.password && 'is-invalid'
                      }`}
                      id="password"
                    />
                    <div className="invalid-feedback text-warning">
                      {props.errors.password}
                    </div>
                  </div>
                  <div className="text-end pb-1 pt-3">
                    <Link to="/login">Already have an account, Log in.</Link>
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
    </div>
  );
};

export default Signup;
