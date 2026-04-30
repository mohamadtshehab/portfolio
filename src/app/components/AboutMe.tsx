"use client";

const AboutMe = () => {
  return (
    <section id="about" className="py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-3xl font-bold text-white sm:mb-8 sm:text-4xl">
          About Me
        </h2>

        <div className="max-w-2xl mx-auto text-center">
          <p className="text-base text-white/90 leading-relaxed sm:text-lg">
            AI and software engineer. I ship multi-agent systems and data-heavy apps.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe; 