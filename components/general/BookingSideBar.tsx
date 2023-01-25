import { Popover } from "@headlessui/react";
import { FunctionComponent } from "react";

type BookingSideBarProps = {
  children: any;
};

export const BookingSideBar: FunctionComponent<BookingSideBarProps> = ({
  children,
}) => {
  return (
    <div className="h-full w-full md:flex">
      <div className=" hidden w-full max-w-[12rem] shadow-lg md:block">
        <div>test</div>
      </div>
      <div className="w-full overflow-auto">{children}</div>
    </div>
  );
};
