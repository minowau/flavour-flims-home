import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, Plus, ArrowRight, ArrowLeft, Flame, Clock, Leaf, Award } from "lucide-react";
import { useRef, useState } from "react";
import type { Category } from "@/lib/products";

import logoAsset from "@/assets/sastra-logo.png.asset.json";
import sceneChildhood from "@/assets/scene-childhood.jpg";
import sceneSummer from "@/assets/scene-summer.jpg";
import sceneFestival from "@/assets/scene-festival.jpg";
import sceneRain from "@/assets/scene-rain.jpg";
import sceneHostel from "@/assets/scene-hostel.jpg";
import sceneMothers from "@/assets/scene-mothers.jpg";
import { products as catalog, categories } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sastra Flavours — Taste of Summer Memories" },
      {
        name: "description",
        content:
          "Small-batch pickles, laddus and spice podis, hand-stirred by two mothers. The taste of home — bottled with love.",
      },
      { property: "og:title", content: "Sastra Flavours — Taste of Summer Memories" },
      {
        property: "og:description",
        content: "Hand-stirred pickles, laddus and podis from two mothers' kitchens.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const WHATSAPP =
  "https://wa.me/918897892299?text=Hello%20Amma%20%E2%9D%A4%EF%B8%8F%20I%27d%20like%20to%20order";

const EASE = [0.22, 1, 0.36, 1] as const;

/* -------- helpers -------- */

function FadeIn({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: "100%" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, delay, ease: EASE }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}

/* -------- nav -------- */

function Nav() {
  return (
    <nav className="sticky top-0 z-50 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center border-b border-brand-brown/5 bg-brand-cream/85 px-6 py-4 backdrop-blur-md">
      <Link to="/" className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-terracotta p-1 shadow-md ring-1 ring-brand-brown/10">
          <img
            src={logoAsset.url}
            alt="Sastra Flavours"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </Link>
      <span className="font-telugu text-xl font-bold text-brand-terracotta">శాస్త్ర</span>
      <div className="flex items-center justify-end gap-5">
        <Link
          to="/products"
          className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-brand-brown/70 transition hover:text-brand-terracotta sm:block"
        >
          Shop
        </Link>
        <a
          href="#story"
          className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-brand-brown/70 transition hover:text-brand-terracotta sm:block"
        >
          Story
        </a>
        <button aria-label="Open menu" className="text-brand-brown">
          <Menu className="h-6 w-6" strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
}

/* -------- hero -------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="px-6 pt-6 pb-16">
      <FadeIn>
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-terracotta">
          — Purely Homemade · Est. Andhra
        </p>
        <h1 className="font-display text-6xl leading-[0.92] tracking-tight text-brand-brown md:text-8xl">
          <span className="block overflow-hidden">
            <Reveal>Taste of</Reveal>
          </span>
          <span className="block overflow-hidden">
            <Reveal delay={0.1}>
              <span className="italic font-light text-brand-turmeric">Summer</span>
            </Reveal>
          </span>
          <span className="block overflow-hidden">
            <Reveal delay={0.2}>Memories</Reveal>
          </span>
        </h1>
      </FadeIn>

      <FadeIn delay={0.35}>
        <div className="relative mt-10 overflow-hidden rounded-3xl shadow-xl shadow-brand-brown/20">
          <motion.img
            src={sceneSummer}
            alt="A sunlit Indian kitchen with jars of mango pickle"
            className="aspect-[4/5] w-full object-cover"
            loading="eager"
            style={{ y, scale }}
          />
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: EASE }}
            className="absolute bottom-5 right-4 max-w-[220px] rotate-[1deg] rounded-2xl bg-brand-terracotta p-4 shadow-xl md:right-6"
          >
            <p className="font-telugu text-sm leading-relaxed text-brand-cream">
              అమ్మ చేతి వంట, ఆప్యాయతల మూట.
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-brand-cream/70">
              A mother's cooking, a bundle of affection
            </p>
          </motion.div>
        </div>
      </FadeIn>

      <FadeIn delay={0.5}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-brown px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-cream shadow-lg transition hover:bg-brand-terracotta"
          >
            Browse the shelf
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-brand-brown/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-brown transition hover:border-brand-terracotta hover:text-brand-terracotta"
          >
            Order on WhatsApp
          </a>
        </div>
      </FadeIn>
    </section>
  );
}

/* -------- marquee ticker -------- */

function Ticker() {
  const items = [
    "మామిడి ఆవకాయ",
    "Hand-stirred",
    "గోంగూర పచ్చడి",
    "Two mothers",
    "కంది పొడి",
    "Small batch",
    "న్యూట్రి లడ్డు",
    "Andhra, India",
    "కారం పొడి",
    "Family recipes",
  ];
  return (
    <div className="overflow-hidden border-y border-brand-brown/10 bg-brand-terracotta py-4">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="font-display text-lg italic text-brand-cream/90 md:text-xl"
          >
            {t} <span className="mx-6 text-brand-cream/40">✻</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* -------- promise / values -------- */

const promises = [
  { icon: Leaf, title: "Cold-pressed oils", text: "Groundnut & sesame, never refined." },
  { icon: Flame, title: "Wood-fire slow cook", text: "The way Amma's mother did it." },
  { icon: Clock, title: "Small batches", text: "Made weekly, never mass-produced." },
  { icon: Award, title: "Zero preservatives", text: "Only salt, oil, spice and patience." },
];

function Promises() {
  return (
    <section className="px-6 py-16">
      <FadeIn>
        <p className="mb-8 text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-brand-terracotta">
          · The Sastra Promise ·
        </p>
      </FadeIn>
      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {promises.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.08}>
            <div className="group h-full rounded-2xl border border-brand-brown/10 bg-brand-beige/40 p-6 transition hover:-translate-y-1 hover:border-brand-terracotta/40 hover:bg-brand-cream hover:shadow-lg">
              <p.icon
                className="mb-4 h-6 w-6 text-brand-terracotta transition-transform group-hover:scale-110"
                strokeWidth={1.5}
              />
              <h4 className="font-display text-lg text-brand-brown">{p.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-brand-brown/60">{p.text}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* -------- heritage strip (story) -------- */

const heritage = [
  {
    image: sceneChildhood,
    title: "Childhood Rains",
    text: "Hot podi rice on a cold evening — the perfect comfort of home.",
    align: "left" as const,
    ring: "border-brand-turmeric/50",
  },
  {
    image: sceneHostel,
    title: "The Hostel Box",
    text: "When a small jar of avakaya made every mess-hall meal taste like home.",
    align: "right" as const,
    ring: "border-brand-terracotta/50",
  },
  {
    image: sceneFestival,
    title: "Festival Mornings",
    text: "Brass plates, sesame laddus and the smell of ghee before sunrise.",
    align: "left" as const,
    ring: "border-brand-mustard/60",
  },
  {
    image: sceneRain,
    title: "Monsoon Kitchen",
    text: "Rain on the tiles, gongura on the stove — some flavours never leave you.",
    align: "right" as const,
    ring: "border-brand-cream/40",
  },
];

function Heritage() {
  return (
    <section id="story" className="overflow-hidden bg-brand-forest px-6 py-20">
      <FadeIn>
        <p className="mb-10 text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-brand-turmeric">
          · Scenes we cook from ·
        </p>
      </FadeIn>
      <div className="mx-auto flex max-w-md flex-col gap-12">
        {heritage.map((h, i) => (
          <FadeIn key={h.title} delay={i * 0.05}>
            <div
              className={`flex items-center gap-5 ${h.align === "right" ? "flex-row-reverse text-right" : ""}`}
            >
              <div
                className={`h-32 w-24 shrink-0 overflow-hidden rounded-full border-2 ${h.ring}`}
              >
                <img src={h.image} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-xl italic text-brand-cream">{h.title}</h3>
                <p className="mt-1 text-[12px] leading-relaxed text-brand-cream/70">{h.text}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* -------- category chips -------- */

function CategoryChips() {
  return (
    <section className="px-6 pt-16">
      <FadeIn>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-4xl leading-tight text-brand-brown">
            Small Batch
            <br />
            <span className="italic font-light text-brand-terracotta">Flavours</span>
          </h2>
          <Link
            to="/products"
            className="mb-2 hidden shrink-0 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-brown/60 hover:text-brand-terracotta sm:block"
          >
            View all →
          </Link>
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <span
              key={c}
              className="rounded-full border border-brand-brown/20 bg-brand-beige/40 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-brown/70"
            >
              {c}
            </span>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

/* -------- products horizontal scroll -------- */

function ProductsScroll() {
  return (
    <section id="products" className="pt-8 pb-20">
      <div
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {catalog.map((p, i) => (
          <motion.article
            key={p.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: Math.min(i * 0.05, 0.4), ease: EASE }}
            className="group w-[78vw] max-w-[320px] shrink-0 snap-start"
          >
            <Link to="/products/$slug" params={{ slug: p.slug }} className="block">
              <div className="relative overflow-hidden rounded-3xl bg-brand-beige/50">
                <img
                  src={p.image}
                  alt={p.name}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  loading="lazy"
                />
                <div className="absolute left-4 top-4 rounded-full bg-brand-cream/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-brown backdrop-blur">
                  {p.category}
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-brown/70 to-transparent p-4">
                  <p className="text-[10px] italic text-brand-cream/90">"{p.hover}"</p>
                </div>
              </div>
            </Link>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-telugu text-sm text-brand-terracotta">{p.telugu}</p>
                <h4 className="truncate font-display text-xl leading-tight text-brand-brown">
                  {p.name}
                </h4>
                <p className="mt-1 text-xs text-brand-brown/55">
                  {p.net_weight} · ₹{p.price}
                </p>
              </div>
              <a
                href={`${WHATSAPP}%0A${encodeURIComponent(p.name)}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Order ${p.name} on WhatsApp`}
                className="shrink-0 rounded-full bg-brand-terracotta p-3 text-brand-cream shadow-lg transition hover:scale-110 hover:bg-brand-brown"
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </div>
          </motion.article>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex w-[60vw] max-w-[260px] shrink-0 snap-start items-center justify-center"
        >
          <Link
            to="/products"
            className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-brand-brown/30 p-8 text-center transition hover:border-brand-terracotta hover:bg-brand-beige/40"
          >
            <ArrowRight className="h-8 w-8 text-brand-terracotta" strokeWidth={1.5} />
            <span className="font-display text-lg italic text-brand-brown">See full pantry</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-brown/50">
              {catalog.length} recipes
            </span>
          </Link>
        </motion.div>
      </div>
      <FadeIn>
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-brand-brown/40">
          ← Swipe to explore →
        </p>
      </FadeIn>
    </section>
  );
}

/* -------- ritual / how to serve -------- */

function Ritual() {
  const steps = [
    {
      n: "01",
      title: "Order",
      text: "Ping us on WhatsApp with your city and favourite jar.",
    },
    {
      n: "02",
      title: "We stir",
      text: "Amma cooks your batch fresh — usually within 48 hours.",
    },
    {
      n: "03",
      title: "It arrives",
      text: "Sealed in glass, wrapped in a hand-written note.",
    },
    {
      n: "04",
      title: "You remember",
      text: "One spoon, hot rice, ghee — and suddenly you're home.",
    },
  ];
  return (
    <section className="bg-brand-beige/40 px-6 py-20">
      <FadeIn>
        <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-brand-terracotta">
          · How it works ·
        </p>
        <h2 className="mb-12 text-center font-display text-4xl leading-tight text-brand-brown">
          A little <span className="italic font-light text-brand-turmeric">ritual</span>
        </h2>
      </FadeIn>
      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {steps.map((s, i) => (
          <FadeIn key={s.n} delay={i * 0.08}>
            <div className="flex gap-5 rounded-2xl bg-brand-cream p-6 shadow-sm ring-1 ring-brand-brown/5">
              <span className="font-display text-4xl italic text-brand-terracotta/40">{s.n}</span>
              <div className="min-w-0">
                <h4 className="font-display text-xl text-brand-brown">{s.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-brand-brown/60">{s.text}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* -------- the mothers -------- */

function Mothers() {
  return (
    <section className="px-6 py-20">
      <FadeIn>
        <div className="rounded-[40px] border border-brand-turmeric/25 bg-brand-turmeric/10 p-8 md:p-12">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-brand-cream shadow-xl ring-1 ring-brand-brown/10">
              <img
                src={sceneMothers}
                alt="The two mothers of Sastra Flavours cooking together"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-terracotta">
              · The kitchen behind Sastra ·
            </p>
            <h3 className="mb-3 font-display text-3xl leading-tight text-brand-brown md:text-4xl">
              Hand-stirred by
              <br />
              <span className="italic text-brand-terracotta">Radha & Sandhya</span>
            </h3>
            <p className="mb-8 max-w-md text-sm italic leading-relaxed text-brand-brown/70 md:text-base">
              "We don't sell what we wouldn't serve our own grandchildren. Every jar leaves our
              hands tasted, sealed, and blessed."
            </p>
            <div className="mb-8 h-px w-full max-w-xs bg-brand-brown/10" />
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="flex w-full max-w-sm items-center justify-center gap-3 rounded-full bg-brand-forest px-6 py-4 text-xs font-bold uppercase tracking-[0.25em] text-brand-cream shadow-xl transition hover:scale-[1.02] hover:bg-brand-brown"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.539 2.016 2.126-.54c1.029.563 2.025.873 3.162.873h.001c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.769-5.766zm3.426 8.313c-.124.355-.613.662-.848.708-.235.047-.472.088-1.55-.333-1.292-.505-2.112-1.815-2.176-1.9-.064-.085-.522-.693-.522-1.321 0-.628.329-.937.446-1.063.117-.126.255-.157.34-.157s.17.001.244.004c.08.003.187-.03.292.215.127.296.435 1.061.472 1.137.037.076.062.164.011.265-.051.101-.077.164-.153.253-.076.088-.16.196-.228.265-.077.077-.157.16-.068.314.089.153.395.652.848 1.056.583.52 1.074.68 1.226.756.153.076.242.063.331-.038.089-.101.382-.442.484-.592.102-.151.204-.126.344-.076.14.05 1.137.536 1.332.634s.324.146.37.228c.047.081.047.469-.077.824z" />
              </svg>
              Talk to Amma on WhatsApp
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* -------- family quotes -------- */

function FamilyVoices() {
  const quotes = catalog.flatMap((p) => p.quotes).slice(0, 6);
  return (
    <section className="border-y border-brand-brown/10 bg-brand-beige/40 py-16">
      <FadeIn>
        <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-brand-terracotta">
          · Family Voices ·
        </p>
        <h2 className="mb-10 text-center font-display text-3xl italic text-brand-brown md:text-4xl">
          Notes from the table
        </h2>
      </FadeIn>
      <div className="mx-auto grid max-w-5xl gap-5 px-6 md:grid-cols-2">
        {quotes.map((q, i) => (
          <FadeIn key={i} delay={i * 0.05}>
            <figure className="h-full rounded-2xl bg-brand-cream p-6 shadow-sm ring-1 ring-brand-brown/5 transition hover:-translate-y-1 hover:shadow-lg">
              <span className="font-display text-4xl leading-none text-brand-terracotta/40">
                "
              </span>
              <blockquote className="-mt-2 font-display text-lg italic leading-relaxed text-brand-brown">
                {q.quote}
              </blockquote>
              <figcaption className="mt-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-terracotta">
                — {q.by}
              </figcaption>
            </figure>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* -------- newsletter -------- */

function Newsletter() {
  return (
    <section className="px-6 py-20">
      <FadeIn>
        <div className="mx-auto max-w-2xl rounded-3xl bg-brand-brown p-8 text-center text-brand-cream md:p-12">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-brand-turmeric">
            · The Sastra Letter ·
          </p>
          <h3 className="mb-3 font-display text-3xl leading-tight md:text-4xl">
            Recipes, seasons &<br />
            <span className="italic text-brand-turmeric">the next batch</span>
          </h3>
          <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-brand-cream/70">
            Once a month. New jars, quiet stories, and Amma's tip of the season.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="min-w-0 flex-1 rounded-full border border-brand-cream/20 bg-brand-cream/10 px-5 py-3 text-sm text-brand-cream placeholder:text-brand-cream/40 focus:border-brand-turmeric focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-brand-terracotta px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-cream transition hover:bg-brand-turmeric hover:text-brand-brown"
            >
              Subscribe
            </button>
          </form>
        </div>
      </FadeIn>
    </section>
  );
}

/* -------- footer -------- */

function Footer() {
  return (
    <footer className="border-t border-brand-brown/10 bg-brand-cream px-6 py-14">
      <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-terracotta p-1">
              <img
                src={logoAsset.url}
                alt=""
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <span className="font-display text-lg italic text-brand-brown">Sastra Flavours</span>
          </div>
          <p className="font-telugu text-sm text-brand-brown/60">
            ప్రేమతో తయారు చేసినది
          </p>
          <p className="mt-1 text-xs text-brand-brown/50">Made with love in Andhra.</p>
        </div>
        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-terracotta">
            Shop
          </p>
          <ul className="space-y-2 text-sm text-brand-brown/70">
            <li>
              <Link to="/products" className="hover:text-brand-terracotta">
                All flavours
              </Link>
            </li>
            {categories.slice(0, 3).map((c) => (
              <li key={c}>
                <Link to="/products" className="hover:text-brand-terracotta">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-terracotta">
            Say hello
          </p>
          <ul className="space-y-2 text-sm text-brand-brown/70">
            <li>
              <a
                href="https://instagram.com/sastra_flavours"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-terracotta"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-terracotta"
              >
                WhatsApp · +91 88978 92299
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mt-12 text-center text-[10px] uppercase tracking-[0.3em] text-brand-brown/40">
        © {new Date().getFullYear()} Sastra Flavours
      </p>
    </footer>
  );
}

/* -------- page -------- */

function Home() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-brown">
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Promises />
        <Heritage />
        <CategoryChips />
        <ProductsScroll />
        <Ritual />
        <Mothers />
        <FamilyVoices />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
