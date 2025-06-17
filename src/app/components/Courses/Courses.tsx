'use client';
import certificates from './certificatesInfo'


const Certificates = () => {
  return (
    <section id="certificates" className="py-20 relative bg-[#123529] ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          My Courses
        </h2>
        
        <div className="space-y-8">
          {certificates.map((certificate, index) => (
            <div key={index}>
              <CertificateCard {...certificate} />
              
              {index < certificates.length - 1 && (
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30 my-8"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;