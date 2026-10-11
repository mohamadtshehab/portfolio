import { FaBrain, FaCogs, FaMicrophone, FaPython, FaRobot, FaUsers } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { BiData } from "react-icons/bi";
import type { ReactNode } from "react";

interface SkillCategory {
  name: string;
  icon: ReactNode;
  skills: string[];
  tools: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "LLMs & Agents",
    icon: <FaRobot className="text-4xl" />,
    skills: ["Multi-agent systems", "RAG", "Prompt engineering", "Tool calling"],
    tools: [
      "LangGraph", "LangChain", "LangSmith", "ChromaDB", "Ollama",
      "Google Gemini", "Cohere",
    ],
  },
  {
    name: "Model Training & NLP",
    icon: <FaBrain className="text-4xl" />,
    skills: [
      "Instruction fine-tuning", "LoRA", "Transformers", "Embeddings",
      "Sequence modeling", "Diffusion models",
    ],
    tools: ["Unsloth", "PyTorch", "TensorFlow", "Keras", "scikit-learn", "Hugging Face"],
  },
  {
    name: "Backend & Automation",
    icon: <CgWebsite className="text-4xl" />,
    skills: [
      "REST APIs", "Async workflows", "WebSockets", "Webhooks",
      "Browser automation",
    ],
    tools: [
      "FastAPI", "Django", "Django REST Framework", "Flask", "Laravel",
      "Playwright", "n8n", "Celery", "Pydantic",
    ],
  },
  {
    name: "Voice & Local AI",
    icon: <FaMicrophone className="text-4xl" />,
    skills: [
      "Speech-to-text", "Text-to-speech", "Voice activity detection",
      "CPU inference", "On-premise AI",
    ],
    tools: ["faster-whisper", "Piper", "Silero VAD", "ONNX"],
  },
  {
    name: "Data & Analytics",
    icon: <BiData className="text-4xl" />,
    skills: [
      "Data cleaning", "Data validation", "Feature engineering",
      "Forecasting", "Business intelligence",
    ],
    tools: [
      "Pandas", "NumPy", "GeoPandas", "Matplotlib", "Seaborn", "Plotly",
      "Prophet", "Power BI", "Datadog", "Looker",
    ],
  },
  {
    name: "Infrastructure & Quality",
    icon: <FaCogs className="text-4xl" />,
    skills: ["CI/CD", "Containers", "Relational databases", "NoSQL", "Unit testing"],
    tools: [
      "Docker", "Git", "Linux", "MySQL", "Redis", "Microsoft Azure",
      "PostgreSQL", "Google Cloud", "GitHub Actions", "Pytest",
    ],
  },
  {
    name: "Spoken Languages",
    icon: <FaUsers className="text-4xl" />,
    skills: ["Arabic (Native)", "English (Fluent)"],
    tools: [],
  },
  {
    name: "Programming Languages",
    icon: <FaPython className="text-4xl" />,
    skills: [],
    tools: ["Python", "SQL", "TypeScript"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-transparent" aria-labelledby="skills-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="skills-heading" className="text-4xl font-bold text-center text-white mb-12">
          Skills & Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col p-6 rounded-lg hover:transform hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-white/30">{category.icon}</div>
                <h3 className="text-xl font-semibold text-white">{category.name}</h3>
              </div>
              {category.skills.length > 0 && (
                <ul className="mt-2 flex flex-wrap justify-center gap-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="skills max-w-full break-words">
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
              {category.skills.length > 0 && category.tools.length > 0 && (
                <div aria-hidden="true" className="mx-auto my-3 h-[1.2px] w-1/3 bg-white/15" />
              )}
              {category.tools.length > 0 && (
                <ul className={category.skills.length > 0 ? "flex flex-wrap justify-center gap-2" : "mt-2 flex flex-wrap justify-center gap-2"}>
                  {category.tools.map((tool) => (
                    <li key={tool} className="skills max-w-full break-words">
                      {tool}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
