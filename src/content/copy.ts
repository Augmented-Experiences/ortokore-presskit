export type Locale = "es" | "en" | "nl";
export type PhotoKind = "portrait" | "press" | "performance";
export type Bios = Record<Locale, string | null>;

export type TimelineEntry = {
  when: string;
  body: string;
};

export type DiscEntry = {
  when: string;
  title: string;
  detail: string;
};

export type UiCopy = {
  kit: string;
  language: string;
  role: string;
  navBios: string;
  navTimeline: string;
  navListen: string;
  navGallery: string;
  navDownloads: string;
  biosTitle: string;
  copy: string;
  copied: string;
  copyFailed: string;
  bioMissing: string;
  timelineTitle: string;
  timeline: TimelineEntry[];
  discographyTitle: string;
  discography: DiscEntry[];
  listenTitle: string;
  presenceTitle: string;
  mixes: string;
  linkLabel: {
    site: string;
    youtube: string;
    soundcloud: string;
    spotifyOk: string;
    spotifySp: string;
    facebook: string;
  };
  galleryTitle: string;
  galleryLead: string;
  flyersTitle: string;
  flyersEmpty: string;
  photoLabel: Record<PhotoKind, string>;
  downloadsTitle: string;
  pressPdf: string;
  print: string;
  web: string;
  photographs: string;
  biography: string;
  download: string;
  close: string;
  logo: string;
  crest: string;
  illustrator: string;
  missingImage: string;
  leadTitle: string;
  leadName: string;
  leadEmail: string;
  leadMessage: string;
  leadSubmit: string;
  leadSent: string;
  leadError: string;
};

export const LOCALES: Locale[] = ["es", "en", "nl"];

export const BIO_FILES: Record<Locale, string> = {
  es: "bio-es.txt",
  en: "bio-en.txt",
  nl: "bio-nl.txt",
};

export const LANGUAGE_NAME: Record<Locale, string> = {
  es: "Español",
  en: "English",
  nl: "Nederlands",
};

export type PressFile = {
  src: string;
  file: string;
  width: number;
  height: number;
};

export const marks = {
  logo: {
    ai: { src: "/brand/ortokore-logo.ai", file: "ortokore-logo.ai" },
    svg: {
      src: "/brand/ortokore-logo.svg",
      file: "ortokore-logo.svg",
      width: 1605,
      height: 1642,
    },
    png: {
      src: "/brand/ortokore-logo.png",
      file: "ortokore-logo.png",
      width: 1605,
      height: 1642,
    },
  },
  crest: {
    ai: { src: "/brand/ortokore-escudo.ai", file: "ortokore-escudo.ai" },
    svg: {
      src: "/brand/ortokore-crest.svg",
      file: "ortokore-crest.svg",
      width: 1544,
      height: 2098,
    },
    png: {
      src: "/brand/ortokore-crest.png",
      file: "ortokore-crest.png",
      width: 1544,
      height: 2098,
    },
  },
} as const;

export type Photo = PressFile & { kind: PhotoKind };

export const photos: Photo[] = [
  {
    src: "/press/oscar-cartagena-portrait.jpg",
    file: "oscar-cartagena-portrait.jpg",
    width: 533,
    height: 800,
    kind: "portrait",
  },
  {
    src: "/press/oscar-cartagena-press-bench.jpg",
    file: "oscar-cartagena-press-bench.jpg",
    width: 533,
    height: 800,
    kind: "press",
  },
  {
    src: "/press/oscar-cartagena-press-overhead.jpg",
    file: "oscar-cartagena-press-overhead.jpg",
    width: 508,
    height: 799,
    kind: "press",
  },
  {
    src: "/press/oscar-cartagena-press-hood.jpg",
    file: "oscar-cartagena-press-hood.jpg",
    width: 800,
    height: 533,
    kind: "press",
  },
  {
    src: "/press/oscar-cartagena-press-railing.jpg",
    file: "oscar-cartagena-press-railing.jpg",
    width: 800,
    height: 533,
    kind: "press",
  },
  {
    src: "/press/oscar-cartagena-press-stairs.jpg",
    file: "oscar-cartagena-press-stairs.jpg",
    width: 533,
    height: 800,
    kind: "press",
  },
  {
    src: "/press/oscar-cartagena-performance-booth.jpg",
    file: "oscar-cartagena-performance-booth.jpg",
    width: 800,
    height: 536,
    kind: "performance",
  },
  { src: "/press/oscar-cartagena-press-08.jpg", file: "oscar-cartagena-press-08.jpg", width: 800, height: 533, kind: "press" },
  { src: "/press/oscar-cartagena-press-09.jpg", file: "oscar-cartagena-press-09.jpg", width: 604, height: 403, kind: "press" },
  { src: "/press/oscar-cartagena-press-10.jpg", file: "oscar-cartagena-press-10.jpg", width: 453, height: 604, kind: "press" },
  { src: "/press/oscar-cartagena-press-11.jpg", file: "oscar-cartagena-press-11.jpg", width: 600, height: 426, kind: "press" },
  { src: "/press/oscar-cartagena-press-12.jpg", file: "oscar-cartagena-press-12.jpg", width: 604, height: 453, kind: "press" },
  { src: "/press/oscar-cartagena-press-13.jpg", file: "oscar-cartagena-press-13.jpg", width: 604, height: 453, kind: "press" },
  { src: "/press/oscar-cartagena-press-14.jpg", file: "oscar-cartagena-press-14.jpg", width: 1024, height: 683, kind: "press" },
  { src: "/press/oscar-cartagena-press-15.jpg", file: "oscar-cartagena-press-15.jpg", width: 1024, height: 768, kind: "press" },
  { src: "/press/oscar-cartagena-press-16.jpg", file: "oscar-cartagena-press-16.jpg", width: 499, height: 375, kind: "press" },
  { src: "/press/oscar-cartagena-press-17.jpg", file: "oscar-cartagena-press-17.jpg", width: 1023, height: 685, kind: "press" },
  { src: "/press/oscar-cartagena-press-18.jpg", file: "oscar-cartagena-press-18.jpg", width: 600, height: 450, kind: "press" },
  { src: "/press/oscar-cartagena-press-19.jpg", file: "oscar-cartagena-press-19.jpg", width: 453, height: 604, kind: "press" },
  { src: "/press/oscar-cartagena-press-20.jpg", file: "oscar-cartagena-press-20.jpg", width: 768, height: 1024, kind: "press" },
  { src: "/press/oscar-cartagena-press-21.jpg", file: "oscar-cartagena-press-21.jpg", width: 604, height: 442, kind: "press" },
  { src: "/press/oscar-cartagena-press-22.jpg", file: "oscar-cartagena-press-22.jpg", width: 399, height: 600, kind: "press" },
  { src: "/press/oscar-cartagena-press-23.jpg", file: "oscar-cartagena-press-23.jpg", width: 640, height: 480, kind: "press" },
  { src: "/press/oscar-cartagena-press-24.jpg", file: "oscar-cartagena-press-24.jpg", width: 768, height: 1024, kind: "press" },
  { src: "/press/oscar-cartagena-press-25.jpg", file: "oscar-cartagena-press-25.jpg", width: 453, height: 604, kind: "press" },
  { src: "/press/oscar-cartagena-press-26.jpg", file: "oscar-cartagena-press-26.jpg", width: 442, height: 604, kind: "press" },
];

export const flyers: PressFile[] = [
  { src: "/flyers/ortokore-flyer-01.jpg", file: "ortokore-flyer-01.jpg", width: 720, height: 466 },
  { src: "/flyers/ortokore-flyer-02.jpg", file: "ortokore-flyer-02.jpg", width: 720, height: 529 },
  { src: "/flyers/ortokore-flyer-03.jpg", file: "ortokore-flyer-03.jpg", width: 320, height: 320 },
  { src: "/flyers/ortokore-flyer-04.jpg", file: "ortokore-flyer-04.jpg", width: 450, height: 395 },
  { src: "/flyers/ortokore-flyer-05.jpg", file: "ortokore-flyer-05.jpg", width: 405, height: 640 },
  { src: "/flyers/ortokore-flyer-06.jpg", file: "ortokore-flyer-06.jpg", width: 600, height: 293 },
  { src: "/flyers/ortokore-flyer-07.jpg", file: "ortokore-flyer-07.jpg", width: 500, height: 500 },
  { src: "/flyers/ortokore-flyer-08.jpg", file: "ortokore-flyer-08.jpg", width: 417, height: 640 },
  { src: "/flyers/ortokore-flyer-09.jpg", file: "ortokore-flyer-09.jpg", width: 393, height: 500 },
  { src: "/flyers/ortokore-flyer-10.jpg", file: "ortokore-flyer-10.jpg", width: 400, height: 571 },
  { src: "/flyers/ortokore-flyer-11.jpg", file: "ortokore-flyer-11.jpg", width: 347, height: 733 },
  { src: "/flyers/ortokore-flyer-12.jpg", file: "ortokore-flyer-12.jpg", width: 702, height: 1024 },
  { src: "/flyers/ortokore-flyer-13.jpg", file: "ortokore-flyer-13.jpg", width: 300, height: 750 },
  { src: "/flyers/ortokore-flyer-14.jpg", file: "ortokore-flyer-14.jpg", width: 799, height: 547 },
  { src: "/flyers/ortokore-flyer-15.jpg", file: "ortokore-flyer-15.jpg", width: 640, height: 620 },
  { src: "/flyers/ortokore-flyer-16.jpg", file: "ortokore-flyer-16.jpg", width: 800, height: 279 },
  { src: "/flyers/ortokore-flyer-17.jpg", file: "ortokore-flyer-17.jpg", width: 500, height: 768 },
  { src: "/flyers/ortokore-flyer-18.jpg", file: "ortokore-flyer-18.jpg", width: 383, height: 581 },
  { src: "/flyers/ortokore-flyer-19.jpg", file: "ortokore-flyer-19.jpg", width: 367, height: 604 },
  { src: "/flyers/ortokore-flyer-20.jpg", file: "ortokore-flyer-20.jpg", width: 461, height: 604 },
  { src: "/flyers/ortokore-flyer-21.jpg", file: "ortokore-flyer-21.jpg", width: 364, height: 604 },
  { src: "/flyers/ortokore-flyer-22.jpg", file: "ortokore-flyer-22.jpg", width: 234, height: 604 },
  { src: "/flyers/ortokore-flyer-23.jpg", file: "ortokore-flyer-23.jpg", width: 306, height: 792 },
  { src: "/flyers/ortokore-flyer-24.jpg", file: "ortokore-flyer-24.jpg", width: 248, height: 800 },
  { src: "/flyers/ortokore-flyer-25.jpg", file: "ortokore-flyer-25.jpg", width: 300, height: 750 },
  { src: "/flyers/ortokore-flyer-26.jpg", file: "ortokore-flyer-26.jpg", width: 600, height: 389 },
  { src: "/flyers/ortokore-flyer-27.jpg", file: "ortokore-flyer-27.jpg", width: 397, height: 283 },
  { src: "/flyers/ortokore-flyer-28.jpg", file: "ortokore-flyer-28.jpg", width: 393, height: 918 },
  { src: "/flyers/ortokore-flyer-29.jpg", file: "ortokore-flyer-29.jpg", width: 600, height: 400 },
  { src: "/flyers/ortokore-flyer-30.jpg", file: "ortokore-flyer-30.jpg", width: 324, height: 500 },
  { src: "/flyers/ortokore-flyer-31.jpg", file: "ortokore-flyer-31.jpg", width: 400, height: 571 },
  { src: "/flyers/ortokore-flyer-32.jpg", file: "ortokore-flyer-32.jpg", width: 400, height: 571 },
  { src: "/flyers/ortokore-flyer-33.jpg", file: "ortokore-flyer-33.jpg", width: 400, height: 571 },
  { src: "/flyers/ortokore-flyer-34.jpg", file: "ortokore-flyer-34.jpg", width: 400, height: 577 },
  { src: "/flyers/ortokore-flyer-35.jpg", file: "ortokore-flyer-35.jpg", width: 423, height: 751 },
  { src: "/flyers/ortokore-flyer-36.jpg", file: "ortokore-flyer-36.jpg", width: 563, height: 590 },
  { src: "/flyers/ortokore-flyer-37.jpg", file: "ortokore-flyer-37.jpg", width: 1024, height: 733 },
  { src: "/flyers/ortokore-flyer-38.jpg", file: "ortokore-flyer-38.jpg", width: 800, height: 556 },
  { src: "/flyers/ortokore-flyer-39.jpg", file: "ortokore-flyer-39.jpg", width: 270, height: 376 },
  { src: "/flyers/ortokore-flyer-40.jpg", file: "ortokore-flyer-40.jpg", width: 574, height: 282 },
  { src: "/flyers/ortokore-flyer-41.jpg", file: "ortokore-flyer-41.jpg", width: 346, height: 604 },
  { src: "/flyers/ortokore-flyer-42.jpg", file: "ortokore-flyer-42.jpg", width: 369, height: 604 },
  { src: "/flyers/ortokore-flyer-43.jpg", file: "ortokore-flyer-43.jpg", width: 278, height: 604 },
  { src: "/flyers/ortokore-flyer-44.jpg", file: "ortokore-flyer-44.jpg", width: 417, height: 720 },
];

export const ui: Record<Locale, UiCopy> = {
  es: {
    kit: "Kit de prensa",
    language: "Idioma",
    role: "DJ y productor",
    navBios: "Biografía",
    navTimeline: "Cronología",
    navListen: "Escuchar",
    navGallery: "Fotos",
    navDownloads: "Archivo",
    biosTitle: "Biografía",
    copy: "Copiar",
    copied: "Copiado",
    copyFailed: "No se pudo copiar",
    bioMissing: "Esta biografía no está disponible.",
    timelineTitle: "Cronología",
    timeline: [
      {
        when: "Finales de los 90",
        body: "Caracas. Bases del hardcore y el gabber en Venezuela. El drum and bass empieza allí.",
      },
      {
        when: "Principios de los 2000",
        body: "Spiralheadz (OG Records). Hardtek internacional. Primera edición en vinilo: más de 3,500 copias.",
      },
      {
        when: "2010",
        body: "Cannibal Dub y Padremonte en Voodoo Music, sello hermano de Offkey Records de Raiden.",
      },
      {
        when: "2011",
        body: "Sector Clear y Time Maze en Danger Chamber Digital. Peg Leg en Automate Deep.",
      },
      {
        when: "2017",
        body: "Re-press de Spiralheadz: más de 1,000 copias.",
      },
      {
        when: "Regreso",
        body: "Después de una pausa de más de 10 años.",
      },
    ],
    discographyTitle: "Discografía",
    discography: [
      {
        when: "Principios de los 2000",
        title: "Spiralheadz",
        detail: "OG Records · primera edición, más de 3,500 copias",
      },
      { when: "2010", title: "Cannibal Dub", detail: "Voodoo Music" },
      { when: "2010", title: "Padremonte", detail: "Voodoo Music" },
      { when: "2011", title: "Sector Clear", detail: "Danger Chamber Digital" },
      { when: "2011", title: "Time Maze", detail: "Danger Chamber Digital" },
      { when: "2011", title: "Peg Leg", detail: "Automate Deep" },
      {
        when: "2017",
        title: "Spiralheadz",
        detail: "re-press · más de 1,000 copias",
      },
    ],
    listenTitle: "Escuchar",
    presenceTitle: "Presencia",
    mixes: "Mezclas",
    linkLabel: {
      site: "Sitio web",
      youtube: "Canal de YouTube",
      soundcloud: "SoundCloud",
      spotifyOk: "Spotify · OrtoKore",
      spotifySp: "Spotify · Spiralheadz",
      facebook: "Facebook",
    },
    galleryTitle: "Fotografías",
    galleryLead: "Secuencia de prensa. Una foto de performance.",
    flyersTitle: "Flyers y prensa",
    flyersEmpty: "Todavía no hay flyers.",
    photoLabel: {
      portrait: "Retrato",
      press: "Foto de prensa",
      performance: "Foto de performance",
    },
    downloadsTitle: "Archivo",
    pressPdf: "Kit de prensa PDF",
    print: "Impresión",
    web: "Web",
    photographs: "Fotografías",
    biography: "Biografía",
    download: "Descargar",
    close: "Cerrar",
    logo: "Logo",
    crest: "Escudo",
    illustrator: "Adobe Illustrator",
    missingImage: "Imagen no disponible",
    leadTitle: "Para información de fechas y bookings",
    leadName: "Nombre",
    leadEmail: "Correo",
    leadMessage: "Mensaje",
    leadSubmit: "Enviar",
    leadSent: "Se abrió tu aplicación de correo con el mensaje listo para enviar.",
    leadError: "Revisa el nombre, el correo y el mensaje.",
  },
  en: {
    kit: "Press kit",
    language: "Language",
    role: "DJ and producer",
    navBios: "Biography",
    navTimeline: "Timeline",
    navListen: "Listen",
    navGallery: "Photos",
    navDownloads: "Archive",
    biosTitle: "Biography",
    copy: "Copy",
    copied: "Copied",
    copyFailed: "Could not copy",
    bioMissing: "This biography is unavailable.",
    timelineTitle: "Timeline",
    timeline: [
      {
        when: "Late 1990s",
        body: "Caracas. Foundations of hardcore and gabber in Venezuela. Drum and bass begins there.",
      },
      {
        when: "Early 2000s",
        body: "Spiralheadz (OG Records). International hardtek. First vinyl edition: more than 3,500 copies.",
      },
      {
        when: "2010",
        body: "Cannibal Dub and Padremonte on Voodoo Music, sister label of Raiden’s Offkey Records.",
      },
      {
        when: "2011",
        body: "Sector Clear and Time Maze on Danger Chamber Digital. Peg Leg on Automate Deep.",
      },
      {
        when: "2017",
        body: "Spiralheadz re-press: more than 1,000 copies.",
      },
      {
        when: "Return",
        body: "After a pause of more than 10 years.",
      },
    ],
    discographyTitle: "Discography",
    discography: [
      {
        when: "Early 2000s",
        title: "Spiralheadz",
        detail: "OG Records · first edition, more than 3,500 copies",
      },
      { when: "2010", title: "Cannibal Dub", detail: "Voodoo Music" },
      { when: "2010", title: "Padremonte", detail: "Voodoo Music" },
      { when: "2011", title: "Sector Clear", detail: "Danger Chamber Digital" },
      { when: "2011", title: "Time Maze", detail: "Danger Chamber Digital" },
      { when: "2011", title: "Peg Leg", detail: "Automate Deep" },
      {
        when: "2017",
        title: "Spiralheadz",
        detail: "re-press · more than 1,000 copies",
      },
    ],
    listenTitle: "Listen",
    presenceTitle: "Presence",
    mixes: "Mixes",
    linkLabel: {
      site: "Website",
      youtube: "YouTube channel",
      soundcloud: "SoundCloud",
      spotifyOk: "Spotify · OrtoKore",
      spotifySp: "Spotify · Spiralheadz",
      facebook: "Facebook",
    },
    galleryTitle: "Photographs",
    galleryLead: "A press sequence. One performance photo.",
    flyersTitle: "Flyers and press",
    flyersEmpty: "No flyers yet.",
    photoLabel: {
      portrait: "Portrait",
      press: "Press photo",
      performance: "Performance photo",
    },
    downloadsTitle: "Archive",
    pressPdf: "Press kit PDF",
    print: "Print",
    web: "Web",
    photographs: "Photographs",
    biography: "Biography",
    download: "Download",
    close: "Close",
    logo: "Logo",
    crest: "Escudo",
    illustrator: "Adobe Illustrator",
    missingImage: "Image unavailable",
    leadTitle: "For dates and bookings",
    leadName: "Name",
    leadEmail: "Email",
    leadMessage: "Message",
    leadSubmit: "Send",
    leadSent: "Your mail app opened with the message ready to send.",
    leadError: "Check the name, email, and message.",
  },
  nl: {
    kit: "Perskit",
    language: "Taal",
    role: "DJ en producer",
    navBios: "Biografie",
    navTimeline: "Tijdlijn",
    navListen: "Luisteren",
    navGallery: "Foto’s",
    navDownloads: "Archief",
    biosTitle: "Biografie",
    copy: "Kopiëren",
    copied: "Gekopieerd",
    copyFailed: "Kopiëren mislukt",
    bioMissing: "Deze biografie is niet beschikbaar.",
    timelineTitle: "Tijdlijn",
    timeline: [
      {
        when: "Eind jaren negentig",
        body: "Caracas. De basis voor hardcore en gabber in Venezuela. Drum and bass begint daar.",
      },
      {
        when: "Begin jaren 2000",
        body: "Spiralheadz (OG Records). Internationale hardtek. Eerste vinylpersing: meer dan 3.500 exemplaren.",
      },
      {
        when: "2010",
        body: "Cannibal Dub en Padremonte op Voodoo Music, het zusterlabel van Offkey Records van Raiden.",
      },
      {
        when: "2011",
        body: "Sector Clear en Time Maze op Danger Chamber Digital. Peg Leg op Automate Deep.",
      },
      {
        when: "2017",
        body: "Re-press van Spiralheadz: meer dan 1.000 exemplaren.",
      },
      {
        when: "Terugkeer",
        body: "Na een pauze van meer dan 10 jaar.",
      },
    ],
    discographyTitle: "Discografie",
    discography: [
      {
        when: "Begin jaren 2000",
        title: "Spiralheadz",
        detail: "OG Records · eerste persing, meer dan 3.500 exemplaren",
      },
      { when: "2010", title: "Cannibal Dub", detail: "Voodoo Music" },
      { when: "2010", title: "Padremonte", detail: "Voodoo Music" },
      { when: "2011", title: "Sector Clear", detail: "Danger Chamber Digital" },
      { when: "2011", title: "Time Maze", detail: "Danger Chamber Digital" },
      { when: "2011", title: "Peg Leg", detail: "Automate Deep" },
      {
        when: "2017",
        title: "Spiralheadz",
        detail: "re-press · meer dan 1.000 exemplaren",
      },
    ],
    listenTitle: "Luisteren",
    presenceTitle: "Aanwezigheid",
    mixes: "Mixen",
    linkLabel: {
      site: "Website",
      youtube: "YouTube-kanaal",
      soundcloud: "SoundCloud",
      spotifyOk: "Spotify · OrtoKore",
      spotifySp: "Spotify · Spiralheadz",
      facebook: "Facebook",
    },
    galleryTitle: "Foto’s",
    galleryLead: "Een persreeks. Eén performancefoto.",
    flyersTitle: "Flyers en pers",
    flyersEmpty: "Nog geen flyers.",
    photoLabel: {
      portrait: "Portret",
      press: "Persfoto",
      performance: "Performancefoto",
    },
    downloadsTitle: "Archief",
    pressPdf: "Perskit PDF",
    print: "Druk",
    web: "Web",
    photographs: "Foto’s",
    biography: "Biografie",
    download: "Download",
    close: "Sluiten",
    logo: "Logo",
    crest: "Escudo",
    illustrator: "Adobe Illustrator",
    missingImage: "Beeld niet beschikbaar",
    leadTitle: "Voor data en bookings",
    leadName: "Naam",
    leadEmail: "E-mail",
    leadMessage: "Bericht",
    leadSubmit: "Versturen",
    leadSent: "Je mailprogramma is geopend met het bericht klaar om te versturen.",
    leadError: "Controleer de naam, het e-mailadres en het bericht.",
  },
};

export const PRESS_PDFS: Record<Locale, { href: string; file: string }> = {
  es: { href: "/kits/ortokore-press-kit-es.pdf", file: "ortokore-press-kit-es.pdf" },
  en: { href: "/kits/ortokore-press-kit-en.pdf", file: "ortokore-press-kit-en.pdf" },
  nl: { href: "/kits/ortokore-press-kit-nl.pdf", file: "ortokore-press-kit-nl.pdf" },
};

export const presenceLinks = [
  { id: "site", href: "https://ortokore.com/" },
  { id: "youtube", href: "https://www.youtube.com/@ortokore" },
  { id: "mixes", href: "https://www.youtube.com/playlist?list=PL6rBihpNVt4h5aUhHxHbizNqsDsJzU7-p" },
  { id: "soundcloud", href: "https://soundcloud.com/ortokore" },
  { id: "spotifyOk", href: "https://open.spotify.com/artist/5iaEGUDjuo3S8IMz7INj2Q" },
  { id: "spotifySp", href: "https://open.spotify.com/artist/04wcGrbwAxI8fixfRYZMdA" },
  { id: "facebook", href: "https://www.facebook.com/djortokore" },
] as const;

export const players = {
  spotifyOk: "https://open.spotify.com/embed/artist/5iaEGUDjuo3S8IMz7INj2Q",
  spotifySp: "https://open.spotify.com/embed/artist/04wcGrbwAxI8fixfRYZMdA",
  soundcloud:
    "https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Fusers%2F224759&show_artwork=true",
} as const;

export const youtubeMixes = [
  {
    id: "-W3pF_CSZPc",
    title: "ORTOKORE - Neurofunk Hard Drum n Bass Mix// Killerdrumz 18 años",
  },
  { id: "T0xzAFQjE6g", title: "OrtoKore - short n' rushed December 2025" },
  { id: "QMub9ObA4tk", title: "OrtoKore - Voodoo Label Mix" },
  { id: "uj2PWA9yKTw", title: "OrtoKore - Automate Podcast 027" },
  { id: "F8i__A8qjYw", title: "OrtoKore - Flatliners Radio Show" },
  { id: "5sES6QtHoog", title: "OrtoKore - Voodoo Podcast Vol. 3" },
  { id: "W2hFF1CnEBs", title: "OrtoKore - The End of a Decade" },
  { id: "o6Afb4EyJhk", title: "OrtoKore - Exodus Mix" },
  { id: "8-avpMo7i5g", title: "Caja de Ritmos Guest Mix OrtoKore Diciembre 2011" },
] as const;
