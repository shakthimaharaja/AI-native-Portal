import { Bot, ExternalLink, Bell, Settings } from "lucide-react";

export function Header() {
  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-6 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
      {/* Left: Logo + title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 border border-gray-300">
          <Bot size={18} className="text-gray-900" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-gray-900">Agentic</span>
          <span className="text-sm font-bold text-gray-500">Dev Portal</span>
        </div>
        <span className="hidden sm:inline text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200 ml-1">
          beta
        </span>
      </div>

      {/* Right: Nav icons */}
      <div className="flex items-center gap-1">
        <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={16} />
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings size={16} />
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
          <ExternalLink size={16} />
        </button>
        <div className="ml-2 w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center text-xs font-bold text-white">
          A
        </div>
      </div>
    </header>
  );
}
