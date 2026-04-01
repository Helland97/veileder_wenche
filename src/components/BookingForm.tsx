"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/Section";
import type { BookingContent } from "@/lib/queries";

interface ServiceOption {
  _id: string;
  title: string;
  duration: number | null;
  price: number | null;
}

interface BookingData {
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

const steps = ["Tjeneste", "Tid", "Dine opplysninger", "Bekreftelse"];

export default function BookingForm({
  services,
  content,
}: {
  services: ServiceOption[];
  content: BookingContent;
}) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [booking, setBooking] = useState<BookingData>({
    service: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const selectedService = services.find((s) => s._id === booking.service);

  function nextStep() {
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...booking,
          service: selectedService?.title || booking.service,
        }),
      });

      if (!res.ok) throw new Error("Feil ved booking");
      setStatus("sent");
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
          <p className="text-lg text-sage-600 max-w-2xl">
            {content.subtitle}
          </p>
        </div>
      </section>

      <Section>
        <div className="max-w-2xl mx-auto">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-12">
            {steps.map((label, i) => (
              <div key={label} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i <= step
                      ? "bg-sage-600 text-white"
                      : "bg-sage-200 text-sage-500"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`ml-2 text-sm hidden sm:inline ${
                    i <= step ? "text-sage-800" : "text-sage-400"
                  }`}
                >
                  {label}
                </span>
                {i < steps.length - 1 && (
                  <div
                    className={`w-8 sm:w-16 h-0.5 mx-2 ${
                      i < step ? "bg-sage-600" : "bg-sage-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <h2 className="text-2xl font-semibold text-sage-800 mb-4">
                {content.confirmationTitle}
              </h2>
              <p className="text-sage-600">
                {content.confirmationText}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* Step 1: Service selection */}
                {step === 0 && (
                  <motion.div
                    key="step-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h2 className="text-xl font-semibold text-sage-800 mb-4">
                      Velg tjeneste
                    </h2>
                    {services.map((service) => (
                      <label
                        key={service._id}
                        className={`block p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          booking.service === service._id
                            ? "border-sage-600 bg-sage-50"
                            : "border-sage-100 hover:border-sage-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={service._id}
                          checked={booking.service === service._id}
                          onChange={(e) =>
                            setBooking({ ...booking, service: e.target.value })
                          }
                          className="sr-only"
                        />
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium text-sage-800">
                              {service.title}
                            </span>
                            {service.duration && (
                              <span className="text-sage-500 text-sm ml-2">
                                ({service.duration} min)
                              </span>
                            )}
                          </div>
                          {service.price && (
                            <span className="text-sage-600 font-medium">
                              {service.price} kr
                            </span>
                          )}
                        </div>
                      </label>
                    ))}
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!booking.service}
                        className="w-full px-6 py-3 bg-sage-600 text-white rounded-lg font-medium hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Neste
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Date & time */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold text-sage-800 mb-4">
                      Velg dato og tid
                    </h2>
                    <div>
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-sage-700 mb-1"
                      >
                        Dato *
                      </label>
                      <input
                        id="date"
                        type="date"
                        required
                        value={booking.date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) =>
                          setBooking({ ...booking, date: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-sage-200 bg-white text-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-400"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="time"
                        className="block text-sm font-medium text-sage-700 mb-1"
                      >
                        Ønsket tid *
                      </label>
                      <select
                        id="time"
                        required
                        value={booking.time}
                        onChange={(e) =>
                          setBooking({ ...booking, time: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-sage-200 bg-white text-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-400"
                      >
                        <option value="">Velg tid</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                      </select>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 px-6 py-3 border border-sage-300 text-sage-700 rounded-lg font-medium hover:bg-sage-100 transition-colors"
                      >
                        Tilbake
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!booking.date || !booking.time}
                        className="flex-1 px-6 py-3 bg-sage-600 text-white rounded-lg font-medium hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Neste
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Personal info */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold text-sage-800 mb-4">
                      Dine opplysninger
                    </h2>
                    <div>
                      <label
                        htmlFor="booking-name"
                        className="block text-sm font-medium text-sage-700 mb-1"
                      >
                        Navn *
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        required
                        value={booking.name}
                        onChange={(e) =>
                          setBooking({ ...booking, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-sage-200 bg-white text-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-400"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="booking-email"
                        className="block text-sm font-medium text-sage-700 mb-1"
                      >
                        E-post *
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        required
                        value={booking.email}
                        onChange={(e) =>
                          setBooking({ ...booking, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-sage-200 bg-white text-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-400"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="block text-sm font-medium text-sage-700 mb-1"
                      >
                        Telefon *
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        required
                        value={booking.phone}
                        onChange={(e) =>
                          setBooking({ ...booking, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-sage-200 bg-white text-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-400"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="booking-message"
                        className="block text-sm font-medium text-sage-700 mb-1"
                      >
                        Kommentar (valgfritt)
                      </label>
                      <textarea
                        id="booking-message"
                        rows={3}
                        value={booking.message}
                        onChange={(e) =>
                          setBooking({ ...booking, message: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-sage-200 bg-white text-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-400 resize-y"
                      />
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 px-6 py-3 border border-sage-300 text-sage-700 rounded-lg font-medium hover:bg-sage-100 transition-colors"
                      >
                        Tilbake
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={
                          !booking.name || !booking.email || !booking.phone
                        }
                        className="flex-1 px-6 py-3 bg-sage-600 text-white rounded-lg font-medium hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Se oppsummering
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Confirmation */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold text-sage-800 mb-4">
                      Oppsummering
                    </h2>
                    <div className="bg-sage-50 rounded-lg p-6 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sage-600">Tjeneste:</span>
                        <span className="font-medium text-sage-800">
                          {selectedService?.title}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sage-600">Dato:</span>
                        <span className="font-medium text-sage-800">
                          {booking.date}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sage-600">Tid:</span>
                        <span className="font-medium text-sage-800">
                          {booking.time}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sage-600">Navn:</span>
                        <span className="font-medium text-sage-800">
                          {booking.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sage-600">E-post:</span>
                        <span className="font-medium text-sage-800">
                          {booking.email}
                        </span>
                      </div>
                      {selectedService && selectedService.price && (
                        <div className="flex justify-between border-t border-sage-200 pt-3 mt-3">
                          <span className="text-sage-600 font-medium">
                            Pris:
                          </span>
                          <span className="font-semibold text-sage-800">
                            {selectedService.price} kr
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 px-6 py-3 border border-sage-300 text-sage-700 rounded-lg font-medium hover:bg-sage-100 transition-colors"
                      >
                        Tilbake
                      </button>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="flex-1 px-6 py-3 bg-sage-600 text-white rounded-lg font-medium hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {status === "sending"
                          ? "Sender..."
                          : "Bekreft bestilling"}
                      </button>
                    </div>

                    {status === "error" && (
                      <p className="text-red-600 text-sm">
                        Noe gikk galt. Prøv igjen eller kontakt oss direkte.
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}
