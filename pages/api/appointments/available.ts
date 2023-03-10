// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getBookedAppointments } from ".";
import { Appointment, AvailableAppointment } from "../../../models/appointment";
import { AppointmentError } from "../../../models/error";

export const AVAILABLE_WEEKDAYS = [1, 2, 3, 4, 5];
export const AVAILABLE_HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
export const APPOINTMENT_DURATION = 30;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AvailableAppointment[] | AppointmentError>
) {
  const date = new Date(req.query.date as string);

  // When no date is provided, return an error
  if (isNaN(date.getTime())) {
    res.status(400).json({ error: { message: "Invalid date" } });
    return;
  }

  // Get available appointments for the given date
  const appointments = await getAvailableAppointments(date);

  res.status(200).json(appointments);
}

export const getAvailableAppointments = async (
  date: Date
): Promise<AvailableAppointment[]> => {
  // List all available appointments for a given date using the AVAILABLE_WEEKDAYS and AVAILABLE_HOURS constraints with a duration of APPOINTMENT_DURATION.

  // The date is not an available day of the week
  if (!AVAILABLE_WEEKDAYS.includes(date.getDay())) {
    return [];
  }

  // Get all booked appointments for the given date
  const bookedAppointments: Appointment[] = await getBookedAppointments(date);

  const availableAppointments: AvailableAppointment[] = [];

  for (const hour of AVAILABLE_HOURS) {
    for (let minute = 0; minute < 60; minute += APPOINTMENT_DURATION) {
      const timeStart = new Date(date);
      timeStart.setHours(hour, minute, 0, 0);

      const timeEnd = new Date(date);
      timeEnd.setHours(hour, minute + APPOINTMENT_DURATION, 0, 0);

      // Check if the appointment is already booked
      const isBooked = bookedAppointments.some(
        (appointment) => appointment.startDate === timeStart.toISOString()
      );

      if (!isBooked) {
        availableAppointments.push({
          startDate: timeStart.toISOString(),
          endDate: timeEnd.toISOString(),
        });
      }
    }
  }

  return availableAppointments;
};
