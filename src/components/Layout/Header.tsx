import { Bot, ExternalLink, Bell, Settings } from 'lucide-react';

export function Header() {
  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
      {/* Left: Logo + title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30">
          <Bot size={18} className="text-blue-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-slate-100">Agentic</span>
          <span className="text-sm font-bold text-blue-400">Dev Portal</span>
        </div>
        <span className="hidden sm:inline text-xs text-slate-600 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700 ml-1">
          beta
        </span>
      </div>

      {/* Right: Nav icons */}
      <div className="flex items-center gap-1">
        <button className="p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">
          <Bell size={16} />
        </button>
        <button className="p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">
          <Settings size={16} />
        </button>
        <button className="p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">
          <ExternalLink size={16} />
        </button>
        <div className="ml-2 w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
          A
        </div>
      </div>
    </header>
  );
}
