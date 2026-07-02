import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";

import logoAsset from "@/assets/sastra-logo.png.asset.json";
import sceneChildhood from "@/assets/scene-childhood.jpg";
import sceneSummer from "@/assets/scene-summer.jpg";
import sceneFestival from "@/assets/scene-festival.jpg";
import sceneRain from "@/assets/scene-rain.jpg";
import sceneHostel from "@/assets/scene-hostel.jpg";
import sceneMothers from "@/assets/scene-mothers.jpg";
import sceneEvening from "@/assets/scene-evening.jpg";
import { products as catalog } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sastra Flavours — Authentic Home Flavours" },
      {
        name: "description",
        content:
          "A cinematic homemade food story. Pickles, laddus and spice blends made by two passionate mothers — the way home always tasted.",
      },
      { property: "og:title", content: "Sastra Flavours — Authentic Home Flavours" },
      {
        property: "og:description",
        content: "From our mothers' kitchen to your family's table.",
      },
    ],
  }),
  component: Home,
});

/* ---------- Small building blocks ---------- */

function FolkDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-brand-mustard ${className}`}>
      <span className="h-px flex-1 bg-current opacity-40" />
      <svg width="22" height="22" viewBox="0 0 22 22" className="opacity-80">
        <path
          d="M11 1 L13 9 L21 11 L13 13 L11 21 L9 13 L1 11 L9 9 Z"
          fill="currentColor"
          opacity="0.85"
        />
      </svg>
      <span className="folk-divider flex-1" />
      <svg width="22" height="22" viewBox="0 0 22 22" className="opacity-80">
        <path
          d="M11 1 L13 9 L21 11 L13 13 L11 21 L9 13 L1 11 L9 9 Z"
          fill="currentColor"
          opacity="0.85"
        />
      </svg>
      <span className="h-px flex-1 bg-current opacity-40" />
    </div>
  );
}

function SpiceParticles() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  const bits = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bits.map((_, i) => (
        <span
          key={i}
          className="animate-float-up absolute bottom-[-40px] block rounded-full"
          style={{
            left: `${(i * 73) % 100}%`,
            width: 4 + ((i * 3) % 6),
            height: 4 + ((i * 3) % 6),
            background:
              i % 3 === 0
                ? "var(--brand-turmeric)"
                : i % 3 === 1
                  ? "var(--brand-chilli)"
                  : "var(--brand-mustard)",
            animationDelay: `${(i * 0.9) % 8}s`,
            opacity: 0.55,
          }}
        />
      ))}
    </div>
  );
}

/* Cinematic story scene with pinned image + parallax caption */
function Scene({
  image,
  eyebrow,
  line1,
  line2,
  telugu,
  align = "center",
  progress,
  from,
  to,
}: {
  image: string;
  eyebrow?: string;
  line1: string;
  line2?: string;
  telugu?: string;
  align?: "left" | "center" | "right";
  progress: MotionValue<number>;
  from: number;
  to: number;
}) {
  const a = Math.max(0, from - 0.05);
  const d = Math.min(1, to + 0.05);
  const opacity = useTransform(progress, [a, from, to, d], [0, 1, 1, 0]);
  const y = useTransform(progress, [from, to], [30, -30]);
  const scale = useTransform(progress, [from, to], [1.08, 1.16]);

  const alignCls =
    align === "left"
      ? "items-start text-left"
      : align === "right"
        ? "items-end text-right"
        : "items-center text-center";

  return (
    <motion.section
      style={{ opacity }}
      className="relative h-screen w-full overflow-hidden"
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          width={1600}
          height={1024}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />
      <SpiceParticles />
      <motion.div
        style={{ y }}
        className={`relative z-10 mx-auto flex h-full max-w-4xl flex-col justify-end gap-4 px-6 pb-20 md:pb-28 ${alignCls}`}
      >
        {eyebrow && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-brand-turmeric/90">
            {eyebrow}
          </span>
        )}
        <h2 className="font-display text-4xl leading-[1.05] text-brand-cream text-balance md:text-6xl">
          {line1}
          {line2 && (
            <>
              <br />
              <span className="italic text-brand-turmeric">{line2}</span>
            </>
          )}
        </h2>
        {telugu && (
          <p className="max-w-xl font-telugu text-lg text-brand-cream/85 md:text-xl">
            {telugu}
          </p>
        )}
      </motion.div>
    </motion.section>
  );
}

/* ---------- Intro (fade-in poetry over black) ---------- */

function Intro({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const lines = ["Every family has one recipe...", "that was never written.", "It was remembered through love."];
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    lines.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i + 1), 900 * (i + 1)));
    });
    timers.push(setTimeout(onDone, 900 * lines.length + 900));

    // dismiss on any interaction
    const skip = () => onDone();
    window.addEventListener("wheel", skip, { passive: true, once: true });
    window.addEventListener("touchstart", skip, { passive: true, once: true });
    window.addEventListener("keydown", skip, { once: true });
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
      window.removeEventListener("keydown", skip);
    };
  }, [onDone, reduced]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[oklch(0.12_0.02_55)] px-6"
    >
      <div className="relative flex max-w-2xl flex-col items-center text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-display text-2xl leading-relaxed text-brand-cream md:text-4xl"
          >
            {step === 0 ? "Sastra Flavours" : lines[step - 1]}
          </motion.p>
        </AnimatePresence>
        <button
          onClick={onDone}
          className="mt-16 rounded-full border border-brand-cream/30 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-cream/80 transition hover:border-brand-turmeric hover:text-brand-turmeric"
        >
          Skip intro →
        </button>
        <p className="mt-3 text-[10px] uppercase tracking-widest text-brand-cream/40">
          or scroll to begin
        </p>
      </div>
    </motion.div>
  );
}

/* ---------- Sections ---------- */

function TopNav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-4 md:px-10"
    >
      <a href="#top" className="flex items-center gap-3">
        <img
          src={logoAsset.url}
          alt="Sastra Flavours"
          className="h-11 w-11 rounded-full ring-2 ring-brand-turmeric/40"
        />
        <div className="hidden sm:block">
          <p className="font-display text-lg leading-none text-brand-brown">
            Sastra <span className="text-brand-terracotta">Flavours</span>
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-brand-brown/60">
            Authentic Home Flavours
          </p>
        </div>
      </a>
      <nav className="hidden items-center gap-6 text-sm text-brand-brown/80 md:flex">
        <a href="#story" className="hover:text-brand-terracotta">Our Story</a>
        <Link to="/products" className="hover:text-brand-terracotta">Catalog</Link>
        <a href="#mothers" className="hover:text-brand-terracotta">Meet the Mothers</a>
        <a href="#contact" className="hover:text-brand-terracotta">Contact</a>
      </nav>
      <a
        href="https://wa.me/918897892299?text=Hello%20Amma%20%E2%9D%A4%EF%B8%8F%20I%27d%20like%20to%20order"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-4 py-2 text-xs font-semibold uppercase tracking-widest text-brand-cream shadow-lg shadow-black/10 transition hover:bg-brand-brown"
      >
        <span className="hidden sm:inline">Order on</span> WhatsApp
      </a>
    </motion.header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={sceneChildhood}
          alt="Grandmother feeding children at sunset"
          className="animate-kenburns h-full w-full object-cover"
          width={1600}
          height={1024}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-brand-cream" />
      </div>

      <SpiceParticles />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-24 text-center">
        <motion.img
          src={logoAsset.url}
          alt="Sastra Flavours emblem"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="h-24 w-24 rounded-full ring-4 ring-brand-turmeric/60 md:h-28 md:w-28"
        />
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-6 text-xs font-semibold uppercase tracking-[0.4em] text-brand-turmeric"
        >
          · Brand Story ·
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="mt-4 font-display text-5xl leading-[1.02] text-brand-cream text-balance md:text-7xl"
        >
          From our mothers' kitchen
          <br />
          <span className="italic text-brand-turmeric">to your family's table.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-5 max-w-xl font-telugu text-lg text-brand-cream/90 md:text-xl"
        >
          మా అమ్మల వంటగది నుండి మీ కుటుంబ భోజనానికి — ప్రతి రుచిలో ఇంటి ప్రేమ.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#story"
            className="rounded-full bg-brand-cream px-6 py-3 text-sm font-semibold text-brand-brown shadow-lg shadow-black/20 transition hover:bg-brand-turmeric"
          >
            Begin the story
          </a>
          <a
            href="#products"
            className="rounded-full border border-brand-cream/60 px-6 py-3 text-sm font-semibold text-brand-cream transition hover:bg-brand-cream/10"
          >
            Explore products
          </a>
        </motion.div>

        <div className="mt-16 flex flex-col items-center gap-2 text-brand-cream/70">
          <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <span className="animate-shimmer-line block h-8 w-px origin-top bg-brand-cream/70" />
        </div>
      </div>
    </section>
  );
}

function StorySequence() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scenes = [
    {
      image: sceneChildhood,
      eyebrow: "Scene One · Childhood",
      line1: "Home wasn't a place.",
      line2: "It was a taste.",
      telugu: "ఇల్లు అనేది ఒక చోటు కాదు — అది ఒక రుచి.",
    },
    {
      image: sceneSummer,
      eyebrow: "Scene Two · Summer holidays",
      line1: "Every summer,",
      line2: "our homes smelled like memories.",
      telugu: "ప్రతి వేసవి మా ఇళ్ళు జ్ఞాపకాల వాసనతో నిండేవి.",
    },
    {
      image: sceneFestival,
      eyebrow: "Scene Three · Festival morning",
      line1: "Festivals were never about decorations.",
      line2: "They were about food that brought everyone together.",
      telugu: "పండగలు అలంకరణల గురించి కావు — అందరిని కలిపే భోజనం గురించి.",
    },
    {
      image: sceneRain,
      eyebrow: "Scene Four · Rainy evening",
      line1: "Eat first.",
      line2: "Homework can wait.",
      telugu: "ముందు తిను, హోంవర్క్ ఆగుతుంది.",
    },
    {
      image: sceneHostel,
      eyebrow: "Scene Five · Hostel life",
      line1: "Sometimes,",
      line2: "home arrives inside a small parcel.",
      telugu: "కొన్నిసార్లు ఇల్లు చిన్న పార్సెల్‌లో వస్తుంది.",
    },
    {
      image: sceneEvening,
      eyebrow: "Scene Six · Modern life",
      line1: "Some flavours never leave us.",
      line2: "They simply wait.",
      telugu: "కొన్ని రుచులు మనల్ని విడిచిపెట్టవు — అవి కేవలం ఎదురుచూస్తాయి.",
    },
  ];

  return (
    <section
      id="story"
      ref={ref}
      className="relative"
      style={{ height: `${scenes.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {scenes.map((s, i) => (
          <Scene
            key={i}
            image={s.image}
            eyebrow={s.eyebrow}
            line1={s.line1}
            line2={s.line2}
            telugu={s.telugu}
            align={i % 2 === 0 ? "left" : "right"}
            progress={scrollYProgress}
            from={i / scenes.length}
            to={(i + 1) / scenes.length}
          />
        ))}
        <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center gap-2">
          {scenes.map((_, i) => (
            <span
              key={i}
              className="h-1 w-8 rounded-full bg-brand-cream/25"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Reveal() {
  return (
    <section className="relative overflow-hidden bg-brand-cream py-24 md:py-32">
      <div className="paper-grain absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <FolkDivider className="mx-auto max-w-md" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1 }}
          className="mt-8 text-xs font-semibold uppercase tracking-[0.4em] text-brand-terracotta"
        >
          And then...
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ delay: 0.15, duration: 1 }}
          className="mt-4 font-display text-4xl leading-tight text-brand-brown text-balance md:text-6xl"
        >
          Two mothers began cooking —
          <br />
          <span className="italic text-brand-terracotta">for every family, not just their own.</span>
        </motion.h2>
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src={sceneMothers}
          alt="The two founders of Sastra Flavours cooking together"
          className="mx-auto mt-12 w-full max-w-3xl rounded-3xl shadow-2xl shadow-brand-brown/30 ring-1 ring-brand-brown/10"
          width={1600}
          height={1200}
          loading="lazy"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mx-auto mt-10 max-w-2xl font-serif text-lg leading-relaxed text-brand-brown/85 md:text-xl"
        >
          Sushma and Jeevana — two homemakers who believed the goodness of homemade
          food should never disappear from modern life. Every pickle, every laddu,
          every spice blend is made the way an Amma cooks for her own family.
          <span className="mt-3 block font-telugu text-base text-brand-brown/75 md:text-lg">
            రెండు అమ్మలు, ఒక కల — ప్రతి ఇంటికి ఇంటి రుచి చేర్చాలని.
          </span>
        </motion.p>
      </div>
    </section>
  );
}

const featured = catalog.filter((p) =>
  ["grandmas-summer-mango-pickle", "nutri-laddu", "sunday-kitchen-masala"].includes(p.slug),
);

function Products() {
  return (
    <section id="products" className="relative bg-brand-beige py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-terracotta">
            · From our kitchen ·
          </p>
          <h2 className="mt-3 font-display text-4xl text-brand-brown md:text-5xl">
            Every jar carries a memory
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-telugu text-brand-brown/70">
            ప్రతి డబ్బాలోనూ ఒక జ్ఞాపకం.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {featured.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group relative overflow-hidden rounded-3xl bg-brand-cream ring-1 ring-brand-brown/10 shadow-xl shadow-brand-brown/10"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                <span className="absolute left-4 top-4 rounded-full bg-brand-cream/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand-brown">
                  {p.tag}
                </span>
                <div className="absolute inset-x-4 bottom-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <p className="rounded-xl bg-brand-brown/85 px-3 py-2 text-center font-serif text-sm italic text-brand-cream">
                    “{p.hover}”
                  </p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-brand-brown">{p.name}</h3>
                <p className="mt-1 font-telugu text-brand-terracotta">{p.telugu}</p>
                <p className="mt-4 font-serif italic leading-relaxed text-brand-brown/80">
                  “{p.tagline}”
                </p>
                <div className="mt-5 rounded-2xl bg-brand-turmeric/25 p-3 text-sm text-brand-brown/90">
                  <span className="font-semibold text-brand-brown">Amma's note · </span>
                  {p.amma_note}
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <a
                    href={`https://wa.me/918897892299?text=${encodeURIComponent(
                      `Hello Amma ❤️ I'd like to order ${p.name}`,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 rounded-full bg-brand-forest px-4 py-2.5 text-center text-sm font-semibold text-brand-cream transition hover:bg-brand-brown"
                  >
                    Order · ₹{p.price}
                  </a>
                  <Link
                    to="/products/$slug"
                    params={{ slug: p.slug }}
                    className="rounded-full border border-brand-brown/30 px-4 py-2.5 text-sm font-semibold text-brand-brown transition hover:bg-brand-brown hover:text-brand-cream"
                  >
                    Story
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-brand-brown px-7 py-3 text-sm font-semibold uppercase tracking-widest text-brand-cream transition hover:bg-brand-terracotta"
          >
            See the full catalog →
          </Link>
          <p className="mt-3 text-xs uppercase tracking-widest text-brand-brown/60">
            {catalog.length} jars · pickles · laddus · podis
          </p>
        </div>
      </div>
    </section>
  );
}


function Mothers() {
  return (
    <section
      id="mothers"
      className="relative overflow-hidden bg-brand-forest py-24 text-brand-cream md:py-32"
    >
      <div className="absolute inset-0 opacity-20 mix-blend-overlay">
        <img
          src={sceneMothers}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          width={1600}
          height={1200}
        />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-turmeric">
            · Meet the mothers ·
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-balance md:text-5xl">
            Sushma & Jeevana —
            <br />
            <span className="italic text-brand-turmeric">the hands behind every jar.</span>
          </h2>
          <p className="mt-5 max-w-lg font-serif leading-relaxed text-brand-cream/85">
            What began as sharing recipes with family and friends grew into a
            passion-driven kitchen. From wholesome nutrition mixes and healthy
            snacks to traditional pickles, laddus, spice blends and ready-to-cook
            premixes — every product is made with care.
          </p>
          <p className="mt-4 font-telugu text-brand-cream/80">
            ప్రతి రెసిపీ మా వంటగది నుండి మీ భోజన బల్లకు — ప్రేమతో.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://instagram.com/sastra_flavours"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-brand-turmeric px-5 py-2.5 text-sm font-semibold text-brand-brown transition hover:bg-brand-cream"
            >
              Follow @sastra_flavours
            </a>
            <a
              href="https://wa.me/918897892299"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-brand-cream/50 px-5 py-2.5 text-sm font-semibold transition hover:bg-brand-cream/10"
            >
              WhatsApp us
            </a>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { k: "recipes", v: "40+", l: "family recipes" },
            { k: "families", v: "500+", l: "happy families" },
            { k: "years", v: "2 amma's", l: "one dream" },
            { k: "batches", v: "small", l: "hand-made batches" },
            { k: "chem", v: "0", l: "preservatives" },
            { k: "love", v: "∞", l: "spoons of love" },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-2xl bg-brand-cream/10 p-4 text-center ring-1 ring-brand-cream/15"
            >
              <p className="font-display text-2xl text-brand-turmeric">{s.v}</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-brand-cream/70">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FamilyStories() {
  const stories = [
    {
      quote: "It tasted exactly like my grandmother's pickle.",
      by: "Padma · Hyderabad",
    },
    {
      quote: "My children fought over the last laddu.",
      by: "Anitha · Bengaluru",
    },
    {
      quote:
        "I haven't had food this authentic since leaving home for the US.",
      by: "Ravi · New Jersey",
    },
  ];
  return (
    <section className="bg-brand-cream py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-terracotta">
            · Family stories ·
          </p>
          <h2 className="mt-3 font-display text-4xl text-brand-brown md:text-5xl">
            Not reviews. Memories.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {stories.map((s, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="relative rounded-3xl bg-brand-beige p-7 ring-1 ring-brand-brown/10"
            >
              <span className="absolute -top-4 left-6 font-display text-6xl leading-none text-brand-terracotta/60">
                “
              </span>
              <p className="mt-3 font-serif text-lg italic leading-relaxed text-brand-brown">
                {s.quote}
              </p>
              <footer className="mt-4 text-xs font-semibold uppercase tracking-widest text-brand-brown/60">
                — {s.by}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingScene() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[oklch(0.22_0.05_55)] py-28 text-brand-cream"
    >
      <div className="absolute inset-0">
        <img
          src={sceneEvening}
          alt=""
          className="h-full w-full object-cover opacity-50"
          loading="lazy"
          width={1600}
          height={1024}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[oklch(0.22_0.05_55)]/70 to-[oklch(0.15_0.03_55)]" />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <FolkDivider className="mx-auto text-brand-turmeric" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mt-8 font-display text-3xl italic leading-relaxed md:text-5xl"
        >
          Some recipes are never measured in spoons.
          <br />
          <span className="text-brand-turmeric">They are measured in love.</span>
        </motion.h2>
        <p className="mx-auto mt-8 max-w-xl font-serif leading-relaxed text-brand-cream/80">
          Some homes are built with bricks. Ours is built with flavours.
          Thank you for becoming a part of our family.
        </p>
        <p className="mt-3 font-telugu text-brand-cream/80">
          మీరు మా కుటుంబంలో ఒక భాగమయ్యినందుకు ధన్యవాదాలు.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wa.me/918897892299?text=Hello%20Amma%20%E2%9D%A4%EF%B8%8F"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-brand-turmeric px-6 py-3 text-sm font-semibold text-brand-brown shadow-lg shadow-black/30 transition hover:bg-brand-cream"
          >
            WhatsApp · 8897892299
          </a>
          <a
            href="https://instagram.com/sastra_flavours"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-brand-cream/40 px-6 py-3 text-sm font-semibold transition hover:bg-brand-cream/10"
          >
            @sastra_flavours
          </a>
        </div>

        <div className="mt-16 flex flex-col items-center gap-3">
          <img
            src={logoAsset.url}
            alt="Sastra Flavours"
            className="h-14 w-14 rounded-full ring-2 ring-brand-turmeric/50"
          />
          <p className="font-display text-2xl">Sastra Flavours</p>
          <p className="text-[10px] uppercase tracking-[0.4em] text-brand-cream/60">
            Authentic Home Flavours
          </p>
        </div>
      </div>
    </section>
  );
}

function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/918897892299?text=Hello%20Amma%20%E2%9D%A4%EF%B8%8F%20I%27d%20like%20to%20order"
      target="_blank"
      rel="noreferrer"
      aria-label="Order on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-forest text-brand-cream shadow-2xl shadow-black/30 transition hover:scale-105"
    >
      <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" aria-hidden>
        <path d="M19.11 17.27c-.28-.14-1.65-.81-1.9-.9-.26-.09-.44-.14-.63.14-.19.28-.72.9-.88 1.08-.16.19-.32.21-.6.07-.28-.14-1.18-.44-2.24-1.39-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.63-1.5-.86-2.06-.23-.55-.46-.48-.63-.48h-.54c-.19 0-.49.07-.75.35-.26.28-.99.97-.99 2.36 0 1.39 1.02 2.74 1.16 2.93.14.19 2 3.05 4.85 4.28.68.29 1.2.47 1.61.6.68.22 1.29.19 1.78.12.54-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.26-.19-.54-.33zM16.02 5C9.94 5 5 9.93 5 16.01c0 2.13.62 4.11 1.69 5.79L5 27l5.36-1.66a10.94 10.94 0 0 0 5.66 1.55h.01c6.08 0 11.02-4.93 11.02-11.01S22.1 5 16.02 5z" />
      </svg>
    </a>
  );
}

/* ---------- Root ---------- */

function Home() {
  const [introDone, setIntroDone] = useState(false);
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-brand-cream text-brand-brown">
      <AnimatePresence>
        {!introDone && <Intro onDone={() => setIntroDone(true)} />}
      </AnimatePresence>
      <TopNav />
      <main>
        <Hero />
        <StorySequence />
        <Reveal />
        <Products />
        <Mothers />
        <FamilyStories />
        <ClosingScene />
      </main>
      <WhatsAppFab />
    </div>
  );
}
