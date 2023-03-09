import { FunctionComponent } from "react";

type CalendarEventProps = {
  className?: string;
};

export const CalendarEvent: FunctionComponent<CalendarEventProps> = (props) => {
  return (
    <li className="relative mt-px flex" style={{ gridRow: " 0 / span 1" }}>
      <a
        href="#"
        className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
      >
        <p className="order-1 font-semibold text-blue-700">Ramona Eckert</p>
        <p className="text-blue-500 group-hover:text-blue-700">
          <time dateTime="2022-01-22T06:00">6:00 AM</time>
        </p>
      </a>
    </li>
  );
};
