import { client } from "./sanity";

export interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  price: number | null;
  duration: number | null;
  order: number | null;
}

export async function getServices(): Promise<Service[]> {
  return client.fetch(
    `*[_type == "service"] | order(order asc) {
      _id, title, slug, description, price, duration, order
    }`
  );
}

export interface Testimonial {
  _id: string;
  name: string;
  quote: string;
  role: string | null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(
    `*[_type == "testimonial"] {
      _id, name, quote, role
    }`
  );
}

export interface HomepageContent {
  heroTitle: string | null;
  heroHighlight: string | null;
  heroText: string | null;
  aboutTitle: string | null;
  aboutText: unknown[] | null;
  ctaTitle: string | null;
  ctaText: string | null;
}

export async function getHomepage(): Promise<HomepageContent | null> {
  return client.fetch(
    `*[_type == "homepage"][0] {
      heroTitle, heroHighlight, heroText, aboutTitle, aboutText, ctaTitle, ctaText
    }`
  );
}

export interface AboutContent {
  title: string | null;
  subtitle: string | null;
  backgroundTitle: string | null;
  backgroundText: string | null;
  lecturerTitle: string | null;
  lecturerText: string | null;
  counselorTitle: string | null;
  counselorText: string | null;
  values: { title: string; text: string }[] | null;
}

export async function getAboutPage(): Promise<AboutContent | null> {
  return client.fetch(
    `*[_type == "aboutPage"][0] {
      title, subtitle, backgroundTitle, backgroundText,
      lecturerTitle, lecturerText, counselorTitle, counselorText,
      values[] { title, text }
    }`
  );
}

export interface ContactContent {
  title: string | null;
  subtitle: string | null;
  email: string | null;
  phone: string | null;
  locationText: string | null;
}

export async function getContactPage(): Promise<ContactContent | null> {
  return client.fetch(
    `*[_type == "contactPage"][0] {
      title, subtitle, email, phone, locationText
    }`
  );
}

export interface BookingContent {
  title: string | null;
  subtitle: string | null;
  confirmationTitle: string | null;
  confirmationText: string | null;
}

export async function getBookingPage(): Promise<BookingContent | null> {
  return client.fetch(
    `*[_type == "bookingPage"][0] {
      title, subtitle, confirmationTitle, confirmationText
    }`
  );
}
