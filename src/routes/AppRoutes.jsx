import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Activate, ForgotPassword, Home, Login, Profile, Register, ResetPassword } from '../pages';
import RestrictedRoute from './RestrictedRoute';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:username" element={<Profile />} />
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
