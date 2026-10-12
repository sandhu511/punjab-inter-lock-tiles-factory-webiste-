import { createFileRoute } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { PageHero, QuoteCTA, Section } from "@/components/site/Sections";
import { GALLERY, IMG } from "@/lib/images";
import { BUSINESS } from "@/lib/business";

const T = "Gallery — Our Work & Products | Punjab Interlock Tiles";
const D = "Photos of interlock tile designs, installed driveways, outdoor flooring and manufacturing at Punjab Interlock Tiles.";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [{ title: T }, { name: "description", content: D }, { property: "og:title", content: T }, { property: "og:description", content: D }] }),
  component: () => (
    <>
      <PageHero title="ਸਾਡਾ ਕੰਮ ਅਤੇ ਤਸਵੀਰਾਂ" pa="ਗੈਲਰੀ" sub="ਟਾਈਲ ਡਿਜ਼ਾਈਨ, ਫਿਟਿੰਗ ਅਤੇ ਤਿਆਰ ਸਤਹਾਂ ਦੀਆਂ ਅਸਲ ਤਸਵੀਰਾਂ।" img={IMG.garden} />
      <Section>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {GALLERY.map((g, i) => (
            <figure key={i} className="group relative mb-4 break-inside-avoid overflow-hidden bg-ink">
              <img src={g.src} alt={g.label} loading="lazy" className={`w-full object-cover transition duration-700 group-hover:scale-105 ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`} />
              <figcaption className="absolute bottom-0 left-0 bg-ink/80 px-4 py-2 text-sm font-medium uppercase tracking-wider text-ink-foreground">{g.label}</figcaption>
            </figure>
          ))}
        </div>
        {BUSINESS.social.instagram && (
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-sm border bg-card p-6 text-center sm:flex-row sm:text-left">
            <div>
              <p className="font-display text-2xl font-bold uppercase">ਸਾਡਾ ਰੋਜ਼ਾਨਾ ਕੰਮ ਇੰਸਟਾਗ੍ਰਾਮ 'ਤੇ ਦੇਖੋ</p>
              <p className="font-pa text-xs text-muted-foreground">ਨਵੇਂ ਡਿਜ਼ਾਈਨ ਅਤੇ ਕੰਮ ਦੀਆਂ ਤਸਵੀਰਾਂ ਦੇਖਣ ਲਈ ਇੰਸਟਾਗ੍ਰਾਮ ਫਾਲੋ ਕਰੋ</p>
            </div>
            <a
              href={BUSINESS.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="btn-shine group inline-flex shrink-0 items-center gap-2.5 rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/35 active:translate-y-0 active:scale-[0.98]"
            >
              <Instagram className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <span>ਇੰਸਟਾਗ੍ਰਾਮ 'ਤੇ ਫਾਲੋ ਕਰੋ {BUSINESS.instagramHandle}</span>
            </a>
          </div>
        )}
      </Section>
      <QuoteCTA />
    </>
  ),
});
