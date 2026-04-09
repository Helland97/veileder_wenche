import { client, previewClient } from "./sanity";

function getClient(preview = false) {
  return preview ? previewClient : client;
}

export interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  price: number | null;
  duration: number | null;
  order: number | null;
}

export async function getServices(preview = false): Promise<Service[]> {
  return getClient(preview).fetch(
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

export async function getTestimonials(preview = false): Promise<Testimonial[]> {
  return getClient(preview).fetch(
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

export async function getHomepage(preview = false): Promise<HomepageContent | null> {
  return getClient(preview).fetch(
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

export async function getAboutPage(preview = false): Promise<AboutContent | null> {
  return getClient(preview).fetch(
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

export async function getContactPage(preview = false): Promise<ContactContent | null> {
  return getClient(preview).fetch(
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

export async function getBookingPage(preview = false): Promise<BookingContent | null> {
  return getClient(preview).fetch(
    `*[_type == "bookingPage"][0] {
      title, subtitle, confirmationTitle, confirmationText
    }`
  );
}
