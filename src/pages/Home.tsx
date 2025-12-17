import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import imgLogoDark from "figma:asset/aa98122115bd3f14e471d39ea331f0adb4fdbce7.png";
import imgLogoLight from "figma:asset/b387002487940ca9d562d7e26ac5d0c95b887990.png";
import { PageTransition } from '../components/PageTransition';
import { useEffect, useState } from 'react';
import { getLandingStats } from '../data/landingStats';

export function Home() {
  const [isDark, setIsDark] = useState(true);
  const [stats, setStats] = useState(getLandingStats());

  useEffect(() => {
    // Check current theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Reload stats when component mounts
    setStats(getLandingStats());
  }, []);

  const proofData = [
    { label: 'CTFs Played', value: stats.ctfsPlayed },
    { label: 'Hackathons', value: stats.hackathons },
    { label: 'Projects Built', value: stats.projectsBuilt },
    { label: 'Research Logs', value: stats.researchLogs },
  ];

  const domains = [
    {
      title: 'Security Research',
      description: 'Deep-dive analysis of vulnerabilities, exploitation techniques, and defensive strategies across web, mobile, and infrastructure.',
    },
    {
      title: 'CTF & Competitive Hacking',
      description: 'Participation in capture-the-flag competitions and security challenges to sharpen skills and test knowledge under pressure.',
    },
    {
      title: 'AI & Systems Experiments',
      description: 'Exploring intersections of artificial intelligence, security automation, and building resilient distributed systems.',
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 lg:gap-10 mb-6 sm:mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src={isDark ? imgLogoDark : imgLogoLight}
              alt="HackerTroupe" 
              className="h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] lg:h-[160px] lg:w-[160px] object-contain sm:mb-3"
            />
            <h1 className="brand-font text-[48px] sm:text-[56px] lg:text-[72px] leading-none text-[var(--accent)] tracking-tight text-center sm:text-left uppercase sm:mt-5">
              HACKER<br />TROUPE
            </h1>
          </motion.div>
          <motion.p 
            className="font-['JetBrains_Mono',monospace] text-[12px] sm:text-[14px] lg:text-[16px] tracking-[1.5px] sm:tracking-[2px] text-[var(--text-secondary)] text-center max-w-[90%] sm:max-w-[600px] lg:max-w-[700px] px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            INDEPENDENT SECURITY RESEARCH & CTF TEAM
          </motion.p>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 sm:bottom-12"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--text-secondary)]" />
          </motion.div>
        </section>

        {/* Proof Strip */}
        <section className="border-y border-[var(--divider)] py-8 sm:py-10 lg:py-12">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {proofData.map((item, index) => (
                <motion.div 
                  key={item.label} 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="font-['Space_Grotesk',sans-serif] text-[28px] sm:text-[32px] lg:text-[36px] text-[var(--accent)] mb-1 font-semibold">
                    {item.value}
                  </p>
                  <p className="font-['JetBrains_Mono',monospace] text-[10px] sm:text-[11px] lg:text-[12px] text-[var(--text-secondary)] uppercase tracking-wider">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              className="font-['Space_Grotesk',sans-serif] text-[28px] sm:text-[32px] lg:text-[36px] mb-8 sm:mb-10 lg:mb-12 text-[var(--accent)] font-semibold"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              What We Do
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {domains.map((domain, index) => (
                <motion.div 
                  key={domain.title} 
                  className="border border-[var(--divider)] p-5 sm:p-6 hover:border-[var(--accent)] transition-all hover:shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <h3 className="font-['Space_Grotesk',sans-serif] text-[18px] sm:text-[20px] mb-2 sm:mb-3 font-semibold">
                    {domain.title}
                  </h3>
                  <p className="font-['Inter',sans-serif] text-[13px] sm:text-[14px] text-[var(--text-secondary)] leading-relaxed">
                    {domain.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
