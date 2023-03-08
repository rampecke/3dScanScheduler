import { FunctionComponent } from "react";
import { format } from "date-fns";
import { Appointment } from "../../models/appointment";

type CalendarEventProps = {
  className?: string;
  appointment: Appointment;
  gridRow: string;
};

export const CalendarEvent: FunctionComponent<CalendarEventProps> = (props) => {
  const style = {
    gridRow: props.gridRow,
  }

  return (
    <li className="relative mt-px flex" style={style}>
      <a
        className="group absolute inset-1 flex gap-2 overflow-y-auto rounded-lg bg-blue-50 px-2 pt-1 text-xs leading-5 hover:bg-blue-100"
      >
        <p className="order-1 font-semibold text-blue-700">{props.appointment?.firstName + " " + props.appointment?.lastName}</p>
        <p className="text-blue-500 group-hover:text-blue-700">
          <time dateTime={props.appointment.startDate}>{`${format(new Date(props.appointment.startDate), "HH:mm")} Uhr`}</time>
        </p>
      </a>
    </li>
  );
};
