import { useState, useEffect, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import {
  Phone,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Truck,
  Star,
  ShieldCheck,
} from "lucide-react";
import { BUSINESS, whatsappUrl } from "@/lib/business";
import { getStoredAnnouncements, type StoredAnnouncement } from "@/lib/admin-store";

export function TopBanner() {
  const [items, setItems] = useState<StoredAnnouncement[]>(() => {
    return getStoredAnnouncements().filter((a) => a.isActive);
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  // Sync with admin changes
  useEffect(() => {
    function load() {
      const active = getStoredAnnouncements().filter((a) => a.isActive);
      setItems(active.length > 0 ? active : getStoredAnnouncements());
    }
    load();
    window.addEventListener("announcements_updated", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("announcements_updated", load);
      window.removeEventListener("storage", load);
    };
  }, []);

  const count = items.length;

  const nextSlide = useCallback(() => {
    if (count === 0) return;
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % count);
  }, [count]);

  const prevSlide = useCallback(() => {
    if (count === 0) return;
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Auto cycle every 5.5s
  useEffect(() => {
    if (isPaused || !isVisible || count <= 1) return;
    const interval = setInterval(nextSlide, 5500);
    return () => clearInterval(interval);
  }, [isPaused, isVisible, nextSlide, count]);

  if (!isVisible || count === 0) return null;

  const current = items[currentIndex % count] || items[0];
  const Icon = Sparkles;

  return (
    <div
      role="region"
      aria-label="ਘੋਸ਼ਣਾ ਬੈਨਰ"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative z-50 border-b border-primary/25 bg-gradient-to-r from-ink via-[#271d1a] to-ink text-ink-foreground transition-all duration-300"
    >
      <div className="mx-auto flex min-h-[42px] max-w-7xl items-center justify-between px-3 py-1.5 text-xs sm:px-6 sm:py-2">
        {/* Left: Previous Navigation arrow */}
        <button
          onClick={prevSlide}
          aria-label="ਪਿਛਲੀ ਘੋਸ਼ਣਾ"
          title="ਪਿਛਲੀ ਘੋਸ਼ਣਾ"
          className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-sm text-ink-muted transition-colors hover:bg-white/10 hover:text-white md:inline-flex cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Center: Dynamic Announcement with icon and badge */}
        <div className="flex flex-1 items-center justify-center overflow-hidden px-1 sm:px-4">
          <div
            key={current.id}
            className={`flex flex-wrap items-center justify-center gap-2 text-center transition-all duration-300 ${
              direction === "next" ? "banner-slide-next" : "banner-slide-prev"
            }`}
          >
            {/* Pulsing Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-sm bg-primary/20 px-2 py-0.5 font-display text-[11px] font-bold uppercase tracking-wider text-primary border border-primary/40 shadow-xs">
              <Icon className="h-3 w-3 animate-pulse text-primary" />
              <span>{current.badge}</span>
            </span>

            {/* Announcement Message */}
            <span className="font-pa text-xs font-medium text-ink-foreground/95 md:text-[13px]">
              {current.text}
            </span>

            {/* Highlighted keyword */}
            {current.highlightText && (
              <span className="hidden rounded-xs bg-white/10 px-1.5 py-0.2 font-display text-[10px] font-semibold uppercase tracking-wider text-primary-foreground sm:inline-block">
                {current.highlightText}
              </span>
            )}

            {/* In-Banner Quick Link */}
            {current.actionLabel &&
              current.actionUrl &&
              (current.isExternal ? (
                <a
                  href={current.actionUrl}
                  className="font-display font-bold uppercase tracking-wider text-primary underline underline-offset-4 transition-colors hover:text-primary-foreground text-[11px] ml-1"
                >
                  {current.actionLabel} &rarr;
                </a>
              ) : (
                <Link
                  to={current.actionUrl}
                  className="font-display font-bold uppercase tracking-wider text-primary underline underline-offset-4 transition-colors hover:text-primary-foreground text-[11px] ml-1"
                >
                  {current.actionLabel} &rarr;
                </Link>
              ))}
          </div>
        </div>

        {/* Right side: Next arrow, Quick Call / WhatsApp CTAs, Dismiss */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Next Navigation arrow */}
          <button
            onClick={nextSlide}
            aria-label="ਅਗਲੀ ਘੋਸ਼ਣਾ"
            title="ਅਗਲੀ ਘੋਸ਼ਣਾ"
            className="hidden h-7 w-7 items-center justify-center rounded-sm text-ink-muted transition-colors hover:bg-white/10 hover:text-white md:inline-flex cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Quick Call Button */}
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            title={`ਕਾਲ ਕਰੋ ${BUSINESS.phone}`}
            className="group hidden items-center gap-1 rounded-sm bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white transition-all duration-200 hover:bg-primary hover:text-white sm:inline-flex"
          >
            <Phone className="h-3 w-3 text-primary transition-transform group-hover:scale-110 group-hover:text-white" />
            <span className="font-display uppercase tracking-wider">{BUSINESS.phone}</span>
          </a>

          {/* Quick WhatsApp Pill */}
          <a
            href={whatsappUrl("ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ, ਮੈਨੂੰ ਬੈਨਰ ਆਫਰ ਬਾਰੇ ਜਾਣਕਾਰੀ ਅਤੇ ਰੇਟ ਚਾਹੀਦੇ ਹਨ।")}
            target="_blank"
            rel="noreferrer"
            aria-label="ਵਟਸਐਪ 'ਤੇ ਆਫਰ ਪੁੱਛੋ"
            title="ਵਟਸਐਪ 'ਤੇ ਆਫਰ ਪੁੱਛੋ"
            className="btn-shine inline-flex items-center gap-1 rounded-sm bg-[#25D366] px-2 py-1 text-[11px] font-bold text-white shadow-xs transition-all duration-200 hover:bg-[#20ba5a] hover:scale-105 active:scale-95"
          >
            <MessageCircle className="h-3 w-3" />
            <span className="hidden sm:inline font-display uppercase tracking-wider">ਵਟਸਐਪ</span>
          </a>

          {/* Dismiss Button */}
          <button
            onClick={() => setIsVisible(false)}
            aria-label="ਬੈਨਰ ਬੰਦ ਕਰੋ"
            title="ਬੈਨਰ ਬੰਦ ਕਰੋ"
            className="grid h-6 w-6 place-items-center rounded-sm text-ink-muted transition-colors hover:bg-white/10 hover:text-white active:scale-95 cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
