import { RefreshCw, Info, Slash } from "lucide-react";
import type { AgentExecution } from "../../types";
import { StatusBadge } from "./StatusBadge";
import { LogStream } from "./LogStream";
import { taskIcon } from "./taskIcon";

interface AgentExecutionPanelProps {
  execution: AgentExecution | null;
  onRetry: () => void;
  onOpenDetails: () => void;
}

export function AgentExecutionPanel({
  execution,
  onRetry,
  onOpenDetails,
}: AgentExecutionPanelProps) {
  const isStreaming =
    execution?.status === "running" || execution?.status === "pending";
  const canRetry =
    execution?.status === "failure" || execution?.status === "success";

  if (!execution) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-center min-h-[200px]">
        <div className="p-3 rounded-full bg-gray-100 text-gray-400">
          <Slash size={24} />
        </div>
        <p className="text-sm text-gray-500">No agent task running.</p>
        <p className="text-xs text-gray-400">
          Select a repository and run a task above to see live output here.
        </p>
      </div>
    );
  }

  const Icon = taskIcon[execution.taskType];

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Panel header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-gray-100 text-gray-700">
            <Icon size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">
                {execution.taskLabel}
              </span>
              <span className="text-gray-400 text-xs">on</span>
              <span className="text-xs font-mono text-gray-900 font-semibold">
                {execution.repoName}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-xs text-gray-400">
                Started {new Date(execution.startedAt).toLocaleTimeString()}
              </span>
              {execution.completedAt && (
                <span className="text-xs text-gray-400">
                  · Finished{" "}
                  {new Date(execution.completedAt).toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={execution.status} />

          <button
            onClick={onOpenDetails}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Info size={13} />
            Details
          </button>

          {canRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-1.5 text-xs text-gray-900 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-1.5 rounded-lg transition-colors"
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
      {(execution.status === "success" || execution.status === "failure") &&
        execution.logs.length > 0 && (
          <div
            className={`mx-4 mb-4 px-4 py-3 rounded-lg border text-xs ${
              execution.status === "success"
                ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                : "bg-red-500/5 border-red-500/20 text-red-400"
            }`}
          >
            <span className="font-semibold mr-2">
              {execution.status === "success" ? "✓ Completed:" : "✗ Failed:"}
            </span>
            {execution.logs[execution.logs.length - 1]?.message}
          </div>
        )}
    </div>
  );
}
