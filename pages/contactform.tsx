import { ContactFormSplitScreen } from "../components/contactform/ContactFormSplitScreen";
import { useRouter } from "next/router";
import { parse } from "date-fns";
import Head from "next/head";

export default function ContactForm() {
  const router = useRouter();

  const start = parse(
    `${router.query.date}-${router.query.start}`,
    "yyyy-MM-dd-HH-mm",
    new Date()
  );

  const end = parse(
    `${router.query.date}-${router.query.end}`,
    "yyyy-MM-dd-HH-mm",
    new Date()
  );

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
        startDate={start}
        endDate={end}
      ></ContactFormSplitScreen>
    </div>
  );
}
