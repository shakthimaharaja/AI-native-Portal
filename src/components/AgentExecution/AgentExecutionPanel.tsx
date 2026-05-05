import { RefreshCw, Info, Slash } from 'lucide-react';
import type { AgentExecution } from '../../types';
import { StatusBadge } from './StatusBadge';
import { LogStream } from './LogStream';
import { taskIcon } from './taskIcon';

interface AgentExecutionPanelProps {
  execution: AgentExecution | null;
  onRetry: () => void;
  onOpenDetails: () => void;
}

export function AgentExecutionPanel({ execution, onRetry, onOpenDetails }: AgentExecutionPanelProps) {
  const isStreaming = execution?.status === 'running' || execution?.status === 'pending';
  const canRetry = execution?.status === 'failure' || execution?.status === 'success';

  if (!execution) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-center min-h-[200px]">
        <div className="p-3 rounded-full bg-slate-800 text-slate-600">
          <Slash size={24} />
        </div>
        <p className="text-sm text-slate-500">No agent task running.</p>
        <p className="text-xs text-slate-700">Select a repository and run a task above to see live output here.</p>
      </div>
    );
  }

  const Icon = taskIcon[execution.taskType];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      {/* Panel header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
            <Icon size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-200">{execution.taskLabel}</span>
              <span className="text-slate-600 text-xs">on</span>
              <span className="text-xs font-mono text-blue-400">{execution.repoName}</span>
            </div>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-xs text-slate-600">
                Started {new Date(execution.startedAt).toLocaleTimeString()}
              </span>
              {execution.completedAt && (
                <span className="text-xs text-slate-600">
                  · Finished {new Date(execution.completedAt).toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={execution.status} />

          <button
            onClick={onOpenDetails}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Info size={13} />
            Details
          </button>

          {canRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 px-3 py-1.5 rounded-lg transition-colors"
            >
              <RefreshCw size={13} />
              Retry
            </button>
          )}
        </div>
      </div>

      {/* Logs */}
      <div className="p-4">
        <LogStream logs={execution.logs} isStreaming={isStreaming ?? false} />
      </div>

      {/* Footer summary */}
      {(execution.status === 'success' || execution.status === 'failure') &&
        execution.logs.length > 0 && (
          <div
            className={`mx-4 mb-4 px-4 py-3 rounded-lg border text-xs ${
              execution.status === 'success'
                ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                : 'bg-red-500/5 border-red-500/20 text-red-400'
            }`}
          >
            <span className="font-semibold mr-2">
              {execution.status === 'success' ? '✓ Completed:' : '✗ Failed:'}
            </span>
            {execution.logs[execution.logs.length - 1]?.message}
          </div>
        )}
    </div>
  );
}
