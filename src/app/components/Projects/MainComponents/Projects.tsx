'use client';
import { useState } from 'react';
import ProjectCard from './ProjectCard';
import projects from './projectsInfo';
import { FaChevronDown } from 'react-icons/fa';

const Projects = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);

  return (
    <section id="projects" className="py-20 relative bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          My Projects
        </h2>
        
        <div className="space-y-8">
          {/* First Two Projects - Always Visible with Fade Effect */}
          <div className="space-y-8">
            <ProjectCard {...projects[0]} />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
            <div className="relative">
              <ProjectCard {...projects[1]} />
            </div>
          </div>

          <div className="flex justify-center">
  <button
    onClick={() => setShowAllProjects(!showAllProjects)}
    // Increased padding for a slightly larger, more inviting target
    className="p-3 px-6 rounded-full hover:bg-white/10 transition-colors group flex items-center space-x-3"
    title={showAllProjects ? 'Show Less' : `View All Projects (${projects.length - 2} more)`}
  >
    {/* Text will only show when showAllProjects is false */}
    {!showAllProjects && (
      <>
        {/* Main CTA */}
        <span className="text-white/80 font-medium">
          View All Projects
        </span>

        {/* Highlighted Project Count Badge */}
        <span className="bg-white/10 text-white/80 text-xs font-semibold px-3 py-1 rounded-full group-hover:bg-white/20 transition-colors">
          {projects.length - 2} more
        </span>
      </>
    )}

    {/* The chevron icon */}
    <FaChevronDown
      className={`text-xl text-white/60 transition-transform duration-300 ease-in-out
        ${showAllProjects ? 'rotate-180' : ''} 
        group-hover:text-white/90 group-hover:translate-y-0.5`}
      // The group-hover:translate-y-0.5 gives a subtle "press me" nudge on hover
    />
  </button>
</div>

          {/* Additional Projects - Conditional */}
          {showAllProjects && (
            <div className="space-y-8">
              {projects.slice(2).map((project, index) => (
                <div key={index + 1}>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50 my-8"></div>
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;