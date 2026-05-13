import { cn } from '@/utils';

export function Skeleton({ className }) {
  return (
    <div className={cn('shimmer-bg rounded-lg', className)} />
  );
}

export function JobCardSkeleton() {
  return (
    <div className="rounded-2xl border border-surface-200 bg-surface-50 p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-11 h-11 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="h-5 w-48" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
      <div className="flex items-center justify-between pt-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
    </div>
  );
}

export function JobDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-surface-200 bg-surface-50 p-8 space-y-5">
        <div className="flex items-start gap-5">
          <Skeleton className="w-16 h-16 rounded-2xl flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-7 w-64" />
            <Skeleton className="h-5 w-40" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1,2,3].map(i => <Skeleton key={i} className="h-16 rounded-xl" />)}
        </div>
      </div>
      <div className="rounded-2xl border border-surface-200 bg-surface-50 p-8 space-y-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}
