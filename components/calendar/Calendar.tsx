import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
} from "@heroicons/react/20/solid";
import { format, isPast, isSameDay } from "date-fns";
import { CalendarDay } from "./CalendarDay";
import { getDaysInMonth } from "../../utils/calendar";

type CalendarProps = {
  className?: string;
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
};

export const Calendar: FunctionComponent<CalendarProps> = ({
  className,
  selectedDate,
  setSelectedDate,
}: CalendarProps) => {
  const displayedMonth = selectedDate.getMonth();
  const displayedYear = selectedDate.getFullYear();
  const daysOfMonth = getDaysInMonth(displayedMonth, displayedYear);
  const today = new Date();

  const nextMonth = () => {
    const newYear = displayedMonth === 11 ? displayedYear + 1 : displayedYear;
    const newMonth = displayedMonth === 11 ? 0 : displayedMonth + 1;

    const newDate = new Date(
      newYear,
      newMonth,
      newMonth === today.getMonth() ? today.getDate() : 1
    );

    !isSameDay(newDate, today) && isPast(newDate)
      ? {}
      : setSelectedDate(newDate);
  };

  const lastMonth = () => {
    const newYear = displayedMonth === 0 ? displayedYear - 1 : displayedYear;
    const newMonth = displayedMonth === 0 ? 11 : displayedMonth - 1;

    const newDate = new Date(
      newYear,
      newMonth,
      newMonth === today.getMonth() ? today.getDate() : 1
    );

    !isSameDay(newDate, today) && isPast(newDate)
      ? {}
      : setSelectedDate(newDate);
  };

  const mappingMonth = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const mappingWeekdays = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag",
  ];

  return (
    <div className={`${className}`}>
      <div className="flex items-center">
        <h2 className="flex-auto font-semibold text-gray-900">
          {`${mappingMonth.at(displayedMonth)} ${displayedYear}`}
        </h2>

        <button
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-2 pl-1 text-primary-400 hover:text-primary-600"
          onClick={() => setSelectedDate(new Date())}
        >
          <CalendarDaysIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="-my-1.5 flex flex-none items-center justify-center p-2 text-gray-400 hover:text-gray-500"
          onClick={lastMonth}
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-2 text-gray-400 hover:text-gray-500"
          onClick={nextMonth}
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
        {mappingWeekdays.map((day) => (
          <div key={day}>{day.substring(0, 2)}</div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 text-sm">
        {daysOfMonth.map((day, dayIdx) => (
          <div
            key={format(day, "yyyy-MM-dd")}
            className={`${dayIdx > 6 ? "border-t border-gray-200" : ""} py-2`}
          >
            <CalendarDay
              day={day}
              selectedDate={selectedDate}
              today={today}
              onClick={() =>
                !isSameDay(day, today) && isPast(day)
                  ? {}
                  : setSelectedDate(day)
              }
            ></CalendarDay>
          </div>
        ))}
      </div>
    </div>
  );
};
