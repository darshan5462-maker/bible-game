import React, { useState } from 'react';
import { Tab, UserStats, FavoriteVerse, UserProfile } from './types';
import { DEFAULT_FAVORITE_VERSES } from './data';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardTab from './components/DashboardTab';
import QuizTab from './components/QuizTab';
import GamesTab from './components/GamesTab';
import StoriesTab from './components/StoriesTab';
import LearningTab from './components/LearningTab';
import { 
  X, 
  CheckCircle2, 
  Coins, 
  Sparkles, 
  Flame, 
  Compass, 
  Music, 
  Volume2, 
  VolumeX, 
  UserPlus
} from 'lucide-react';

const SEED_PROFILES: UserProfile[] = [
  {
    id: 'young_disciple',
    username: 'young',
    pin: '1234',
    name: "John (Disciple-in-Training)",
    persona: 'young',
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_uU2yZGk7f7tEG5Z7Bb7QcayTjoMOggTYF8qzwNmHBEE1AsQBJPGBve2VsvFZ8aCBYsGzpeTWr0zZys69Cqlr1g_Tu9738HjWRKtGYoqHWcqAgnTf2dczcySzv1Rf2AgUPMq8CoE1Hemm3k1GMg_acTKEm6hamffZQd1zsOThwp2zP-fXSdkr0mSt2vPLnloDK3Iy1gdissqJgvL1RqQ95mXrtdZ0LDQeGeOufWHlVg2SfaHitg5Zsg",
    stats: {
      name: "John (Disciple-in-Training)",
      level: 12,
      xp: 1250,
      coins: 50,
      streak: 5
    },
    favorites: DEFAULT_FAVORITE_VERSES
  },
  {
    id: 'elder_disciple',
    username: 'elder',
    pin: '5678',
    name: "Disciple John (Elder Guide)",
    persona: 'elder',
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCakW2bYS6RTc5EvPdrshjMaKLL_vgVrLMB8FbdZP445b1ABkvck1_rdjBOs-bf2__A3Ve7zYr0Wib6Why9Ltz4e6TElU1Ms35mBeO1vSAXLYR0G_ffmMSpJqwiMsj5RGG8Hbnf2svoos0jltU5Psjne3oS2XIHM1EYJzFbKRxuGPkCLEp9ne_Xnr8vcPkkGMI-yWZ7r6svA8fcOQmqVb1_3pi5ipwB2SaoO-P5E07KNgrBRpm3V0WHQ",
    stats: {
      name: "Disciple John (Elder Guide)",
      level: 18,
      xp: 5340,
      coins: 1240,
      streak: 12
    },
    favorites: DEFAULT_FAVORITE_VERSES
  }
];

const PERSONA_AVATARS = {
  young: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_uU2yZGk7f7tEG5Z7Bb7QcayTjoMOggTYF8qzwNmHBEE1AsQBJPGBve2VsvFZ8aCBYsGzpeTWr0zZys69Cqlr1g_Tu9738HjWRKtGYoqHWcqAgnTf2dczcySzv1Rf2AgUPMq8CoE1Hemm3k1GMg_acTKEm6hamffZQd1zsOThwp2zP-fXSdkr0mSt2vPLnloDK3Iy1gdissqJgvL1RqQ95mXrtdZ0LDQeGeOufWHlVg2SfaHitg5Zsg",
  elder: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCakW2bYS6RTc5EvPdrshjMaKLL_vgVrLMB8FbdZP445b1ABkvck1_rdjBOs-bf2__A3Ve7zYr0Wib6Why9Ltz4e6TElU1Ms35mBeO1vSAXLYR0G_ffmMSpJqwiMsj5RGG8Hbnf2svoos0jltU5Psjne3oS2XIHM1EYJzFbKRxuGPkCLEp9ne_Xnr8vcPkkGMI-yWZ7r6svA8fcOQmqVb1_3pi5ipwB2SaoO-P5E07KNgrBRpm3V0WHQ",
  explorer: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3hbbs63ptr-IxmkWKZLeVqttRA-YZYny79vkrP6zOR7-dEnYRCZA2qAPPqnZ3V9X-svB7Z_bOoxmhArHe-bSlLytmdaWHmOEpdw7vUtDFdB4QmLanPx6snD3pW2jHjOpJdpxjfbkehlGVcE2EHgHbWgw5BDVEhbQaBbnmTp3YloPKhBPDHGq8xkCWg7GtCJW6Y6iyLOyr22U0zkjUiAx-yrkGgZygL-muIRV1K1mLS9MR5ieVr9MiAg",
  seeker: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const [lang, setLang] = useState<'en' | 'kn'>('en');
  const [musicOn, setMusicOn] = useState(true);
  const [sfxOn, setSfxOn] = useState(true);
  const [quizMode, setQuizMode] = useState<string>('level1');

  // Load registered profiles list or seed defaults
  const [users, setUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('bible_quest_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    localStorage.setItem('bible_quest_users', JSON.stringify(SEED_PROFILES));
    return SEED_PROFILES;
  });

  // Current logged in user object
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const activeId = localStorage.getItem('bible_quest_current_user_id');
    if (activeId) {
      const savedUsers = localStorage.getItem('bible_quest_users');
      if (savedUsers) {
        try {
          const parsed = JSON.parse(savedUsers) as UserProfile[];
          const found = parsed.find(u => u.id === activeId);
          if (found) return found;
        } catch (e) {}
      }
    }
    return null;
  });

  // Favorites state synced dynamically
  const [favorites, setFavoritesState] = useState<FavoriteVerse[]>(() => {
    const activeId = localStorage.getItem('bible_quest_current_user_id');
    if (activeId) {
      const savedUsers = localStorage.getItem('bible_quest_users');
      if (savedUsers) {
        try {
          const parsed = JSON.parse(savedUsers) as UserProfile[];
          const found = parsed.find(u => u.id === activeId);
          if (found) return found.favorites;
        } catch (e) {}
      }
    }
    return DEFAULT_FAVORITE_VERSES;
  });

  // Profile guide persona select state
  const [profilePersona, setProfilePersona] = useState<'young' | 'elder'>('young');

  // Stats linked to active session
  const [stats, setStatsState] = useState<UserStats>(() => {
    const activeId = localStorage.getItem('bible_quest_current_user_id');
    if (activeId) {
      const savedUsers = localStorage.getItem('bible_quest_users');
      if (savedUsers) {
        try {
          const parsed = JSON.parse(savedUsers) as UserProfile[];
          const found = parsed.find(u => u.id === activeId);
          if (found) return found.stats;
        } catch (e) {}
      }
    }
    return SEED_PROFILES[0].stats;
  });

  // Dual function state wrappers to write-through to LocalStorage registry
  const setStats = (updater: UserStats | ((prev: UserStats) => UserStats)) => {
    setStatsState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      const activeId = localStorage.getItem('bible_quest_current_user_id');
      if (activeId) {
        const savedUsers = localStorage.getItem('bible_quest_users');
        if (savedUsers) {
          try {
            const parsed = JSON.parse(savedUsers) as UserProfile[];
            const updatedUsers = parsed.map(u => u.id === activeId ? { ...u, stats: next } : u);
            localStorage.setItem('bible_quest_users', JSON.stringify(updatedUsers));
            setUsers(updatedUsers);
            setCurrentUser(prevUser => prevUser ? { ...prevUser, stats: next } : null);
          } catch (e) {}
        }
      }
      return next;
    });
  };

  const setFavorites = (updater: FavoriteVerse[] | ((prev: FavoriteVerse[]) => FavoriteVerse[])) => {
    setFavoritesState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      const activeId = localStorage.getItem('bible_quest_current_user_id');
      if (activeId) {
        const savedUsers = localStorage.getItem('bible_quest_users');
        if (savedUsers) {
          try {
            const parsed = JSON.parse(savedUsers) as UserProfile[];
            const updatedUsers = parsed.map(u => u.id === activeId ? { ...u, favorites: next } : u);
            localStorage.setItem('bible_quest_users', JSON.stringify(updatedUsers));
            setUsers(updatedUsers);
            setCurrentUser(prevUser => prevUser ? { ...prevUser, favorites: next } : null);
          } catch (e) {}
        }
      }
      return next;
    });
  };

  // Auth screen specific state
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [pinInput, setPinInput] = useState('');
  const [error, setError] = useState('');

  // Register state
  const [regUsername, setRegUsername] = useState('');
  const [regName, setRegName] = useState('');
  const [regPin, setRegPin] = useState('');
  const [regPersona, setRegPersona] = useState<'young' | 'elder' | 'explorer' | 'seeker'>('young');

  // Quest Log and Settings Modals
  const [showQuestLog, setShowQuestLog] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [newName, setNewName] = useState('');

  const handleChangeProfile = () => {
    if (profilePersona === 'young') {
      setProfilePersona('elder');
    } else {
      setProfilePersona('young');
    }
  };

  // Avatar lookup
  const profileImage = profilePersona === 'young' 
    ? PERSONA_AVATARS.young
    : PERSONA_AVATARS.elder;

  const handleStartMiraclesQuest = () => {
    setQuizMode('level4'); // level4 corresponds to Miracles
    setCurrentTab('quiz');
  };

  const handleUpdateName = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      setStats({
        ...stats,
        name: newName.trim()
      });
      setShowSettings(false);
      setNewName('');
    }
  };

  const handleLogin = () => {
    if (!selectedProfile) return;
    if (selectedProfile.pin === pinInput) {
      localStorage.setItem('bible_quest_current_user_id', selectedProfile.id);
      setCurrentUser(selectedProfile);
      setStatsState(selectedProfile.stats);
      setFavoritesState(selectedProfile.favorites);
      setProfilePersona(selectedProfile.persona === 'elder' ? 'elder' : 'young');
      setPinInput('');
      setSelectedProfile(null);
      setError('');
    } else {
      setError('Incorrect passcode PIN. Please try again.');
      setPinInput('');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regUsername || !regName || !regPin) {
      setError('Please fill in all the required registration details.');
      return;
    }
    if (regPin.length !== 4) {
      setError('PIN must be exactly 4 digits.');
      return;
    }
    const exists = users.some(u => u.username === regUsername.trim().toLowerCase());
    if (exists) {
      setError('This username handle is already taken. Please pick another one.');
      return;
    }

    // Determine starting values based on persona
    let startLvl = 1;
    let startXp = 100;
    let startCoins = 50;
    let startStreak = 1;

    if (regPersona === 'elder') {
      startLvl = 10;
      startXp = 5000;
      startCoins = 500;
      startStreak = 3;
    } else if (regPersona === 'explorer') {
      startLvl = 3;
      startXp = 1000;
      startCoins = 200;
      startStreak = 2;
    } else if (regPersona === 'seeker') {
      startLvl = 5;
      startXp = 2000;
      startCoins = 300;
      startStreak = 2;
    }

    const newProfile: UserProfile = {
      id: 'user_' + Date.now(),
      username: regUsername.trim().toLowerCase(),
      name: regName.trim(),
      pin: regPin,
      persona: regPersona,
      avatar: PERSONA_AVATARS[regPersona],
      stats: {
        name: regName.trim(),
        level: startLvl,
        xp: startXp,
        coins: startCoins,
        streak: startStreak
      },
      favorites: DEFAULT_FAVORITE_VERSES
    };

    const updatedUsers = [...users, newProfile];
    localStorage.setItem('bible_quest_users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    // Auto login
    localStorage.setItem('bible_quest_current_user_id', newProfile.id);
    setCurrentUser(newProfile);
    setStatsState(newProfile.stats);
    setFavoritesState(newProfile.favorites);
    setProfilePersona(newProfile.persona === 'elder' ? 'elder' : 'young');
    
    // Reset reg state
    setRegUsername('');
    setRegName('');
    setRegPin('');
    setRegPersona('young');
    setError('');
  };

  const handleLogout = () => {
    localStorage.removeItem('bible_quest_current_user_id');
    setCurrentUser(null);
    setSelectedProfile(null);
    setError('');
  };

  const getPersonaAvatar = (persona: 'young' | 'elder' | 'explorer' | 'seeker') => {
    return PERSONA_AVATARS[persona];
  };

  // If not logged in, block view and show authentication interface
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col items-center justify-center p-4">
        {/* Background ambient gradient */}
        <div className="fixed inset-0 bg-gradient-to-tr from-primary/10 via-secondary/5 to-transparent pointer-events-none" />
        
        <div className="w-full max-w-xl bg-white rounded-[40px] shadow-2xl border border-slate-200 overflow-hidden relative z-10 animate-fade-in">
          {/* Header */}
          <div className="bg-primary/5 px-8 py-10 border-b border-slate-100 text-center">
            <h1 className="font-serif text-4xl text-primary font-bold tracking-tight">Bible Quest</h1>
            <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">
              Begin your interactive scriptural learning adventure
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            <button 
              onClick={() => { setAuthTab('login'); setError(''); setPinInput(''); setSelectedProfile(null); }}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                authTab === 'login' 
                  ? 'border-primary text-primary bg-white' 
                  : 'border-transparent text-slate-400 hover:text-primary'
              }`}
            >
              Select Character
            </button>
            <button 
              onClick={() => { setAuthTab('register'); setError(''); setPinInput(''); }}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                authTab === 'register' 
                  ? 'border-primary text-primary bg-white' 
                  : 'border-transparent text-slate-400 hover:text-primary'
              }`}
            >
              Create Character
            </button>
          </div>

          <div className="p-8 md:p-10">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-bold flex items-center gap-2 animate-pulse">
                <span>⚠️</span>
                {error}
              </div>
            )}

            {authTab === 'login' ? (
              <div className="space-y-8">
                {selectedProfile === null ? (
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                      Who is playing today?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {users.map((user) => (
                        <button
                          key={user.id}
                          onClick={() => { setSelectedProfile(user); setError(''); setPinInput(''); }}
                          className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-150 hover:border-primary bg-white transition-all text-left cursor-pointer hover:shadow-md"
                        >
                          <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="overflow-hidden flex-1">
                            <p className="font-serif font-bold text-sm text-primary truncate">{user.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-bold px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                                Lvl {user.stats.level}
                              </span>
                              <span className="text-[10px] text-slate-400 font-semibold">
                                {user.stats.xp.toLocaleString()} XP
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="max-w-md mx-auto text-center space-y-6">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary shadow-lg mb-3">
                        <img src={selectedProfile.avatar} alt={selectedProfile.name} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-primary">{selectedProfile.name}</h3>
                      <button 
                        onClick={() => setSelectedProfile(null)}
                        className="text-xs text-slate-400 font-semibold hover:text-primary mt-1 hover:underline cursor-pointer"
                      >
                        ← Back to profile list
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col items-center">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Enter 4-Digit Access PIN
                        </label>
                        <p className="text-[10px] text-slate-400 mb-4 bg-slate-50 px-3 py-1 rounded-full">
                          Hint: John's is <span className="font-mono font-bold text-primary">1234</span>, Elder's is <span className="font-mono font-bold text-primary">5678</span>
                        </p>
                        <input
                          type="password"
                          maxLength={4}
                          value={pinInput}
                          onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                          placeholder="••••"
                          className="w-40 text-center tracking-[1em] text-2xl px-4 py-3 border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent rounded-2xl outline-none font-bold"
                          autoFocus
                        />
                      </div>

                      <button
                        onClick={handleLogin}
                        className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-lg"
                      >
                        Enter Bible Quest
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Username (Unique ID)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. joshua_explorer"
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                      className="w-full px-4 py-3 border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent rounded-xl outline-none text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Character Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Joshua the Brave"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent rounded-xl outline-none text-xs font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Set 4-Digit Access PIN
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      required
                      placeholder="••••"
                      value={regPin}
                      onChange={(e) => setRegPin(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-3 border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent rounded-xl outline-none text-xs font-bold tracking-widest text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Choose Your Persona Archetype
                    </label>
                    <select
                      value={regPersona}
                      onChange={(e) => setRegPersona(e.target.value as any)}
                      className="w-full px-4 py-3 border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent rounded-xl outline-none text-xs font-bold bg-white"
                    >
                      <option value="young">Young Disciple (Lv. 1, 50 coins)</option>
                      <option value="explorer">Ancient Explorer (Lv. 3, 200 coins)</option>
                      <option value="seeker">Faith Seeker (Lv. 5, 300 coins)</option>
                      <option value="elder">Elder Guide (Lv. 10, 500 coins)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Character Preview
                  </label>
                  <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border border-primary/20 bg-primary/5 flex-shrink-0">
                      <img src={getPersonaAvatar(regPersona)} alt="Character Preview" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-serif font-bold text-sm text-primary">
                        {regName || "Unnamed Explorer"}
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5 leading-snug">
                        {regPersona === 'young' && "Young Disciple — A passionate learner starting their quest."}
                        {regPersona === 'elder' && "Elder Guide — A seasoned scholar of the Scriptures."}
                        {regPersona === 'explorer' && "Ancient Explorer — A brave seeker searching for hidden biblical truths."}
                        {regPersona === 'seeker' && "Faith Seeker — A humble spirit reflecting on biblical wisdom."}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-lg"
                >
                  Create & Launch Quest
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans text-on-background flex flex-col pt-16">
      {/* Background audio simulation node */}
      {musicOn && (
        <div className="fixed bottom-4 right-4 z-50 bg-secondary-container/20 text-on-secondary-container backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold border border-secondary/20 shadow-lg pointer-events-none animate-pulse">
          <Music className="w-3.5 h-3.5" />
          <span>Ethereal Hymns Playing</span>
        </div>
      )}

      {/* Main Header navigation */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab}
        stats={stats}
        onLanguageToggle={() => setLang(lang === 'en' ? 'kn' : 'en')}
        lang={lang}
        onChangeProfile={handleChangeProfile}
        profileImage={profileImage}
        onLogout={handleLogout}
      />

      {/* Primary Shell Container */}
      <div className="flex flex-1 relative w-full">
        {/* Left hand dynamic Sidebar */}
        <Sidebar 
          currentTab={currentTab}
          stats={stats}
          musicOn={musicOn}
          setMusicOn={setMusicOn}
          sfxOn={sfxOn}
          setSfxOn={setSfxOn}
          onViewQuestLog={() => setShowQuestLog(true)}
          onViewSettings={() => setShowSettings(true)}
        />

        {/* Core content view board with responsiveness */}
        <main className="flex-1 w-full lg:pl-64 p-4 md:p-8 overflow-x-hidden min-h-[calc(100vh-64px)]">
          {currentTab === 'home' && (
            <DashboardTab 
              setCurrentTab={setCurrentTab}
              stats={stats}
              musicOn={musicOn}
              setMusicOn={setMusicOn}
              sfxOn={sfxOn}
              setSfxOn={setSfxOn}
              lang={lang}
              setLang={setLang}
              onStartMiraclesQuest={handleStartMiraclesQuest}
              favorites={favorites}
            />
          )}

          {currentTab === 'quiz' && (
            <QuizTab 
              stats={stats}
              setStats={setStats}
              lang={lang}
              setLang={setLang}
              quizMode={quizMode}
              setQuizMode={setQuizMode}
              setCurrentTab={setCurrentTab}
              sfxOn={sfxOn}
            />
          )}

          {currentTab === 'stories' && (
            <StoriesTab 
              stats={stats}
              setStats={setStats}
              lang={lang}
              setLang={setLang}
              setCurrentTab={setCurrentTab}
              sfxOn={sfxOn}
            />
          )}

          {currentTab === 'games' && (
            <GamesTab 
              stats={stats}
              setStats={setStats}
              lang={lang}
              setLang={setLang}
              sfxOn={sfxOn}
              setCurrentTab={setCurrentTab}
            />
          )}

          {currentTab === 'learning' && (
            <LearningTab 
              stats={stats}
              setStats={setStats}
              lang={lang}
              setLang={setLang}
              setCurrentTab={setCurrentTab}
              sfxOn={sfxOn}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          )}
        </main>
      </div>

      {/* Quest Log Modal Dialog */}
      {showQuestLog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/45 backdrop-blur-sm" 
            onClick={() => setShowQuestLog(false)}
          />
          
          <div className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl p-8 border border-outline-variant/30 text-left animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-primary flex items-center gap-2">
                  <Compass className="w-6 h-6 text-secondary fill-secondary/20" />
                  Your Active Quests
                </h2>
                <p className="text-xs text-on-surface-variant font-semibold">Track your spiritual progress and milestones.</p>
              </div>
              <button 
                onClick={() => setShowQuestLog(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container-high transition-colors flex items-center justify-center cursor-pointer border border-outline-variant/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-center gap-4">
                <CheckCircle2 className="w-5 h-5 text-primary fill-primary/15" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-on-surface">The Great Flood (Part 1/4)</p>
                  <p className="text-[10px] text-outline mt-0.5">Gather all animal pairs matching game • 150 XP bonus</p>
                </div>
              </div>

              <div className="p-4 bg-surface-container-low border border-outline-variant/10 rounded-2xl flex items-center gap-4">
                <div className="w-5 h-5 rounded-full border-2 border-outline-variant"></div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-on-surface">Daily Word Warrior</p>
                  <p className="text-[10px] text-outline mt-0.5">Log 75% progress on daily Bible reading objectives</p>
                </div>
              </div>

              <div className="p-4 bg-surface-container-low border border-outline-variant/10 rounded-2xl flex items-center gap-4">
                <div className="w-5 h-5 rounded-full border-2 border-outline-variant"></div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-on-surface">Miracles Quiz Master</p>
                  <p className="text-[10px] text-outline mt-0.5">Solve the divinity accounts in under 15 seconds</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowQuestLog(false)}
              className="w-full mt-8 py-3 bg-primary hover:bg-primary-container text-white rounded-xl font-bold text-xs transition-all cursor-pointer"
            >
              Continue Quests
            </button>
          </div>
        </div>
      )}

      {/* Settings Panel Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/45 backdrop-blur-sm" 
            onClick={() => setShowSettings(false)}
          />
          
          <div className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl p-8 border border-outline-variant/30 text-left animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-primary flex items-center gap-2">
                  Settings
                </h2>
                <p className="text-xs text-on-surface-variant font-semibold">Manage your Bible Quest preferences.</p>
              </div>
              <button 
                onClick={() => setShowSettings(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container-high transition-colors flex items-center justify-center cursor-pointer border border-outline-variant/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateName} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Character Profile Name</label>
                <input 
                  type="text"
                  placeholder={stats.name}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-3 border border-outline-variant focus:ring-2 focus:ring-primary focus:border-transparent rounded-xl outline-none text-xs font-bold"
                />
              </div>

              {/* Quick toggles */}
              <div className="space-y-4 pt-4 border-t border-outline-variant/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-on-surface">Ambient Hymns & Music</p>
                    <p className="text-[10px] text-outline font-medium">Plays gentle background scores during reading.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setMusicOn(!musicOn)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                      musicOn ? 'bg-primary' : 'bg-outline-variant'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                      musicOn ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-on-surface">Sound Effects</p>
                    <p className="text-[10px] text-outline font-medium">Audible click and answer confirmation signals.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setSfxOn(!sfxOn)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                      sfxOn ? 'bg-primary' : 'bg-outline-variant'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                      sfxOn ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="flex-1 py-3 border border-outline-variant rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-xs hover:brightness-110 cursor-pointer shadow"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Sticky Footer Navigation to complement full screen capability */}
      <footer className="fixed bottom-0 left-0 w-full z-40 bg-white/85 backdrop-blur-xl border-t border-outline-variant/30 md:hidden flex justify-around items-center h-14 select-none shadow-lg animate-fade-in">
        {[
          { label: 'Home', value: 'home', icon: '🏠' },
          { label: 'Quiz', value: 'quiz', icon: '❓' },
          { label: 'Games', value: 'games', icon: '🎮' },
          { label: 'Stories', value: 'stories', icon: '📖' },
          { label: 'Learning', value: 'learning', icon: '🧠' }
        ].map((item) => {
          const isActive = currentTab === item.value;
          return (
            <button
              key={item.value}
              onClick={() => setCurrentTab(item.value as Tab)}
              className={`flex flex-col items-center justify-center flex-1 h-full cursor-pointer transition-colors ${
                isActive ? 'text-primary' : 'text-on-surface-variant/70 hover:text-primary/70'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[9px] font-bold mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </footer>
    </div>
  );
}
