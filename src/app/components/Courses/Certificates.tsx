'use client';

import { useState, useEffect } from 'react'; // Import useEffect
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import certificates from './certificatesInfo';

interface Certificate {
  title: string;
  institution: string;
  description: string;
  skills: string[];
  courseraUrl: string;
  image: string;
  date: string;
}

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCert]);

  return (
    <>
      <section id="certificates" className="relative bg-[#123529] py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl font-bold text-white">My Certificates</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {certificates.map(cert => (
              <motion.div
                key={cert.title}
                layoutId={`card-${cert.title}`} // Unique ID for the animation link
                className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg"
                onClick={() => setSelectedCert(cert)}
              >
                <motion.div
                  className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                >
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    width={400}
                    height={280}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m4.5 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedCert && (
          // Backdrop
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/7 p-4"
            onClick={() => setSelectedCert(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId={`card-${selectedCert.title}`}
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white shadow-2xl dark:bg-white/10 custom-scrollbar"
              onClick={e => e.stopPropagation()}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <motion.div
                className="p-6 md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1, duration: 0.4 } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              >
                <div className="mb-4 flex items-start justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">{selectedCert.title}</h2>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="text-gray-500 transition-colors hover:text-gray-800 dark:hover:text-white"
                    aria-label="Close modal"
                  >
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="mb-1 text-lg text-gray-600 dark:text-gray-300">{selectedCert.institution}</p>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">{selectedCert.date}</p>
                <div className="mb-6">
                  <Image
                    src={selectedCert.image}
                    alt={`${selectedCert.title} Certificate`}
                    width={800}
                    height={565}
                    className="h-auto w-full rounded-md border border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div className="mb-6">
                  <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">Skills Covered</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 text-white text-sm rounded-full border border-white/20 hover:border-white transition-colors duration-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mb-6 text-base text-gray-700 dark:text-gray-300">{selectedCert.description}</p>
                
                <div className="flex justify-center mt-8">
                  <a
                    href={selectedCert.courseraUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-white/10 hover:scale-105 active:scale-95 hover:shadow-lg text-white px-8 py-3 rounded-xl transition-all duration-200 border border-white border-opacity-30 flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    Verify Certificate
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Certificates;