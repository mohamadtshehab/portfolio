'use client';
import { FaUsers, FaMicrophone, FaShareAlt } from 'react-icons/fa';
import { BiBookOpen } from 'react-icons/bi';
import React, { useState } from 'react';
import Image from 'next/image';

interface VolunteerRole {
  title: string;
  description: string;
  icon: React.ReactNode;
  images: string[];
  translations: string[];
}

const volunteerRoles: VolunteerRole[] = [
  {
    title: 'NLP Course Team Leader',
    description: 'Led the first volunteer-created NLP course materials for 100+ senior students.',
    icon: <BiBookOpen className="text-4xl" />,
    images: ['/rbcs/nlp-reactions/1.png', '/rbcs/nlp-reactions/2.png', '/rbcs/nlp-reactions/3.png'],
    translations: [
      'Student feedback: "The NLP course was incredibly well-structured and practical. The materials were comprehensive and easy to follow."',
      'Team member: "Working under your leadership was inspiring. You made complex concepts accessible to everyone."',
      'Course participant: "This was the most engaging AI course I\'ve taken. The hands-on approach really helped me understand NLP."'
    ]
  },
  {
    title: 'Podcast Host & Creator',
    description: 'Launched a 12-episode podcast series on AI, problem-solving, and personal development.',
    icon: <FaMicrophone className="text-4xl" />,
    images: ['/rbcs/podcast-reactions/1.png', '/rbcs/podcast-reactions/2.png', '/rbcs/podcast-reactions/3.png'],
    translations: [
      'Listener feedback: "Your podcast episodes on AI and problem-solving have been incredibly insightful. Keep up the great work!"',
      'Guest speaker: "It was a pleasure being interviewed on your podcast. Your questions were thoughtful and engaging."',
      'Regular listener: "The personal development episodes have really helped me grow. Your insights are valuable and practical."'
    ]
  },
  {
    title: 'Social Media Team Member',
    description: 'Participated in the social media team and been responsible for media presence of the team.',
    icon: <FaShareAlt className="text-4xl" />,
    images: ['/rbcs/social-media-reactions/1.png'],
    translations: [
      'Team feedback: "Your social media content has significantly increased our engagement and reach. Great work on maintaining our brand voice!"'
    ]
  }
];

const Volunteering = () => {
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  return (
    <section id="volunteering" className="py-20 bg-[#0a1f1a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Volunteering Experience
        </h2>
        
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            RBCs Team
          </h3>
          <p className="text-white/80 text-center max-w-3xl mx-auto mb-8">
            Contributing to the RBCs community through various leadership and creative roles, 
            helping to educate and inspire others in the field of AI and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {volunteerRoles.map((role, index) => (
            <div
              key={index}
              className="bg-[#123529] rounded-lg p-6 hover:transform hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-white/10"
              onClick={() => setSelectedRole(selectedRole === index ? null : index)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-white/30">{role.icon}</div>
                <h4 className="text-xl font-semibold text-white">{role.title}</h4>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {role.description}
              </p>
            </div>
          ))}
        </div>

        {selectedRole !== null && (
          <div className="bg-[#123529] rounded-lg p-8 border border-white/10">
            <h4 className="text-2xl font-semibold text-white mb-6 text-center">
              {volunteerRoles[selectedRole].title} - Team Reactions
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {volunteerRoles[selectedRole].images.map((image, imageIndex) => (
                <div key={imageIndex} className="space-y-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-white/5">
                    <Image
                      src={image}
                      alt={`Reaction ${imageIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white/90 text-sm leading-relaxed">
                      {volunteerRoles[selectedRole].translations[imageIndex]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Volunteering; 