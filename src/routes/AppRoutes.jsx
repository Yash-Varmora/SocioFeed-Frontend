import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  Activate,
  CreatePost,
  EditPost,
  ForgotPassword,
  Home,
  Login,
  Notifications,
  Profile,
  Register,
  ResetPassword,
  SavedPosts,
  Search,
} from '../pages';
import RestrictedRoute from './RestrictedRoute';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/post/:id/edit" element={<EditPost />} />
        <Route path="/saved-posts" element={<SavedPosts />} />
      </Route>
      <Route element={<RestrictedRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/activate" element={<Activate />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
