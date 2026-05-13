import { motion } from 'framer-motion';
import { getMatchBg, getMatchLabel } from '@/utils';
import { cn } from '@/utils';

export default function MatchScore({ score, size = 'md', showLabel = true }) {
  const radius = size === 'lg' ? 36 : size === 'sm' ? 20 : 28;
  const stroke = size === 'lg' ? 4 : 3;
  const dim    = (radius + stroke) * 2;
  const circ   = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;

  const colorClass = score >= 85 ? '#10b981' : score >= 70 ? '#6366f1' : score >= 55 ? '#f59e0b' : '#f43f5e';

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center justify-center" style={{ width: dim, height: dim }}>
        <svg width={dim} height={dim} className="-rotate-90">
          <circle
            cx={dim / 2} cy={dim / 2} r={radius}
            fill="none" stroke="currentColor"
            strokeWidth={stroke}
            className="text-surface-200"
          />
          <motion.circle
            cx={dim / 2} cy={dim / 2} r={radius}
            fill="none" stroke={colorClass}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          />
        </svg>
        <span className={cn(
          'absolute font-bold font-mono',
          size === 'lg' ? 'text-base' : size === 'sm' ? 'text-[10px]' : 'text-xs'
        )} style={{ color: colorClass }}>
          {score}
        </span>
      </div>
      {showLabel && (
        <span className={cn(
          'text-xs font-semibold px-2 py-0.5 rounded-full border',
          getMatchBg(score)
        )}>
          {getMatchLabel(score)}
        </span>
      )}
    </div>
  );
}
