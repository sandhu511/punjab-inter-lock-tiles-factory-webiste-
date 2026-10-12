import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Instagram, MapPin, Phone, MessageCircle } from "lucide-react";
import { BUSINESS, directionsUrl, whatsappUrl } from "@/lib/business";
import { TopBanner } from "@/components/site/TopBanner";

export { TopBanner };

const NAV = [
  { to: "/", label: "ਮੁੱਖ ਪੰਨਾ", pa: "ਘਰ" },
  { to: "/about", label: "ਸਾਡੇ ਬਾਰੇ", pa: "ਸਾਡੇ ਬਾਰੇ" },
  { to: "/products", label: "ਉਤਪਾਦ", pa: "ਟਾਈਲਾਂ" },
  { to: "/gallery", label: "ਗੈਲਰੀ", pa: "ਗੈਲਰੀ" },
  { to: "/reviews", label: "ਸਮੀਖਿਆਵਾਂ", pa: "ਸਮੀਖਿਆ" },
  { to: "/contact", label: "ਸੰਪਰਕ", pa: "ਸੰਪਰਕ" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="grid h-10 w-10 grid-cols-2 gap-0.5 bg-ink p-1.5" aria-hidden>
        <span className="bg-primary" />
        <span className="bg-ink-muted" />
        <span className="bg-ink-muted" />
        <span className="bg-primary" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-xl font-bold uppercase tracking-wide">
          {BUSINESS.name}
        </span>
        <span className="block font-sans text-xs text-muted-foreground">{BUSINESS.nameEn}</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <TopBanner />
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-bold" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            title={`ਕਾਲ ਕਰੋ ${BUSINESS.phone}`}
            className="group hidden items-center gap-1.5 rounded-sm border border-input px-3 py-2 text-xs font-bold uppercase tracking-wider text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-md hover:shadow-primary/15 active:scale-95 md:inline-flex"
          >
            <Phone className="h-3.5 w-3.5 text-primary transition-transform duration-300 group-hover:scale-110" />
            <span>ਕਾਲ: {BUSINESS.phone}</span>
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            aria-label="ਵਟਸਐਪ 'ਤੇ ਗੱਲਬਾਤ ਕਰੋ"
            title="ਵਟਸਐਪ 'ਤੇ ਗੱਲਬਾਤ ਕਰੋ: 9809299000"
            className="btn-shine btn-wa-pulse group grid h-10 w-10 place-items-center rounded-sm bg-[#25D366] text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20ba5a] hover:shadow-md hover:shadow-[#25D366]/30 active:scale-95"
          >
            <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
          </a>
          {BUSINESS.social.instagram && (
            <a
              href={BUSINESS.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="ਇੰਸਟਾਗ੍ਰਾਮ 'ਤੇ ਫਾਲੋ ਕਰੋ"
              title="ਇੰਸਟਾਗ੍ਰਾਮ 'ਤੇ ਫਾਲੋ ਕਰੋ"
              className="group grid h-10 w-10 place-items-center rounded-sm border border-input text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-md hover:shadow-primary/15 active:scale-95"
            >
              <Instagram className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
            </a>
          )}
          <Link
            to="/contact"
            className="btn-shine hidden rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/35 active:translate-y-0 active:scale-[0.98] active:shadow-xs sm:inline-block"
          >
            ਕੋਟੇਸ਼ਨ ਲਵੋ
          </Link>
          <button
            className="rounded-sm p-2 text-foreground transition-all duration-200 hover:bg-accent active:scale-90 active:bg-accent/80 lg:hidden cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="ਮੀਨੂ ਖੋਲ੍ਹੋ"
          >
            {open ? (
              <X className="h-6 w-6 transition-transform duration-200 rotate-90" />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-200" />
            )}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t bg-background px-4 pb-6 lg:hidden">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b py-4 font-display text-xl uppercase transition-colors hover:text-primary"
            >
              {n.label} <span className="font-pa text-sm text-muted-foreground">{n.pa}</span>
            </Link>
          ))}
          <div className="mt-5 space-y-2.5">
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-sm border border-input py-3 font-semibold uppercase tracking-wider text-foreground transition-all duration-200 hover:border-primary hover:text-primary active:scale-[0.98]"
            >
              <Phone className="h-4 w-4 text-primary" />
              <span>ਕਾਲ ਕਰੋ: {BUSINESS.phone}</span>
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="btn-shine btn-wa-pulse flex items-center justify-center gap-2 rounded-sm bg-[#25D366] py-3 font-semibold uppercase tracking-wider text-white shadow-md active:scale-[0.98]"
            >
              <MessageCircle className="h-5 w-5" />
              <span>ਵਟਸਐਪ 'ਤੇ ਗੱਲ ਕਰੋ</span>
            </a>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-shine block rounded-sm bg-primary py-3.5 text-center font-semibold uppercase tracking-wider text-primary-foreground shadow-md transition-all duration-300 hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]"
            >
              ਕੋਟੇਸ਼ਨ ਲਵੋ
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-3xl font-bold uppercase">{BUSINESS.name}</p>
          <p className="font-sans text-sm text-ink-muted">{BUSINESS.nameEn}</p>
          <p className="mt-4 text-sm text-ink-muted">
            ਗੁਣਵੱਤਾ ਵਾਲੀਆਂ ਇੰਟਰਲਾਕ ਟਾਈਲਾਂ | {BUSINESS.shortAddress}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="text-ink-muted hover:text-ink-foreground">
              {n.label}
            </Link>
          ))}
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="text-ink-muted hover:text-ink-foreground"
          >
            ਰਸਤਾ ਦੇਖੋ
          </a>
        </div>
        <div>
          <p className="flex items-start gap-2 text-sm text-ink-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            {BUSINESS.address}
            <br />
            {BUSINESS.plusCode}
          </p>
          <div className="mt-4 space-y-2 text-sm text-ink-muted">
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="group flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
              <span className="font-semibold">ਕਾਲ: {BUSINESS.phone}</span>
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 transition-colors hover:text-[#25D366]"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <span>ਵਟਸਐਪ: {BUSINESS.phone}</span>
            </a>
          </div>
          {BUSINESS.social.instagram && (
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={BUSINESS.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="ਇੰਸਟਾਗ੍ਰਾਮ 'ਤੇ ਫਾਲੋ ਕਰੋ"
                className="group grid h-10 w-10 place-items-center rounded-sm border border-ink-muted/30 text-ink-muted transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-md hover:shadow-primary/20 active:scale-95"
              >
                <Instagram className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
              </a>
              <a
                href={BUSINESS.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wide text-ink-muted transition-all duration-200 hover:-translate-y-0.5 hover:text-primary active:scale-95"
              >
                <span>{BUSINESS.instagramHandle}</span>
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-ink-muted/20 py-5 text-center text-xs text-ink-muted">
        © 2026 ਪੰਜਾਬ ਇੰਟਰਲਾਕ ਟਾਈਲਸ। ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <aside
      aria-label="ਤੁਰੰਤ ਸੰਪਰਕ"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
    >
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noreferrer"
        aria-label="ਪੰਜਾਬ ਇੰਟਰਲਾਕ ਟਾਈਲਸ ਨਾਲ ਵਟਸਐਪ 'ਤੇ ਗੱਲਬਾਤ ਕਰੋ: 9809299000"
        title="ਵਟਸਐਪ 'ਤੇ ਗੱਲਬਾਤ ਕਰੋ: 9809299000"
        className="btn-shine btn-wa-pulse group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
      >
        <MessageCircle className="h-7 w-7 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
      </a>
    </aside>
  );
}
