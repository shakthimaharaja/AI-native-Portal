import type { AgentTask } from '../types';

export const agentTasks: AgentTask[] = [
  {
    id: 'create-pr',
    type: 'create-pr',
    label: 'Create Pull Request',
    description: 'Analyze uncommitted changes and generate a descriptive PR with title, body, and labels.',
    estimatedTime: '~45s',
  },
  {
    id: 'refactor',
    type: 'refactor',
    label: 'Refactor Code',
    description: 'Identify code smells, dead code, and complexity hotspots, then apply targeted refactoring.',
    estimatedTime: '~2m',
  },
  {
    id: 'upgrade-deps',
    type: 'upgrade-deps',
    label: 'Upgrade Dependencies',
    description: 'Check for outdated packages, assess breaking changes, and apply safe upgrades.',
    estimatedTime: '~1m 30s',
  },
  {
    id: 'view-deps',
    type: 'view-deps',
    label: 'Analyze Dependencies',
    description: 'Build the full dependency tree, flag circular imports, and surface unused packages.',
    estimatedTime: '~30s',
  },
  {
    id: 'run-tests',
    type: 'run-tests',
    label: 'Run Tests',
    description: 'Execute the full test suite, report coverage deltas, and surface flaky tests.',
    estimatedTime: '~3m',
  },
  {
    id: 'security-scan',
    type: 'security-scan',
    label: 'Security Scan',
    description: 'Run SAST, dependency CVE lookup, and secrets detection across the codebase.',
    estimatedTime: '~1m',
  },
  {
    id: 'code-review',
    type: 'code-review',
    label: 'AI Code Review',
    description: 'Review recent commits for bugs, logic errors, and best-practice violations.',
    estimatedTime: '~1m 15s',
  },
];
