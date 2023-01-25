import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { Calendar } from "../calendar";
import { SplitScreen } from "../general/SplitScreen";
import { DateSelectSection } from "./DateSelectSection";

type DateSelectProps = {
  className?: string;
  selectedAppointment?: Interval;
  setSelectedAppointment: Dispatch<SetStateAction<Interval | undefined>>;
  onSelect?: () => void;
};

export const DateSelect: FunctionComponent<DateSelectProps> = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <SplitScreen
      className={props.className}
      left={
        <Calendar
          className="md:pr-14"
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
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
  );
};
