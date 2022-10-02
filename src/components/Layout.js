import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';

const Layout = () => {
  const [spacing, setSpacing] = useState(true);
  
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <div className="row">
          <div
            className={`${
              spacing ? 'col-md-6 offset-md-3 pt-3' : 'col-md-12'
            }`}
          >
            <Outlet context={setSpacing} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
