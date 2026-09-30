import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader, Oswald } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const display = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "OrtoKore — Kit de prensa",
  description:
    "Kit de prensa de OrtoKore (Oscar Cartagena): biografía en español, inglés y neerlandés, marcas y fotografías.",
  icons: { icon: "/brand/ortokore-logo.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white">{children}</body>
    </html>
  );
}
