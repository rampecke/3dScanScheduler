import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { BookingState } from "../Enums";
import { ConditionalLinkButton } from "../general";
import { ConditionalButton } from "../general/ConditionalButton";
import { SplitScreen } from "../general/SplitScreen";
import { CheckDateSection } from "./CheckDateSection";
import { ContactInputSection } from "./ContactInputSection";

type ContactFormFormSplitScreenProps = {
  className?: string;
  startDate?: Date;
  endDate?: Date;
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  lastName: string;
  setLastName: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
  setBookingState: Dispatch<SetStateAction<BookingState>>;
};

export const ContactFormSplitScreen: FunctionComponent<
  ContactFormFormSplitScreenProps
> = (props) => {
  const bookAppointment = () => {
    
    const appointment = {
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
      phone: props.phone,
      startDate: props.startDate?.toISOString(),
      endDate: props.endDate?.toISOString(),
    }

    fetch("/api/appointments", {method: "POST", body: JSON.stringify({appointment})}).then((res) => res.json()).then((res) => {
      console.log(res);

      props.setBookingState(BookingState.Bestätigung);
    });

  };

  return (
    <div className="max-w-md px-4 sm:px-7 md:max-w-5xl">
      <div className="w-full divide-x md:flex md:divide-gray-200">
        <div className="">
          <CheckDateSection
            className="mt-12 flex-1 px-4 pr-14 md:mt-0 md:pl-14"
            startDate={props.startDate}
            endDate={props.endDate}
          ></CheckDateSection>
        </div>

        <ContactInputSection
          className="flex-1 px-4 pl-14 md:pr-14"
          firstName={props.firstName}
          setFirstName={props.setFirstName}
          lastName={props.lastName}
          setLastName={props.setLastName}
          email={props.email}
          setEmail={props.setEmail}
          phone={props.phone}
          setPhone={props.setPhone}
        ></ContactInputSection>
      </div>

      <SplitScreen
        className={"py-4"}
        showDivider={false}
        left={
          <div className="p-4">
            <ConditionalButton
              className="w-full rounded-full bg-white p-2 text-center font-semibold  text-primary-600 border-2"
              condition={true}
              onClick={() => {
                props.setBookingState(BookingState.Terminauswahl);
              }}
            >
              Zurück
            </ConditionalButton>
          </div>
        }
        right={
          <div className="p-4">
            <ConditionalButton
              className="w-full rounded-full bg-primary-600 p-2 text-center font-semibold  text-white"
              condition={
                props.firstName !== (undefined || "") &&
                props.lastName !== (undefined || "") &&
                props.email !== (undefined || "") &&
                props.phone !== (undefined || "")
              }
              onClick={bookAppointment}
            >
              Termin buchen
            </ConditionalButton>
          </div>
        }
      ></SplitScreen>
    </div>
  );
};
