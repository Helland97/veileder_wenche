import type { Metadata } from "next";
import Section from "@/components/Section";
import { getServices, type Service } from "@/lib/queries";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Tjenester",
  description:
    "Utforsk veiledningstjenestene Wenche tilbyr: individuell veiledning, helseveiledning, foredrag og kurs.",
};

const fallbackServices = [
  {
    _id: "1",
    title: "Individuell veiledning",
    description:
      "En-til-en samtaler der vi jobber med det som er viktig for deg. Sammen setter vi mål og lager en plan for veien videre. Veiledningen er tilpasset dine behov og kan handle om alt fra livsendringer til personlig utvikling.",
    duration: 60,
    price: 800,
  },
  {
    _id: "2",
    title: "Helseveiledning",
    description:
      "Med bakgrunn som sykepleier tilbyr jeg helhetlig helseveiledning. Vi ser på sammenhengen mellom kropp, sinn og livssituasjon, og finner strategier som fungerer for deg i hverdagen.",
    duration: 60,
    price: 800,
  },
  {
    _id: "3",
    title: "Gruppeveiledning",
    description:
      "Veiledning i små grupper gir mulighet for å lære av hverandres erfaringer. Trygt og støttende miljø der alle blir sett og hørt.",
    duration: 90,
    price: 500,
  },
  {
    _id: "4",
    title: "Foredrag & kurs",
    description:
      "Inspirerende foredrag og kurs for bedrifter, organisasjoner og grupper. Temaer tilpasses etter behov, og kan inkludere helse, mestring, kommunikasjon og livskvalitet.",
    duration: null,
    price: null,
  },
];

function formatDuration(minutes: number | null) {
  if (!minutes) return "Etter avtale";
  return `${minutes} min`;
}

function formatPrice(price: number | null) {
  if (!price) return "Ta kontakt for pris";
  return `Fra ${price} kr`;
}

export default async function TjenesterPage() {
  let services: Pick<Service, "_id" | "title" | "description" | "duration" | "price">[];

  try {
    const sanityServices = await getServices();
    services = sanityServices.length > 0 ? sanityServices : fallbackServices;
  } catch {
    services = fallbackServices;
  }

  return (
    <>
      <section className="bg-sage-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-sage-900 mb-4">Tjenester</h1>
          <p className="text-lg text-sage-600 max-w-2xl">
            Jeg tilbyr ulike former for veiledning tilpasset dine behov. Alle
            tjenester er basert på fagkunnskap, erfaring og et varmt ønske om å
            hjelpe.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-xl p-8 shadow-sm border border-sage-100"
            >
              <h2 className="text-2xl font-semibold text-sage-800 mb-3">
                {service.title}
              </h2>
              <p className="text-sage-600 leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex items-center gap-6 text-sm text-sage-500">
                <span>Varighet: {formatDuration(service.duration)}</span>
                <span>{formatPrice(service.price)}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
