import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useState } from 'react';
import imgLogoDark from "figma:asset/aa98122115bd3f14e471d39ea331f0adb4fdbce7.png";
import imgLogoLight from "figma:asset/b387002487940ca9d562d7e26ac5d0c95b887990.png";

interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function Navigation({ isDark, toggleTheme }: NavigationProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/members', label: 'Members' },
    { path: '/operations', label: 'Operations' },
    { path: '/posts', label: 'Posts' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)] border-b border-[var(--divider)] backdrop-blur-sm bg-opacity-95">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={handleLinkClick}>
            <img 
              src={isDark ? imgLogoDark : imgLogoLight}
              alt="HackerTroupe Logo" 
              className="h-[32px] w-[32px] sm:h-[40px] sm:w-[40px] object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-['Space_Grotesk',sans-serif] text-[14px] lg:text-[15px] tracking-wide transition-colors hover:text-[var(--accent)] ${
                  location.pathname === item.path ? 'text-[var(--accent)]' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] rounded-full bg-[var(--accent)] flex items-center justify-center transition-transform hover:scale-110"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--deep-black)]" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--deep-black)]" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-[32px] h-[32px] flex items-center justify-center text-[var(--text-primary)]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--divider)] bg-[var(--bg-primary)]">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`block font-['Space_Grotesk',sans-serif] text-[16px] tracking-wide transition-colors hover:text-[var(--accent)] py-2 ${
                    location.pathname === item.path ? 'text-[var(--accent)]' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
