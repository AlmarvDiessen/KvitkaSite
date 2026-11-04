"use client";

import { useState } from "react";
import { Phone, MapPin, Clock, Menu, X, Star, Sparkles } from "lucide-react";
import {
  SHOP_NAME,
  TAGLINE,
  HERO_EYEBROW,
  HERO_DESCRIPTION,
  PHONE_DISPLAY,
  PHONE_TEL,
  ADDRESS,
  SERVICES,
  GALLERY_ITEMS,
  HOURS,
  REVIEWS,
} from "./content";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#booking", label: "Book Now" },
  { href: "#hours", label: "Hours & Location" },
  { href: "#contact", label: "Contact" },
];

type BookingStatus = "idle" | "submitting" | "success" | "error";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>("idle");
  const [bookingError, setBookingError] = useState<string | null>(null);

  async function handleBookingSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setBookingStatus("submitting");
    setBookingError(null);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          contact: data.get("contact"),
          service: data.get("service"),
          date: data.get("date"),
          time: data.get("time"),
          notes: data.get("notes"),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please call us instead.");
      }

      setBookingStatus("success");
      form.reset();
    } catch (err) {
      setBookingStatus("error");
      setBookingError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-semibold text-lg tracking-tight">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/flower-mark.png" alt="" className="h-7 w-7 shrink-0" />
            {SHOP_NAME}
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-zinc-900 transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={PHONE_TEL}
            className="hidden md:inline-flex items-center gap-2 bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-full shadow-sm shadow-blue-900/15 hover:bg-blue-800 hover:shadow-md hover:shadow-blue-900/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden p-2 -mr-2 rounded-full text-blue-700 hover:bg-blue-50 active:bg-blue-100 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-zinc-200 px-6 py-4 flex flex-col gap-4 text-sm font-medium text-zinc-600">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="hover:text-zinc-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a href={PHONE_TEL} className="flex items-center gap-2 text-zinc-900 font-semibold">
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-painting.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-top opacity-10 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-white pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-36 text-center">
          <p className="text-yellow-600 font-medium tracking-wide uppercase text-sm mb-4">
            {HERO_EYEBROW}
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-900 mb-6">
            {TAGLINE}
          </h1>
          <p className="text-lg text-zinc-500 max-w-xl mx-auto mb-10">
            {HERO_DESCRIPTION}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#booking"
              className="inline-flex items-center gap-2 bg-blue-700 text-white font-medium px-6 py-3 rounded-full shadow-sm shadow-blue-900/15 hover:bg-blue-800 hover:shadow-md hover:shadow-blue-900/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
            >
              Book Now
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 border-2 border-blue-200 bg-white text-blue-700 font-medium px-6 py-3 rounded-full hover:border-blue-700 hover:bg-blue-50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
            >
              View Services
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-100">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight mb-3">Services & Pricing</h2>
          <p className="text-zinc-500">Simple, transparent pricing. No surprises.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.name}
              className="border border-zinc-200 rounded-2xl p-6 hover:border-blue-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-zinc-900">{service.name}</h3>
                <span className="font-semibold text-blue-700 whitespace-nowrap ml-4">
                  {service.price}
                </span>
              </div>
              <p className="text-sm text-zinc-500">{service.duration}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-100">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight mb-3">Gallery</h2>
          <p className="text-zinc-500">A look at the work.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_ITEMS.map((item, i) =>
            item.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={item.alt}
                src={item.src}
                alt={item.alt}
                className="w-full h-full aspect-square rounded-2xl object-cover"
              />
            ) : (
              <div
                key={item.alt}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-3 ${
                  i % 2 === 0 ? "bg-blue-50" : "bg-blue-700"
                }`}
              >
                <Sparkles
                  className={`h-8 w-8 ${i % 2 === 0 ? "text-blue-700" : "text-yellow-400"}`}
                />
                <span
                  className={`text-sm font-medium ${i % 2 === 0 ? "text-blue-700" : "text-blue-100"}`}
                >
                  {item.alt}
                </span>
              </div>
            )
          )}
        </div>
      </section>

      {/* Reviews */}
      {REVIEWS.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-100">
          <div className="flex flex-col md:flex-row gap-8 justify-center text-center md:text-left">
            {REVIEWS.map((review) => (
              <div key={review.quote} className="flex-1 max-w-sm mx-auto md:mx-0">
                <div className="flex gap-1 mb-3 justify-center md:justify-start">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-zinc-600 mb-2">&ldquo;{review.quote}&rdquo;</p>
                <p className="text-sm text-zinc-400">{review.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Booking */}
      <section id="booking" className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-100">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight mb-3">Book an Appointment</h2>
          <p className="text-zinc-500">Pick a service and a time that works for you.</p>
        </div>
        <form onSubmit={handleBookingSubmit} className="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="name"
            required
            placeholder="Your name"
            className="sm:col-span-2 border border-zinc-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600"
          />
          <input
            name="contact"
            required
            placeholder="Phone or email"
            className="sm:col-span-2 border border-zinc-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600"
          />
          <select
            name="service"
            required
            defaultValue=""
            className="sm:col-span-2 border border-zinc-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600"
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICES.map((service) => (
              <option key={service.name} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            required
            className="border border-zinc-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600"
          />
          <input
            type="time"
            name="time"
            required
            className="border border-zinc-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600"
          />
          <textarea
            name="notes"
            placeholder="Anything else we should know? (optional)"
            rows={3}
            className="sm:col-span-2 border border-zinc-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600"
          />

          <button
            type="submit"
            disabled={bookingStatus === "submitting"}
            className="sm:col-span-2 inline-flex items-center justify-center gap-2 bg-blue-700 text-white font-medium px-6 py-3 rounded-full shadow-sm shadow-blue-900/15 hover:bg-blue-800 hover:shadow-md hover:shadow-blue-900/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none"
          >
            {bookingStatus === "submitting" ? "Sending…" : "Request Booking"}
          </button>

          {bookingStatus === "success" && (
            <p className="sm:col-span-2 text-sm text-emerald-600">
              Thanks! We&apos;ve received your request and will confirm shortly.
            </p>
          )}
          {bookingStatus === "error" && (
            <p className="sm:col-span-2 text-sm text-red-600">{bookingError}</p>
          )}
        </form>
      </section>

      {/* Hours & Location */}
      <section id="hours" className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-100">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight mb-6 flex items-center gap-3">
              <Clock className="h-6 w-6 text-blue-700" />
              Opening Hours
            </h2>
            <ul className="divide-y divide-zinc-100">
              {HOURS.map((h) => (
                <li key={h.day} className="flex justify-between py-3 text-sm">
                  <span className="text-zinc-600">{h.day}</span>
                  <span className="font-medium text-zinc-900">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div id="contact">
            <h2 className="text-3xl font-semibold tracking-tight mb-6 flex items-center gap-3">
              <MapPin className="h-6 w-6 text-blue-700" />
              Find Us
            </h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/gallery/storefront.jpg"
              alt="Kvitka Centrum storefront"
              className="rounded-2xl mb-4 w-full aspect-video object-cover"
            />
            <div className="rounded-2xl overflow-hidden border border-zinc-200 mb-4 aspect-video">
              <iframe
                title="Shop location map"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
              />
            </div>
            <p className="text-zinc-600 mb-4">{ADDRESS}</p>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center gap-2 bg-blue-700 text-white font-medium px-6 py-3 rounded-full shadow-sm shadow-blue-900/15 hover:bg-blue-800 hover:shadow-md hover:shadow-blue-900/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
            >
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-2 font-medium text-zinc-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/flower-mark.png" alt="" className="h-6 w-6 shrink-0" />
            {SHOP_NAME}
          </div>
          <p>&copy; {new Date().getFullYear()} {SHOP_NAME}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
