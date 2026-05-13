import { motion } from 'framer-motion';
import { Search, Bookmark, LayoutDashboard } from 'lucide-react';
import Button from './Button';
import { Link } from 'react-router-dom';

const ICONS = { search: Search, bookmark: Bookmark, dashboard: LayoutDashboard };

export default function EmptyState({ icon = 'search', title, description, action }) {
  const Icon = ICONS[icon] ?? Search;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-surface-100 border border-surface-200 flex items-center justify-center mb-5">
        <Icon className="w-7 h-7 text-ink-tertiary" />
      </div>
      <h3 className="text-lg font-semibold text-ink-primary mb-2">{title}</h3>
      <p className="text-sm text-ink-tertiary max-w-xs mb-6">{description}</p>
      {action && (
        <Link to={action.to}>
          <Button variant="primary" size="md">{action.label}</Button>
        </Link>
      )}
    </motion.div>
  );
}
