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
    <div className={props.className}>{`${format(
      props.startDate ?? new Date(),
      "dd.MM.yyyy HH:mm"
    )} bis ${format(props.endDate ?? new Date(), "dd.MM.yyyy HH:mm")}`}</div>
  );
};
