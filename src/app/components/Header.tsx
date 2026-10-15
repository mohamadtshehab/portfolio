"use client";

import { usePathname } from "next/navigation";
import FloatingNav from "./FloatingNav";

const portfolioLinks = [
  { href: "#work-experience", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  if (pathname === "/business") return null;
  return <FloatingNav links={portfolioLinks} />;
}
