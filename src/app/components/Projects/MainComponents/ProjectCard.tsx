'use client';
import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaPlay, FaFileAlt, FaRedo, FaTelegram, FaEye } from 'react-icons/fa';
import styles from './ProjectCard.module.css';
import { SiGooglecolab } from 'react-icons/si';
import type { ProjectCardProps } from './portfolioProject';

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
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h3 className="text-xl font-semibold text-white sm:text-2xl">
            {title}
          </h3>
          <div className="flex flex-wrap items-center gap-1">
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
          <div className="py-6 text-center sm:py-8 px-3 sm:px-4 md:px-6">
            <div className="mx-auto w-full max-w-2xl rounded-md border border-white/20 bg-white/10 p-4 backdrop-blur-sm sm:rounded-lg sm:p-5 md:p-6">
              <div className="mb-4">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/30 bg-transparent sm:h-16 sm:w-16">
                  <FaPlay className="text-xl text-white/80 sm:text-2xl" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white sm:text-xl">
                  Interactive Showcase
                </h3>
              </div>

              <div className="mb-6 space-y-3 text-left text-sm text-white/90 sm:text-base">
                <p>
                  This interactive showcase represents just a{" "}
                  <span className="font-semibold text-white underline">core part</span> of
                  the complete project experience.
                </p>
                <p>
                  While it demonstrates the main functionality and gives you a hands-on feel
                  for the project&apos;s capabilities, it doesn&apos;t capture the full scope,
                  context, and comprehensive features that make up the entire solution. This
                  applies to all interactive showcases in this portfolio.
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
                <button
                  type="button"
                  onClick={() => setShowNote(false)}
                  className="custom-button w-full justify-center sm:w-auto"
                >
                  Go Back
                </button>
                <button
                  type="button"
                  onClick={handleNoteAcknowledge}
                  className="custom-button w-full justify-center sm:w-auto"
                >
                  <FaPlay className="text-lg" />
                  <span className="font-semibold">Continue to Showcase</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            ref={interactiveRef}
            className={`
              relative flex flex-col gap-2 pt-2
              transition-all duration-500 ease-in-out
              sm:gap-0 sm:pt-0
              ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
            `}
            style={{ transformOrigin: 'top' }}
          >
            <div className="flex w-full shrink-0 justify-end sm:absolute sm:-top-12 sm:right-0 sm:z-10">
              <button
                type="button"
                onClick={handleResetClick}
                className="p-3 text-white transition-colors hover:text-white/70 sm:rounded-bl-lg sm:hover:text-white/10"
                title="Reset"
              >
                <FaRedo className="text-xl" />
              </button>
            </div>

            <div className="min-w-0 flex-1">{interactiveComponent}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;