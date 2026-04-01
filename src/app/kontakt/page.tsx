import { getContactPage, type ContactContent } from "@/lib/queries";
import ContactForm from "@/components/ContactForm";

export const revalidate = 30;

export const metadata = {
  title: "Kontakt",
  description: "Ta kontakt med Wenche for en uforpliktende samtale om veiledning.",
};

const fallback: ContactContent = {
  title: "Kontakt",
  subtitle: "Har du spørsmål eller ønsker en uforpliktende samtale? Ta gjerne kontakt.",
  email: "kontakt@wencheveileder.no",
  phone: "+47 XXX XX XXX",
  locationText: "Veiledning tilbys både fysisk og digitalt. Ta kontakt for mer informasjon om møtested.",
};

export default async function KontaktPage() {
  let content: ContactContent;

  try {
    const sanityContent = await getContactPage();
    content = sanityContent ?? fallback;
  } catch {
    content = fallback;
  }

  const c = { ...fallback, ...Object.fromEntries(Object.entries(content).filter(([, v]) => v != null)) } as ContactContent;

  return <ContactForm content={c} />;
}
