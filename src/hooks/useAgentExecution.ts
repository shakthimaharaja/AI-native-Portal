import { useState, useCallback, useRef } from 'react';
import type { AgentExecution, AgentTask, Repository } from '../types';
import { logSequences } from '../data/mockLogs';

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function formatTimestamp(): string {
  return new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function useAgentExecution() {
  const [execution, setExecution] = useState<AgentExecution | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimeouts = useCallback(() => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  }, []);

  const startExecution = useCallback(
    (repo: Repository, task: AgentTask) => {
      clearTimeouts();

      const execId = generateId();
      const startedAt = new Date().toISOString();

      const newExecution: AgentExecution = {
        id: execId,
        taskType: task.type,
        taskLabel: task.label,
        repoName: repo.name,
        status: 'pending',
        logs: [],
        startedAt,
      };

      setExecution(newExecution);

      // After short delay, move to running
      const runningTimeout = setTimeout(() => {
        setExecution((prev) => (prev?.id === execId ? { ...prev, status: 'running' } : prev));

        const rawLogs = logSequences[task.type](repo.name);

        rawLogs.forEach((rawLog, index) => {
          const t = setTimeout(() => {
            const isLast = index === rawLogs.length - 1;
            const finalStatus = rawLog.level === 'error' ? 'failure' : isLast ? 'success' : 'running';

            setExecution((prev) => {
              if (!prev || prev.id !== execId) return prev;
              return {
                ...prev,
                status: isLast ? (rawLog.level === 'error' ? 'failure' : 'success') : 'running',
                completedAt: isLast ? new Date().toISOString() : prev.completedAt,
                logs: [
                  ...prev.logs,
                  {
                    id: generateId(),
                    timestamp: formatTimestamp(),
                    level: rawLog.level,
                    message: rawLog.message,
                  },
                ],
              };
              void finalStatus;
            });
          }, rawLog.delayMs);
          timeoutRefs.current.push(t);
        });
      }, 600);

      timeoutRefs.current.push(runningTimeout);
    },
    [clearTimeouts]
  );

  const retryExecution = useCallback(() => {
    if (!execution) return;
    clearTimeouts();

    const execId = generateId();
    setExecution((prev) =>
      prev
        ? { ...prev, id: execId, status: 'pending', logs: [], startedAt: new Date().toISOString(), completedAt: undefined }
        : prev
    );

    const runningTimeout = setTimeout(() => {
      setExecution((prev) => (prev?.id === execId ? { ...prev, status: 'running' } : prev));

      const rawLogs = logSequences[execution.taskType](execution.repoName);

      rawLogs.forEach((rawLog, index) => {
        const t = setTimeout(() => {
          const isLast = index === rawLogs.length - 1;
          setExecution((prev) => {
            if (!prev || prev.id !== execId) return prev;
            return {
              ...prev,
              status: isLast ? (rawLog.level === 'error' ? 'failure' : 'success') : 'running',
              completedAt: isLast ? new Date().toISOString() : prev.completedAt,
              logs: [
                ...prev.logs,
                {
                  id: generateId(),
                  timestamp: formatTimestamp(),
                  level: rawLog.level,
                  message: rawLog.message,
                },
              ],
            };
          });
        }, rawLog.delayMs);
        timeoutRefs.current.push(t);
      });
    }, 600);

    timeoutRefs.current.push(runningTimeout);
  }, [execution, clearTimeouts]);

  return {
    execution,
    isDetailsOpen,
    startExecution,
    retryExecution,
    openDetails: () => setIsDetailsOpen(true),
    closeDetails: () => setIsDetailsOpen(false),
  };
}
