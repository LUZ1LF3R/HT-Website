import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { getPosts } from '../data/posts';

export function Posts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [posts, setPosts] = useState(getPosts());

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Research Log':
        return 'text-[#FF6B9D]';
      case 'CTF Writeup':
        return 'text-[#00E5FF]';
      case 'Build Diary':
        return 'text-[#00FF9D]';
      case 'Paper Notes':
        return 'text-[#FFB86C]';
      default:
        return 'text-[var(--accent)]';
    }
  };

  const types = ['All', 'Research Log', 'CTF Writeup', 'Build Diary', 'Paper Notes'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.abstract.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'All' || post.type === selectedType;
    
    return matchesSearch && matchesType;
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
            Posts / Logs
          </motion.h1>
          <motion.p 
            className="font-['Inter',sans-serif] text-[var(--text-secondary)] text-[13px] sm:text-[14px] mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Research logs, CTF writeups, build diaries, and paper notes.
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
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] pl-11 pr-4 py-3 text-[13px] sm:text-[14px] font-['Inter',sans-serif] focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>

            {/* Type Filter */}
            <div className="flex gap-2 flex-wrap">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 sm:px-4 py-2 text-[11px] sm:text-[12px] font-['JetBrains_Mono',monospace] border transition-colors ${
                    selectedType === type
                      ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10'
                      : 'border-[var(--divider)] hover:border-[var(--accent)]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <Link
                  to={`/posts/${post.id}`}
                  className="block border border-[var(--divider)] p-4 sm:p-6 hover:border-[var(--accent)] transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                        <span className={`font-['JetBrains_Mono',monospace] text-[10px] sm:text-[11px] uppercase ${getTypeColor(post.type)}`}>
                          [{post.type}]
                        </span>
                        <span className="font-['JetBrains_Mono',monospace] text-[10px] sm:text-[11px] text-[var(--text-secondary)]">
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <h3 className="font-['Space_Grotesk',sans-serif] text-[18px] sm:text-[20px] lg:text-[22px] mb-3 group-hover:text-[var(--accent)] transition-colors font-semibold">
                        {post.title}
                      </h3>
                      <p className="font-['Inter',sans-serif] text-[13px] sm:text-[14px] text-[var(--text-secondary)] leading-relaxed">
                        {post.abstract}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div 
              className="text-center py-16 sm:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="font-['Inter',sans-serif] text-[14px] text-[var(--text-secondary)]">
                No posts found matching your criteria.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}