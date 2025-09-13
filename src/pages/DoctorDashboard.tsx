import { useState } from 'react';
import { Header } from '@/components/common/Header';
import { DashboardMetric } from '@/components/dashboard/DashboardMetric';
import { AppointmentCard } from '@/components/appointments/AppointmentCard';
import { Calendar, Clock, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DoctorDashboardProps {
  onLogout: () => void;
}

export const DoctorDashboard = ({ onLogout }: DoctorDashboardProps) => {
  // Mock data for doctor
  const appointments = [
    {
      id: 'apt-001',
      patientName: 'John Doe',
      date: '2024-01-15',
      time: '10:00 AM',
      reason: 'Regular checkup and heart monitoring',
      status: 'PENDING' as const
    },
    {
      id: 'apt-002',
      patientName: 'Jane Smith',
      date: '2024-01-15',
      time: '11:30 AM',
      reason: 'Follow-up consultation for chest pain',
      status: 'PENDING' as const
    },
    {
      id: 'apt-003',
      patientName: 'Mike Johnson',
      date: '2024-01-14',
      time: '2:00 PM',
      reason: 'Cardiac stress test results review',
      status: 'APPROVED' as const
    },
    {
      id: 'apt-004',
      patientName: 'Sarah Wilson',
      date: '2024-01-14',
      time: '3:30 PM',
      reason: 'Blood pressure medication adjustment',
      status: 'APPROVED' as const
    },
    {
      id: 'apt-005',
      patientName: 'Robert Brown',
      date: '2024-01-13',
      time: '9:00 AM',
      reason: 'Emergency consultation for chest pain',
      status: 'REJECTED' as const
    }
  ];

  const pendingAppointments = appointments.filter(apt => apt.status === 'PENDING');
  const todayAppointments = appointments.filter(apt => 
    apt.date === '2024-01-15' && apt.status === 'APPROVED'
  );
  const totalPatients = new Set(appointments.map(apt => apt.patientName)).size;

  const handleApproveAppointment = (id: string) => {
    console.log('Approving appointment:', id);
    // In a real app, this would make an API call
  };

  const handleRejectAppointment = (id: string) => {
    console.log('Rejecting appointment:', id);
    // In a real app, this would make an API call
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="DOCTOR" 
        userName="Dr. Sarah Johnson" 
        onLogout={onLogout}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="healthcare-card p-6 mb-8 bg-gradient-to-r from-secondary-light to-wellness-light border-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Good morning, Dr. Johnson! 🩺
              </h1>
              <p className="text-muted-foreground">
                You have {pendingAppointments.length} pending requests and {todayAppointments.length} appointments today
              </p>
            </div>
            <Button className="healthcare-button-secondary">
              <Calendar className="h-4 w-4 mr-2" />
              Manage Schedule
            </Button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <DashboardMetric
            title="Pending Requests"
            value={pendingAppointments.length}
            icon={AlertCircle}
            description="Awaiting your response"
            color="wellness"
          />
          <DashboardMetric
            title="Today's Appointments"
            value={todayAppointments.length}
            icon={Calendar}
            description="Confirmed for today"
            color="primary"
          />
          <DashboardMetric
            title="Total Patients"
            value={totalPatients}
            icon={Users}
            description="Under your care"
            color="secondary"
          />
          <DashboardMetric
            title="This Week"
            value={appointments.filter(apt => apt.status === 'APPROVED').length}
            icon={CheckCircle}
            description="Completed appointments"
            color="accent"
          />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4" />
              <span>Pending Requests ({pendingAppointments.length})</span>
            </TabsTrigger>
            <TabsTrigger value="today" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Today's Schedule ({todayAppointments.length})</span>
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>All Appointments</span>
            </TabsTrigger>
          </TabsList>

          {/* Pending Requests */}
          <TabsContent value="pending" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Pending Appointment Requests</h2>
              <span className="text-sm text-muted-foreground">
                {pendingAppointments.length} requests need your attention
              </span>
            </div>
            
            {pendingAppointments.length > 0 ? (
              <div className="grid gap-4">
                {pendingAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    userRole="DOCTOR"
                    onApprove={handleApproveAppointment}
                    onReject={handleRejectAppointment}
                  />
                ))}
              </div>
            ) : (
              <div className="healthcare-card p-12 text-center">
                <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">All caught up!</h3>
                <p className="text-muted-foreground">No pending appointment requests</p>
              </div>
            )}
          </TabsContent>

          {/* Today's Schedule */}
          <TabsContent value="today" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Today's Schedule</h2>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                View Full Calendar
              </Button>
            </div>
            
            {todayAppointments.length > 0 ? (
              <div className="grid gap-4">
                {todayAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    userRole="DOCTOR"
                  />
                ))}
              </div>
            ) : (
              <div className="healthcare-card p-12 text-center">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No appointments today</h3>
                <p className="text-muted-foreground">Enjoy your free day!</p>
              </div>
            )}
          </TabsContent>

          {/* All Appointments */}
          <TabsContent value="all" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">All Appointments</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Filter</Button>
                <Button variant="outline" size="sm">Export</Button>
              </div>
            </div>
            
            <div className="grid gap-4">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  userRole="DOCTOR"
                  onApprove={appointment.status === 'PENDING' ? handleApproveAppointment : undefined}
                  onReject={appointment.status === 'PENDING' ? handleRejectAppointment : undefined}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="healthcare-button-primary h-16 text-left justify-start">
              <Calendar className="h-5 w-5 mr-3" />
              <div>
                <div className="font-semibold">Update Schedule</div>
                <div className="text-sm opacity-80">Manage availability</div>
              </div>
            </Button>
            
            <Button className="healthcare-button-secondary h-16 text-left justify-start">
              <Users className="h-5 w-5 mr-3" />
              <div>
                <div className="font-semibold">Patient Records</div>
                <div className="text-sm opacity-80">View patient history</div>
              </div>
            </Button>
            
            <Button className="healthcare-button-wellness h-16 text-left justify-start">
              <Clock className="h-5 w-5 mr-3" />
              <div>
                <div className="font-semibold">Time Slots</div>
                <div className="text-sm opacity-80">Configure booking times</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};