"use client";

import { useState } from "react";
import { Scissors, Phone, MapPin, Clock, Menu, X, Star } from "lucide-react";
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
  { href: "#hours", label: "Hours & Location" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-semibold text-lg tracking-tight">
            <Scissors className="h-5 w-5 text-amber-600" />
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
            className="hidden md:inline-flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-amber-600 transition-colors"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden p-2 -mr-2"
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
      <section className="max-w-6xl mx-auto px-6 py-24 md:py-36 text-center">
        <p className="text-amber-600 font-medium tracking-wide uppercase text-sm mb-4">
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
            href={PHONE_TEL}
            className="inline-flex items-center gap-2 bg-zinc-900 text-white font-medium px-6 py-3 rounded-full hover:bg-amber-600 transition-colors"
          >
            <Phone className="h-4 w-4" />
            Call to Book
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 border border-zinc-300 text-zinc-700 font-medium px-6 py-3 rounded-full hover:border-zinc-900 transition-colors"
          >
            View Services
          </a>
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
              className="border border-zinc-200 rounded-2xl p-6 hover:border-amber-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-zinc-900">{service.name}</h3>
                <span className="font-semibold text-amber-600 whitespace-nowrap ml-4">
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
          {GALLERY_ITEMS.map((label, i) => (
            <div
              key={label}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-3 ${
                i % 2 === 0 ? "bg-zinc-100" : "bg-zinc-900"
              }`}
            >
              <Scissors
                className={`h-8 w-8 ${i % 2 === 0 ? "text-amber-600" : "text-amber-500"}`}
              />
              <span
                className={`text-sm font-medium ${i % 2 === 0 ? "text-zinc-600" : "text-zinc-300"}`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-100">
        <div className="flex flex-col md:flex-row gap-8 justify-center text-center md:text-left">
          {REVIEWS.map((review) => (
            <div key={review.quote} className="flex-1 max-w-sm mx-auto md:mx-0">
              <div className="flex gap-1 mb-3 justify-center md:justify-start">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-zinc-600 mb-2">&ldquo;{review.quote}&rdquo;</p>
              <p className="text-sm text-zinc-400">{review.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hours & Location */}
      <section id="hours" className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-100">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight mb-6 flex items-center gap-3">
              <Clock className="h-6 w-6 text-amber-600" />
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
              <MapPin className="h-6 w-6 text-amber-600" />
              Find Us
            </h2>
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
              className="inline-flex items-center gap-2 bg-zinc-900 text-white font-medium px-6 py-3 rounded-full hover:bg-amber-600 transition-colors"
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
            <Scissors className="h-4 w-4 text-amber-600" />
            {SHOP_NAME}
          </div>
          <p>&copy; {new Date().getFullYear()} {SHOP_NAME}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
