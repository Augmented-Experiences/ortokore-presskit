# OrtoKore — kit de prensa

Sitio de una página con la biografía de Oscar Cartagena (OrtoKore) en español, inglés y neerlandés, más el logo, el escudo y las fotografías de prensa.

## Arranque local

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev -- --hostname 0.0.0.0 --port 4721
```

Abre [http://127.0.0.1:4721](http://127.0.0.1:4721).

El selector ES / EN / NL cambia todo el texto. La biografía, una por idioma, está en `public/bios/`. El logo y el escudo en Adobe Illustrator, más SVG y PNG, están en `public/brand/`. Las fotos están en `public/press/` y los flyers en `public/flyers/`. Un clic abre la imagen completa; la descarga está dentro de esa vista. El archivo incluye un PDF del kit por idioma en `public/kits/`. Para regenerarlos: `node --experimental-strip-types scripts/build-press-pdfs.ts`.

El formulario del final envía el nombre y el correo por la API de Twilio Email. La dirección de destino no se muestra en la página. Las credenciales van en `.env.local` (`TWILIO_API_KEY_SID`, `TWILIO_API_KEY_SECRET`, `TWILIO_FROM_EMAIL`, `LEAD_TO_EMAIL`). `TWILIO_FROM_EMAIL` tiene que ser un remitente verificado en Twilio.
