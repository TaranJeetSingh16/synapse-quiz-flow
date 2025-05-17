
import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '@/components/admin/AdminDashboard';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Admin = () => {
  const { isAdmin } = useUser();
  const navigate = useNavigate();
  
  // Redirect if not an admin
  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);
  
  if (!isAdmin) {
    return null;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-muted/30">
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
