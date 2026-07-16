import { useState, useEffect } from 'react';
import { Tab, UserStats, Question } from '../types';
import { QUIZ_LEVELS, QuizLevel } from '../data';
import { 
  Languages, 
  Lightbulb, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Flame, 
  Lock, 
  Award, 
  Coins, 
  Sparkles, 
  RotateCcw,
  BookOpen,
  ChevronLeft,
  Gamepad2,
  Trophy,
  Play
} from 'lucide-react';

interface QuizTabProps {
  stats: UserStats;
  setStats: (stats: UserStats | ((prev: UserStats) => UserStats)) => void;
  lang: 'en' | 'kn';
  setLang: (lang: 'en' | 'kn') => void;
  quizMode: string;
  setQuizMode: (mode: string) => void;
  setCurrentTab: (tab: Tab) => void;
  sfxOn: boolean;
}

export default function QuizTab({
  stats,
  setStats,
  lang,
  setLang,
  quizMode,
  setQuizMode,
  setCurrentTab,
  sfxOn
}: QuizTabProps) {
  
  // Find current active level
  const activeLevel = QUIZ_LEVELS.find(lvl => lvl.id === quizMode);
  const questions = activeLevel ? activeLevel.questions : [];
  const quizTitle = activeLevel 
    ? (lang === 'en' ? activeLevel.title : activeLevel.titleKannada) 
    : "Scripture Quiz";

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Shuffled options mapping state
  // We keep track of the option text and its original position index in raw questions
  const [shuffledOptions, setShuffledOptions] = useState<{ text: string; originalIndex: number }[]>([]);
  const [selectedShuffledIndex, setSelectedShuffledIndex] = useState<number | null>(null);
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false);
  const [eliminatedShuffledIndexes, setEliminatedShuffledIndexes] = useState<number[]>([]);
  const [wrongShuffledIndexes, setWrongShuffledIndexes] = useState<number[]>([]);
  const [shakeShuffledIndex, setShakeShuffledIndex] = useState<number | null>(null);

  // Timer states
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizCorrectAnswersCount, setQuizCorrectAnswersCount] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  // Jumble the options every time the question index or active question changes
  useEffect(() => {
    if (!currentQuestion) {
      setShuffledOptions([]);
      return;
    }
    
    // Map with original indices
    const mapped = currentQuestion.options.map((optionText, idx) => ({
      text: optionText,
      originalIndex: idx
    }));

    // Fisher-Yates shuffle algorithm
    const shuffled = [...mapped];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setShuffledOptions(shuffled);
  }, [currentQuestionIndex, quizMode, currentQuestion]);

  // Timer logic
  useEffect(() => {
    if (!activeLevel || quizCompleted || isAnswerConfirmed) return;

    if (timeLeft <= 0) {
      handleConfirmAnswer(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizCompleted, isAnswerConfirmed, activeLevel]);

  // Reset helper triggers on question change
  useEffect(() => {
    setTimeLeft(30);
    setSelectedShuffledIndex(null);
    setIsAnswerConfirmed(false);
    setEliminatedShuffledIndexes([]);
    setWrongShuffledIndexes([]);
    setShakeShuffledIndex(null);
  }, [currentQuestionIndex, quizMode]);

  // Audio effects synthesizer generator
  const playSfx = (type: 'correct' | 'wrong' | 'click' | 'victory') => {
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
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } else if (type === 'wrong') {
        osc.frequency.setValueAtTime(220.00, audioCtx.currentTime); // A3
        osc.frequency.setValueAtTime(146.83, audioCtx.currentTime + 0.1); // D3
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } else if (type === 'click') {
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      } else if (type === 'victory') {
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
        osc.frequency.setValueAtTime(1046.50, audioCtx.currentTime + 0.3); // C6
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
      }
    } catch (e) {
      // Audio failed, fallback gracefully
    }
  };

  const handleSelectOption = (shuffledIndex: number) => {
    if (isAnswerConfirmed) return;
    if (eliminatedShuffledIndexes.includes(shuffledIndex)) return;
    playSfx('click');
    setSelectedShuffledIndex(shuffledIndex);
  };

  const handleConfirmAnswer = (isTimeout = false) => {
    if (isAnswerConfirmed) return;

    let finalShuffledIndex = selectedShuffledIndex;
    if (isTimeout || finalShuffledIndex === null) {
      finalShuffledIndex = -1;
    }

    // Determine correctness by checking the mapped originalIndex
    let isCorrect = false;
    if (finalShuffledIndex !== -1 && shuffledOptions[finalShuffledIndex]) {
      const originalIndex = shuffledOptions[finalShuffledIndex].originalIndex;
      isCorrect = originalIndex === currentQuestion.correctIndex;
    }

    if (isCorrect) {
      setQuizCorrectAnswersCount((prev) => prev + 1);
      setCoinsEarned((prev) => prev + 15);
      setXpEarned((prev) => prev + 25);
      playSfx('correct');
    } else {
      if (finalShuffledIndex !== -1) {
        setWrongShuffledIndexes((prev) => [...prev, finalShuffledIndex!]);
        setShakeShuffledIndex(finalShuffledIndex);
        setTimeout(() => setShakeShuffledIndex(null), 300);
      }
      playSfx('wrong');
    }

    setIsAnswerConfirmed(true);
  };

  const handleUseHint = () => {
    if (isAnswerConfirmed) return;
    if (stats.coins < 5) return; // not enough coins
    if (eliminatedShuffledIndexes.length > 0) return; // hint already used

    playSfx('click');
    
    // Find correct option index inside shuffledOptions
    const correctShuffledIdx = shuffledOptions.findIndex(
      opt => opt.originalIndex === currentQuestion.correctIndex
    );

    // List wrong shuffled indices
    const wrongShuffledIndices = shuffledOptions
      .map((_, idx) => idx)
      .filter(idx => idx !== correctShuffledIdx);

    // Choose 2 random wrong options to eliminate
    const shuffledWrong = wrongShuffledIndices.sort(() => 0.5 - Math.random());
    const toEliminate = shuffledWrong.slice(0, 2);

    setEliminatedShuffledIndexes(toEliminate);

    // Subtract 5 coins from user balance
    setStats((prev) => ({
      ...prev,
      coins: Math.max(0, prev.coins - 5)
    }));
  };

  const handleNextQuestion = () => {
    playSfx('click');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Quiz complete!
      setQuizCompleted(true);
      playSfx('victory');

      // Update persistent stats with specific Level payouts + check Level-up
      setStats((prev) => {
        const addedCoins = coinsEarned + (activeLevel ? activeLevel.coinReward : 20);
        const addedXp = xpEarned + (activeLevel ? activeLevel.xpReward : 50);
        
        const nextXp = prev.xp + addedXp;
        // Formula: 500 XP per Level, base starting level retained
        const nextLevelCalculated = Math.floor(nextXp / 500) + 1;
        const nextLevel = Math.max(prev.level, nextLevelCalculated);

        return {
          ...prev,
          coins: prev.coins + addedCoins,
          xp: nextXp,
          level: nextLevel
        };
      });
    }
  };

  const handleSkipQuestion = () => {
    playSfx('click');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
      playSfx('victory');
      
      setStats((prev) => {
        const addedCoins = coinsEarned;
        const addedXp = xpEarned;
        
        const nextXp = prev.xp + addedXp;
        const nextLevelCalculated = Math.floor(nextXp / 500) + 1;
        const nextLevel = Math.max(prev.level, nextLevelCalculated);

        return {
          ...prev,
          coins: prev.coins + addedCoins,
          xp: nextXp,
          level: nextLevel
        };
      });
    }
  };

  const handleRestartQuiz = () => {
    playSfx('click');
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    setQuizCorrectAnswersCount(0);
    setCoinsEarned(0);
    setXpEarned(0);
    setSelectedShuffledIndex(null);
    setIsAnswerConfirmed(false);
    setEliminatedShuffledIndexes([]);
    setWrongShuffledIndexes([]);
    setTimeLeft(30);
  };

  // Timer circle configurations
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / 30) * circumference;

  // --- RENDERING LEVEL SELECT GRID ---
  if (!activeLevel) {
    return (
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-12 px-4 animate-fade-in">
        {/* Banner */}
        <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Gamepad2 className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Interactive Quest Board</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Select Scripture Mission</h1>
            <p className="text-xs md:text-sm text-on-surface-variant font-medium max-w-xl">
              Complete dynamic quests, earn experience points (XP) to level up your traveler rank, and gain gold coins to unlock hints!
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-outline-variant/30 shadow-sm">
            <Trophy className="w-5 h-5 text-secondary" />
            <div>
              <p className="text-[10px] text-outline font-bold uppercase">Current Rank</p>
              <p className="font-serif text-sm font-bold text-primary">Level {stats.level} Explorer</p>
            </div>
          </div>
        </div>

        {/* Level List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUIZ_LEVELS.map((level) => {
            const isLocked = stats.level < level.requiredLevel;
            const diffColor = 
              level.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
              level.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800 border-amber-200' :
              level.difficulty === 'Hard' ? 'bg-red-100 text-red-800 border-red-200' :
              'bg-purple-100 text-purple-800 border-purple-200';

            return (
              <div 
                key={level.id}
                className={`group glass-panel rounded-3xl p-6 border-2 transition-all flex flex-col justify-between ${
                  isLocked 
                    ? 'border-slate-200 bg-slate-50/50 opacity-80' 
                    : 'border-white/60 bg-white hover:border-primary/30 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-outline">MISSION {level.levelNumber}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${diffColor}`}>
                      {level.difficulty}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1">
                    {lang === 'en' ? level.title : level.titleKannada}
                  </h3>

                  <p className="text-[11px] text-slate-500 font-medium mt-2 line-clamp-3 leading-relaxed">
                    {lang === 'en' ? level.description : level.descriptionKannada}
                  </p>

                  <div className="flex items-center gap-4 mt-4 py-2 border-y border-outline-variant/10 text-[11px] font-bold text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-secondary fill-secondary" />
                      +{level.xpReward} XP
                    </span>
                    <span className="flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5 text-gold-accent fill-gold-accent" />
                      +{level.coinReward} Coins
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  {isLocked ? (
                    <div className="flex items-center justify-center gap-2 py-3 bg-slate-100 text-slate-400 rounded-xl font-bold text-xs">
                      <Lock className="w-4 h-4" />
                      Requires Level {level.requiredLevel}
                    </div>
                  ) : (
                    <button
                      onClick={() => { playSfx('click'); setQuizMode(level.id); }}
                      className="w-full py-3 bg-primary text-white rounded-xl font-bold text-xs hover:bg-primary/90 hover:shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      Start Quest
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- RENDERING QUIZ COMPLETED BOARD ---
  if (quizCompleted) {
    return (
      <div className="w-full max-w-4xl mx-auto py-8 px-4 flex flex-col items-center justify-center animate-fade-in">
        <div className="glass-panel rounded-[32px] p-10 shadow-2xl border-2 border-white/60 max-w-2xl w-full text-center bg-white">
          <div className="w-24 h-24 bg-gold-accent/15 rounded-full flex items-center justify-center text-gold-accent mx-auto mb-6 coin-animation border-2 border-gold-accent/30">
            <Award className="w-12 h-12 fill-gold-accent" />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold mb-2">Quest Completed!</h2>
          <p className="text-on-surface-variant font-medium mb-6">Awesome efforts on completing {quizTitle}!</p>

          <div className="grid grid-cols-3 gap-4 mb-8 bg-surface-container-low/40 p-5 rounded-2xl border border-outline-variant/20">
            <div className="text-center">
              <p className="text-[10px] text-outline font-bold uppercase tracking-wider mb-1">Score</p>
              <p className="text-xl md:text-2xl font-bold text-primary">{quizCorrectAnswersCount} / {questions.length}</p>
            </div>
            <div className="text-center border-x border-outline-variant/20">
              <p className="text-[10px] text-outline font-bold uppercase tracking-wider mb-1">XP Earned</p>
              <p className="text-xl md:text-2xl font-bold text-secondary flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4 text-secondary fill-secondary" />
                +{xpEarned + activeLevel.xpReward}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-outline font-bold uppercase tracking-wider mb-1">Coins Earned</p>
              <p className="text-xl md:text-2xl font-bold text-gold-accent flex items-center justify-center gap-1">
                <Coins className="w-4 h-4 text-gold-accent fill-gold-accent" />
                +{coinsEarned + activeLevel.coinReward}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={handleRestartQuiz}
              className="w-full sm:w-auto px-8 py-3 bg-white border border-slate-200 hover:border-primary/40 rounded-full text-on-surface-variant hover:text-primary font-bold text-sm cursor-pointer transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Play Again
            </button>
            <button 
              onClick={() => {
                playSfx('click');
                setQuizMode(''); // Return back to mission select board
              }}
              className="w-full sm:w-auto px-10 py-3 bg-primary text-white rounded-full font-bold text-sm hover:brightness-110 shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              Back to Level Missions
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDERING ACTIVE QUIZ GAME BOARD ---
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 pb-12 px-4 select-none animate-fade-in">
      {/* Progress Header Card */}
      <section className="glass-panel rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-slate-150">
        <div className="flex items-center gap-4">
          <button
            onClick={() => { playSfx('click'); setQuizMode(''); }}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 hover:text-primary transition-colors cursor-pointer"
            title="Return to missions board"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Animated countdown timer */}
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle 
                className="text-slate-100" 
                cx="32" 
                cy="32" 
                fill="transparent" 
                r="28" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <circle 
                className={`transition-all duration-1000 ${
                  timeLeft < 10 ? 'text-red-500' : 'text-primary'
                }`} 
                cx="32" 
                cy="32" 
                fill="transparent" 
                r="28" 
                stroke="currentColor" 
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-sm font-bold ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-primary'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-sm md:text-base font-bold text-primary">{quizTitle}</h2>
            <p className="text-on-surface-variant text-[10px] md:text-xs font-semibold">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
        </div>

        {/* Progress bar level indicator */}
        <div className="flex-grow max-w-xs w-full px-4">
          <div className="flex justify-between mb-1">
            <span className="text-[10px] font-bold text-on-surface-variant">QUIZ PROGRESS</span>
            <span className="text-[10px] font-bold text-primary">{currentQuestionIndex + 1} / {questions.length}</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full progress-gradient rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Kannada language toggle */}
        <button 
          id="quiz-lang-toggle"
          className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full hover:bg-slate-100 transition-colors cursor-pointer text-xs font-bold"
          onClick={() => setLang(lang === 'en' ? 'kn' : 'en')}
        >
          <Languages className="w-4 h-4 text-[20px]" />
          <span id="lang-toggle-text">
            {lang === 'en' ? 'Kannada' : 'Show English Only'}
          </span>
        </button>
      </section>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Side: Question Panel */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {/* Question Area Card */}
          <section className="glass-panel rounded-[32px] p-8 md:p-10 shadow-xl border-2 border-white/60 relative overflow-hidden bg-white">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <BookOpen className="w-24 h-24 text-primary" />
            </div>

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full mb-4 uppercase tracking-wider">
                {currentQuestion.topic}
              </span>
              <h1 className="font-serif text-xl md:text-2xl text-on-surface leading-snug" id="question-text">
                {currentQuestion.question}
              </h1>
              
              {lang === 'kn' && currentQuestion.questionKannada && (
                <div className="mt-4 font-kannada text-base md:text-lg text-on-surface-variant border-t border-slate-100 pt-4" id="kannada-text">
                  {currentQuestion.questionKannada}
                </div>
              )}
            </div>
          </section>

          {/* Shuffled Options Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shuffledOptions.map((option, index) => {
              const letter = String.fromCharCode(65 + index); // A, B, C, D
              
              // Determine flags
              const isSelected = selectedShuffledIndex === index;
              const isEliminated = eliminatedShuffledIndexes.includes(index);
              const isWrong = wrongShuffledIndexes.includes(index);
              const isCorrectAnswer = option.originalIndex === currentQuestion.correctIndex;

              // Styling selection
              let cardStyle = "border-slate-100 bg-white hover:border-primary/20 hover:shadow-md";
              let badgeStyle = "bg-slate-50 text-slate-500 group-hover:bg-primary group-hover:text-white";
              let iconElement = null;

              if (isEliminated) {
                cardStyle = "opacity-35 cursor-not-allowed pointer-events-none bg-slate-50 border-transparent";
              } else if (isAnswerConfirmed) {
                if (isCorrectAnswer) {
                  cardStyle = "gold-border bg-emerald-500/10 border-emerald-500 text-emerald-900";
                  badgeStyle = "bg-emerald-500 text-white";
                  iconElement = <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />;
                } else if (isSelected && !isCorrectAnswer) {
                  cardStyle = "border-red-500 bg-red-50 text-red-900";
                  badgeStyle = "bg-red-500 text-white";
                  iconElement = <XCircle className="w-5 h-5 text-red-600 fill-red-100" />;
                }
              } else if (isSelected) {
                cardStyle = "gold-border bg-primary/5 border-primary text-primary";
                badgeStyle = "bg-primary text-white";
              }

              const isShaking = shakeShuffledIndex === index;

              return (
                <button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  disabled={isEliminated || isAnswerConfirmed}
                  className={`group glass-panel p-5 rounded-2xl border-2 transition-all flex items-center justify-between text-left cursor-pointer active:scale-[0.98] ${cardStyle} ${
                    isShaking ? 'shake-animation' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-colors duration-200 ${badgeStyle}`}>
                      {letter}
                    </div>
                    <span className="text-sm font-semibold text-on-surface">{option.text}</span>
                  </div>
                  {iconElement}
                </button>
              );
            })}
          </section>

          {/* Quiz Actions */}
          <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
            <button 
              onClick={handleSkipQuestion}
              className="w-full sm:w-auto px-8 py-3 rounded-full border border-slate-200 hover:border-primary/40 text-on-surface-variant hover:text-primary font-bold text-xs transition-colors cursor-pointer bg-white"
            >
              Skip Question
            </button>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button 
                onClick={handleUseHint}
                disabled={stats.coins < 5 || eliminatedShuffledIndexes.length > 0 || isAnswerConfirmed}
                className="flex-grow sm:flex-grow-0 px-6 py-3 rounded-full bg-slate-50 text-slate-600 font-bold text-xs border border-slate-200 flex items-center justify-center gap-2 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                title="Eliminate two wrong answers"
              >
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Hint
                <span className="flex items-center gap-0.5 ml-2 px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] rounded-lg">
                  <Coins className="w-3 h-3 fill-slate-500 text-slate-500" /> 5
                </span>
              </button>

              {!isAnswerConfirmed ? (
                <button 
                  onClick={() => handleConfirmAnswer()}
                  disabled={selectedShuffledIndex === null}
                  className="flex-grow sm:flex-grow-0 px-10 py-3 rounded-full bg-primary text-white font-bold text-xs hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none active:scale-95 transition-all cursor-pointer"
                >
                  Confirm Answer
                </button>
              ) : (
                <button 
                  onClick={handleNextQuestion}
                  className="flex-grow sm:flex-grow-0 px-10 py-3 rounded-full bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 hover:shadow-lg active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </footer>
        </div>

        {/* Right Side: Streak & Level Quest rewards */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <div className="glass-panel rounded-3xl p-6 border-l-4 border-red-500 bg-white shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-sm text-on-surface">Daily Streak</h4>
                <p className="text-[10px] text-on-surface-variant font-semibold font-sans">Keep playing to maintain your streak!</p>
              </div>
              <Flame className="w-8 h-8 fill-red-500 text-red-500" />
            </div>

            <div className="flex justify-between gap-2">
              {[
                { day: 'M', checked: true },
                { day: 'T', checked: true },
                { day: 'W', checked: false, text: String(stats.streak) },
                { day: 'T', checked: false },
                { day: 'F', checked: false },
                { day: 'S', checked: false },
                { day: 'S', checked: false }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-on-surface-variant font-bold">{item.day}</span>
                  {item.checked ? (
                    <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">✓</div>
                  ) : item.text ? (
                    <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-extrabold shadow-sm">{item.text}</div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 bg-white shadow-sm border border-slate-150">
            <h4 className="font-bold text-sm text-on-surface mb-4">Active Level Bonuses</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100 shadow-sm">
                  <Sparkles className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                </div>
                <div>
                  <p className="text-xs font-bold">Mission Completion XP</p>
                  <p className="text-[10px] text-slate-500 font-semibold">+{activeLevel.xpReward} XP payout</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100 shadow-sm">
                  <Coins className="w-5 h-5 text-amber-500 fill-amber-100 animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-bold">Mission Completion Coins</p>
                  <p className="text-[10px] text-slate-500 font-semibold">+{activeLevel.coinReward} Gold coins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
