import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, MapPin, Clock, Users, Bookmark, BookmarkCheck,
  ExternalLink, Sparkles, CheckCircle2, AlertCircle, DollarSign, Calendar, Building2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useJobStore } from '@/store';
import { formatSalary, formatDate, cn } from '@/utils';
import PageTransition from '@/components/common/PageTransition';
import { JobDetailSkeleton } from '@/components/ui/Skeleton';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import MatchScore from '@/components/ui/MatchScore';
import CompanyLogo from '@/components/ui/CompanyLogo';
import AIPanel from '@/components/ai/AIPanel';

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJobById, toggleSaveJob, applyToJob, appliedJobIds } = useJobStore();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState(null);
  const [aiOpen, setAiOpen] = useState(false);
  const [applying, setApplying] = useState(false);

  const isApplied = appliedJobIds.includes(id);

  useEffect(() => {
    const t = setTimeout(() => {
      setJob(getJobById(id));
      setLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, [id]);

  const handleSave = () => {
    toggleSaveJob(id);
    toast.success(job.saved ? 'Removed from saved' : 'Job saved!', {
      icon: job.saved ? '🗑️' : '🔖',
    });
    setJob(getJobById(id));
  };

  const handleApply = async () => {
    setApplying(true);
    await new Promise(r => setTimeout(r, 1200));
    applyToJob(id);
    toast.success('Application submitted! 🎉', { duration: 4000 });
    setApplying(false);
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-24 pb-16 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-8">
            <div className="flex-1"><JobDetailSkeleton /></div>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!job) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4">
          <AlertCircle className="w-12 h-12 text-rose-500" />
          <h1 className="text-xl font-bold text-ink-primary">Job not found</h1>
          <Button variant="secondary" onClick={() => navigate('/jobs')}>
            <ArrowLeft className="w-4 h-4" /> Back to Jobs
          </Button>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 pb-16 bg-surface-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
          {/* Back nav */}
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm text-ink-tertiary hover:text-ink-primary transition-colors mb-6"
          >
            <ArrowLeft style={{ width: 15, height: 15 }} />
            Back to Jobs
          </Link>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main content */}
            <div className="flex-1 min-w-0 space-y-5">
              {/* Job header card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-surface-200 bg-surface-0 p-6 sm:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-6">
                  <CompanyLogo logo={job.companyLogo} color={job.companyColor} size="lg" />
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="default">{job.type}</Badge>
                      <Badge variant={job.remote === 'Remote' ? 'success' : 'default'}>{job.remote}</Badge>
                      {job.featured && <Badge variant="brand">Featured</Badge>}
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-primary mb-1">{job.title}</h1>
                    <p className="text-ink-secondary font-medium">{job.company}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                      <span className="flex items-center gap-1.5 text-sm text-ink-tertiary">
                        <MapPin style={{ width: 14, height: 14 }} /> {job.location}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-ink-tertiary">
                        <Clock style={{ width: 14, height: 14 }} /> Posted {formatDate(job.posted)}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-ink-tertiary">
                        <Users style={{ width: 14, height: 14 }} /> {job.applicants} applicants
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <MatchScore score={job.aiMatchScore} size="lg" />
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {[
                    { icon: DollarSign, label: 'Salary', value: formatSalary(job.salary.min, job.salary.max) },
                    { icon: Building2, label: 'Department', value: job.department },
                    { icon: Users,     label: 'Experience', value: job.experience },
                    { icon: Calendar,  label: 'Deadline', value: formatDate(job.deadline) },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="rounded-xl bg-surface-50 border border-surface-100 p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon style={{ width: 13, height: 13 }} className="text-ink-tertiary" />
                        <span className="text-[11px] text-ink-tertiary">{label}</span>
                      </div>
                      <p className="text-sm font-semibold text-ink-primary">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleApply}
                    loading={applying}
                    disabled={isApplied}
                    className={cn(isApplied && 'from-emerald-600 to-teal-600 cursor-default')}
                  >
                    {isApplied ? (
                      <><CheckCircle2 className="w-4 h-4" /> Applied</>
                    ) : applying ? 'Submitting…' : 'Apply Now'}
                  </Button>
                  <Button variant="secondary" size="lg" onClick={handleSave}>
                    {job.saved
                      ? <><BookmarkCheck className="w-4 h-4 text-brand-500" /> Saved</>
                      : <><Bookmark className="w-4 h-4" /> Save Job</>
                    }
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => setAiOpen(v => !v)}
                    className={aiOpen ? 'border-brand-500/40 text-brand-500' : ''}
                  >
                    <Sparkles className="w-4 h-4" />
                    AI Analysis
                  </Button>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-surface-200 bg-surface-0 p-6 sm:p-8"
              >
                <h2 className="text-lg font-bold text-ink-primary mb-4">About the Role</h2>
                <p className="text-ink-secondary leading-relaxed mb-6">{job.description}</p>

                <h3 className="text-base font-bold text-ink-primary mb-3">Responsibilities</h3>
                <ul className="space-y-2.5 mb-6">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-ink-secondary">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>

                <h3 className="text-base font-bold text-ink-primary mb-3">Requirements</h3>
                <ul className="space-y-2.5 mb-6">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-ink-secondary">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0 mt-2" />
                      {r}
                    </li>
                  ))}
                </ul>

                <h3 className="text-base font-bold text-ink-primary mb-3">Tech Stack / Tags</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.tags.map(tag => (
                    <Badge key={tag} variant="brand">{tag}</Badge>
                  ))}
                </div>

                <h3 className="text-base font-bold text-ink-primary mb-3">Benefits</h3>
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map(b => (
                    <span key={b} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/8 border border-emerald-500/20 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" /> {b}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* AI Sidebar */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="sticky top-24 space-y-4">
                {/* Mobile AI toggle */}
                <div className="lg:hidden">
                  <AnimatePresence>
                    {aiOpen && <AIPanel job={job} onClose={() => setAiOpen(false)} />}
                  </AnimatePresence>
                </div>

                {/* Desktop AI panel - always show */}
                <div className="hidden lg:block">
                  <AIPanel job={job} />
                </div>

                {/* Quick apply CTA */}
                <div className="rounded-2xl border border-surface-200 bg-surface-50 p-5 space-y-3">
                  <h3 className="text-sm font-semibold text-ink-primary">Quick Apply</h3>
                  <p className="text-xs text-ink-tertiary">Your profile is ready. Submits your resume and profile directly.</p>
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    onClick={handleApply}
                    loading={applying}
                    disabled={isApplied}
                  >
                    {isApplied ? '✓ Applied' : 'Apply with Profile'}
                  </Button>
                  <a
                    href="#"
                    className="flex items-center justify-center gap-1.5 text-xs text-ink-tertiary hover:text-ink-primary transition-colors"
                  >
                    <ExternalLink style={{ width: 12, height: 12 }} />
                    Apply on {job.company}'s site
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
