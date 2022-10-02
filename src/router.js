import React, { Fragment, useContext, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Login from './views/Login';
import Signup from './views/Signup';
import NewsFeed from './views/NewsFeed';
import Profile from './views/Profile';
import Settings from './views/Settings';
import Post from './views/Post';
import Guard from './components/Guard';
import CreatePost from './views/CreatePost';
import UserList from './views/UserList';
import UserProfile from './views/UserProfile';
import { AuthContext } from './context/auth-context';
import DisabledPosts from './views/DisabledPosts';
import CreateAdmin from './views/CreateAdmin';

const AppRouter = () => {
  const auth = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Guard>
                  <NewsFeed />
                </Guard>
              }
            />
            <Route
              path="profile"
              element={
                <Guard>
                  <Profile />
                </Guard>
              }
            />
            <Route
              path="settings"
              element={
                <Guard>
                  <Settings />
                </Guard>
              }
            />
            <Route
              path="post/:id"
              element={
                <Guard>
                  <Post />
                </Guard>
              }
            />
            <Route
              path="post/create"
              element={
                <Guard>
                  <CreatePost />
                </Guard>
              }
            />
            {auth.role === 'admin' && (
              <Fragment>
                <Route path="users" exact>
                  <Route
                    index
                    exact
                    element={
                      <Guard>
                        <UserList />
                      </Guard>
                    }
                  />
                  <Route
                    path=":id"
                    element={
                      <Guard>
                        <UserProfile />
                      </Guard>
                    }
                  />
                </Route>
                <Route
                  path="disabled-post"
                  element={
                    <Guard>
                      <DisabledPosts />
                    </Guard>
                  }
                />
                <Route
                  path="create-admin"
                  element={
                    <Guard>
                      <CreateAdmin />
                    </Guard>
                  }
                />
              </Fragment>
            )}
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          {/* Redirect Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
