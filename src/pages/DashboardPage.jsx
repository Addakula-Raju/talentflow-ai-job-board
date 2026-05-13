import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, TrendingUp, Target, Brain, Bookmark,
  CheckCircle2, ArrowRight, Zap, Activity, Clock
} from 'lucide-react';
import { useJobStore, useUserStore } from '@/store';
// eslint-disable-next-line no-unused-vars
import { formatSalary, formatDate, getMatchBg, getMatchLabel } from '@/utils';
import PageTransition from '@/components/common/PageTransition';
// eslint-disable-next-line no-unused-vars
import JobCard from '@/components/jobs/JobCard';
import MatchScore from '@/components/ui/MatchScore';
import Badge from '@/components/ui/Badge';
import CompanyLogo from '@/components/ui/CompanyLogo';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/utils';

function StatCard({ icon: Icon, label, value, sub, color = 'brand', delay = 0 }) {
  const colors = {
    brand:   'from-brand-500/10 to-purple-500/10 border-brand-500/20 text-brand-500',
    emerald: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-500',
    amber:   'from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-500',
    rose:    'from-rose-500/10 to-pink-500/10 border-rose-500/20 text-rose-500',
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={cn('rounded-2xl border p-5 bg-gradient-to-br', colors[color])}
    >
      <div className="flex items-start justify-between mb-3">
        <Icon className="w-5 h-5" />
        <span className="text-2xl font-extrabold text-ink-primary">{value}</span>
      </div>
      <p className="text-sm font-semibold text-ink-primary">{label}</p>
      {sub && <p className="text-xs text-ink-tertiary mt-0.5">{sub}</p>}
    </motion.div>
  );
}

function SkillBar({ skill, level, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-ink-primary">{skill}</span>
        <span className="text-xs text-ink-tertiary">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-surface-200 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-purple-500"
        />
      </div>
    </motion.div>
  );
}

const SKILL_LEVELS = [
  { skill: 'React / Next.js', level: 92 },
  { skill: 'TypeScript',      level: 85 },
  { skill: 'Python',          level: 72 },
  { skill: 'AWS',             level: 68 },
  { skill: 'PostgreSQL',      level: 61 },
  { skill: 'Go',              level: 34 },
];

const RECOMMENDATIONS = [
  { skill: 'Go / Rust',     reason: 'Appears in 43% of your saved jobs',    priority: 'High',   color: 'rose' },
  { skill: 'Kubernetes',    reason: 'Required for 38% of engineering roles', priority: 'High',   color: 'amber' },
  { skill: 'System Design', reason: 'Key gap for senior+ positions',         priority: 'Medium', color: 'brand' },
];

export default function DashboardPage() {
  const { getFilteredJobs, savedJobIds, appliedJobIds } = useJobStore();
  const { profile } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const allJobs = getFilteredJobs();
  const topMatches = [...allJobs].sort((a, b) => b.aiMatchScore - a.aiMatchScore).slice(0, 3);
  const recentActivity = allJobs.filter(j => savedJobIds.includes(j.id) || appliedJobIds.includes(j.id)).slice(0, 5);

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          {/* Welcome header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start justify-between mb-8"
          >
            <div>
              <p className="text-ink-tertiary text-sm mb-1">Welcome back 👋</p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-primary">
                {profile.name}
              </h1>
              <p className="text-ink-secondary mt-1">{profile.title} · {profile.experience} experience</p>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <Link to="/jobs">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 text-white text-sm font-semibold shadow-brand hover:scale-[1.02] transition-transform">
                  <Zap className="w-4 h-4" />
                  Browse Jobs
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon={Activity}    label="AI Match Score"   value="88%" sub="Avg across saved jobs"      color="brand"   delay={0} />
            <StatCard icon={Bookmark}    label="Saved Jobs"       value={savedJobIds.length}   sub="Ready to apply"   color="emerald" delay={0.05} />
            <StatCard icon={CheckCircle2}label="Applications"     value={appliedJobIds.length} sub="Submitted so far"  color="amber"   delay={0.1} />
            <StatCard icon={TrendingUp}  label="Profile Views"    value="124" sub="Last 30 days"              color="rose"    delay={0.15} />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Top Matches */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border border-surface-200 bg-surface-0 p-6"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4.5 h-4.5 text-brand-500" style={{ width: 18, height: 18 }} />
                    <h2 className="font-bold text-ink-primary">Top AI Matches</h2>
                  </div>
                  <Link to="/jobs?sort=match" className="text-xs font-medium text-brand-500 hover:text-brand-600 flex items-center gap-1">
                    See all <ArrowRight style={{ width: 12, height: 12 }} />
                  </Link>
                </div>
                {loading ? (
                  <div className="space-y-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-surface-100">
                        <Skeleton className="w-10 h-10 rounded-xl" />
                        <div className="flex-1 space-y-1.5">
                          <Skeleton className="h-4 w-40" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                        <Skeleton className="h-8 w-16 rounded-lg" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {topMatches.map((job, i) => (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + i * 0.07 }}
                      >
                        <Link to={`/jobs/${job.id}`}>
                          <div className="flex items-center gap-3 p-3 rounded-xl border border-surface-100 hover:border-brand-500/30 hover:bg-surface-50 transition-all duration-200 group">
                            <CompanyLogo logo={job.companyLogo} color={job.companyColor} size="md" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-ink-primary truncate">{job.title}</p>
                              <p className="text-xs text-ink-tertiary">{job.company} · {formatSalary(job.salary.min, job.salary.max)}</p>
                            </div>
                            <MatchScore score={job.aiMatchScore} size="sm" showLabel={false} />
                            <span className={cn('hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold border', getMatchBg(job.aiMatchScore))}>
                              {getMatchLabel(job.aiMatchScore)}
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.section>

              {/* Skill Gaps / Recommendations */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border border-surface-200 bg-surface-0 p-6"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Target className="w-[18px] h-[18px] text-amber-500" />
                  <h2 className="font-bold text-ink-primary">Skill Recommendations</h2>
                </div>
                <div className="space-y-3">
                  {RECOMMENDATIONS.map((rec, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.07 }}
                      className="flex items-start gap-3 p-4 rounded-xl border border-surface-100 bg-surface-50"
                    >
                      <div className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                        rec.color === 'rose' ? 'bg-rose-500/10' : rec.color === 'amber' ? 'bg-amber-500/10' : 'bg-brand-500/10'
                      )}>
                        <Brain className={cn(
                          'w-4 h-4',
                          rec.color === 'rose' ? 'text-rose-500' : rec.color === 'amber' ? 'text-amber-500' : 'text-brand-500'
                        )} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-semibold text-ink-primary">{rec.skill}</p>
                          <Badge variant={rec.color === 'rose' ? 'danger' : rec.color === 'amber' ? 'warning' : 'brand'}>
                            {rec.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-ink-tertiary">{rec.reason}</p>
                      </div>
                      <a href="#" className="text-xs font-medium text-brand-500 hover:text-brand-600 whitespace-nowrap">
                        Learn →
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Profile card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="rounded-2xl border border-surface-200 bg-surface-0 p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {profile.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-ink-primary">{profile.name}</p>
                    <p className="text-xs text-ink-tertiary">{profile.location}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {profile.skills.map(s => (
                    <Badge key={s} variant="brand">{s}</Badge>
                  ))}
                </div>
                <div className="pt-4 border-t border-surface-100">
                  <p className="text-xs font-semibold text-ink-tertiary uppercase tracking-wider mb-3">Profile Strength</p>
                  <div className="h-2 rounded-full bg-surface-200 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '78%' }}
                      transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-purple-500"
                    />
                  </div>
                  <p className="text-xs text-ink-tertiary mt-1.5">78% complete</p>
                </div>
              </motion.div>

              {/* Skills breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="rounded-2xl border border-surface-200 bg-surface-0 p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-4 h-4 text-brand-500" />
                  <h3 className="text-sm font-bold text-ink-primary">Skill Proficiency</h3>
                </div>
                <div className="space-y-3.5">
                  {SKILL_LEVELS.map((s, i) => (
                    <SkillBar key={s.skill} skill={s.skill} level={s.level} delay={0.37 + i * 0.05} />
                  ))}
                </div>
              </motion.div>

              {/* Recent activity */}
              {recentActivity.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="rounded-2xl border border-surface-200 bg-surface-0 p-5"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-ink-tertiary" />
                    <h3 className="text-sm font-bold text-ink-primary">Recent Activity</h3>
                  </div>
                  <div className="space-y-2">
                    {recentActivity.map(job => (
                      <Link key={job.id} to={`/jobs/${job.id}`}>
                        <div className="flex items-center gap-2.5 py-2 hover:bg-surface-50 rounded-lg px-2 -mx-2 transition-colors">
                          <CompanyLogo logo={job.companyLogo} color={job.companyColor} size="sm" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-ink-primary truncate">{job.title}</p>
                            <p className="text-[11px] text-ink-tertiary">{job.company}</p>
                          </div>
                          {appliedJobIds.includes(job.id)
                            ? <Badge variant="success">Applied</Badge>
                            : <Badge variant="default">Saved</Badge>
                          }
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
