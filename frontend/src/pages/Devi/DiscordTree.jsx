import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const HealthTopicNode = ({ topic}) => {
  return (
    <div className="flex  items-center md:w-full mb-3">
      {/* Channel line */}
      {/* <div className={`w-1 h-8 bg-light flex items-center`} /> */}
      {/* Topic name */}
      <a
        href={topic.href}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-light text-white px-4 py-3 rounded-lg md:w-full min-h-[3rem] flex items-center hover:bg-opacity-90 transition-all"
      >
        {topic.name}
      </a>
    </div>
  );
};

const HealthTopicTree = () => {
  const topics = [
    {
      id: 1,
      name: 'Late Pregnancy & Postpartum',
      href: 'https://discord.gg/46k7bNrN',
      children: [
        {
          id: 2,
          name: 'Mental Health Tips',
          href: 'https://example.com/mental-health-tips',
          children: [],
        },
        {
          id: 3,
          name: 'Support Groups',
          href: 'https://example.com/support-groups',
          children: [],
        },
      ],
    },
    {
      id: 4,
      name: 'Violence',
      href: 'https://discord.gg/upvCFtEa',
      children: [
        {
          id: 5,
          name: 'Domestic Violence',
          href: 'https://example.com/domestic-violence',
          children: [],
        },
        {
          id: 6,
          name: 'Support for Victims',
          href: 'https://example.com/support-for-victims',
          children: [],
        },
      ],
    },
    {
      id: 7,
      name: 'Financial Dependence',
      href: 'https://discord.gg/z3XF7pdT',
      children: [
        {
          id: 8,
          name: 'Empowerment Resources',
          href: 'https://example.com/empowerment-resources',
          children: [],
        },
      ],
    },
    {
      id: 9,
      name: 'PMDD (Premenstrual Dysphoric Disorder)',
      href: 'https://discord.gg/zjGVpaqF',
      children: [
        {
          id: 10,
          name: 'Symptoms & Diagnosis',
          href: 'https://example.com/symptoms-diagnosis',
          children: [],
        },
        {
          id: 11,
          name: 'Treatment Options',
          href: 'https://example.com/treatment-options',
          children: [],
        },
      ],
    },
    {
      id: 12,
      name: 'PMS (Premenstrual Syndrome)',
      href: 'https://discord.gg/VXUN5kzd',
      children: [
        {
          id: 13,
          name: 'Managing Symptoms',
          href: 'https://example.com/managing-symptoms',
          children: [],
        },
      ],
    },
    {
      id: 14,
      name: 'Hormonal Changes in PCOD',
      href: 'https://discord.gg/5UEErHNQ',
      children: [
        {
          id: 15,
          name: 'Managing PCOD',
          href: 'https://example.com/managing-pcod',
          children: [],
        },
      ],
    },
    {
      id: 16,
      name: 'Infertility',
      href: 'https://discord.gg/vtxc5vUK',
      children: [
        {
          id: 17,
          name: 'Fertility Treatment',
          href: 'https://example.com/fertility-treatment',
          children: [],
        },
        {
          id: 18,
          name: 'Support Groups for Infertility',
          href: 'https://example.com/support-groups-infertility',
          children: [],
        },
      ],
    },
    {
      id: 19,
      name: 'Pregnancy Loss',
      href: 'https://discord.gg/YRmQGG89',
      children: [
        {
          id: 20,
          name: 'Emotional Support after Loss',
          href: 'https://example.com/emotional-support-loss',
          children: [],
        },
      ],
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4  rounded-lg">
      <div className="flex items-center space-x-4 mb-6">
        {/* Main Server line */}
        <div className="w-1 h-8 bg-light" />
        <p className="text-white text-lg font-semibold m-6">
          Devi Are You Stressed?
        </p>
      </div>
      
      <p className="text-xs font-semibold text-gray-800 mb-6">
        Connect with women facing the same problem.
      </p>
      
      <div className="space-y-2 flex gap-1 flex-wrap md:flex-col ">
        {topics.map((topic) => (
          <HealthTopicNode key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
};

export default HealthTopicTree;


{/* <div className="max-w-2xl mx-auto space-y-4 p-4">
<div className="flex items-center space-x-4">

  <div className="w-1 h-8 bg-dark" />
  <p className="text-white text-lg font-semibold">Devi Are You Stressed ?   
  </p>
</div>
  <p className='text-xs font-semibold text-gray-700 '>
      Join our Discord 
  </p>

{topics.map((topic) => (
  <HealthTopicNode key={topic.id} topic={topic} level={1} />
))}
</div> */}