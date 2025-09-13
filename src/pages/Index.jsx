import { useState } from 'react';
import { Auth } from './Auth';
import { PatientDashboard } from './PatientDashboard';
import { DoctorDashboard } from './DoctorDashboard';
import { DoctorSearch } from './DoctorSearch';

const Index = () => {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (email, password, role) => {
    // In a real app, this would validate credentials with an API
    const userData = {
      email,
      role,
      name: role === 'DOCTOR' ? 'Dr. Sarah Johnson' : 
            role === 'ADMIN' ? 'Admin User' : 'John Doe'
    };
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('dashboard');
  };

  // If not logged in, show auth page
  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  // Route to appropriate dashboard based on role and current page
  if (user.role === 'PATIENT') {
    if (currentPage === 'search') {
      return <DoctorSearch onLogout={handleLogout} />;
    }
    return <PatientDashboard onLogout={handleLogout} />;
  }

  if (user.role === 'DOCTOR') {
    return <DoctorDashboard onLogout={handleLogout} />;
  }

  if (user.role === 'ADMIN') {
    return <DoctorDashboard onLogout={handleLogout} />; // Admin uses similar interface for now
  }

  return <Auth onLogin={handleLogin} />;
};

export default Index;