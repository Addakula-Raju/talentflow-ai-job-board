import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatSalary(min, max, currency = 'USD') {
  const fmt = (n) => n >= 1000 ? `${(n / 1000).toFixed(0)}k` : n;
  const sym = currency === 'USD' ? '$' : currency;
  return `${sym}${fmt(min)}–${sym}${fmt(max)}`;
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7)  return `${diff}d ago`;
  if (diff < 30) return `${Math.floor(diff / 7)}w ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function getMatchColor(score) {
  if (score >= 85) return 'text-emerald-500';
  if (score >= 70) return 'text-brand-500';
  if (score >= 55) return 'text-amber-500';
  return 'text-rose-500';
}

export function getMatchBg(score) {
  if (score >= 85) return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
  if (score >= 70) return 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-500/20';
  if (score >= 55) return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
  return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
}

export function getMatchLabel(score) {
  if (score >= 85) return 'Strong Match';
  if (score >= 70) return 'Good Match';
  if (score >= 55) return 'Fair Match';
  return 'Low Match';
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function truncate(str, length = 120) {
  if (!str || str.length <= length) return str;
  return str.slice(0, length).trim() + '…';
}
