
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useUser();
  const location = useLocation();
  
  // If user is not logged in, redirect to auth page
  if (!user.isLoggedIn) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }
  
  // If user is logged in, render children
  return <>{children}</>;
};

export default ProtectedRoute;
