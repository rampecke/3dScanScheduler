import { AppointmentOverviewScreen } from "../components/overview/AppointmentOverviewScreen";
import Head from "next/head";

export default function AppointmentOverview() {
  return (
    <div className="">
      <Head>
        <title>Übersicht</title>
        <link rel="icon" href="/mri.ico" />
      </Head>

      <div className="p-12 text-center text-4xl font-bold text-primary-600">
        Übersicht
      </div>

      <AppointmentOverviewScreen className="p-2"></AppointmentOverviewScreen>
    </div>
  );
}
