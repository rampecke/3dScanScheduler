// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import clientPromise from "../../../libs/mongodb";
import { Appointment } from "../../../models/appointment";
import { AppointmentError } from "../../../models/error";
import { authOptions } from "../auth/[...nextauth]";
import { getAvailableAppointments } from "./available";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Appointment | Appointment[] | AppointmentError>
) {
  if (req.method === "POST") {
    // Handle a POST request to create a new appointment
    const body = JSON.parse(req.body) as {
      appointment: Omit<Appointment, "id">;
    };
    const { startDate, endDate, firstName, lastName, email, phone } =
      body?.appointment;

    // When no date is provided, return an error
    if (!(startDate && endDate)) {
      res.status(400).json({ error: { message: "Invalid date" } });
      return;
    }

    // Get available appointments for the given date
    const appointments = await getAvailableAppointments(new Date(startDate));

    // Check if the appointment is already booked
    const isAvailable = appointments.some(
      (appointment) => appointment.startDate === startDate
    );

    if (!isAvailable) {
      res
        .status(400)
        .json({ error: { message: "Appointment already booked" } });
      return;
    }

    // Create a new appointment
    const newAppointment: Omit<Appointment, "id"> = {
      startDate,
      endDate,
      firstName,
      lastName,
      email,
      phone,
    };

    // Save the new appointment
    const savedAppointment = await saveAppointment(newAppointment);

    res.status(200).json(savedAppointment);
  } else if (req.method === "GET") {
    // Get the auth session
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      // When not authenticated, return an error
      res.status(401).json({ error: { message: "Not authenticated" } });
      return;
    }

    // Get booked appointments for the given date when logged in
    const date = new Date(req.query.date as string);

    // When no date is provided, return an error
    if (isNaN(date.getTime())) {
      res.status(400).json({ error: { message: "Invalid date" } });
      return;
    }

    // Get booked appointments for the given date
    const appointments = await getBookedAppointments(date);

    res.status(200).json(appointments);
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const saveAppointment = async (
  appointment: Omit<Appointment, "id">
): Promise<Appointment> => {
  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection("appointments").insertOne(appointment);

  return {
    id: result.insertedId.toString(),
    ...appointment,
  };
};

export const getBookedAppointments = async (
  startDate: Date,
  endDate?: Date
) => {
  const client = await clientPromise;
  const db = client.db();

  endDate = endDate || startDate;

  // Query all
  const query = {
    startDate: {
      $gte: new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        0,
        0,
        0
      ).toISOString(),
      $lte: new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate() + 1,
        0,
        0,
        0
      ).toISOString(),
    },
  };

  // Get booked appointments within the given date range
  const bookedAppointments = await db
    .collection("appointments")
    .find(query)
    .toArray();

  return bookedAppointments.map((appointmentObj) => ({
    id: appointmentObj._id.toString(),
    firstName: appointmentObj.firstName,
    lastName: appointmentObj.lastName,
    email: appointmentObj.email,
    phone: appointmentObj.phone,
    startDate: appointmentObj.startDate,
    endDate: appointmentObj.endDate,
  }));
};
