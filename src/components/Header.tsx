import React, { useState } from 'react';
import { Tab, UserStats } from '../types';
import { Coins, Flame, Globe, Sparkles, LogOut, User, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentTab: Tab;
  setCurrentTab: (tab: Tab) => void;
  stats: UserStats;
  onLanguageToggle: () => void;
  lang: 'en' | 'kn';
  onChangeProfile: () => void;
  profileImage: string;
  onLogout: () => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  stats,
  onLanguageToggle,
  lang,
  onChangeProfile,
  profileImage,
  onLogout
}: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navItems: { label: string; value: Tab }[] = [
    { label: 'Home', value: 'home' },
    { label: 'Quiz', value: 'quiz' },
    { label: 'Games Hub', value: 'games' },
    { label: 'Stories', value: 'stories' },
    { label: 'Learning', value: 'learning' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-10 h-16 bg-white/70 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm">
      <div className="flex items-center gap-8">
        <h1 
          className="font-serif text-2xl lg:text-3xl text-primary font-bold cursor-pointer select-none"
          onClick={() => setCurrentTab('home')}
          id="app-title"
        >
          Bible Quest
        </h1>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = currentTab === item.value;
            return (
              <button
                key={item.value}
                id={`nav-${item.value}`}
                onClick={() => setCurrentTab(item.value)}
                className={`text-sm font-semibold transition-all relative py-1 cursor-pointer hover:text-secondary ${
                  isActive 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-on-surface-variant'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* User Stats badges */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Coins badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high/50 text-xs font-semibold text-on-surface-variant transition-all hover:bg-surface-container-highest">
            <Coins className="w-4 h-4 text-secondary fill-secondary" />
            <span id="header-coins">{stats.coins.toLocaleString()}</span>
          </div>

          {/* Streak badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-error-container/20 text-xs font-semibold text-error transition-all hover:bg-error-container/30">
            <Flame className="w-4 h-4 fill-error text-error" />
            <span id="header-streak">{stats.streak} Day Streak</span>
          </div>

          {/* XP badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-xs font-semibold text-primary transition-all hover:bg-primary/20">
            <Sparkles className="w-4 h-4 text-primary fill-primary" />
            <span id="header-xp">{stats.xp} XP</span>
          </div>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2">
          <button 
            id="language-toggle"
            onClick={onLanguageToggle}
            className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant cursor-pointer flex items-center justify-center"
            title="Change Language (English / Kannada)"
          >
            <Globe className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase ml-1 hidden xs:inline">
              {lang === 'en' ? 'EN' : 'KN'}
            </span>
          </button>

          {/* User Profile Avatar with profile image and dropdown */}
          <div className="relative">
            <button 
              id="profile-avatar-trigger"
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1 w-10 h-10 rounded-full bg-primary-container justify-center text-on-primary border-2 border-white shadow-sm cursor-pointer overflow-hidden hover:scale-105 active:scale-95 transition-all"
              title="View account options"
            >
              <img 
                src={profileImage} 
                alt="Guide Persona Portrait" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>

            {showDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-outline-variant/30 p-4 z-40 text-left animate-fade-in">
                  <div className="flex items-center gap-3 pb-3 border-b border-outline-variant/10">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/20 bg-primary/5 flex-shrink-0">
                      <img 
                        src={profileImage} 
                        alt="Profile avatar" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-serif font-bold text-sm text-primary truncate" id="dropdown-username">
                        {stats.name}
                      </p>
                      <p className="text-[10px] text-outline font-bold uppercase tracking-wider">
                        Active Explorer
                      </p>
                    </div>
                  </div>

                  <div className="py-2 space-y-1">
                    <button
                      onClick={() => {
                        onChangeProfile();
                        setShowDropdown(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors cursor-pointer text-left"
                    >
                      <User className="w-4 h-4 text-outline" />
                      Toggle Guide Persona
                    </button>
                  </div>

                  <div className="pt-2 border-t border-outline-variant/10">
                    <button
                      onClick={() => {
                        onLogout();
                        setShowDropdown(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-error hover:bg-error/5 transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Switch User / Log Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
