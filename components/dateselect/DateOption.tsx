import { FunctionComponent } from "react";
import { format, Interval } from "date-fns";

type DateOptionProps = {
  className?: string;
  appointment: Interval;
  onClick: () => void;
};

export const DateOption: FunctionComponent<DateOptionProps> = ({
  className,
  appointment,
  onClick,
}: DateOptionProps) => {
  const createClassName = () => {
    return "inline-flex items-center rounded-full border border-transparent bg-gray-200 px-3.5 py-2 text-sm font-medium leading-4 text-gray-900 shadow-sm hover:bg-primary-200 focus:bg-primary-600 focus:text-white";
  };

  return (
    <button
      className={`${className} ${createClassName()}`}
      type="button"
      onClick={onClick}
    >
      <div className="">
        <span>{`${format(appointment.start, "HH.mm")}`}</span>
      </div>
    </button>
  );
};
