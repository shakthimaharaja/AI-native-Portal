import { Star, GitFork, AlertCircle, Lock, Globe, CircleCheck, CircleX, Clock } from 'lucide-react';
import type { Repository } from '../../types';

interface RepositoryCardProps {
  repo: Repository;
  isSelected: boolean;
  onClick: () => void;
}

const ciIcon = {
  passing: <CircleCheck size={12} className="text-emerald-400" />,
  failing: <CircleX size={12} className="text-red-400" />,
  pending: <Clock size={12} className="text-amber-400" />,
  unknown: <Clock size={12} className="text-slate-500" />,
};

function HealthBar({ score }: { score: number }) {
  const color = score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs text-slate-500">{score}</span>
    </div>
  );
}

export function RepositoryCard({ repo, isSelected, onClick }: RepositoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg border transition-all duration-150 group ${
        isSelected
          ? 'bg-blue-500/10 border-blue-500/50 shadow-sm shadow-blue-500/10'
          : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'
      }`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-sm font-semibold text-slate-100 truncate">{repo.name}</span>
          {repo.visibility === 'private' ? (
            <Lock size={11} className="text-slate-500 shrink-0" />
          ) : (
            <Globe size={11} className="text-slate-500 shrink-0" />
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">{ciIcon[repo.ciStatus]}</div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-500 line-clamp-1 mb-2">{repo.description}</p>

      {/* Language + stats */}
      <div className="flex items-center gap-3 mb-2">
        <span className="flex items-center gap-1 text-xs text-slate-400">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: repo.languageColor }}
          />
          {repo.language}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <Star size={11} /> {repo.stars}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <GitFork size={11} /> {repo.forks}
        </span>
        {repo.vulnerabilities > 0 && (
          <span className="flex items-center gap-1 text-xs text-red-400 ml-auto">
            <AlertCircle size={11} /> {repo.vulnerabilities}
          </span>
        )}
      </div>

      {/* Health bar */}
      <HealthBar score={repo.healthScore} />
    </button>
  );
}
