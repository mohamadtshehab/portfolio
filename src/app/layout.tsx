// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from './components/Header';
import ParticlesBackground from './components/ParticlesBackground';
import { getSiteUrl } from '@/lib/siteUrl';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mohamad Shehab - AI Engineer & Backend Developer Portfolio",
  description: "Portfolio of an AI Engineer and Backend Developer showcasing expertise in intelligent system creation, complex backend architecture, and data analysis.",
  keywords: ["AI Engineer", "Backend Developer", "Intelligent Systems", "Data Analysis", "React", "Next.js", "Portfolio", "Software Development"],
  openGraph: {
    title: "Mohamad Shehab - AI Engineer & Backend Developer Portfolio",
    description:
      "Portfolio of an AI Engineer and Backend Developer showcasing expertise in intelligent system creation, complex backend architecture, and data analysis.",
    url: "/",
    siteName: "Mohamad Shehab",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/my-image.jpg",
        width: 1200,
        height: 1200,
        alt: "Mohamad Shehab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamad Shehab - AI Engineer & Backend Developer Portfolio",
    description:
      "Portfolio of an AI Engineer and Backend Developer showcasing expertise in intelligent system creation, complex backend architecture, and data analysis.",
    images: ["/my-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 4. Apply the font variable to the <html> tag
    <html lang="en" className={`scroll-smooth`}>
      <body className={`antialiased relative`}>
        {/* Global Particle Background */}
        <ParticlesBackground />
        
        <Header />
        {children}
      </body>
    </html>
  );
}