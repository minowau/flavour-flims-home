import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { getProduct, products, type SpiceLevel } from "@/lib/products";
import logoAsset from "@/assets/sastra-logo.png.asset.json";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Jar not found — Sastra Flavours" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Sastra Flavours` },
        { name: "description", content: product.tagline },
        { property: "og:title", content: `${product.name} — Sastra Flavours` },
        { property: "og:description", content: product.tagline },
      ],
    };
  },
  notFoundComponent: JarNotFound,
  errorComponent: ({ error, reset }) => (
    <div className="flex min-h-screen items-center justify-center bg-brand-cream p-8 text-center text-brand-brown">
      <div>
        <p className="font-serif italic">Something spilled in the kitchen.</p>
        <p className="mt-2 text-sm text-brand-brown/60">{error.message}</p>
        <button
          onClick={() => reset()}
          className="mt-6 rounded-full bg-brand-forest px-5 py-2 text-sm text-brand-cream"
        >
          Try again
        </button>
      </div>
    </div>
  ),
  component: ProductPage,
});

function JarNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-cream p-8 text-center text-brand-brown">
      <div>
        <p className="font-display text-3xl">This jar isn't on our shelf.</p>
        <p className="mt-3 font-serif italic text-brand-brown/70">
          Maybe Amma is still preparing it.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-block rounded-full bg-brand-forest px-5 py-2 text-sm font-semibold text-brand-cream"
        >
          Back to the catalog
        </Link>
      </div>
    </div>
  );
}

function SpiceMeter({ level }: { level: SpiceLevel }) {
  return (
    <span className="inline-flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-2.5 w-2.5 rounded-full ${
            i < level ? "bg-brand-chilli" : "bg-brand-brown/15"
          }`}
        />
      ))}
      <span className="ml-2 text-xs uppercase tracking-widest text-brand-brown/60">
        {["Mild", "Gentle", "Warm", "Bold", "Fiery", "Guntur"][level]}
      </span>
    </span>
  );
}

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const orderUrl = `https://wa.me/918897892299?text=${encodeURIComponent(
    `Hello Amma ❤️ I'd like to order ${p.name} (${p.net_weight}) — ₹${p.price}`,
  )}`;

  const related = products.filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 3);

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
            <p className="hidden font-display text-lg leading-none sm:block">
              Sastra <span className="text-brand-terracotta">Flavours</span>
            </p>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link
              to="/products"
              className="text-brand-brown/70 hover:text-brand-terracotta"
            >
              ← All jars
            </Link>
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pt-10 md:grid-cols-2 md:pt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl ring-1 ring-brand-brown/10"
        >
          <img
            src={p.image}
            alt={p.name}
            className="aspect-[4/5] w-full object-cover"
            width={1200}
            height={1500}
          />
          <span className="absolute left-4 top-4 rounded-full bg-brand-cream/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand-brown">
            {p.tag}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9 }}
          className="flex flex-col justify-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-terracotta">
            {p.category}
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
            {p.name}
          </h1>
          <p className="mt-2 font-telugu text-xl text-brand-terracotta">{p.telugu}</p>
          <p className="mt-5 font-serif text-lg italic leading-relaxed text-brand-brown/85">
            “{p.tagline}”
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl bg-brand-beige/60 p-5 ring-1 ring-brand-brown/10 sm:grid-cols-4">
            <Meta label="Net weight" value={p.net_weight} />
            <Meta label="Shelf life" value={p.shelf_life.split(",")[0]} />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-brand-brown/60">
                Spice
              </p>
              <div className="mt-1.5">
                <SpiceMeter level={p.spice} />
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-brand-brown/60">
                Price
              </p>
              <p className="mt-1 font-display text-2xl">₹{p.price}</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-brand-turmeric/25 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-brown/70">
              · Amma's note ·
            </p>
            <p className="mt-2 font-serif italic leading-relaxed text-brand-brown/90">
              {p.amma_note}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={orderUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-full bg-brand-forest px-6 py-3 text-center text-sm font-semibold uppercase tracking-widest text-brand-cream transition hover:bg-brand-brown"
            >
              Order on WhatsApp · ₹{p.price}
            </a>
            <Link
              to="/products"
              className="rounded-full border border-brand-brown/30 px-6 py-3 text-sm font-semibold uppercase tracking-widest transition hover:bg-brand-brown hover:text-brand-cream"
            >
              Browse more
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Story diary */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-terracotta">
            · The story diary ·
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">
            How this jar remembers home
          </h2>
        </div>
        <div className="mt-12 space-y-8">
          {p.diary.map((d, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className="relative rounded-3xl bg-brand-beige/60 p-7 ring-1 ring-brand-brown/10"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-brand-terracotta">
                {d.chapter}
              </p>
              <p className="mt-3 font-serif text-lg leading-relaxed text-brand-brown/85">
                {d.text}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Ingredients + shelf */}
      <section className="bg-brand-beige/50 py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-terracotta">
              · What's inside ·
            </p>
            <h3 className="mt-3 font-display text-3xl">Ingredients</h3>
            <p className="mt-2 font-serif italic text-brand-brown/70">
              Nothing more than what Amma would use in her own kitchen.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {p.ingredients.map((ing) => (
                <li
                  key={ing}
                  className="flex items-center gap-2 rounded-xl bg-brand-cream px-3 py-2 text-sm ring-1 ring-brand-brown/10"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-turmeric" />
                  {ing}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs uppercase tracking-widest text-brand-brown/60">
              No preservatives · No artificial colours · Small hand-made batches
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-terracotta">
              · Keep it well ·
            </p>
            <h3 className="mt-3 font-display text-3xl">Shelf & serving</h3>
            <dl className="mt-6 space-y-4 font-serif text-brand-brown/85">
              <Row label="Shelf life" value={p.shelf_life} />
              <Row label="Net weight" value={p.net_weight} />
              <Row label="Spice level" value={`${p.spice} / 5`} />
              <Row label="Pairs beautifully with" value={p.pairs_with.join(" · ")} />
            </dl>
          </div>
        </div>
      </section>

      {/* Family stories */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-terracotta">
            · Family stories ·
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">
            Not reviews. Memories.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {p.quotes.map((q, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="relative rounded-3xl bg-brand-beige p-7 ring-1 ring-brand-brown/10"
            >
              <span className="absolute -top-4 left-6 font-display text-6xl leading-none text-brand-terracotta/60">
                “
              </span>
              <p className="mt-3 font-serif text-lg italic leading-relaxed">
                {q.quote}
              </p>
              <footer className="mt-4 text-xs font-semibold uppercase tracking-widest text-brand-brown/60">
                — {q.by}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-brand-cream pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <h3 className="font-display text-2xl">
              More from the <span className="italic text-brand-terracotta">{p.category}</span> shelf
            </h3>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/products/$slug"
                  params={{ slug: r.slug }}
                  className="group overflow-hidden rounded-2xl bg-brand-beige/60 ring-1 ring-brand-brown/10 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-[5/4] overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-display text-lg">{r.name}</p>
                    <p className="mt-0.5 font-telugu text-sm text-brand-terracotta">
                      {r.telugu}
                    </p>
                    <p className="mt-2 text-xs text-brand-brown/70">₹{r.price} · {r.net_weight}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Floating order bar */}
      <div className="sticky bottom-4 z-30 mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-full bg-brand-brown px-5 py-3 text-brand-cream shadow-2xl shadow-black/30 md:mx-auto md:mb-6">
        <div className="min-w-0">
          <p className="truncate font-display text-lg leading-tight">{p.name}</p>
          <p className="text-[10px] uppercase tracking-widest text-brand-cream/70">
            {p.net_weight} · ₹{p.price}
          </p>
        </div>
        <a
          href={orderUrl}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-full bg-brand-turmeric px-5 py-2 text-xs font-semibold uppercase tracking-widest text-brand-brown transition hover:bg-brand-cream"
        >
          Order · WhatsApp
        </a>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-brand-brown/60">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-brand-cream p-4 ring-1 ring-brand-brown/10">
      <dt className="text-[10px] font-semibold uppercase tracking-widest text-brand-brown/60">
        {label}
      </dt>
      <dd className="mt-1 leading-relaxed">{value}</dd>
    </div>
  );
}
