import { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Heart, Users, Calendar, Shield } from 'lucide-react';

interface AuthProps {
  onLogin: (email: string, password: string, role: string) => void;
}

export const Auth = ({ onLogin }: AuthProps) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (email: string, password: string, role: string) => {
    // In a real app, this would validate against an API
    onLogin(email, password, role);
  };

  const handleRegister = (name: string, email: string, password: string) => {
    // In a real app, this would create a new user via API
    onLogin(email, password, 'PATIENT');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light to-accent-light">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center min-h-screen">
          {/* Left Side - Branding */}
          <div className="space-y-8">
            {/* Logo & Title */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center floating-animation">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold gradient-text-primary">HealthCare+</h1>
                  <p className="text-muted-foreground">Appointment Management System</p>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Your Health, Our Priority
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Book appointments with trusted healthcare professionals effortlessly. 
                Manage your health journey with our comprehensive platform.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="healthcare-card p-4 hover:scale-105 transition-transform duration-300">
                <Users className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Expert Doctors</h3>
                <p className="text-sm text-muted-foreground">Connect with qualified healthcare professionals</p>
              </div>
              
              <div className="healthcare-card p-4 hover:scale-105 transition-transform duration-300">
                <Calendar className="h-8 w-8 text-secondary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Easy Booking</h3>
                <p className="text-sm text-muted-foreground">Schedule appointments at your convenience</p>
              </div>
              
              <div className="healthcare-card p-4 hover:scale-105 transition-transform duration-300">
                <Shield className="h-8 w-8 text-accent mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Secure Platform</h3>
                <p className="text-sm text-muted-foreground">Your health data is protected and private</p>
              </div>
              
              <div className="healthcare-card p-4 hover:scale-105 transition-transform duration-300">
                <Heart className="h-8 w-8 text-wellness mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Care Focused</h3>
                <p className="text-sm text-muted-foreground">Designed with patient care at the center</p>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="flex justify-center">
            {isLogin ? (
              <LoginForm
                onLogin={handleLogin}
                onSwitchToRegister={() => setIsLogin(false)}
              />
            ) : (
              <RegisterForm
                onRegister={handleRegister}
                onSwitchToLogin={() => setIsLogin(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};