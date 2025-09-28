import { FaPython, FaRobot, FaCogs, FaUsers } from 'react-icons/fa';
import { CgWebsite } from 'react-icons/cg';
import { BiData } from 'react-icons/bi';
import React, { ReactNode } from 'react';
interface SkillCategory {
  name: string;
  icon: ReactNode;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Agents & AI',
    icon: <FaRobot className="text-4xl" />,
    skills: ['LangGraph', 'LangChain', 'LangSmith', 'LLMs', 'TensorFlow', 'Keras', 'PyTorch', 'Scikit-Learn', 'Prompt Engineering']
  },
  {
    name: 'Web & Backend Development',
    icon: <CgWebsite className="text-4xl" />,
    skills: ['Django', 'Flask', 'Laravel', 'REST APIs', 'MySQL', 'Asynchronous Programming', 'WebSocket APIs', 'Celery', 'Redis']
  },
  {
    name: 'Data Science',
    icon: <BiData className="text-4xl" />,
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Power BI']
  },
  {
    name: 'Deployment & Automation',
    icon: <FaCogs className="text-4xl" />,
    skills: ['Docker', 'HuggingFace', 'Microsoft Azure', 'n8n', 'Google Cloud']
  },
  {
    name: 'Programming',
    icon: <FaPython className="text-4xl" />,
    skills: ['Python', 'Java', 'SQL', 'Git']
  },
  {
    name: 'Soft Skills',
    icon: <FaUsers className="text-4xl" />,
    skills: ['Leadership', 'Project Management', 'Research', 'Teamwork', 'Consistent Learning', 'Arabic (Native)', 'English (Advanced)']
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Skills & Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col p-6 rounded-lg hover:transform hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-white/30">{category.icon}</div>
                <h3 className="text-xl font-semibold text-white">{category.name}</h3>
              </div>
              <div className="mt-2">
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
className="skills"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 