import {
  Star,
  GitFork,
  AlertCircle,
  Lock,
  Globe,
  CircleCheck,
  CircleX,
  Clock,
} from "lucide-react";
import type { Repository } from "../../types";

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
  const color =
    score >= 80
      ? "bg-emerald-500"
      : score >= 60
        ? "bg-amber-500"
        : "bg-red-500";
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs text-gray-400">{score}</span>
    </div>
  );
}

export function RepositoryCard({
  repo,
  isSelected,
  onClick,
}: RepositoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg border transition-all duration-150 group ${
        isSelected
          ? "bg-gray-900 border-gray-900 shadow-sm"
          : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-400"
      }`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className={`text-sm font-semibold truncate ${isSelected ? "text-white" : "text-gray-900"}`}
          >
            {repo.name}
          </span>
          {repo.visibility === "private" ? (
            <Lock
              size={11}
              className={
                isSelected ? "text-gray-300 shrink-0" : "text-gray-400 shrink-0"
              }
            />
          ) : (
            <Globe
              size={11}
              className={
                isSelected ? "text-gray-300 shrink-0" : "text-gray-400 shrink-0"
              }
            />
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {ciIcon[repo.ciStatus]}
        </div>
      </div>

      {/* Description */}
      <p
        className={`text-xs line-clamp-1 mb-2 ${isSelected ? "text-gray-300" : "text-gray-500"}`}
      >
        {repo.description}
      </p>

      {/* Language + stats */}
      <div className="flex items-center gap-3 mb-2">
        <span
          className={`flex items-center gap-1 text-xs ${isSelected ? "text-gray-200" : "text-gray-600"}`}
        >
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: repo.languageColor }}
          />
          {repo.language}
        </span>
        <span
          className={`flex items-center gap-1 text-xs ${isSelected ? "text-gray-300" : "text-gray-500"}`}
        >
          <Star size={11} /> {repo.stars}
        </span>
        <span
          className={`flex items-center gap-1 text-xs ${isSelected ? "text-gray-300" : "text-gray-500"}`}
        >
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
