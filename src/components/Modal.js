import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

const Modal = (props) => {
  const modal = (
    <div className="customModal">
      <div className="col-md-6 col-lg-4">
        <div className="modal-content p-0">
          <div className="modal-body p-0">{props.children}</div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById('modal-hook'));
};

export default Modal;
