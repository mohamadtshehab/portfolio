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
  note?: string;
}

// Global state to track if user has seen the note across all projects
let globalHasSeenNote = false;

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
  const [showNote, setShowNote] = useState(false);
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
    if (interactive && !globalHasSeenNote) {
      setShowNote(true);
    } else {
      setShowInteractive(true);
    }
  };

  const handleNoteAcknowledge = () => {
    setShowNote(false);
    globalHasSeenNote = true;
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
                className="external-link"
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
                className="external-link"
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
                className="external-link"
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
                className="external-link"
                title="View code on Google Colab"
              >
                <SiGooglecolab className="text-xl" />
            </a>
            )}
          </div>
        </div>

        {!showInteractive && !showNote ? (
          <>
            <p className="text-white mb-6" dangerouslySetInnerHTML={{ __html: description.replace(/<a /g, `<a class="${styles.link}" `) }} />
            
            {technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="skills"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleTryClick}
                className="custom-button"
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
        ) : showNote ? (
          <div className="text-center py-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto border border-white/20">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-transparent border-2 border-white/30 rounded-full flex items-center justify-center">
                  <FaPlay className="text-2xl text-white/80" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Interactive Showcase</h3>
              </div>
              
              <div className="text-white/90 text-left space-y-3 mb-6">
                <p>
                  This interactive showcase represents just a <span className="text-white font-semibold underline">core part</span> of the complete project experience.
                </p>
                <p>
                  While it demonstrates the main functionality and gives you a hands-on feel for the project&apos;s capabilities, 
                  it doesn&apos;t capture the full scope, context, and comprehensive features that make up the entire solution. 
                  This applies to all interactive showcases in this portfolio.
                </p>
              </div>
              
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleNoteAcknowledge}
                  className="custom-button"
                >
                  <FaPlay className="text-lg" />
                  <span className="font-semibold">Continue to Showcase</span>
                </button>
                <button
                  onClick={() => setShowNote(false)}
                  className="custom-button"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
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