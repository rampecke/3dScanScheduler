import Head from "next/head";
import { DateSelect } from "../components/dateselect";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Terminbuchung</title>
        <link rel="icon" href="/mri.ico" />
      </Head>

      <h1 className="p-12 text-center text-4xl font-bold text-primary-600">
        Terminauswahl
      </h1>

      <DateSelect></DateSelect>
    </div>
  );
}
