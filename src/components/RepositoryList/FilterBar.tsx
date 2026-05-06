import type {
  FilterLanguage,
  FilterVisibility,
  FilterCIStatus,
} from "../../types";

const LANGUAGES: FilterLanguage[] = [
  "All",
  "TypeScript",
  "Python",
  "Go",
  "JavaScript",
  "Kotlin",
  "HCL",
];
const VISIBILITIES: FilterVisibility[] = ["All", "public", "private"];
const CI_STATUSES: FilterCIStatus[] = ["All", "passing", "failing", "pending"];

interface FilterBarProps {
  language: FilterLanguage;
  visibility: FilterVisibility;
  ciStatus: FilterCIStatus;
  onLanguageChange: (v: FilterLanguage) => void;
  onVisibilityChange: (v: FilterVisibility) => void;
  onCIStatusChange: (v: FilterCIStatus) => void;
}

function FilterSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: T[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="bg-white border border-gray-300 rounded-md px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-gray-900 cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export function FilterBar({
  language,
  visibility,
  ciStatus,
  onLanguageChange,
  onVisibilityChange,
  onCIStatusChange,
}: FilterBarProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <FilterSelect
        label="Language"
        value={language}
        options={LANGUAGES}
        onChange={onLanguageChange}
      />
      <FilterSelect
        label="Visibility"
        value={visibility}
        options={VISIBILITIES}
        onChange={onVisibilityChange}
      />
      <FilterSelect
        label="CI"
        value={ciStatus}
        options={CI_STATUSES}
        onChange={onCIStatusChange}
      />
    </div>
  );
}
