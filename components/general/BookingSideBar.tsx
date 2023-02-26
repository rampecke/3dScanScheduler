import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { BookingState } from "../Enums";

type BookingSideBarProps = {
  children: any;
  bookingState: BookingState;
  setBookingState: Dispatch<SetStateAction<BookingState>>;
};

export const BookingSideBar: FunctionComponent<BookingSideBarProps> = ({
  children,
  bookingState,
  setBookingState,
}) => {
  const order = [
    BookingState.Terminauswahl,
    BookingState.Informationen,
    BookingState.Bestätigung,
  ];
  return (
    <div className="h-full w-full md:flex">
      <div className=" hidden w-full max-w-[12rem] shadow-lg md:block">
        <div className="p-4">
          {order.map((state) => {
            return (
              <div className="py-2" key={state.toString()}>
                <button
                  className={
                    bookingState === state
                      ? "text-primary-600"
                      : order.lastIndexOf(bookingState) >
                        order.lastIndexOf(state)
                      ? "text-gray-800"
                      : "text-gray-300"
                  }
                  onClick={() => setBookingState(state)}
                  disabled={
                    order.lastIndexOf(bookingState) < order.lastIndexOf(state)
                  }
                >
                  {state}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full overflow-auto">{children}</div>
    </div>
  );
};
