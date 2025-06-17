'use client';
import { useState, useEffect, useRef, ReactElement} from 'react';
import { FaGithub, FaPlay, FaFileAlt, FaRedo, FaTelegram, FaEye } from 'react-icons/fa';
import styles from './ProjectCard.module.css';
import { SiGooglecolab } from 'react-icons/si';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  docUrl?: string;
  interactiveComponent: ReactElement;
  telegramUrl?: string;
  colabUrl?: string;
  interactive?: boolean;
}

const ProjectCard = ({ 
  title, 
  description, 
  technologies, 
  githubUrl, 
  docUrl, 
  interactiveComponent,
  telegramUrl,
  colabUrl,
  interactive
}: ProjectCardProps) => {
  const [showInteractive, setShowInteractive] = useState(false);
  const [animate, setAnimate] = useState(false);
  const interactiveRef = useRef<HTMLDivElement>(null);

  // Animation control for interactive section
  useEffect(() => {
    if (showInteractive && interactiveRef.current) {
      void interactiveRef.current.offsetWidth;
      const timer = setTimeout(() => setAnimate(true), 50);
      return () => clearTimeout(timer);
    }
  }, [showInteractive]);

  const handleTryClick = () => {
    setShowInteractive(true);
  };

  const handleResetClick = () => {
    setAnimate(false);
    const timer = setTimeout(() => {
      setShowInteractive(false);
    }, 300);
    return () => clearTimeout(timer);
  };

  return (
    <div className="relative rounded-lg overflow-hidden bg-transparent ">
      <div className="p-6 " >
        <div className="flex items-center mb-4 ">
          <h3 className="text-2xl font-semibold text-white mr-4 ">
            {title}
          </h3>
          <div className="flex items-center">
          {telegramUrl && (
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/10 transition-colors mr-2"
                title="View telegram channel"
              >
                <FaTelegram className="text-xl" />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/10 transition-colors mr-2"
                title="View GitHub repository"
              >
                <FaGithub className="text-xl" />
              </a>
            )}
            {docUrl && (
              <a
                href={docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/10 transition-colors mr-2"
                title="View project documentation"
              >
                <FaFileAlt className="text-xl" />
              </a>
            )}
            {colabUrl && (
              <a
                href={colabUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/10 transition-colors mr-2"
                title="View code on Google Colab"
              >
                <SiGooglecolab className="text-xl" />
            </a>
            )}
          </div>
        </div>

        {!showInteractive ? (
          <>
            <p className="text-white mb-6" dangerouslySetInnerHTML={{ __html: description.replace(/<a /g, `<a class="${styles.link}" `) }} />
            
            {technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-white text-sm rounded-full border border-white/20 hover:border-white transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleTryClick}
                className="hover:bg-white/10 hover:scale-105 active:scale-95 hover:shadow-lg text-white px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-200 border border-white border-opacity-30"
              >{interactive ? 
              <>
              <FaPlay className="text-xl" />
              <span className="font-semibold">Give it a try</span>
              </>
              :
              <>
              <FaEye className="text-xl" />
              <span className="font-semibold">View images</span>
              </>
              }
              </button>
            </div>
          </>
        ) : (
          <div
            ref={interactiveRef}
            className={`
              relative
              transition-all duration-500 ease-in-out
              ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
            `}
            style={{ transformOrigin: 'top' }}
          >
            {/* Reset Button */}
            <button
              onClick={handleResetClick}
              className="absolute -top-12 right-0 z-10 text-white p-3 hover:text-white/10 rounded-bl-lg transition-colors"
              title="Reset"
            >
              <FaRedo className="text-xl" />
            </button>

            {/* Interactive Component */}
            {interactiveComponent}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;