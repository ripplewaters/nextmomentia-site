import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextMomentia – Official Site",
  description: "👁 The digital universe of viral culture, design & innovation.",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "NextMomentia",
    description:
      "Explore the world of digital creativity, design & viral culture.",
    url: "https://www.nextmomentia.com",
    siteName: "NextMomentia",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "NextMomentia Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextMomentia",
    description: "👁 Explore the world of digital creativity & viral culture.",
    images: ["/preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts – Orbitron + Press Start 2P */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ overflowX: "hidden", margin: 0, padding: 0 }}
      >
        {children}
      </body>
    </html>
  );
}
