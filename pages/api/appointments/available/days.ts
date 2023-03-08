// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getBookedAppointments } from "..";
import { AppointmentError } from "../../../../models/error";
import { AVAILABLE_WEEKDAYS } from "../available";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number[] | AppointmentError>
) {
  const month = parseInt(req.query.month as string);
  const year = parseInt(req.query.year as string);

  // When no date is provided, return an error
  if (isNaN(month) || isNaN(year)) {
    res.status(400).json({ error: { message: "Invalid date" } });
    return;
  }

  // Get available appointments for the given date
  const days = await getDaysOfTheMonthWithAvailableAppointments(month, year);

  res.status(200).json(days);
}

const getDaysOfTheMonthWithAvailableAppointments = async (
  month: number,
  year: number
) => {
  // List all days of the month that have available appointments
  // Use the getBookedAppointments method using the start and end of the month as parameters

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const bookedAppointments = await getBookedAppointments(startDate, endDate);

  const daysOfTheMonthWithAvailableAppointments = [];

  for (let day = 1; day <= endDate.getDate(); day++) {
    const date = new Date(year, month - 1, day);

    // The date is not an available day of the week
    if (!AVAILABLE_WEEKDAYS.includes(date.getDay())) {
      continue;
    }

    // Check if the date is already booked
    const isBooked = bookedAppointments.some(
      (appointment) => appointment.startDate === date.toISOString()
    );

    if (!isBooked) {
      daysOfTheMonthWithAvailableAppointments.push(day);
    }
  }

  return daysOfTheMonthWithAvailableAppointments;
};
