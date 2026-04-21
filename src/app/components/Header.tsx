"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150 && window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const closeIfDesktop = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", closeIfDesktop);
    return () => mq.removeEventListener("change", closeIfDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { href: "#about", label: "About Me" },
    { href: "#work-experience", label: "Work" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#certificates", label: "Certificates" },
    { href: "#volunteering", label: "Volunteering" },
    { href: "#contact", label: "Contact" },
  ];

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {menuOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-[45] bg-black/45 backdrop-blur-[1px] md:hidden"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      ) : null}

      <div className="relative z-[55] mx-auto mt-3 max-w-[min(600px,calc(100%-1.5rem))] px-0 sm:mt-4">
        <div
          className="flex flex-col overflow-hidden rounded-2xl shadow-lg md:rounded-full md:px-2 md:py-1"
          style={{
            backgroundColor: "rgba(9, 51, 54, 0.88)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-center justify-between gap-2 px-3 py-2.5 md:hidden">
            <span className="text-sm font-medium text-white/90">Navigate</span>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/60"
              aria-expanded={menuOpen}
              aria-controls="site-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden />
              ) : (
                <Menu className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>

          <nav
            id="site-nav"
            className={`flex flex-col gap-0.5 px-2 pb-3 md:flex md:flex-row md:items-center md:justify-center md:gap-0 md:space-x-0.5 md:px-2 md:py-1.5 md:pb-1.5 ${
              menuOpen ? "flex border-t border-white/10 md:border-t-0" : "hidden md:flex"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className={`rounded-xl px-3 py-2.5 text-center text-sm font-medium transition-colors duration-300 md:rounded-full md:py-2 ${
                  activeSection === link.href.substring(1)
                    ? "bg-white/10 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white md:hover:bg-transparent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
