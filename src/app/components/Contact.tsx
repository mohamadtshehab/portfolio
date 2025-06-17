"use client";

import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section id="contact" className="py-20" style={{
      backgroundImage: 'linear-gradient(to bottom,#123529, black)',
    }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Get In Touch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white"></h3>
            <div className="flex items-center space-x-4 text-gray-300">
              <FaEnvelope className="text-2xl text-white" />
              <a href="mailto:mohamadshehab@my.uopeople.edu">
                mohamadshehab@my.uopeople.edu
              </a>
            </div>
            <div className="flex items-center space-x-4 text-gray-300">
              <FaPhone className="text-2xl" />
              <a href="tel:+963994416998" className="hover:text-white">
                +963 994 416 998
              </a>
            </div>
            <div className="text-gray-300">
              <p>Darayya, Damascus, Syria</p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://github.com/mohamadtshehab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-gray-300 transition-colors"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/mohamad-shehab-493121279"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-gray-300 hover:text-white transition-colors"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
  {/* Input fields */}
  <div>
    <label htmlFor="name" className="block text-sm font-medium text-gray-300">
      Name
    </label>
    <input
      type="text"
      id="name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      className="pl-1 mt-1 block w-full rounded-md bg-white/10 border-white text-white shadow-sm focus:border-white"
      required
    />
  </div>

  <div>
    <label htmlFor="email" className="block text-sm font-medium text-white">
      Email
    </label>
    <input
      type="email"
      id="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="pl-1 mt-1 block w-full rounded-md bg-white/10 border-white text-white shadow-sm focus:border-white"
      required
    />
  </div>

  <div>
    <label htmlFor="message" className="block text-sm font-medium text-white">
      Message
    </label>
    <textarea
      id="message"
      name="message"
      value={formData.message}
      onChange={handleChange}
      rows={4}
      className="pl-1 mt-1 block w-full rounded-md bg-white/10 border-gray-700 text-white shadow-sm"
      required
    />
  </div>

  {/* Centering Button */}
  <div className="flex justify-center">
    <button
      type="submit"
      className="hover:bg-white/10 hover:scale-105 active:scale-95 hover:shadow-lg text-white px-8 py-4 rounded-xl transition-all duration-200 border border-white border-opacity-30"
    >
      Send Message
    </button>
  </div>
</form>
        </div>
      </div>
    </section>
  );
};

export default Contact; 