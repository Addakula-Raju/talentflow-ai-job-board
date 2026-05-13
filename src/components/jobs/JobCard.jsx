import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Bookmark, BookmarkCheck, TrendingUp, Users, ArrowUpRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useJobStore } from '@/store';
import { formatSalary, formatDate, cn } from '@/utils';
import Badge from '@/components/ui/Badge';
import MatchScore from '@/components/ui/MatchScore';
import CompanyLogo from '@/components/ui/CompanyLogo';

export default function JobCard({ job, index = 0, compact = false }) {
  const { toggleSaveJob } = useJobStore();
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSaving(true);
    await new Promise(r => setTimeout(r, 150));
    toggleSaveJob(job.id);
    toast.success(job.saved ? 'Removed from saved' : 'Job saved!', {
      icon: job.saved ? '🗑️' : '🔖',
    });
    setSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
    >
      <Link to={`/jobs/${job.id}`} className="block group">
        <article className={cn(
          'relative rounded-2xl border bg-surface-0 transition-all duration-300',
          'hover:shadow-card-hover hover:border-brand-500/30',
          'border-surface-200 shadow-card',
          job.featured && 'ring-1 ring-brand-500/20',
          compact ? 'p-4' : 'p-5'
        )}>
          {job.featured && (
            <div className="absolute top-3 right-12 flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20">
              <TrendingUp className="w-3 h-3 text-brand-500" />
              <span className="text-[10px] font-semibold text-brand-500">Featured</span>
            </div>
          )}

          {/* Save button */}
          <button
            onClick={handleSave}
            aria-label={job.saved ? 'Unsave job' : 'Save job'}
            className={cn(
              'absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200',
              job.saved
                ? 'text-brand-500 bg-brand-500/10'
                : 'text-ink-tertiary hover:text-brand-500 hover:bg-surface-100 opacity-0 group-hover:opacity-100'
            )}
          >
            {job.saved
              ? <BookmarkCheck style={{ width: 16, height: 16 }} />
              : <Bookmark style={{ width: 16, height: 16 }} />
            }
          </button>

          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <CompanyLogo logo={job.companyLogo} color={job.companyColor} size="md" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-ink-tertiary">{job.company}</p>
              <h3 className="font-semibold text-ink-primary text-base leading-snug truncate pr-8">
                {job.title}
              </h3>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
            <span className="flex items-center gap-1 text-xs text-ink-tertiary">
              <MapPin style={{ width: 12, height: 12 }} />
              {job.remote !== 'On-site' ? job.remote : job.location}
            </span>
            <span className="flex items-center gap-1 text-xs text-ink-tertiary">
              <Clock style={{ width: 12, height: 12 }} />
              {formatDate(job.posted)}
            </span>
            {!compact && (
              <span className="flex items-center gap-1 text-xs text-ink-tertiary">
                <Users style={{ width: 12, height: 12 }} />
                {job.applicants} applicants
              </span>
            )}
          </div>

          {/* Tags */}
          {!compact && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              <Badge variant="default">{job.type}</Badge>
              {job.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="default">{tag}</Badge>
              ))}
              {job.tags.length > 3 && (
                <Badge variant="default">+{job.tags.length - 3}</Badge>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-surface-100">
            <div>
              <p className="text-sm font-semibold text-ink-primary">
                {formatSalary(job.salary.min, job.salary.max)}
              </p>
              <p className="text-[11px] text-ink-tertiary">per year</p>
            </div>
            <div className="flex items-center gap-3">
              <MatchScore score={job.aiMatchScore} size="sm" showLabel={false} />
              <div className="flex items-center gap-1 text-xs font-medium text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity">
                View <ArrowUpRight style={{ width: 12, height: 12 }} />
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
