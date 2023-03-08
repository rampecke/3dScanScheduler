export interface AvailableAppointment {
  startDate: string;
  endDate: string;
}

export interface Appointment extends AvailableAppointment {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
