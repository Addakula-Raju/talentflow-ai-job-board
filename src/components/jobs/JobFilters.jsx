import { motion } from 'framer-motion';
import { X, SlidersHorizontal } from 'lucide-react';
import { useJobStore } from '@/store';
import Button from '@/components/ui/Button';
import { cn } from '@/utils';

const TYPE_OPTIONS    = ['Full-time', 'Part-time', 'Contract', 'Internship'];
const REMOTE_OPTIONS  = ['Remote', 'Hybrid', 'On-site'];
const EXP_OPTIONS     = ['0-2 years', '3-5 years', '5-8 years', '8+ years'];
const DEPT_OPTIONS    = ['Engineering', 'Design', 'Product', 'Research', 'Infrastructure', 'Security'];

function FilterGroup({ label, options, selected, onChange }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-ink-tertiary uppercase tracking-wider">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map(opt => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => onChange(
                active ? selected.filter(s => s !== opt) : [...selected, opt]
              )}
              className={cn(
                'px-2.5 py-1 rounded-lg text-xs font-medium border transition-all duration-150',
                active
                  ? 'bg-brand-500/10 text-brand-500 border-brand-500/30'
                  : 'bg-surface-50 text-ink-secondary border-surface-200 hover:border-surface-300'
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function JobFilters({ className }) {
  const { filters, setFilter, resetFilters } = useJobStore();
  const activeCount = [
    ...filters.type, ...filters.remote,
    ...filters.experience, ...filters.department, ...filters.tags,
  ].length;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'rounded-2xl border border-surface-200 bg-surface-0 p-5 space-y-5',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-ink-secondary" />
          <span className="font-semibold text-sm text-ink-primary">Filters</span>
          {activeCount > 0 && (
            <span className="min-w-[20px] h-5 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center px-1.5">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-ink-tertiary hover:text-rose-500 transition-colors"
          >
            <X style={{ width: 12, height: 12 }} /> Clear
          </button>
        )}
      </div>

      <FilterGroup
        label="Job Type"
        options={TYPE_OPTIONS}
        selected={filters.type}
        onChange={v => setFilter('type', v)}
      />
      <FilterGroup
        label="Work Style"
        options={REMOTE_OPTIONS}
        selected={filters.remote}
        onChange={v => setFilter('remote', v)}
      />
      <FilterGroup
        label="Department"
        options={DEPT_OPTIONS}
        selected={filters.department}
        onChange={v => setFilter('department', v)}
      />

      {/* Salary range */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-ink-tertiary uppercase tracking-wider">Min Salary</p>
        <input
          type="range"
          min={0} max={300000} step={10000}
          value={filters.salary[0]}
          onChange={e => setFilter('salary', [Number(e.target.value), filters.salary[1]])}
          className="w-full accent-brand-500"
        />
        <div className="flex justify-between text-xs text-ink-tertiary">
          <span>${(filters.salary[0] / 1000).toFixed(0)}k</span>
          <span>$300k+</span>
        </div>
      </div>
    </motion.aside>
  );
}
