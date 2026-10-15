"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type NavLink = { href: string; label: string };

export default function FloatingNav({ links, mobileLabel = "Navigate", openLabel = "Open menu", closeLabel = "Close menu", extra, direction, wide = false, animateOnLoad = false }: {
  links: NavLink[];
  mobileLabel?: string;
  openLabel?: string;
  closeLabel?: string;
  extra?: ReactNode;
  direction?: "ltr" | "rtl";
  wide?: boolean;
  animateOnLoad?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);
  const reducedMotion = useReducedMotion();
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const anchorIds = links.filter(link => link.href.startsWith("#")).map(link => link.href.slice(1)).join("|");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY <= 150 || scrollY <= lastScrollY.current);
      lastScrollY.current = scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(wide ? "(min-width: 1024px)" : "(min-width: 768px)");
    const closeIfDesktop = () => { if (mq.matches) setMenuOpen(false); };
    mq.addEventListener("change", closeIfDesktop);
    return () => mq.removeEventListener("change", closeIfDesktop);
  }, [wide]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") closeMenu(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    if (wide) {
      const sections = anchorIds.split("|").map(id => document.getElementById(id)).filter((section): section is HTMLElement => !!section);
      const updateActiveSection = () => {
        const marker = window.innerHeight * 0.42;
        let current = "";
        sections.forEach(section => {
          const heading = section.querySelector("h2") ?? section;
          if (heading.getBoundingClientRect().top <= marker) current = section.id;
        });
        setActiveSection(current);
      };
      window.addEventListener("scroll", updateActiveSection, { passive: true });
      window.addEventListener("resize", updateActiveSection);
      updateActiveSection();
      return () => {
        window.removeEventListener("scroll", updateActiveSection);
        window.removeEventListener("resize", updateActiveSection);
      };
    }

    const topMargin = Math.round(window.innerHeight * 0.4);
    const bottomMargin = Math.round(window.innerHeight * 0.5);
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: `-${topMargin}px 0px -${bottomMargin}px 0px` },
    );
    document.querySelectorAll("section[id]").forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [wide, anchorIds]);

  const pillLayout = wide ? "lg:rounded-full lg:px-1 lg:py-0.5" : "md:rounded-full md:px-1 md:py-0.5";
  const mobileBar = wide ? "lg:hidden" : "md:hidden";
  const overlayVisibility = wide ? "lg:hidden" : "md:hidden";
  const navLayout = wide
    ? "lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-0 lg:space-x-0.5 lg:px-2 lg:py-1.5 lg:pb-1.5"
    : "md:flex md:flex-row md:items-center md:justify-center md:gap-0 md:space-x-0.5 md:px-2 md:py-1.5 md:pb-1.5";
  const navVisibility = menuOpen
    ? wide ? "flex border-t border-white/10 lg:border-t-0" : "flex border-t border-white/10 md:border-t-0"
    : wide ? "hidden lg:flex" : "hidden md:flex";
  const linkLayout = wide
    ? `lg:rounded-full ${direction === "rtl" ? "lg:px-1.5" : "lg:px-2.5"} lg:py-1.5`
    : "md:rounded-full md:px-2.5 md:py-1.5";

  return <header className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
    {menuOpen && <button type="button" className={`fixed inset-0 z-[45] bg-black/45 backdrop-blur-[1px] ${overlayVisibility}`} aria-label={closeLabel} onClick={closeMenu} />}
    <motion.div initial={animateOnLoad && !reducedMotion ? { opacity: 0, y: -18 } : false} animate={animateOnLoad ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.8, ease: "easeOut" }} className={`relative z-[55] mx-auto mt-3 sm:mt-4 ${wide ? "max-w-[min(780px,calc(100%-1.5rem))] lg:w-max lg:max-w-[calc(100%-1.5rem)]" : "max-w-[min(600px,calc(100%-1.5rem))]"}`}>
      <div dir={direction} className={`flex flex-col overflow-hidden rounded-2xl shadow-lg ${pillLayout}`} style={{ backgroundColor: "rgba(9, 51, 54, 0.88)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
        <div className={`flex items-center justify-between gap-2 px-3 py-2.5 ${mobileBar}`}>
          <span className="text-sm font-medium text-white/90">{mobileLabel}</span>
          <button type="button" onClick={() => setMenuOpen(open => !open)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/60"
            aria-expanded={menuOpen} aria-controls="site-nav" aria-label={menuOpen ? closeLabel : openLabel}>
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
        <nav id="site-nav" className={`flex flex-col gap-0.5 px-2 pb-3 ${navLayout} ${navVisibility}`}>
          {links.map(link => <Link key={link.href} href={link.href} onClick={closeMenu}
            className={`rounded-xl px-3 py-2.5 text-center text-sm font-medium transition-colors duration-300 ${linkLayout} ${link.href.startsWith("#") && activeSection === link.href.slice(1) ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/10 hover:text-white"}`}>
            {link.label}
          </Link>)}
          {extra}
        </nav>
      </div>
    </motion.div>
  </header>;
}
