import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Sun, Moon, Bookmark, LayoutDashboard, Briefcase, Menu } from 'lucide-react';
import { useUIStore, useJobStore } from '@/store';
import { cn } from '@/utils';

const NAV_LINKS = [
  { to: '/jobs',      label: 'Browse Jobs',  icon: Briefcase },
  { to: '/dashboard', label: 'Dashboard',    icon: LayoutDashboard },
  { to: '/saved',     label: 'Saved',        icon: Bookmark },
];

export default function Navbar() {
  const { theme, toggleTheme, toggleSidebar } = useUIStore();
  const { savedJobIds } = useJobStore();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        isLanding
          ? 'bg-transparent'
          : 'bg-surface-0/80 backdrop-blur-xl border-b border-surface-200'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-brand group-hover:scale-105 transition-transform duration-200">
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg tracking-tight text-ink-primary">
            TalentFlow <span className="gradient-text">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => cn(
                'relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'text-brand-500 bg-brand-500/8'
                  : 'text-ink-secondary hover:text-ink-primary hover:bg-surface-100'
              )}
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-4 h-4" />
                  {label}
                  {to === '/saved' && savedJobIds.length > 0 && (
                    <span className="ml-1 min-w-[18px] h-[18px] rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center px-1">
                      {savedJobIds.length}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg bg-brand-500/8 border border-brand-500/20"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-ink-tertiary hover:text-ink-primary hover:bg-surface-100 transition-all duration-200"
          >
            {theme === 'dark'
              ? <Sun className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
              : <Moon className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
            }
          </button>

          <Link
            to="/jobs"
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 text-white text-sm font-semibold shadow-brand hover:shadow-brand hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Zap className="w-3.5 h-3.5" />
            Find Jobs
          </Link>

          {/* Mobile menu */}
          <button
            onClick={toggleSidebar}
            aria-label="Open menu"
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-ink-secondary hover:bg-surface-100 transition-colors"
          >
            <Menu style={{ width: 20, height: 20 }} />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
