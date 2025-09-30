"use client";

import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineArrowDown } from 'react-icons/hi';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
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
              'AI Developer',
              2000,
              'Backend Developer',
              2000,
              'Data Analyst',
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
  Glad your&apos;e here. This portfolio was built with the same attention to detail I apply to my projects. Go ahead, click around, and you might be surprised by what you find.
</p>
          {/* CTA and Socials */}
          <div className="flex items-center justify-center md:justify-start gap-4">
          <a 
  href="#projects"
  className="custom-button"
>
  View My Work
</a>
            <a href="https://github.com/mohamadtshehab" target="_blank" rel="noopener noreferrer" className="text-3xl text-white/70 hover:text-white transition-colors">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/mohamad-shehab-493121279" target="_blank" rel="noopener noreferrer" className="text-3xl text-white/70 hover:text-white transition-colors">
              <FaLinkedin />
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
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
            <Image
              src="/my-image.jpg"
              alt="Personal Image"
              className="rounded-full object-cover shadow-2xl border-3 border-white/20"
              fill
              priority
            />
          </div>
        </motion.div>
      </div>

<motion.div 
  className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
  whileHover={{ scale: 1.2, y: -5 }} // Add a subtle hover effect
>
  <HiOutlineArrowDown className="text-3xl text-white/50 animate-bounce" />
</motion.div>
    </section>
  );
};

export default Hero;