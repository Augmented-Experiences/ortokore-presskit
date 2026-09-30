"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SafeImage } from "@/components/safe-image";
import {
  BIO_FILES,
  LANGUAGE_NAME,
  LOCALES,
  flyers,
  marks,
  photos,
  PRESS_PDFS,
  players,
  presenceLinks,
  ui,
  youtubeMixes,
  type Bios,
  type Locale,
  type PressFile,
} from "@/content/copy";

const inkButton =
  "h-8 rounded-none border-white/70 bg-black px-2.5 font-mono text-[10px] tracking-[0.18em] text-white uppercase hover:bg-white hover:text-black";
const solidButton =
  "h-8 rounded-none bg-white px-2.5 font-mono text-[10px] tracking-[0.18em] text-black uppercase hover:bg-neutral-200";
const fieldClass =
  "h-10 rounded-none border-white/70 bg-black px-3 text-base text-white focus-visible:border-white focus-visible:ring-white/40";

export function PressKit({ bios }: { bios: Bios }) {
  const [locale, setLocale] = useState<Locale>("es");
  const [copied, setCopied] = useState<string | null>(null);
  const [leadStatus, setLeadStatus] = useState<"sent" | "error" | null>(null);
  const t = ui[locale];
  const bio = bios[locale];
  const paragraphs = bio ? bio.split(/\n+/).filter((part) => part.trim().length > 0) : [];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function selectLocale(code: Locale) {
    setLocale(code);
    setCopied(null);
  }

  async function copyBio() {
    if (!bio) return;
    const id = locale;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(bio);
        setCopied(id);
        return;
      }
      throw new Error("clipboard unavailable");
    } catch {
      try {
        const area = document.createElement("textarea");
        area.value = bio;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.left = "-9999px";
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand("copy");
        area.remove();
        setCopied(ok ? id : `fail:${id}`);
      } catch {
        setCopied(`fail:${id}`);
      }
    }
  }

  const copyLabel =
    copied === locale ? t.copied : copied === `fail:${locale}` ? t.copyFailed : t.copy;

  function sendLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !emailOk) {
      setLeadStatus("error");
      return;
    }
    const subject = encodeURIComponent("OrtoKore");
    const body = encodeURIComponent(`${t.leadName}: ${name}\n${t.leadEmail}: ${email}`);
    window.location.href = `mailto:djortokore@gmail.com?subject=${subject}&body=${body}`;
    setLeadStatus("sent");
  }

  return (
    <div className="min-h-full overflow-x-clip bg-black text-white">
      <header className="sticky top-0 z-30 border-b border-white bg-black">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2 sm:px-8">
          <SafeImage
            src={marks.logo.svg.src}
            fallbackSrc={marks.logo.png.src}
            alt="OrtoKore"
            width={marks.logo.svg.width}
            height={marks.logo.svg.height}
            missingLabel={t.missingImage}
            className="size-9 shrink-0 bg-black"
            priority
          />
          <span className="font-mono text-[10px] tracking-[0.28em]">01</span>
          <span className="font-mono text-[10px] tracking-[0.28em]">ORTOKORE</span>
          <span className="hidden font-mono text-[10px] tracking-[0.2em] text-white/55 sm:inline">
            {t.kit}
          </span>
          <nav aria-label={t.kit} className="hidden flex-wrap items-center gap-x-4 gap-y-1 lg:flex">
            <a className="font-mono text-[10px] tracking-[0.18em] uppercase hover:text-white/70" href="#bio">
              {t.navBios}
            </a>
            <a className="font-mono text-[10px] tracking-[0.18em] uppercase hover:text-white/70" href="#timeline">
              {t.navTimeline}
            </a>
            <a className="font-mono text-[10px] tracking-[0.18em] uppercase hover:text-white/70" href="#listen">
              {t.navListen}
            </a>
            <a className="font-mono text-[10px] tracking-[0.18em] uppercase hover:text-white/70" href="#gallery">
              {t.navGallery}
            </a>
            <a className="font-mono text-[10px] tracking-[0.18em] uppercase hover:text-white/70" href="#flyers">
              {t.flyersTitle}
            </a>
            <a className="font-mono text-[10px] tracking-[0.18em] uppercase hover:text-white/70" href="#downloads">
              {t.navDownloads}
            </a>
          </nav>
          <div className="ml-auto flex items-center gap-1" role="group" aria-label={t.language}>
            {LOCALES.map((code) => {
              const active = code === locale;
              return (
                <Button
                  key={code}
                  type="button"
                  variant={active ? "default" : "outline"}
                  aria-pressed={active}
                  onClick={() => selectLocale(code)}
                  className={active ? solidButton : inkButton}
                >
                  {code.toUpperCase()}
                </Button>
              );
            })}
          </div>
          <nav className="flex basis-full flex-wrap gap-x-4 gap-y-1 lg:hidden" aria-label={t.kit}>
            <a className="font-mono text-[10px] tracking-[0.18em] uppercase" href="#bio">
              {t.navBios}
            </a>
            <a className="font-mono text-[10px] tracking-[0.18em] uppercase" href="#timeline">
              {t.navTimeline}
            </a>
            <a className="font-mono text-[10px] tracking-[0.18em] uppercase" href="#listen">
              {t.navListen}
            </a>
            <a className="font-mono text-[10px] tracking-[0.18em] uppercase" href="#gallery">
              {t.navGallery}
            </a>
            <a className="font-mono text-[10px] tracking-[0.18em] uppercase" href="#flyers">
              {t.flyersTitle}
            </a>
            <a className="font-mono text-[10px] tracking-[0.18em] uppercase" href="#downloads">
              {t.navDownloads}
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="px-4 pt-6 sm:px-8 sm:pt-8">
          <p className="font-mono text-[10px] tracking-[0.42em] text-white/55 uppercase">{t.role}</p>
          <h1 className="font-display mt-1 max-w-full text-[clamp(3.2rem,16.4vw,12.75rem)] leading-[0.76] font-semibold tracking-[-0.055em]">
            ORTOKORE
          </h1>
          <div className="mt-3 flex items-end justify-between gap-4 border-b border-white pb-3">
            <p className="font-serif text-[clamp(1.6rem,4vw,3.25rem)] leading-none italic">
              Oscar Cartagena
            </p>
            <SafeImage
              src={marks.logo.svg.src}
              fallbackSrc={marks.logo.png.src}
              alt=""
              width={marks.logo.svg.width}
              height={marks.logo.svg.height}
              missingLabel={t.missingImage}
              className="w-[clamp(3.5rem,14vw,7.5rem)] shrink-0 bg-black"
            />
          </div>
        </section>

        <section
          id="bio"
          className="scroll-mt-16 grid items-start gap-12 px-4 py-10 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:py-14"
        >
          <article className="lg:col-span-6 lg:col-start-1 lg:row-start-1">
            <Rule n="02" label={t.biosTitle} />
            {paragraphs.length > 0 ? (
              <div className="essay max-w-[38rem]">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <p className="font-serif text-lg text-white/70">{t.bioMissing}</p>
            )}
            <div className="mt-8 flex flex-wrap gap-2">
              <Button type="button" variant="outline" disabled={!bio} onClick={copyBio} className={inkButton}>
                {copyLabel}
              </Button>
              <Button asChild variant="default" className={solidButton}>
                <a href={`/bios/${BIO_FILES[locale]}`} download={BIO_FILES[locale]}>
                  {t.download}
                </a>
              </Button>
            </div>
          </article>

          <figure className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mt-8">
            <SafeImage
              src={marks.crest.svg.src}
              fallbackSrc={marks.crest.png.src}
              alt={t.crest}
              width={marks.crest.svg.width}
              height={marks.crest.svg.height}
              missingLabel={t.missingImage}
              className="ml-auto w-full max-w-[34rem] bg-black"
              priority
            />
            <figcaption className="mt-3 text-right font-mono text-[10px] tracking-[0.28em] uppercase">
              {t.crest}
            </figcaption>
          </figure>
        </section>

        <section id="timeline" className="scroll-mt-16 border-t border-white px-4 py-12 sm:px-8 sm:py-16">
          <Rule n="03" label={t.timelineTitle} />
          <ol>
            {t.timeline.map((entry, index) => (
              <li
                key={entry.when}
                className="grid grid-cols-[2.4rem_1fr] gap-x-3 border-t border-white/35 py-4 md:grid-cols-[3rem_12rem_1fr] md:gap-x-6"
              >
                <span className="font-mono text-[11px] tracking-[0.14em]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[11px] tracking-[0.14em] uppercase md:col-start-2">
                  {entry.when}
                </span>
                <p className="col-start-2 font-serif text-lg leading-snug md:col-start-3 md:row-start-1">
                  {entry.body}
                </p>
              </li>
            ))}
          </ol>

          <div id="discography" className="scroll-mt-16 mt-14">
            <Rule n="04" label={t.discographyTitle} />
            <ol>
              {t.discography.map((row) => (
                <li
                  key={`${row.when}-${row.title}`}
                  className="grid grid-cols-[5.5rem_1fr] gap-x-4 border-t border-white/35 py-3 sm:grid-cols-[9rem_1fr_1.2fr]"
                >
                  <span className="font-mono text-[11px] tracking-[0.12em] uppercase">{row.when}</span>
                  <span className="font-serif text-xl leading-tight">{row.title}</span>
                  <span className="col-start-2 font-mono text-[11px] tracking-[0.08em] text-white/65 sm:col-start-3">
                    {row.detail}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="listen" className="scroll-mt-16 border-t border-white px-4 py-12 sm:px-8 sm:py-16">
          <Rule n="05" label={t.listenTitle} />
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <Player label={t.linkLabel.spotifyOk}>
              <iframe
                title={t.linkLabel.spotifyOk}
                src={players.spotifyOk}
                className="h-[352px] w-full"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            </Player>
            <Player label={t.linkLabel.spotifySp}>
              <iframe
                title={t.linkLabel.spotifySp}
                src={players.spotifySp}
                className="h-[352px] w-full"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            </Player>
          </div>
          <div className="mt-8 grid items-start gap-8">
            <Player label={t.linkLabel.soundcloud}>
              <iframe
                title={t.linkLabel.soundcloud}
                src={players.soundcloud}
                className="h-[300px] w-full sm:h-[450px]"
                loading="lazy"
                allow="autoplay; encrypted-media"
              />
            </Player>
            <div>
              <p className="mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                {t.mixes} · YouTube
              </p>
              <ol className="border-t border-white/35">
                {youtubeMixes.map((mix, index) => (
                  <li key={mix.id} className="border-b border-white/35">
                    <a
                      href={`https://www.youtube.com/watch?v=${mix.id}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="grid grid-cols-[2rem_minmax(0,1fr)] items-baseline gap-3 py-3"
                    >
                      <span className="font-mono text-[10px] tracking-[0.14em]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-serif text-lg leading-tight">{mix.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div id="presence" className="scroll-mt-16 mt-14">
            <Rule n="06" label={t.presenceTitle} />
            <ul className="border-t border-white">
              {presenceLinks.map((link, index) => (
                <li key={link.id} className="border-b border-white/30">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="grid grid-cols-[2rem_1fr] items-baseline gap-3 py-3 sm:grid-cols-[2.5rem_14rem_1fr]"
                  >
                    <span className="font-mono text-[10px] tracking-[0.14em]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-lg leading-tight">
                      {link.id === "mixes" ? `${t.mixes} · YouTube` : t.linkLabel[link.id]}
                    </span>
                    <span className="col-start-2 truncate font-mono text-[10px] tracking-[0.06em] text-white/50 sm:col-start-3">
                      {link.href.replace(/^https?:\/\//, "")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="gallery" className="scroll-mt-16 border-t border-white px-4 py-12 sm:px-8 sm:py-16">
          <Rule n="07" label={t.galleryTitle} />
          <PressWall
            items={photos}
            wall="photo"
            missingLabel={t.missingImage}
            downloadLabel={t.download}
            closeLabel={t.close}
            title={t.galleryTitle}
          />
        </section>

        <section id="flyers" className="scroll-mt-16 border-t border-white px-4 py-12 sm:px-8 sm:py-16">
          <Rule n="08" label={t.flyersTitle} />
          <PressWall
            items={flyers}
            wall="flyer"
            missingLabel={t.missingImage}
            downloadLabel={t.download}
            closeLabel={t.close}
            title={t.flyersTitle}
          />
        </section>

        <section id="downloads" className="scroll-mt-16 border-t border-white px-4 py-12 sm:px-8 sm:py-16">
          <Rule n="09" label={t.downloadsTitle} />
          <div className="space-y-10">
            <FileGroup title={t.pressPdf}>
              {LOCALES.map((code, index) => (
                <FileRow
                  key={code}
                  n={String(index + 1).padStart(2, "0")}
                  label={`${code.toUpperCase()} · ${LANGUAGE_NAME[code]}`}
                  file={PRESS_PDFS[code].file}
                  href={PRESS_PDFS[code].href}
                  action={t.download}
                />
              ))}
            </FileGroup>
            <FileGroup title={t.print}>
              <FileRow
                n="01"
                label={`${t.logo} · ${t.illustrator}`}
                file={marks.logo.ai.file}
                href={marks.logo.ai.src}
                action={t.download}
              />
              <FileRow
                n="02"
                label={`${t.crest} · ${t.illustrator}`}
                file={marks.crest.ai.file}
                href={marks.crest.ai.src}
                action={t.download}
              />
            </FileGroup>
            <FileGroup title={t.web}>
              <FileRow n="03" label={`${t.logo} · SVG`} file={marks.logo.svg.file} href={marks.logo.svg.src} action={t.download} />
              <FileRow n="04" label={`${t.logo} · PNG`} file={marks.logo.png.file} href={marks.logo.png.src} action={t.download} />
              <FileRow n="05" label={`${t.crest} · SVG`} file={marks.crest.svg.file} href={marks.crest.svg.src} action={t.download} />
              <FileRow n="06" label={`${t.crest} · PNG`} file={marks.crest.png.file} href={marks.crest.png.src} action={t.download} />
            </FileGroup>
            <FileGroup title={t.biography}>
              {LOCALES.map((code, index) => (
                <FileRow
                  key={code}
                  n={String(index + 1).padStart(2, "0")}
                  label={LANGUAGE_NAME[code]}
                  file={BIO_FILES[code]}
                  href={`/bios/${BIO_FILES[code]}`}
                  action={t.download}
                />
              ))}
            </FileGroup>
          </div>
        </section>

        <section id="booking" className="scroll-mt-16 border-t border-white px-4 py-12 sm:px-8 sm:py-16">
        <h2 className="max-w-xl font-serif text-3xl leading-tight sm:text-4xl">{t.leadTitle}</h2>
        <form className="mt-8 max-w-xl space-y-5" onSubmit={sendLead} noValidate>
          <div className="space-y-2">
            <Label htmlFor="lead-name" className="font-mono text-[10px] tracking-[0.18em] text-white uppercase">
              {t.leadName}
            </Label>
            <Input
              id="lead-name"
              name="name"
              autoComplete="name"
              required
              onChange={() => setLeadStatus(null)}
              className={fieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-email" className="font-mono text-[10px] tracking-[0.18em] text-white uppercase">
              {t.leadEmail}
            </Label>
            <Input
              id="lead-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={() => setLeadStatus(null)}
              className={fieldClass}
            />
          </div>
          <Button type="submit" className={solidButton}>
            {t.leadSubmit}
          </Button>
          {leadStatus === "sent" ? (
            <p role="status" className="font-serif text-lg">
              {t.leadSent}
            </p>
          ) : null}
          {leadStatus === "error" ? (
            <p role="alert" className="font-serif text-lg">
              {t.leadError}
            </p>
          ) : null}
        </form>
        </section>
      </main>
    </div>
  );
}

function Player({ label, children }: { label: string; children: ReactNode }) {
  return (
    <figure className="min-w-0">
      <figcaption className="mb-2 font-mono text-[10px] tracking-[0.22em] uppercase">{label}</figcaption>
      <div className="border border-white/50 bg-black">{children}</div>
    </figure>
  );
}

function Rule({ n, label }: { n: string; label: string }) {
  return (
    <div className="mb-6 flex items-baseline gap-3">
      <span className="font-mono text-[11px] tracking-[0.2em]">{n}</span>
      <span className="h-px flex-1 bg-white/50" aria-hidden />
      <span className="font-mono text-[11px] tracking-[0.22em] uppercase">{label}</span>
    </div>
  );
}

function PressWall({
  items,
  wall,
  missingLabel,
  downloadLabel,
  closeLabel,
  title,
}: {
  items: PressFile[];
  wall: "flyer" | "photo";
  missingLabel: string;
  downloadLabel: string;
  closeLabel: string;
  title: string;
}) {
  const [open, setOpen] = useState<PressFile | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <ul
        className={`mx-auto max-w-6xl gap-1.5 md:columns-3 xl:columns-4 ${
          wall === "flyer" ? "columns-1 sm:columns-2" : "columns-2"
        }`}
      >
        {items.map((item) => (
          <li key={item.file} className="mb-1.5 break-inside-avoid">
            <button
              type="button"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setOpen(item);
              }}
              className="block w-full cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <SafeImage
                src={item.src}
                alt={wall === "photo" ? "Oscar Cartagena" : "OrtoKore"}
                width={item.width}
                height={item.height}
                missingLabel={missingLabel}
                className="block h-auto w-full bg-black"
              />
            </button>
          </li>
        ))}
      </ul>
      <Dialog open={open !== null} onOpenChange={(next) => !next && setOpen(null)}>
        <DialogContent
          showCloseButton={false}
          overlayClassName="bg-black/80"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            triggerRef.current?.focus();
          }}
          className="flex max-h-[92vh] w-[calc(100%-1.5rem)] max-w-5xl flex-col gap-3 overflow-hidden rounded-none bg-black p-3 text-white ring-white/50 sm:max-w-5xl"
        >
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <div className="flex shrink-0 justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline" className={inkButton}>
                {closeLabel}
              </Button>
            </DialogClose>
          </div>
          {open ? (
            <>
              <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto">
                <SafeImage
                  src={open.src}
                  alt={wall === "photo" ? "Oscar Cartagena" : "OrtoKore"}
                  width={open.width}
                  height={open.height}
                  missingLabel={missingLabel}
                  className="h-auto max-h-[70vh] w-auto max-w-full bg-black object-contain"
                />
              </div>
              <div className="flex shrink-0 justify-center">
                <Button asChild variant="outline" className={inkButton}>
                  <a href={open.src} download={open.file}>
                    {downloadLabel}
                  </a>
                </Button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

function FileGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="font-mono text-[10px] tracking-[0.28em] uppercase">{title}</h3>
      <ul className="mt-2 border-t border-white">{children}</ul>
    </div>
  );
}

function FileRow({
  n,
  label,
  file,
  href,
  action,
}: {
  n: string;
  label: string;
  file: string;
  href: string;
  action: string;
}) {
  return (
    <li className="grid grid-cols-[2rem_1fr] items-center gap-3 border-b border-white/30 py-3 sm:grid-cols-[2.5rem_1fr_auto]">
      <span className="font-mono text-[10px] tracking-[0.14em]">{n}</span>
      <div className="min-w-0">
        <p className="font-serif text-lg leading-tight">{label}</p>
        <p className="truncate font-mono text-[10px] tracking-[0.08em] text-white/50">{file}</p>
      </div>
      <Button asChild variant="outline" className={`${inkButton} col-start-2 w-fit sm:col-start-3`}>
        <a href={href} download={file}>
          {action}
        </a>
      </Button>
    </li>
  );
}
