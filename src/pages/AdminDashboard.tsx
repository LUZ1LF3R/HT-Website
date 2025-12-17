import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { isAdminLoggedIn, logoutAdmin } from '../utils/auth';
import { Users, FileText, Trophy, LogOut, TrendingUp } from 'lucide-react';

export function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  const sections = [
    {
      title: 'Manage Members',
      description: 'Add, edit, or remove team members',
      icon: Users,
      path: '/admin/members',
      color: '#00E5FF',
    },
    {
      title: 'Manage Operations',
      description: 'Update CTFs, hackathons, and research projects',
      icon: Trophy,
      path: '/admin/operations',
      color: '#00FF9D',
    },
    {
      title: 'Manage Posts',
      description: 'Create and manage blog posts and writeups',
      icon: FileText,
      path: '/admin/posts',
      color: '#FF6B9D',
    },
    {
      title: 'Landing Page Stats',
      description: 'Update homepage statistics and metrics',
      icon: TrendingUp,
      path: '/admin/landing',
      color: '#FFB86C',
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h1 className="font-['Space_Grotesk',sans-serif] text-[32px] sm:text-[40px] text-[var(--accent)] mb-2 font-semibold">
                Admin Dashboard
              </h1>
              <p className="font-['Inter',sans-serif] text-[var(--text-secondary)] text-[14px]">
                Manage website content
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-[var(--divider)] hover:border-[var(--accent)] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-['Inter',sans-serif] text-[14px]">Logout</span>
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={section.path}
                    className="block border-2 border-[var(--divider)] p-10 hover:border-[var(--accent)] hover:shadow-xl transition-all group h-full bg-[var(--bg-secondary)]"
                  >
                    <div className="flex items-start gap-6">
                      <div 
                        className="p-4 rounded-sm flex-shrink-0"
                        style={{ backgroundColor: `${section.color}20` }}
                      >
                        <Icon
                          className="w-8 h-8 transition-transform group-hover:scale-110"
                          style={{ color: section.color }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-['Space_Grotesk',sans-serif] text-[20px] mb-2 font-semibold group-hover:text-[var(--accent)] transition-colors">
                          {section.title}
                        </h3>
                        <p className="font-['Inter',sans-serif] text-[14px] text-[var(--text-secondary)] leading-relaxed">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
