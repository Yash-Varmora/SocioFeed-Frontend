import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RestrictedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const query = new URLSearchParams(window.location.search);
  const redirect = query.get('redirect') || '/';

  if (user) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};

export default RestrictedRoute;
