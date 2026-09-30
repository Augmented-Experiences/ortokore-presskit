import { readFileSync } from "node:fs";
import path from "node:path";
import { PressKit } from "@/components/press-kit";
import { BIO_FILES, LOCALES, type Bios, type Locale } from "@/content/copy";

function loadBios(): Bios {
  const bios = { es: null, en: null, nl: null } as Bios;
  for (const locale of LOCALES) {
    bios[locale] = readBio(locale);
  }
  return bios;
}

function readBio(locale: Locale): string | null {
  try {
    const file = path.join(process.cwd(), "public", "bios", BIO_FILES[locale]);
    const text = readFileSync(file, "utf8").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    const trimmed = text.endsWith("\n") ? text.slice(0, -1) : text;
    return trimmed.length > 0 ? trimmed : null;
  } catch {
    return null;
  }
}

export default function Page() {
  return <PressKit bios={loadBios()} />;
}
