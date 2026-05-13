import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import { useJobStore } from '@/store';
import PageTransition from '@/components/common/PageTransition';
import JobCard from '@/components/jobs/JobCard';
import EmptyState from '@/components/ui/EmptyState';

export default function SavedJobsPage() {
  const { getSavedJobs } = useJobStore();
  const saved = getSavedJobs();

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2.5 mb-1">
              <Bookmark className="w-5 h-5 text-brand-500" />
              <h1 className="text-2xl font-extrabold text-ink-primary">Saved Jobs</h1>
            </div>
            <p className="text-ink-secondary">
              {saved.length > 0
                ? `${saved.length} job${saved.length !== 1 ? 's' : ''} saved`
                : 'Your bookmarked opportunities'
              }
            </p>
          </motion.div>

          {saved.length === 0 ? (
            <EmptyState
              icon="bookmark"
              title="No saved jobs yet"
              description="Browse jobs and bookmark the ones you're interested in. They'll appear here."
              action={{ to: '/jobs', label: 'Browse Jobs' }}
            />
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {saved.map((job, i) => (
                <JobCard key={job.id} job={job} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
