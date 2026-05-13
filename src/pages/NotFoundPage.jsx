import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Zap } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-surface-0">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-8xl font-black gradient-text mb-4"
        >
          404
        </motion.div>
        <h1 className="text-2xl font-bold text-ink-primary mb-3">Page not found</h1>
        <p className="text-ink-secondary mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-surface-200 text-ink-primary text-sm font-medium hover:bg-surface-100 transition-colors"
          >
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link
            to="/jobs"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 text-white text-sm font-semibold shadow-brand hover:scale-[1.02] transition-transform"
          >
            <Zap className="w-4 h-4" /> Browse Jobs
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
