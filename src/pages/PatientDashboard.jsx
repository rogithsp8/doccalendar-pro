import { useState } from 'react';
import { Header } from '@/components/common/Header';
import { DashboardMetric } from '@/components/dashboard/DashboardMetric';
import { AppointmentCard } from '@/components/appointments/AppointmentCard';
import { Calendar, Clock, CheckCircle, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const PatientDashboard = ({ onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const appointments = [
    {
      id: 'apt-001',
      doctorName: 'Sarah Johnson',
      doctorSpecialization: 'Cardiologist',
      date: '2024-01-15',
      time: '10:00 AM',
      reason: 'Regular checkup and heart monitoring',
      status: 'APPROVED'
    },
    {
      id: 'apt-002',
      doctorName: 'Michael Chen',
      doctorSpecialization: 'Dermatologist',
      date: '2024-01-18',
      time: '2:30 PM',
      reason: 'Skin rash examination',
      status: 'PENDING'
    },
    {
      id: 'apt-003',
      doctorName: 'Emily Davis',
      doctorSpecialization: 'General Practitioner',
      date: '2024-01-12',
      time: '9:00 AM',
      reason: 'Annual physical examination',
      status: 'APPROVED'
    }
  ];

  const upcomingAppointments = appointments.filter(apt => 
    apt.status === 'APPROVED' && new Date(apt.date) >= new Date()
  );

  const pendingAppointments = appointments.filter(apt => apt.status === 'PENDING');

  const handleCancelAppointment = (id) => {
    console.log('Cancelling appointment:', id);
    // In a real app, this would make an API call
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="PATIENT" 
        userName="John Doe" 
        onLogout={onLogout}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="healthcare-card p-6 mb-8 bg-gradient-to-r from-primary-light to-accent-light border-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, John! 👋
              </h1>
              <p className="text-muted-foreground">
                Manage your appointments and track your health journey
              </p>
            </div>
            <Button className="healthcare-button-primary">
              <Plus className="h-4 w-4 mr-2" />
              Book New Appointment
            </Button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardMetric
            title="Total Appointments"
            value={appointments.length}
            icon={Calendar}
            description="All time appointments"
            color="primary"
          />
          <DashboardMetric
            title="Upcoming"
            value={upcomingAppointments.length}
            icon={Clock}
            description="Confirmed appointments"
            color="secondary"
          />
          <DashboardMetric
            title="Completed"
            value={appointments.filter(apt => apt.status === 'APPROVED').length}
            icon={CheckCircle}
            description="Successful visits"
            color="wellness"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upcoming Appointments */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Upcoming Appointments</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    userRole="PATIENT"
                    onCancel={handleCancelAppointment}
                  />
                ))
              ) : (
                <div className="healthcare-card p-8 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No upcoming appointments</h3>
                  <p className="text-muted-foreground mb-4">Book your next appointment to get started</p>
                  <Button className="healthcare-button-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Pending Appointments */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Pending Requests</h2>
              <span className="text-sm text-muted-foreground">
                {pendingAppointments.length} pending
              </span>
            </div>
            
            <div className="space-y-4">
              {pendingAppointments.length > 0 ? (
                pendingAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    userRole="PATIENT"
                    onCancel={handleCancelAppointment}
                  />
                ))
              ) : (
                <div className="healthcare-card p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">No pending appointment requests</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="healthcare-button-primary h-16 text-left justify-start">
              <Search className="h-5 w-5 mr-3" />
              <div>
                <div className="font-semibold">Find Doctors</div>
                <div className="text-sm opacity-80">Search by specialty</div>
              </div>
            </Button>
            
            <Button className="healthcare-button-secondary h-16 text-left justify-start">
              <Calendar className="h-5 w-5 mr-3" />
              <div>
                <div className="font-semibold">Book Appointment</div>
                <div className="text-sm opacity-80">Schedule your visit</div>
              </div>
            </Button>
            
            <Button className="healthcare-button-wellness h-16 text-left justify-start">
              <Clock className="h-5 w-5 mr-3" />
              <div>
                <div className="font-semibold">View History</div>
                <div className="text-sm opacity-80">Past appointments</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};