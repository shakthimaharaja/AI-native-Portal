import { useState, useMemo } from 'react';
import { SearchInput } from './SearchInput';
import { FilterBar } from './FilterBar';
import { RepositoryCard } from './RepositoryCard';
import { mockRepositories } from '../../data/mockRepos';
import type { FilterCIStatus, FilterLanguage, FilterVisibility, Repository } from '../../types';

interface RepositoryListProps {
  selectedRepo: Repository | null;
  onSelect: (repo: Repository) => void;
}

export function RepositoryList({ selectedRepo, onSelect }: RepositoryListProps) {
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState<FilterLanguage>('All');
  const [visibility, setVisibility] = useState<FilterVisibility>('All');
  const [ciStatus, setCIStatus] = useState<FilterCIStatus>('All');

  const filtered = useMemo(() => {
    return mockRepositories.filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(search.toLowerCase()) ||
        repo.description.toLowerCase().includes(search.toLowerCase()) ||
        repo.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesLang = language === 'All' || repo.language === language;
      const matchesVis = visibility === 'All' || repo.visibility === visibility;
      const matchesCI = ciStatus === 'All' || repo.ciStatus === ciStatus;
      return matchesSearch && matchesLang && matchesVis && matchesCI;
    });
  }, [search, language, visibility, ciStatus]);

  return (
    <aside className="w-80 shrink-0 flex flex-col h-full border-r border-slate-800 bg-slate-950/50">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-slate-800">
        <h2 className="text-sm font-semibold text-slate-200 mb-3">Repositories</h2>
        <SearchInput value={search} onChange={setSearch} />
        <div className="mt-3">
          <FilterBar
            language={language}
            visibility={visibility}
            ciStatus={ciStatus}
            onLanguageChange={setLanguage}
            onVisibilityChange={setVisibility}
            onCIStatusChange={setCIStatus}
          />
        </div>
        <p className="mt-2 text-xs text-slate-600">
          {filtered.length} of {mockRepositories.length} repos
        </p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-10 text-slate-600 text-sm">No repositories match your filters.</div>
        ) : (
          filtered.map((repo) => (
            <RepositoryCard
              key={repo.id}
              repo={repo}
              isSelected={selectedRepo?.id === repo.id}
              onClick={() => onSelect(repo)}
            />
          ))
        )}
      </div>
    </aside>
  );
}
