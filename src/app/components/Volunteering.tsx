'use client';
import { FaMicrophone, FaShareAlt } from 'react-icons/fa';
import { BiBookOpen } from 'react-icons/bi';
import React from 'react';
import Image from 'next/image';

// --- DATA STRUCTURES (No changes) ---
interface Reaction {
  author: string;
  original: string;
  translation: string;
}

interface VolunteerRole {
  title: string;
  description: string;
  icon: React.ReactNode;
  reactions: Reaction[];
}

interface VolunteerCardProps extends VolunteerRole {
  index: number;
}

// --- DATA SOURCE (No changes) ---
const volunteerRoles: VolunteerRole[] = [
    {
    title: 'NLP Course Team Leader',
    description: 'Led the first volunteer-created NLP course, making complex AI concepts accessible and engaging for over 100 senior students.',
    icon: <BiBookOpen className="text-4xl" />,
    reactions: [
      {
        author: 'Mahmoud, Student',
        original: 'لح اختصر العجقة عل توبيك و اتشكر فريق ل NLP بإسمي و بإسم باقي طلاب الذكاء كلون ❤️ الله يسلم ايديكم محاضرات اقل ما يقال عنها "فخمة" 🔥🔥🔥 الله يجزيكم الخير و يكافيكم على هل مستوى الخارق 💪',
        translation: `Not gonna overcomplicate things — just wanna thank the NLP team on my behalf and on behalf of all the AI students ❤️
        God bless your hands — these lectures are straight-up premium 🔥🔥🔥
        May God reward you big time for delivering such top-tier work 💪`
      },
      {
        author: 'Rama, Student',
        original: 'صحيح مضغوطين بهالمادة وعندجد هالمادة متعبة ومملة. بس الحق يقال انو المحاضرات شي على عيني. وصدقني لو ما بعرف انو انت اللي كاتبن رح احزر لحالي من الدقة والتفاصيل اللي موجودة فيهن. عنجد الله يعطيك العافية ويوفقك.',
        translation: "Yeah, this course is definitely intense — honestly, it's exhausting and kinda boring. But to be fair, the lectures are seriously impressive. And trust me, even if I didn’t know you were the one who wrote them, I would’ve guessed from the level of detail and precision. Really — hats off to you, and may God give you strength and success."
      },
      {
        author: 'Moaaz, Student',
        original: 'وعنجد يعطيكم الف عافية المحاضرات كتيييير خارقة 🔥',
        translation: "Seriously, huge thanks — the lectures are absolutely amazing 🔥"
      },
    ]
  },
  {
    title: 'Podcast Host & Creator',
    description: 'Launched and produced a 12-episode podcast on AI, creative problem-solving, and personal development for a growing audience.',
    icon: <FaMicrophone className="text-4xl" />,
    reactions: [
       {
        author: 'Farah, Listener',
        original: '@MoeChehab ما تطول علينا بالحلقة الجاية 😂💙',
        translation: "@MoeChehab You really need to make a new episode soon 😂💙"
      },
      {
        author: 'Moe, Host',
        original: 'كتيييير خارقة الحلقة 🔥🔥🔥 يعطيكم العافية ❤️❤️❤️',
        translation: `That episode was so good 🔥🔥🔥 God bless you ❤️❤️❤️`
      },
    ]
  },
  {
    title: 'Social Media Manager',
    description: 'Managed and created content for the organization\'s social media platforms, increasing engagement and visibility.',
    icon: <FaShareAlt className="text-4xl" />,
    reactions: [
       {
        author: 'Community Member',
        original: 'المحتوى الذي تشاركونه رائع ومفيد جداً. شكراً لجهودكم في إدارة الحساب!',
        translation: 'Community Feedback: "The content you share is fantastic and very useful. Thank you for your efforts in managing the account!"'
      },
      {
        author: 'Collaborator',
        original: 'كان العمل معكم على حملة التواصل الاجتماعي تجربة سلسة وناجحة. فريقكم منظم ومبدع.',
        translation: 'Collaborator Feedback: "Working with you on the social media campaign was a smooth and successful experience. Your team is organized and creative."'
      },
    ]
  },
];


// --- REACTION CARD SUB-COMPONENT (No changes) ---
const ReactionCard: React.FC<Reaction> = ({ author, original, translation }) => (
  <div className="group relative bg-[#0a1f1a]/50 rounded-lg p-5 border border-white/10 overflow-hidden h-full flex flex-col">
    {/* Subtle gradient glow on hover */}
    <div className="absolute -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300 blur-md"></div>
    
    <div className="relative z-10 flex flex-col flex-grow">
      <div className="flex items-center gap-3 mb-4">
        <h5 className="font-bold text-white">{author}</h5>
      </div>
      
      <div className="flex-grow space-y-4">
        <p dir="rtl" className="text-white/90 text-right leading-relaxed" style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>
          {original}
        </p>
      </div>

      <div className="border-t border-white/10 pt-4 mt-4">
        <p className="text-white/70 text-sm leading-relaxed italic">
          "{translation}"
        </p>
      </div>
    </div>
  </div>
);


// --- VOLUNTEER CARD SUB-COMPONENT (MODIFIED) ---
const VolunteerCard: React.FC<VolunteerCardProps> = ({
  title,
  description,
  icon,
  reactions,
  index
}) => {
  const isReversed = index % 2 !== 0;

  return (
    <div className={`flex flex-col md:flex-row items-start gap-12 ${isReversed ? 'md:flex-row-reverse' : ''}`}>
      <div className="w-full md:w-1/3 space-y-4 md:sticky md:top-24">
        <div className="flex items-center gap-4">
          <div className="text-white/50">{icon}</div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-white/80 leading-relaxed">{description}</p>
      </div>

      <div className="w-full md:w-2/3">
        {/* MODIFICATION: Changed from a grid to a vertical stack */}
        <div className="space-y-6">
          {reactions.map((reaction, i) => (
            <ReactionCard key={i} {...reaction} />
          ))}
        </div>
      </div>
    </div>
  );
};


// --- MAIN VOLUNTEERING COMPONENT (No changes) ---
const Volunteering = () => {
  return (
    <section id="volunteering" className="py-20 relative bg-[#123529]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          Volunteering Experience
        </h2>
        
        <div className="space-y-20">
          {volunteerRoles.map((role, index) => (
            <React.Fragment key={index}>
              <VolunteerCard {...role} index={index} />
              
              {index < volunteerRoles.length - 1 && (
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent my-16"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Volunteering;