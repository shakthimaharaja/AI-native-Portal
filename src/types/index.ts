export interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  openPRs: number;
  lastCommit: string;
  lastCommitMessage: string;
  defaultBranch: string;
  visibility: 'public' | 'private';
  healthScore: number;
  tags: string[];
  owner: string;
  sizeKb: number;
  contributors: number;
  coveragePercent: number;
  dependencies: number;
  vulnerabilities: number;
  ciStatus: 'passing' | 'failing' | 'pending' | 'unknown';
  createdAt: string;
  updatedAt: string;
}

export type AgentTaskType =
  | 'create-pr'
  | 'refactor'
  | 'upgrade-deps'
  | 'view-deps'
  | 'run-tests'
  | 'security-scan'
  | 'code-review';

export interface AgentTask {
  id: string;
  type: AgentTaskType;
  label: string;
  description: string;
  estimatedTime: string;
}

export type LogLevel = 'info' | 'warn' | 'error' | 'success' | 'debug';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  message: string;
}

export type AgentStatus = 'idle' | 'pending' | 'running' | 'success' | 'failure';

export interface AgentExecution {
  id: string;
  taskType: AgentTaskType;
  taskLabel: string;
  repoName: string;
  status: AgentStatus;
  logs: LogEntry[];
  startedAt: string;
  completedAt?: string;
  summary?: string;
}

export type FilterLanguage = 'All' | 'TypeScript' | 'Python' | 'Go' | 'JavaScript' | 'Kotlin' | 'HCL';
export type FilterVisibility = 'All' | 'public' | 'private';
export type FilterCIStatus = 'All' | 'passing' | 'failing' | 'pending';
