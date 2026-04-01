"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import type { HomepageContent, Testimonial } from "@/lib/queries";

interface ServicePreview {
  _id: string;
  title: string;
  description: string;
}

export default function HomeContent({
  services,
  content,
  testimonials,
}: {
  services: ServicePreview[];
  content: HomepageContent | null;
  testimonials: Testimonial[];
}) {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-sage-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-sage-900 leading-tight">
              {content?.heroTitle || "Veiledning for et"}{" "}
              <span className="text-sage-600">
                {content?.heroHighlight || "bedre liv"}
              </span>
            </h1>
            <p className="mt-6 text-lg text-sage-700 leading-relaxed">
              {content?.heroText ||
                "Jeg heter Wenche og tilbyr profesjonell veiledning med et varmt hjerte. Med bakgrunn som sykepleier, foreleser og veileder hjelper jeg deg å finne veien videre."}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center px-6 py-3 bg-sage-600 text-white rounded-lg font-medium hover:bg-sage-700 transition-colors"
              >
                Bestill time
              </Link>
              <Link
                href="/tjenester"
                className="inline-flex items-center justify-center px-6 py-3 border border-sage-300 text-sage-700 rounded-lg font-medium hover:bg-sage-100 transition-colors"
              >
                Se tjenester
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services preview */}
      <Section>
        <h2 className="text-3xl font-bold text-sage-900 text-center mb-12">
          Mine tjenester
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-sage-100 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-sage-800">
                {service.title}
              </h3>
              <p className="mt-2 text-sage-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/tjenester"
            className="text-sage-600 font-medium hover:text-sage-800 transition-colors underline underline-offset-4"
          >
            Se alle tjenester
          </Link>
        </div>
      </Section>

      {/* About preview */}
      <Section className="bg-sage-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-sage-900 mb-6">
              {content?.aboutTitle || "Om Wenche"}
            </h2>
            <p className="text-sage-700 leading-relaxed mb-4">
              Med mange års erfaring som sykepleier, foreleser og veileder
              brenner jeg for å hjelpe mennesker med å finne sin vei. Min
              tilnærming er helhetlig og bygger på respekt, tillit og
              fagkunnskap.
            </p>
            <p className="text-sage-700 leading-relaxed mb-6">
              Jeg tror på at alle har ressurser i seg til å skape endring. Min
              rolle er å hjelpe deg med å finne og bruke disse ressursene.
            </p>
            <Link
              href="/om"
              className="text-sage-600 font-medium hover:text-sage-800 transition-colors underline underline-offset-4"
            >
              Les mer om meg
            </Link>
          </div>
          <div className="bg-sage-200 rounded-xl aspect-square flex items-center justify-center text-sage-400">
            <span className="text-sm">Bilde av Wenche</span>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <Section>
          <h2 className="text-3xl font-bold text-sage-900 text-center mb-12">
            Hva andre sier
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t._id}
                className="bg-white rounded-xl p-8 shadow-sm border border-sage-100"
              >
                <p className="text-sage-700 leading-relaxed italic mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="text-sm">
                  <span className="font-medium text-sage-800">{t.name}</span>
                  {t.role && (
                    <span className="text-sage-500 ml-2">— {t.role}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section className={testimonials.length > 0 ? "bg-sage-50" : ""}>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-sage-900 mb-4">
            {content?.ctaTitle || "Klar for å ta neste steg?"}
          </h2>
          <p className="text-sage-600 mb-8 leading-relaxed">
            {content?.ctaText ||
              "Ta kontakt for en uforpliktende samtale, eller bestill time direkte."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-6 py-3 bg-sage-600 text-white rounded-lg font-medium hover:bg-sage-700 transition-colors"
            >
              Bestill time
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-6 py-3 border border-sage-300 text-sage-700 rounded-lg font-medium hover:bg-sage-100 transition-colors"
            >
              Kontakt meg
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
