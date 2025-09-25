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

          {/* Arrow Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="p-3 rounded-full hover:bg-white/10 transition-colors group"
              title={showAllProjects ? 'Show Less' : `View All Projects (${projects.length - 2} more)`}
            >
              <FaChevronDown 
                className={`text-2xl text-white/60 transition-all duration-300 ${
                  showAllProjects ? 'rotate-180' : 'animate-bounce'
                } group-hover:text-white/80`} 
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