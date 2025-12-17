import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { MarkdownContent } from '../components/MarkdownContent';
import { posts } from '../data/posts';

export function PostDetail() {
  const { id } = useParams();
  
  const post = posts.find(p => p.id === id);

  if (!post) {
    return <Navigate to="/posts" replace />;
  }

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

  // Extract "What Failed" and "What's Next" sections from content
  const contentParts = post.content.split('## What Failed');
  const hasFailedSection = contentParts.length > 1;
  
  let mainContent = contentParts[0];
  let failedContent = '';
  let nextContent = '';
  
  if (hasFailedSection) {
    const remainingParts = contentParts[1].split('## What\'s Next');
    failedContent = remainingParts[0]?.trim() || '';
    nextContent = remainingParts[1]?.trim() || '';
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-20">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link 
              to="/posts" 
              className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors mb-6 sm:mb-8"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-['Inter',sans-serif] text-[13px] sm:text-[14px]">Back to Posts</span>
            </Link>
          </motion.div>

          <motion.div 
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 flex-wrap">
              <span className={`font-['JetBrains_Mono',monospace] text-[10px] sm:text-[11px] uppercase ${getTypeColor(post.type)}`}>
                [{post.type}]
              </span>
              <span className="font-['JetBrains_Mono',monospace] text-[10px] sm:text-[11px] text-[var(--text-secondary)]">
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <h1 className="font-['Space_Grotesk',sans-serif] text-[28px] sm:text-[36px] lg:text-[42px] leading-tight font-semibold">
              {post.title}
            </h1>
          </motion.div>

          <motion.article 
            className="prose prose-invert max-w-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <MarkdownContent content={mainContent} />
          </motion.article>

          {/* What Failed / What's Next Section */}
          {hasFailedSection && (failedContent || nextContent) && (
            <motion.div 
              className="mt-10 sm:mt-12 pt-10 sm:pt-12 border-t border-[var(--divider)] grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {failedContent && (
                <div className="border-l-2 border-[var(--accent)] pl-4 sm:pl-5">
                  <h3 className="font-['Space_Grotesk',sans-serif] text-[16px] sm:text-[18px] text-[var(--accent)] mb-2 font-semibold">
                    What Failed
                  </h3>
                  <div className="font-['Inter',sans-serif] text-[13px] sm:text-[14px] text-[var(--text-secondary)]">
                    <MarkdownContent content={failedContent} />
                  </div>
                </div>
              )}
              {nextContent && (
                <div className="border-l-2 border-[var(--accent)] pl-4 sm:pl-5">
                  <h3 className="font-['Space_Grotesk',sans-serif] text-[16px] sm:text-[18px] text-[var(--accent)] mb-2 font-semibold">
                    What's Next
                  </h3>
                  <div className="font-['Inter',sans-serif] text-[13px] sm:text-[14px] text-[var(--text-secondary)]">
                    <MarkdownContent content={nextContent} />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}