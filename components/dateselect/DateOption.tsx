import { FunctionComponent } from "react";
import { format, Interval, isEqual } from "date-fns";

type DateOptionProps = {
  className?: string;
  appointment: Interval;
  onClick: () => void;
  selectedAppointment?: Interval;
};

export const DateOption: FunctionComponent<DateOptionProps> = ({
  className,
  appointment,
  onClick,
  selectedAppointment,
}) => {
  const createClassName = () => {
    let name =
      "inline-flex items-center rounded-full border border-transparent px-3.5 py-2 text-sm font-medium leading-4 shadow-sm";
    if (isEqual(selectedAppointment?.start ?? new Date(), appointment.start)) {
      name += " bg-primary-600 text-white";
    } else {
      name += " bg-gray-200 text-gray-900 hover:bg-primary-200";
    }

    return name;
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
