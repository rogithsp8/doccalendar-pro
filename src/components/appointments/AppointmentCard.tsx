import { Calendar, Clock, User, Stethoscope, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppointmentCardProps {
  appointment: {
    id: string;
    patientName?: string;
    doctorName?: string;
    doctorSpecialization?: string;
    date: string;
    time: string;
    reason: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  };
  userRole: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onCancel?: (id: string) => void;
}

export const AppointmentCard = ({ 
  appointment, 
  userRole, 
  onApprove, 
  onReject, 
  onCancel 
}: AppointmentCardProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="status-badge-pending">Pending</span>;
      case 'APPROVED':
        return <span className="status-badge-approved">Approved</span>;
      case 'REJECTED':
        return <span className="status-badge-rejected">Rejected</span>;
      case 'CANCELLED':
        return <span className="status-badge-rejected">Cancelled</span>;
      default:
        return <span className="status-badge-pending">Unknown</span>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'APPROVED':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'REJECTED':
      case 'CANCELLED':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertCircle className="h-4 w-4 text-warning" />;
    }
  };

  return (
    <div className="appointment-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          {getStatusIcon(appointment.status)}
          {getStatusBadge(appointment.status)}
        </div>
        <div className="text-sm text-muted-foreground">
          #{appointment.id.slice(-6)}
        </div>
      </div>

      <div className="space-y-3">
        {/* Patient/Doctor Info */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-secondary to-wellness flex items-center justify-center">
            {userRole === 'PATIENT' ? (
              <Stethoscope className="h-5 w-5 text-white" />
            ) : (
              <User className="h-5 w-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {userRole === 'PATIENT' ? 
                `Dr. ${appointment.doctorName}` : 
                appointment.patientName
              }
            </h3>
            {userRole === 'PATIENT' && appointment.doctorSpecialization && (
              <p className="text-sm text-muted-foreground">{appointment.doctorSpecialization}</p>
            )}
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{appointment.date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{appointment.time}</span>
          </div>
        </div>

        {/* Reason */}
        <div className="bg-muted p-3 rounded-md">
          <p className="text-sm text-foreground">
            <span className="font-medium">Reason: </span>
            {appointment.reason}
          </p>
        </div>

        {/* Actions */}
        {(userRole === 'DOCTOR' || userRole === 'ADMIN') && appointment.status === 'PENDING' && (
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              className="healthcare-button-secondary flex-1"
              onClick={() => onApprove?.(appointment.id)}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Approve
            </Button>
            <Button 
              size="sm" 
              variant="destructive"
              className="flex-1"
              onClick={() => onReject?.(appointment.id)}
            >
              <XCircle className="h-4 w-4 mr-1" />
              Reject
            </Button>
          </div>
        )}

        {userRole === 'PATIENT' && (appointment.status === 'PENDING' || appointment.status === 'APPROVED') && (
          <Button 
            size="sm" 
            variant="outline" 
            className="w-full"
            onClick={() => onCancel?.(appointment.id)}
          >
            Cancel Appointment
          </Button>
        )}
      </div>
    </div>
  );
};