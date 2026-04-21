// src/app/page.tsx
import AboutMe from "./components/AboutMe";
import WorkExperience from "./components/WorkExperience";
import Contact from "./components/Contact";
import Certificates from "./components/Courses/Certificates";
import Hero from "./components/Hero";
import Projects from "./components/Projects/MainComponents/Projects";
import Skills from "./components/Skills";
import Volunteering from "./components/Volunteering";

export default function Home() {
  return (
    <div className="flex flex-col items-center px-4">
      <div className="w-full max-w-screen-xl mx-auto">
        <Hero />
        <AboutMe />
        <WorkExperience />
        <Skills />
        <Projects />
        <Certificates />
        <Volunteering />
        <Contact />
      </div>
    </div>
  );
}