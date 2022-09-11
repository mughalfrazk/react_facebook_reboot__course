import React from 'react';

const SettingsCard = () => {
  return (
    <div className="card mb-3">
      <div className="m-auto pt-5 pb-3">
        <img
          className="rounded-circle object-fit"
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&amp;w=1000&amp;q=80"
          alt="Post Image"
          width="200px"
          height="200px"
        />
      </div>
      <div className="card-body text-center">
        <h5 className="card-title">Special title treatment</h5>
        <h6 className="card-subtitle text-muted">Support card subtitle</h6>
      </div>
      <div className="card-body">
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Cras justo odio</li>
        <li className="list-group-item">Dapibus ac facilisis in</li>
        <li className="list-group-item">Vestibulum at eros</li>
      </ul>
      <div className="card-body">
        <a href="#" className="card-link">
          Card link
        </a>
        <a href="#" className="card-link">
          Another link
        </a>
      </div>
      <div className="card-footer text-muted">2 days ago</div>
    </div>
  );
};

export default SettingsCard;
