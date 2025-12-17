import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { authenticateAdmin, setAdminAuth } from '../utils/auth';
import { Lock, User } from 'lucide-react';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (authenticateAdmin(username, password)) {
      setAdminAuth(true);
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials');
      setPassword('');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="border-2 border-[var(--divider)] p-12 bg-[var(--bg-secondary)] shadow-xl">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Lock className="w-10 h-10 text-[var(--accent)]" />
              <h1 className="font-['Space_Grotesk',sans-serif] text-[32px] sm:text-[36px] text-[var(--accent)] font-semibold">
                Admin Access
              </h1>
            </div>
            <p className="font-['Inter',sans-serif] text-[14px] text-[var(--text-secondary)] mb-10 text-center">
              Authentication Required
            </p>

            {error && (
              <div className="mb-8 p-4 border-2 border-red-500 bg-red-500/10 text-red-500 text-[14px] text-center font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-['JetBrains_Mono',monospace] text-[12px] mb-3 text-[var(--text-secondary)] uppercase tracking-wider">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[var(--bg-secondary)] border-2 border-[var(--divider)] pl-12 pr-4 py-4 text-[15px] font-['Inter',sans-serif] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-['JetBrains_Mono',monospace] text-[12px] mb-3 text-[var(--text-secondary)] uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[var(--bg-secondary)] border-2 border-[var(--divider)] pl-12 pr-4 py-4 text-[15px] font-['Inter',sans-serif] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--accent)] text-[var(--deep-black)] py-4 font-['Space_Grotesk',sans-serif] font-bold text-[15px] uppercase tracking-wider hover:opacity-90 hover:shadow-lg transition-all"
              >
                Authenticate
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-[var(--divider)]">
              <p className="text-center font-['JetBrains_Mono',monospace] text-[11px] text-[var(--text-secondary)] uppercase tracking-wider">
                Authorized Personnel Only
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
