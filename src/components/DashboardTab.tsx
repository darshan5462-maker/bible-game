import { Tab, UserStats } from '../types';
import { 
  Trophy, 
  Award, 
  Music, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Languages, 
  Play, 
  BookOpen, 
  Clock, 
  ArrowRight,
  Bell,
  Compass,
  Map,
  Grid
} from 'lucide-react';
import { useState } from 'react';

interface DashboardTabProps {
  setCurrentTab: (tab: Tab) => void;
  stats: UserStats;
  musicOn: boolean;
  setMusicOn: (on: boolean) => void;
  sfxOn: boolean;
  setSfxOn: (on: boolean) => void;
  lang: 'en' | 'kn';
  setLang: (lang: 'en' | 'kn') => void;
  onStartMiraclesQuest: () => void;
  favorites: { verse: string; reference: string }[];
}

export default function DashboardTab({
  setCurrentTab,
  stats,
  musicOn,
  setMusicOn,
  sfxOn,
  setSfxOn,
  lang,
  setLang,
  onStartMiraclesQuest,
  favorites
}: DashboardTabProps) {
  const [showFullLeaderboard, setShowFullLeaderboard] = useState(false);
  const [alertsOn, setAlertsOn] = useState(true);

  // Leaderboard data
  const leaderboardPlayers = [
    { rank: 1, name: "Grace Walker", xp: 5240, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBzLXWUM_qLl5Arhn1C6fQEDGg-IlYY_JHeYedMfrJXCI5-EVCyrBM_Nzfx44cVsFJOaEcsECKvZsxiVe3yFj6BkXZjZs1fsdwhTXB1XrFZHj2OGLHzbyGFVBz8ZUDyAt7W9XVg6HFMKDtTVDOko-nz5tcWlM02SArDMRie5zXgz-rK1-zqLHbQ7AaV5OEISsw-Cf6EDNQsV6h4qzdStC5ejUvbz7XCPgsO9hg_W12Y98DD-V4G3WoYA", medal: true },
    { rank: 2, name: "Samuel King", xp: 4890, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCakW2bYS6RTc5EvPdrshjMaKLL_vgVrLMB8FbdZP445b1ABkvck1_rdjBOs-bf2__A3Ve7zYr0Wib6Why9Ltz4e6TElU1Ms35mBeO1vSAXLYR0G_ffmMSpJqwiMsj5RGG8Hbnf2svoos0jltU5Psjne3oS2XIHM1EYJzFbKRxuGPkCLEp9ne_Xnr8vcPkkGMI-yWZ7r6svA8fcOQmqVb1_3pi5ipwB2SaoO-P5E07KNgrBRpm3V0WHQ", medal: false },
    { rank: 3, name: "David Shepherd", xp: 4120, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3hbbs63ptr-IxmkWKZLeVqttRA-YZYny79vkrP6zOR7-dEnYRCZA2qAPPqnZ3V9X-svB7Z_bOoxmhArHe-bSlLytmdaWHmOEpdw7vUtDFdB4QmLanPx6snD3pW2jHjOpJdpxjfbkehlGVcE2EHgHbWgw5BDVEhbQaBbnmTp3YloPKhBPDHGq8xkCWg7GtCJW6Y6iyLOyr22U0zkjUiAx-yrkGgZygL-muIRV1K1mLS9MR5ieVr9MiAg", medal: false },
    { rank: 4, name: "Sarah Miller", xp: 3950, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100", medal: false },
    { rank: 5, name: "James Taylor", xp: 3780, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100", medal: false }
  ];

  return (
    <div className="w-full max-w-container-max mx-auto flex flex-col gap-8 pb-12">
      {/* Hero Section: Verse of the Day */}
      <section className="relative rounded-3xl overflow-hidden shadow-xl border border-white/50 bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent pointer-events-none" />
        <div className="glass-panel relative z-10 p-8 md:p-12 min-h-[280px] flex flex-col justify-center items-center text-center">
          <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            VERSE OF THE DAY
          </span>
          
          <div className="max-w-3xl">
            {lang === 'en' ? (
              <div id="verse-container" className="animate-fade-in">
                <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-primary mb-4 italic leading-tight">
                  "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
                </blockquote>
                <p className="font-sans font-bold text-on-surface-variant text-base">John 3:16</p>
              </div>
            ) : (
              <div id="verse-container-kannada" className="animate-fade-in">
                <blockquote className="font-kannada text-lg md:text-xl lg:text-2xl text-primary mb-4 leading-relaxed">
                  "ಯಾಕಂದರೆ ದೇವರು ಲೋಕದ ಮೇಲೆ ಎಷ್ಟೋ ಪ್ರೀತಿಯನ್ನಿಟ್ಟು ತನ್ನ ಒಬ್ಬನೇ ಮಗನನ್ನು ಕೊಟ್ಟನು; ಆತನಲ್ಲಿ ನಂಬಿಕೆಯಿಡುವ ಒಬ್ಬನಾದರೂ ನಾಶವಾಗದೆ ನಿತ್ಯಜೀವವನ್ನು ಪಡೆಯುವಂತೆ ಆತನನ್ನು ಕೊಟ್ಟನು."
                </blockquote>
                <p className="font-sans font-bold text-on-surface-variant text-base">ಯೋಹಾನ 3:16</p>
              </div>
            )}
          </div>

          <button 
            id="btn-switch-lang"
            onClick={() => setLang(lang === 'en' ? 'kn' : 'en')}
            className="mt-8 flex items-center gap-2 px-6 py-2.5 border border-primary/20 rounded-full text-primary font-bold text-xs hover:bg-primary/5 transition-all active:scale-95 cursor-pointer bg-white shadow-sm"
          >
            <Languages className="w-4 h-4" />
            <span>{lang === 'en' ? 'Switch to Kannada' : 'Switch to English'}</span>
          </button>
        </div>
      </section>

      {/* Main Grid: Content + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Primary Journey & Daily Challenge */}
        <div className="lg:col-span-2 space-y-8">
          {/* Daily Challenge Card */}
          <div className="relative group overflow-hidden bg-primary-container rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-lg shadow-primary/20">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700 pointer-events-none"></div>
            <div className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500 bg-black">
              <img 
                className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfBSOPSTKmg2M77zQb9LFp5aH4o5eFFNFM05TU7Cloce3lWges-g5rlElg0QfmC8wuweyrgiRyXt6RbwMRXc_4whNEfIJ9J7O_u8akH8sUdNEMn2rbIxHOo07LwGITM-5uFzfN2Ych7zgtZj2QzKy4DDP1su5NmuHJSOlKjBoTnnyzijmpKYeFJb6c6Clqa3RyGFoggdrUEdE4q476AqH6qGUZ3x5jvAMZI6o6RymawHD2hZ6Kg6FI2Q"
                alt="Moses parting the Red Sea"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left text-on-primary">
              <h3 className="font-serif text-xl md:text-2xl font-bold mb-2 text-white">Daily Quest: The Miracles of Jesus</h3>
              <p className="font-sans text-xs md:text-sm text-primary-fixed-dim opacity-90 mb-5 max-w-md">
                Master the accounts of divinity. Complete this challenge for a 50 XP bonus and a special Wisdom badge.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <button 
                  id="btn-start-quest"
                  onClick={onStartMiraclesQuest}
                  className="px-6 py-2.5 bg-gold-accent text-on-primary-fixed font-bold text-xs rounded-full shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Start Quest
                </button>
                <span className="text-xs font-bold flex items-center gap-1 opacity-80 text-white">
                  <Clock className="w-4 h-4" /> 14 hours left
                </span>
              </div>
            </div>
          </div>

          {/* Bento Game Modes Grid */}
          <section>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-on-surface mb-4 px-2">Choose Your Path</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <button 
                onClick={() => setCurrentTab('quiz')}
                className="flex flex-col items-center justify-center p-5 bg-white hover:bg-secondary/5 rounded-2xl shadow-sm border border-outline-variant/30 transition-all hover:shadow-md hover:-translate-y-1 active:scale-95 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-secondary-container/10 flex items-center justify-center mb-3 group-hover:bg-secondary-container/20 transition-all">
                  <Award className="w-6 h-6 text-secondary" />
                </div>
                <span className="font-semibold text-sm text-on-surface text-center">Bible Quiz</span>
                <div className="mt-2 w-8 h-1 bg-gold-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button 
                onClick={() => setCurrentTab('stories')}
                className="flex flex-col items-center justify-center p-5 bg-white hover:bg-primary/5 rounded-2xl shadow-sm border border-outline-variant/30 transition-all hover:shadow-md hover:-translate-y-1 active:scale-95 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center mb-3 group-hover:bg-primary-container/20 transition-all">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <span className="font-semibold text-sm text-on-surface text-center">Story Adventure</span>
                <div className="mt-2 w-8 h-1 bg-gold-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button 
                onClick={() => setCurrentTab('learning')}
                className="flex flex-col items-center justify-center p-5 bg-white hover:bg-tertiary/5 rounded-2xl shadow-sm border border-outline-variant/30 transition-all hover:shadow-md hover:-translate-y-1 active:scale-95 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-tertiary-container/10 flex items-center justify-center mb-3 group-hover:bg-tertiary-container/20 transition-all">
                  <Compass className="w-6 h-6 text-tertiary" />
                </div>
                <span className="font-semibold text-sm text-on-surface text-center">Character Match</span>
                <div className="mt-2 w-8 h-1 bg-gold-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button 
                onClick={() => setCurrentTab('learning')}
                className="flex flex-col items-center justify-center p-5 bg-white hover:bg-error/5 rounded-2xl shadow-sm border border-outline-variant/30 transition-all hover:shadow-md hover:-translate-y-1 active:scale-95 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-error-container/10 flex items-center justify-center mb-3 group-hover:bg-error-container/20 transition-all">
                  <Grid className="w-6 h-6 text-error" />
                </div>
                <span className="font-semibold text-sm text-on-surface text-center">Bible Crossword</span>
                <div className="mt-2 w-8 h-1 bg-gold-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button 
                onClick={() => setCurrentTab('learning')}
                className="flex flex-col items-center justify-center p-5 bg-white hover:bg-secondary-fixed/5 rounded-2xl shadow-sm border border-outline-variant/30 transition-all hover:shadow-md hover:-translate-y-1 active:scale-95 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-secondary-fixed/10 flex items-center justify-center mb-3 group-hover:bg-secondary-fixed/20 transition-all">
                  <Map className="w-6 h-6 text-secondary" />
                </div>
                <span className="font-semibold text-sm text-on-surface text-center">Geography</span>
                <div className="mt-2 w-8 h-1 bg-gold-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button 
                onClick={() => setCurrentTab('learning')}
                className="flex flex-col items-center justify-center p-5 bg-white hover:bg-on-primary-container/5 rounded-2xl shadow-sm border border-outline-variant/30 transition-all hover:shadow-md hover:-translate-y-1 active:scale-95 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-on-primary-container/10 flex items-center justify-center mb-3 group-hover:bg-on-primary-container/20 transition-all">
                  <Award className="w-6 h-6 text-primary-container" />
                </div>
                <span className="font-semibold text-sm text-on-surface text-center">Memory Match</span>
                <div className="mt-2 w-8 h-1 bg-gold-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </section>

          {/* Continue Adventure Section */}
          <div className="bg-surface-container-low rounded-3xl p-6 md:p-8 border border-outline-variant/30">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-on-surface">Continue Adventure</h2>
              <button 
                onClick={() => setCurrentTab('stories')} 
                className="text-primary font-bold text-xs md:text-sm hover:underline cursor-pointer flex items-center gap-1"
              >
                See All Stories <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-5 rounded-2xl shadow-sm border border-outline-variant/15">
              <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden bg-black flex-shrink-0">
                <img 
                  className="w-full h-full object-cover opacity-90" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_uU2yZGk7f7tEG5Z7Bb7QcayTjoMOggTYF8qzwNmHBEE1AsQBJPGBve2VsvFZ8aCBYsGzpeTWr0zZys69Cqlr1g_Tu9738HjWRKtGYoqHWcqAgnTf2dczcySzv1Rf2AgUPMq8CoE1Hemm3k1GMg_acTKEm6hamffZQd1zsOThwp2zP-fXSdkr0mSt2vPLnloDK3Iy1gdissqJgvL1RqQ95mXrtdZ0LDQeGeOufWHlVg2SfaHitg5Zsg"
                  alt="Ethereal painting of Bethlehem star over stable"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Play className="w-10 h-10 text-white fill-white cursor-pointer hover:scale-110 transition-transform" />
                </div>
              </div>
              
              <div className="flex-1 w-full">
                <h4 className="text-base md:text-lg font-bold text-primary mb-1">The Birth of Jesus</h4>
                <p className="text-on-surface-variant text-xs md:text-sm mb-4">Chapter 3: The Journey to Egypt</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-2/3 rounded-full"></div>
                  </div>
                  <span className="text-xs font-semibold text-outline">65% Complete</span>
                </div>
              </div>
              
              <button 
                onClick={() => setCurrentTab('stories')}
                className="w-full md:w-auto px-6 py-2 bg-primary text-on-primary rounded-lg font-bold text-xs hover:opacity-90 transition-all cursor-pointer shadow"
              >
                Resume
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar Stats & Feed */}
        <div className="space-y-8">
          {/* Global Leaderboard */}
          <section id="leaderboard-section" className="bg-white rounded-2xl p-6 border border-outline-variant/30 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-base md:text-lg flex items-center gap-2 text-on-surface">
                <Trophy className="w-5 h-5 text-gold-accent fill-gold-accent" />
                Global Leaderboard
              </h3>
              <span className="text-xs text-outline font-bold uppercase tracking-wider bg-surface-container-high/40 px-2 py-0.5 rounded">Global</span>
            </div>
            
            <div className="space-y-4">
              {leaderboardPlayers.slice(0, showFullLeaderboard ? 5 : 3).map((player) => (
                <div 
                  key={player.rank} 
                  className={`flex items-center gap-4 p-2.5 rounded-xl border ${
                    player.rank === 1 
                      ? 'bg-gold-accent/10 border-gold-accent/30' 
                      : 'border-transparent hover:bg-surface-container-low/40'
                  }`}
                >
                  <span className={`w-6 text-center font-serif text-base font-bold ${
                    player.rank === 1 
                      ? 'text-gold-accent text-lg' 
                      : 'text-on-surface-variant'
                  }`}>{player.rank}</span>
                  
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/30 bg-surface-container-high">
                    <img 
                      src={player.avatar} 
                      alt={player.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-bold text-on-surface text-xs md:text-sm">{player.name}</p>
                    <p className="text-[10px] text-outline font-semibold">{player.xp.toLocaleString()} XP</p>
                  </div>
                  {player.medal && <Award className="w-5 h-5 text-gold-accent fill-gold-accent animate-pulse" />}
                </div>
              ))}

              <div className="flex items-center gap-4 p-2.5 border-t border-outline-variant/10 pt-4 mt-2">
                <span className="w-6 text-center font-bold text-xs md:text-sm text-primary">12</span>
                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs">DJ</div>
                <div className="flex-1">
                  <p className="font-bold text-primary text-xs md:text-sm">You ({stats.name})</p>
                  <p className="text-[10px] text-outline font-semibold">{stats.xp.toLocaleString()} XP</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowFullLeaderboard(!showFullLeaderboard)}
              className="w-full mt-6 py-2.5 border border-outline-variant/30 hover:border-primary/30 rounded-lg text-xs font-bold text-on-surface-variant hover:text-primary transition-all cursor-pointer bg-white"
            >
              {showFullLeaderboard ? 'Hide Details' : 'View Full Ranking'}
            </button>
          </section>

          {/* Recent Achievements */}
          <section id="achievements-section" className="bg-white rounded-2xl p-6 border border-outline-variant/30 shadow-sm">
            <h3 className="font-bold text-base md:text-lg mb-6 flex items-center gap-2 text-on-surface">
              <Award className="w-5 h-5 text-secondary" />
              Recent Achievements
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-surface-container-low group cursor-pointer hover:bg-white border border-transparent hover:border-outline-variant/30 hover:shadow transition-all">
                <div className="w-16 h-16 mb-2 coin-animation">
                  <img 
                    className="w-full h-full object-contain" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZhiLjK1ulvmhG_AOp4kd9rGW-4G2EvjDQVCBOlwPWKLMVCg62oQDRYyTU-neyQQHeusXuX4EYzvRB9bCEUsclmsgEn3hYl2la_KomjqzSo7nEFeEmLbO1YNj6mVPx3ixk_1aVuWtIGgXvONlfCbyvSPvTjVwHH7IiVBx9tZ4TRXXq_RQbirbiFeWnpPJt47oPjnu4YCMKHP1RzGdih3viG9lzpWgfA09OhIQL2HtbC855UGj3S_fDFQ"
                    alt="Word Warrior Golden Badge"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-xs font-bold text-on-surface">Word Warrior</p>
                <p className="text-[10px] text-outline mt-1 font-semibold">Active reader</p>
              </div>

              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-surface-container-low grayscale opacity-60 border border-transparent">
                <div className="w-16 h-16 mb-2">
                  <img 
                    className="w-full h-full object-contain" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_0u-A9ZjZPFVbRZcC-_XDD45NKHeXLPtfzs-W6ezJnt1E30BhmvCh0AKXuxXtNILZD5XN1UzYY-doEJZaGHeATzD_-euC9cXzq6uEwIb4A7tfyN8fOzmO1faUL1GXiEalaffycGv8ifM1iqbWonqooZzk5-3Fo-BzFwHyaSzJsINNW4vfrVLRu4YnGl1j66WO0YUdLvaAm2KN5Lp_emKUFHMobX4snHfksevPpoPvX4q115d8f3nMtg"
                    alt="Ancient Explorer Silver Trophy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-xs font-bold text-on-surface-variant">Ancient Explorer</p>
                <p className="text-[10px] text-outline mt-1 font-semibold">Locked (Level 15)</p>
              </div>
            </div>
          </section>

          {/* Quick Toggles Dashboard Box */}
          <div className="bg-surface-container-low rounded-2xl p-6 flex items-center justify-around border border-outline-variant/10 shadow-sm">
            <button 
              onClick={() => setMusicOn(!musicOn)}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                musicOn ? 'bg-primary text-white' : 'bg-white text-on-surface-variant group-hover:bg-surface-container-high'
              }`}>
                <Music className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-outline">MUSIC: {musicOn ? 'ON' : 'OFF'}</span>
            </button>

            <button 
              onClick={() => setSfxOn(!sfxOn)}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                sfxOn ? 'bg-secondary text-white' : 'bg-white text-on-surface-variant group-hover:bg-surface-container-high'
              }`}>
                {sfxOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </div>
              <span className="text-[10px] font-bold text-outline">SFX: {sfxOn ? 'ON' : 'OFF'}</span>
            </button>

            <button 
              onClick={() => setAlertsOn(!alertsOn)}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                alertsOn ? 'bg-tertiary text-white' : 'bg-white text-on-surface-variant group-hover:bg-surface-container-high'
              }`}>
                <Bell className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-outline">ALERTS: {alertsOn ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
