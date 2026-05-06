import {
  X,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  GitBranch,
  Terminal,
} from "lucide-react";
import type { AgentExecution } from "../../types";
import { StatusBadge } from "./StatusBadge";
import { taskIcon } from "./taskIcon";
import { LogStream } from "./LogStream";

interface TaskDetailsModalProps {
  execution: AgentExecution;
  onClose: () => void;
}

export function TaskDetailsModal({
  execution,
  onClose,
}: TaskDetailsModalProps) {
  const Icon = taskIcon[execution.taskType];
  const duration =
    execution.completedAt && execution.startedAt
      ? Math.round(
          (new Date(execution.completedAt).getTime() -
            new Date(execution.startedAt).getTime()) /
            1000,
        )
      : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-100 text-gray-700">
              <Icon size={18} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                {execution.taskLabel}
              </h2>
              <p className="text-xs text-gray-400">on {execution.repoName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={execution.status} />
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-3">
              <GitBranch size={14} className="text-gray-400" />
              <div>
                <div className="text-xs text-gray-400">Repository</div>
                <div className="text-xs font-medium text-gray-700">
                  {execution.repoName}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-3">
              <Clock size={14} className="text-gray-400" />
              <div>
                <div className="text-xs text-gray-400">Duration</div>
                <div className="text-xs font-medium text-gray-700">
                  {duration !== null ? `${duration}s` : "—"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-3">
              <Terminal size={14} className="text-gray-400" />
              <div>
                <div className="text-xs text-gray-400">Log entries</div>
                <div className="text-xs font-medium text-gray-700">
                  {execution.logs.length}
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          {execution.status !== "running" &&
            execution.status !== "pending" &&
            execution.logs.length > 0 && (
              <div
                className={`flex items-start gap-2 p-3 rounded-lg border ${
                  execution.status === "success"
                    ? "bg-emerald-500/5 border-emerald-500/20"
                    : "bg-red-500/5 border-red-500/20"
                }`}
              >
                {execution.status === "success" ? (
                  <CheckCircle2
                    size={15}
                    className="text-emerald-400 mt-0.5 shrink-0"
                  />
                ) : (
                  <XCircle size={15} className="text-red-400 mt-0.5 shrink-0" />
                )}
                <div>
                  <div className="text-xs font-medium text-gray-800 mb-0.5">
                    Summary
                  </div>
                  <div className="text-xs text-gray-600">
                    {execution.logs[execution.logs.length - 1]?.message}
                  </div>
                </div>
              </div>
            )}

          {/* Full log */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText size={13} className="text-gray-400" />
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Log
              </span>
            </div>
            <LogStream logs={execution.logs} isStreaming={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
