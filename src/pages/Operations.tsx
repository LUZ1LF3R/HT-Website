import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { getOperations, Operation } from '../data/operations';

export function Operations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [operations, setOperations] = useState<Operation[]>([]);

  useEffect(() => {
    setOperations(getOperations());
  }, []);

  const getCategoryColor = (category: Operation['category']) => {
    switch (category) {
      case 'CTF':
        return 'text-[#00E5FF]';
      case 'Hackathon':
        return 'text-[#00FF9D]';
      case 'Research':
        return 'text-[#FF6B9D]';
    }
  };

  const categories = ['All', 'CTF', 'Hackathon', 'Research'];

  const filteredOperations = operations.filter(op => {
    const matchesSearch = 
      op.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.focus.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.outcome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || op.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
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
            Operations
          </motion.h1>
          <motion.p 
            className="font-['Inter',sans-serif] text-[var(--text-secondary)] text-[13px] sm:text-[14px] mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            No trophies. No rankings obsession. Just focused work and documented outcomes.
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
                placeholder="Search operations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] pl-11 pr-4 py-3 text-[13px] sm:text-[14px] font-['Inter',sans-serif] focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 sm:px-4 py-2 text-[11px] sm:text-[12px] font-['JetBrains_Mono',monospace] border transition-colors ${
                    selectedCategory === category
                      ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10'
                      : 'border-[var(--divider)] hover:border-[var(--accent)]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Operations List */}
          <div className="space-y-4">
            {filteredOperations.map((op, index) => (
              <motion.div 
                key={index}
                className="border border-[var(--divider)] p-4 sm:p-6 hover:border-[var(--accent)] transition-all group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                      <span className={`font-['JetBrains_Mono',monospace] text-[10px] sm:text-[11px] uppercase ${getCategoryColor(op.category)}`}>
                        [{op.category}]
                      </span>
                      <span className="font-['JetBrains_Mono',monospace] text-[10px] sm:text-[11px] text-[var(--text-secondary)]">
                        {op.date}
                      </span>
                    </div>
                    <h3 className="font-['Space_Grotesk',sans-serif] text-[18px] sm:text-[20px] mb-3 font-semibold">
                      {op.name}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[var(--text-secondary)] uppercase mb-1">
                      Role
                    </p>
                    <p className="font-['Inter',sans-serif] text-[12px] sm:text-[13px]">
                      {op.role}
                    </p>
                  </div>
                  <div>
                    <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[var(--text-secondary)] uppercase mb-1">
                      Focus Area
                    </p>
                    <p className="font-['Inter',sans-serif] text-[12px] sm:text-[13px]">
                      {op.focus}
                    </p>
                  </div>
                  <div>
                    <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[var(--text-secondary)] uppercase mb-1">
                      Outcome
                    </p>
                    <p className="font-['Inter',sans-serif] text-[12px] sm:text-[13px] text-[var(--text-secondary)]">
                      {op.outcome}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredOperations.length === 0 && (
            <motion.div 
              className="text-center py-16 sm:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="font-['Inter',sans-serif] text-[14px] text-[var(--text-secondary)]">
                No operations found matching your criteria.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}