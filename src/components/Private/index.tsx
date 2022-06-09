import React from 'react';
import { Navigate, useLocation } from 'react-router';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token');
  let location = useLocation();

  if (false) return <Navigate to="/login" state={{ from: location }} />;
  return children;
}
