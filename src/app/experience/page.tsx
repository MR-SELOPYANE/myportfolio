'use client';

import { useState, useEffect } from 'react';

interface ExperienceItem {
  title: string;
  description: string;
  dates: string;
}

const experienceData: ExperienceItem[] = [
  {
    title: 'Trying to build an OS from Scratch – Personal Project [Called NEXUS OS]',
    description:
      'Embarking on a personal project to build an operating system from scratch using C and Assembly language. This ambitious endeavor aims to deepen my understanding of low-level programming, computer architecture, and system design. The project is still in its early stages, but I am committed to learning and overcoming the challenges associated with OS development.',
    dates: 'May 2025 - Present',
  },
  {
    title: '2nd Place – G20 Hackathon',
    description:
      'Secured 2nd place in the G20 Hackathon organized by Dept of Tourism, where we developed an innovative solution to address a real-world problem. This achievement highlights my problem-solving skills and ability to work under pressure. We created a web-based application that helps tourists find their way around South Africa and also learn about the culture and history of the country, as we also solve the issue of unemployed youth across South Africa. This platform helps the unemployed youth by helping them learn how to start a business from scratch and also how to manage it.',
    dates: 'Sep 2025',
  },
  {
    title: 'Created A toyCostPredictor – Personal Project [coding for fun in java]',
    description:
      'Developed a machine learning model using Java to predict the cost of toys based on various features such as material, size, brand, and age group. This project helped me understand the basics of modularization, character manipulation, and arrays, and improve my Java skills.',
    dates: 'Mar 2025 - Present',
  },
  {
    title: 'Deputy Chairperson for GKSS_TUT',
    description:
      'Elected as the Deputy Chairperson for the Geekulcha Student Society (GKSS_TUT) at TUT. I assist in organizing events, workshops, and hackathons to promote technology and development skills among students.',
    dates: 'Jan 2025',
  },
  {
    title: 'Legends Bank App (Java CLI)',
    description:
      'Developed a console-based banking application in Java that simulates basic banking operations like account creation, balance inquiry, deposits, and withdrawals. This project helped me master Java loops (for, while, do-while).',
    dates: 'Dec 2024',
  },
  {
    title: 'Restaurant Management System (Java)',
    description:
      'Developed a comprehensive restaurant management system while growing my Java skills. The system includes features such as table reservations, order management, billing, and inventory tracking.',
    dates: 'Aug 2024',
  },
  {
    title: 'ATM Machine in Java – CLI Project',
    description:
      'Created a console-based ATM machine application in Java that simulates basic banking operations. This project was key in understanding and applying fundamental object-oriented programming concepts.',
    dates: 'Jul 2024',
  },
  {
    title: 'Library Assistant – TUT Project',
    description:
      'My first official university project: a Java-executable designed to help new students navigate university library systems, find resources, and assist with email creation and other IT-related setup issues.',
    dates: 'May 2024',
  },
];

const useExperienceLoader = (data: ExperienceItem[]) => {
  const [loadedData, setLoadedData] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadedData(data);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [data]);

  return { loadedData: loadedData, loading };
};

export default function ExperiencePage() {
  const { loadedData: experience, loading } = useExperienceLoader(experienceData);

  if (loading)
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-neon-blue text-glow mb-4 animate-pulse">
            Loading Experience...
          </h1>
          <p className="text-stars-200">Warping in your professional history...</p>
        </div>
      </div>
    );

  return (
    <div className="flex-1 p-6 space-y-8 overflow-x-hidden">
      <h1 className="text-4xl md:text-5xl font-bold text-neon-blue text-center text-glow mb-4 animate-pulse">
        My Experience
      </h1>
      <p className="text-stars-200 text-center mb-8">
        A chronological journey through my projects, achievements, and roles.
      </p>

      {/* Timeline Container */}
      <div className="relative pl-8 max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-neon-blue/30"></div>

        {/* Timeline Items */}
        <div className="space-y-8">
          {experience.map((item, index) => (
            <div key={index} className="relative flex gap-6 group">
              {/* Date Dot */}
              <div className="absolute left-0 w-3 h-3 rounded-full bg-neon-blue border-2 border-space-900 z-10"></div>

              {/* Date Label */}
              <div className="text-xs text-stars-400 mt-0.5 whitespace-nowrap">
                {item.dates}
              </div>

              {/* Content */}
              <div className="flex-1 glass-panel p-4 rounded-xl bg-space-800/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/20">
                <h2 className="text-lg font-bold text-neon-blue text-glow mb-2">{item.title}</h2>
                <p className="text-stars-200/90 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-stars-400 text-center pt-4">
        Explore my <strong>Projects</strong> page to see the code behind some of these initiatives!
      </p>
    </div>
  );
}