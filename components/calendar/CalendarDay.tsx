import { FunctionComponent } from "react";
import { isPast, isSameDay } from "date-fns";

type CalendarDayProps = {
  className?: string;
  day: Date;
  selectedDate: Date;
  today: Date;
  onClick: () => void;
};

export const CalendarDay: FunctionComponent<CalendarDayProps> = ({
  className,
  day,
  selectedDate,
  today,
  onClick,
}) => {
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === selectedDate.getMonth() ? true : false;
  };

  const createClassName = () => {
    const className: string[] = [];

    if (isSameDay(day, selectedDate)) {
      className.push("text-white");
      className.push("font-semibold");
      if (isSameDay(day, today)) {
        className.push("bg-primary-600");
      } else {
        className.push("bg-gray-900");
      }
    } else {
      if (isSameDay(day, today)) {
        className.push("text-primary-600");
        className.push("hover:bg-primary-200");
        className.push("font-semibold");
      } else {
        if (!isCurrentMonth(day) || (isPast(day) && !isSameDay(day, today))) {
          className.push("text-gray-400");
        } else {
          className.push("text-gray-900");
          className.push("hover:bg-gray-200");
        }
      }
    }

    className.push(
      "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
    );

    return className.join(" ");
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPast(day) && !isSameDay(day, today)}
      className={`${className} ${createClassName()}`}
    >
      <div>{day.getDate()}</div>
    </button>
  );
};
