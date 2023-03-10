import { FunctionComponent } from "react";
import { format, Interval, isEqual } from "date-fns";
import { AvailableAppointment } from "../../models/appointment";

type DateOptionProps = {
  className?: string;
  appointment: AvailableAppointment;
  onClick: () => void;
  selectedAppointment?: AvailableAppointment;
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
    if (isEqual(Date.parse(selectedAppointment?.startDate ?? ""),  Date.parse(appointment.startDate))) {
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
        <span>{`${format(Date.parse(appointment.startDate), "HH:mm")}`}</span>
      </div>
    </button>
  );
};
