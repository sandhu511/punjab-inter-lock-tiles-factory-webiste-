import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowRight, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { IMG } from "@/lib/images";
import {
  AboutBlock, Applications, Heading, Location, Process, ProductGrid, Quality, QuoteCTA, ReviewsBlock, Section, Stars, WhyUs,
} from "@/components/site/Sections";

const TITLE = "Punjab Interlock Tiles | Quality Interlock Tiles in Punjab";
const DESC = "Punjab Interlock Tiles in Gehri Buttar, Sangat Kalan, Punjab — quality interlock tiles and paving solutions for homes, driveways, parking areas and commercial projects.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "Punjab Interlock Tiles, Interlock Tiles in Punjab, Interlock Tiles in Sangat Kalan, Interlock Tiles in Bathinda, Interlock Tile Manufacturer Punjab, Paver Blocks Punjab, Interlock Pavers Punjab, Concrete Interlock Tiles, Interlock Tiles Gehri Buttar" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "LocalBusiness", name: BUSINESS.name, alternateName: BUSINESS.namePa,
        telephone: BUSINESS.phone,
        address: { "@type": "PostalAddress", addressLocality: "Gehri Buttar, Sangat Kalan", addressRegion: "Punjab", postalCode: "151401", addressCountry: "IN" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: 7 },
      }),
    }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-ink">
        <img src={IMG.hero} alt="Punjab Interlock Tiles manufacturing facility and yard in Punjab" width={1920} height={1088} className="slowzoom absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-32 md:px-8 md:pb-24">
          <div className="reveal inline-flex items-center gap-2 bg-background/10 px-3 py-1.5 text-sm text-ink-foreground backdrop-blur">
            <Stars /> <span>ਗਾਹਕਾਂ ਵੱਲੋਂ 5.0 ਰੇਟਿੰਗ</span>
          </div>
          <p className="reveal mt-6 font-pa text-2xl font-bold text-black tracking-wide">{BUSINESS.namePa}</p>
          <h1 className="reveal mt-2 max-w-4xl font-display text-5xl font-bold uppercase leading-[1.05] text-ink-foreground md:text-8xl">
            ਮਜ਼ਬੂਤ ਅਤੇ ਸੁੰਦਰ ਥਾਵਾਂ ਲਈ ਪ੍ਰੀਮੀਅਮ ਇੰਟਰਲਾਕ ਟਾਈਲਾਂ
          </h1>
          <p className="reveal mt-6 max-w-2xl text-lg text-ink-foreground/85">
            ਟਿਕਾਊਪਨ, ਬੇਮਿਸਾਲ ਮਜ਼ਬੂਤੀ, ਸ਼ਾਨਦਾਰ ਫਿਨਿਸ਼ਿੰਗ ਅਤੇ ਲੰਬੇ ਸਮੇਂ ਤੱਕ ਚੱਲਣ ਵਾਲੇ ਫਰਸ਼ਾਂ ਲਈ ਉੱਚ-ਗੁਣਵੱਤਾ ਵਾਲੀਆਂ ਇੰਟਰਲਾਕ ਟਾਈਲਾਂ।
          </p>
          <div className="reveal mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="group btn-shine btn-pulse inline-flex items-center gap-3 rounded-sm bg-primary px-8 py-4 font-semibold uppercase tracking-wider text-primary-foreground transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-primary/95 hover:shadow-2xl hover:shadow-primary/50 active:translate-y-0 active:scale-[0.98]"
            >
              <span>ਕੋਟੇਸ਼ਨ / ਰੇਟ ਪੁੱਛੋ</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="btn-shine group inline-flex items-center gap-2.5 rounded-sm border-2 border-primary/90 bg-primary/20 px-6 py-4 font-semibold uppercase tracking-wider text-primary-foreground backdrop-blur-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground hover:shadow-xl hover:shadow-primary/40 active:translate-y-0 active:scale-[0.98]"
            >
              <Phone className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
              <span>ਕਾਲ ਕਰੋ: {BUSINESS.phone}</span>
            </a>
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 rounded-sm border-2 border-ink-foreground/70 bg-transparent px-8 py-4 font-semibold uppercase tracking-wider text-ink-foreground backdrop-blur-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:border-ink-foreground hover:bg-ink-foreground hover:text-ink hover:shadow-xl hover:shadow-black/30 active:translate-y-0 active:scale-[0.98]"
            >
              <span>ਸਾਡੀਆਂ ਟਾਈਲਾਂ ਦੇਖੋ</span>
              <ArrowRight className="h-4 w-4 opacity-70 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
            </Link>
          </div>
          <p className="reveal mt-8 flex items-center gap-2 text-sm text-ink-muted"><MapPin className="h-4 w-4" />{BUSINESS.shortAddress}</p>
        </div>
      </section>
      <AboutBlock />
      <Section className="bg-card">
        <Heading eyebrow="ਉਤਪਾਦ" title="ਸਾਡੀਆਂ ਇੰਟਰਲਾਕ ਟਾਈਲਾਂ" pa="ਸਾਡਾ ਸੰਗ੍ਰਹਿ" />
        <ProductGrid />
      </Section>
      <WhyUs />
      <Applications />
      <Quality />
      <ReviewsBlock />
      <Process />
      <Location />
      <QuoteCTA />
    </>
  );
}
