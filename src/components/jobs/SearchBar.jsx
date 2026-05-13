import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Loader2 } from 'lucide-react';
import { useJobStore } from '@/store';
import { cn } from '@/utils';

export default function SearchBar({ className, placeholder = 'Search jobs, companies, skills…', autoFocus }) {
  const { filters, setFilter } = useJobStore();
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  return (
    <motion.div
      animate={{ scale: focused ? 1.01 : 1 }}
      transition={{ duration: 0.15 }}
      className={cn(
        'relative flex items-center rounded-2xl border bg-surface-0 transition-all duration-200',
        focused ? 'border-brand-500/60 shadow-[0_0_0_3px_rgba(99,102,241,0.1)]' : 'border-surface-200',
        className
      )}
    >
      <Search
        className={cn(
          'absolute left-4 transition-colors duration-200 flex-shrink-0',
          focused ? 'text-brand-500' : 'text-ink-tertiary'
        )}
        style={{ width: 18, height: 18 }}
      />
      <input
        ref={inputRef}
        autoFocus={autoFocus}
        value={filters.search}
        onChange={e => setFilter('search', e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="w-full h-12 pl-11 pr-10 bg-transparent text-sm text-ink-primary placeholder:text-ink-disabled focus:outline-none"
        aria-label="Search jobs"
      />
      {filters.search && (
        <button
          onClick={() => { setFilter('search', ''); inputRef.current?.focus(); }}
          className="absolute right-3 w-6 h-6 rounded-md flex items-center justify-center text-ink-tertiary hover:text-ink-primary hover:bg-surface-100 transition-all"
        >
          <X style={{ width: 14, height: 14 }} />
        </button>
      )}
    </motion.div>
  );
}
