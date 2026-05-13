import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, X, Brain, Target, TrendingUp, Copy, Check } from 'lucide-react';
import { mockServices } from '@/services/ai';
import { useUserStore } from '@/store';
import { cn } from '@/utils';
// import Button from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';

function AISection({ icon: Icon, title, children, accent = 'brand' }) {
  const colors = {
    brand:   'from-brand-500/10 to-purple-500/10 border-brand-500/20',
    emerald: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20',
    amber:   'from-amber-500/10 to-orange-500/10 border-amber-500/20',
  };
  return (
    <div className={cn('rounded-xl p-4 border bg-gradient-to-br', colors[accent])}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-brand-500" />
        <p className="text-xs font-semibold text-ink-primary">{title}</p>
      </div>
      {children}
    </div>
  );
}

export default function AIPanel({ job, onClose }) {
  const { profile } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState('');
  const [skillGaps, setSkillGaps] = useState([]);
  const [insights, setInsights] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('match');

  useEffect(() => {
    if (!job) return;
    setLoading(true);
    Promise.all([
      mockServices.generateJobSummary(job, profile.skills),
      mockServices.analyzeSkillGaps(job, profile.skills),
      mockServices.extractJobInsights(job),
    ]).then(([s, gaps, ins]) => {
      setSummary(s);
      setSkillGaps(gaps);
      setInsights(ins);
      setLoading(false);
    });
  }, [job, job.id, profile.skills]);

  const handleCoverLetter = async () => {
    if (coverLetter) return;
    setActiveTab('cover');
    const draft = await mockServices.generateCoverLetterDraft(job, profile);
    setCoverLetter(draft);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'match', label: 'Match Analysis' },
    { id: 'cover', label: 'Cover Letter' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-brand-500/20 bg-surface-0 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-surface-200 bg-gradient-to-r from-brand-500/5 to-purple-500/5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-primary">AI Career Coach</p>
            <p className="text-[11px] text-ink-tertiary">Powered by Claude</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-ink-tertiary hover:bg-surface-100 transition-colors"
          >
            <X style={{ width: 14, height: 14 }} />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-surface-200 px-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); if (tab.id === 'cover' && !coverLetter) handleCoverLetter(); }}
            className={cn(
              'px-3 py-3 text-xs font-medium border-b-2 transition-all duration-200',
              activeTab === tab.id
                ? 'border-brand-500 text-brand-500'
                : 'border-transparent text-ink-tertiary hover:text-ink-primary'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
        {activeTab === 'match' && (
          <>
            <AISection icon={Brain} title="Match Analysis" accent="brand">
              {loading
                ? <><Skeleton className="h-3.5 w-full mb-2" /><Skeleton className="h-3.5 w-5/6" /></>
                : <p className="text-xs text-ink-secondary leading-relaxed">{summary}</p>
              }
            </AISection>

            <AISection icon={Target} title="Skill Gaps to Address" accent="amber">
              {loading
                ? <div className="space-y-1.5">{[1,2,3].map(i => <Skeleton key={i} className="h-6 w-32 rounded-full" />)}</div>
                : (
                  <div className="flex flex-wrap gap-1.5">
                    {skillGaps.map(skill => (
                      <span key={skill} className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                )
              }
            </AISection>

            {insights && !loading && (
              <AISection icon={TrendingUp} title="Company Insights" accent="emerald">
                <div className="space-y-2">
                  {Object.entries(insights).map(([key, val]) => (
                    <div key={key}>
                      <p className="text-[10px] font-semibold text-ink-tertiary uppercase">{key}</p>
                      <p className="text-xs text-ink-secondary leading-relaxed">{val}</p>
                    </div>
                  ))}
                </div>
              </AISection>
            )}
          </>
        )}

        {activeTab === 'cover' && (
          <div className="space-y-3">
            {!coverLetter
              ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                </div>
              )
              : (
                <div className="relative rounded-xl bg-surface-50 border border-surface-200 p-4">
                  <p className="text-sm text-ink-secondary leading-relaxed">{coverLetter}</p>
                  <button
                    onClick={handleCopy}
                    className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium bg-surface-0 border border-surface-200 text-ink-tertiary hover:text-ink-primary transition-colors"
                  >
                    {copied ? <Check style={{ width: 10, height: 10 }} className="text-emerald-500" /> : <Copy style={{ width: 10, height: 10 }} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              )
            }
            <p className="text-[11px] text-ink-tertiary text-center">AI-generated opening — personalize before sending</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
