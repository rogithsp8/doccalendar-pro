import { MapPin, Clock, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    specialization: string;
    clinicName: string;
    location?: string;
    rating?: number;
    experience?: string;
    availableToday?: boolean;
    nextAvailable?: string;
    image?: string;
  };
  onBookAppointment: (doctorId: string) => void;
  onViewProfile: (doctorId: string) => void;
}

export const DoctorCard = ({ doctor, onBookAppointment, onViewProfile }: DoctorCardProps) => {
  return (
    <div className="doctor-card group">
      <div className="flex items-start space-x-4">
        {/* Doctor Avatar */}
        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform duration-300">
          {doctor.image ? (
            <img 
              src={doctor.image} 
              alt={doctor.name}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)
          )}
        </div>

        {/* Doctor Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                Dr. {doctor.name}
              </h3>
              <p className="text-primary font-medium">{doctor.specialization}</p>
            </div>
            
            {doctor.rating && (
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-current text-wellness" />
                <span className="text-sm font-medium">{doctor.rating}</span>
              </div>
            )}
          </div>

          {/* Clinic & Location */}
          <div className="mt-2 space-y-1">
            <p className="text-sm text-muted-foreground">{doctor.clinicName}</p>
            {doctor.location && (
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{doctor.location}</span>
              </div>
            )}
            {doctor.experience && (
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{doctor.experience} experience</span>
              </div>
            )}
          </div>

          {/* Availability */}
          <div className="mt-3">
            {doctor.availableToday ? (
              <div className="flex items-center space-x-1 text-sm text-success">
                <div className="h-2 w-2 bg-success rounded-full"></div>
                <span>Available Today</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>Next: {doctor.nextAvailable || 'Tomorrow'}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-4 flex space-x-2">
            <Button 
              size="sm" 
              className="healthcare-button-primary flex-1"
              onClick={() => onBookAppointment(doctor.id)}
            >
              Book Appointment
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onViewProfile(doctor.id)}
            >
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};