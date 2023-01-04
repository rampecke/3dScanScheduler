import { FunctionComponent, useState } from "react";
import { Calendar } from "../calendar";
import { DateSelectSection } from "./DateSelectSection";

type DateSelectProps = {
  className?: string;
};

export const DateSelect: FunctionComponent<DateSelectProps> = (
  props: DateSelectProps
) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div className="mx-auto max-w-md px-4 sm:px-7 md:max-w-5xl md:px-6">
      <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
        <div>
          <Calendar
            className="md:pr-14"
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          ></Calendar>
        </div>
        <div>
          <DateSelectSection
            className="mt-12 md:mt-0 md:pl-14"
            selectedDate={selectedDate}
          ></DateSelectSection>
        </div>
      </div>
    </div>
  );
};
