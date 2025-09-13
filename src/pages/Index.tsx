import { useState } from 'react';
import { Auth } from './Auth';
import { PatientDashboard } from './PatientDashboard';
import { DoctorDashboard } from './DoctorDashboard';
import { DoctorSearch } from './DoctorSearch';

type UserRole = 'PATIENT' | 'DOCTOR' | 'ADMIN' | null;

interface User {
  email: string;
  role: UserRole;
  name: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('dashboard');

  const handleLogin = (email: string, password: string, role: string) => {
    // In a real app, this would validate credentials with an API
    const userData: User = {
      email,
      role: role as UserRole,
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
