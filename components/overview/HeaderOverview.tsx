import {
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { Dispatch, Fragment, FunctionComponent, SetStateAction } from "react";
import { Menu, Transition } from "@headlessui/react";
import { format, subDays } from "date-fns";
import { de } from "date-fns/locale";
import { ViewTyp } from "../Enums";
import Link from "next/link"

type HeaderOverviewProps = {
  className?: string;
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  selectedViewTyp: ViewTyp;
  setSelectedViewTyp: Dispatch<SetStateAction<ViewTyp>>;
};

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const HeaderOverview: FunctionComponent<HeaderOverviewProps> = ({
  className,
  selectedDate,
  setSelectedDate,
  selectedViewTyp,
  setSelectedViewTyp,
}: HeaderOverviewProps) => {
  //TODO:NeuerTerminButton
  return (
    <header
      className={`${className} flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6`}
    >
      <div>
        <div className="flex-auto font-semibold text-gray-900">
          {format(selectedDate, "MMMM dd,yyyy", { locale: de })}
        </div>
        <div className="mt-1 text-sm text-gray-500">
          {format(selectedDate, "EEEE", { locale: de })}
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center rounded-md shadow-sm md:items-stretch">
          <button
            type="button"
            className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            onClick={() => setSelectedDate(subDays(selectedDate, 1))}
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-primary-400 hover:bg-primary-50 hover:text-primary-600 md:block"
            onClick={() => setSelectedDate(new Date())}
          >
            <CalendarDaysIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
          <button
            type="button"
            className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            onClick={() => setSelectedDate(subDays(selectedDate, -1))}
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden md:ml-4 md:flex md:items-center">
          <Menu as="div" className="relative">
            <Menu.Button
              type="button"
              className="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              {`${selectedViewTyp.toString()}`}
              <ChevronDownIcon
                className="ml-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => setSelectedViewTyp(ViewTyp.DayView)}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        {ViewTyp.DayView.toString()}
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => setSelectedViewTyp(ViewTyp.WeekView)}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        {ViewTyp.WeekView.toString()}
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <div className="ml-6 h-6 w-px bg-gray-300" />
          <Link
            href="/"
            className="ml-6 rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-400"
          >
            Neuer Termin
          </Link>
        </div>
      </div>
    </header>
  );
};
