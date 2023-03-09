import { eachHourOfInterval, format } from "date-fns";
import { FunctionComponent } from "react";
import { CalendarEvent } from "./CalendarEvent";

type CalendarOverviewProps = {
  className?: string;
  selectedDate: Date;
};

export const CalendarOverview: FunctionComponent<CalendarOverviewProps> = (
  props
) => {
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

  return (
    <div className={`${props.className} flex flex-auto flex-col overflow-auto`}>
      <div className="flex w-full flex-auto">
        <div className="w-14 flex-none bg-white ring-1 ring-gray-100" />
        <div className="grid flex-auto grid-cols-1 grid-rows-1">
          <div
            className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
            style={{ gridTemplateRows: "repeat(13, minmax(6rem, 1fr))" }}
          >
            <div className="row-end-1 h-7"></div>
            {displayHours.map((dayTime) => (
              <div
                key={dayTime.toString()}
                className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                {`${format(dayTime, "H")} Uhr`}
              </div>
            ))}
          </div>

          <div
            className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
            style={{ gridTemplateRows: "repeat(39, minmax(2rem, 1fr)) auto" }}
          >
            <div className="row-end-1 h-7"></div>
            {displayHours.map((dayTime) => (
              <CalendarEvent key={dayTime.toString()}></CalendarEvent>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
