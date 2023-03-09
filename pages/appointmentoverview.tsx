import { AppointmentOverviewScreen } from "../components/overview/AppointmentOverviewScreen";
import Head from "next/head";
import { PageOverlay } from "../components/general/PageOverlay";

export default function AppointmentOverview() {
  return (
    <PageOverlay>
      <div className="p-7">
        <Head>
          <title>Übersicht</title>
          <link rel="icon" href="/mri.ico" />
        </Head>

        <div className="p-12 text-center text-4xl font-bold text-primary-600">
          Übersicht
        </div>

        <AppointmentOverviewScreen className="p-2"></AppointmentOverviewScreen>
      </div>
    </PageOverlay>
  );
}
