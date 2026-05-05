import {
  Star,
  GitFork,
  Eye,
  GitBranch,
  Users,
  Package,
  ShieldAlert,
  Activity,
  CircleCheck,
  CircleX,
  Clock,
  GitPullRequest,
  Lock,
  Globe,
} from 'lucide-react';
import type { Repository, AgentTask } from '../../types';
import { agentTasks } from '../../data/mockTasks';
import { taskIcon } from '../AgentExecution/taskIcon';

interface RepositoryOverviewProps {
  repo: Repository;
  onRunTask: (task: AgentTask) => void;
  isAgentRunning: boolean;
}

const ciConfig = {
  passing: { icon: <CircleCheck size={13} className="text-emerald-400" />, label: 'Passing', cls: 'text-emerald-400' },
  failing: { icon: <CircleX size={13} className="text-red-400" />, label: 'Failing', cls: 'text-red-400' },
  pending: { icon: <Clock size={13} className="text-amber-400" />, label: 'Pending', cls: 'text-amber-400' },
  unknown: { icon: <Clock size={13} className="text-slate-500" />, label: 'Unknown', cls: 'text-slate-500' },
};

function MetricCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col gap-1.5">
      <div className="flex items-center gap-2 text-gray-400 text-xs font-medium uppercase tracking-wider">
        {icon}
        {label}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {sub && <div className="text-xs text-gray-500">{sub}</div>}
    </div>
  );
}

function HealthRing({ score }: { score: number }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? '#34d399' : score >= 60 ? '#fbbf24' : '#f87171';
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="72" height="72" className="-rotate-90">
        <circle cx="36" cy="36" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="6" />
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <span className="absolute text-sm font-bold text-gray-900">{score}</span>
    </div>
  );
}

export function RepositoryOverview({ repo, onRunTask, isAgentRunning }: RepositoryOverviewProps) {
  const ci = ciConfig[repo.ciStatus];

  return (
    <div className="flex flex-col gap-5">
      {/* Repo header */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-gray-900">{repo.name}</h1>
              <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">
                {repo.visibility === 'private' ? <Lock size={11} /> : <Globe size={11} />}
                {repo.visibility}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-3">{repo.fullName}</p>
            <p className="text-sm text-gray-600 max-w-xl">{repo.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {repo.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-700 border border-gray-200 px-2 py-0.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Health ring */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            <HealthRing score={repo.healthScore} />
            <span className="text-xs text-gray-400">Health</span>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-gray-200 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.languageColor }} />
            {repo.language}
          </span>
          <span className="flex items-center gap-1.5"><Star size={12} />{repo.stars.toLocaleString()}</span>
          <span className="flex items-center gap-1.5"><GitFork size={12} />{repo.forks}</span>
          <span className="flex items-center gap-1.5"><Eye size={12} />{repo.watchers}</span>
          <span className="flex items-center gap-1.5"><GitBranch size={12} />{repo.defaultBranch}</span>
          <span className="flex items-center gap-1.5"><GitPullRequest size={12} />{repo.openPRs} open PRs</span>
          <span className={`flex items-center gap-1.5 ${ci.cls}`}>
            {ci.icon} CI {ci.label}
          </span>
          <span className="flex items-center gap-1.5 ml-auto text-gray-400">
            Updated {repo.lastCommit}
          </span>
        </div>

        {/* Last commit */}
        <div className="mt-3 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-600 font-mono truncate">
          <span className="text-gray-400 mr-2">last commit</span>
          {repo.lastCommitMessage}
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          icon={<Activity size={13} />}
          label="Issues"
          value={repo.openIssues}
          sub="open"
        />
        <MetricCard
          icon={<ShieldAlert size={13} />}
          label="Vulnerabilities"
          value={repo.vulnerabilities}
          sub={repo.vulnerabilities === 0 ? 'all clear' : 'needs attention'}
        />
        <MetricCard
          icon={<Package size={13} />}
          label="Dependencies"
          value={repo.dependencies}
          sub={`${Math.round(repo.sizeKb / 1024 * 10) / 10} MB repo size`}
        />
        <MetricCard
          icon={<Users size={13} />}
          label="Contributors"
          value={repo.contributors}
          sub={repo.coveragePercent > 0 ? `${repo.coveragePercent}% coverage` : 'no coverage data'}
        />
      </div>

      {/* Run Agent Task */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">Run Agent Task</h2>
            <p className="text-xs text-gray-500 mt-0.5">Select an AI-powered task to run on this repository</p>
          </div>
          {isAgentRunning && (
            <span className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Agent running
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {agentTasks.map((task) => {
            const Icon = taskIcon[task.type];
            return (
              <button
                key={task.id}
                onClick={() => onRunTask(task)}
                disabled={isAgentRunning}
                title={task.description}
                className="flex flex-col items-start gap-2 p-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed group text-left"
              >
                <div className="p-1.5 rounded-md bg-gray-100 text-gray-700 group-hover:bg-gray-200 transition-colors">
                  <Icon size={15} />
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-800">{task.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{task.estimatedTime}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
