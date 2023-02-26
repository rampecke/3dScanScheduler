import { Popover } from "@headlessui/react";
import { FunctionComponent } from "react";
import { ConditionalButton } from "./ConditionalButton";

type PageOverlayProps = {
  children: any;
};

export const PageOverlay: FunctionComponent<PageOverlayProps> = ({
  children,
}) => {
  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="flex items-center justify-between py-6 px-4 shadow-md md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <a href="#">
            <img className="h-8 w-auto sm:h-10" src="mri.ico" alt="" />
          </a>
        </div>
        <button
          className="text-grey-200  rounded-full p-2  text-center font-semibold"
          type="button"
          onClick={() => {}}
        >
          Login
        </button>
        {/* Hier kommt noch ein richtiger Login hin*/}
      </div>
      {children}
    </div>
  );
};
