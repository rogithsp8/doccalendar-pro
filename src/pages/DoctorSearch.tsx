import { useState } from 'react';
import { Header } from '@/components/common/Header';
import { DoctorCard } from '@/components/doctors/DoctorCard';
import { Search, Filter, MapPin, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DoctorSearchProps {
  onLogout: () => void;
}

export const DoctorSearch = ({ onLogout }: DoctorSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Mock doctors data
  const doctors = [
    {
      id: 'doc-001',
      name: 'Sarah Johnson',
      specialization: 'Cardiologist',
      clinicName: 'Heart Care Medical Center',
      location: 'Downtown Medical District',
      rating: 4.9,
      experience: '15 years',
      availableToday: true,
      nextAvailable: 'Today 3:00 PM'
    },
    {
      id: 'doc-002',
      name: 'Michael Chen',
      specialization: 'Dermatologist',
      clinicName: 'Skin Health Clinic',
      location: 'Westside Plaza',
      rating: 4.8,
      experience: '12 years',
      availableToday: false,
      nextAvailable: 'Tomorrow 10:00 AM'
    },
    {
      id: 'doc-003',
      name: 'Emily Davis',
      specialization: 'General Practitioner',
      clinicName: 'Family Health Center',
      location: 'Central Avenue',
      rating: 4.7,
      experience: '8 years',
      availableToday: true,
      nextAvailable: 'Today 4:30 PM'
    },
    {
      id: 'doc-004',
      name: 'Robert Wilson',
      specialization: 'Orthopedic Surgeon',
      clinicName: 'Bone & Joint Institute',
      location: 'Medical Park',
      rating: 4.9,
      experience: '20 years',
      availableToday: false,
      nextAvailable: 'Monday 9:00 AM'
    },
    {
      id: 'doc-005',
      name: 'Lisa Thompson',
      specialization: 'Pediatrician',
      clinicName: 'Children\'s Health Clinic',
      location: 'Family Care District',
      rating: 4.8,
      experience: '10 years',
      availableToday: true,
      nextAvailable: 'Today 2:15 PM'
    },
    {
      id: 'doc-006',
      name: 'David Martinez',
      specialization: 'Neurologist',
      clinicName: 'Brain & Spine Center',
      location: 'Specialist Medical Tower',
      rating: 4.7,
      experience: '18 years',
      availableToday: false,
      nextAvailable: 'Wednesday 11:00 AM'
    }
  ];

  const specialties = [
    'Cardiologist',
    'Dermatologist',
    'General Practitioner',
    'Orthopedic Surgeon',
    'Pediatrician',
    'Neurologist',
    'Psychiatrist',
    'Ophthalmologist'
  ];

  const locations = [
    'Downtown Medical District',
    'Westside Plaza',
    'Central Avenue',
    'Medical Park',
    'Family Care District',
    'Specialist Medical Tower'
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doctor.specialization === selectedSpecialty;
    const matchesLocation = !selectedLocation || doctor.location === selectedLocation;
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const handleBookAppointment = (doctorId: string) => {
    console.log('Booking appointment with doctor:', doctorId);
    // In a real app, this would navigate to booking form
  };

  const handleViewProfile = (doctorId: string) => {
    console.log('Viewing doctor profile:', doctorId);
    // In a real app, this would navigate to doctor profile
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="PATIENT" 
        userName="John Doe" 
        onLogout={onLogout}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text-primary mb-2">Find Your Doctor</h1>
          <p className="text-muted-foreground">Search and book appointments with qualified healthcare professionals</p>
        </div>

        {/* Search & Filters */}
        <div className="healthcare-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search doctors or specialties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Specialty Filter */}
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Specialties</SelectItem>
                {specialties.map(specialty => (
                  <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {(selectedSpecialty || selectedLocation) && (
            <div className="flex items-center space-x-2 mt-4">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedSpecialty && (
                <span className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm">
                  {selectedSpecialty}
                  <button 
                    onClick={() => setSelectedSpecialty('')}
                    className="ml-2 hover:text-primary-dark"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedLocation && (
                <span className="px-3 py-1 bg-secondary-light text-secondary rounded-full text-sm">
                  <MapPin className="h-3 w-3 inline mr-1" />
                  {selectedLocation}
                  <button 
                    onClick={() => setSelectedLocation('')}
                    className="ml-2 hover:text-secondary-dark"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            {filteredDoctors.length} Doctor{filteredDoctors.length !== 1 ? 's' : ''} Found
          </h2>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>Sort by relevance</span>
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="grid gap-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBookAppointment={handleBookAppointment}
                onViewProfile={handleViewProfile}
              />
            ))
          ) : (
            <div className="healthcare-card p-12 text-center">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No doctors found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or filters
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialty('');
                  setSelectedLocation('');
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>

        {/* Quick Access */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-foreground mb-4">Popular Specialties</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {specialties.slice(0, 8).map((specialty) => (
              <Button
                key={specialty}
                variant="outline"
                className="justify-start h-auto p-4 hover:border-primary hover:text-primary"
                onClick={() => setSelectedSpecialty(specialty)}
              >
                <div className="text-left">
                  <div className="font-medium">{specialty}</div>
                  <div className="text-xs text-muted-foreground">
                    {doctors.filter(d => d.specialization === specialty).length} doctors
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};