import { FunctionComponent, useState } from "react";
import { format, isBefore, Interval, add } from "date-fns";
import { DateOption } from "./DateOption";
import Link from "next/link";

type DateSelectSectionProps = {
  className?: string;
  selectedDate: Date;
};

const getAppointments = (selectedDate: Date, steps: number) => {
  let startDate = new Date(selectedDate);
  startDate.setHours(9);
  startDate.setMinutes(0);
  startDate.setSeconds(0);

  const endDate = new Date(selectedDate);
  endDate.setHours(18);
  endDate.setMinutes(0);
  endDate.setSeconds(0);

  var appointments: Interval[] = [];

  while (isBefore(startDate, endDate)) {
    appointments.push({
      start: startDate,
      end: add(startDate, { minutes: steps }),
    });

    startDate = add(startDate, { minutes: steps });
  }

  return appointments;
};

export const DateSelectSection: FunctionComponent<DateSelectSectionProps> = (
  props: DateSelectSectionProps
) => {
  const [selectedAppointment, setSelectedAppointment] = useState<Interval>();

  return (
    <div className={`${props.className}`}>
      <h2 className="flex items-center font-semibold text-gray-900">
        {`Freie Termine für ${format(props.selectedDate, "dd.MM.yyyy")}`}
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-3">
        {getAppointments(props.selectedDate, 15).map((appointment) => {
          return (
            <DateOption
              key={appointment.start.toString()}
              appointment={appointment}
              onClick={() => setSelectedAppointment(appointment)}
            ></DateOption>
          );
        })}
      </div>

      <div className="pb-2 pt-6">
        <Link href="/test">
          <h2 className="0 flex-auto rounded-full bg-primary-600 p-2 text-center font-semibold text-white">
            Termin buchen
          </h2>
        </Link>
      </div>
    </div>
  );
};
