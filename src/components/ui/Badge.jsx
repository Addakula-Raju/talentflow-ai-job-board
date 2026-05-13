import { cn } from '@/utils';

const variants = {
  default:  'bg-surface-100 text-ink-secondary border-surface-200',
  brand:    'bg-brand-500/10 text-brand-500 border-brand-500/20',
  success:  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  warning:  'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  danger:   'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  purple:   'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  glass:    'bg-white/10 text-white border-white/20 backdrop-blur-sm',
};

export default function Badge({ children, variant = 'default', className, dot }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border',
      variants[variant],
      className
    )}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />}
      {children}
    </span>
  );
}
