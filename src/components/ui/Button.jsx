import { forwardRef } from 'react';
import { cn } from '@/utils';

const variants = {
  primary:  'bg-gradient-to-r from-brand-600 to-purple-600 text-white shadow-brand hover:shadow-brand hover:scale-[1.02] active:scale-[0.98]',
  secondary:'bg-surface-100 text-ink-primary border border-surface-200 hover:bg-surface-200 hover:border-surface-300',
  ghost:    'text-ink-secondary hover:text-ink-primary hover:bg-surface-100',
  danger:   'bg-rose-500/10 text-rose-600 border border-rose-500/20 hover:bg-rose-500/20',
  glass:    'bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20',
};

const sizes = {
  sm:  'h-8  px-3   text-xs  rounded-lg  gap-1.5',
  md:  'h-10 px-4   text-sm  rounded-xl  gap-2',
  lg:  'h-12 px-6   text-sm  rounded-xl  gap-2   font-semibold',
  xl:  'h-14 px-8   text-base rounded-2xl gap-2.5 font-semibold',
  icon:'h-9  w-9    rounded-xl justify-center',
};

const Button = forwardRef(({
  children, variant = 'secondary', size = 'md',
  loading, disabled, className, ...props
}, ref) => (
  <button
    ref={ref}
    disabled={disabled || loading}
    className={cn(
      'inline-flex items-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 disabled:opacity-50 disabled:pointer-events-none',
      variants[variant],
      sizes[size],
      className
    )}
    {...props}
  >
    {loading
      ? <><Spinner /> {children}</>
      : children
    }
  </button>
));
Button.displayName = 'Button';
export default Button;

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
