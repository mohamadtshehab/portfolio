// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from './components/Header';
import ParticlesBackground from './components/ParticlesBackground';


export const metadata: Metadata = {
  title: "Mohamad Shehab - AI Engineer & Backend Developer Portfolio",
  description: "Portfolio of an AI Engineer and Backend Developer showcasing expertise in intelligent system creation, complex backend architecture, and data analysis.",
  keywords: ["AI Engineer", "Backend Developer", "Intelligent Systems", "Data Analysis", "React", "Next.js", "Portfolio", "Software Development"],
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
        <Script
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"
          type="module"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}