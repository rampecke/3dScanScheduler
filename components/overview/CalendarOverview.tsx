import { eachHourOfInterval, format } from "date-fns";
import { useSession } from "next-auth/react";
import { FunctionComponent, useEffect, useState } from "react";
import { Appointment } from "../../models/appointment";
import { CalendarEvent } from "./CalendarEvent";

type CalendarOverviewProps = {
  className?: string;
  selectedDate: Date;
};

export const CalendarOverview: FunctionComponent<CalendarOverviewProps> = (
  props
) => {
  const [bookedAppointments, setBookedAppointments] = useState<Appointment[]>([]);
  const session = useSession();

  console.log(session)

  useEffect(() => {
    if (props.selectedDate === undefined) return;
    // Load the booked appointments when the selected date changes
    const url = new URLSearchParams();
    url.append("date", props.selectedDate.toISOString());
    const request = fetch("/api/appointments?" + url.toString());

    request.then((res) => res.json()).then((res) => {
      // Update the booked appointments
      setBookedAppointments(res);
    });
  }, [props.selectedDate]);

  const displayHours = eachHourOfInterval({
    start: new Date(
      props.selectedDate.getFullYear(),
      props.selectedDate.getMonth(),
      props.selectedDate.getDate(),
      7
    ),
    end: new Date(
      props.selectedDate.getFullYear(),
      props.selectedDate.getMonth(),
      props.selectedDate.getDate(),
      19
    ),
  });

  const calculateGridRow = (appointment: Appointment) => {
    const start = new Date(appointment.startDate);
    const startHour = start.getHours();
    const startMinute = start.getMinutes();

    const startRow = ((startHour - 7) * 2 + (startMinute / 30)) + 1;

    return `${Math.floor(startRow)} / span 1`;
  };

  return (
    <div className={`${props.className} flex flex-auto flex-col overflow-auto`}>
      <div className="flex w-full flex-auto">
        <div className="w-14 flex-none bg-white ring-1 ring-gray-100" />
        <div className="grid flex-auto grid-cols-1 grid-rows-1">
          <div
            className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
            style={{ gridTemplateRows: "repeat(" + (displayHours.length) + ", minmax(3.5rem, 1fr))" }}
          >
            <div className="row-end-1 h-3"></div>
            {displayHours.map((dayTime) => (
              <div
                key={dayTime.toString()}
                className="sticky left-0 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                {`${format(dayTime, "H")} Uhr`}
              </div>
            ))}
          </div>

          <div
            className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
            style={{ gridTemplateRows: "repeat(" + (displayHours.length * 2) + ", minmax(1.75rem, 1fr)) auto" }}
          >
            <div className="row-end-1 h-3"></div>
            {bookedAppointments.map((appointment) => (
              <CalendarEvent appointment={appointment} key={appointment.startDate.toString()} gridRow={calculateGridRow(appointment)}></CalendarEvent>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
