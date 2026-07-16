import { useState } from 'react';
import { Tab, UserStats } from '../types';
import { NOAH_ARK_STORY } from '../data';
import { 
  ArrowLeft, 
  Award, 
  Play, 
  Languages, 
  CheckCircle2, 
  Compass, 
  Sparkles, 
  Volume2, 
  Info,
  X
} from 'lucide-react';

interface StoriesTabProps {
  stats: UserStats;
  setStats: (stats: UserStats) => void;
  lang: 'en' | 'kn';
  setLang: (lang: 'en' | 'kn') => void;
  setCurrentTab: (tab: Tab) => void;
  sfxOn: boolean;
}

export default function StoriesTab({
  stats,
  setStats,
  lang,
  setLang,
  setCurrentTab,
  sfxOn
}: StoriesTabProps) {
  const [isPlayingNarration, setIsPlayingNarration] = useState(false);
  const [activeSubScene, setActiveSubScene] = useState<'main' | 'gather' | 'explore'>('main');

  // Gather Animals mini-game states
  const initialAnimals = [
    { id: 1, name: 'Elephant', icon: '🐘', pairId: 'elephant' },
    { id: 2, name: 'Lion', icon: '🦁', pairId: 'lion' },
    { id: 3, name: 'Giraffe', icon: '🦒', pairId: 'giraffe' },
    { id: 4, name: 'Dove', icon: '🕊️', pairId: 'dove' },
    { id: 5, name: 'Elephant', icon: '🐘', pairId: 'elephant' },
    { id: 6, name: 'Lion', icon: '🦁', pairId: 'lion' },
    { id: 7, name: 'Giraffe', icon: '🦒', pairId: 'giraffe' },
    { id: 8, name: 'Dove', icon: '🕊️', pairId: 'dove' }
  ];

  // We shuffle on state load or keep it static but randomized
  const [gameAnimals, setGameAnimals] = useState(initialAnimals);
  const [selectedCardIndexes, setSelectedCardIndexes] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [isGameFinished, setIsGameFinished] = useState(false);

  // Explore Ark deck states
  const [selectedDeck, setSelectedDeck] = useState<string>('upper');

  const playSfx = (type: 'correct' | 'click' | 'victory') => {
    if (!sfxOn) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'correct') {
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880.00, audioCtx.currentTime + 0.1); // A5
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

  const handleCardClick = (index: number) => {
    if (selectedCardIndexes.length >= 2) return;
    if (selectedCardIndexes.includes(index)) return;
    if (matchedPairs.includes(gameAnimals[index].pairId)) return;

    playSfx('click');
    const newSelected = [...selectedCardIndexes, index];
    setSelectedCardIndexes(newSelected);

    if (newSelected.length === 2) {
      const firstAnimal = gameAnimals[newSelected[0]];
      const secondAnimal = gameAnimals[newSelected[1]];

      if (firstAnimal.pairId === secondAnimal.pairId) {
        // Matched!
        setTimeout(() => {
          setMatchedPairs((prev) => [...prev, firstAnimal.pairId]);
          setSelectedCardIndexes([]);
          playSfx('correct');

          // Check if all matched
          if (matchedPairs.length + 1 === 4) {
            setIsGameFinished(true);
            playSfx('victory');
            // Award coins & XP
            setStats({
              ...stats,
              coins: stats.coins + 100,
              xp: stats.xp + 150
            });
          }
        }, 500);
      } else {
        // Not matched, flip back
        setTimeout(() => {
          setSelectedCardIndexes([]);
        }, 1000);
      }
    }
  };

  const handleToggleNarration = () => {
    playSfx('click');
    if (isPlayingNarration) {
      window.speechSynthesis.cancel();
      setIsPlayingNarration(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(NOAH_ARK_STORY.englishText);
      utterance.onend = () => setIsPlayingNarration(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingNarration(true);
    }
  };

  const handleResetGatherGame = () => {
    playSfx('click');
    setGameAnimals(initialAnimals.sort(() => Math.random() - 0.5));
    setSelectedCardIndexes([]);
    setMatchedPairs([]);
    setIsGameFinished(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex flex-col relative bg-surface-container-low/10 overflow-hidden select-none">
      {/* Top Breadcrumb Navigation */}
      <div className="w-full flex justify-between items-center px-4 md:px-10 py-3 bg-white border-b border-outline-variant/30 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              window.speechSynthesis.cancel();
              setCurrentTab('home');
            }}
            className="p-2 hover:bg-surface-container rounded-full transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
          <h1 className="font-serif text-lg md:text-xl text-primary font-bold">Noah's Ark Story Adventure</h1>
        </div>

        {/* Progress Timeline Nodes */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center">
            <div className="w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-primary/20"></div>
            <div className="w-12 h-1 bg-primary"></div>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
            <div className="w-12 h-1 bg-outline-variant/30"></div>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
            <div className="w-12 h-1 bg-outline-variant/30"></div>
          </div>
          <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end text-right">
            <span className="font-sans font-bold text-xs text-primary">Noah's Ark</span>
            <span className="text-[10px] text-on-surface-variant">Quest Part 1 of 4</span>
          </div>
          <Award className="w-6 h-6 text-gold-accent fill-gold-accent animate-pulse" />
        </div>
      </div>

      {/* Main Story Canvas Frame */}
      {activeSubScene === 'main' && (
        <div className="flex-grow relative h-[500px] md:h-[600px] overflow-hidden flex flex-col justify-end">
          {/* Majestic Illustration Background */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-in-out scale-105"
            style={{ backgroundImage: `url('${NOAH_ARK_STORY.image}')` }}
          />
          {/* Atmospheric ambient overlay to match visual theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/10 to-transparent z-0 pointer-events-none" />

          {/* Reward preview pill card (Top Left Overlay) */}
          <div className="absolute top-6 left-6 md:left-10 z-20">
            <div className="glass-panel p-4 rounded-2xl flex items-center gap-4 border-l-4 border-gold-accent shadow-lg">
              <div className="w-10 h-10 bg-gold-accent/15 rounded-full flex items-center justify-center text-gold-accent">
                <Sparkles className="w-5 h-5 fill-gold-accent text-gold-accent" />
              </div>
              <div>
                <p className="font-sans font-bold text-xs text-on-surface">Quest Potential</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-on-surface-variant font-semibold">+{NOAH_ARK_STORY.xpBonus} XP</span>
                  <span className="text-[10px] text-on-surface-variant">•</span>
                  <span className="text-[10px] font-bold text-primary">{NOAH_ARK_STORY.badgeName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Narration controls drawer overlay (Top Right) */}
          <div className="absolute top-6 right-6 md:right-10 z-20">
            <div className="glass-panel p-2 rounded-2xl flex flex-row md:flex-col gap-2 shadow-lg items-center">
              <button 
                onClick={handleToggleNarration}
                className={`p-3 rounded-xl transition-all cursor-pointer ${
                  isPlayingNarration ? 'bg-error text-white animate-pulse' : 'bg-primary text-on-primary hover:bg-primary-container'
                }`}
                title={isPlayingNarration ? 'Stop Audio' : 'Play Narration'}
              >
                <Volume2 className="w-5 h-5" />
              </button>
              <div className="w-[1px] md:w-8 h-8 md:h-[1px] bg-outline-variant/30 mx-1 md:mx-0"></div>
              <button 
                onClick={() => setLang(lang === 'en' ? 'kn' : 'en')}
                className="p-2.5 text-primary hover:bg-white rounded-lg transition-all cursor-pointer flex items-center justify-center"
                title="Toggle Text Language"
              >
                <Languages className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase ml-1">{lang}</span>
              </button>
            </div>
          </div>

          {/* Interactive narration text + choices footer */}
          <section className="relative z-10 px-4 md:px-10 pb-8 w-full max-w-container-max mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              {/* Narrative Glassmorphic Box */}
              <div className="lg:col-span-8 glass-panel p-6 md:p-8 rounded-3xl shadow-2xl max-h-[250px] md:max-h-[300px] overflow-y-auto">
                <div className="flex flex-col gap-4">
                  {lang === 'en' ? (
                    <div>
                      <h2 className="font-serif text-primary text-xl md:text-2xl font-bold mb-2">{NOAH_ARK_STORY.chapter}</h2>
                      <p className="font-serif text-sm md:text-base leading-relaxed text-on-surface">
                        {NOAH_ARK_STORY.englishText}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h2 className="font-kannada text-primary text-lg md:text-xl font-bold mb-2">ಮಹಾ ನಾವೆ</h2>
                      <p className="font-kannada text-sm md:text-base leading-relaxed text-on-surface">
                        {NOAH_ARK_STORY.kannadaText}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Choices Bento Board */}
              <div className="lg:col-span-4 flex flex-col gap-4 w-full">
                <button 
                  onClick={() => {
                    playSfx('click');
                    setActiveSubScene('gather');
                  }}
                  className="group w-full bg-primary hover:bg-primary/95 text-on-primary py-4 px-5 rounded-2xl flex items-center justify-between shadow-xl cursor-pointer hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="text-3xl">🐾</div>
                    <div>
                      <span className="block font-sans font-bold text-sm md:text-base text-white">Gather Animals</span>
                      <span className="text-[10px] text-primary-fixed-dim">Flock animals into the Ark pairs</span>
                    </div>
                  </div>
                </button>

                <button 
                  onClick={() => {
                    playSfx('click');
                    setActiveSubScene('explore');
                  }}
                  className="group w-full bg-white hover:bg-surface-container-low text-primary border-2 border-primary/25 py-4 px-5 rounded-2xl flex items-center justify-between shadow-lg cursor-pointer hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="text-3xl">🚢</div>
                    <div>
                      <span className="block font-sans font-bold text-sm md:text-base text-primary">Explore the Ark</span>
                      <span className="text-[10px] text-on-surface-variant font-semibold">Examine blueprint deck layout</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Gather Animals pairs matching game overlay */}
      {activeSubScene === 'gather' && (
        <div className="flex-grow p-6 md:p-10 flex flex-col items-center justify-center animate-fade-in bg-surface-container-low/40">
          <div className="bg-white rounded-[32px] p-6 md:p-8 max-w-xl w-full shadow-2xl border border-outline-variant/30 flex flex-col">
            <div className="flex justify-between items-center mb-6 border-b border-outline-variant/20 pb-4">
              <div>
                <h2 className="text-xl font-bold text-primary">Gather Animals into the Ark!</h2>
                <p className="text-xs text-on-surface-variant font-medium">Match animal pairs to guide them safely aboard.</p>
              </div>
              <button 
                onClick={() => {
                  playSfx('click');
                  setActiveSubScene('main');
                }}
                className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Matching Grid */}
            {!isGameFinished ? (
              <div className="grid grid-cols-4 gap-4 mb-6">
                {gameAnimals.map((animal, idx) => {
                  const isSelected = selectedCardIndexes.includes(idx);
                  const isMatched = matchedPairs.includes(animal.pairId);

                  return (
                    <button
                      key={idx}
                      onClick={() => handleCardClick(idx)}
                      disabled={isMatched}
                      className={`h-24 md:h-28 rounded-2xl border-2 flex items-center justify-center text-4xl cursor-pointer transition-all ${
                        isMatched 
                          ? 'bg-emerald-50 border-emerald-300 opacity-60' 
                          : isSelected 
                            ? 'bg-primary/5 border-primary scale-105' 
                            : 'bg-surface-container border-outline-variant/40 hover:border-primary/30 hover:bg-white'
                      }`}
                    >
                      {isSelected || isMatched ? animal.icon : '❓'}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 animate-fade-in">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4 border border-emerald-200">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-1">Quest Completed!</h3>
                <p className="text-xs text-on-surface-variant font-semibold mb-6">You have successfully gathered the animals and earned your reward!</p>

                <div className="flex items-center justify-center gap-4 bg-gold-accent/10 p-4 rounded-xl max-w-sm mx-auto mb-6">
                  <Award className="w-6 h-6 text-gold-accent fill-gold-accent" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-on-surface">Ark Badge Unlocked</p>
                    <p className="text-[10px] text-outline font-semibold">+100 Coins • +150 XP Added</p>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={handleResetGatherGame}
                    className="px-6 py-2 border border-outline-variant hover:border-primary/30 rounded-lg text-xs font-bold text-on-surface-variant cursor-pointer"
                  >
                    Play Again
                  </button>
                  <button 
                    onClick={() => setActiveSubScene('main')}
                    className="px-8 py-2 bg-primary text-white rounded-lg text-xs font-bold cursor-pointer"
                  >
                    Back to Story
                  </button>
                </div>
              </div>
            )}

            {!isGameFinished && (
              <div className="flex justify-between items-center text-xs text-on-surface-variant font-bold">
                <span>Matched: {matchedPairs.length} of 4 pairs</span>
                <button 
                  onClick={handleResetGatherGame}
                  className="text-primary hover:underline cursor-pointer"
                >
                  Reset Board
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Explore Ark blueprint overlays */}
      {activeSubScene === 'explore' && (
        <div className="flex-grow p-6 md:p-10 flex flex-col items-center justify-center animate-fade-in bg-surface-container-low/40">
          <div className="bg-white rounded-[32px] p-6 md:p-8 max-w-2xl w-full shadow-2xl border border-outline-variant/30 flex flex-col">
            <div className="flex justify-between items-center mb-6 border-b border-outline-variant/20 pb-4">
              <div>
                <h2 className="text-xl font-bold text-primary">Ark Structure & Deck Explorer</h2>
                <p className="text-xs text-on-surface-variant font-medium">Click on each level to inspect Noah's engineering details.</p>
              </div>
              <button 
                onClick={() => {
                  playSfx('click');
                  setActiveSubScene('main');
                }}
                className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Section layout map */}
            <div className="flex flex-col gap-4 mb-6">
              {[
                { id: 'upper', title: 'Upper Deck (Top Level)', desc: 'Housing quarters for Noah\'s family, small avian bird nesting cages, and fresh air roof vents.' },
                { id: 'middle', title: 'Middle Deck (Mid level)', desc: 'Stalls for larger domestic animals, grain feeding troughs, and dynamic water drainage pipelines.' },
                { id: 'lower', title: 'Lower Deck (Bottom Base)', desc: 'Heavy feed bag storage, water silos, cargo hold ballast tanks, and large mammalian enclosures.' }
              ].map((deck) => {
                const isSelected = selectedDeck === deck.id;

                return (
                  <button
                    key={deck.id}
                    onClick={() => {
                      playSfx('click');
                      setSelectedDeck(deck.id);
                    }}
                    className={`p-4 rounded-xl border-2 text-left cursor-pointer transition-all ${
                      isSelected 
                        ? 'gold-border bg-primary/5 border-primary' 
                        : 'bg-surface-container-low border-transparent hover:border-outline-variant/30 hover:bg-white'
                    }`}
                  >
                    <h3 className="font-bold text-sm text-primary mb-1 flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-secondary" />
                      {deck.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant font-medium">{deck.desc}</p>
                  </button>
                );
              })}
            </div>

            <div className="bg-secondary-container/10 border border-secondary/20 p-4 rounded-xl text-xs text-secondary-container font-semibold flex items-center gap-3">
              <span className="text-2xl">📐</span>
              <div>
                <p className="font-bold text-on-secondary-container">Dimensions & Materials</p>
                <p className="text-on-secondary-container/80 text-[11px] font-semibold mt-0.5">Length: 300 cubits (450 ft) • Width: 50 cubits (75 ft) • Height: 30 cubits (45 ft). Built with cypress wood and coated inside & out with pine pitch.</p>
              </div>
            </div>

            <button 
              onClick={() => setActiveSubScene('main')}
              className="mt-6 py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:opacity-95 transition-all cursor-pointer text-center"
            >
              Resume Story
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
