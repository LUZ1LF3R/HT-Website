import { Github, Linkedin, Search, Globe, Twitter, Instagram, Mail, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { getMembers, Member } from '../data/members';

export function Members() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    setMembers(getMembers());
  }, []);

  const domains = ['All', ...Array.from(new Set(members.map(m => m.domain)))];
  const years = ['All', ...Array.from(new Set(members.map(m => m.year))).sort()];

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.realName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.skills.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDomain = selectedDomain === 'All' || member.domain === selectedDomain;
    const matchesYear = selectedYear === 'All' || member.year === selectedYear;
    
    return matchesSearch && matchesDomain && matchesYear;
  });

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            className="font-sans text-[32px] sm:text-[40px] lg:text-[48px] text-[var(--accent)] mb-2 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Members
          </motion.h1>
          <motion.p 
            className="font-sans text-[var(--text-secondary)] text-[13px] sm:text-[14px] mb-6 sm:mb-8"
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
                placeholder="Search by name, domain, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] pl-11 pr-4 py-3 text-[13px] sm:text-[14px] font-sans focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>

            {/* Domain and Year Filters */}
            <div className="flex gap-2 flex-wrap items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                {domains.map((domain) => (
                  <button
                    key={domain}
                    onClick={() => setSelectedDomain(domain)}
                    className={`px-3 sm:px-4 py-2 text-[11px] sm:text-[12px] font-mono border transition-colors ${
                      selectedDomain === domain
                        ? 'border-[var(--accent)] text-[var(--accent)] bg-cyan-400 bg-opacity-10'
                        : 'border-[var(--divider)] hover:border-[var(--accent)]'
                    }`}
                  >
                    {domain}
                  </button>
                ))}
              </div>
              
              {/* Year Filter - Compact buttons */}
              <div className="flex gap-2 flex-wrap">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-3 sm:px-4 py-2 text-[11px] sm:text-[12px] font-mono border transition-colors ${
                      selectedYear === year
                        ? 'border-[var(--accent)] text-[var(--accent)] bg-cyan-400 bg-opacity-10'
                        : 'border-[var(--divider)] hover:border-[var(--accent)]'
                    }`}
                  >
                    {year === 'All' ? 'All' : year}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
            
          {/* Member Cards */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
              {filteredMembers.map((member) => (
                <div key={member.id} className="border border-[var(--divider)] group hover:border-[var(--accent)] transition-colors">
                  {/* Image */}
                  <div className="h-[180px] sm:h-[200px] w-full overflow-hidden bg-[var(--bg-secondary)] relative">
                  <img 
                    src={member.image} 
                    alt={member.alias}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {member.isLeader && (
                    <div className="absolute top-3 right-3 bg-cyan-400 p-1.5 rounded-sm shadow-lg">
                      <Star className="w-4 h-4 text-[var(--deep-black)] fill-[var(--deep-black)]" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <div className="mb-3 sm:mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-sans text-[18px] sm:text-[20px] text-[var(--accent)] mb-0.5 font-semibold">
                        {member.alias}
                      </h3>
                      {member.isLeader && (
                        <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                      )}
                    </div>
                    {member.realName && (
                      <p className="font-sans text-[11px] sm:text-[12px] text-[var(--text-secondary)]">
                        {member.realName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div>
                      <p className="font-mono text-[10px] text-[var(--text-secondary)] uppercase mb-0.5">
                        Domain
                      </p>
                      <p className="font-sans text-[12px] sm:text-[13px]">
                        {member.domain}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-[var(--text-secondary)] uppercase mb-0.5">
                        Skills
                      </p>
                      <p className="font-sans text-[11px] sm:text-[12px] text-[var(--text-secondary)]">
                        {member.skills}
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
                    {member.website && (
                      <a
                        href={member.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                        aria-label={`${member.alias} Website`}
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={`https://twitter.com/${member.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                        aria-label={`${member.alias} X/Twitter`}
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {member.instagram && (
                      <a
                        href={`https://instagram.com/${member.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                        aria-label={`${member.alias} Instagram`}
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                        aria-label={`${member.alias} Email`}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                </div>
              ))}
          </motion.div>

          {filteredMembers.length === 0 && (
            <motion.div 
              className="text-center py-16 sm:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="font-sans text-[14px] text-[var(--text-secondary)]">
                No members found matching your criteria.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
