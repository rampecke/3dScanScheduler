import Head from "next/head";
import { useState } from "react";
import { ContactFormSplitScreen } from "../components/contactform/ContactFormSplitScreen";
import { DateSelect } from "../components/dateselect";
import { BookingState } from "../components/Enums";
import { BookingSideBar } from "../components/general/BookingSideBar";
import { PageOverlay } from "../components/general/PageOverlay";
import { AvailableAppointment } from "../models/appointment";

export default function Home() {
  const [bookingState, setBookingState] = useState<BookingState>(
    BookingState.Terminauswahl
  );
  const [selectedAppointment, setSelectedAppointment] = useState<AvailableAppointment>();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const content = () => {
    switch (bookingState) {
      case BookingState.Terminauswahl:
        return (
          <div className="">
            <Head>
              <title>Terminbuchung</title>
              <link rel="icon" href="/mri.ico" />
            </Head>

            <h1 className="p-12 text-center text-4xl font-bold text-primary-600">
              Terminauswahl
            </h1>

            <DateSelect
              selectedAppointment={selectedAppointment}
              setSelectedAppointment={setSelectedAppointment}
              onSelect={() => setBookingState(BookingState.Informationen)}
            ></DateSelect>
          </div>
        );
      case BookingState.Informationen:
        return (
          <div className="">
            <Head>
              <title>Daten</title>
              <link rel="icon" href="/mri.ico" />
            </Head>

            <div className="p-12 text-center text-4xl font-bold text-primary-600">
              Persönliche Daten
            </div>

            <ContactFormSplitScreen
              startDate={
                selectedAppointment
                  ? new Date(selectedAppointment.startDate)
                  : new Date()
              }
              endDate={
                selectedAppointment
                  ? new Date(selectedAppointment.endDate)
                  : new Date()
              }
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              setBookingState={setBookingState}
            ></ContactFormSplitScreen>
          </div>
        );
      case BookingState.Bestätigung:
        return (
          <div className="">
            <Head>
              <title>Bestätigung</title>
              <link rel="icon" href="/mri.ico" />
            </Head>

            <h1 className="p-12 text-center text-4xl font-bold text-primary-600">
              Vielen Dank für Ihre Buchung!
            </h1>
          </div>
        );
    }
  };

  return (
    <PageOverlay>
      <BookingSideBar
        bookingState={bookingState}
        setBookingState={setBookingState}
      >
        {content()}
      </BookingSideBar>
    </PageOverlay>
  );
}
