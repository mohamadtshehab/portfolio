'use client';

import { useState } from 'react';
import Image from 'next/image';
import certificates from './certificatesInfo'; // Assumes your data is in 'data/certificates.ts'

// Define the shape of your certificate data for type safety
interface Certificate {
  title: string;
  institution: string;
  description: string;
  skills: string[];
  courseraUrl: string;
  image: string;
  date: string;
}

// --- Modal Component (No changes needed here) ---
const CertificateModal = ({ certificate, onClose }: { certificate: Certificate; onClose: () => void }) => {
  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white shadow-2xl dark:bg-gray-800"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          <div className="mb-4 flex items-start justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">{certificate.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 transition-colors hover:text-gray-800 dark:hover:text-white"
              aria-label="Close modal"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="mb-1 text-lg text-gray-600 dark:text-gray-300">{certificate.institution}</p>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">{certificate.date}</p>
          <div className="mb-6">
            <Image
              src={certificate.image}
              alt={`${certificate.title} Certificate`}
              width={800}
              height={565}
              className="h-auto w-full rounded-md border border-gray-200 dark:border-gray-700"
            />
          </div>
          <p className="mb-6 text-base text-gray-700 dark:text-gray-300">{certificate.description}</p>
          <div className="mb-6">
            <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">Skills Covered</h3>
            <div className="flex flex-wrap gap-2">
              {certificate.skills.map(skill => (
                <span key={skill} className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <a
            href={certificate.courseraUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            Verify Certificate
          </a>
        </div>
      </div>
    </div>
  );
};

// --- Main Certificates Component (Updated with new styling) ---
const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <>
      <section id="certificates" className="relative bg-[#123529] py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl font-bold text-white">
            My Certificates
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {certificates.map(cert => (
              <div
                key={cert.title}
                className="group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl"
                onClick={() => setSelectedCert(cert)}
              >
                <Image
                  src={cert.image}
                  alt={cert.title}
                  width={400}
                  height={280}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The modal is outside the section flow but will display correctly due to fixed positioning */}
      {selectedCert && <CertificateModal certificate={selectedCert} onClose={() => setSelectedCert(null)} />}
    </>
  );
};

export default Certificates;