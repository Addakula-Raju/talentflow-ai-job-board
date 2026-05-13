import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Briefcase, LayoutDashboard, Bookmark, Home } from 'lucide-react';
import { useUIStore, useJobStore } from '@/store';
import { cn } from '@/utils';

const LINKS = [
  { to: '/',          label: 'Home',         icon: Home },
  { to: '/jobs',      label: 'Browse Jobs',  icon: Briefcase },
  { to: '/dashboard', label: 'Dashboard',    icon: LayoutDashboard },
  { to: '/saved',     label: 'Saved Jobs',   icon: Bookmark },
];

export default function MobileSidebar() {
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  const { savedJobIds } = useJobStore();

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-surface-50 border-l border-surface-200 md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-surface-200">
              <Link to="/" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-ink-primary">TalentFlow AI</span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-tertiary hover:bg-surface-200 transition-colors"
              >
                <X style={{ width: 16, height: 16 }} />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {LINKS.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) => cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-brand-500/10 text-brand-500 border border-brand-500/20'
                      : 'text-ink-secondary hover:bg-surface-100 hover:text-ink-primary'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  {to === '/saved' && savedJobIds.length > 0 && (
                    <span className="ml-auto min-w-[20px] h-5 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center px-1.5">
                      {savedJobIds.length}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="p-4 border-t border-surface-200">
              <Link
                to="/jobs"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 text-white text-sm font-semibold shadow-brand"
              >
                <Zap className="w-4 h-4" />
                Find Your Next Role
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
