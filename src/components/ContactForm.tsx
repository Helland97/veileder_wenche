"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Section from "@/components/Section";
import type { ContactContent } from "@/lib/queries";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm({ content }: { content: ContactContent }) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Feil ved sending");
      setStatus("sent");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <section className="bg-sage-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-sage-900 mb-4">
            {content.title}
          </h1>
          <p className="text-lg text-sage-600 max-w-2xl">{content.subtitle}</p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-sage-700 mb-1"
              >
                Navn *
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-sage-200 bg-white text-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-400"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-sage-700 mb-1"
              >
                E-post *
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-sage-200 bg-white text-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-400"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-sage-700 mb-1"
              >
                Telefon
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-sage-200 bg-white text-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-400"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-sage-700 mb-1"
              >
                Melding *
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-sage-200 bg-white text-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-400 resize-y"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full px-6 py-3 bg-sage-600 text-white rounded-lg font-medium hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sender..." : "Send melding"}
            </button>

            {status === "sent" && (
              <p className="text-green-600 text-sm">
                Takk for meldingen! Jeg svarer så snart jeg kan.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 text-sm">
                Noe gikk galt. Prøv igjen eller send e-post direkte.
              </p>
            )}
          </form>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-sage-800 mb-3">
                Kontaktinformasjon
              </h2>
              <ul className="space-y-3 text-sage-600">
                <li>E-post: {content.email}</li>
                <li>Telefon: {content.phone}</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-sage-800 mb-3">
                Beliggenhet
              </h2>
              <p className="text-sage-600">{content.locationText}</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
