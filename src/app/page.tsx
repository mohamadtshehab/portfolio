"use client";
import Hero from './components/Hero';
import Projects from './components/Projects/MainComponents/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Courses from './components/Courses/Courses'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <Projects />
      <Courses />
      <Skills />
      <Contact />
    </main>
  );
}
