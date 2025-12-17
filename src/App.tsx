import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Members } from './pages/Members';
import { Operations } from './pages/Operations';
import { Posts } from './pages/Posts';
import { PostDetail } from './pages/PostDetail';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminMembers } from './pages/AdminMembers';
import { AdminOperations } from './pages/AdminOperations';
import { AdminPosts } from './pages/AdminPosts';
import { AdminLanding } from './pages/AdminLanding';

interface AppContentProps {
  isDark: boolean;
  toggleTheme: () => void;
}

function AppContent({ isDark, toggleTheme }: AppContentProps) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  return (
    <>
      {!isAdminRoute && <Navigation isDark={isDark} toggleTheme={toggleTheme} />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/members" element={<Members />} />
          <Route path="/operations" element={<Operations />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/members" element={<AdminMembers />} />
          <Route path="/admin/operations" element={<AdminOperations />} />
          <Route path="/admin/posts" element={<AdminPosts />} />
          <Route path="/admin/landing" element={<AdminLanding />} />
        </Routes>
      </AnimatePresence>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors">
        <AppContent isDark={isDark} toggleTheme={toggleTheme} />
      </div>
    </Router>
  );
}