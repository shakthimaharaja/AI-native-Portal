import { useEffect, useRef } from 'react';
import type { LogEntry } from '../../types';

const levelStyle: Record<string, string> = {
  info: 'text-slate-400',
  debug: 'text-slate-600',
  warn: 'text-amber-400',
  error: 'text-red-400',
  success: 'text-emerald-400',
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
    <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
      {/* Terminal header bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-amber-500/70" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
        <span className="ml-3 text-xs text-slate-600 font-mono">agent output</span>
        {isStreaming && (
          <span className="ml-auto flex items-center gap-1.5 text-xs text-blue-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
            streaming
          </span>
        )}
      </div>

      {/* Log entries */}
      <div className="h-64 overflow-y-auto p-4 font-mono text-xs space-y-1 scroll-smooth">
        {logs.length === 0 ? (
          <div className="text-slate-700 select-none">
            <span className="text-slate-600">$</span> Waiting for agent output...
            <span className="animate-pulse">_</span>
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex items-start gap-3 leading-relaxed">
              <span className="text-slate-700 shrink-0 tabular-nums">{log.timestamp}</span>
              <span className={`shrink-0 font-semibold ${levelStyle[log.level]}`}>
                [{levelLabel[log.level]}]
              </span>
              <span className={`${levelStyle[log.level]} break-all`}>{log.message}</span>
            </div>
          ))
        )}
        {isStreaming && logs.length > 0 && (
          <div className="text-slate-600">
            <span className="animate-pulse">█</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
