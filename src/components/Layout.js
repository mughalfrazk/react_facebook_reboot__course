import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 pt-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
