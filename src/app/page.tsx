"use client";
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects/MainComponents/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Certificates from './components/Courses/Certificates';
import Volunteering from './components/Volunteering';

export default function Home() {
  return (
    <main 
      className="min-h-screen"
      style={{
        backgroundImage: 'linear-gradient(to bottom, #0A1A1A, #093336, #0A1A1A)',
      }}
    >
      <Hero />
      <AboutMe />
      <Skills />
      <Projects />
      <Certificates />
      <Volunteering />
      <Contact />
    </main>
  );
}