import { useEffect, useRef } from 'react';
import type { LogEntry } from '../../types';

const levelStyle: Record<string, string> = {
  info: 'text-gray-700',
  debug: 'text-gray-400',
  warn: 'text-amber-600',
  error: 'text-red-600',
  success: 'text-emerald-600',
};

const levelLabel: Record<string, string> = {
  info: 'INFO ',
  debug: 'DEBUG',
  warn: 'WARN ',
  error: 'ERROR',
  success: ' OK  ',
};

interface LogStreamProps {
  logs: LogEntry[];
  isStreaming: boolean;
}

export function LogStream({ logs, isStreaming }: LogStreamProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs.length]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Terminal header bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-50 border-b border-gray-200">
        <span className="w-3 h-3 rounded-full bg-red-400/70" />
        <span className="w-3 h-3 rounded-full bg-amber-400/70" />
        <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
        <span className="ml-3 text-xs text-gray-400 font-mono">agent output</span>
        {isStreaming && (
          <span className="ml-auto flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-ping" />
            streaming
          </span>
        )}
      </div>

      {/* Log entries */}
      <div className="h-64 overflow-y-auto p-4 font-mono text-xs space-y-1 scroll-smooth">
        {logs.length === 0 ? (
          <div className="text-gray-400 select-none">
            <span className="text-gray-300">$</span> Waiting for agent output...
            <span className="animate-pulse">_</span>
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex items-start gap-3 leading-relaxed">
              <span className="text-gray-300 shrink-0 tabular-nums">{log.timestamp}</span>
              <span className={`shrink-0 font-semibold ${levelStyle[log.level]}`}>
                [{levelLabel[log.level]}]
              </span>
              <span className={`${levelStyle[log.level]} break-all`}>{log.message}</span>
            </div>
          ))
        )}
        {isStreaming && logs.length > 0 && (
          <div className="text-gray-300">
            <span className="animate-pulse">█</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
