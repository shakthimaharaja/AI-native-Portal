import { X, Clock, CheckCircle2, XCircle, FileText, GitBranch, Terminal } from 'lucide-react';
import type { AgentExecution } from '../../types';
import { StatusBadge } from './StatusBadge';
import { taskIcon } from './taskIcon';
import { LogStream } from './LogStream';

interface TaskDetailsModalProps {
  execution: AgentExecution;
  onClose: () => void;
}

export function TaskDetailsModal({ execution, onClose }: TaskDetailsModalProps) {
  const Icon = taskIcon[execution.taskType];
  const duration =
    execution.completedAt && execution.startedAt
      ? Math.round(
          (new Date(execution.completedAt).getTime() - new Date(execution.startedAt).getTime()) / 1000
        )
      : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-slate-950 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Icon size={18} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-100">{execution.taskLabel}</h2>
              <p className="text-xs text-slate-500">on {execution.repoName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={execution.status} />
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded-md hover:bg-slate-800"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2 bg-slate-800/60 rounded-lg p-3">
              <GitBranch size={14} className="text-slate-500" />
              <div>
                <div className="text-xs text-slate-600">Repository</div>
                <div className="text-xs font-medium text-slate-300">{execution.repoName}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/60 rounded-lg p-3">
              <Clock size={14} className="text-slate-500" />
              <div>
                <div className="text-xs text-slate-600">Duration</div>
                <div className="text-xs font-medium text-slate-300">
                  {duration !== null ? `${duration}s` : '—'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/60 rounded-lg p-3">
              <Terminal size={14} className="text-slate-500" />
              <div>
                <div className="text-xs text-slate-600">Log entries</div>
                <div className="text-xs font-medium text-slate-300">{execution.logs.length}</div>
              </div>
            </div>
          </div>

          {/* Summary */}
          {execution.status !== 'running' && execution.status !== 'pending' && execution.logs.length > 0 && (
            <div
              className={`flex items-start gap-2 p-3 rounded-lg border ${
                execution.status === 'success'
                  ? 'bg-emerald-500/5 border-emerald-500/20'
                  : 'bg-red-500/5 border-red-500/20'
              }`}
            >
              {execution.status === 'success' ? (
                <CheckCircle2 size={15} className="text-emerald-400 mt-0.5 shrink-0" />
              ) : (
                <XCircle size={15} className="text-red-400 mt-0.5 shrink-0" />
              )}
              <div>
                <div className="text-xs font-medium text-slate-300 mb-0.5">Summary</div>
                <div className="text-xs text-slate-400">
                  {execution.logs[execution.logs.length - 1]?.message}
                </div>
              </div>
            </div>
          )}

          {/* Full log */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText size={13} className="text-slate-500" />
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Full Log</span>
            </div>
            <LogStream logs={execution.logs} isStreaming={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
