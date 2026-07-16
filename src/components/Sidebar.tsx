import { Tab, UserStats } from '../types';
import { 
  Trophy, 
  Award, 
  Music, 
  Volume2, 
  VolumeX, 
  Settings, 
  ClipboardList,
  Flame
} from 'lucide-react';

interface SidebarProps {
  currentTab: Tab;
  stats: UserStats;
  musicOn: boolean;
  setMusicOn: (on: boolean) => void;
  sfxOn: boolean;
  setSfxOn: (on: boolean) => void;
  onViewQuestLog: () => void;
  onViewSettings: () => void;
}

export default function Sidebar({
  stats,
  musicOn,
  setMusicOn,
  sfxOn,
  setSfxOn,
  onViewQuestLog,
  onViewSettings
}: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col h-[calc(100vh-64px)] w-64 fixed left-0 top-16 bg-surface-container-low border-r border-outline-variant/20 py-6 z-30 select-none">
      {/* Profile info card */}
      <div className="px-6 mb-6">
        <div className="bg-surface-container-highest/50 rounded-2xl p-4 border border-outline-variant/10 shadow-sm">
          <h3 className="font-sans font-bold text-primary text-base mb-0.5">{stats.name}</h3>
          <p className="text-xs text-on-surface-variant">Level {stats.level} • 450 / 600 XP</p>
          <div className="w-full h-2 bg-outline-variant/30 rounded-full mt-3 overflow-hidden">
            <div className="h-full progress-gradient w-[75%] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="px-6 mb-4">
        <button 
          id="btn-quest-log"
          onClick={onViewQuestLog}
          className="w-full py-2.5 px-4 bg-primary text-on-primary rounded-xl font-semibold text-xs transition-all duration-200 shadow-md hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          <ClipboardList className="w-4 h-4" />
          View Quest Log
        </button>
      </div>

      {/* Navigation list */}
      <nav className="flex-grow px-2 space-y-1">
        <button 
          className="w-full text-on-surface-variant hover:bg-surface-container-high px-4 py-3 flex items-center gap-3 rounded-xl transition-all text-left font-semibold text-sm cursor-pointer"
          onClick={() => {
            const el = document.getElementById('leaderboard-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <Trophy className="w-5 h-5 text-secondary" />
          <span>Leaderboard</span>
        </button>

        <button 
          className="w-full text-on-surface-variant hover:bg-surface-container-high px-4 py-3 flex items-center gap-3 rounded-xl transition-all text-left font-semibold text-sm cursor-pointer"
          onClick={() => {
            const el = document.getElementById('achievements-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <Award className="w-5 h-5 text-tertiary" />
          <span>Achievements</span>
        </button>

        {/* Music toggle */}
        <button 
          id="music-toggle"
          onClick={() => setMusicOn(!musicOn)}
          className={`w-full px-4 py-3 flex items-center justify-between rounded-xl transition-all text-left font-semibold text-sm cursor-pointer ${
            musicOn 
              ? 'bg-secondary-container/20 text-on-secondary-container' 
              : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          <div className="flex items-center gap-3">
            <Music className="w-5 h-5 text-secondary" />
            <span>Music</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/5">
            {musicOn ? 'ON' : 'OFF'}
          </span>
        </button>

        {/* SFX toggle */}
        <button 
          id="sfx-toggle"
          onClick={() => setSfxOn(!sfxOn)}
          className={`w-full px-4 py-3 flex items-center justify-between rounded-xl transition-all text-left font-semibold text-sm cursor-pointer ${
            sfxOn 
              ? 'bg-primary-container/10 text-primary' 
              : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          <div className="flex items-center gap-3">
            {sfxOn ? <Volume2 className="w-5 h-5 text-secondary" /> : <VolumeX className="w-5 h-5 text-outline" />}
            <span>Sound Effects</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/5">
            {sfxOn ? 'ON' : 'OFF'}
          </span>
        </button>

        {/* Settings modal button */}
        <button 
          onClick={onViewSettings}
          className="w-full text-on-surface-variant hover:bg-surface-container-high px-4 py-3 flex items-center gap-3 rounded-xl transition-all text-left font-semibold text-sm cursor-pointer"
        >
          <Settings className="w-5 h-5 text-outline" />
          <span>Settings</span>
        </button>
      </nav>

      {/* Daily Progress Widget */}
      <div className="px-6 py-4 border-t border-outline-variant/20 mt-auto bg-surface-container-low/50">
        <p className="text-[10px] font-bold uppercase tracking-wider text-outline mb-1.5 flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 fill-gold-accent text-gold-accent" />
          Daily Word Warrior
        </p>
        <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
          <div className="h-full bg-gold-accent w-3/4 rounded-full"></div>
        </div>
        <p className="text-[10px] text-on-surface-variant mt-1.5 text-right font-semibold">75% to Daily Goal</p>
      </div>
    </aside>
  );
}
