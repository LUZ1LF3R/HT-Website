import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { isAdminLoggedIn } from '../utils/auth';
import { getLandingStats, saveLandingStats, LandingStats } from '../data/landingStats';
import { ArrowLeft, TrendingUp } from 'lucide-react';

export function AdminLanding() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<LandingStats>(getLandingStats());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin');
      return;
    }
  }, [navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    saveLandingStats(stats);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-['Inter',sans-serif] text-[14px]">Back to Dashboard</span>
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-[var(--accent)]" />
              <h1 className="font-['Space_Grotesk',sans-serif] text-[32px] text-[var(--accent)] font-semibold">
                Landing Page Stats
              </h1>
            </div>
            <p className="font-['Inter',sans-serif] text-[var(--text-secondary)] text-[14px]">
              Update the statistics displayed on the homepage
            </p>
          </motion.div>

          <motion.div
            className="border border-[var(--divider)] p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {saved && (
              <div className="mb-6 p-3 border border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] text-[13px] text-center">
                ✓ Stats updated successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase tracking-wider">
                    CTFs Played
                  </label>
                  <input
                    type="text"
                    value={stats.ctfsPlayed}
                    onChange={(e) => setStats({ ...stats, ctfsPlayed: e.target.value })}
                    placeholder="47"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-3 text-[14px] font-['Inter',sans-serif] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase tracking-wider">
                    Hackathons
                  </label>
                  <input
                    type="text"
                    value={stats.hackathons}
                    onChange={(e) => setStats({ ...stats, hackathons: e.target.value })}
                    placeholder="12"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-3 text-[14px] font-['Inter',sans-serif] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase tracking-wider">
                    Projects Built
                  </label>
                  <input
                    type="text"
                    value={stats.projectsBuilt}
                    onChange={(e) => setStats({ ...stats, projectsBuilt: e.target.value })}
                    placeholder="23"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-3 text-[14px] font-['Inter',sans-serif] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase tracking-wider">
                    Research Logs
                  </label>
                  <input
                    type="text"
                    value={stats.researchLogs}
                    onChange={(e) => setStats({ ...stats, researchLogs: e.target.value })}
                    placeholder="156"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-3 text-[14px] font-['Inter',sans-serif] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--accent)] text-[var(--deep-black)] py-3 font-['Space_Grotesk',sans-serif] font-semibold text-[14px] uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Update Stats
              </button>
            </form>

            <div className="mt-6 p-4 bg-[var(--bg-secondary)] border border-[var(--divider)]">
              <p className="font-['JetBrains_Mono',monospace] text-[11px] text-[var(--text-secondary)] mb-3 uppercase">
                Preview
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="font-['Space_Grotesk',sans-serif] text-[24px] text-[var(--accent)] font-semibold">
                    {stats.ctfsPlayed}
                  </p>
                  <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[var(--text-secondary)] uppercase">
                    CTFs Played
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-['Space_Grotesk',sans-serif] text-[24px] text-[var(--accent)] font-semibold">
                    {stats.hackathons}
                  </p>
                  <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[var(--text-secondary)] uppercase">
                    Hackathons
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-['Space_Grotesk',sans-serif] text-[24px] text-[var(--accent)] font-semibold">
                    {stats.projectsBuilt}
                  </p>
                  <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[var(--text-secondary)] uppercase">
                    Projects Built
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-['Space_Grotesk',sans-serif] text-[24px] text-[var(--accent)] font-semibold">
                    {stats.researchLogs}
                  </p>
                  <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[var(--text-secondary)] uppercase">
                    Research Logs
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
