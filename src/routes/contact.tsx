import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { MessageCircle, Instagram, Send, Phone } from "lucide-react";
import { Location, PageHero, Section } from "@/components/site/Sections";
import { BUSINESS, PRODUCTS, whatsappUrl } from "@/lib/business";
import { IMG } from "@/lib/images";
import { addLead } from "@/lib/admin-store";

const T = "Contact & Get a Quote | Punjab Interlock Tiles";
const D =
  "Request a quote for interlock tiles in Punjab. Share your tile type, quantity and project location with Punjab Interlock Tiles.";

const schema = z.object({
  name: z.string().trim().min(2, "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਨਾਮ ਦਰਜ ਕਰੋ").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d\s-]{7,15}$/, "ਇੱਕ ਸਹੀ ਫ਼ੋਨ ਨੰਬਰ ਦਰਜ ਕਰੋ"),
  whatsapp: z.string().trim().max(15).optional(),
  tile: z.string().max(100),
  quantity: z.string().trim().max(100),
  location: z.string().trim().max(150),
  message: z.string().trim().max(1000),
});

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>) => ({
    tile: typeof s.tile === "string" ? s.tile : undefined,
  }),
  head: () => ({
    meta: [
      { title: T },
      { name: "description", content: D },
      { property: "og:title", content: T },
      { property: "og:description", content: D },
    ],
  }),
  component: Contact,
});

const input =
  "w-full rounded-sm border border-input bg-background px-4 py-3 outline-none focus:border-primary";

function Contact() {
  const { tile } = Route.useSearch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const wa = whatsappUrl();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const r = schema.safeParse(data);
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setErrors({});
    const v = r.data;
    try {
      addLead({
        name: v.name,
        phone: v.phone,
        whatsapp: v.whatsapp,
        tile: v.tile || "ਆਮ ਪੁੱਛਗਿੱਛ",
        quantity: v.quantity || "-",
        location: v.location || "-",
        message: v.message,
      });
    } catch (err) {
      console.error("Failed to store lead:", err);
    }
    const text = `ਕੋਟੇਸ਼ਨ ਬੇਨਤੀ\nਨਾਮ: ${v.name}\nਫ਼ੋਨ: ${v.phone}\nਵਟਸਐਪ: ${v.whatsapp || "-"}\nਟਾਈਲ: ${v.tile}\nਮਾਤਰਾ: ${v.quantity}\nਸਥਾਨ: ${v.location}\nਸੁਨੇਹਾ: ${v.message}`;
    const url = whatsappUrl(text);
    if (url) window.open(url, "_blank");
    else toast.success("ਧੰਨਵਾਦ! ਤੁਹਾਡੀ ਜਾਣਕਾਰੀ ਤਿਆਰ ਹੈ।");
  }

  return (
    <>
      <PageHero
        title="ਕੋਟੇਸ਼ਨ / ਰੇਟ ਪੁੱਛੋ"
        pa="ਸੰਪਰਕ ਕਰੋ"
        sub="ਸਾਨੂੰ ਦੱਸੋ ਤੁਹਾਨੂੰ ਕੀ ਚਾਹੀਦਾ ਹੈ ਅਤੇ ਸਾਡੀ ਟੀਮ ਉਪਲਬਧ ਡਿਜ਼ਾਈਨਾਂ, ਮਾਤਰਾ ਅਤੇ ਵਧੀਆ ਰੇਟਾਂ ਵਿੱਚ ਮਦਦ ਕਰੇਗੀ।"
        img={IMG.install}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <form
            onSubmit={onSubmit}
            className="grid gap-5 border bg-card p-6 md:grid-cols-2 md:p-10"
            noValidate
          >
            <h2 className="font-display text-4xl font-bold uppercase md:col-span-2">
              ਕੀ ਤੁਹਾਨੂੰ ਆਪਣੇ ਪ੍ਰੋਜੈਕਟ ਲਈ ਇੰਟਰਲਾਕ ਟਾਈਲਾਂ ਚਾਹੀਦੀਆਂ ਹਨ?
            </h2>
            <Field label="ਪੂਰਾ ਨਾਮ" pa="Full Name" error={errors.name}>
              <input name="name" className={input} />
            </Field>
            <Field label="ਫ਼ੋਨ ਨੰਬਰ" pa="Phone Number" error={errors.phone}>
              <input name="phone" type="tel" className={input} />
            </Field>
            <Field label="ਵਟਸਐਪ ਨੰਬਰ" pa="WhatsApp Number">
              <input name="whatsapp" type="tel" className={input} />
            </Field>
            <Field label="ਟਾਈਲ ਦੀ ਕਿਸਮ" pa="Product / Tile Type">
              <select name="tile" defaultValue={tile ?? ""} className={input}>
                <option value="">ਹਾਲੇ ਨਿਸ਼ਚਿਤ ਨਹੀਂ (Not sure yet)</option>
                {PRODUCTS.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="ਲੋੜੀਂਦੀ ਮਾਤਰਾ" pa="Required Quantity">
              <input name="quantity" placeholder="ਜਿਵੇਂ 1000 ਵਰਗ ਫੁੱਟ" className={input} />
            </Field>
            <Field label="ਪ੍ਰੋਜੈਕਟ ਦਾ ਸਥਾਨ" pa="Project Location">
              <input name="location" placeholder="ਜਿਵੇਂ ਬਠਿੰਡਾ, ਪੰਜਾਬ" className={input} />
            </Field>
            <div className="md:col-span-2">
              <Field label="ਸੁਨੇਹਾ" pa="Message">
                <textarea
                  name="message"
                  rows={4}
                  placeholder="ਆਪਣੇ ਪ੍ਰੋਜੈਕਟ ਬਾਰੇ ਕੋਈ ਹੋਰ ਜਾਣਕਾਰੀ ਲਿਖੋ..."
                  className={input}
                />
              </Field>
            </div>
            <button
              type="submit"
              className="btn-shine group inline-flex items-center justify-center gap-2.5 rounded-sm bg-primary py-4 font-semibold uppercase tracking-wider text-primary-foreground shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/35 active:translate-y-0 active:scale-[0.99] cursor-pointer md:col-span-2"
            >
              <span>ਕੋਟੇਸ਼ਨ ਲਈ ਬੇਨਤੀ ਭੇਜੋ</span>
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </button>
          </form>
          <aside className="space-y-6">
            <div className="bg-ink p-8 text-ink-foreground">
              <MessageCircle className="h-10 w-10 text-primary" />
              <h3 className="mt-4 font-display text-3xl font-bold uppercase">
                ਵਟਸਐਪ 'ਤੇ ਗੱਲਬਾਤ ਕਰੋ
              </h3>
              <p className="mt-2 text-ink-muted">
                ਡਿਜ਼ਾਈਨ, ਉਪਲਬਧਤਾ ਅਤੇ ਕੀਮਤਾਂ ਬਾਰੇ ਤੁਰੰਤ ਜਵਾਬ ਪ੍ਰਾਪਤ ਕਰੋ।
              </p>
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-shine btn-wa-pulse group mt-6 flex items-center justify-center gap-2.5 rounded-sm bg-[#25D366] py-3.5 text-center font-semibold uppercase tracking-wider text-white shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#20ba5a] hover:shadow-xl hover:shadow-[#25D366]/40 active:translate-y-0 active:scale-[0.98]"
                >
                  <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <span>ਵਟਸਐਪ 'ਤੇ ਗੱਲਬਾਤ ਕਰੋ</span>
                </a>
              ) : (
                <p className="mt-6 rounded-sm border border-ink-muted/30 py-3 text-center text-sm text-ink-muted">
                  WhatsApp number coming soon
                </p>
              )}
            </div>
            <div className="border bg-card p-8">
              <p className="font-display text-2xl font-bold uppercase">{BUSINESS.name}</p>
              <p className="font-pa text-muted-foreground">{BUSINESS.namePa}</p>
              <p className="mt-4">{BUSINESS.address}</p>
              <p className="text-sm text-muted-foreground">{BUSINESS.plusCode}</p>
              <div className="mt-5 border-t pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  ਕਾਲ ਅਤੇ ਵਟਸਐਪ
                </p>
                <div className="mt-2 space-y-2">
                  <a
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="group flex items-center gap-2.5 rounded-sm border border-input bg-background px-4 py-3 text-base font-bold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-md hover:shadow-primary/15 active:scale-95"
                  >
                    <Phone className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                    <span>ਕਾਲ ਕਰੋ: {BUSINESS.phone}</span>
                  </a>
                  <a
                    href={wa || undefined}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2.5 rounded-sm border border-input bg-background px-4 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-[#25D366] hover:text-[#25D366] hover:shadow-md hover:shadow-[#25D366]/15 active:scale-95"
                  >
                    <MessageCircle className="h-4 w-4 text-[#25D366] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    <span>ਵਟਸਐਪ: {BUSINESS.phone}</span>
                  </a>
                </div>
              </div>
              {BUSINESS.social.instagram && (
                <div className="mt-5 border-t pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    ਇੰਸਟਾਗ੍ਰਾਮ
                  </p>
                  <a
                    href={BUSINESS.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-2 inline-flex items-center gap-2 rounded-sm border border-input bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-md hover:shadow-primary/15 active:scale-95"
                  >
                    <Instagram className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                    <span>{BUSINESS.instagramHandle}</span>
                  </a>
                </div>
              )}
            </div>
          </aside>
        </div>
      </Section>
      <Location />
    </>
  );
}

function Field({
  label,
  pa,
  error,
  children,
}: {
  label: string;
  pa: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline gap-2 text-sm font-semibold">
        {label}
        <span className="font-pa text-xs font-normal text-muted-foreground">{pa}</span>
      </span>
      {children}
      {error && <span className="mt-1 block text-sm text-destructive">{error}</span>}
    </label>
  );
}
