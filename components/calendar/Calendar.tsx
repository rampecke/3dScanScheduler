import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
} from "@heroicons/react/20/solid";
import { format, isPast, isSameDay } from "date-fns";
import { CalendarDay } from "./CalendarDay";
import { getDaysInMonth } from "../../utils/calendar";
import de from "date-fns/locale/de";

type CalendarProps = {
  className?: string;
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  disablePast?: boolean;
};

export const Calendar: FunctionComponent<CalendarProps> = ({
  className,
  selectedDate,
  setSelectedDate,
  disablePast,
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

    if (!disablePast) {
      setSelectedDate(newDate);
    } else {
      !isSameDay(newDate, today) && isPast(newDate)
        ? {}
        : setSelectedDate(newDate);
    }
  };

  const lastMonth = () => {
    const newYear = displayedMonth === 0 ? displayedYear - 1 : displayedYear;
    const newMonth = displayedMonth === 0 ? 11 : displayedMonth - 1;

    const newDate = new Date(
      newYear,
      newMonth,
      newMonth === today.getMonth() ? today.getDate() : 1
    );

    if (!disablePast) {
      setSelectedDate(newDate);
    } else {
      !isSameDay(newDate, today) && isPast(newDate)
        ? {}
        : setSelectedDate(newDate);
    }
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center">
        <h2 className="flex-auto font-semibold text-gray-900">
          {format(selectedDate, "MMMM yyyy", { locale: de })}
        </h2>

        <button
          type="button"
          className="-my-1.5 flex flex-none items-center justify-center p-2 text-gray-400 hover:text-gray-500"
          onClick={lastMonth}
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-2 pl-1 text-primary-400 hover:text-primary-600"
          onClick={() => setSelectedDate(new Date())}
        >
          <CalendarDaysIcon className="h-5 w-5" aria-hidden="true" />
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
        {daysOfMonth.slice(0, 7).map((day) => (
          <div key={day.toString()}>
            {format(day, "EEEEEE", { locale: de })}
          </div>
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
              onClick={() => {
                if (!disablePast) {
                  setSelectedDate(day);
                } else {
                  !!isSameDay(day, today) && isPast(day)
                    ? {}
                    : setSelectedDate(day);
                }
              }}
              disablePast={disablePast}
            ></CalendarDay>
          </div>
        ))}
      </div>
    </div>
  );
};
