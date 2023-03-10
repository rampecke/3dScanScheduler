import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { AvailableAppointment } from "../../models/appointment";
import { Calendar } from "../calendar";
import { ConditionalButton } from "../general/ConditionalButton";
import { SplitScreen } from "../general/SplitScreen";
import { DateSelectSection } from "./DateSelectSection";

type DateSelectProps = {
  className?: string;
  selectedAppointment?: AvailableAppointment;
  setSelectedAppointment: Dispatch<SetStateAction<AvailableAppointment | undefined>>;
  onSelect?: () => void;
};

export const DateSelect: FunctionComponent<DateSelectProps> = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <SplitScreen
        className={props.className}
        left={
          <Calendar
            className="md:pr-14"
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            disablePast={true}
          ></Calendar>
        }
        right={
          <DateSelectSection
            className="mt-12 md:mt-0 md:pl-14"
            selectedDate={selectedDate}
            selectedAppointment={props.selectedAppointment}
            setSelectedAppointment={props.setSelectedAppointment}
            onSelect={props.onSelect}
          ></DateSelectSection>
        }
      ></SplitScreen>
      {props.selectedAppointment && <div className="mx-auto max-w-3xl pb-2 pt-6 ">
        <ConditionalButton
          className="w-full flex-auto rounded-full bg-primary-600 p-2 text-center font-semibold  text-white"
          condition={props.selectedAppointment !== undefined}
          onClick={props.onSelect}
        >
          Termin auswählen
        </ConditionalButton>
      </div>}
      
    </div>
  );
};
