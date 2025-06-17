import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";


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
      <head>
        <Script
          type="module"
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"
        />
      </head>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
