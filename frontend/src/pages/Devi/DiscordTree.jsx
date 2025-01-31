import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const HealthTopicNode = ({ topic, level }) => {
  const [expanded, setExpanded] = useState(false);
//   const [newLink, setNewLink] = useState('');
const handleExpand =()=>{
    setExpanded(!expanded);
}

//   const handleLinkChange = (e) => setNewLink(e.target.value);

//   const handleAddLink = () => {
//     if (newLink) {
//       topic.href = newLink; // Here can directly add new links if needed
//       setNewLink('');
//     }
//   };

  return (
    <div className="relative flex items-center ">
      {/* Channel line */}
      <div className={`w-1 h-8 bg-blue-600 absolute left-${level * 12} flex items-center `} />

      {/* Topic name */}
      <a
        href={topic.href}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-800 text-white px-3 py-1 rounded rounded-r-2xl cursor-pointer"
      >
        {topic.name}
        </a>
        <div>

        {topic.children?.length > 0 && (
            <span className="ml-1 flex items-center" onClick={handleExpand}>
            {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
        </div>

      {/* Render child nodes if expanded */}
      {expanded && (
        <div className="ml-4 flex space-x-4">
          {topic.children.map((child) => (
            <HealthTopicNode key={child.id} topic={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const HealthTopicTree = () => {
  // Women's health issues
  const topics = [
    {
      id: 1,
      name: 'Mental Disturbances (Late Pregnancy & Postpartum)',
      href: 'https://example.com/mental-disturbances',
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
      href: 'https://example.com/violence',
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
      href: 'https://example.com/financial-dependence',
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
      href: 'https://example.com/pmdd',
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
      href: 'https://example.com/pms',
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
      href: 'https://example.com/hormonal-changes-pcod',
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
      href: 'https://example.com/infertility',
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
      href: 'https://example.com/pregnancy-loss',
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
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex items-center space-x-4">
        {/* Main Server line */}
        <div className="w-1 h-8 bg-blue-600" />
        <p className="text-white text-lg font-semibold">Devi Are You Stressed ?   
        </p>
      </div>
        <p className='text-xs font-semibold text-gray-700 '>
            Join our Discord 
        </p>
      {/* Render the topics */}
      {topics.map((topic) => (
        <HealthTopicNode key={topic.id} topic={topic} level={1} />
      ))}
    </div>
  );
};

export default HealthTopicTree;
