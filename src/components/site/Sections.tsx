import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  Award, ShieldCheck, IndianRupee, LayoutGrid, Factory, Smile, Star, MapPin, Navigation, Hammer, Sparkles, Gauge, ArrowRight, Phone, MessageCircle,
} from "lucide-react";
import { BUSINESS, PRODUCTS, directionsUrl, mapEmbedUrl, whatsappUrl } from "@/lib/business";
import { IMG, PRODUCT_IMG } from "@/lib/images";

export function Heading({ eyebrow, title, pa, light, center }: { eyebrow?: string; title: string; pa?: string; light?: boolean; center?: boolean }) {
  return (
    <div className={`mb-12 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">{eyebrow}</p>}
      <h2 className={`font-display text-4xl font-bold uppercase leading-[0.95] md:text-6xl ${light ? "text-ink-foreground" : ""}`}>{title}</h2>
      {pa && <p className={`mt-3 font-pa text-lg ${light ? "text-ink-muted" : "text-muted-foreground"}`}>{pa}</p>}
    </div>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`px-4 py-20 md:px-8 md:py-28 ${className}`}><div className="mx-auto max-w-7xl">{children}</div></section>;
}

export function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return <span className="flex text-star">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`${className} fill-current`} />)}</span>;
}

export function PageHero({ title, pa, sub, img }: { title: string; pa: string; sub: string; img: string }) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <img src={img} alt="" className="slowzoom absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <h1 className="reveal font-display text-5xl font-bold uppercase text-ink-foreground md:text-7xl">{title}</h1>
        <p className="mt-2 font-pa text-xl text-ink-muted">{pa}</p>
        <p className="mt-5 max-w-xl text-lg text-ink-foreground/85">{sub}</p>
      </div>
    </section>
  );
}

const HIGHLIGHTS = [
  "ਉੱਚ ਗੁਣਵੱਤਾ ਨਿਰਮਾਣ",
  "ਮਜ਼ਬੂਤ ਅਤੇ ਹੰਢਣਸਾਰ ਟਾਈਲਾਂ",
  "ਸੁੰਦਰ ਫਿਨਿਸ਼ਿੰਗ",
  "ਵਾਜਬ ਅਤੇ ਕਿਫ਼ਾਇਤੀ ਰੇਟ",
  "ਭਰੋਸੇਯੋਗ ਸੇਵਾ",
  "ਗਾਹਕਾਂ ਦੀ ਪੂਰੀ ਤਸੱਲੀ",
];

export function AboutBlock() {
  return (
    <Section>
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <img src={IMG.factory} alt="ਇੰਟਰਲਾਕ ਟਾਈਲਾਂ ਦਾ ਮੈਨੂਫੈਕਚਰਿੰਗ ਯਾਰਡ" loading="lazy" width={1280} height={960} className="aspect-[4/3] w-full object-cover" />
          <div className="absolute -bottom-6 -right-4 hidden bg-primary px-6 py-5 text-primary-foreground md:block shadow-lg">
            <p className="font-display text-2xl font-bold uppercase">ਪੰਜਾਬ ਵਿੱਚ ਬਣਿਆ</p>
            <p className="font-sans text-xs opacity-90">Made in Punjab</p>
          </div>
        </div>
        <div>
          <Heading eyebrow="ਸਾਡੇ ਬਾਰੇ" title="ਮਜ਼ਬੂਤੀ ਲਈ ਬਣਾਈ, ਗੁਣਵੱਤਾ ਲਈ ਡਿਜ਼ਾਈਨ ਕੀਤੀ" />
          <p className="text-lg leading-relaxed text-muted-foreground">
            ਪੰਜਾਬ ਇੰਟਰਲਾਕ ਟਾਈਲਸ ਗਹਿਰੀ ਬੁੱਟਰ, ਸੰਗਤ ਕਲਾਂ (ਪੰਜਾਬ) ਵਿੱਚ ਇੱਕ ਸਮਰਪਿਤ ਇੰਟਰਲਾਕ ਟਾਈਲ ਨਿਰਮਾਤਾ ਹੈ। ਅਸੀਂ ਰਿਹਾਇਸ਼ੀ ਘਰਾਂ, ਵਿਹੜਿਆਂ, ਦੁਕਾਨਾਂ ਅਤੇ ਵਪਾਰਕ ਪ੍ਰੋਜੈਕਟਾਂ ਲਈ ਮਜ਼ਬੂਤ, ਆਕਰਸ਼ਕ ਅਤੇ ਭਰੋਸੇਯੋਗ ਇੰਟਰਲਾਕ ਟਾਈਲਾਂ ਤਿਆਰ ਕਰਦੇ ਹਾਂ।
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-center gap-3 border-l-2 border-primary bg-card px-4 py-3 font-medium">{h}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export function ProductGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {PRODUCTS.map((p) => (
        <article key={p.id} className="group overflow-hidden border bg-card">
          <div className="overflow-hidden">
            <img src={PRODUCT_IMG[p.id]} alt={p.name} loading="lazy" width={1024} height={768} className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105" />
          </div>
          <div className="p-7">
            <h3 className="font-display text-3xl font-bold uppercase">{p.name}</h3>
            <p className="font-sans text-xs text-muted-foreground">{p.nameEn}</p>
            <p className="mt-3 text-muted-foreground">{p.desc}</p>
            <p className="mt-4 text-sm"><span className="font-semibold">ਡਿਜ਼ਾਈਨ ਅਤੇ ਸਾਈਜ਼:</span> <span className="text-muted-foreground">ਉਪਲਬਧ ਸਾਈਜ਼ਾਂ, ਡਿਜ਼ਾਈਨਾਂ ਅਤੇ ਰੇਟਾਂ ਲਈ ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।</span></p>
            <Link
              to="/contact"
              search={{ tile: p.name }}
              className="btn-shine group mt-6 inline-flex items-center gap-2 rounded-sm bg-ink px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-ink-foreground shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/30 active:translate-y-0 active:scale-[0.98]"
            >
              <span>ਰੇਟ ਪੁੱਛੋ</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

const WHY = [
  { Icon: Award, t: "ਉੱਚ ਗੁਣਵੱਤਾ", d: "ਹੰਢਣਸਾਰਤਾ ਅਤੇ ਸ਼ਾਨਦਾਰ ਫਿਨਿਸ਼ਿੰਗ 'ਤੇ ਵਿਸ਼ੇਸ਼ ਧਿਆਨ ਦੇ ਕੇ ਤਿਆਰ ਕੀਤੀਆਂ ਟਾਈਲਾਂ।" },
  { Icon: ShieldCheck, t: "ਮਜ਼ਬੂਤ ਅਤੇ ਟਿਕਾਊ", d: "ਬਾਹਰੀ ਮੌਸਮ ਅਤੇ ਭਾਰੀ ਵਰਤੋਂ ਵਿੱਚ ਲੰਬੇ ਸਮੇਂ ਤੱਕ ਕਾਇਮ ਰਹਿਣ ਲਈ ਬਣਾਈਆਂ ਗਈਆਂ।" },
  { Icon: IndianRupee, t: "ਵਾਜਬ ਅਤੇ ਘੱਟ ਰੇਟ", d: "ਵਧੀਆ ਕੁਆਲਿਟੀ ਵਾਲੇ ਉਤਪਾਦ ਕਿਫ਼ਾਇਤੀ ਅਤੇ ਵਾਜਬ ਰੇਟਾਂ 'ਤੇ ਉਪਲਬਧ।" },
  { Icon: LayoutGrid, t: "ਕਈ ਤਰ੍ਹਾਂ ਦੇ ਡਿਜ਼ਾਈਨ", d: "ਆਕਰਸ਼ਕ ਟਾਈਲ ਪੈਟਰਨਾਂ ਅਤੇ ਸ਼ੈਲੀਆਂ ਦੀ ਵਿਸ਼ਾਲ ਚੋਣ।" },
  { Icon: Factory, t: "ਸਥਾਨਕ ਨਿਰਮਾਣ", d: "ਗਹਿਰੀ ਬੁੱਟਰ, ਸੰਗਤ ਕਲਾਂ (ਪੰਜਾਬ) ਵਿੱਚ ਸਾਡੀ ਆਪਣੀ ਫੈਕਟਰੀ।" },
  { Icon: Smile, t: "ਗਾਹਕਾਂ ਦੀ ਪੂਰੀ ਤਸੱਲੀ", d: "ਭਰੋਸੇਯੋਗ ਉਤਪਾਦ ਅਤੇ ਸਮੇਂ ਸਿਰ ਵਧੀਆ ਸੇਵਾ ਦੇਣ 'ਤੇ ਪੂਰਾ ਜ਼ੋਰ।" },
];

export function WhyUs() {
  return (
    <Section className="grain bg-secondary">
      <Heading eyebrow="ਸਾਨੂੰ ਕਿਉਂ ਚੁਣੋ" title="ਪੰਜਾਬ ਇੰਟਰਲਾਕ ਟਾਈਲਸ ਨੂੰ ਕਿਉਂ ਚੁਣੋ?" />
      <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {WHY.map(({ Icon, t, d }) => (
          <div key={t} className="bg-card p-8 transition hover:bg-background">
            <Icon className="h-9 w-9 text-primary" strokeWidth={1.5} />
            <h3 className="mt-5 font-display text-2xl font-bold uppercase">{t}</h3>
            <p className="mt-2 text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const APPS = [
  { t: "ਘਰਾਂ ਦੇ ਡਰਾਈਵ-ਵੇਅ", img: IMG.driveway },
  { t: "ਮੁੱਖ ਪ੍ਰਵੇਸ਼ ਦੁਆਰ", img: IMG.courtyard },
  { t: "ਪਾਰਕਿੰਗ ਖੇਤਰ", img: IMG.parking },
  { t: "ਵਿਹੜੇ / ਕੋਰਟਯਾਰਡ", img: IMG.designer },
  { t: "ਬਗੀਚੇ ਅਤੇ ਰਸਤੇ", img: IMG.garden },
  { t: "ਦੁਕਾਨਾਂ ਅਤੇ ਵਪਾਰਕ ਥਾਵਾਂ", img: IMG.parking },
  { t: "ਫਾਰਮ ਹਾਊਸ", img: IMG.garden },
  { t: "ਵਪਾਰਕ ਪ੍ਰੋਜੈਕਟ", img: IMG.install },
];

export function Applications() {
  return (
    <Section>
      <Heading eyebrow="ਵਰਤੋਂ ਖੇਤਰ" title="ਹਰ ਬਾਹਰੀ ਥਾਂ ਲਈ ਉੱਤਮ" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {APPS.map((a) => (
          <div key={a.t} className="group relative aspect-[4/5] overflow-hidden bg-ink">
            <img src={a.img} alt={a.t} loading="lazy" className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-110 group-hover:opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 font-display text-xl font-bold uppercase leading-tight text-ink-foreground md:text-2xl">{a.t}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Quality() {
  const pts = [
    { Icon: Hammer, t: "ਹੰਢਣਸਾਰਤਾ", d: "ਲੰਬੇ ਸਮੇਂ ਤੱਕ ਬਾਹਰੀ ਵਰਤੋਂ ਲਈ ਖਾਸ ਤੌਰ 'ਤੇ ਤਿਆਰ।" },
    { Icon: Sparkles, t: "ਸੁੰਦਰ ਫਿਨਿਸ਼ਿੰਗ", d: "ਸਾਫ਼ ਪੈਟਰਨ ਅਤੇ ਆਕਰਸ਼ਕ ਸਤਹ ਫਿਨਿਸ਼ਿੰਗ।" },
    { Icon: Gauge, t: "ਸ਼ਾਨਦਾਰ ਮਜ਼ਬੂਤੀ", d: "ਸਥਿਰ, ਮਜ਼ਬੂਤ ਅਤੇ ਟਿਕਾਊ ਪੇਵਡ ਫਰਸ਼ ਲਈ ਵਿਸ਼ੇਸ਼ ਤੌਰ 'ਤੇ ਡਿਜ਼ਾਈਨ।" },
  ];
  return (
    <section className="relative overflow-hidden bg-ink px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <Heading light eyebrow="ਸਾਡੀ ਕੁਆਲਿਟੀ" title="ਗੁਣਵੱਤਾ ਜੋ ਦਿਸਦੀ ਹੈ, ਮਜ਼ਬੂਤੀ ਜਿਸ 'ਤੇ ਭਰੋਸਾ ਹੈ" />
          <div className="space-y-6">
            {pts.map(({ Icon, t, d }) => (
              <div key={t} className="flex gap-5 border-t border-ink-muted/20 pt-6">
                <Icon className="h-8 w-8 shrink-0 text-primary" strokeWidth={1.5} />
                <div><h3 className="font-display text-2xl font-bold uppercase text-ink-foreground">{t}</h3><p className="text-ink-muted">{d}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src={IMG.closeup} alt="ਕੰਕਰੀਟ ਇੰਟਰਲਾਕ ਟਾਈਲ ਟੈਕਸਚਰ" loading="lazy" className="aspect-square w-full object-cover" />
          <img src={IMG.install} alt="ਇੰਟਰਲਾਕ ਟਾਈਲ ਲਗਾਉਣ ਦਾ ਕੰਮ" loading="lazy" className="mt-10 aspect-square w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

export const REVIEWS = [
  { name: "ਚਰਨਜੀਤ ਸਿੰਘ", text: "ਬਹੁਤ ਵਧੀਆ ਲਾਕ ਟਾਈਲਾਂ ਨੇ, ਰੇਟ ਵੀ ਸਭ ਨਾਲੋਂ ਘੱਟ ਆ" },
  { name: "ਬਲਰਾਜ ਸਿੰਘ", text: "ਬੰਬ ਅੱਗ - ਸ਼ਾਨਦਾਰ ਕੁਆਲਿਟੀ ਅਤੇ ਮਜ਼ਬੂਤੀ" },
];

export function ReviewsBlock() {
  return (
    <Section className="grain bg-secondary">
      <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">ਗਾਹਕਾਂ ਦੀ ਰਾਏ</p>
          <p className="mt-4 font-display text-8xl font-bold">{BUSINESS.rating}</p>
          <Stars className="h-6 w-6" />
          <p className="mt-3 text-muted-foreground">{BUSINESS.reviewCount} ਗੂਗਲ ਸਮੀਖਿਆਵਾਂ</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="flex flex-col justify-between border bg-card p-8">
              <div><Stars /><blockquote className="mt-5 font-display text-3xl leading-tight">“{r.text}”</blockquote></div>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center bg-ink font-display font-bold text-ink-foreground">{r.name[0]}</span>
                <span><span className="block font-semibold">{r.name}</span><span className="text-xs text-muted-foreground">ਗੂਗਲ ਸਮੀਖਿਆ</span></span>
              </figcaption>
            </figure>
          ))}
          <div className="flex flex-col justify-between gap-6 bg-primary p-8 text-primary-foreground md:col-span-2 md:flex-row md:items-center">
            <div>
              <p className="font-display text-2xl font-bold uppercase">ਸਾਡੀ ਕੁਆਲਿਟੀ ਦਾ ਤਜਰਬਾ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ? ਅੱਜ ਹੀ ਸੰਪਰਕ ਕਰੋ।</p>
              <p className="mt-1 text-sm text-primary-foreground/90">ਸਿੱਧਾ ਕਾਲ ਜਾਂ ਵਟਸਐਪ ਕਰੋ: <span className="font-bold underline tracking-wide">{BUSINESS.phone}</span></p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="btn-shine btn-wa-pulse group inline-flex shrink-0 items-center gap-2 rounded-sm bg-[#25D366] px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#20ba5a] hover:shadow-xl active:translate-y-0 active:scale-[0.98]"
              >
                <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <span>ਵਟਸਐਪ</span>
              </a>
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="btn-shine group inline-flex shrink-0 items-center gap-2 rounded-sm bg-ink px-5 py-3 text-sm font-semibold uppercase tracking-wider text-ink-foreground shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-ink/90 hover:shadow-xl hover:shadow-ink/40 active:translate-y-0 active:scale-[0.98]"
              >
                <Phone className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                <span>ਹੁਣੇ ਕਾਲ ਕਰੋ</span>
              </a>
              <Link
                to="/contact"
                className="btn-shine group inline-flex shrink-0 items-center gap-2 rounded-sm border-2 border-primary-foreground/50 bg-transparent px-5 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary-foreground hover:text-primary active:translate-y-0 active:scale-[0.98]"
              >
                <span>ਸੰਪਰਕ ਕਰੋ</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

const STEPS = [
  { t: "ਟਾਈਲਾਂ ਦੀ ਚੋਣ ਕਰੋ", d: "ਉਪਲਬਧ ਟਾਈਲ ਡਿਜ਼ਾਈਨ ਅਤੇ ਪੈਟਰਨ ਦੇਖੋ।" },
  { t: "ਲੋੜ ਬਾਰੇ ਗੱਲਬਾਤ ਕਰੋ", d: "ਉਤਪਾਦ ਦੀ ਉਪਲਬਧਤਾ, ਮਾਤਰਾ ਅਤੇ ਰੇਟਾਂ ਲਈ ਸੰਪਰਕ ਕਰੋ।" },
  { t: "ਆਰਡਰ ਪੱਕਾ ਕਰੋ", d: "ਲੋੜੀਂਦੀਆਂ ਟਾਈਲਾਂ ਅਤੇ ਆਰਡਰ ਦੇ ਵੇਰਵੇ ਤੈਅ ਕਰੋ।" },
  { t: "ਡਿਲੀਵਰੀ / ਪ੍ਰਾਪਤੀ", d: "ਪ੍ਰੋਜੈਕਟ ਅਨੁਸਾਰ ਡਿਲੀਵਰੀ ਜਾਂ ਸਾਈਟ ਤੋਂ ਪ੍ਰਾਪਤੀ ਦਾ ਪ੍ਰਬੰਧ ਕਰੋ।" },
];

export function Process() {
  return (
    <Section>
      <Heading eyebrow="ਕੰਮ ਕਰਨ ਦਾ ਤਰੀਕਾ" title="ਸੌਖਾ ਆਰਡਰ ਕਰਨ ਦਾ ਤਰੀਕਾ" />
      <ol className="grid gap-8 md:grid-cols-4">
        {STEPS.map((s, i) => (
          <li key={s.t} className="border-t-4 border-ink pt-6">
            <span className="font-display text-6xl font-bold text-primary">0{i + 1}</span>
            <h3 className="mt-2 font-display text-2xl font-bold uppercase">{s.t}</h3>
            <p className="mt-2 text-muted-foreground">{s.d}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Location() {
  return (
    <Section className="bg-card">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <Heading eyebrow="ਸਾਡਾ ਪਤਾ" title="ਪੰਜਾਬ ਇੰਟਰਲਾਕ ਟਾਈਲਸ 'ਤੇ ਆਓ" />
          <p className="font-display text-3xl font-bold uppercase">{BUSINESS.name}</p>
          <p className="mt-3 flex items-start gap-2 text-lg"><MapPin className="mt-1 h-5 w-5 text-primary" />{BUSINESS.address}</p>
          <p className="mt-1 pl-7 text-muted-foreground">{BUSINESS.plusCode}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-shine group inline-flex items-center gap-2.5 rounded-sm bg-primary px-6 py-3 font-semibold uppercase tracking-wider text-primary-foreground shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/35 active:translate-y-0 active:scale-[0.98]"
            >
              <Navigation className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <span>ਰਸਤਾ ਦੇਖੋ</span>
            </a>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-sm border-2 border-foreground bg-transparent px-6 py-3 font-semibold uppercase tracking-wider text-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-foreground hover:text-background hover:shadow-md active:translate-y-0 active:scale-[0.98]"
            >
              <span>ਸੰਪਰਕ ਕਰੋ</span>
              <ArrowRight className="h-4 w-4 opacity-70 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
            </Link>
          </div>
        </div>
        <iframe title="ਪੰਜਾਬ ਇੰਟਰਲਾਕ ਟਾਈਲਸ ਗੂਗਲ ਮੈਪ ਲੋਕੇਸ਼ਨ" src={mapEmbedUrl} loading="lazy" className="h-96 w-full border-0 grayscale-[40%]" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </Section>
  );
}

export function QuoteCTA() {
  return (
    <section className="relative overflow-hidden bg-primary px-4 py-20 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-4xl font-bold uppercase text-primary-foreground md:text-6xl">ਕੀ ਤੁਹਾਨੂੰ ਆਪਣੇ ਪ੍ਰੋਜੈਕਟ ਲਈ ਇੰਟਰਲਾਕ ਟਾਈਲਾਂ ਚਾਹੀਦੀਆਂ ਹਨ?</h2>
          <p className="mt-3 max-w-2xl text-primary-foreground/90">ਸਾਨੂੰ ਦੱਸੋ ਤੁਹਾਨੂੰ ਕੀ ਚਾਹੀਦਾ ਹੈ ਅਤੇ ਸਾਡੀ ਟੀਮ ਉਪਲਬਧ ਡਿਜ਼ਾਈਨਾਂ, ਮਾਤਰਾ ਅਤੇ ਰੇਟਾਂ ਵਿੱਚ ਮਦਦ ਕਰੇਗੀ। ਕਾਲ ਜਾਂ ਵਟਸਐਪ ਕਰੋ: <span className="font-bold underline">{BUSINESS.phone}</span>।</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="btn-shine btn-wa-pulse group inline-flex shrink-0 items-center gap-2.5 rounded-sm bg-[#25D366] px-6 py-4 font-semibold uppercase tracking-wider text-white shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#20ba5a] hover:shadow-2xl active:translate-y-0 active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
            <span>ਵਟਸਐਪ</span>
          </a>
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            className="btn-shine group inline-flex shrink-0 items-center gap-2.5 rounded-sm bg-ink px-6 py-4 font-semibold uppercase tracking-wider text-ink-foreground shadow-lg shadow-ink/30 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-ink/90 hover:shadow-2xl hover:shadow-ink/50 active:translate-y-0 active:scale-[0.98]"
          >
            <Phone className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
            <span>ਕਾਲ ਕਰੋ: {BUSINESS.phone}</span>
          </a>
          <Link
            to="/contact"
            className="btn-shine group inline-flex shrink-0 items-center gap-2.5 rounded-sm border-2 border-primary-foreground/50 bg-transparent px-6 py-4 font-semibold uppercase tracking-wider text-primary-foreground transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-primary-foreground hover:text-primary active:translate-y-0 active:scale-[0.98]"
          >
            <span>ਰੇਟ ਪੁੱਛੋ</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
