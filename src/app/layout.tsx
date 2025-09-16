import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from './components/Header';

export const metadata: Metadata = {
  title: "Mohamad Shehab - Portfolio",
  description: "Full Stack Developer Portfolio showcasing projects and skills",
  keywords: ["Full Stack Developer", "Web Development", "Portfolio", "React", "Next.js"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`antialiased`}>
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