import { useState } from 'react';
import { Header } from './components/Layout/Header';
import { RepositoryList } from './components/RepositoryList/RepositoryList';
import { RepositoryOverview } from './components/RepositoryOverview/RepositoryOverview';
import { AgentExecutionPanel } from './components/AgentExecution/AgentExecutionPanel';
import { TaskDetailsModal } from './components/AgentExecution/TaskDetailsModal';
import { useAgentExecution } from './hooks/useAgentExecution';
import type { Repository } from './types';
import { GitBranch } from 'lucide-react';

export default function App() {
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const { execution, isDetailsOpen, startExecution, retryExecution, openDetails, closeDetails } =
    useAgentExecution();

  const isAgentRunning =
    execution?.status === 'running' || execution?.status === 'pending';

  return (
    <div className="h-screen flex flex-col bg-white text-gray-900 overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar: repository list */}
        <RepositoryList selectedRepo={selectedRepo} onSelect={setSelectedRepo} />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {selectedRepo ? (
            <div className="p-6 space-y-5 max-w-5xl">
              <RepositoryOverview
                repo={selectedRepo}
                onRunTask={(task) => startExecution(selectedRepo, task)}
                isAgentRunning={isAgentRunning}
              />
              <section>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Agent Execution
                </h2>
                <AgentExecutionPanel
                  execution={execution}
                  onRetry={retryExecution}
                  onOpenDetails={openDetails}
                />
              </section>
            </div>
          ) : (
            <EmptyState />
          )}
        </main>
      </div>

      {/* Details modal */}
      {isDetailsOpen && execution && (
        <TaskDetailsModal execution={execution} onClose={closeDetails} />
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-8">
      <div className="p-5 rounded-2xl bg-gray-100 border border-gray-200">
        <GitBranch size={36} className="text-gray-400" />
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-500 mb-1">No repository selected</h2>
        <p className="text-sm text-gray-400 max-w-xs">
          Pick a repository from the sidebar to view insights and trigger AI agent tasks.
        </p>
      </div>
    </div>
  );
}
