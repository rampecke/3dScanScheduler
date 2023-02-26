import { ClockIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";
import { FunctionComponent } from "react";

type CheckDateSectionProps = {
  className?: string;
  startDate?: Date;
  endDate?: Date;
};

export const CheckDateSection: FunctionComponent<CheckDateSectionProps> = (
  props
) => {
  return (
    <div className="place-self-center">
      <div className={`${props.className} flex flex-col items-center`}>
        <ClockIcon className="mb-2 h-10 w-10 text-xl text-gray-600" />
        <div className="text-center text-xl text-gray-600">
          <div className="mb-2 text-xl font-medium">Termin</div>
          <div className="text-lg">
            Datum: {format(props.startDate ?? new Date(), "dd.MM.yyyy")}
          </div>
          <div className="text-lg">
            Start: {format(props.startDate ?? new Date(), "HH:mm")} Uhr
          </div>
          <div className="text-lg">
            Ende: {format(props.endDate ?? new Date(), "HH:mm")} Uhr
          </div>
        </div>
      </div>
    </div>
  );
};
