import type { AgentStatus } from '../../types';

const config: Record<AgentStatus, { label: string; dot: string; text: string; bg: string; border: string }> = {
  idle: {
    label: 'Idle',
    dot: 'bg-gray-400',
    text: 'text-gray-500',
    bg: 'bg-gray-100',
    border: 'border-gray-200',
  },
  pending: {
    label: 'Pending',
    dot: 'bg-amber-400 animate-pulse',
    text: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
  },
  running: {
    label: 'Running',
    dot: 'bg-blue-400 animate-pulse',
    text: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
  },
  success: {
    label: 'Success',
    dot: 'bg-emerald-400',
    text: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
  },
  failure: {
    label: 'Failed',
    dot: 'bg-red-400',
    text: 'text-red-400',
    bg: 'bg-red-400/10',
    border: 'border-red-400/20',
  },
};

interface StatusBadgeProps {
  status: AgentStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const c = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${c.text} ${c.bg} ${c.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
      {c.label}
    </span>
  );
}
