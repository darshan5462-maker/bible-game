import { useState } from 'react';
import { Tab, UserStats, Book, Character, FavoriteVerse } from '../types';
import { BIBLICAL_BOOKS, PROMINENT_FIGURES, DEFAULT_FAVORITE_VERSES } from '../data';
import { 
  Search, 
  Heart, 
  BookOpen, 
  Sparkles, 
  ChevronRight, 
  Info, 
  X, 
  Award,
  CircleDollarSign,
  Languages,
  Bookmark
} from 'lucide-react';

interface LearningTabProps {
  stats: UserStats;
  setStats: (stats: UserStats) => void;
  lang: 'en' | 'kn';
  setLang: (lang: 'en' | 'kn') => void;
  setCurrentTab: (tab: Tab) => void;
  sfxOn: boolean;
  favorites: FavoriteVerse[];
  setFavorites: (favorites: FavoriteVerse[]) => void;
}

export default function LearningTab({
  stats,
  setStats,
  lang,
  setLang,
  setCurrentTab,
  sfxOn,
  favorites,
  setFavorites
}: LearningTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTestament, setActiveTestament] = useState<'old' | 'new'>('old');
  
  // Modals state
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [studySuccessMessage, setStudySuccessMessage] = useState<string | null>(null);

  // Filter books and figures based on search query
  const filteredBooks = BIBLICAL_BOOKS.filter(book => 
    book.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    book.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.nameKannada.includes(searchQuery)
  );

  const filteredCharacters = PROMINENT_FIGURES.filter(char => 
    char.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    char.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const playSfx = (type: 'correct' | 'click' | 'victory') => {
    if (!sfxOn) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'correct') {
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      } else if (type === 'click') {
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      } else if (type === 'victory') {
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      }
    } catch (e) {}
  };

  const handleToggleFavorite = (verse: FavoriteVerse) => {
    playSfx('click');
    const exists = favorites.some(fav => fav.id === verse.id);
    if (exists) {
      setFavorites(favorites.filter(fav => fav.id !== verse.id));
    } else {
      setFavorites([...favorites, verse]);
    }
  };

  const handleStartStudyingBook = (book: Book) => {
    playSfx('victory');
    setStudySuccessMessage(`Successfully studied ${book.name}! Progress updated to 100%!`);
    
    // Set progress of that book to 100% and award XP and coins
    book.progress = 100;
    
    setStats({
      ...stats,
      coins: stats.coins + 50,
      xp: stats.xp + 75,
      level: Math.floor((stats.xp + 75) / 600) + 12
    });

    setTimeout(() => {
      setStudySuccessMessage(null);
      setSelectedBook(null);
    }, 3000);
  };

  return (
    <div className="w-full max-w-container-max mx-auto flex flex-col pb-12 select-none animate-fade-in px-4">
      {/* Page Header & Search Banner */}
      <section className="mb-12 relative overflow-hidden rounded-[32px] p-8 md:p-12 glass-panel shadow-lg min-h-[280px] flex flex-col justify-center bg-white border border-outline-variant/20">
        <div className="relative z-10 max-w-2xl">
          <h1 className="font-serif text-3xl md:text-5xl text-primary font-bold mb-4 leading-tight">Sacred Wisdom & Knowledge</h1>
          <p className="text-on-surface-variant text-sm md:text-base mb-8 leading-relaxed">
            The Bible Quest Digital Encyclopedia is your comprehensive guide to understanding the Word. Explore history, books, characters, and the divine narrative.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                <Search className="w-5 h-5" />
              </span>
              <input 
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-outline-variant focus:ring-2 focus:ring-primary focus:border-transparent outline-none shadow-sm text-sm" 
                placeholder="Search Books, Characters, or Categories..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <select 
                value={lang === 'en' ? 'English (KJV)' : 'Kannada (BSI)'}
                onChange={(e) => setLang(e.target.value.includes('Kannada') ? 'kn' : 'en')}
                className="appearance-none pl-4 pr-10 py-3.5 rounded-2xl border border-outline-variant bg-white focus:ring-2 focus:ring-primary outline-none text-xs font-bold"
              >
                <option>English (KJV)</option>
                <option>English (WEB)</option>
                <option>ಕನ್ನಡ (BSI)</option>
              </select>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* Main Grid: Content (8 cols) + Sidebars (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Encyclopedia Content */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Bible Books Section */}
          <section>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="font-serif text-2xl md:text-3xl text-on-surface font-bold flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-secondary fill-secondary/20" />
                Books of the Bible
              </h2>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => { playSfx('click'); setActiveTestament('old'); }}
                  className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all ${
                    activeTestament === 'old' 
                      ? 'bg-primary text-white shadow-md' 
                      : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  Old Testament
                </button>
                <button 
                  onClick={() => { playSfx('click'); setActiveTestament('new'); }}
                  className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all ${
                    activeTestament === 'new' 
                      ? 'bg-primary text-white shadow-md' 
                      : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  New Testament
                </button>
              </div>
            </div>

            {/* Books Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {activeTestament === 'old' ? (
                filteredBooks.map((book) => (
                  <div 
                    key={book.id}
                    onClick={() => { playSfx('click'); setSelectedBook(book); }}
                    className="group p-6 rounded-2xl bg-white border border-outline-variant hover:border-primary hover:shadow-xl transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-serif text-xl font-bold text-on-surface mb-0.5">{book.name}</h3>
                          <p className="text-primary text-[10px] font-extrabold uppercase tracking-wider">{book.category}</p>
                        </div>
                        <Info className="w-5 h-5 text-outline group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-xs text-on-surface-variant mb-6 line-clamp-2 leading-relaxed">{book.description}</p>
                    </div>

                    <div className="space-y-1.5 mt-auto">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-outline">Study Progress</span>
                        <span className="text-primary">{book.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-500"
                          style={{ width: `${book.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 py-10 text-center text-on-surface-variant font-semibold text-sm bg-white rounded-2xl border border-outline-variant/30">
                  <Bookmark className="w-8 h-8 text-outline mx-auto mb-2 opacity-55" />
                  New Testament directory matches are currently being loaded. Choose Old Testament for interactive modules!
                </div>
              )}
            </div>
          </section>

          {/* Miracles & Parables Directory */}
          <section className="p-6 md:p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30">
            <h2 className="font-serif text-xl md:text-2xl text-on-surface font-bold mb-6">Miracles & Parables</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div 
                onClick={() => { playSfx('click'); setCurrentTab('quiz'); }}
                className="p-5 bg-white rounded-2xl flex items-center gap-5 shadow-sm hover:shadow-md hover:border-primary/20 border border-transparent transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-2xl bg-tertiary-container/20 flex items-center justify-center text-tertiary shadow-sm group-hover:scale-105 transition-transform">
                  <Sparkles className="w-7 h-7 text-tertiary fill-tertiary/20" />
                </div>
                <div>
                  <h4 className="font-bold text-sm md:text-base text-on-surface">Jesus' Miracles</h4>
                  <p className="text-xs text-outline font-semibold">37 recorded events • Play Quiz</p>
                </div>
                <ChevronRight className="w-5 h-5 ml-auto text-outline-variant group-hover:translate-x-1 transition-transform" />
              </div>

              <div 
                onClick={() => { playSfx('click'); setSelectedBook(BIBLICAL_BOOKS[0]); }}
                className="p-5 bg-white rounded-2xl flex items-center gap-5 shadow-sm hover:shadow-md hover:border-primary/20 border border-transparent transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-2xl bg-secondary-container/20 flex items-center justify-center text-secondary shadow-sm group-hover:scale-105 transition-transform">
                  <BookOpen className="w-7 h-7 text-secondary fill-secondary/20" />
                </div>
                <div>
                  <h4 className="font-bold text-sm md:text-base text-on-surface">Parables of Grace</h4>
                  <p className="text-xs text-outline font-semibold">The Prodigal Son & more</p>
                </div>
                <ChevronRight className="w-5 h-5 ml-auto text-outline-variant group-hover:translate-x-1 transition-transform" />
              </div>

            </div>
          </section>

          {/* Character bento board directory */}
          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-on-surface font-bold mb-6">Prominent Figures</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCharacters.map((char) => {
                const isMoses = char.id === 'moses';
                return (
                  <div 
                    key={char.id}
                    className={`p-6 md:p-8 rounded-[32px] text-white relative overflow-hidden group ${
                      isMoses ? 'bg-primary' : 'bg-secondary-container text-on-secondary-container'
                    }`}
                  >
                    <div className="relative z-10 flex flex-col justify-between h-full min-h-[180px]">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold mb-1">{char.name}</h3>
                        <p className={`text-xs italic mb-4 ${isMoses ? 'text-primary-fixed-dim' : 'text-on-secondary-container/80'}`}>
                          "{char.nickname}"
                        </p>
                        <ul className="space-y-2 text-xs opacity-90 mb-6">
                          <li className="flex items-center gap-2">
                            <span className="text-lg">📜</span> {char.role}
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-lg">🛡️</span> {char.tribe}
                          </li>
                        </ul>
                      </div>
                      
                      <button 
                        onClick={() => { playSfx('click'); setSelectedCharacter(char); }}
                        className={`px-5 py-2 rounded-full text-xs font-bold self-start cursor-pointer hover:scale-105 active:scale-95 transition-all shadow ${
                          isMoses ? 'bg-white text-primary' : 'bg-primary text-white'
                        }`}
                      >
                        Full Bio
                      </button>
                    </div>
                    
                    {/* Giant background graphics */}
                    <div className={`absolute -right-6 -bottom-6 text-white/10 text-[150px] font-bold pointer-events-none transition-transform duration-700 group-hover:scale-110 select-none`}>
                      {isMoses ? '🌊' : '🛡️'}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>

        {/* Right Side: Sidebars */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Favorite Verses Panel */}
          <div className="glass-panel p-6 md:p-8 rounded-[32px] shadow-sm border border-outline-variant/30 bg-white">
            <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/20 pb-4">
              <Heart className="w-5 h-5 text-primary fill-primary" />
              <h3 className="font-bold text-base md:text-lg text-on-surface">Favorite Verses</h3>
            </div>
            
            {favorites.length > 0 ? (
              <div className="space-y-5">
                {favorites.map((verse) => (
                  <div key={verse.id} className="relative pb-4 border-b border-outline-variant/10 last:border-b-0 last:pb-0 animate-fade-in">
                    <p className="font-serif text-sm md:text-base italic text-on-surface mb-2 leading-relaxed">
                      "{verse.verse}"
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-primary">{verse.reference}</span>
                      <button 
                        onClick={() => handleToggleFavorite(verse)}
                        className="text-error hover:text-outline transition-colors cursor-pointer"
                        title="Remove from favorites"
                      >
                        <Heart className="w-4 h-4 fill-error text-error" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-outline font-semibold text-xs leading-relaxed">
                <Bookmark className="w-6 h-6 text-outline/40 mx-auto mb-2" />
                No favorites selected yet. Heart a verse below or in the Digital Encyclopedia to build your custom devotional library!
              </div>
            )}
          </div>

          {/* Study History Card */}
          <div className="bg-white p-6 md:p-8 rounded-[32px] border border-outline-variant shadow-sm">
            <h3 className="font-bold text-base md:text-lg mb-6">Study History</h3>
            <div className="space-y-4">
              {[
                { title: 'Romans Chapter 8', time: 'Yesterday at 8:45 PM', emoji: '📖' },
                { title: 'The Life of Joseph', time: '2 days ago', emoji: '👥' },
                { title: 'Biblical Ethics', time: 'Nov 12, 2023', emoji: '🧠' }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => { playSfx('click'); setSelectedBook(BIBLICAL_BOOKS[0]); }}
                  className="flex gap-4 items-center p-2.5 hover:bg-surface-container-low/50 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-outline-variant/20"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-lg shadow-sm">
                    {item.emoji}
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-bold text-on-surface">{item.title}</p>
                    <p className="text-[10px] text-outline font-semibold">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Wisdom Widget */}
          <div className="relative p-6 md:p-8 rounded-[32px] bg-gradient-to-br from-primary to-secondary text-white overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
            <div className="relative z-10">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 fill-white" />
                Word of the Day
              </h3>
              <p className="font-serif text-lg md:text-xl mb-4 leading-relaxed">
                "Let no one despise your youth, but be an example to the believers..."
              </p>
              <p className="text-[10px] font-extrabold text-white/70 uppercase mb-6 tracking-widest">1 Timothy 4:12</p>
              
              <button 
                onClick={() => { playSfx('click'); setCurrentTab('quiz'); }}
                className="w-full py-3 bg-white/20 hover:bg-white/35 backdrop-blur-md rounded-2xl font-bold text-xs transition-all cursor-pointer shadow-lg text-white"
              >
                Start Daily Quiz
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/45 backdrop-blur-sm" 
            onClick={() => setSelectedBook(null)}
          />
          
          <div className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] border border-outline-variant/30 animate-fade-in">
            {/* Modal Left Header */}
            <div className="md:w-1/3 bg-primary p-8 md:p-10 text-white flex flex-col justify-center relative">
              <div className="coin-animation">
                <h2 className="font-serif text-4xl font-bold mb-1 text-white">{selectedBook.name}</h2>
                <h3 className="font-kannada text-xl mb-8 text-primary-fixed-dim">{selectedBook.nameKannada}</h3>
                
                <div className="space-y-6 text-xs border-t border-white/10 pt-6">
                  <div className="flex items-center gap-4">
                    <span className="text-xl">✍️</span>
                    <div>
                      <p className="text-[10px] text-white/60 uppercase font-bold tracking-wider">Author</p>
                      <p className="font-bold text-white">{selectedBook.author}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xl">📅</span>
                    <div>
                      <p className="text-[10px] text-white/60 uppercase font-bold tracking-wider">Date</p>
                      <p className="font-bold text-white">{selectedBook.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Right Details */}
            <div className="md:w-2/3 p-8 md:p-10 overflow-y-auto bg-surface-bright flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">{selectedBook.category}</span>
                    <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider">Study progress: {selectedBook.progress}%</span>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedBook(null)}
                    className="w-8 h-8 rounded-full hover:bg-surface-container-high transition-colors flex items-center justify-center cursor-pointer border border-outline-variant/20"
                  >
                    <X className="w-4 h-4 text-on-surface" />
                  </button>
                </div>

                {studySuccessMessage && (
                  <div className="mb-6 p-3 bg-emerald-500/10 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold text-center animate-pulse">
                    {studySuccessMessage}
                  </div>
                )}

                <div className="space-y-6 text-left">
                  <section>
                    <h4 className="text-primary font-bold uppercase text-[10px] tracking-wider mb-2">The Purpose</h4>
                    <p className="text-xs md:text-sm text-on-surface leading-relaxed font-semibold">{selectedBook.purpose}</p>
                  </section>

                  <section className="p-5 rounded-2xl bg-secondary-container/10 border border-secondary/10">
                    <h4 className="text-secondary font-bold uppercase text-[10px] tracking-wider mb-2">Key Verse</h4>
                    <p className="font-serif text-base italic text-secondary mb-1 leading-relaxed">"{selectedBook.keyVerse}"</p>
                    <p className="text-[10px] font-bold text-secondary/70">— {selectedBook.keyVerseRef}</p>
                  </section>

                  <section>
                    <h4 className="text-primary font-bold uppercase text-[10px] tracking-wider mb-3">Major Themes</h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {selectedBook.themes.map((theme, i) => (
                        <div key={i} className="flex items-center gap-2 text-on-surface font-semibold bg-white p-2.5 rounded-xl border border-outline-variant/20 shadow-sm">
                          <Sparkles className="w-3.5 h-3.5 text-primary" />
                          <span>{theme}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>

              <button 
                onClick={() => handleStartStudyingBook(selectedBook)}
                disabled={selectedBook.progress === 100}
                className="w-full py-3.5 bg-primary hover:bg-primary-container text-white rounded-2xl font-bold text-xs mt-8 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <BookOpen className="w-4 h-4" />
                {selectedBook.progress === 100 ? 'Genesis Study Complete!' : `Start Studying ${selectedBook.name}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Character Detail Modal */}
      {selectedCharacter && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/45 backdrop-blur-sm" 
            onClick={() => setSelectedCharacter(null)}
          />
          
          <div className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden p-8 border border-outline-variant/30 animate-fade-in text-left">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">{selectedCharacter.role}</span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mt-2">{selectedCharacter.name}</h2>
                <p className="text-xs text-outline italic font-semibold">"{selectedCharacter.nickname}" • {selectedCharacter.tribe}</p>
              </div>
              <button 
                onClick={() => setSelectedCharacter(null)}
                className="w-8 h-8 rounded-full hover:bg-surface-container-high transition-colors flex items-center justify-center cursor-pointer border border-outline-variant/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6">
              <section>
                <h4 className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2">Biography</h4>
                <p className="text-xs md:text-sm text-on-surface leading-relaxed font-medium">{selectedCharacter.bio}</p>
              </section>

              <section>
                <h4 className="text-[10px] font-bold text-primary uppercase tracking-wider mb-3">Key Achievements</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {selectedCharacter.achievements.map((ach, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-surface-container-low p-3 rounded-xl border border-outline-variant/10">
                      <span className="text-base">🏆</span>
                      <span className="font-semibold text-on-surface-variant">{ach}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-secondary-container/10 p-4 rounded-xl border border-secondary/15">
                <h4 className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-2">Key Scripture References</h4>
                <div className="flex flex-wrap gap-2 text-[10px] font-bold text-secondary">
                  {selectedCharacter.keyVerses.map((ref, i) => (
                    <span key={i} className="bg-white px-3 py-1 rounded-full border border-secondary/20 shadow-sm">{ref}</span>
                  ))}
                </div>
              </section>
            </div>

            <button 
              onClick={() => setSelectedCharacter(null)}
              className="w-full mt-6 py-3.5 bg-primary text-white rounded-xl font-bold text-xs hover:opacity-95 cursor-pointer text-center"
            >
              Close Biography
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
