'use client';
import { useMemo, useState } from 'react';
import ProjectCard from './ProjectCard';
import projects from './projectsInfo';
import {
  PROJECT_CATEGORY_META,
  PROJECT_CATEGORY_ORDER,
  type ProjectCategoryId,
} from './projectCategories';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategoryId>(
    PROJECT_CATEGORY_ORDER[0],
  );

  const filteredProjects = useMemo(
    () => projects.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

  return (
    <section id="projects" className="relative bg-transparent py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-4xl font-bold text-white sm:mb-10">
          My Projects
        </h2>

        <div
          className="-mx-1 mb-10 flex gap-2 overflow-x-auto overflow-y-visible px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:mb-12 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {PROJECT_CATEGORY_ORDER.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeCategory === id}
              title={PROJECT_CATEGORY_META[id].label}
              onClick={() => setActiveCategory(id)}
              className={`max-w-[min(100%,280px)] shrink-0 truncate rounded-full border px-3 py-2 text-left text-xs font-medium transition sm:max-w-none sm:px-4 sm:text-center sm:text-sm ${
                activeCategory === id
                  ? 'border-teal-400/50 bg-teal-500/25 text-teal-100'
                  : 'border-white/15 bg-white/[0.06] text-white/75 hover:border-white/30 hover:text-white'
              }`}
            >
              <span className="sm:hidden">{PROJECT_CATEGORY_META[id].shortLabel}</span>
              <span className="hidden sm:inline">{PROJECT_CATEGORY_META[id].label}</span>
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {filteredProjects.map((project, index) => {
            const { category, ...cardProps } = project;
            void category;
            return (
            <div key={`${project.title}-${index}`}>
              {index > 0 ? (
                <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
              ) : null}
              <ProjectCard {...cardProps} />
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
