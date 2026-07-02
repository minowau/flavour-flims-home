import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { products, categories, type Category, type SpiceLevel } from "@/lib/products";
import logoAsset from "@/assets/sastra-logo.png.asset.json";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "The Full Catalog — Sastra Flavours" },
      {
        name: "description",
        content:
          "Every jar we make: pickles, laddus, podis and Sunday masalas. Each with its own story, ingredients, spice level and mother's note.",
      },
      { property: "og:title", content: "The Full Catalog — Sastra Flavours" },
      {
        property: "og:description",
        content: "Every jar carries a memory. Meet the whole family of flavours.",
      },
    ],
  }),
  component: Catalog,
});

function SpiceMeter({ level }: { level: SpiceLevel }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Spice level ${level} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${
            i < level ? "bg-brand-chilli" : "bg-brand-brown/15"
          }`}
        />
      ))}
    </span>
  );
}

function Catalog() {
  const [cat, setCat] = useState<Category | "All">("All");
  const [maxSpice, setMaxSpice] = useState<SpiceLevel>(5);

  const list = useMemo(
    () =>
      products.filter(
        (p) => (cat === "All" || p.category === cat) && p.spice <= maxSpice,
      ),
    [cat, maxSpice],
  );

  return (
    <div className="min-h-screen bg-brand-cream text-brand-brown">
      {/* nav */}
      <header className="sticky top-0 z-40 border-b border-brand-brown/10 bg-brand-cream/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoAsset.url}
              alt="Sastra Flavours"
              className="h-10 w-10 rounded-full ring-2 ring-brand-turmeric/40"
            />
            <div className="hidden sm:block">
              <p className="font-display text-lg leading-none">
                Sastra <span className="text-brand-terracotta">Flavours</span>
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-brand-brown/60">
                The Catalog
              </p>
            </div>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/" className="text-brand-brown/70 hover:text-brand-terracotta">
              ← Back to story
            </Link>
            <a
              href="https://wa.me/918897892299?text=Hello%20Amma%20%E2%9D%A4%EF%B8%8F"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-brand-forest px-4 py-2 text-xs font-semibold uppercase tracking-widest text-brand-cream transition hover:bg-brand-brown"
            >
              WhatsApp
            </a>
          </nav>
        </div>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-5xl px-6 pt-16 text-center md:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-terracotta">
          · The full catalog ·
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-balance md:text-6xl">
          Every jar has a story.
          <br />
          <span className="italic text-brand-terracotta">Meet the whole family.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl font-serif text-brand-brown/80">
          Pickles that remember summer, laddus that remember exam nights, podis that
          rescued a thousand hostel dinners. Choose a jar — read its diary.
        </p>
        <p className="mt-3 font-telugu text-brand-brown/70">
          ప్రతి డబ్బాలోనూ ఒక కథ ఉంది.
        </p>
      </section>

      {/* filters */}
      <section className="mx-auto mt-12 max-w-6xl px-6">
        <div className="flex flex-col gap-4 rounded-2xl bg-brand-beige/60 p-4 ring-1 ring-brand-brown/10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[10px] font-semibold uppercase tracking-widest text-brand-brown/60">
              Category
            </span>
            {(["All", ...categories] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition ${
                  cat === c
                    ? "bg-brand-brown text-brand-cream"
                    : "bg-brand-cream text-brand-brown/70 ring-1 ring-brand-brown/15 hover:text-brand-brown"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-3 text-xs uppercase tracking-widest text-brand-brown/70">
            Max spice
            <input
              type="range"
              min={0}
              max={5}
              value={maxSpice}
              onChange={(e) => setMaxSpice(Number(e.target.value) as SpiceLevel)}
              className="accent-brand-chilli"
            />
            <SpiceMeter level={maxSpice} />
          </label>
        </div>
      </section>

      {/* grid */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        {list.length === 0 ? (
          <p className="py-24 text-center font-serif italic text-brand-brown/60">
            No jars match this filter. Try a spicier setting?
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: (i % 6) * 0.05, duration: 0.6 }}
              >
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="group block overflow-hidden rounded-3xl bg-brand-cream ring-1 ring-brand-brown/10 shadow-lg shadow-brand-brown/10 transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                      loading="lazy"
                      width={1024}
                      height={1024}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                    <span className="absolute left-4 top-4 rounded-full bg-brand-cream/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand-brown">
                      {p.tag}
                    </span>
                    <span className="absolute right-4 top-4 rounded-full bg-brand-brown/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand-cream">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl leading-tight">{p.name}</h3>
                    <p className="mt-1 font-telugu text-brand-terracotta">{p.telugu}</p>
                    <p className="mt-3 font-serif text-sm italic leading-relaxed text-brand-brown/75">
                      “{p.tagline}”
                    </p>
                    <div className="mt-5 flex items-center justify-between text-xs text-brand-brown/70">
                      <div className="flex items-center gap-2">
                        <span className="uppercase tracking-widest">Spice</span>
                        <SpiceMeter level={p.spice} />
                      </div>
                      <span className="font-display text-lg text-brand-brown">
                        ₹{p.price}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
