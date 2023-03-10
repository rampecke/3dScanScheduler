import { AppointmentOverviewScreen } from "../components/overview/AppointmentOverviewScreen";
import Head from "next/head";
import { PageOverlay } from "../components/general/PageOverlay";
import { useSession } from "next-auth/react";

export default function AppointmentOverview() {
  const session = useSession();

  const handleAuthState = () => {
    if (session.status === "loading") return null;
    else if (session.status === "authenticated") {
      return (
        <AppointmentOverviewScreen className="p-2"></AppointmentOverviewScreen>
      );
    }
  };

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

        {handleAuthState()}
      </div>
    </PageOverlay>
  );
}
