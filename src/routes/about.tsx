import { createFileRoute } from "@tanstack/react-router";
import { AboutBlock, PageHero, Process, Quality, QuoteCTA, WhyUs } from "@/components/site/Sections";
import { IMG } from "@/lib/images";

const T = "About Us | Punjab Interlock Tiles, Gehri Buttar";
const D = "Interlock tile manufacturer in Gehri Buttar, Sangat Kalan, Punjab producing durable, attractive paving tiles for homes and businesses.";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: T }, { name: "description", content: D }, { property: "og:title", content: T }, { property: "og:description", content: D }] }),
  component: () => (
    <>
      <PageHero title="ਸਾਡੇ ਬਾਰੇ" pa="Punjab Interlock Tiles" sub="ਪੰਜਾਬ ਭਰ ਦੇ ਗਾਹਕਾਂ ਲਈ ਭਰੋਸੇਮੰਦ ਅਤੇ ਉੱਚ-ਗੁਣਵੱਤਾ ਵਾਲੀਆਂ ਇੰਟਰਲਾਕ ਟਾਈਲਾਂ ਦੇ ਨਿਰਮਾਤਾ।" img={IMG.factory} />
      <AboutBlock />
      <Quality />
      <WhyUs />
      <Process />
      <QuoteCTA />
    </>
  ),
});
