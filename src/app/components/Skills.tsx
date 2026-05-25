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
    name: 'Programming Languages',
    icon: <FaPython className="text-4xl" />,
    skills: ['Python', 'SQL'],
  },
  {
    name: 'AI & Machine Learning',
    icon: <FaRobot className="text-4xl" />,
    skills: [
      'LangGraph',
      'LangChain',
      'LLMs',
      'TensorFlow',
      'Keras',
      'PyTorch',
      'Scikit-Learn',
      'Prompt Engineering',
      'Vector DBs',
    ],
  },
  {
    name: 'Data Science & Analytics',
    icon: <BiData className="text-4xl" />,
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'Power BI', 'DataDog', 'Looker'],
  },
  {
    name: 'Web Development',
    icon: <CgWebsite className="text-4xl" />,
    skills: [
      'Django',
      'Fast API',
      'Flask',
      'PlayWright',
      'Laravel',
      'REST APIs',
      'Asynchronous Programming',
      'WebSocket',
      'Webhooks',
      'Message Brokers (Pub/Sub, Celery, Redis)',
      'NoSQL',
    ],
  },
  {
    name: 'Infrastructure & Tools',
    icon: <FaCogs className="text-4xl" />,
    skills: [
      'CI/CD',
      'Docker',
      'Git',
      'HuggingFace',
      'Microsoft Azure',
      'Google Cloud',
      'n8n',
      'MySQL',
      'PyTest',
      'Unittest',
    ],
  },
  {
    name: 'Spoken Languages',
    icon: <FaUsers className="text-4xl" />,
    skills: ['Arabic (Native)', 'English (Fluent)'],
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