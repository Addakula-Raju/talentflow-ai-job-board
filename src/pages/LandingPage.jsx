import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Target, Brain, Shield, Star, CheckCircle2 } from 'lucide-react';
import { JOBS, CATEGORIES } from '@/data/jobs';
import { formatSalary } from '@/utils';
import PageTransition from '@/components/common/PageTransition';
import CompanyLogo from '@/components/ui/CompanyLogo';
import Badge from '@/components/ui/Badge';
import MatchScore from '@/components/ui/MatchScore';

const STATS = [
  { value: '12,400+', label: 'Active Jobs' },
  { value: '4,200+', label: 'Companies' },
  { value: '94%',    label: 'Match Accuracy' },
  { value: '38 days',label: 'Avg. Time to Hire' },
];

const FEATURES = [
  {
    icon: Brain,
    title: 'AI Match Score',
    desc: 'Every job gets a personalized compatibility score based on your skills and preferences.',
    color: 'from-brand-500/20 to-purple-500/20',
    accent: '#6366f1',
  },
  {
    icon: Target,
    title: 'Skill Gap Analysis',
    desc: 'Know exactly what to learn before applying. AI identifies gaps and suggests resources.',
    color: 'from-emerald-500/20 to-teal-500/20',
    accent: '#10b981',
  },
  {
    icon: Sparkles,
    title: 'AI Cover Letters',
    desc: 'Generate compelling cover letter drafts tailored to each specific role in seconds.',
    color: 'from-amber-500/20 to-orange-500/20',
    accent: '#f59e0b',
  },
  {
    icon: Shield,
    title: 'Curated Quality',
    desc: 'Every listing is verified. No spam, no outdated posts — only serious opportunities.',
    color: 'from-rose-500/20 to-pink-500/20',
    accent: '#f43f5e',
  },
];

function FloatingJob({ job, style, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      style={style}
      className="absolute glass-card p-3 rounded-xl min-w-[200px] hidden lg:block pointer-events-none"
    >
      <div className="flex items-center gap-2.5">
        <CompanyLogo logo={job.companyLogo} color={job.companyColor} size="sm" />
        <div>
          <p className="text-xs font-semibold text-ink-primary leading-tight">{job.title}</p>
          <p className="text-[10px] text-ink-tertiary">{job.company}</p>
        </div>
        <div className="ml-auto">
          <MatchScore score={job.aiMatchScore} size="sm" showLabel={false} />
        </div>
      </div>
    </motion.div>
  );
}

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const featured = JOBS.filter(j => j.featured).slice(0, 3);

  return (
    <PageTransition>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-surface-0"
      >
        {/* Background mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-500/10 blur-[100px]" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-[80px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-brand-500/5 to-transparent" />
          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating job cards */}
        <FloatingJob job={JOBS[0]} delay={0.8} style={{ top: '22%', left: '4%' }} />
        <FloatingJob job={JOBS[3]} delay={1.0} style={{ top: '35%', right: '3%' }} />
        <FloatingJob job={JOBS[1]} delay={1.2} style={{ bottom: '28%', right: '5%' }} />

        <motion.div style={{ y, opacity }} className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/30 bg-brand-500/8 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span className="text-sm font-medium text-brand-500">AI-Powered Job Matching</span>
            <span className="w-px h-3.5 bg-brand-500/30" />
            <span className="text-xs text-ink-tertiary">12k+ openings</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink-primary leading-[1.08] mb-6"
          >
            Find work that{' '}
            <span className="gradient-text">actually fits</span>
            <br />you — not just{' '}
            <span className="relative">
              keywords
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-500 to-purple-500 origin-left rounded-full"
              />
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-ink-secondary max-w-xl mx-auto mb-10 leading-relaxed"
          >
            TalentFlow uses AI to match you with roles youll love, identify skill gaps,
            and even draft your cover letters — all in one place.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
          >
            <Link
              to="/jobs"
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-purple-600 text-white font-semibold text-base shadow-brand hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200"
            >
              <Zap className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
              Explore Jobs
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-surface-300 text-ink-primary font-semibold text-base hover:bg-surface-100 transition-colors duration-200"
            >
              <Brain style={{ width: 18, height: 18 }} />
              View Dashboard
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-extrabold gradient-text">{s.value}</p>
                <p className="text-xs text-ink-tertiary mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-tertiary"
        >
          <span className="text-xs">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-surface-300 flex items-start justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-1.5 rounded-full bg-brand-500"
            />
          </div>
        </motion.div>
      </section>

      {/*  Features  */}
      <section className="py-24 px-6 bg-surface-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <Badge variant="brand" className="mb-4">Why TalentFlow</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-primary mb-4">
              Your AI career co-pilot
            </h2>
            <p className="text-ink-secondary max-w-xl mx-auto">
              Stop guessing whether youre a good fit. Let AI do the heavy lifting so you can focus on what matters.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`rounded-2xl p-6 border border-surface-200 bg-gradient-to-br ${f.color} backdrop-blur-sm`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${f.accent}20`, border: `1px solid ${f.accent}30` }}
                >
                  <f.icon className="w-5 h-5" style={{ color: f.accent }} />
                </div>
                <h3 className="font-semibold text-ink-primary mb-2">{f.title}</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*  Featured Jobs  */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <Badge variant="brand" className="mb-3">Featured Roles</Badge>
              <h2 className="text-3xl font-extrabold text-ink-primary">Top picks for you</h2>
            </div>
            <Link to="/jobs" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
              >
                <Link to={`/jobs/${job.id}`}>
                  <div className="h-full rounded-2xl border border-surface-200 bg-surface-0 p-5 hover:shadow-card-hover hover:border-brand-500/30 transition-all duration-300 group">
                    <div className="flex items-start gap-3 mb-3">
                      <CompanyLogo logo={job.companyLogo} color={job.companyColor} />
                      <div>
                        <p className="text-xs text-ink-tertiary">{job.company}</p>
                        <h3 className="font-semibold text-ink-primary">{job.title}</h3>
                      </div>
                    </div>
                    <p className="text-xs text-ink-secondary line-clamp-2 mb-4">{job.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-ink-primary">
                        {formatSalary(job.salary.min, job.salary.max)}
                      </span>
                      <MatchScore score={job.aiMatchScore} size="sm" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link to="/jobs" className="inline-flex items-center gap-2 text-sm font-medium text-brand-500">
              View all jobs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/*  Categories  */}
      <section className="py-20 px-6 bg-surface-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-extrabold text-ink-primary mb-3">Browse by category</h2>
            <p className="text-ink-secondary">From IC roles to leadership — weve got the full spectrum.</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <Link
                  to={`/jobs?dept=${cat.id}`}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-surface-200 bg-surface-0 hover:border-brand-500/30 hover:shadow-card transition-all duration-200 text-center"
                >
                  <span className="text-2xl font-bold gradient-text">{cat.count}</span>
                  <span className="text-sm font-medium text-ink-primary">{cat.label}</span>
                  <span className="text-xs text-ink-tertiary">openings</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*  CTA Banner  */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-10 text-center"
            style={{ background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 50%, #7c3aed 100%)' }}
          >
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="white" />
                </pattern></defs>
                <rect width="100%" height="100%" fill="url(#dots)" />
              </svg>
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 mb-6">
                <Star className="w-3.5 h-3.5 text-yellow-300" />
                <span className="text-sm font-medium text-white">Join 50,000+ job seekers</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Ready to find your next chapter?
              </h2>
              <p className="text-white/75 mb-8 max-w-md mx-auto">
                Get AI-matched to opportunities youd actually want. Takes 2 minutes to get started.
              </p>
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-brand-700 font-bold text-base hover:scale-[1.03] active:scale-[0.98] transition-transform shadow-xl"
              >
                <Zap className="w-5 h-5" />
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center justify-center gap-6 mt-8">
                {['No credit card', 'Cancel anytime', 'Free forever tier'].map(t => (
                  <div key={t} className="flex items-center gap-1.5 text-xs text-white/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/*  Footer  */}
      <footer className="border-t border-surface-200 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-ink-primary">TalentFlow AI</span>
          </div>
          <p className="text-xs text-ink-tertiary">© 2026 Built for the future of hiring • Designed & developed by Addakula Raju.</p>
          <div className="flex items-center gap-4">
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <a key={l} href="#" className="text-xs text-ink-tertiary hover:text-ink-primary transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </PageTransition>
  );
}
