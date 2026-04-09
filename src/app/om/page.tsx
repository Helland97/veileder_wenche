import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Section from "@/components/Section";
import { getAboutPage, type AboutContent } from "@/lib/queries";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Om meg",
  description:
    "Lær mer om Wenche — sykepleier, foreleser og veileder med lang erfaring innen helse og personlig utvikling.",
};

const fallback: AboutContent = {
  title: "Om meg",
  subtitle: "Med hjerte for mennesker og faglig tyngde.",
  backgroundTitle: "Min bakgrunn",
  backgroundText:
    "Jeg er utdannet sykepleier og har mange års erfaring fra helsevesenet. Gjennom årene har jeg bygget opp bred kompetanse innen veiledning, kommunikasjon og helsefremming.",
  lecturerTitle: "Som foreleser",
  lecturerText:
    "Jeg har holdt foredrag og kurs for både helsepersonell og allmennheten. Mine foredrag er kjent for å være engasjerende, kunnskapsrike og inspirerende.",
  counselorTitle: "Som veileder",
  counselorText:
    "Min tilnærming til veiledning er helhetlig. Jeg ser hele mennesket og bruker min bakgrunn fra helse, undervisning og veiledning til å skape trygge rom for vekst og endring.",
  values: [
    {
      title: "Respekt",
      text: "Hvert menneske er unikt. Jeg møter deg med respekt for den du er og den du ønsker å bli.",
    },
    {
      title: "Tillit",
      text: "Et trygt rom er grunnlaget for endring. Jeg jobber for å skape tillit i alle mine relasjoner.",
    },
    {
      title: "Fagkunnskap",
      text: "Solid faglig forankring kombinert med praktisk erfaring gir et godt utgangspunkt for veiledning.",
    },
  ],
};

export default async function OmPage() {
  const { isEnabled: preview } = await draftMode();
  let content: AboutContent;

  try {
    const sanityContent = await getAboutPage(preview);
    content = sanityContent ?? fallback;
  } catch {
    content = fallback;
  }

  const c = { ...fallback, ...Object.fromEntries(Object.entries(content).filter(([, v]) => v != null)) } as AboutContent;

  return (
    <>
      <section className="bg-sage-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-sage-900 mb-4">{c.title}</h1>
          <p className="text-lg text-sage-600 max-w-2xl">{c.subtitle}</p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-sage-800 mb-3">
                {c.backgroundTitle}
              </h2>
              <p className="text-sage-700 leading-relaxed">
                {c.backgroundText}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-sage-800 mb-3">
                {c.lecturerTitle}
              </h2>
              <p className="text-sage-700 leading-relaxed">
                {c.lecturerText}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-sage-800 mb-3">
                {c.counselorTitle}
              </h2>
              <p className="text-sage-700 leading-relaxed">
                {c.counselorText}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-sage-200 rounded-xl aspect-[3/4] flex items-center justify-center text-sage-400">
              <span className="text-sm">Bilde av Wenche</span>
            </div>
          </div>
        </div>
      </Section>

      {c.values && c.values.length > 0 && (
        <Section className="bg-sage-50">
          <h2 className="text-2xl font-semibold text-sage-800 mb-6 text-center">
            Mine verdier
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {c.values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-sage-100 text-center"
              >
                <h3 className="text-lg font-semibold text-sage-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-sage-600 text-sm leading-relaxed">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
