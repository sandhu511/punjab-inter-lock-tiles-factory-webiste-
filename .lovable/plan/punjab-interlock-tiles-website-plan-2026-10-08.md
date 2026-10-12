# Punjab Interlock Tiles — Website Plan

## Visual direction
Industrial-premium: warm concrete greys, off-white "cement" background, charcoal dark sections, one accent of burnt terracotta (brick-red) for buttons. Headings in a strong condensed display font (Archivo / Barlow Condensed), body in Hind (also supports Gurmukhi via Noto Sans Gurmukhi for Punjabi text). Subtle concrete grain texture, sharp cards, minimal rounding, gentle fade/zoom reveals.

## Pages (each with its own title/description for local SEO)
- **Home (/)** — hero (headline, Get a Quote / View Our Tiles, 5.0 badge, location), short about, product preview, why choose us, applications, quality (dark section), reviews, process timeline, location + quote CTA.
- **About (/about)** — "Built for Strength. Designed for Quality." + 6 highlights, quality section.
- **Products (/products)** — 4 product cards (Paver, Designer, Heavy-Duty, Outdoor Flooring), "Contact us for available sizes, designs and pricing", Enquire Now buttons linking to the quote form with tile type pre-selected. Applications grid.
- **Gallery (/gallery)** — masonry gallery, images kept in one easy-to-edit list for replacing with real photos.
- **Reviews (/reviews)** — 5.0 / 7 Google reviews, only the two genuine reviews (Charanjeet Singh, Balraj Singh), CTA.
- **Contact (/contact)** — quote form (all 7 fields, validated), Chat on WhatsApp button, location card with embedded Google Map (Gehri Buttar plus code), Get Directions.

## Shared
- Sticky nav: logo (EN + Punjabi name) | links | Get a Quote; hamburger on mobile.
- Footer: names, tagline, links, placeholder social icons, © 2026.
- Punjabi + English: bilingual headings/labels shown together (English primary, Punjabi subline) — no toggle.

## Honest placeholders
- Phone / WhatsApp number left in one settings spot; WhatsApp button and form show "number coming soon" until added. Form submission opens WhatsApp/email-free summary for now (no backend) — can connect to Lovable Cloud later to store enquiries.
- No invented specs, prices, stats, certifications or extra reviews.

## Images
Generate ~10 realistic photos: hero driveway, factory/manufacturing, tile close-ups, 4 product types, applications (driveway, parking, courtyard, garden path, shop front), used across sections and the gallery.

## Technical details
- TanStack routes: index, about, products, gallery, reviews, contact; shared Header/Footer in __root; head() per route with LocalBusiness JSON-LD on home.
- Design tokens in styles.css (oklch), fonts via link tags.
- Business info (name, address, plus code, phone placeholders, map URL) centralized in `src/lib/business.ts`.
