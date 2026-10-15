"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type NavLink = { href: string; label: string };

export default function FloatingNav({ links, hintLabel = "Navigate", openLabel = "Open menu", closeLabel = "Close menu", extra, direction, wide = false, animateOnLoad = false }: {
  links: NavLink[];
  hintLabel?: string;
  openLabel?: string;
  closeLabel?: string;
  extra?: ReactNode;
  direction?: "ltr" | "rtl";
  wide?: boolean;
  animateOnLoad?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
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
    const show = setTimeout(() => setHintVisible(true), 900);
    const hide = setTimeout(() => setHintVisible(false), 4400);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  useEffect(() => {
    if (menuOpen) setHintVisible(false);
  }, [menuOpen]);

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

  const surface = "bg-[rgba(9,51,54,0.88)] shadow-lg backdrop-blur-[12px]";
  const containerLayout = wide
    ? "ms-auto me-3 w-max max-w-[calc(100%-1.5rem)] lg:mx-auto"
    : "ms-auto me-3 w-max max-w-[calc(100%-1.5rem)] md:mx-auto md:w-auto md:max-w-[min(700px,calc(100%-1.5rem))]";
  const pillLayout = wide
    ? `lg:rounded-full lg:px-1 lg:py-0.5 lg:bg-[rgba(9,51,54,0.88)] lg:shadow-lg lg:backdrop-blur-[12px]`
    : `md:rounded-full md:px-1 md:py-0.5 md:bg-[rgba(9,51,54,0.88)] md:shadow-lg md:backdrop-blur-[12px]`;
  const mobileOnly = wide ? "lg:hidden" : "md:hidden";
  const navLayout = wide
    ? "lg:static lg:mt-0 lg:min-w-0 lg:visible lg:opacity-100 lg:scale-100 lg:translate-y-0 lg:transition-none lg:rounded-none lg:bg-transparent lg:shadow-none lg:backdrop-blur-none lg:flex-row lg:items-center lg:justify-center lg:gap-0 lg:space-x-0.5 lg:px-2 lg:py-1.5"
    : "md:static md:mt-0 md:min-w-0 md:visible md:opacity-100 md:scale-100 md:translate-y-0 md:transition-none md:rounded-none md:bg-transparent md:shadow-none md:backdrop-blur-none md:flex-row md:items-center md:justify-center md:gap-0 md:space-x-0.5 md:px-2 md:py-1.5";
  const navState = menuOpen ? "visible opacity-100 scale-100 translate-y-0" : "invisible opacity-0 scale-95 -translate-y-1";
  const linkLayout = wide
    ? `text-start lg:text-center lg:rounded-full ${direction === "rtl" ? "lg:px-1.5" : "lg:px-2.5"} lg:py-1.5`
    : "text-start md:text-center md:rounded-full md:px-2.5 md:py-1.5";

  return <header className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isVisible ? "" : "-translate-y-full"}`}>
    <button type="button" tabIndex={-1} aria-hidden={!menuOpen} aria-label={closeLabel} onClick={closeMenu}
      className={`fixed inset-0 z-[45] bg-black/45 backdrop-blur-[1px] transition-[opacity,visibility] duration-200 motion-reduce:transition-none ${menuOpen ? "visible opacity-100" : "invisible opacity-0"} ${mobileOnly}`} />
    <motion.div initial={animateOnLoad && !reducedMotion ? { opacity: 0, y: -18 } : false} animate={animateOnLoad ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.8, ease: "easeOut" }} className={`relative z-[55] mt-3 sm:mt-4 ${containerLayout}`}>
      <div dir={direction} className={`relative flex flex-col ${pillLayout}`}>
        <button type="button" onClick={() => setMenuOpen(open => !open)}
          className={`flex h-12 w-12 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-[rgba(14,70,74,0.92)] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/60 ${surface} ${mobileOnly}`}
          aria-expanded={menuOpen} aria-controls="site-nav" aria-label={menuOpen ? closeLabel : openLabel}>
          {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
        <span aria-hidden className={`pointer-events-none absolute end-full top-1/2 me-2 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-white/80 transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none ${surface} ${hintVisible ? "opacity-100 translate-x-0" : `opacity-0 ${direction === "rtl" ? "-translate-x-1" : "translate-x-1"}`} ${mobileOnly}`}>
          {hintLabel}
        </span>
        <nav id="site-nav" className={`absolute top-full end-0 mt-2 flex min-w-48 flex-col gap-0.5 rounded-2xl p-2 ${surface} ${direction === "rtl" ? "origin-top-left" : "origin-top-right"} transition-[opacity,scale,translate,visibility] duration-200 ease-out motion-reduce:transition-none ${navState} ${navLayout}`}>
          {links.map(link => <Link key={link.href} href={link.href} onClick={closeMenu}
            className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-300 ${linkLayout} ${link.href.startsWith("#") && activeSection === link.href.slice(1) ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/10 hover:text-white"}`}>
            {link.label}
          </Link>)}
          {extra}
        </nav>
      </div>
    </motion.div>
  </header>;
}
