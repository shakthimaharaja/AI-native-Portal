import type { AgentTaskType, LogLevel } from '../types';

interface RawLog {
  level: LogLevel;
  message: string;
  delayMs: number;
}

export const logSequences: Record<AgentTaskType, (repoName: string) => RawLog[]> = {
  'security-scan': (repoName) => [
    { level: 'info',    message: `Initializing security scanner for ${repoName}...`, delayMs: 400 },
    { level: 'info',    message: 'Cloning repository at HEAD (shallow)...', delayMs: 900 },
    { level: 'info',    message: 'Running OWASP dependency-check audit...', delayMs: 1500 },
    { level: 'warn',    message: 'lodash@4.17.20 → CVE-2021-23337 (High, CVSS 7.2)', delayMs: 2200 },
    { level: 'warn',    message: 'minimist@1.2.5 → CVE-2021-44906 (Critical, CVSS 9.8)', delayMs: 2800 },
    { level: 'info',    message: 'Running SAST analysis across 247 source files...', delayMs: 3600 },
    { level: 'warn',    message: 'Potential XSS — innerHTML assignment in src/utils/render.ts:45', delayMs: 4500 },
    { level: 'info',    message: 'Scanning for exposed secrets and credentials...', delayMs: 5200 },
    { level: 'error',   message: 'Exposed API key detected in .env.example (line 12)', delayMs: 6000 },
    { level: 'info',    message: 'Checking CORS and CSP header configuration...', delayMs: 6800 },
    { level: 'info',    message: 'Generating SARIF report...', delayMs: 7500 },
    { level: 'success', message: 'Scan complete — 2 Critical · 3 High · 7 Medium · 4 Low', delayMs: 8200 },
  ],

  'run-tests': (repoName) => [
    { level: 'info',    message: `Preparing test environment for ${repoName}...`, delayMs: 400 },
    { level: 'info',    message: 'Installing test dependencies (cached)...', delayMs: 900 },
    { level: 'info',    message: 'Running unit tests (312 suites)...', delayMs: 1600 },
    { level: 'info',    message: '[PASS] src/components/__tests__/Button.test.tsx (14 tests)', delayMs: 2400 },
    { level: 'info',    message: '[PASS] src/hooks/__tests__/useAuth.test.ts (9 tests)', delayMs: 3100 },
    { level: 'warn',    message: '[FLAKY] src/utils/__tests__/debounce.test.ts — intermittent timeout (500ms)', delayMs: 3900 },
    { level: 'info',    message: 'Running integration tests (48 suites)...', delayMs: 4700 },
    { level: 'error',   message: '[FAIL] src/api/__tests__/auth.integration.ts — 401 Unexpected (2 tests)', delayMs: 5600 },
    { level: 'info',    message: 'Generating coverage report...', delayMs: 6400 },
    { level: 'warn',    message: 'Coverage dropped 2.1% → 75.9% (threshold: 80%)', delayMs: 7100 },
    { level: 'success', message: 'Tests complete — 356 passed · 2 failed · 1 flaky · coverage 75.9%', delayMs: 7900 },
  ],

  'create-pr': (repoName) => [
    { level: 'info',    message: `Analyzing diff on branch feat/dark-mode in ${repoName}...`, delayMs: 400 },
    { level: 'info',    message: 'Summarizing 18 changed files (+847 / -312 lines)...', delayMs: 1100 },
    { level: 'info',    message: 'Generating PR title from commit messages...', delayMs: 1900 },
    { level: 'info',    message: 'Drafting PR body with context and testing notes...', delayMs: 2800 },
    { level: 'info',    message: 'Detecting relevant reviewers from CODEOWNERS...', delayMs: 3600 },
    { level: 'info',    message: 'Applying labels: enhancement, needs-review...', delayMs: 4300 },
    { level: 'info',    message: 'Linking related issues: #142, #167...', delayMs: 5000 },
    { level: 'success', message: 'PR #214 created → "feat: dark mode toggle and theme persistence"', delayMs: 5700 },
  ],

  'refactor': (repoName) => [
    { level: 'info',    message: `Loading AST for ${repoName} (TypeScript parser)...`, delayMs: 400 },
    { level: 'info',    message: 'Running complexity analysis across 124 modules...', delayMs: 1200 },
    { level: 'warn',    message: 'Cyclomatic complexity > 15 — src/services/authService.ts:refeshTokens()', delayMs: 2000 },
    { level: 'warn',    message: 'Duplicate logic detected in src/utils/format.ts and src/helpers/string.ts', delayMs: 2900 },
    { level: 'info',    message: 'Extracting shared formatCurrency() into src/utils/currency.ts...', delayMs: 3700 },
    { level: 'info',    message: 'Splitting authService.ts into auth/ module (3 files)...', delayMs: 4600 },
    { level: 'info',    message: 'Removing 47 lines of dead code...', delayMs: 5400 },
    { level: 'info',    message: 'Updating 23 import references...', delayMs: 6100 },
    { level: 'success', message: 'Refactor complete — 3 files restructured · avg complexity reduced 34%', delayMs: 6900 },
  ],

  'upgrade-deps': (repoName) => [
    { level: 'info',    message: `Fetching latest versions for ${repoName} dependencies...`, delayMs: 400 },
    { level: 'info',    message: 'Analyzing 94 packages (62 direct, 32 transitive)...', delayMs: 1100 },
    { level: 'warn',    message: 'react 18.2 → 19.0 — BREAKING: legacy context API removed', delayMs: 1900 },
    { level: 'info',    message: 'Skipping react (major bump) — flagging for manual review', delayMs: 2600 },
    { level: 'info',    message: 'Applying 12 safe minor/patch upgrades...', delayMs: 3400 },
    { level: 'info',    message: 'axios 1.4 → 1.7.2 ✓', delayMs: 4100 },
    { level: 'info',    message: 'zod 3.21 → 3.23.4 ✓', delayMs: 4700 },
    { level: 'info',    message: 'Running tests to validate upgrades...', delayMs: 5500 },
    { level: 'success', message: 'Upgraded 12 packages · 1 skipped (major) · 0 regressions', delayMs: 6300 },
  ],

  'view-deps': (repoName) => [
    { level: 'info',    message: `Resolving dependency graph for ${repoName}...`, delayMs: 400 },
    { level: 'info',    message: 'Parsing package.json and lock file...', delayMs: 900 },
    { level: 'info',    message: 'Building dependency tree (94 packages, depth 8)...', delayMs: 1600 },
    { level: 'warn',    message: 'Circular dependency: src/api/client ↔ src/store/authSlice', delayMs: 2400 },
    { level: 'info',    message: 'Scanning for unused dependencies...', delayMs: 3100 },
    { level: 'warn',    message: 'Unused package detected: moment (3.4 MB) — consider dayjs', delayMs: 3900 },
    { level: 'warn',    message: 'Unused package detected: lodash (fully bundled, 70 KB gzipped)', delayMs: 4600 },
    { level: 'info',    message: 'Generating dependency report with size analysis...', delayMs: 5300 },
    { level: 'success', message: 'Analysis complete — 94 total · 2 unused · 1 circular · bundle +74KB risk', delayMs: 6000 },
  ],

  'code-review': (repoName) => [
    { level: 'info',    message: `Fetching last 5 commits on main in ${repoName}...`, delayMs: 400 },
    { level: 'info',    message: 'Parsing 34 changed files (+1,204 / -489 lines)...', delayMs: 1100 },
    { level: 'info',    message: 'Checking for logic errors and null dereferences...', delayMs: 1900 },
    { level: 'warn',    message: 'Possible null deref — user?.profile.avatar.url (line 87, UserCard.tsx)', delayMs: 2700 },
    { level: 'info',    message: 'Reviewing error handling patterns...', delayMs: 3400 },
    { level: 'warn',    message: 'Unhandled promise rejection in fetchDashboard() — add try/catch', delayMs: 4200 },
    { level: 'info',    message: 'Checking naming conventions and code style...', delayMs: 4900 },
    { level: 'info',    message: 'Verifying test coverage for new code paths...', delayMs: 5600 },
    { level: 'warn',    message: '3 new functions have no corresponding test coverage', delayMs: 6300 },
    { level: 'success', message: 'Review complete — 2 warnings · 1 suggestion · 0 blocking issues', delayMs: 7100 },
  ],
};
