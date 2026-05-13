import { cn } from '@/utils';

const sizes = { sm: 'w-8 h-8 text-sm', md: 'w-11 h-11 text-base', lg: 'w-16 h-16 text-xl' };

export default function CompanyLogo({ logo, color = '#6366f1', size = 'md', className }) {
  return (
    <div
      className={cn(
        'rounded-xl flex items-center justify-center font-bold text-white flex-shrink-0 shadow-sm',
        sizes[size], className
      )}
      style={{ background: `linear-gradient(135deg, ${color}dd, ${color}88)` }}
    >
      {logo}
    </div>
  );
}
