import {
  GitPullRequest,
  Code2,
  PackageOpen,
  Network,
  TestTube2,
  ShieldCheck,
  MessageSquareCode,
} from 'lucide-react';
import type { AgentTaskType } from '../../types';
import type { LucideIcon } from 'lucide-react';

export const taskIcon: Record<AgentTaskType, LucideIcon> = {
  'create-pr': GitPullRequest,
  'refactor': Code2,
  'upgrade-deps': PackageOpen,
  'view-deps': Network,
  'run-tests': TestTube2,
  'security-scan': ShieldCheck,
  'code-review': MessageSquareCode,
};
