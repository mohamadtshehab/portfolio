'use client';
import ProjectCard from './ProjectCard';
import projects from './projectsInfo';


const Projects = () => {
  return (
    <section id="projects" className="py-20 relative bg-[#123529] ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          My Projects
        </h2>
        
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div key={index}>
              <ProjectCard {...project} />
              
              {index < projects.length - 1 && (
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30 my-8"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;