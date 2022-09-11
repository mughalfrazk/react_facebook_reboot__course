import React, { useEffect } from 'react';
import { Form } from 'formik';

const UpdatePost = ({ props, item, error, loading }) => {
  const update = () => {
    props.setFieldValue('title', item.title);
    props.setFieldValue('description', item.description);
    props.setFieldValue('img', item.img);
  };

  useEffect(() => {
    console.log('Render')
    update();
  }, [item]);

  return (
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
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button type="button" className="btn btn-primary">
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
  );
};

export default UpdatePost;
