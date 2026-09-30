import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fontkit from "@pdf-lib/fontkit";
import { PDFArray, PDFDocument, PDFName, PDFString, rgb, type PDFFont, type PDFImage, type PDFPage } from "pdf-lib";
import {
  BIO_FILES,
  LANGUAGE_NAME,
  LOCALES,
  PRESS_PDFS,
  presenceLinks,
  ui,
  type Locale,
} from "../src/content/copy";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 52;
const BOTTOM = 46;
const black = rgb(0, 0, 0);
const white = rgb(1, 1, 1);
const ink = rgb(0.12, 0.12, 0.12);

const fonts = {
  sansBold: "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
  serif: "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf",
  serifItalic: "/usr/share/fonts/truetype/liberation/LiberationSerif-Italic.ttf",
  mono: "/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf",
};

function loadBio(locale: Locale): string {
  const file = path.join(root, "public", "bios", BIO_FILES[locale]);
  const text = readFileSync(file, "utf8").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const trimmed = text.endsWith("\n") ? text.slice(0, -1) : text;
  if (!trimmed) throw new Error(`Empty biography for ${locale}`);
  return trimmed;
}

function whiteLogoPng(): Uint8Array {
  const out = "/tmp/ortokore-press-logo-white.png";
  execFileSync("python3", [
    "-c",
    `
from PIL import Image
im = Image.open(${JSON.stringify(path.join(root, "public/brand/ortokore-logo.png"))}).convert("RGBA")
px = im.load()
w, h = im.size
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        px[x, y] = (255, 255, 255, a)
im = im.crop(im.getbbox())
im.thumbnail((320, 320), Image.Resampling.LANCZOS)
im.save(${JSON.stringify(out)})
`,
  ]);
  return new Uint8Array(readFileSync(out));
}

function wrap(font: PDFFont, text: string, size: number, maxW: number): string[] {
  const words = text.split(/\s+/).filter((word) => word.length > 0);
  const lines: string[] = [];
  let line = "";
  const pushLong = (word: string) => {
    let chunk = "";
    for (const ch of word) {
      const next = chunk + ch;
      if (font.widthOfTextAtSize(next, size) <= maxW) chunk = next;
      else {
        if (chunk) lines.push(chunk);
        chunk = ch;
      }
    }
    line = chunk;
  };
  for (const word of words) {
    const trial = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(trial, size) <= maxW) line = trial;
    else if (!line) pushLong(word);
    else {
      lines.push(line);
      if (font.widthOfTextAtSize(word, size) <= maxW) line = word;
      else pushLong(word);
    }
  }
  if (line) lines.push(line);
  return lines.length > 0 ? lines : [""];
}

function trackedWidth(font: PDFFont, text: string, size: number, tracking: number): number {
  let width = 0;
  for (const ch of text) width += font.widthOfTextAtSize(ch, size) + tracking;
  return Math.max(0, width - tracking);
}

class Sheet {
  pages: PDFPage[] = [];
  page!: PDFPage;
  top = MARGIN;
  annotations: Array<{ page: PDFPage; url: string; x1: number; y1: number; x2: number; y2: number }> = [];
  pdf: PDFDocument;
  sans: PDFFont;
  serif: PDFFont;
  italic: PDFFont;
  mono: PDFFont;
  logo: PDFImage;
  locale: Locale;

  constructor(pdf: PDFDocument, sans: PDFFont, serif: PDFFont, italic: PDFFont, mono: PDFFont, logo: PDFImage, locale: Locale) {
    this.pdf = pdf;
    this.sans = sans;
    this.serif = serif;
    this.italic = italic;
    this.mono = mono;
    this.logo = logo;
    this.locale = locale;
    this.addPage(true);
  }

  private contentBottom() {
    return BOTTOM + 18;
  }

  private addPage(first: boolean) {
    this.page = this.pdf.addPage([PAGE_W, PAGE_H]);
    this.pages.push(this.page);
    this.top = MARGIN;
    if (!first) this.runningHead();
  }

  private ensure(height: number) {
    if (this.top + height > PAGE_H - this.contentBottom()) this.addPage(false);
  }

  reserve(height: number) {
    this.ensure(height);
  }

  private baseline(size: number) {
    return PAGE_H - this.top - size;
  }

  private drawTracked(text: string, x: number, size: number, tracking: number, font: PDFFont, color: ReturnType<typeof rgb>) {
    let cursor = x;
    const y = this.baseline(size);
    for (const ch of text) {
      this.page.drawText(ch, { x: cursor, y, size, font, color });
      cursor += font.widthOfTextAtSize(ch, size) + tracking;
    }
    return cursor;
  }

  private runningHead() {
    const label = "ORTOKORE";
    this.page.drawText(label, {
      x: MARGIN,
      y: this.baseline(8),
      size: 8,
      font: this.mono,
      color: black,
    });
    this.top += 14;
    this.page.drawLine({
      start: { x: MARGIN, y: PAGE_H - this.top },
      end: { x: PAGE_W - MARGIN, y: PAGE_H - this.top },
      thickness: 0.6,
      color: black,
    });
    this.top += 16;
  }

  masthead(role: string, kit: string) {
    const band = 118;
    this.page.drawRectangle({ x: 0, y: PAGE_H - band, width: PAGE_W, height: band, color: black });
    const logoSize = 78;
    this.page.drawImage(this.logo, {
      x: MARGIN,
      y: PAGE_H - band + (band - logoSize) / 2,
      width: logoSize,
      height: logoSize,
    });
    const textX = MARGIN + logoSize + 18;
    const nameSize = 36;
    const personSize = 16;
    const roleSize = 8;
    const block = nameSize + 8 + personSize + 8 + roleSize;
    this.top = (band - block) / 2;
    this.page.drawText("ORTOKORE", {
      x: textX,
      y: this.baseline(nameSize),
      size: nameSize,
      font: this.sans,
      color: white,
    });
    const kitLabel = kit.toLocaleUpperCase(this.locale);
    const kitW = trackedWidth(this.mono, kitLabel, 8, 1.1);
    this.drawTracked(kitLabel, PAGE_W - MARGIN - kitW, 8, 1.1, this.mono, white);
    this.top += nameSize + 8;
    this.page.drawText("Oscar Cartagena", {
      x: textX,
      y: this.baseline(personSize),
      size: personSize,
      font: this.italic,
      color: white,
    });
    this.top += personSize + 8;
    this.drawTracked(role.toLocaleUpperCase(this.locale), textX, roleSize, 1.15, this.mono, white);
    this.top = band + 26;
  }

  heading(n: string, label: string) {
    this.ensure(36);
    const title = label.toLocaleUpperCase(this.locale);
    this.page.drawText(n, { x: MARGIN, y: this.baseline(9), size: 9, font: this.mono, color: black });
    this.drawTracked(title, MARGIN + 28, 9, 1.35, this.mono, black);
    this.top += 14;
    this.page.drawLine({
      start: { x: MARGIN, y: PAGE_H - this.top },
      end: { x: PAGE_W - MARGIN, y: PAGE_H - this.top },
      thickness: 0.8,
      color: black,
    });
    this.top += 14;
  }

  paragraphs(text: string) {
    const parts = text.split(/\n+/).filter((part) => part.trim().length > 0);
    const size = 11;
    const leading = 15.2;
    const maxW = PAGE_W - MARGIN * 2;
    for (const part of parts) {
      const lines = wrap(this.serif, part, size, maxW);
      this.ensure(Math.min(lines.length, 3) * leading);
      for (const line of lines) {
        this.ensure(leading);
        this.page.drawText(line, { x: MARGIN, y: this.baseline(size), size, font: this.serif, color: ink });
        this.top += leading;
      }
      this.top += 8;
    }
  }

  timeline(entries: { when: string; body: string }[]) {
    const maxW = PAGE_W - MARGIN * 2 - 28;
    entries.forEach((entry, index) => {
      const when = entry.when.toLocaleUpperCase(this.locale);
      const whenLines = wrap(this.mono, when, 8, maxW);
      const bodyLines = wrap(this.serif, entry.body, 11, maxW);
      const height = 12 + whenLines.length * 11 + 4 + bodyLines.length * 14.4 + 12;
      this.ensure(height);
      this.page.drawText(String(index + 1).padStart(2, "0"), {
        x: MARGIN,
        y: this.baseline(8),
        size: 8,
        font: this.mono,
        color: black,
      });
      for (const line of whenLines) {
        this.page.drawText(line, { x: MARGIN + 28, y: this.baseline(8), size: 8, font: this.mono, color: black });
        this.top += 11;
      }
      this.top += 2;
      for (const line of bodyLines) {
        this.page.drawText(line, { x: MARGIN + 28, y: this.baseline(11), size: 11, font: this.serif, color: ink });
        this.top += 14.4;
      }
      this.top += 8;
    });
  }

  discography(rows: { when: string; title: string; detail: string }[]) {
    const maxW = PAGE_W - MARGIN * 2 - 28;
    for (const row of rows) {
      const whenLines = wrap(this.mono, row.when.toLocaleUpperCase(this.locale), 8, maxW);
      const titleLines = wrap(this.serif, row.title, 13, maxW);
      const detailLines = wrap(this.mono, row.detail, 8, maxW);
      const height = whenLines.length * 11 + titleLines.length * 16 + detailLines.length * 11 + 12;
      this.ensure(height);
      for (const line of whenLines) {
        this.page.drawText(line, { x: MARGIN, y: this.baseline(8), size: 8, font: this.mono, color: black });
        this.top += 11;
      }
      for (const line of titleLines) {
        this.page.drawText(line, { x: MARGIN, y: this.baseline(13), size: 13, font: this.serif, color: black });
        this.top += 16;
      }
      for (const line of detailLines) {
        this.page.drawText(line, { x: MARGIN, y: this.baseline(8), size: 8, font: this.mono, color: ink });
        this.top += 11;
      }
      this.top += 8;
    }
  }

  links(items: { label: string; href: string }[]) {
    const maxW = PAGE_W - MARGIN * 2 - 28;
    items.forEach((item, index) => {
      const urlLines = wrap(this.mono, item.href, 8, maxW);
      const height = 14 + urlLines.length * 11 + 10;
      this.ensure(height);
      this.page.drawText(String(index + 1).padStart(2, "0"), {
        x: MARGIN,
        y: this.baseline(9),
        size: 9,
        font: this.mono,
        color: black,
      });
      this.page.drawText(item.label, {
        x: MARGIN + 28,
        y: this.baseline(11),
        size: 11,
        font: this.serif,
        color: black,
      });
      this.top += 15;
      for (const line of urlLines) {
        const y = this.baseline(8);
        const width = this.mono.widthOfTextAtSize(line, 8);
        this.page.drawText(line, { x: MARGIN + 28, y, size: 8, font: this.mono, color: black });
        this.page.drawLine({
          start: { x: MARGIN + 28, y: y - 1.5 },
          end: { x: MARGIN + 28 + width, y: y - 1.5 },
          thickness: 0.4,
          color: black,
        });
        this.annotations.push({
          page: this.page,
          url: item.href,
          x1: MARGIN + 28,
          y1: y - 3,
          x2: MARGIN + 28 + width,
          y2: y + 9,
        });
        this.top += 11;
      }
      this.top += 8;
    });
  }

  finish(person: string) {
    this.pages.forEach((page, index) => {
      const y = 28;
      page.drawLine({
        start: { x: MARGIN, y: y + 12 },
        end: { x: PAGE_W - MARGIN, y: y + 12 },
        thickness: 0.5,
        color: black,
      });
      page.drawText("ORTOKORE", { x: MARGIN, y, size: 8, font: this.mono, color: black });
      const name = person;
      const nameW = this.serif.widthOfTextAtSize(name, 9);
      page.drawText(name, { x: (PAGE_W - nameW) / 2, y, size: 9, font: this.italic, color: black });
      const folio = String(index + 1).padStart(2, "0");
      const folioW = this.mono.widthOfTextAtSize(folio, 8);
      page.drawText(folio, { x: PAGE_W - MARGIN - folioW, y, size: 8, font: this.mono, color: black });
    });
    for (const link of this.annotations) {
      const ctx = this.pdf.context;
      const annot = ctx.register(
        ctx.obj({
          Type: "Annot",
          Subtype: "Link",
          Rect: [link.x1, link.y1, link.x2, link.y2],
          Border: [0, 0, 0],
          A: { Type: "Action", S: "URI", URI: PDFString.of(link.url) },
        }),
      );
      const key = PDFName.of("Annots");
      const existing = link.page.node.lookup(key);
      if (existing instanceof PDFArray) {
        existing.push(annot);
      } else {
        link.page.node.set(key, ctx.obj([annot]));
      }
    }
  }
}

async function build(locale: Locale, logoBytes: Uint8Array) {
  const copy = ui[locale];
  const bio = loadBio(locale);
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  pdf.setTitle(`OrtoKore — ${copy.kit}`);
  pdf.setAuthor("Oscar Cartagena");
  pdf.setCreator("OrtoKore");
  pdf.setSubject(`${copy.kit} · ${LANGUAGE_NAME[locale]}`);
  const sans = await pdf.embedFont(readFileSync(fonts.sansBold), { subset: true });
  const serif = await pdf.embedFont(readFileSync(fonts.serif), { subset: true });
  const italic = await pdf.embedFont(readFileSync(fonts.serifItalic), { subset: true });
  const mono = await pdf.embedFont(readFileSync(fonts.mono), { subset: true });
  const logo = await pdf.embedPng(logoBytes);
  const sheet = new Sheet(pdf, sans, serif, italic, mono, logo, locale);
  sheet.masthead(copy.role, copy.kit);
  sheet.heading("01", copy.biosTitle);
  sheet.paragraphs(bio);
  sheet.top += 8;
  sheet.heading("02", copy.timelineTitle);
  sheet.timeline(copy.timeline);
  sheet.reserve(210);
  sheet.heading("03", copy.discographyTitle);
  sheet.discography(copy.discography);
  sheet.reserve(160);
  sheet.heading("04", copy.presenceTitle);
  sheet.links(
    presenceLinks.map((link) => ({
      label: link.id === "mixes" ? `${copy.mixes} · YouTube` : copy.linkLabel[link.id],
      href: link.href,
    })),
  );
  sheet.finish("Oscar Cartagena");
  const bytes = await pdf.save();
  const dest = path.join(root, "public", PRESS_PDFS[locale].href);
  mkdirSync(path.dirname(dest), { recursive: true });
  writeFileSync(dest, bytes);
  return { dest, bytes: bytes.length, bio };
}

const logoBytes = whiteLogoPng();
for (const locale of LOCALES) {
  const result = await build(locale, logoBytes);
  console.log(`${locale} ${result.bytes} ${result.dest}`);
}
