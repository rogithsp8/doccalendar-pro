import { useState } from 'react';
import { Heart, Menu, User, LogOut, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header = ({ userRole, userName, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="healthcare-card sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold gradient-text-primary">HealthCare+</h1>
            <p className="text-xs text-muted-foreground">Appointment Management</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {userRole === 'PATIENT' && (
            <>
              <a href="/dashboard" className="text-foreground hover:text-primary transition-colors">Dashboard</a>
              <a href="/doctors" className="text-foreground hover:text-primary transition-colors">Find Doctors</a>
              <a href="/appointments" className="text-foreground hover:text-primary transition-colors">My Appointments</a>
            </>
          )}
          {userRole === 'DOCTOR' && (
            <>
              <a href="/doctor-dashboard" className="text-foreground hover:text-primary transition-colors">Dashboard</a>
              <a href="/appointments-manage" className="text-foreground hover:text-primary transition-colors">Manage Appointments</a>
              <a href="/schedule" className="text-foreground hover:text-primary transition-colors">My Schedule</a>
            </>
          )}
          {userRole === 'ADMIN' && (
            <>
              <a href="/admin-dashboard" className="text-foreground hover:text-primary transition-colors">Dashboard</a>
              <a href="/manage-doctors" className="text-foreground hover:text-primary transition-colors">Manage Doctors</a>
              <a href="/system-reports" className="text-foreground hover:text-primary transition-colors">Reports</a>
            </>
          )}
        </nav>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          {userRole && (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-warning rounded-full"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-sm font-medium">{userName || 'User'}</span>
                      <span className="text-xs text-muted-foreground capitalize">{userRole?.toLowerCase()}</span>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-secondary to-wellness flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          
          {!userRole && (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <a href="/login">Login</a>
              </Button>
              <Button className="healthcare-button-primary" asChild>
                <a href="/register">Get Started</a>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-card p-4">
          <nav className="flex flex-col space-y-2">
            {userRole === 'PATIENT' && (
              <>
                <a href="/dashboard" className="px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">Dashboard</a>
                <a href="/doctors" className="px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">Find Doctors</a>
                <a href="/appointments" className="px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">My Appointments</a>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};