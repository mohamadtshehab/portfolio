"use client";

import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineArrowDown } from 'react-icons/hi';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useCallback, useEffect, useState } from 'react';

const HERO_IMAGES = [
  "/my-image1.jpg",
  "/my-image2.jpg",
  "/my-image3.jpg",
] as const;

const ROTATE_MS = 4500;

const Hero = () => {
  const [photoIndex, setPhotoIndex] = useState(0);

  const advance = useCallback(() => {
    setPhotoIndex((i) => (i + 1) % HERO_IMAGES.length);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const id = window.setInterval(advance, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [advance]);
  return (
    <section
      className="min-h-screen flex items-center justify-center text-white p-8 relative overflow-hidden"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-16 relative z-10">
        {/* Text Information Section - width reduced to 5/12 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-5/12 text-center md:text-left"
        >
          <p className="text-xl md:text-2xl text-white/80 mb-2">Hello, I&apos;m</p>
          <h1 className="text-5xl md:text-7xl font-bold">Mohamad Shehab</h1>
          <TypeAnimation
            sequence={[
              'AI Engineer',
              2000,
              'Software Engineer',
              2000,
              'Lifelong Learner',
              2000,
            ]}
            wrapper="h2"
            speed={50}
            className="text-3xl md:text-4xl font-semibold mt-2 mb-6 text-[#a3d7c3]"
            repeat={Infinity}
          />
         <p className="max-w-xl text-lg text-white/70 mb-8">
         I&apos;m glad you&apos;re here. Below, you can try my work first-hand.
</p>
          {/* CTA and Socials */}
          <div className="flex items-center justify-center md:justify-start gap-4">
          <a 
  href="#projects"
  className="custom-button"
>
  View My Work
</a>
            <a
              href="https://github.com/mohamadtshehab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-white/70 hover:text-white transition-colors"
              aria-label="Mohamad Shehab on GitHub"
            >
              <FaGithub aria-hidden />
            </a>
            <a
              href="https://www.linkedin.com/in/mohamad-shehab-493121279"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-white/70 hover:text-white transition-colors"
              aria-label="Mohamad Shehab on LinkedIn"
            >
              <FaLinkedin aria-hidden />
            </a>
          </div>
        </motion.div>

        {/* Image Section - width reduced to 5/12 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-5/12 flex justify-center"
        >
          <div className="relative h-[300px] w-[300px] overflow-hidden rounded-full shadow-2xl ring-[3px] ring-white/20 md:h-[400px] md:w-[400px]">
            {HERO_IMAGES.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={`Mohamad Shehab — photo ${i + 1} of ${HERO_IMAGES.length}`}
                className={`absolute inset-0 object-cover transition-opacity duration-700 ease-in-out ${
                  i === photoIndex ? "opacity-100" : "opacity-0"
                }`}
                fill
                sizes="(max-width: 768px) 300px, 400px"
                priority={i === 0}
                aria-hidden={i !== photoIndex}
              />
            ))}
          </div>
        </motion.div>
      </div>

<motion.a
  href="#about"
  aria-label="Continue to About section"
  className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 rounded-full text-white/50 outline-none ring-offset-2 ring-offset-[#0a1a1c] transition-colors hover:text-white/80 focus-visible:ring-2 focus-visible:ring-teal-300/60"
  whileHover={{ scale: 1.2, y: -5 }}
>
  <HiOutlineArrowDown className="text-3xl animate-bounce" aria-hidden />
</motion.a>
    </section>
  );
};

export default Hero;