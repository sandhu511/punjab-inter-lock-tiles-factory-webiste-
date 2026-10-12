export const BUSINESS = {
  name: "ਪੰਜਾਬ ਇੰਟਰਲਾਕ ਟਾਈਲਸ",
  nameEn: "Punjab Interlock Tiles",
  namePa: "ਪੰਜਾਬ ਇੰਟਰਲਾਕ ਟਾਈਲਸ",
  address: "ਗਹਿਰੀ ਬੁੱਟਰ, ਸੰਗਤ ਕਲਾਂ, ਪੰਜਾਬ 151401",
  shortAddress: "ਗਹਿਰੀ ਬੁੱਟਰ, ਸੰਗਤ ਕਲਾਂ, ਪੰਜਾਬ",
  plusCode: "3VQF+4Q Gehri Buttar, Punjab",
  rating: "5.0",
  reviewCount: 7,
  phone: "+91 98092 99000",
  phoneRaw: "+919809299000",
  whatsapp: "919809299000",
  whatsappDisplay: "+91 98092 99000",
  mapsQuery: "3VQF+4Q Gehri Buttar, Punjab 151401",
  social: {
    instagram: "https://www.instagram.com/punjab_interlocking_tiles/",
  },
  instagramHandle: "@punjab_interlocking_tiles",
};

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BUSINESS.mapsQuery)}`;
export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.mapsQuery)}&output=embed`;
export const whatsappUrl = (text = "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ, ਮੈਨੂੰ ਇੰਟਰਲਾਕ ਟਾਈਲਾਂ ਬਾਰੇ ਜਾਣਕਾਰੀ ਅਤੇ ਰੇਟ ਚਾਹੀਦੇ ਹਨ।") =>
  BUSINESS.whatsapp ? `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}` : "";

export const PRODUCTS = [
  { id: "paver", name: "ਇੰਟਰਲਾਕ ਪੇਵਰ ਟਾਈਲਾਂ", nameEn: "Interlock Paver Tiles", pa: "ਇੰਟਰਲਾਕ ਪੇਵਰ ਟਾਈਲ", desc: "ਘਰਾਂ ਦੇ ਡਰਾਈਵ-ਵੇਅ, ਵਿਹੜਿਆਂ ਅਤੇ ਬਾਹਰੀ ਥਾਵਾਂ ਲਈ ਉੱਚ ਮਜ਼ਬੂਤੀ ਅਤੇ ਹੰਢਣਸਾਰ ਪੇਵਿੰਗ ਟਾਈਲਾਂ।" },
  { id: "designer", name: "ਡਿਜ਼ਾਈਨਰ ਇੰਟਰਲਾਕ ਟਾਈਲਾਂ", nameEn: "Designer Interlock Tiles", pa: "ਡਿਜ਼ਾਈਨਰ ਟਾਈਲ", desc: "ਸ਼ਾਨਦਾਰ ਦਿੱਖ ਅਤੇ ਪ੍ਰੀਮੀਅਮ ਸਜਾਵਟ ਲਈ ਆਧੁਨਿਕ ਪੈਟਰਨਾਂ ਅਤੇ ਆਕਰਸ਼ਕ ਫਿਨਿਸ਼ਿੰਗ ਵਾਲੀਆਂ ਟਾਈਲਾਂ।" },
  { id: "heavy", name: "ਹੈਵੀ-ਡਿਊਟੀ ਪੇਵਰ ਟਾਈਲਾਂ", nameEn: "Heavy-Duty Paver Tiles", pa: "ਹੈਵੀ-ਡਿਊਟੀ ਟਾਈਲ", desc: "ਭਾਰੀ ਵਾਹਨਾਂ, ਟਰੱਕਾਂ ਅਤੇ ਵਪਾਰਕ ਖੇਤਰਾਂ ਲਈ ਵਿਸ਼ੇਸ਼ ਤਾਕਤ ਅਤੇ ਮਜ਼ਬੂਤੀ ਨਾਲ ਤਿਆਰ ਕੀਤੀਆਂ ਟਾਈਲਾਂ।" },
  { id: "outdoor", name: "ਆਊਟਡੋਰ ਫਲੋਰਿੰਗ ਟਾਈਲਾਂ", nameEn: "Outdoor Flooring Tiles", pa: "ਆਊਟਡੋਰ ਫਲੋਰਿੰਗ", desc: "ਘਰਾਂ, ਦੁਕਾਨਾਂ, ਫਾਰਮ ਹਾਊਸਾਂ ਅਤੇ ਖੁੱਲ੍ਹੇ ਰਸਤਿਆਂ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਅਤੇ ਟਿਕਾਊ ਟਾਈਲਾਂ।" },
] as const;
