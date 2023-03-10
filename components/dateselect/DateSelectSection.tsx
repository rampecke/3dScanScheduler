import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { format } from "date-fns";
import { DateOption } from "./DateOption";

import { AvailableAppointment } from "../../models/appointment";

type DateSelectSectionProps = {
  className?: string;
  selectedDate: Date;
  selectedAppointment?: AvailableAppointment;
  setSelectedAppointment: Dispatch<SetStateAction<AvailableAppointment | undefined>>;
  onSelect?: () => void;
};

export const DateSelectSection: FunctionComponent<DateSelectSectionProps> = (
  props
) => {
  const [availableAppointments, setAvailableAppointment] = useState<AvailableAppointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Load the available appointments when the selected date changes

    setLoading(true);
    // Fetch the available appointments from the backend for the selected date
    const url = new URLSearchParams();
    url.append("date", props.selectedDate.toISOString());
    const request = fetch("/api/appointments/available?" +  url.toString());

    request.then((res) => res.json()).then((res) => {
      // Update the available appointments
      setAvailableAppointment(res);
    }).finally(() => setLoading(false));
    
   }, [props.selectedDate]);

  return (
    <div className={`${props.className}`}>
      <h2 className="flex items-center font-semibold text-gray-900">
        {`Freie Termine für ${format(props.selectedDate, "dd.MM.yyyy")}`}
      </h2>
      <div className="mt-10">
      
        {loading ? <div className="text-sm text-gray-600">Termine laden...</div> : availableAppointments.length > 0 ? 
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {availableAppointments.map((appointment) => {
          return (
            <DateOption
              key={appointment.startDate.toString()}
              appointment={appointment}
              onClick={() => props.setSelectedAppointment(appointment)}
              selectedAppointment={props.selectedAppointment}
            ></DateOption>
          );
        })}
        </div> : <div className="text-sm text-gray-600">Keine Termine verfügbar</div>}
        </div>
      </div>
  );
};
