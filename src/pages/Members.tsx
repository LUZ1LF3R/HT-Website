import { Github, Linkedin, Search } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { PageTransition } from '../components/PageTransition';

interface Member {
  alias: string;
  realName?: string;
  domain: string;
  focus: string;
  github?: string;
  linkedin?: string;
  image: string;
}

export function Members() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');

  const members: Member[] = [
    {
      alias: 'cipher_',
      realName: 'Alex Chen',
      domain: 'Web Security',
      focus: 'Server-side exploitation & API security',
      github: 'cipheralex',
      linkedin: 'alex-chen-sec',
      image: 'https://images.unsplash.com/photo-1660644807804-ffacfd7a4137?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzY1ODg1MTM1fDA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      alias: 'null_byte',
      realName: 'Sarah Kim',
      domain: 'Reverse Engineering',
      focus: 'Binary analysis & malware research',
      github: 'nullbyte',
      linkedin: 'sarah-kim-re',
      image: 'https://images.unsplash.com/photo-1565687981296-535f09db714e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrZXIlMjBkZXZlbG9wZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjU4ODUxMzV8MA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      alias: 'forge',
      realName: 'Marcus Rodriguez',
      domain: 'Systems Engineering',
      focus: 'Infrastructure hardening & automation',
      github: 'forgedev',
      linkedin: 'marcus-rodriguez',
      image: 'https://images.unsplash.com/photo-1752859951149-7d3fc700a7ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY1ODYwODM3fDA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      alias: 'quantum',
      realName: 'Emily Zhang',
      domain: 'AI Security',
      focus: 'Adversarial ML & model security',
      github: 'quantumsec',
      linkedin: 'emily-zhang-ai',
      image: 'https://images.unsplash.com/photo-1681164315430-6159b2361615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGVuZ2luZWVyJTIwaGVhZHNob3R8ZW58MXx8fHwxNzY1ODg1MTM2fDA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      alias: 'trace',
      realName: 'David Park',
      domain: 'Digital Forensics',
      focus: 'Incident response & memory analysis',
      github: 'tracesec',
      linkedin: 'david-park-dfir',
      image: 'https://images.unsplash.com/photo-1635366795162-90b6041fd292?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMHJlc2VhcmNoZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjU4ODUxMzZ8MA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      alias: 'echo',
      realName: 'Nina Patel',
      domain: 'OSINT',
      focus: 'Intelligence gathering & reconnaissance',
      github: 'echoint',
      linkedin: 'nina-patel-osint',
      image: 'https://images.unsplash.com/photo-1555963153-11ff60182d08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBoZWFkc2hvdCUyMGRhcmt8ZW58MXx8fHwxNzY1ODg1MTM3fDA&ixlib=rb-4.1.0&q=80&w=400',
    },
  ];

  const domains = ['All', ...Array.from(new Set(members.map(m => m.domain)))];

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.realName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.focus.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDomain = selectedDomain === 'All' || member.domain === selectedDomain;
    
    return matchesSearch && matchesDomain;
  });

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            className="font-['Space_Grotesk',sans-serif] text-[32px] sm:text-[40px] lg:text-[48px] text-[var(--accent)] mb-2 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Members
          </motion.h1>
          <motion.p 
            className="font-['Inter',sans-serif] text-[var(--text-secondary)] text-[13px] sm:text-[14px] mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            A task force of researchers, not a roster.
          </motion.p>

          {/* Search and Filter */}
          <motion.div 
            className="mb-6 sm:mb-8 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
              <input
                type="text"
                placeholder="Search by name, domain, or focus..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] pl-11 pr-4 py-3 text-[13px] sm:text-[14px] font-['Inter',sans-serif] focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>

            {/* Domain Filter */}
            <div className="flex gap-2 flex-wrap">
              {domains.map((domain) => (
                <button
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                  className={`px-3 sm:px-4 py-2 text-[11px] sm:text-[12px] font-['JetBrains_Mono',monospace] border transition-colors ${
                    selectedDomain === domain
                      ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10'
                      : 'border-[var(--divider)] hover:border-[var(--accent)]'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredMembers.map((member, index) => (
              <motion.div 
                key={member.alias}
                className="border border-[var(--divider)] overflow-hidden hover:border-[var(--accent)] transition-all group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                {/* Image */}
                <div className="h-[180px] sm:h-[200px] w-full overflow-hidden bg-[var(--bg-secondary)]">
                  <img 
                    src={member.image} 
                    alt={member.alias}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <div className="mb-3 sm:mb-4">
                    <h3 className="font-['Space_Grotesk',sans-serif] text-[18px] sm:text-[20px] text-[var(--accent)] mb-0.5 font-semibold">
                      {member.alias}
                    </h3>
                    {member.realName && (
                      <p className="font-['Inter',sans-serif] text-[11px] sm:text-[12px] text-[var(--text-secondary)]">
                        {member.realName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div>
                      <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[var(--text-secondary)] uppercase mb-0.5">
                        Domain
                      </p>
                      <p className="font-['Inter',sans-serif] text-[12px] sm:text-[13px]">
                        {member.domain}
                      </p>
                    </div>
                    <div>
                      <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[var(--text-secondary)] uppercase mb-0.5">
                        Current Focus
                      </p>
                      <p className="font-['Inter',sans-serif] text-[11px] sm:text-[12px] text-[var(--text-secondary)]">
                        {member.focus}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-3 border-t border-[var(--divider)]">
                    {member.github && (
                      <a
                        href={`https://github.com/${member.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                        aria-label={`${member.alias} GitHub`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={`https://linkedin.com/in/${member.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                        aria-label={`${member.alias} LinkedIn`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <motion.div 
              className="text-center py-16 sm:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="font-['Inter',sans-serif] text-[14px] text-[var(--text-secondary)]">
                No members found matching your criteria.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
