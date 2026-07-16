import React, { useState, useEffect } from 'react';
import { Tab, UserStats } from '../types';
import { 
  Gamepad2, 
  Sparkles, 
  Coins, 
  HelpCircle, 
  BookOpen, 
  MapPin, 
  HelpCircle as QuestionIcon, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  RotateCcw,
  Volume2, 
  VolumeX, 
  Award, 
  ChevronLeft, 
  Search,
  Check,
  Compass,
  ArrowRight,
  Shield,
  Zap,
  Lock,
  MessageSquare
} from 'lucide-react';
import {
  charFindQuestions,
  matchRounds,
  scrambleVerses,
  riddles,
  guessWords,
  tfQuestions,
  blanksQuestions,
  oddOneQuestions,
  bookOrderQuestions,
  mapLandmarksQuestions
} from '../data/gamesData';
import {
  charFindQuestionsKn,
  matchRoundsKn,
  scrambleVersesKn,
  riddlesKn,
  guessWordHintsKn,
  tfQuestionsKn,
  blanksQuestionsKn,
  oddOneQuestionsKn,
  bookOrderQuestionsKn,
  mapLandmarksQuestionsKn
} from '../data/gamesDataKn';

interface GamesTabProps {
  stats: UserStats;
  setStats: (stats: UserStats | ((prev: UserStats) => UserStats)) => void;
  lang: 'en' | 'kn';
  setLang: (lang: 'en' | 'kn') => void;
  sfxOn: boolean;
  setCurrentTab: (tab: Tab) => void;
}

interface GameDefinition {
  id: string;
  title: string;
  titleKn: string;
  description: string;
  descriptionKn: string;
  icon: React.ReactNode;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xpReward: number;
  coinReward: number;
}

export default function GamesTab({
  stats,
  setStats,
  lang,
  setLang,
  sfxOn,
  setCurrentTab
}: GamesTabProps) {

  // --- AUDIO SYNTHESIZER ---
  const playSfx = (type: 'correct' | 'wrong' | 'click' | 'victory' | 'match') => {
    if (!sfxOn) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'correct') {
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.08); // E5
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.22);
      } else if (type === 'wrong') {
        osc.frequency.setValueAtTime(220.00, audioCtx.currentTime); // A3
        osc.frequency.setValueAtTime(146.83, audioCtx.currentTime + 0.08); // D3
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } else if (type === 'click') {
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.04);
      } else if (type === 'match') {
        osc.frequency.setValueAtTime(392.00, audioCtx.currentTime); // G4
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime + 0.08); // C5
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      } else if (type === 'victory') {
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.16); // G5
        osc.frequency.setValueAtTime(1046.50, audioCtx.currentTime + 0.24); // C6
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      }
    } catch (e) {}
  };

  // State to manage which game is actively running
  const [activeGameId, setActiveGameId] = useState<string | null>(null);

  // General game session state
  const [gameState, setGameState] = useState<any>({
    score: 0,
    currentStep: 0,
    isCompleted: false,
    earnedXp: 0,
    earnedCoins: 0,
    history: []
  });

  const gamesList: GameDefinition[] = [
    {
      id: 'char_find',
      title: 'Character Finding',
      titleKn: 'ಪಾತ್ರ ಹುಡುಕಾಟ',
      description: 'Find the famous Biblical character using progressive clues and references.',
      descriptionKn: 'ಸುಳಿವುಗಳನ್ನು ಆಧರಿಸಿ ಪ್ರಸಿದ್ಧ ಬೈಬಲ್ ಪಾತ್ರವನ್ನು ಗುರುತಿಸಿ.',
      icon: <Search className="w-6 h-6 text-primary" />,
      difficulty: 'Easy',
      xpReward: 30,
      coinReward: 15
    },
    {
      id: 'word_match',
      title: 'Word Matching',
      titleKn: 'ಪದ ಹೊಂದಾಣಿಕೆ',
      description: 'Match Biblical terms, structures, and events to their definitions.',
      descriptionKn: 'ಬೈಬಲ್ ನಿಯಮಗಳು ಮತ್ತು ಸನ್ನಿವೇಶಗಳನ್ನು ಅವುಗಳ ಅರ್ಥಗಳಿಗೆ ಹೊಂದಿಸಿ.',
      icon: <RefreshCw className="w-6 h-6 text-secondary" />,
      difficulty: 'Medium',
      xpReward: 40,
      coinReward: 20
    },
    {
      id: 'verse_scramble',
      title: 'Verse Scramble',
      titleKn: 'ವಚನ ಜೋಡಣೆ',
      description: 'Arrange scrambled scripture words back into their famous inspiring sequence.',
      descriptionKn: 'ಅಸ್ತವ್ಯಸ್ತಗೊಂಡಿರುವ ವಚನಗಳನ್ನು ಸರಿಯಾದ ಕ್ರಮದಲ್ಲಿ ಜೋಡಿಸಿ.',
      icon: <Compass className="w-6 h-6 text-amber-500" />,
      difficulty: 'Medium',
      xpReward: 40,
      coinReward: 20
    },
    {
      id: 'who_am_i',
      title: 'Who Am I? (Riddles)',
      titleKn: 'ನಾನು ಯಾರು? (ಒಗಟುಗಳು)',
      description: 'Solve first-person scripture riddles. Test your critical deduction skill!',
      descriptionKn: 'ರಹಸ್ಯಮಯ ಬೈಬಲ್ ಒಗಟುಗಳನ್ನು ಬಿಡಿಸಿ ನಿಮ್ಮ ಜ್ಞಾನ ಪರೀಕ್ಷಿಸಿ.',
      icon: <HelpCircle className="w-6 h-6 text-purple-500" />,
      difficulty: 'Medium',
      xpReward: 45,
      coinReward: 20
    },
    {
      id: 'word_guess',
      title: 'Word Guess (Candlelight)',
      titleKn: 'ಪದ ಊಹೆ (ಕ್ಯಾಂಡಲ್ ಲೈಟ್)',
      description: 'Guess the key biblical vocabulary letter-by-letter before your candles burn out!',
      descriptionKn: 'ಕ್ಯಾಂಡಲ್ ಆರುವ ಮುನ್ನ ಬೈಬಲ್ ಪದದ ಅಕ್ಷರಗಳನ್ನು ಊಹಿಸಿ!',
      icon: <Zap className="w-6 h-6 text-red-500 animate-pulse" />,
      difficulty: 'Hard',
      xpReward: 50,
      coinReward: 25
    },
    {
      id: 'true_false',
      title: 'True or False Sprint',
      titleKn: 'ಸರಿ ಅಥವಾ ತಪ್ಪು ವೇಗ',
      description: 'A rapid-fire sprint to answer as many scripture statements as you can in 30 seconds.',
      descriptionKn: '೩೦ ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಎಷ್ಟು ಸರಿ/ತಪ್ಪು ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಲು ಸಾಧ್ಯವೋ ಉತ್ತರಿಸಿ.',
      icon: <Shield className="w-6 h-6 text-emerald-500" />,
      difficulty: 'Easy',
      xpReward: 35,
      coinReward: 15
    },
    {
      id: 'fill_blanks',
      title: 'Fill in the Blanks',
      titleKn: 'ಖಾಲಿ ಜಾಗ ತುಂಬಿ',
      description: 'Identify the missing critical words inside central encouraging verses.',
      descriptionKn: 'ಪ್ರಮುಖ ಬೈಬಲ್ ವಚನಗಳಲ್ಲಿ ಬಿಟ್ಟುಹೋದ ಪದಗಳನ್ನು ತುಂಬಿರಿ.',
      icon: <BookOpen className="w-6 h-6 text-indigo-500" />,
      difficulty: 'Easy',
      xpReward: 30,
      coinReward: 15
    },
    {
      id: 'odd_one',
      title: 'Odd One Out',
      titleKn: 'ಗುಂಪಿಗೆ ಸೇರದ ಪದ',
      description: 'Analyze four biblical books or characters and pinpoint the one that does not belong.',
      descriptionKn: 'ನಾಲ್ಕು ಪದಗಳಲ್ಲಿ ಉಳಿದವುಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗದ ಪದವನ್ನು ಪತ್ತೆಹಚ್ಚಿ.',
      icon: <XCircle className="w-6 h-6 text-orange-500" />,
      difficulty: 'Medium',
      xpReward: 35,
      coinReward: 15
    },
    {
      id: 'book_order',
      title: 'Bible Book Order',
      titleKn: 'ಪುಸ್ತಕಗಳ ಅನುಕ್ರಮ',
      description: 'Drag or tap Biblical books to place them in correct canonical chronological sequence.',
      descriptionKn: 'ಬೈಬಲ್ ಪುಸ್ತಕಗಳನ್ನು ಅವುಗಳ ನಿಖರವಾದ ಅನುಕ್ರಮದಲ್ಲಿ ಜೋಡಿಸಿ.',
      icon: <Award className="w-6 h-6 text-blue-500" />,
      difficulty: 'Hard',
      xpReward: 50,
      coinReward: 25
    },
    {
      id: 'map_landmarks',
      title: 'Map Landmarks Quiz',
      titleKn: 'ಭೂಪಟ ಹೆಗ್ಗುರುತುಗಳು',
      description: 'Match key historical miracles and revelations to their ancient Middle Eastern geographies.',
      descriptionKn: 'ಬೈಬಲ್ ಘಟನೆಗಳನ್ನು ಅವು ನಡೆದ ಐತಿಹಾಸಿಕ ಸ್ಥಳಗಳಿಗೆ ಹೊಂದಿಸಿ.',
      icon: <MapPin className="w-6 h-6 text-rose-500" />,
      difficulty: 'Medium',
      xpReward: 40,
      coinReward: 20
    }
  ];

  // Helper to add answered questions to history and save in localStorage
  const addAnswerToHistory = (questionText: string, correctAnswer: string, userAnswer: string, isCorrect: boolean) => {
    setGameState((prev: any) => {
      const filteredHistory = (prev.history || []).filter((h: any) => h.stepIndex !== prev.currentStep);
      const newHistoryItem = {
        stepIndex: prev.currentStep,
        questionText,
        correctAnswer,
        userAnswer,
        isCorrect
      };
      const nextHistory = [...filteredHistory, newHistoryItem].sort((a: any, b: any) => a.stepIndex - b.stepIndex);
      const nextState = {
        ...prev,
        history: nextHistory
      };
      
      const userId = localStorage.getItem('bible_quest_current_user_id') || 'default_user';
      if (activeGameId) {
        localStorage.setItem(`bible_quest_game_progress_${userId}_${activeGameId}`, JSON.stringify(nextState));
      }
      return nextState;
    });
  };

  // Trigger game rewards payout
  const handleGameComplete = (earnedXp: number, earnedCoins: number, score: number) => {
    playSfx('victory');
    setGameState((prev: any) => {
      const nextState = {
        ...prev,
        isCompleted: true,
        earnedXp,
        earnedCoins,
        score
      };
      const userId = localStorage.getItem('bible_quest_current_user_id') || 'default_user';
      if (activeGameId) {
        localStorage.setItem(`bible_quest_game_progress_${userId}_${activeGameId}`, JSON.stringify(nextState));
      }
      return nextState;
    });

    setStats((prev) => {
      const nextXp = prev.xp + earnedXp;
      const nextLevelCalculated = Math.floor(nextXp / 500) + 1;
      const nextLevel = Math.max(prev.level, nextLevelCalculated);
      return {
        ...prev,
        coins: prev.coins + earnedCoins,
        xp: nextXp,
        level: nextLevel
      };
    });
  };

  const handleResetGameSession = () => {
    playSfx('click');
    const newState = {
      score: 0,
      currentStep: 0,
      isCompleted: false,
      earnedXp: 0,
      earnedCoins: 0,
      history: []
    };
    setGameState(newState);
    
    const userId = localStorage.getItem('bible_quest_current_user_id') || 'default_user';
    if (activeGameId) {
      localStorage.removeItem(`bible_quest_game_progress_${userId}_${activeGameId}`);
    }
    
    // Trigger subgame-specific state resets
    setSubGameStates(0);
  };

  const handleBackToSelect = () => {
    playSfx('click');
    setActiveGameId(null);
  };

  const [lastDismissedCheckpoint, setLastDismissedCheckpoint] = useState<number>(-1);

  // --- SUB-GAME STATES DECLARATIONS ---
  const [charCluesShown, setCharCluesShown] = useState<number>(1);
  const [charFeedback, setCharFeedback] = useState<string | null>(null);

  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [matchedTerms, setMatchedTerms] = useState<string[]>([]);
  const [matchWrong, setMatchWrong] = useState<boolean>(false);

  const [scrambleAnswer, setScrambleAnswer] = useState<string[]>([]);
  const [scrambleFeedback, setScrambleFeedback] = useState<string | null>(null);

  const [riddleFeedback, setRiddleFeedback] = useState<string | null>(null);

  const [currentGuessWord, setCurrentGuessWord] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [livesLeft, setLivesLeft] = useState<number>(6);

  const [tfIndex, setTfIndex] = useState<number>(0);
  const [tfTimeLeft, setTfTimeLeft] = useState<number>(30);
  const [tfStreak, setTfStreak] = useState<number>(0);

  const [blanksFeedback, setBlanksFeedback] = useState<string | null>(null);

  const [oddSelected, setOddSelected] = useState<string | null>(null);

  const [currentOrder, setCurrentOrder] = useState<string[]>([]);
  const [orderFeedback, setOrderFeedback] = useState<string | null>(null);

  const [mapFeedback, setMapFeedback] = useState<string | null>(null);

  // Sync sub game initializers
  const setSubGameStates = (step = 0) => {
    // 1.
    setCharCluesShown(1);
    setCharFeedback(null);
    // 2.
    setSelectedTerm(null);
    setMatchedTerms([]);
    setMatchWrong(false);
    // 3.
    setScrambleAnswer([]);
    setScrambleFeedback(null);
    // 4.
    setRiddleFeedback(null);
    // 5.
    const randomWord = guessWords[Math.floor(Math.random() * guessWords.length)];
    setCurrentGuessWord(randomWord);
    setGuessedLetters([]);
    setLivesLeft(6);
    // 6.
    setTfIndex(step);
    setTfTimeLeft(30);
    setTfStreak(0);
    // 7.
    setBlanksFeedback(null);
    // 8.
    setOddSelected(null);
    // 9.
    const orderIndex = Math.min(step, bookOrderQuestions.length - 1);
    setCurrentOrder(lang === 'kn' ? [...bookOrderQuestionsKn[orderIndex].initialKn] : [...bookOrderQuestions[orderIndex].initial]);
    setOrderFeedback(null);
    // 10.
    setMapFeedback(null);
  };

  // Run on start and language toggle to load or reset progress
  useEffect(() => {
    if (activeGameId) {
      const userId = localStorage.getItem('bible_quest_current_user_id') || 'default_user';
      const saved = localStorage.getItem(`bible_quest_game_progress_${userId}_${activeGameId}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed.currentStep === 'number') {
            setGameState(parsed);
            setSubGameStates(parsed.currentStep);
            return;
          }
        } catch (e) {}
      }
    }

    setGameState({
      score: 0,
      currentStep: 0,
      isCompleted: false,
      earnedXp: 0,
      earnedCoins: 0,
      history: []
    });
    setSubGameStates(0);
  }, [activeGameId, lang]);

  // True/False countdown timer
  useEffect(() => {
    if (activeGameId !== 'true_false' || gameState.isCompleted) return;
    if (tfTimeLeft <= 0) {
      // Payout TF Sprint based on score
      const bonusCoins = Math.min(25, gameState.score * 3);
      const bonusXp = Math.min(45, gameState.score * 5);
      handleGameComplete(bonusXp, bonusCoins, gameState.score);
      return;
    }
    const timer = setInterval(() => {
      setTfTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [tfTimeLeft, activeGameId, gameState.isCompleted]);


  // --- SUB-GAME ACTIONS ---

  // 1. Character Finding action
  const handleCharAnswer = (choice: string) => {
    if (charFeedback) return;
    const currentQ = charFindQuestions[gameState.currentStep];
    const currentQKn = charFindQuestionsKn[gameState.currentStep];
    const isCorrect = lang === 'kn' ? (choice === currentQKn.targetKn) : (choice === currentQ.target);
    const questionText = lang === 'kn' ? `ಯಾರು? ಸುಳಿವು: ${currentQKn.cluesKn[0]}` : `Who Am I? Clue: ${currentQ.clues[0]}`;
    const correctAnswer = lang === 'kn' ? currentQKn.targetKn : currentQ.target;

    if (isCorrect) {
      playSfx('correct');
      setCharFeedback(lang === 'kn' ? "ಸರಿ! ಅದ್ಭುತ ಕೆಲಸ." : "Correct! Splendid job.");
      setGameState((prev: any) => ({ ...prev, score: prev.score + 1 }));
    } else {
      playSfx('wrong');
      setCharFeedback(lang === 'kn'
        ? `ತಪ್ಪು! ಸರಿಯಾದ ಉತ್ತರ ${currentQKn.targetKn}.`
        : `Wrong! The correct answer was ${currentQ.target}.`
      );
    }
    addAnswerToHistory(questionText, correctAnswer, choice, isCorrect);
  };

  const handleNextChar = () => {
    setCharFeedback(null);
    setCharCluesShown(1);
    if (gameState.currentStep < charFindQuestions.length - 1) {
      setGameState((prev: any) => {
        const nextStep = prev.currentStep + 1;
        const nextState = { ...prev, currentStep: nextStep };
        const userId = localStorage.getItem('bible_quest_current_user_id') || 'default_user';
        localStorage.setItem(`bible_quest_game_progress_${userId}_char_find`, JSON.stringify(nextState));
        return nextState;
      });
    } else {
      // Payout
      const gameDef = gamesList.find(g => g.id === 'char_find')!;
      const rewardXp = Math.floor((gameState.score / charFindQuestions.length) * gameDef.xpReward);
      const rewardCoins = Math.floor((gameState.score / charFindQuestions.length) * gameDef.coinReward);
      handleGameComplete(Math.max(10, rewardXp), Math.max(5, rewardCoins), gameState.score);
    }
  };

  // 2. Word Matching Action
  const handleSelectMatchingTerm = (term: string) => {
    if (matchedTerms.includes(term)) return;
    playSfx('click');
    setSelectedTerm(term);
  };

  const handleSelectMatchingDef = (def: string) => {
    if (!selectedTerm) return;
    const currentRoundPairs = matchRounds[gameState.currentStep].pairs;
    const pair = currentRoundPairs.find(p => p.term === selectedTerm);
    
    if (pair && pair.def === def) {
      playSfx('match');
      const nextMatched = [...matchedTerms, selectedTerm];
      setMatchedTerms(nextMatched);
      setSelectedTerm(null);

      // If all 4 matched
      if (nextMatched.length === 4) {
        const questionText = lang === 'kn' ? `ಪದ ಹೊಂದಾಣಿಕೆ ಸುತ್ತು ${gameState.currentStep + 1}` : `Word Matching Round ${gameState.currentStep + 1}`;
        addAnswerToHistory(questionText, "All matched", "All matched", true);

        if (gameState.currentStep < matchRounds.length - 1) {
          setTimeout(() => {
            setGameState((prev: any) => {
              const nextStep = prev.currentStep + 1;
              const nextState = { ...prev, currentStep: nextStep, score: prev.score + 1 };
              const userId = localStorage.getItem('bible_quest_current_user_id') || 'default_user';
              localStorage.setItem(`bible_quest_game_progress_${userId}_word_match`, JSON.stringify(nextState));
              return nextState;
            });
            setMatchedTerms([]);
          }, 800);
        } else {
          setTimeout(() => {
            const finalScore = gameState.score + 1;
            const gameDef = gamesList.find(g => g.id === 'word_match')!;
            handleGameComplete(gameDef.xpReward, gameDef.coinReward, finalScore);
          }, 800);
        }
      }
    } else {
      playSfx('wrong');
      setMatchWrong(true);
      setTimeout(() => {
        setMatchWrong(false);
        setSelectedTerm(null);
      }, 600);
    }
  };

  // 3. Verse Scramble Action
  const handleScrambleWordTap = (word: string) => {
    playSfx('click');
    setScrambleAnswer((prev) => [...prev, word]);
  };

  const handleScrambleWordRemove = (index: number) => {
    playSfx('click');
    setScrambleAnswer((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleConfirmScramble = () => {
    const currentQ = scrambleVerses[gameState.currentStep];
    const currentQKn = scrambleVersesKn[gameState.currentStep];
    const userString = scrambleAnswer.join(" ");
    const correctString = lang === 'kn' ? currentQKn.correctOrderKn.join(" ") : currentQ.correctOrder.join(" ");
    const isCorrect = userString === correctString;

    const questionText = lang === 'kn' ? `ವಚನ ಜೋಡಣೆ ಸುತ್ತು ${gameState.currentStep + 1}` : `Verse Scramble Round ${gameState.currentStep + 1}`;
    addAnswerToHistory(questionText, correctString, userString || (lang === 'kn' ? "ದಾಟಿಸಲಾಗಿದೆ" : "Skipped"), isCorrect);

    if (userString === correctString) {
      playSfx('correct');
      setScrambleFeedback(lang === 'kn'
        ? "ಸರಿ! ನೀವು ಪವಿತ್ರ ಗ್ರಂಥವನ್ನು ಸುಂದರವಾಗಿ ಜೋಡಿಸಿದ್ದೀರಿ."
        : "Correct! You have beautifully assembled the scripture."
      );
      setGameState((prev: any) => ({ ...prev, score: prev.score + 1 }));
    } else {
      playSfx('wrong');
      setScrambleFeedback(lang === 'kn'
        ? "ಸರಿಯಾಗಿಲ್ಲ. ಮಾತುಗಳನ್ನು ಬೇರೆ ರೀತಿಯಲ್ಲಿ ಜೋಡಿಸಲು ಪ್ರಯತ್ನಿಸಿ."
        : "Not quite correct. Try rearranging the words differently."
      );
    }
  };

  const handleNextScramble = () => {
    setScrambleFeedback(null);
    setScrambleAnswer([]);
    if (gameState.currentStep < scrambleVerses.length - 1) {
      setGameState((prev: any) => {
        const nextStep = prev.currentStep + 1;
        const nextState = { ...prev, currentStep: nextStep };
        const userId = localStorage.getItem('bible_quest_current_user_id') || 'default_user';
        localStorage.setItem(`bible_quest_game_progress_${userId}_verse_scramble`, JSON.stringify(nextState));
        return nextState;
      });
    } else {
      const finalScore = gameState.score;
      const gameDef = gamesList.find(g => g.id === 'verse_scramble')!;
      const rewardXp = Math.floor((finalScore / scrambleVerses.length) * gameDef.xpReward);
      const rewardCoins = Math.floor((finalScore / scrambleVerses.length) * gameDef.coinReward);
      handleGameComplete(Math.max(15, rewardXp), Math.max(8, rewardCoins), finalScore);
    }
  };

  // 4. Who Am I Riddles action
  const handleRiddleAnswer = (choice: string) => {
    if (riddleFeedback) return;
    const currentQ = riddles[gameState.currentStep];
    const currentQKn = riddlesKn[gameState.currentStep];
    const isCorrect = lang === 'kn' ? (choice === currentQKn.answerKn) : (choice === currentQ.answer);
    const questionText = lang === 'kn' ? currentQKn.riddleKn : currentQ.riddle;
    const correctAnswer = lang === 'kn' ? currentQKn.answerKn : currentQ.answer;

    if (isCorrect) {
      playSfx('correct');
      setRiddleFeedback(lang === 'kn' ? "ಸರಿ! ಅವರು ಯಾರೆಂದು ನೀವು ಕಂಡುಹಿಡಿದಿದ್ದೀರಿ!" : "Correct! You figured out who it was!");
      setGameState((prev: any) => ({ ...prev, score: prev.score + 1 }));
    } else {
      playSfx('wrong');
      setRiddleFeedback(lang === 'kn'
        ? `ತಪ್ಪು! ಇದು ${currentQKn.answerKn}.`
        : `Incorrect! This was ${currentQ.answer}.`
      );
    }
    addAnswerToHistory(questionText, correctAnswer, choice, isCorrect);
  };

  const handleNextRiddle = () => {
    setRiddleFeedback(null);
    if (gameState.currentStep < riddles.length - 1) {
      setGameState((prev: any) => {
        const nextStep = prev.currentStep + 1;
        const nextState = { ...prev, currentStep: nextStep };
        const userId = localStorage.getItem('bible_quest_current_user_id') || 'default_user';
        localStorage.setItem(`bible_quest_game_progress_${userId}_who_am_i`, JSON.stringify(nextState));
        return nextState;
      });
    } else {
      const finalScore = gameState.score;
      const gameDef = gamesList.find(g => g.id === 'who_am_i')!;
      const rewardXp = Math.floor((finalScore / riddles.length) * gameDef.xpReward);
      const rewardCoins = Math.floor((finalScore / riddles.length) * gameDef.coinReward);
      handleGameComplete(Math.max(15, rewardXp), Math.max(8, rewardCoins), finalScore);
    }
  };

  // 5. Word Guess action
  const handleGuessLetter = (letter: string) => {
    if (guessedLetters.includes(letter) || livesLeft <= 0 || gameState.isCompleted) return;
    
    playSfx('click');
    const nextGuessed = [...guessedLetters, letter];
    setGuessedLetters(nextGuessed);

    if (!currentGuessWord.includes(letter)) {
      const nextLives = livesLeft - 1;
      setLivesLeft(nextLives);
      playSfx('wrong');
      if (nextLives <= 0) {
        // Lost
        addAnswerToHistory(
          lang === 'kn' ? `ಪದ ಊಹೆ: ${currentGuessWord}` : `Word Guess: ${currentGuessWord}`,
          currentGuessWord,
          guessedLetters.join(""),
          false
        );
        const gameDef = gamesList.find(g => g.id === 'word_guess')!;
        handleGameComplete(10, 5, 0);
      }
    } else {
      // Check if word solved
      const isWordSolved = currentGuessWord.split("").every(char => nextGuessed.includes(char));
      if (isWordSolved) {
        addAnswerToHistory(
          lang === 'kn' ? `ಪದ ಊಹೆ: ${currentGuessWord}` : `Word Guess: ${currentGuessWord}`,
          currentGuessWord,
          currentGuessWord,
          true
        );
        const gameDef = gamesList.find(g => g.id === 'word_guess')!;
        handleGameComplete(gameDef.xpReward, gameDef.coinReward, 1);
      }
    }
  };

  // 6. True or False action
  const handleTfAnswer = (userAns: boolean) => {
    const currentQ = tfQuestions[tfIndex];
    const currentQKn = tfQuestionsKn[tfIndex];
    const questionText = lang === 'kn' ? currentQKn.qKn : currentQ.q;
    const isCorrect = currentQ.a === userAns;

    addAnswerToHistory(
      questionText,
      currentQ.a ? (lang === 'kn' ? "ಸರಿ" : "True") : (lang === 'kn' ? "ತಪ್ಪು" : "False"),
      userAns ? (lang === 'kn' ? "ಸರಿ" : "True") : (lang === 'kn' ? "ತಪ್ಪು" : "False"),
      isCorrect
    );

    if (isCorrect) {
      playSfx('correct');
      setGameState((prev: any) => ({ ...prev, score: prev.score + 1 }));
      setTfStreak((prev) => prev + 1);
    } else {
      playSfx('wrong');
      setTfStreak(0);
    }

    if (tfIndex < tfQuestions.length - 1) {
      setTfIndex((prev) => {
        const nextTf = prev + 1;
        setGameState((g: any) => {
          const nextState = { ...g, currentStep: nextTf };
          const userId = localStorage.getItem('bible_quest_current_user_id') || 'default_user';
          localStorage.setItem(`bible_quest_game_progress_${userId}_true_false`, JSON.stringify(nextState));
          return nextState;
        });
        return nextTf;
      });
    } else {
      // Completed early
      const gameDef = gamesList.find(g => g.id === 'true_false')!;
      const rewardXp = Math.floor((gameState.score / tfQuestions.length) * gameDef.xpReward);
      const rewardCoins = Math.floor((gameState.score / tfQuestions.length) * gameDef.coinReward);
      handleGameComplete(Math.max(15, rewardXp), Math.max(5, rewardCoins), gameState.score);
    }
  };

  // 7. Fill in the Blanks action
  const handleBlanksAnswer = (choice: string) => {
    if (blanksFeedback) return;
    const currentQ = blanksQuestions[gameState.currentStep];
    const currentQKn = blanksQuestionsKn[gameState.currentStep];
    const isCorrect = lang === 'kn' ? (choice === currentQKn.missingKn) : (choice === currentQ.missing);
    const questionText = lang === 'kn' ? currentQKn.sentenceKn : currentQ.sentence;
    const correctAnswer = lang === 'kn' ? currentQKn.missingKn : currentQ.missing;

    if (isCorrect) {
      playSfx('correct');
      setBlanksFeedback(lang === 'kn' ? "ಅದ್ಭುತ! ಸರಿಯಾದ ಪದ ಆಯ್ಕೆ." : "Superb! Correct word choice.");
      setGameState((prev: any) => ({ ...prev, score: prev.score + 1 }));
    } else {
      playSfx('wrong');
      setBlanksFeedback(lang === 'kn'
        ? `ತಪ್ಪು. ಸರಿಯಾದ ಪದ: ${currentQKn.missingKn}`
        : `Incorrect. The correct word is: ${currentQ.missing}`
      );
    }
    addAnswerToHistory(questionText, correctAnswer, choice, isCorrect);
  };

  const handleNextBlanks = () => {
    setBlanksFeedback(null);
    if (gameState.currentStep < blanksQuestions.length - 1) {
      setGameState((prev: any) => {
        const nextStep = prev.currentStep + 1;
        const nextState = { ...prev, currentStep: nextStep };
        const userId = localStorage.getItem('bible_quest_current_user_id') || 'default_user';
        localStorage.setItem(`bible_quest_game_progress_${userId}_fill_blanks`, JSON.stringify(nextState));
        return nextState;
      });
    } else {
      const finalScore = gameState.score;
      const gameDef = gamesList.find(g => g.id === 'fill_blanks')!;
      const rewardXp = Math.floor((finalScore / blanksQuestions.length) * gameDef.xpReward);
      const rewardCoins = Math.floor((finalScore / blanksQuestions.length) * gameDef.coinReward);
      handleGameComplete(Math.max(15, rewardXp), Math.max(5, rewardCoins), finalScore);
    }
  };

  // 8. Odd One Out action
  const handleOddSelect = (item: string) => {
    if (oddSelected) return;
    const currentQ = oddOneQuestions[gameState.currentStep];
    const currentQKn = oddOneQuestionsKn[gameState.currentStep];
    setOddSelected(item);
    const isCorrect = lang === 'kn' ? (item === currentQKn.oddKn) : (item === currentQ.odd);
    const questionText = lang === 'kn' ? `ಗುಂಪಿಗೆ ಸೇರದ ಪದ ಯಾವುದು? (${currentQKn.itemsKn.join(", ")})` : `Which is the odd one out? (${currentQ.items.join(", ")})`;
    const correctAnswer = lang === 'kn' ? currentQKn.oddKn : currentQ.odd;

    if (isCorrect) {
      playSfx('correct');
      setGameState((prev: any) => ({ ...prev, score: prev.score + 1 }));
    } else {
      playSfx('wrong');
    }
    addAnswerToHistory(questionText, correctAnswer, item, isCorrect);
  };

  const handleNextOdd = () => {
    setOddSelected(null);
    if (gameState.currentStep < oddOneQuestions.length - 1) {
      setGameState((prev: any) => {
        const nextStep = prev.currentStep + 1;
        const nextState = { ...prev, currentStep: nextStep };
        const userId = localStorage.getItem('bible_quest_current_user_id') || 'default_user';
        localStorage.setItem(`bible_quest_game_progress_${userId}_odd_one`, JSON.stringify(nextState));
        return nextState;
      });
    } else {
      const finalScore = gameState.score;
      const gameDef = gamesList.find(g => g.id === 'odd_one')!;
      const rewardXp = Math.floor((finalScore / oddOneQuestions.length) * gameDef.xpReward);
      const rewardCoins = Math.floor((finalScore / oddOneQuestions.length) * gameDef.coinReward);
      handleGameComplete(Math.max(15, rewardXp), Math.max(5, rewardCoins), finalScore);
    }
  };

  // 9. Bible Book Order action
  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    playSfx('click');
    const newArr = [...currentOrder];
    if (direction === 'up' && index > 0) {
      const temp = newArr[index];
      newArr[index] = newArr[index - 1];
      newArr[index - 1] = temp;
    } else if (direction === 'down' && index < newArr.length - 1) {
      const temp = newArr[index];
      newArr[index] = newArr[index + 1];
      newArr[index + 1] = temp;
    }
    setCurrentOrder(newArr);
  };

  const handleVerifyOrder = () => {
    const correctArr = bookOrderQuestions[gameState.currentStep].correct;
    const correctArrKn = bookOrderQuestionsKn[gameState.currentStep].correctKn;
    const isCorrect = currentOrder.every((val, idx) => val === (lang === 'kn' ? correctArrKn[idx] : correctArr[idx]));
    
    const questionText = lang === 'kn' ? `ಬೈಬಲ್ ಪುಸ್ತಕಗಳ ಅನುಕ್ರಮ ಸುತ್ತು ${gameState.currentStep + 1}` : `Bible Book Order Round ${gameState.currentStep + 1}`;
    const correctAnswer = lang === 'kn' ? correctArrKn.join(" → ") : correctArr.join(" → ");
    const userAnswer = currentOrder.join(" → ");

    if (isCorrect) {
      playSfx('correct');
      setOrderFeedback(lang === 'kn' ? "ಅತ್ಯುತ್ತಮ! ನೀವು ಪುಸ್ತಕಗಳನ್ನು ಸರಿಯಾದ ಅನುಕ್ರಮದಲ್ಲಿ ಜೋಡಿಸಿದ್ದೀರಿ." : "Exquisite! You ordered the books in correct sequence.");
      setGameState((prev: any) => ({ ...prev, score: prev.score + 1 }));
    } else {
      playSfx('wrong');
      setOrderFeedback(lang === 'kn'
        ? `ತಪ್ಪಾದ ಕ್ರಮ. ಸರಿಯಾದ ಅನುಕ್ರಮ: ${correctArrKn.join(" → ")}`
        : `Incorrect order. The actual sequence is: ${correctArr.join(" → ")}`
      );
    }
    addAnswerToHistory(questionText, correctAnswer, userAnswer, isCorrect);
  };

  const handleNextOrder = () => {
    setOrderFeedback(null);
    if (gameState.currentStep < bookOrderQuestions.length - 1) {
      const nextStep = gameState.currentStep + 1;
      setGameState((prev: any) => {
        const nextState = { ...prev, currentStep: nextStep };
        const userId = localStorage.getItem('bible_quest_current_user_id') || 'default_user';
        localStorage.setItem(`bible_quest_game_progress_${userId}_book_order`, JSON.stringify(nextState));
        return nextState;
      });
      setCurrentOrder(lang === 'kn' ? [...bookOrderQuestionsKn[nextStep].initialKn] : [...bookOrderQuestions[nextStep].initial]);
    } else {
      const finalScore = gameState.score;
      const gameDef = gamesList.find(g => g.id === 'book_order')!;
      const rewardXp = Math.floor((finalScore / bookOrderQuestions.length) * gameDef.xpReward);
      const rewardCoins = Math.floor((finalScore / bookOrderQuestions.length) * gameDef.coinReward);
      handleGameComplete(Math.max(20, rewardXp), Math.max(10, rewardCoins), finalScore);
    }
  };

  // 10. Map Landmarks action
  const handleMapAnswer = (choice: string) => {
    if (mapFeedback) return;
    const currentQ = mapLandmarksQuestions[gameState.currentStep];
    const currentQKn = mapLandmarksQuestionsKn[gameState.currentStep];
    const isCorrect = lang === 'kn' ? (choice === currentQKn.answerKn) : (choice === currentQ.answer);
    const questionText = lang === 'kn' ? currentQKn.landmarkKn : currentQ.landmark;
    const correctAnswer = lang === 'kn' ? currentQKn.answerKn : currentQ.answer;

    if (isCorrect) {
      playSfx('correct');
      setMapFeedback(lang === 'kn' ? "ಪರಿಪೂರ್ಣ ಭೌಗೋಳಿಕ ಹೊಂದಾಣಿಕೆ! ಮುಂದುವರಿಯಿರಿ." : "A perfect geographical match! Keep it up.");
      setGameState((prev: any) => ({ ...prev, score: prev.score + 1 }));
    } else {
      playSfx('wrong');
      setMapFeedback(lang === 'kn'
        ? `ತಪ್ಪು. ಆ ಪ್ರಮುಖ ಐತಿಹಾಸಿಕ ಘಟನೆ ನಡೆದ ಸ್ಥಳ: ${currentQKn.answerKn}`
        : `Incorrect. That landmark historical event belongs in: ${currentQ.answer}`
      );
    }
    addAnswerToHistory(questionText, correctAnswer, choice, isCorrect);
  };

  const handleNextMap = () => {
    setMapFeedback(null);
    if (gameState.currentStep < mapLandmarksQuestions.length - 1) {
      setGameState((prev: any) => {
        const nextStep = prev.currentStep + 1;
        const nextState = { ...prev, currentStep: nextStep };
        const userId = localStorage.getItem('bible_quest_current_user_id') || 'default_user';
        localStorage.setItem(`bible_quest_game_progress_${userId}_map_landmarks`, JSON.stringify(nextState));
        return nextState;
      });
    } else {
      const finalScore = gameState.score;
      const gameDef = gamesList.find(g => g.id === 'map_landmarks')!;
      const rewardXp = Math.floor((finalScore / mapLandmarksQuestions.length) * gameDef.xpReward);
      const rewardCoins = Math.floor((finalScore / mapLandmarksQuestions.length) * gameDef.coinReward);
      handleGameComplete(Math.max(15, rewardXp), Math.max(5, rewardCoins), finalScore);
    }
  };


  // --- MAIN RENDER LOGIC ---

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 pb-16 px-4 animate-fade-in text-left">
      
      {/* 1. Header Banner */}
      {!activeGameId && (
        <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Gamepad2 className="w-5 h-5 animate-bounce" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {lang === 'kn' ? "ಬೈಬಲ್ ಸಂವಾದಾತ್ಮಕ ಆಟಗಳ ಆರ್ಕೇಡ್" : "Bible Interactive Games Arcade"}
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">
              {lang === 'en' ? 'Arcade Quest Rooms' : 'ಆರ್ಕೇಡ್ ಕ್ವೆಸ್ಟ್ ಕೊಠಡಿಗಳು'}
            </h1>
            <p className="text-xs md:text-sm text-on-surface-variant font-medium max-w-xl">
              {lang === 'en' 
                ? "Immerse yourself in ten highly specialized game variations designed to drill scripture knowledge. Gain Gold, elevate your level, and expand your character!" 
                : "ಶಾಸ್ತ್ರಜ್ಞಾನವನ್ನು ಹೆಚ್ಚಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಹತ್ತು ಅತ್ಯಂತ ವಿಶೇಷವಾದ ಆಟಗಳಲ್ಲಿ ಮುಳುಗಿರಿ. ಚಿನ್ನ ಗಳಿಸಿ, ನಿಮ್ಮ ಮಟ್ಟವನ್ನು ಹೆಚ್ಚಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಬೆಳೆಸಿಕೊಳ್ಳಿ!"
              }
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl border border-outline-variant/30 shadow-sm">
            <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
            <div>
              <p className="text-[10px] text-outline font-bold uppercase">
                {lang === 'kn' ? "ಪಾತ್ರದ ಶ್ರೇಣಿ" : "Character Rank"}
              </p>
              <p className="font-serif text-xs font-bold text-primary">
                Lvl {stats.level} {lang === 'kn' ? "ಕ್ವೆಸ್ಟ್ ಮಾಸ್ಟರ್" : "Quest Master"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. GRID SELECTION VIEW OF 10 GAME TYPES */}
      {!activeGameId && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gamesList.map((game, idx) => {
            const diffColor = 
              game.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
              game.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800 border-amber-200' :
              'bg-red-100 text-red-800 border-red-200';

            const difficultyLabel = lang === 'kn' 
              ? (game.difficulty === 'Easy' ? 'ಸುಲಭ' : game.difficulty === 'Medium' ? 'ಮಧ್ಯಮ' : 'ಕಠಿಣ')
              : game.difficulty;

            return (
              <div 
                key={game.id}
                className="group relative bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-primary/20 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
                      {game.icon}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${diffColor}`}>
                      {difficultyLabel}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-primary group-hover:text-secondary transition-colors">
                    {lang === 'en' ? game.title : game.titleKn}
                  </h3>

                  <p className="text-xs text-slate-500 font-semibold mt-2 leading-relaxed">
                    {lang === 'en' ? game.description : game.descriptionKn}
                  </p>

                  <div className="flex items-center gap-3 mt-4 py-2 border-t border-slate-50 text-[10px] font-bold text-slate-400">
                    <span className="flex items-center gap-1 text-secondary">
                      <Sparkles className="w-3.5 h-3.5 fill-secondary/20" />
                      +{game.xpReward} XP
                    </span>
                    <span className="flex items-center gap-1 text-amber-500">
                      <Coins className="w-3.5 h-3.5 fill-amber-500/10" />
                      +{game.coinReward} {lang === 'kn' ? "ಚಿನ್ನ" : "Gold"}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => { playSfx('click'); setActiveGameId(game.id); }}
                    className="w-full py-2.5 bg-primary hover:bg-primary/95 text-white rounded-xl font-bold text-xs shadow hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>
                      {lang === 'kn' ? `ಆಟವಾಡಿ ${idx + 1}` : `Play Game ${idx + 1}`}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}


      {/* 3. CORE ACTIVE GAME VIEWPORT */}
      {activeGameId && (
        <div className="w-full flex flex-col gap-6 animate-fade-in">
          
          {/* Active game sub header dashboard */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={handleBackToSelect}
                className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 hover:text-primary transition-colors cursor-pointer"
                title={lang === 'kn' ? "ಆಟದ ಆಯ್ಕೆಗೆ ಹಿಂತಿರುಗಿ" : "Return to Game Selection Rooms"}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="font-serif text-xl font-bold text-primary">
                  {lang === 'kn' 
                    ? gamesList.find(g => g.id === activeGameId)?.titleKn 
                    : gamesList.find(g => g.id === activeGameId)?.title
                  }
                </h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  {lang === 'kn' ? "ಆರ್ಕೇಡ್ ಅಖಾಡ ಕೊಠಡಿ" : "Arcade Arena Room"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleResetGameSession}
                className="flex items-center gap-1.5 px-4 py-1.5 border border-slate-200 hover:border-primary/40 text-xs font-bold text-slate-500 hover:text-primary rounded-full bg-white transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {lang === 'kn' ? "ಮರುಪ್ರಾರಂಭಿಸಿ" : "Restart Session"}
              </button>
              <button
                onClick={handleBackToSelect}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-600 rounded-full transition-all cursor-pointer"
              >
                {lang === 'kn' ? "ಇತರ ಆಟದ ಕೊಠಡಿಗಳು" : "Other Game Rooms"}
              </button>
            </div>
          </div>


          {/* 4. GAME COMPLETION SUMMARY SCREEN (INTEGRATED) */}
          {gameState.isCompleted && (
            <div className="bg-white rounded-[32px] p-8 text-center border-2 border-primary/10 shadow-xl max-w-xl mx-auto w-full animate-fade-in">
              <div className="w-16 h-16 bg-amber-50 rounded-full border border-amber-200 flex items-center justify-center text-amber-500 mx-auto mb-4 animate-bounce">
                <Award className="w-8 h-8 fill-amber-100" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-primary">
                {lang === 'kn' ? "ಆಟ ಮುಗಿದಿದೆ!" : "Game Finished!"}
              </h2>
              <p className="text-xs text-slate-400 font-semibold mt-1">
                {lang === 'kn' ? "ಬೈಬಲ್ ಆರ್ಕೇಡ್‌ನಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಪ್ರದರ್ಶನ!" : "Excellent performance in the Bible Arcade!"}
              </p>
              
              <div className="grid grid-cols-2 gap-4 my-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    {lang === 'kn' ? "ಗಳಿಸಿದ XP" : "XP Awarded"}
                  </p>
                  <p className="text-lg font-bold text-secondary">+{gameState.earnedXp} XP</p>
                </div>
                <div className="text-center border-l border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    {lang === 'kn' ? "ಗಳಿಸಿದ ನಾಣ್ಯಗಳು" : "Coins Earned"}
                  </p>
                  <p className="text-lg font-bold text-amber-500">
                    +{gameState.earnedCoins} {lang === 'kn' ? "ಚಿನ್ನ" : "Gold"}
                  </p>
                </div>
              </div>

              {/* Respective Answers list */}
              {gameState.history && gameState.history.length > 0 && (
                <div className="mt-8 mb-6 text-left space-y-4 max-h-96 overflow-y-auto pr-2 border-t border-slate-100 pt-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {lang === 'kn' ? "ನಿಮ್ಮ ವಿವರವಾದ ಉತ್ತರಗಳು:" : "Your Step-by-Step Answers:"}
                  </h3>
                  <div className="space-y-3">
                    {gameState.history.map((h: any, idx: number) => (
                      <div key={idx} className="p-4 bg-slate-50 border border-slate-150 rounded-2xl flex flex-col gap-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-500 uppercase">
                            {lang === 'kn' ? `ಹಂತ ${h.stepIndex + 1}` : `Step ${h.stepIndex + 1}`}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            h.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {h.isCorrect ? (lang === 'kn' ? "ಸರಿ" : "Correct") : (lang === 'kn' ? "ತಪ್ಪು" : "Incorrect")}
                          </span>
                        </div>
                        <p className="font-semibold text-slate-700 font-serif leading-snug">{h.questionText}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1 pt-1.5 border-t border-slate-200/50">
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold block uppercase">{lang === 'kn' ? "ನಿಮ್ಮ ಉತ್ತರ" : "Your Answer"}</span>
                            <span className={`font-semibold ${h.isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>{h.userAnswer}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold block uppercase">{lang === 'kn' ? "ಸರಿಯಾದ ಉತ್ತರ" : "Correct Answer"}</span>
                            <span className="font-semibold text-slate-700">{h.correctAnswer}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
                <button 
                  onClick={handleResetGameSession}
                  className="w-full sm:w-auto px-6 py-2.5 bg-slate-150 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  {lang === 'kn' ? "ಮತ್ತೆ ಆಡಿ" : "Play Again"}
                </button>
                <button 
                  onClick={handleBackToSelect}
                  className="w-full sm:w-auto px-8 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-xl shadow cursor-pointer"
                >
                  {lang === 'kn' ? "ಇತರ ಕೊಠಡಿಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ" : "Select Other Game Rooms"}
                </button>
              </div>
            </div>
          )}


          {/* Checkpoint Screen */}
          {gameState.currentStep % 5 === 0 && 
           gameState.currentStep > 0 && 
           lastDismissedCheckpoint !== gameState.currentStep &&
           !gameState.isCompleted && (
            <div className="bg-white rounded-[32px] p-8 text-center border-2 border-dashed border-primary/20 shadow-xl max-w-xl mx-auto w-full animate-fade-in my-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4 animate-pulse">
                <Shield className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-primary">
                {lang === 'kn' ? "ಚೆಕ್‌ಪಾಯಿಂಟ್ ತಲುಪಿದೆ!" : "Checkpoint Reached!"}
              </h2>
              <p className="text-xs text-slate-500 font-semibold mt-2 leading-relaxed">
                {lang === 'kn' 
                  ? `ನೀವು ಯಶಸ್ವಿಯಾಗಿ ${gameState.currentStep} ಹಂತಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ. ನಿಮ್ಮ ಪ್ರಗತಿಯನ್ನು ಉಳಿಸಲಾಗಿದೆ. ನೀವು ಈಗ ವಿರಾಮ ತೆಗೆದುಕೊಳ್ಳಬಹುದು ಮತ್ತು ನಂತರ ಹಂತ ${gameState.currentStep + 1} ರಿಂದ ಮುಂದುವರಿಯಬಹುದು!` 
                  : `You have successfully completed ${gameState.currentStep} steps. Your progress has been securely saved. You can take a break now and resume from Step ${gameState.currentStep + 1} whenever you return!`}
              </p>
              
              <div className="grid grid-cols-2 gap-4 my-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    {lang === 'kn' ? "ಪೂರ್ಣಗೊಂಡ ಹಂತಗಳು" : "Steps Completed"}
                  </p>
                  <p className="text-lg font-bold text-primary">{gameState.currentStep}</p>
                </div>
                <div className="text-center border-l border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    {lang === 'kn' ? "ಪ್ರಸ್ತುತ ಸ್ಕೋರ್" : "Current Score"}
                  </p>
                  <p className="text-lg font-bold text-emerald-600">{gameState.score}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
                <button 
                  onClick={() => {
                    playSfx('click');
                    setLastDismissedCheckpoint(gameState.currentStep);
                  }}
                  className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow cursor-pointer flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-white text-white" />
                  {lang === 'kn' ? `ಹಂತ ${gameState.currentStep + 1} ಕ್ಕೆ ಮುಂದುವರಿಯಿರಿ` : `Continue to Step ${gameState.currentStep + 1}`}
                </button>
                <button 
                  onClick={handleBackToSelect}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  {lang === 'kn' ? "ಆಟಗಳ ಪಟ್ಟಿಗೆ ಹಿಂತಿರುಗಿ" : "Back to Games"}
                </button>
              </div>
            </div>
          )}


          {/* 5. INDIVIDUAL RENDERS FOR EACH OF THE 10 GAME MODES */}
          {!gameState.isCompleted && !(gameState.currentStep % 5 === 0 && gameState.currentStep > 0 && lastDismissedCheckpoint !== gameState.currentStep) && (
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md">
              
              {/* GAME 1: Character Finding */}
              {activeGameId === 'char_find' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-primary">
                      {lang === 'kn' 
                        ? `ಪಾತ್ರ ಶೋಧ — ಹಂತ ${gameState.currentStep + 1} / ${charFindQuestions.length}`
                        : `CHAR FIND — STEP ${gameState.currentStep + 1} OF ${charFindQuestions.length}`
                      }
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {lang === 'kn' ? `ಅಂಕ: ${gameState.score}` : `Score: ${gameState.score}`}
                    </span>
                  </div>

                  <div className="bg-primary/5 rounded-2xl p-6 space-y-4">
                    <p className="text-xs font-bold text-primary uppercase">
                      {lang === 'kn' ? "ಸುಳಿವುಗಳನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಓದಿ:" : "Read Clues Carefully:"}
                    </p>
                    <ul className="space-y-3">
                      {(lang === 'kn' ? charFindQuestionsKn[gameState.currentStep].cluesKn : charFindQuestions[gameState.currentStep].clues)
                        .slice(0, charCluesShown)
                        .map((clue, idx) => (
                          <li key={idx} className="text-sm font-semibold text-slate-700 bg-white p-3 rounded-xl border border-slate-100 animate-fade-in flex items-start gap-2">
                            <span className="text-primary font-bold">
                              {lang === 'kn' ? `ಸುಳಿವು ${idx + 1}:` : `Clue ${idx + 1}:`}
                            </span>
                            <span>{clue}</span>
                          </li>
                        ))
                      }
                    </ul>

                    {charCluesShown < 3 && !charFeedback && (
                      <button 
                        onClick={() => { playSfx('click'); setCharCluesShown(prev => prev + 1); }}
                        className="text-xs text-primary font-bold hover:underline cursor-pointer"
                      >
                        {lang === 'kn' ? "+ ಮುಂದಿನ ಸುಳಿವು ಬಹಿರಂಗಪಡಿಸಿ" : "+ Reveal Next Clue"}
                      </button>
                    )}
                  </div>

                  {!charFeedback ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(lang === 'kn' ? charFindQuestionsKn[gameState.currentStep].optionsKn : charFindQuestions[gameState.currentStep].options).map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleCharAnswer(opt)}
                          className="p-4 bg-slate-50 hover:bg-primary/5 border border-slate-200 hover:border-primary/40 rounded-xl text-sm font-bold text-slate-700 transition-all text-left cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-2 ${
                        (charFeedback.includes("Correct") || charFeedback.includes("ಸರಿ")) ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                      }`}>
                        {(charFeedback.includes("Correct") || charFeedback.includes("ಸರಿ")) ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                        {charFeedback}
                      </div>

                      <button 
                        onClick={handleNextChar}
                        className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-xs hover:brightness-110 shadow cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{lang === 'kn' ? "ಮುಂದಿನ ಹಂತ" : "Next Step"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}


              {/* GAME 2: Word Matching */}
              {activeGameId === 'word_match' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-primary">
                      {lang === 'kn'
                        ? `ಪದ ಹೊಂದಾಣಿಕೆ — ಸುತ್ತು ${gameState.currentStep + 1} / ${matchRounds.length}`
                        : `WORD MATCH — ROUND ${gameState.currentStep + 1} OF ${matchRounds.length}`
                      }
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {lang === 'kn'
                        ? `ಸರಣಿ: ${matchedTerms.length}/4 ಹೊಂದಿಸಲಾಗಿದೆ`
                        : `Streak: ${matchedTerms.length}/4 matched`
                      }
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 font-semibold">
                    {lang === 'kn'
                      ? "ಎಡಭಾಗದಲ್ಲಿರುವ ಪದವನ್ನು ಆರಿಸಿ, ನಂತರ ಬಲಭಾಗದಲ್ಲಿ ಅದಕ್ಕೆ ಸೂಕ್ತವಾದ ವಿವರಣೆಯನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ!"
                      : "Select a term on the left, then click its corresponding definition on the right!"
                    }
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    {/* Left Term Column */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">
                        {lang === 'kn' ? "ಪದಗಳು" : "Terms"}
                      </h4>
                      {matchRounds[gameState.currentStep].pairs.map((pair, idx) => {
                        const isMatched = matchedTerms.includes(pair.term);
                        const isSelected = selectedTerm === pair.term;

                        let style = "bg-slate-50 border-slate-200 hover:bg-slate-100";
                        if (isMatched) style = "bg-emerald-100 border-emerald-300 text-emerald-900 pointer-events-none";
                        else if (isSelected) style = "bg-primary/10 border-primary text-primary";

                        const pairIndex = matchRounds[gameState.currentStep].pairs.findIndex(p => p.term === pair.term);
                        const termLabel = lang === 'kn' && pairIndex !== -1 ? matchRoundsKn[gameState.currentStep].pairsKn[pairIndex].termKn : pair.term;

                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectMatchingTerm(pair.term)}
                            className={`w-full p-3 text-sm font-bold border rounded-xl text-left transition-all ${style} ${
                              matchWrong && isSelected ? 'shake-animation border-red-500 text-red-700 bg-red-50' : ''
                            }`}
                          >
                            {termLabel}
                            {isMatched && <span className="float-right text-emerald-600">✓</span>}
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Definitions Column */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">
                        {lang === 'kn' ? "ವಿವರಣೆಗಳು" : "Definitions"}
                      </h4>
                      {/* Jumbled render list of definitions */}
                      {[...matchRounds[gameState.currentStep].pairs]
                        .sort((a, b) => a.def.localeCompare(b.def))
                        .map((pair, idx) => {
                          const isMatched = matchedTerms.includes(pair.term);

                          let style = "bg-slate-50 border-slate-200 hover:bg-slate-100";
                          if (isMatched) style = "bg-emerald-100 border-emerald-300 text-emerald-900 pointer-events-none";

                          const pairIndex = matchRounds[gameState.currentStep].pairs.findIndex(p => p.def === pair.def);
                          const defLabel = lang === 'kn' && pairIndex !== -1 ? matchRoundsKn[gameState.currentStep].pairsKn[pairIndex].defKn : pair.def;

                          return (
                            <button
                              key={idx}
                              onClick={() => handleSelectMatchingDef(pair.def)}
                              disabled={!selectedTerm || isMatched}
                              className={`w-full p-3 text-xs font-semibold border rounded-xl text-left transition-all ${style} ${
                                !selectedTerm && !isMatched ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                            >
                              {defLabel}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}


              {/* GAME 3: Verse Scramble */}
              {activeGameId === 'verse_scramble' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-primary">
                      {lang === 'kn'
                        ? `ವಾಕ್ಯ ಜೋಡಣೆ — ಸುತ್ತು ${gameState.currentStep + 1} / ${scrambleVerses.length}`
                        : `VERSE SCRAMBLE — ROUND ${gameState.currentStep + 1} OF ${scrambleVerses.length}`
                      }
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {lang === 'kn' ? `ಅಂಕ: ${gameState.score}` : `Score: ${gameState.score}`}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 font-semibold">
                    {lang === 'kn'
                      ? "ಪವಿತ್ರ ಗ್ರಂಥದ ಅಸ್ತವ್ಯಸ್ತವಾಗಿರುವ ಪದಗಳನ್ನು ಸರಿಯಾದ ಕ್ರಮದಲ್ಲಿ ಜೋಡಿಸಿ:"
                      : "Reorder the jumbled words of the scripture in correct canonical sequence:"
                    }
                  </p>

                  {/* Assembled Area */}
                  <div className="p-5 border-2 border-dashed border-slate-200 rounded-2xl min-h-[80px] bg-slate-50 flex flex-wrap gap-2 items-center">
                    {scrambleAnswer.length === 0 ? (
                      <span className="text-xs text-slate-400 font-bold">
                        {lang === 'kn' ? "ಜೋಡಿಸಲು ಕೆಳಗಿನ ಪದಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ..." : "Click words below to assemble..."}
                      </span>
                    ) : (
                      scrambleAnswer.map((word, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleScrambleWordRemove(idx)}
                          className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-red-500 transition-colors cursor-pointer"
                        >
                          {word} ×
                        </button>
                      ))
                    )}
                  </div>

                  {/* Word Options */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {lang === 'kn' ? "ಪದ ಬ್ಯಾಂಕ್" : "Word Bank"}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(lang === 'kn' ? scrambleVersesKn[gameState.currentStep].wordsKn : scrambleVerses[gameState.currentStep].words)
                        .filter(w => !scrambleAnswer.includes(w))
                        .map((word, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleScrambleWordTap(word)}
                            className="px-4 py-2 bg-slate-50 border border-slate-200 hover:border-primary/30 rounded-xl text-xs font-semibold text-slate-700 hover:text-primary transition-all cursor-pointer"
                          >
                            {word}
                          </button>
                        ))}
                    </div>
                  </div>

                  {!scrambleFeedback ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setScrambleAnswer([])}
                        className="px-6 py-2.5 border border-slate-200 rounded-xl font-bold text-xs hover:bg-slate-50 transition-colors"
                      >
                        {lang === 'kn' ? "ಮರುಹೊಂದಿಸಿ" : "Reset Sequence"}
                      </button>
                      <button
                        onClick={handleConfirmScramble}
                        disabled={scrambleAnswer.length < (lang === 'kn' ? scrambleVersesKn[gameState.currentStep].wordsKn.length : scrambleVerses[gameState.currentStep].words.length)}
                        className="px-8 py-2.5 bg-primary text-white font-bold text-xs rounded-xl disabled:opacity-50"
                      >
                        {lang === 'kn' ? "ಪರಿಶೀಲಿಸಿ" : "Verify Sequence"}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${
                        (scrambleFeedback.includes("Correct") || scrambleFeedback.includes("ಸರಿ")) ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                      }`}>
                        {(scrambleFeedback.includes("Correct") || scrambleFeedback.includes("ಸರಿ")) ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                        {scrambleFeedback}
                      </div>

                      <button 
                        onClick={handleNextScramble}
                        className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-xs hover:brightness-110 shadow cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{lang === 'kn' ? "ಮುಂದಿನ ವಾಕ್ಯ" : "Next Scripture"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}


              {/* GAME 4: Who Am I Riddles */}
              {activeGameId === 'who_am_i' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-primary">
                      {lang === 'kn'
                        ? `ನಾನು ಯಾರು? — ಪ್ರಶ್ನೆ ${gameState.currentStep + 1} / ${riddles.length}`
                        : `WHO AM I — QUESTION ${gameState.currentStep + 1} OF ${riddles.length}`
                      }
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {lang === 'kn' ? `ಅಂಕ: ${gameState.score}` : `Score: ${gameState.score}`}
                    </span>
                  </div>

                  <div className="bg-purple-50/40 border border-purple-100 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                      <MessageSquare className="w-32 h-32 text-purple-900" />
                    </div>
                    <p className="font-serif text-sm md:text-base text-slate-800 leading-relaxed italic">
                      "{lang === 'kn' ? riddlesKn[gameState.currentStep].riddleKn : riddles[gameState.currentStep].riddle}"
                    </p>
                  </div>

                  {!riddleFeedback ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(lang === 'kn' ? riddlesKn[gameState.currentStep].optionsKn : riddles[gameState.currentStep].options).map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRiddleAnswer(opt)}
                          className="p-4 bg-slate-50 hover:bg-purple-50 hover:text-purple-900 border border-slate-200 hover:border-purple-300 rounded-xl text-sm font-bold text-slate-700 transition-all text-left cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-2 ${
                        (riddleFeedback.includes("Correct") || riddleFeedback.includes("ಸರಿ")) ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                      }`}>
                        {(riddleFeedback.includes("Correct") || riddleFeedback.includes("ಸರಿ")) ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                        {riddleFeedback}
                      </div>

                      <button 
                        onClick={handleNextRiddle}
                        className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-xs hover:brightness-110 shadow cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{lang === 'kn' ? "ಮುಂದಿನ ಒಗಟು" : "Next Riddle"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}


              {/* GAME 5: Word Guess */}
              {activeGameId === 'word_guess' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-primary">
                      {lang === 'kn' ? "ಪದ ಊಹೆ ಅಖಾಡ — ಕಠಿಣ ಮಟ್ಟ" : "WORD GUESS ARENA — HARD LEVEL"}
                    </span>
                    <span className="text-xs font-bold text-red-500 flex items-center gap-1">
                      🕯️ {livesLeft} {lang === 'kn' ? "ಮೇಣದಬತ್ತಿಗಳು ಉಳಿದಿವೆ" : "candles remaining"}
                    </span>
                  </div>

                  {/* Word Reveal Display */}
                  <div className="flex justify-center gap-3 py-6">
                    {currentGuessWord.split("").map((char, idx) => {
                      const revealed = guessedLetters.includes(char);
                      return (
                        <div 
                          key={idx}
                          className="w-10 h-12 md:w-12 md:h-14 border-b-4 border-primary flex items-center justify-center text-xl md:text-2xl font-bold text-slate-800 bg-slate-50 rounded-t-lg shadow-sm"
                        >
                          {revealed ? char : ""}
                        </div>
                      );
                    })}
                  </div>

                  {/* Kannada Hint */}
                  {lang === 'kn' && (
                    <div className="bg-primary/5 rounded-xl p-3 border border-primary/10 text-center max-w-md mx-auto my-3">
                      <p className="text-xs font-bold text-primary">ಕನ್ನಡ ಸುಳಿವು:</p>
                      <p className="text-sm font-semibold text-slate-700 mt-1">
                        {guessWordHintsKn[currentGuessWord] || "ಬೈಬಲ್ ಪದ"}
                      </p>
                    </div>
                  )}

                  {/* Virtual Keyboard */}
                  <div className="space-y-4">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center">
                      {lang === 'kn' ? "ಬೈಬಲ್ ಪದವನ್ನು ಊಹಿಸಲು ಅಕ್ಷರಗಳನ್ನು ಟ್ಯಾಪ್ ಮಾಡಿ" : "Tap Letters to Guess the Biblical Term"}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
                      {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
                        const isGuessed = guessedLetters.includes(letter);
                        const isCorrect = currentGuessWord.includes(letter);

                        let style = "bg-slate-50 text-slate-800 hover:bg-slate-150 border border-slate-200 hover:border-slate-300";
                        if (isGuessed) {
                          style = isCorrect 
                            ? "bg-emerald-500 text-white pointer-events-none"
                            : "bg-red-500 text-white pointer-events-none opacity-40";
                        }

                        return (
                          <button
                            key={letter}
                            onClick={() => handleGuessLetter(letter)}
                            disabled={isGuessed}
                            className={`w-9 h-9 md:w-10 md:h-10 text-xs font-extrabold rounded-lg flex items-center justify-center transition-all cursor-pointer ${style}`}
                          >
                            {letter}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}


              {/* GAME 6: True or False Sprint */}
              {activeGameId === 'true_false' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-primary">
                      {lang === 'kn'
                        ? `ಸರಿ ಅಥವಾ ತಪ್ಪು ಸರಣಿ — ಪ್ರಶ್ನೆ ${tfIndex + 1}`
                        : `TRUE OR FALSE SPRINT — QUESTION ${tfIndex + 1}`
                      }
                    </span>
                    <div className="flex items-center gap-3 text-xs font-bold">
                      <span className="text-secondary">
                        {lang === 'kn' ? `🔥 ಸರಣಿ ಸಾಧನೆ: ${tfStreak}` : `🔥 Streak: ${tfStreak}`}
                      </span>
                      <span className="text-red-500 animate-pulse">
                        ⏰ {tfTimeLeft}{lang === 'kn' ? "ಸೆಕೆಂಡ್ ಉಳಿದಿದೆ" : "s remaining"}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-150 rounded-2xl p-6 text-center">
                    <p className="font-serif text-lg text-slate-800 font-semibold max-w-xl mx-auto">
                      "{lang === 'kn' ? tfQuestionsKn[tfIndex].qKn : tfQuestions[tfIndex].q}"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2">
                    <button
                      onClick={() => handleTfAnswer(true)}
                      className="py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-serif font-extrabold rounded-xl shadow cursor-pointer text-sm"
                    >
                      {lang === 'kn' ? "ಸರಿ" : "True"}
                    </button>
                    <button
                      onClick={() => handleTfAnswer(false)}
                      className="py-4 bg-red-600 hover:bg-red-700 text-white font-serif font-extrabold rounded-xl shadow cursor-pointer text-sm"
                    >
                      {lang === 'kn' ? "ತಪ್ಪು" : "False"}
                    </button>
                  </div>
                </div>
              )}


              {/* GAME 7: Fill in the Blanks */}
              {activeGameId === 'fill_blanks' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-primary">
                      {lang === 'kn'
                        ? `ಖಾಲಿ ಜಾಗ ತುಂಬಿ — ಹಂತ ${gameState.currentStep + 1} / ${blanksQuestions.length}`
                        : `FILL IN BLANKS — STEP ${gameState.currentStep + 1} OF ${blanksQuestions.length}`
                      }
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {lang === 'kn' ? `ಅಂಕ: ${gameState.score}` : `Score: ${gameState.score}`}
                    </span>
                  </div>

                  <div className="bg-indigo-50/20 border border-indigo-100 rounded-2xl p-6">
                    <p className="font-serif text-base text-slate-800 leading-relaxed text-center">
                      "{lang === 'kn' ? blanksQuestionsKn[gameState.currentStep].sentenceKn : blanksQuestions[gameState.currentStep].sentence}"
                    </p>
                  </div>

                  {!blanksFeedback ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(lang === 'kn' ? blanksQuestionsKn[gameState.currentStep].optionsKn : blanksQuestions[gameState.currentStep].options).map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleBlanksAnswer(opt)}
                          className="p-4 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-900 border border-slate-200 hover:border-indigo-300 rounded-xl text-sm font-bold text-slate-700 transition-all text-left cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${
                        (blanksFeedback.includes("Superb") || blanksFeedback.includes("ಅದ್ಭುತ")) ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                      }`}>
                        {(blanksFeedback.includes("Superb") || blanksFeedback.includes("ಅದ್ಭುತ")) ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                        {blanksFeedback}
                      </div>

                      <button 
                        onClick={handleNextBlanks}
                        className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-xs hover:brightness-110 shadow cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{lang === 'kn' ? "ಮುಂದಿನ ಹಂತ" : "Next Step"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}


              {/* GAME 8: Odd One Out */}
              {activeGameId === 'odd_one' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-primary">
                      {lang === 'kn'
                        ? `ಗುಂಪಿಗೆ ಸೇರದ ಪದ — ಹಂತ ${gameState.currentStep + 1} / ${oddOneQuestions.length}`
                        : `ODD ONE OUT — STEP ${gameState.currentStep + 1} OF ${oddOneQuestions.length}`
                      }
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {lang === 'kn' ? `ಅಂಕ: ${gameState.score}` : `Score: ${gameState.score}`}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 font-semibold">
                    {lang === 'kn'
                      ? "ಈ ನಾಲ್ಕು ಪದಗಳಲ್ಲಿ ಉಳಿದ ಮೂರಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗದ ಒಂದನ್ನು ಗುರುತಿಸಿ:"
                      : "Pinpoint which item in this cluster of four is mismatched compared to the other three:"
                    }
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {(lang === 'kn' ? oddOneQuestionsKn[gameState.currentStep].itemsKn : oddOneQuestions[gameState.currentStep].items).map((item, idx) => {
                      const isSelected = oddSelected === item;
                      const isCorrectOdd = lang === 'kn' 
                        ? item === oddOneQuestionsKn[gameState.currentStep].oddKn
                        : item === oddOneQuestions[gameState.currentStep].odd;

                      let style = "bg-slate-50 border-slate-200 hover:bg-slate-100";
                      if (oddSelected) {
                        if (isCorrectOdd) style = "bg-emerald-100 border-emerald-300 text-emerald-900 pointer-events-none";
                        else if (isSelected) style = "bg-red-100 border-red-300 text-red-900 pointer-events-none";
                        else style = "opacity-50 pointer-events-none";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleOddSelect(item)}
                          disabled={!!oddSelected}
                          className={`p-4 border rounded-xl text-sm font-bold text-left transition-all cursor-pointer ${style}`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>

                  {oddSelected && (
                    <div className="space-y-4 pt-4 border-t border-slate-100 animate-fade-in">
                      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 font-semibold">
                        <p className="font-bold">
                          {lang === 'kn' ? "ನಿಮಗೆ ಗೊತ್ತೇ?" : "Did you know?"}
                        </p>
                        <p className="mt-1 leading-relaxed">
                          {lang === 'kn' ? oddOneQuestionsKn[gameState.currentStep].reasonKn : oddOneQuestions[gameState.currentStep].reason}
                        </p>
                      </div>

                      <button 
                        onClick={handleNextOdd}
                        className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-xs hover:brightness-110 shadow cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{lang === 'kn' ? "ಮುಂದಿನ ಹಂತ" : "Next Clues"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}


              {/* GAME 9: Bible Book Order */}
              {activeGameId === 'book_order' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-primary">
                      {lang === 'kn'
                        ? `ಪುಸ್ತಕಗಳ ಕ್ರಮ ಜೋಡಣೆ — ಸುತ್ತು ${gameState.currentStep + 1} / ${bookOrderQuestions.length}`
                        : `BOOK SEQUENCING — ROUND ${gameState.currentStep + 1} OF ${bookOrderQuestions.length}`
                      }
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {lang === 'kn' ? `ಅಂಕ: ${gameState.score}` : `Score: ${gameState.score}`}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 font-semibold">
                    {lang === 'kn'
                      ? "ಪುಸ್ತಕಗಳನ್ನು ಎಡದಿಂದ ಬಲಕ್ಕೆ ಕಾಲಾನುಕ್ರಮದಲ್ಲಿ ಜೋಡಿಸಿ (ಆದಿಕಾಂಡದಿಂದ ಪ್ರಕಟನೆಯವರೆಗೆ):"
                      : "Shift the books in chronological order as they appear from Left to Right (Genesis to Revelation):"
                    }
                  </p>

                  <div className="flex flex-wrap gap-4 py-4 justify-center">
                    {currentOrder.map((book, idx) => (
                      <div 
                        key={book}
                        className="flex flex-col items-center p-4 bg-slate-50 border-2 border-primary/20 rounded-2xl w-32 shadow-sm relative"
                      >
                        <span className="font-serif text-sm font-extrabold text-primary">{book}</span>
                        
                        {!orderFeedback && (
                          <div className="flex gap-1.5 mt-3">
                            <button
                              onClick={() => handleMoveOrder(idx, 'up')}
                              disabled={idx === 0}
                              className="px-2 py-0.5 bg-white border rounded text-xs hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                              title="Move Left"
                            >
                              ←
                            </button>
                            <button
                              onClick={() => handleMoveOrder(idx, 'down')}
                              disabled={idx === currentOrder.length - 1}
                              className="px-2 py-0.5 bg-white border rounded text-xs hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                              title="Move Right"
                            >
                              →
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {!orderFeedback ? (
                    <button
                      onClick={handleVerifyOrder}
                      className="px-8 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow cursor-pointer"
                    >
                      {lang === 'kn' ? "ಕ್ರಮ ಜೋಡಣೆ ಪರಿಶೀಲಿಸಿ" : "Verify Sequencing Order"}
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${
                        (orderFeedback.includes("Exquisite") || orderFeedback.includes("ಅತ್ಯುತ್ತಮ")) ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                      }`}>
                        {(orderFeedback.includes("Exquisite") || orderFeedback.includes("ಅತ್ಯುತ್ತಮ")) ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                        {orderFeedback}
                      </div>

                      <button 
                        onClick={handleNextOrder}
                        className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-xs hover:brightness-110 shadow cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{lang === 'kn' ? "ಮುಂದಿನ ಹಂತ" : "Next Step"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}


              {/* GAME 10: Map Landmarks Quiz */}
              {activeGameId === 'map_landmarks' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-primary">
                      {lang === 'kn'
                        ? `ನಕ್ಷೆ ಭೂಗೋಳ — ಹಂತ ${gameState.currentStep + 1} / ${mapLandmarksQuestions.length}`
                        : `MAP GEOGRAPHY — STEP ${gameState.currentStep + 1} OF ${mapLandmarksQuestions.length}`
                      }
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {lang === 'kn' ? `ಅಂಕ: ${gameState.score}` : `Score: ${gameState.score}`}
                    </span>
                  </div>

                  <div className="bg-rose-50/20 border border-rose-100 rounded-2xl p-6 text-center space-y-2 relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                      <MapPin className="w-24 h-24 text-rose-900" />
                    </div>
                    <p className="text-[10px] text-rose-600 font-extrabold uppercase">
                      {lang === 'kn' ? "ಸ್ಥಳವನ್ನು ಗುರುತಿಸಿ:" : "Spot the Location:"}
                    </p>
                    <p className="font-serif text-sm md:text-base text-slate-800 font-semibold max-w-xl mx-auto">
                      "{lang === 'kn' ? mapLandmarksQuestionsKn[gameState.currentStep].landmarkKn : mapLandmarksQuestions[gameState.currentStep].landmark}"
                    </p>
                  </div>

                  {!mapFeedback ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(lang === 'kn' ? mapLandmarksQuestionsKn[gameState.currentStep].optionsKn : mapLandmarksQuestions[gameState.currentStep].options).map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleMapAnswer(opt)}
                          className="p-4 bg-slate-50 hover:bg-rose-50 hover:text-rose-900 border border-slate-200 hover:border-rose-300 rounded-xl text-sm font-bold text-slate-700 transition-all text-left cursor-pointer"
                        >
                          📍 {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${
                        (mapFeedback.includes("perfect") || mapFeedback.includes("ಪರಿಪೂರ್ಣ")) ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                      }`}>
                        {(mapFeedback.includes("perfect") || mapFeedback.includes("ಪರಿಪೂರ್ಣ")) ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                        {mapFeedback}
                      </div>

                      <button 
                        onClick={handleNextMap}
                        className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-xs hover:brightness-110 shadow cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{lang === 'kn' ? "ಮುಂದಿನ ಹಂತ" : "Next Step"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

        </div>
      )}

    </div>
  );
}
