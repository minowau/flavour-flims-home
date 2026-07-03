import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Menu, Plus } from "lucide-react";

import logoAsset from "@/assets/sastra-logo.png.asset.json";
import sceneChildhood from "@/assets/scene-childhood.jpg";
import sceneSummer from "@/assets/scene-summer.jpg";
import sceneFestival from "@/assets/scene-festival.jpg";
import sceneRain from "@/assets/scene-rain.jpg";
import sceneHostel from "@/assets/scene-hostel.jpg";
import sceneMothers from "@/assets/scene-mothers.jpg";
import { products as catalog } from "@/lib/products";

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

/* -------- helpers -------- */

function FadeIn({
  children,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* -------- nav -------- */

function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-brand-brown/5 bg-brand-cream/85 px-6 py-4 backdrop-blur-md">
      <Link to="/" className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-terracotta p-1 shadow-md ring-1 ring-brand-brown/10">
          <img
            src={logoAsset.url}
            alt="Sastra Flavours"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </Link>
      <span className="font-telugu text-xl font-bold text-brand-terracotta">శాస్త్ర</span>
      <div className="flex items-center gap-4">
        <Link
          to="/products"
          className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-brand-brown/70 hover:text-brand-terracotta sm:block"
        >
          Shop
        </Link>
        <button aria-label="Open menu" className="text-brand-brown">
          <Menu className="h-6 w-6" strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
}

/* -------- hero -------- */

function Hero() {
  return (
    <section className="px-6 pt-6 pb-16">
      <FadeIn>
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-terracotta">
          — Purely Homemade
        </p>
        <h1 className="font-display text-6xl leading-[0.92] tracking-tight text-brand-brown md:text-7xl">
          Taste of
          <br />
          <span className="italic font-light text-brand-turmeric">Summer</span>
          <br />
          Memories
        </h1>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="relative mt-10">
          <img
            src={sceneSummer}
            alt="A sunlit Indian kitchen with jars of mango pickle"
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-xl shadow-brand-brown/20"
            loading="eager"
          />
          <div className="absolute -bottom-5 right-2 max-w-[220px] rotate-[1deg] rounded-2xl bg-brand-terracotta p-4 shadow-xl md:right-6">
            <p className="font-telugu text-sm leading-relaxed text-brand-cream">
              అమ్మ చేతి వంట, ఆప్యాయతల మూట.
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-brand-cream/70">
              A mother's cooking, a bundle of affection
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="mt-14 flex flex-wrap items-center gap-3">
          <Link
            to="/products"
            className="rounded-full bg-brand-brown px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-cream shadow-lg transition hover:bg-brand-terracotta"
          >
            Browse the shelf
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

/* -------- heritage strip -------- */

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
    <section className="overflow-hidden bg-brand-forest px-6 py-20">
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
              <div>
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

/* -------- products -------- */

function Products() {
  const featured = catalog.slice(0, 4);
  return (
    <section id="products" className="px-6 py-20">
      <FadeIn>
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-4xl leading-tight text-brand-brown">
            Small Batch
            <br />
            <span className="italic font-light text-brand-terracotta">Flavours</span>
          </h2>
          <div className="mb-3 h-px flex-grow mx-4 bg-brand-brown/15" />
        </div>
      </FadeIn>

      <div className="flex flex-col gap-14">
        {featured.map((p, i) => (
          <FadeIn key={p.slug} delay={i * 0.05}>
            <article className="group">
              <Link to="/products/$slug" params={{ slug: p.slug }} className="block">
                <div className="overflow-hidden rounded-3xl bg-brand-beige/50">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
              </Link>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-telugu text-sm text-brand-terracotta">{p.telugu}</p>
                  <h4 className="font-display text-2xl leading-tight text-brand-brown">
                    {p.name}
                  </h4>
                  <p className="mt-1 text-xs text-brand-brown/55">
                    {p.tag} · ₹{p.price}
                  </p>
                </div>
                <a
                  href={`${WHATSAPP}%0A${encodeURIComponent(p.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Order ${p.name} on WhatsApp`}
                  className="shrink-0 rounded-full bg-brand-terracotta p-3 text-brand-cream shadow-lg transition hover:bg-brand-brown"
                >
                  <Plus className="h-5 w-5" strokeWidth={2} />
                </a>
              </div>
              <p className="mt-3 max-w-md text-sm italic leading-relaxed text-brand-brown/70">
                "{p.tagline}"
              </p>
            </article>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.1}>
        <div className="mt-14 text-center">
          <Link
            to="/products"
            className="inline-block rounded-full border border-brand-brown/30 px-8 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-brown transition hover:border-brand-terracotta hover:text-brand-terracotta"
          >
            See the full pantry
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}

/* -------- the mothers -------- */

function Mothers() {
  return (
    <section className="px-6 pb-20">
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
            <h3 className="mb-3 font-display text-3xl leading-tight text-brand-brown">
              Hand-stirred by
              <br />
              <span className="italic text-brand-terracotta">Radha & Sandhya</span>
            </h3>
            <p className="mb-8 max-w-sm text-sm italic leading-relaxed text-brand-brown/70">
              "We don't sell what we wouldn't serve our own grandchildren."
            </p>
            <div className="mb-8 h-px w-full bg-brand-brown/10" />
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-3 rounded-full bg-brand-forest px-6 py-4 text-xs font-bold uppercase tracking-[0.25em] text-brand-cream shadow-xl transition hover:scale-[1.02]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.539 2.016 2.126-.54c1.029.563 2.025.873 3.162.873h.001c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.769-5.766zm3.426 8.313c-.124.355-.613.662-.848.708-.235.047-.472.088-1.55-.333-1.292-.505-2.112-1.815-2.176-1.9-.064-.085-.522-.693-.522-1.321 0-.628.329-.937.446-1.063.117-.126.255-.157.34-.157s.17.001.244.004c.08.003.187-.03.292.215.127.296.435 1.061.472 1.137.037.076.062.164.011.265-.051.101-.077.164-.153.253-.076.088-.16.196-.228.265-.077.077-.157.16-.068.314.089.153.395.652.848 1.056.583.52 1.074.68 1.226.756.153.076.242.063.331-.038.089-.101.382-.442.484-.592.102-.151.204-.126.344-.076.14.05 1.137.536 1.332.634s.324.146.37.228c.047.081.047.469-.077.824z" />
              </svg>
              Order on WhatsApp
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* -------- family quotes marquee -------- */

function FamilyVoices() {
  const quotes = catalog.flatMap((p) => p.quotes).slice(0, 6);
  return (
    <section className="border-y border-brand-brown/10 bg-brand-beige/40 py-14">
      <FadeIn>
        <p className="mb-8 text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-brand-terracotta">
          · Family Voices ·
        </p>
      </FadeIn>
      <div className="mx-auto grid max-w-5xl gap-6 px-6 md:grid-cols-2">
        {quotes.map((q, i) => (
          <FadeIn key={i} delay={i * 0.05}>
            <figure className="rounded-2xl bg-brand-cream p-6 shadow-sm ring-1 ring-brand-brown/5">
              <blockquote className="font-display text-lg italic leading-relaxed text-brand-brown">
                "{q.quote}"
              </blockquote>
              <figcaption className="mt-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-terracotta">
                — {q.by}
              </figcaption>
            </figure>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* -------- footer -------- */

function Footer() {
  return (
    <footer className="px-6 py-14 text-center">
      <p className="mb-2 font-telugu text-sm text-brand-brown/50">
        ప్రేమతో తయారు చేసినది
      </p>
      <p className="text-[10px] uppercase tracking-[0.3em] text-brand-terracotta">
        © Sastra Flavours · Made with love in Andhra
      </p>
      <div className="mt-6 flex justify-center gap-6 text-[10px] uppercase tracking-[0.25em] text-brand-brown/60">
        <a href="https://instagram.com/sastra_flavours" target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href={WHATSAPP} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        <Link to="/products">Shop</Link>
      </div>
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
        <Heritage />
        <Products />
        <Mothers />
        <FamilyVoices />
      </main>
      <Footer />
    </div>
  );
}
