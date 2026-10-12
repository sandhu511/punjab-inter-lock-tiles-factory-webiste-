import { createFileRoute } from "@tanstack/react-router";
import { PageHero, QuoteCTA, ReviewsBlock } from "@/components/site/Sections";
import { IMG } from "@/lib/images";

const T = "Customer Reviews — 5.0 Rated | Punjab Interlock Tiles";
const D = "Punjab Interlock Tiles is rated 5.0 on Google by customers. Read what they say about our interlock tiles and prices.";

export const Route = createFileRoute("/reviews")({
  head: () => ({ meta: [{ title: T }, { name: "description", content: D }, { property: "og:title", content: T }, { property: "og:description", content: D }] }),
  component: () => (
    <>
      <PageHero title="ਗਾਹਕਾਂ ਦੀਆਂ ਸਮੀਖਿਆਵਾਂ" pa="ਗੂਗਲ ਰੇਟਿੰਗ 5.0" sub="ਸਾਡੇ ਸੰਤੁਸ਼ਟ ਗਾਹਕਾਂ ਵੱਲੋਂ ਗੂਗਲ 'ਤੇ 5.0 ਸਟਾਰ ਰੇਟਿੰਗ ਅਤੇ ਸ਼ਾਨਦਾਰ ਪ੍ਰਤੀਕਰਮ।" img={IMG.courtyard} />
      <ReviewsBlock />
      <QuoteCTA />
    </>
  ),
});
