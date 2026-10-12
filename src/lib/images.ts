import hero from "@/assets/hero.png";
import driveway from "@/assets/driveway.jpg";
import factory from "@/assets/factory.jpg";
import closeup from "@/assets/closeup.jpg";
import designer from "@/assets/designer.jpg";
import parking from "@/assets/parking.jpg";
import garden from "@/assets/garden.jpg";
import courtyard from "@/assets/courtyard.jpg";
import install from "@/assets/install.jpg";
import plant from "@/assets/plant.jpg";
import yard from "@/assets/yard.jpg";

export const IMG = { hero, driveway, factory, closeup, designer, parking, garden, courtyard, install, plant, yard };

export const PRODUCT_IMG: Record<string, string> = {
  paver: closeup,
  designer,
  heavy: parking,
  outdoor: courtyard,
};

export const GALLERY = [
  { src: hero, label: "ਪੰਜਾਬ ਇੰਟਰਲਾਕ ਟਾਈਲਸ ਓਪਨ ਯਾਰਡ" },
  { src: factory, label: "ਮੈਨੂਫੈਕਚਰਿੰਗ ਪਲਾਂਟ ਅਤੇ ਟਾਈਲਾਂ ਦਾ ਸਟਾਕ" },
  { src: driveway, label: "ਡਰਾਈਵ-ਵੇਅ ਇੰਸਟਾਲੇਸ਼ਨ" },
  { src: designer, label: "ਡਿਜ਼ਾਈਨਰ ਪੈਟਰਨ" },
  { src: install, label: "ਟਾਈਲ ਲਗਾਉਣ ਦਾ ਕੰਮ" },
  { src: closeup, label: "ਟਾਈਲ ਕੁਆਲਿਟੀ ਅਤੇ ਫਿਨਿਸ਼ਿੰਗ" },
  { src: garden, label: "ਬਗੀਚੇ ਦਾ ਰਸਤਾ" },
  { src: parking, label: "ਵਪਾਰਕ ਪਾਰਕਿੰਗ ਖੇਤਰ" },
  { src: courtyard, label: "ਆਊਟਡੋਰ ਫਲੋਰਿੰਗ" },
];
