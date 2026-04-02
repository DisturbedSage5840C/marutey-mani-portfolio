import type { Metadata } from "next";
import { DM_Serif_Display, IBM_Plex_Mono, Syne } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { person } from "@/lib/data";

const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
});

const sans = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const siteTitle = "Marutey Mani - CS & AI | Designer | Builder";
const siteDescription =
  "Portfolio of Marutey Mani, B.Tech CS & AI student at Plaksha University - operations manager, graphic designer, researcher, and social impact builder.";
const siteUrl = person.linkedin;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Marutey Mani",
    "Plaksha University",
    "Computer Science",
    "Artificial Intelligence",
    "Portfolio",
    "Research",
    "Showcase",
    "Graphic Design",
    "CyberSahyog",
    "EcoSentinels Foundation",
  ],
  authors: [{ name: person.name }],
  creator: person.name,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    url: siteUrl,
    locale: "en_IN",
    siteName: "Marutey Mani Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@maruteymani",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} ${mono.variable} bg-bg text-text antialiased`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
