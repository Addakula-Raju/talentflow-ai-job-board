import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { useJobStore } from '@/store';
import PageTransition from '@/components/common/PageTransition';
import SearchBar from '@/components/jobs/SearchBar';
import JobCard from '@/components/jobs/JobCard';
import JobFilters from '@/components/jobs/JobFilters';
import { JobCardSkeleton } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import { cn } from '@/utils';

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'match',     label: 'Best Match' },
  { value: 'newest',    label: 'Newest First' },
  { value: 'salary',    label: 'Highest Salary' },
  { value: 'popular',   label: 'Most Viewed' },
];

export default function JobsPage() {
  const { getFilteredJobs, viewMode, setViewMode, sortBy, setSortBy, filters } = useJobStore();
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const jobs = getFilteredJobs();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const activeFiltersCount = [
    ...filters.type, ...filters.remote,
    ...filters.experience, ...filters.department,
  ].length;

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 pb-16">
        {/* Header */}
        <div className="border-b border-surface-200 bg-surface-0/80 backdrop-blur-xl sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center gap-3">
              <SearchBar className="flex-1 max-w-xl" />

              {/* Mobile filter toggle */}
              <Button
                variant="secondary"
                size="md"
                onClick={() => setShowMobileFilters(v => !v)}
                className="md:hidden relative"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>

              <div className="hidden sm:flex items-center gap-2 ml-auto">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="h-10 px-3 rounded-xl border border-surface-200 bg-surface-0 text-sm text-ink-secondary focus:outline-none focus:border-brand-500/60 cursor-pointer"
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <div className="flex rounded-xl border border-surface-200 overflow-hidden">
                  {[
                    { mode: 'grid', Icon: LayoutGrid },
                    { mode: 'list', Icon: List },
                  ].map(({ mode, Icon }) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={cn(
                        'w-10 h-10 flex items-center justify-center transition-colors',
                        viewMode === mode
                          ? 'bg-brand-500/10 text-brand-500'
                          : 'text-ink-tertiary hover:bg-surface-100'
                      )}
                    >
                      <Icon style={{ width: 16, height: 16 }} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile filters dropdown */}
            {showMobileFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-3"
              >
                <JobFilters />
              </motion.div>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <div className="flex gap-6">
            {/* Sidebar filters — desktop */}
            <aside className="hidden md:block w-64 flex-shrink-0">
              <div className="sticky top-36">
                <JobFilters />
              </div>
            </aside>

            {/* Job list */}
            <div className="flex-1 min-w-0">
              {/* Results meta */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-ink-tertiary">
                  {loading ? (
                    <span className="shimmer-bg h-4 w-24 rounded inline-block" />
                  ) : (
                    <><span className="font-semibold text-ink-primary">{jobs.length}</span> roles found</>
                  )}
                </p>
              </div>

              {loading ? (
                <div className={cn(
                  'grid gap-4',
                  viewMode === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-2' : 'grid-cols-1'
                )}>
                  {Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)}
                </div>
              ) : jobs.length === 0 ? (
                <EmptyState
                  icon="search"
                  title="No jobs found"
                  description="Try adjusting your search or filters to find more opportunities."
                  action={{ to: '/jobs', label: 'Clear filters' }}
                />
              ) : (
                <motion.div
                  layout
                  className={cn(
                    'grid gap-4',
                    viewMode === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-2' : 'grid-cols-1'
                  )}
                >
                  {jobs.map((job, i) => (
                    <JobCard key={job.id} job={job} index={i} compact={viewMode === 'list'} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
