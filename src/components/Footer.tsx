import { Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[var(--divider)] py-6 mt-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-['Inter',sans-serif] text-[12px] sm:text-[14px] text-[var(--text-secondary)] text-center sm:text-left">
            HackerTroupe — Research · Security · Systems
          </p>
          <div className="flex gap-5">
            <a
              href="https://github.com/hackertroupe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/company/hackertroupe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}