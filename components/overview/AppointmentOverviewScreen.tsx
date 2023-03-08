import { FunctionComponent, useState } from "react";
import { HeaderOverview } from "./HeaderOverview";
import { ViewTyp } from "../Enums";
import { CalendarOverview } from "./CalendarOverview";
import { Calendar } from "../calendar";

type AppointmentOverviewScreenProps = {
  className?: string;
};

export const AppointmentOverviewScreen: FunctionComponent<
  AppointmentOverviewScreenProps
> = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedViewTyp, setSelectedAppointment] = useState(ViewTyp.DayView);

  return (
    <div className={`${props.className} flex h-full flex-col`}>
      <HeaderOverview
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedViewTyp={selectedViewTyp}
        setSelectedViewTyp={setSelectedAppointment}
      ></HeaderOverview>
      
      <div className="isolate flex flex-auto overflow-hidden bg-white">
        <CalendarOverview selectedDate={selectedDate}></CalendarOverview>
        <div className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 py-10 px-8 md:block">
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            disablePast={false}
          ></Calendar>
        </div>
      </div>
    </div>
  );
};
