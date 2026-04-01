import { getServices, getHomepage, getTestimonials, type Service, type HomepageContent, type Testimonial } from "@/lib/queries";
import HomeContent from "@/components/HomeContent";

export const revalidate = 30;

const fallbackServices = [
  {
    _id: "1",
    title: "Individuell veiledning",
    description:
      "Personlig veiledning tilpasset dine behov. Sammen utforsker vi muligheter og finner veien videre.",
    price: 800,
    duration: 60,
  },
  {
    _id: "2",
    title: "Helseveiledning",
    description:
      "Med bakgrunn som sykepleier tilbyr jeg helhetlig helseveiledning for kropp og sinn.",
    price: 800,
    duration: 60,
  },
  {
    _id: "3",
    title: "Foredrag & kurs",
    description:
      "Inspirerende foredrag og kurs for grupper, bedrifter og organisasjoner.",
    price: null,
    duration: null,
  },
];

export default async function Home() {
  let services: Pick<Service, "_id" | "title" | "description" | "price" | "duration">[];
  let content: HomepageContent | null = null;
  let testimonials: Testimonial[] = [];

  try {
    const [sanityServices, homepageContent, sanityTestimonials] = await Promise.all([
      getServices(),
      getHomepage(),
      getTestimonials(),
    ]);
    services = sanityServices.length > 0 ? sanityServices.slice(0, 3) : fallbackServices;
    content = homepageContent;
    testimonials = sanityTestimonials;
  } catch {
    services = fallbackServices;
  }

  return <HomeContent services={services} content={content} testimonials={testimonials} />;
}
