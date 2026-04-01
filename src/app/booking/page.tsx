import { getServices, getBookingPage, type Service, type BookingContent } from "@/lib/queries";
import BookingForm from "@/components/BookingForm";

export const revalidate = 30;

const fallbackServices = [
  { _id: "individuell", title: "Individuell veiledning", duration: 60, price: 800 },
  { _id: "helse", title: "Helseveiledning", duration: 60, price: 800 },
  { _id: "gruppe", title: "Gruppeveiledning", duration: 90, price: 500 },
  { _id: "foredrag", title: "Foredrag & kurs", duration: null, price: null },
];

const fallbackContent: BookingContent = {
  title: "Bestill time",
  subtitle: "Velg tjeneste, tidspunkt og fyll inn dine opplysninger.",
  confirmationTitle: "Takk for din bestilling!",
  confirmationText: "Du vil motta en bekreftelse på e-post. Wenche tar kontakt for å bekrefte tidspunktet.",
};

export default async function BookingPage() {
  let services: Pick<Service, "_id" | "title" | "duration" | "price">[];
  let content: BookingContent;

  try {
    const [sanityServices, bookingContent] = await Promise.all([
      getServices(),
      getBookingPage(),
    ]);
    services = sanityServices.length > 0 ? sanityServices : fallbackServices;
    content = bookingContent ?? fallbackContent;
  } catch {
    services = fallbackServices;
    content = fallbackContent;
  }

  const c = { ...fallbackContent, ...Object.fromEntries(Object.entries(content).filter(([, v]) => v != null)) } as BookingContent;

  return <BookingForm services={services} content={c} />;
}
