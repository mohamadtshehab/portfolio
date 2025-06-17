import { FaGithub, FaLinkedin } from 'react-icons/fa';
import GradientText from './custom/GradientText';
import Image from 'next/image';
const Hero = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center text-white py-20"
      style={{
        backgroundImage: 'linear-gradient(to bottom, black, #123529)',
      }}
    >
      <div className="flex flex-row items-center justify-center">
        {/* Image Section */}
        <div className="w-1/2 pr-16">
          <Image
            src="/my-image.jpg"
            alt="Personal Image"
            className="rounded-lg shadow-xl"
            width={400}
            height={500}
          />
        </div>

        {/* Text Information Section */}
        <div className="w-1/2 text-center">
        <p className='text-5xl text-white/80 md:text-7xl font-bold'>Hi, I'm </p>
          <GradientText
          colors={["#b0e4d0", "#0d261f", "#9de9d9", "#0d261f", "#a3d7c3"]}
          animationSpeed={3}
          showBorder={false}
          className='text-5xl md:text-7xl font-bold mb-6 justify-center'>
            Mohamad Shehab
          </GradientText>
          <p className="text-xl md:text mb-8 text-gray-300">
            AI Engineer | Backend Developer | Data Analyst
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <a
              href="https://github.com/mohamadtshehab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-custom-green transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/mohamad-shehab-493121279"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl transition-colors"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;