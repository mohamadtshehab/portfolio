"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  // --- SCROLL VISIBILITY LOGIC ---
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Hide header only if scrolled past a certain amount (e.g., 100px)
      if (window.scrollY > 150 && window.scrollY > lastScrollY) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);


  // --- ACTIVE LINK INDICATOR LOGIC ---
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      // This margin creates a "trigger zone" in the middle of the viewport
      { rootMargin: '-40% 0px -60% 0px' }
    );

    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#certificates', label: 'Certificates'},
    { href: '#volunteering', label: 'Volunteering' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* The Glassmorphism Capsule Container */}
      <div
        className="container mx-auto mt-4 max-w-[450px] rounded-full px-4 py-2 flex items-center justify-center shadow-lg"
        style={{
          backgroundColor: 'rgba(9, 51, 54, 0.7)', // Your custom theme color with opacity
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)', // For Safari support
        }}
      >
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeSection === link.href.substring(1)
                  ? 'bg-white/10 text-white' // Active style
                  : 'text-gray-300 hover:text-white' // Inactive style
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}