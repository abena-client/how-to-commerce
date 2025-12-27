import { useState } from 'react';
import { FaLinkedin, FaTwitter, FaGithub, FaTimes } from 'react-icons/fa';

const TeamShowcase = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Visionary leader with 15+ years in tech and e-commerce',
      linkedin: '#',
      twitter: '#',
      github: '#',
      proposal: {
        title: 'Strategic Vision for 2024-2025',
        summary: 'Leading HowTo into the next generation of Web3 e-commerce',
        objectives: [
          'Expand our product catalog to 10,000+ items across 50+ categories',
          'Integrate advanced AI-powered recommendation engine',
          'Launch mobile apps for iOS and Android platforms',
          'Establish partnerships with 100+ premium brands',
          'Achieve $50M in annual revenue by end of 2025'
        ],
        keyInitiatives: [
          {
            name: 'Global Expansion',
            description: 'Enter 20 new international markets with localized payment and shipping solutions'
          },
          {
            name: 'Web3 Integration',
            description: 'Full NFT marketplace integration with crypto payment options and digital collectibles'
          },
          {
            name: 'Sustainability Program',
            description: 'Carbon-neutral shipping and eco-friendly packaging for all products'
          }
        ],
        timeline: 'Q1 2024 - Q4 2025',
        budget: '$5M investment required'
      }
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'CTO',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Blockchain expert and full-stack developer',
      linkedin: '#',
      twitter: '#',
      github: '#',
      proposal: {
        title: 'Technical Infrastructure Modernization',
        summary: 'Building a scalable, secure, and lightning-fast platform',
        objectives: [
          'Migrate to microservices architecture for better scalability',
          'Implement GraphQL API for optimized data fetching',
          'Deploy Kubernetes clusters for auto-scaling capabilities',
          'Achieve 99.99% uptime with zero-downtime deployments',
          'Reduce page load times to under 1 second globally'
        ],
        keyInitiatives: [
          {
            name: 'Blockchain Integration',
            description: 'Smart contract implementation for secure transactions and NFT minting on Ethereum and Polygon networks'
          },
          {
            name: 'AI & Machine Learning',
            description: 'Deploy ML models for personalized recommendations, fraud detection, and inventory optimization'
          },
          {
            name: 'Security Enhancement',
            description: 'Implement zero-trust architecture, end-to-end encryption, and regular security audits'
          }
        ],
        timeline: '18 months implementation',
        budget: '$3M for infrastructure and development'
      }
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      role: 'Head of Design',
      image: 'https://randomuser.me/api/portraits/men/46.jpg',
      bio: 'Award-winning UI/UX designer with passion for Web3',
      linkedin: '#',
      twitter: '#',
      github: '#',
      proposal: {
        title: 'Next-Gen User Experience Design',
        summary: 'Creating an immersive, intuitive, and delightful shopping experience',
        objectives: [
          'Redesign entire platform with modern, accessible UI components',
          'Implement dark/light mode with customizable themes',
          'Create 3D product visualization and AR try-on features',
          'Achieve AAA accessibility compliance (WCAG 2.1)',
          'Reduce cart abandonment rate by 40% through UX improvements'
        ],
        keyInitiatives: [
          {
            name: 'Design System 2.0',
            description: 'Build comprehensive design system with reusable components, ensuring consistency across all platforms'
          },
          {
            name: 'Immersive Shopping',
            description: 'Integrate AR/VR capabilities for virtual product try-ons and 360° product views'
          },
          {
            name: 'Personalization Engine',
            description: 'AI-driven personalized layouts and product recommendations based on user behavior'
          }
        ],
        timeline: '12 months rollout',
        budget: '$1.5M for design and implementation'
      }
    },
    {
      id: 4,
      name: 'Emily Watson',
      role: 'Marketing Director',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      bio: 'Growth hacker and digital marketing strategist',
      linkedin: '#',
      twitter: '#',
      github: '#',
      proposal: {
        title: 'Omnichannel Growth Strategy',
        summary: 'Driving explosive growth through data-driven marketing',
        objectives: [
          'Grow user base from 50K to 500K active customers',
          'Increase brand awareness by 300% across all channels',
          'Launch influencer partnership program with 100+ creators',
          'Achieve 5M monthly website visitors',
          'Build community of 100K+ engaged social media followers'
        ],
        keyInitiatives: [
          {
            name: 'Content Marketing Hub',
            description: 'Create educational content, product reviews, and tech tutorials to establish thought leadership'
          },
          {
            name: 'Referral & Loyalty Program',
            description: 'Launch gamified rewards system with NFT badges and exclusive perks for loyal customers'
          },
          {
            name: 'Strategic Partnerships',
            description: 'Collaborate with tech influencers, gaming communities, and Web3 projects for co-marketing'
          }
        ],
        timeline: 'Ongoing with quarterly milestones',
        budget: '$2M annual marketing budget'
      }
    },
  ];

  const stats = [
    { label: 'Years Experience', value: '15+' },
    { label: 'Happy Customers', value: '50K+' },
    { label: 'Products Sold', value: '100K+' },
    { label: 'Countries', value: '45+' },
  ];

  return (
    <div className="team-showcase bg-gradient-to-b from-black via-gray-900 to-black py-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold space-font mb-4">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Amazing Team</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate innovators building the future of e-commerce with Web3 technology
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 text-center hover:border-orange-500 transition-all transform hover:scale-105"
            >
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-orange-500 transition-all transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  View Proposal
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-orange-500 font-medium mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm mb-4">{member.bio}</p>

                {/* Social Links */}
                <div className="flex gap-3">
                  <a
                    href={member.linkedin}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-all"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="text-white" />
                  </a>
                  <a
                    href={member.twitter}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 bg-gray-800 hover:bg-sky-500 rounded-lg transition-all"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="text-white" />
                  </a>
                  <a
                    href={member.github}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
                    aria-label="GitHub"
                  >
                    <FaGithub className="text-white" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Proposal Modal */}
        {selectedMember && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <div 
              className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 p-6 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img 
                    src={selectedMember.image} 
                    alt={selectedMember.name}
                    className="w-16 h-16 rounded-full border-2 border-orange-500"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedMember.name}</h3>
                    <p className="text-orange-500 font-medium">{selectedMember.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-all"
                >
                  <FaTimes className="text-gray-400 hover:text-white text-xl" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Proposal Title */}
                <div>
                  <h4 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-2">
                    {selectedMember.proposal.title}
                  </h4>
                  <p className="text-gray-300 text-lg">{selectedMember.proposal.summary}</p>
                </div>

                {/* Timeline & Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Timeline</p>
                    <p className="text-white font-semibold">{selectedMember.proposal.timeline}</p>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Budget</p>
                    <p className="text-white font-semibold">{selectedMember.proposal.budget}</p>
                  </div>
                </div>

                {/* Objectives */}
                <div>
                  <h5 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-orange-500">🎯</span> Key Objectives
                  </h5>
                  <ul className="space-y-2">
                    {selectedMember.proposal.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Initiatives */}
                <div>
                  <h5 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-orange-500">🚀</span> Key Initiatives
                  </h5>
                  <div className="space-y-4">
                    {selectedMember.proposal.keyInitiatives.map((initiative, index) => (
                      <div 
                        key={index}
                        className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/30 rounded-xl p-4"
                      >
                        <h6 className="text-lg font-semibold text-white mb-2">{initiative.name}</h6>
                        <p className="text-gray-300">{initiative.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all transform hover:scale-105"
                  >
                    Close Proposal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/30 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            At <span className="text-orange-500 font-semibold">HowTo</span>, we're revolutionizing online shopping by combining cutting-edge technology with seamless user experience. Our Web3-enabled platform empowers customers with secure, transparent, and innovative shopping solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="px-6 py-3 bg-gray-900 border border-gray-700 rounded-full">
              <span className="text-white font-medium">🚀 Innovation First</span>
            </div>
            <div className="px-6 py-3 bg-gray-900 border border-gray-700 rounded-full">
              <span className="text-white font-medium">🔒 Security Focused</span>
            </div>
            <div className="px-6 py-3 bg-gray-900 border border-gray-700 rounded-full">
              <span className="text-white font-medium">💎 Quality Products</span>
            </div>
            <div className="px-6 py-3 bg-gray-900 border border-gray-700 rounded-full">
              <span className="text-white font-medium">🌍 Global Reach</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamShowcase;
