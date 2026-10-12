import { createFileRoute } from "@tanstack/react-router";
import { Applications, Heading, PageHero, ProductGrid, QuoteCTA, Section } from "@/components/site/Sections";
import { IMG } from "@/lib/images";

const T = "Interlock Tiles & Paver Blocks | Punjab Interlock Tiles";
const D = "Interlock paver tiles, designer tiles, heavy-duty pavers and outdoor flooring tiles from Punjab Interlock Tiles, Sangat Kalan.";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title: T }, { name: "description", content: D }, { property: "og:title", content: T }, { property: "og:description", content: D }] }),
  component: () => (
    <>
      <PageHero title="ਸਾਡੀਆਂ ਇੰਟਰਲਾਕ ਟਾਈਲਾਂ" pa="ਉਤਪਾਦ" sub="ਉਪਲਬਧ ਸਾਈਜ਼ਾਂ, ਨਵੇਂ ਡਿਜ਼ਾਈਨਾਂ ਅਤੇ ਵਧੀਆ ਰੇਟਾਂ ਲਈ ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।" img={IMG.designer} />
      <Section>
        <Heading eyebrow="ਉਤਪਾਦ" title="ਸਾਡੀਆਂ ਇੰਟਰਲਾਕ ਟਾਈਲਾਂ" pa="ਸਾਡਾ ਸੰਗ੍ਰਹਿ" />
        <ProductGrid />
      </Section>
      <Applications />
      <QuoteCTA />
    </>
  ),
});
