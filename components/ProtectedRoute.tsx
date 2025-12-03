import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: ('client' | 'artist' | 'admin')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If logged in but wrong role, redirect to their correct dashboard
    if (user.role === 'artist') return <Navigate to="/dashboard/artist" replace />;
    if (user.role === 'client') return <Navigate to="/dashboard/client" replace />;
    if (user.role === 'admin') return <Navigate to="/dashboard/admin" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;