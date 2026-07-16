import { Question, Book, Character, FavoriteVerse } from './types';

export interface QuizLevel {
  id: string;
  levelNumber: number;
  title: string;
  titleKannada: string;
  description: string;
  descriptionKannada: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  requiredLevel: number;
  xpReward: number;
  coinReward: number;
  questions: Question[];
  icon: string;
}

export const QUIZ_LEVELS: QuizLevel[] = [
  {
    id: "level1",
    levelNumber: 1,
    title: "The Nativity & Early Life",
    titleKannada: "ಯೇಸುವಿನ ಜನನ ಮತ್ತು ಬಾಲ್ಯ",
    description: "Learn about the birth of Jesus in Bethlehem, Mary and Joseph, and His childhood.",
    descriptionKannada: "ಬೆತ್ಲೆಹೇಮಿನಲ್ಲಿ ಯೇಸುವಿನ ಜನನ, ಮರಿಯ ಮತ್ತು ಯೋಸೇಫರ ವಿವರಗಳು ಮತ್ತು ಆತನ ಬಾಲ್ಯದ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ.",
    difficulty: "Easy",
    requiredLevel: 1,
    xpReward: 100,
    coinReward: 50,
    icon: "baby",
    questions: [
      {
        id: 101,
        question: "Where was Jesus born?",
        questionKannada: "ಯೇಸು ಎಲ್ಲಿ ಹುಟ್ಟಿದನು?",
        options: ["Nazareth", "Bethlehem", "Jerusalem", "Jericho"],
        optionsKannada: ["ನಜರೇತ್", "ಬೆತ್ಲೆಹೇಮ್", "ಯೆರೂಸಲೇಮ್", "ಯೆರಿಕೋ"],
        correctIndex: 1,
        topic: "The Nativity",
        difficulty: "Easy"
      },
      {
        id: 102,
        question: "Who was the mother of Jesus?",
        questionKannada: "ಯೇಸುವಿನ ತಾಯಿ ಯಾರು?",
        options: ["Elizabeth", "Mary", "Martha", "Salome"],
        optionsKannada: ["ಎಲಿಸಬೆತ್", "ಮರಿಯ", "ಮಾರ್ಥಳು", "ಸಲೋಮಿ"],
        correctIndex: 1,
        topic: "The Nativity",
        difficulty: "Easy"
      },
      {
        id: 103,
        question: "What did the wise men follow to find baby Jesus?",
        questionKannada: "ಜ್ಞಾನಿಗಳು ಬಾಲ ಯೇಸುವನ್ನು ಹುಡುಕಲು ಏನನ್ನು ಅನುಸರಿಸಿದರು?",
        options: ["A bright star", "A flying dove", "A mountain path", "A dry riverbed"],
        optionsKannada: ["ಪ್ರಕಾಶಮಾನವಾದ ನಕ್ಷತ್ರ", "ಹಾರುವ ಪಾರಿವಾಳ", "ಪರ್ವತದ ಹಾದಿ", "ಒಣಗಿದ ನದಿ"],
        correctIndex: 0,
        topic: "The Nativity",
        difficulty: "Easy"
      },
      {
        id: 104,
        question: "Which country did Mary and Joseph flee to with baby Jesus to escape King Herod?",
        questionKannada: "ಹೆರೋದ ರಾಜನಿಂದ ತಪ್ಪಿಸಿಕೊಳ್ಳಲು ಮರಿಯ ಮತ್ತು ಯೋಸೇಫರು ಬಾಲ ಯೇಸುವಿನೊಂದಿಗೆ ಯಾವ ದೇಶಕ್ಕೆ ಓಡಿಹೋದರು?",
        options: ["Rome", "Damascus", "Egypt", "Athens"],
        optionsKannada: ["ರೋಮ್", "ದಮಸ್ಕಸ್", "ಈಜಿಪ್ಟ್", "ಅಥೆನ್ಸ್"],
        correctIndex: 2,
        topic: "Early Life",
        difficulty: "Easy"
      },
      {
        id: 105,
        question: "How old was Jesus when he was found teaching in the Temple in Jerusalem?",
        questionKannada: "ಯೆರೂಸಲೇಮಿನ ಮಂದಿರದಲ್ಲಿ ಬೋಧಿಸುತ್ತಿದ್ದಾಗ ಯೇಸುವಿಗೆ ಎಷ್ಟು ವರ್ಷ ವಯಸ್ಸಾಗಿತ್ತು?",
        options: ["8 years old", "12 years old", "18 years old", "30 years old"],
        optionsKannada: ["೮ ವರ್ಷ", "೧೨ ವರ್ಷ", "೧೮ ವರ್ಷ", "೩೦ ವರ್ಷ"],
        correctIndex: 1,
        topic: "Early Life",
        difficulty: "Easy"
      }
    ]
  },
  {
    id: "level2",
    levelNumber: 2,
    title: "The Disciples & The Call",
    titleKannada: "ಶಿಷ್ಯರು ಮತ್ತು ಅವರ ಕರೆಯುವಿಕೆ",
    description: "Discover how Jesus called His disciples and the fishers of men.",
    descriptionKannada: "ಯೇಸು ತನ್ನ ಶಿಷ್ಯರನ್ನು ಮತ್ತು ಮನುಷ್ಯರನ್ನು ಹಿಡಿಯುವ ಬೆಸ್ತರನ್ನಾಗಿ ಹೇಗೆ ಕರೆದನು ಎಂಬುದನ್ನು ಅನ್ವೇಷಿಸಿ.",
    difficulty: "Easy",
    requiredLevel: 2,
    xpReward: 120,
    coinReward: 60,
    icon: "users",
    questions: [
      {
        id: 201,
        question: "How many disciples did Jesus choose as His inner circle?",
        questionKannada: "ಯೇಸು ತನ್ನ ಮುಖ್ಯ ಶಿಷ್ಯರನ್ನಾಗಿ ಎಷ್ಟು ಜನರನ್ನು ಆರಿಸಿಕೊಂಡನು?",
        options: ["10", "12", "70", "3"],
        optionsKannada: ["೧೦", "೧೨", "೭೦", "೩"],
        correctIndex: 1,
        topic: "The Disciples",
        difficulty: "Easy"
      },
      {
        id: 202,
        question: "What was the profession of Simon Peter before he followed Jesus?",
        questionKannada: "ಸೀಮೋನ ಪೇತ್ರನು ಯೇಸುವನ್ನು ಅನುಸರಿಸುವ ಮೊದಲು ಅವನ ವೃತ್ತಿ ಏನಾಗಿತ್ತು?",
        options: ["Tax collector", "Fisherman", "Carpenter", "Tentmaker"],
        optionsKannada: ["ತೆರಿಗೆ ವಸೂಲಿಗಾರ", "ಮೀನುಗಾರ", "ಬಡಗಿ", "ಡೇರೆ ತಯಾರಕ"],
        correctIndex: 1,
        topic: "The Disciples",
        difficulty: "Easy"
      },
      {
        id: 203,
        question: "Which disciple was a tax collector before being called by Jesus?",
        questionKannada: "ಯೇಸು ಕರೆಯುವ ಮೊದಲು ತೆರಿಗೆ ವಸೂಲಿಗಾರನಾಗಿದ್ದ ಶಿಷ್ಯ ಯಾರು?",
        options: ["Matthew", "John", "Judas", "Andrew"],
        optionsKannada: ["ಮತ್ತಾಯ", "ಯೋಹಾನ", "ಯೂದ", "ಅಂದ್ರೆಯ"],
        correctIndex: 0,
        topic: "The Disciples",
        difficulty: "Medium"
      },
      {
        id: 204,
        question: "Who was the first disciple to follow Jesus, and brought his brother Peter to Him?",
        questionKannada: "ಯೇಸುವನ್ನು ಅನುಸರಿಸಿದ ಮೊದಲ ಶಿಷ್ಯ ಯಾರು, ಮತ್ತು ತನ್ನ ಸಹೋದರ ಪೇತ್ರನನ್ನು ಆತನ ಬಳಿಗೆ ಕರೆತಂದವರು ಯಾರು?",
        options: ["Philip", "Thomas", "Andrew", "James"],
        optionsKannada: ["ಫಿಲಿಪ್ಪ", "ತೋಮ", "ಅಂದ್ರೆಯ", "ಯಾಕೋಬ"],
        correctIndex: 2,
        topic: "The Disciples",
        difficulty: "Medium"
      },
      {
        id: 205,
        question: "Which disciple doubted Jesus' resurrection until he saw the nail marks?",
        questionKannada: "ಯೇಸುವಿನ ಉಜ್ಜೀವನವನ್ನು ಮೊಳೆಗಳ ಗುರುತುಗಳನ್ನು ನೋಡುವವರೆಗೂ ನಂಬದ ಶಿಷ್ಯ ಯಾರು?",
        options: ["Judas", "Thomas", "Peter", "Bartholomew"],
        optionsKannada: ["ಯೂದ", "ತೋಮ", "ಪೇತ್ರ", "ಬಾರ್ತಲೋಮಯ"],
        correctIndex: 1,
        topic: "The Disciples",
        difficulty: "Medium"
      }
    ]
  },
  {
    id: "level3",
    levelNumber: 3,
    title: "Parables of the Kingdom",
    titleKannada: "ಪರಲೋಕ ರಾಜ್ಯದ ಸಾಮ್ಯಗಳು",
    description: "Unpack the deep spiritual teachings and parables told by Jesus.",
    descriptionKannada: "ಯೇಸು ಹೇಳಿದ ಆಳವಾದ ಆಧ್ಯಾತ್ಮಿಕ ಬೋಧನೆಗಳು ಮತ್ತು ಸಾಮ್ಯಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
    difficulty: "Medium",
    requiredLevel: 5,
    xpReward: 150,
    coinReward: 80,
    icon: "bookOpen",
    questions: [
      {
        id: 301,
        question: "In the Parable of the Sower, what does the seed represent?",
        questionKannada: "ಬಿತ್ತುವವನ ಸಾಮ್ಯದಲ್ಲಿ ಬಿತ್ತಿದ ಬೀಜವು ಏನನ್ನು ಸೂಚಿಸುತ್ತದೆ?",
        options: ["Money", "People", "The Word of God", "Faith"],
        optionsKannada: ["ಹಣ", "ಜನರು", "ದೇವರ ವಾಕ್ಯ", "ನಂಬಿಕೆ"],
        correctIndex: 2,
        topic: "Parables",
        difficulty: "Medium"
      },
      {
        id: 302,
        question: "Who helped the beaten traveler in the famous parable of mercy?",
        questionKannada: "ದಯೆಯ ಪ್ರಸಿದ್ಧ ಸಾಮ್ಯದಲ್ಲಿ ಪೆಟ್ಟು ತಿಂದ ದಾರಿಕಾರನಿಗೆ ಸಹಾಯ ಮಾಡಿದವರು ಯಾರು?",
        options: ["The Priest", "The Levite", "The Good Samaritan", "The Innkeeper"],
        optionsKannada: ["ಯಾಜಕ", "ಲೇವಿಯ", "ಒಳ್ಳೆಯ ಸಮಾರ್ಯದವನು", "ಛತ್ರದವನು"],
        correctIndex: 2,
        topic: "Parables",
        difficulty: "Easy"
      },
      {
        id: 303,
        question: "What did the loving father do when the Prodigal Son finally returned home?",
        questionKannada: "ಪೋಕರಿ ಮಗನು ಕೊನೆಗೂ ಮನೆಗೆ ಹಿಂದಿರುಗಿದಾಗ ಪ್ರೀತಿಯ ತಂದೆ ಏನು ಮಾಡಿದನು?",
        options: ["He banished him", "He ran and embraced him", "He made him a slave", "He ignored him"],
        optionsKannada: ["ಅವನನ್ನು ಹೊರಹಾಕಿದನು", "ಓಡಿಹೋಗಿ ತಬ್ಬಿಕೊಂಡನು", "ಅವನನ್ನು ಗುಲಾಮನ್ನಾಗಿ ಮಾಡಿದನು", "ಅವನನ್ನು ಅಲಕ್ಷಿಸಿದನು"],
        correctIndex: 1,
        topic: "Parables",
        difficulty: "Medium"
      },
      {
        id: 304,
        question: "How many of the ninety-nine sheep did the shepherd leave behind to find the one lost sheep?",
        questionKannada: "ಕಳೆದುಹೋದ ಒಂದು ಕುರಿಯನ್ನು ಹುಡುಕಲು ಕುರುಬನು ಎಷ್ಟು ಕುರಿಗಳನ್ನು ಬಿಟ್ಟು ಹೋದನು?",
        options: ["99 sheep", "50 sheep", "1 sheep", "10 sheep"],
        optionsKannada: ["೯೯ ಕುರಿಗಳು", "೫೦ ಕುರಿಗಳು", "೧ ಕುರಿ", "೧೦ ಕುರಿಗಳು"],
        correctIndex: 0,
        topic: "Parables",
        difficulty: "Medium"
      },
      {
        id: 305,
        question: "In the Parable of the Talents, what did the servant with one talent do with it?",
        questionKannada: "ತಲಾಂತುಗಳ ಸಾಮ್ಯದಲ್ಲಿ, ಒಂದು ತಲಾಂತು ಪಡೆದ ಸೇವಕನು ಅದನ್ನು ಏನು ಮಾಡಿದನು?",
        options: ["He buried it in the ground", "He doubled it", "He spent it on food", "He lost it"],
        optionsKannada: ["ಮಣ್ಣಿನಲ್ಲಿ ಹೂತಿಟ್ಟನು", "ಅದನ್ನು ದುಪ್ಪಟ್ಟು ಮಾಡಿದನು", "ಹಣವನ್ನು ಊಟಕ್ಕೆ ಬಳಸಿದನು", "ಅದನ್ನು ಕಳೆದುಕೊಂಡನು"],
        correctIndex: 0,
        topic: "Parables",
        difficulty: "Medium"
      }
    ]
  },
  {
    id: "level4",
    levelNumber: 4,
    title: "Miracles & Divine Signs",
    titleKannada: "ಅದ್ಭುತಗಳು ಮತ್ತು ದೈವಿಕ ಚಿಹ್ನೆಗಳು",
    description: "Test your knowledge on the powerful signs and wonders performed by Jesus.",
    descriptionKannada: "ಯೇಸು ಮಾಡಿದ ಶಕ್ತಿಯುತ ಅದ್ಭುತಗಳು ಮತ್ತು ಪವಾಡಗಳ ಬಗ್ಗೆ ನಿಮ್ಮ ಜ್ಞಾನವನ್ನು ಪರೀಕ್ಷಿಸಿ.",
    difficulty: "Medium",
    requiredLevel: 8,
    xpReward: 180,
    coinReward: 100,
    icon: "sparkles",
    questions: [
      {
        id: 401,
        question: "What was Jesus' first recorded miracle in His ministry?",
        questionKannada: "ಯೇಸುವಿನ ಸೇವೆಯಲ್ಲಿ ದಾಖಲಾದ ಮೊದಲ ಪವಾಡ ಯಾವುದು?",
        options: ["Healing a blind man", "Changing water into wine", "Feeding the 5000", "Calming the storm"],
        optionsKannada: ["ಕುರುಡನನ್ನು ಗುಣಪಡಿಸುವುದು", "ನೀರನ್ನು ದ್ರಾಕ್ಷಾರಸವಾಗಿ ಬದಲಾಯಿಸುವುದು", "೫೦೦೦ ಜನರಿಗೆ ಉಣಿಸುವುದು", "ಬಿರುಗಾಳಿಯನ್ನು ಅಡಗಿಸುವುದು"],
        correctIndex: 1,
        topic: "Miracles",
        difficulty: "Medium"
      },
      {
        id: 402,
        question: "Which miracle of Jesus is uniquely recorded in all four Gospels?",
        questionKannada: "ನಾಲ್ಕೂ ಸುವಾರ್ತೆಗಳಲ್ಲಿ ದಾಖಲಾಗಿರುವ ಯೇಸುವಿನ ಪವಾಡ ಯಾವುದು?",
        options: ["Walking on water", "Feeding of the 5000", "Turning water into wine", "Raising Lazarus"],
        optionsKannada: ["ನೀರಿನ ಮೇಲೆ ನಡೆಯುವುದು", "೫೦೦೦ ಜನರಿಗೆ ಉಣಿಸುವುದು", "ನೀರನ್ನು ದ್ರಾಕ್ಷಾರಸವಾಗಿ ಮಾಡುವುದು", "ಲಾಜರನನ್ನು ಎಬ್ಬಿಸುವುದು"],
        correctIndex: 1,
        topic: "Miracles",
        difficulty: "Hard"
      },
      {
        id: 403,
        question: "In what river was Jesus baptized by John?",
        questionKannada: "ಯಾವ ನದಿಯಲ್ಲಿ ಯೇಸು ಯೋಹಾನನಿಂದ ದೀಕ್ಷಾಸ್ನಾನ ಪಡೆದನು?",
        options: ["Nile", "Jordan", "Euphrates", "Tigris"],
        optionsKannada: ["ನೈಲ್", "ಜೋರ್ಡಾನ್", "ಯೂಫ್ರೇಟೀಸ್", "ಟೈಗ್ರಿಸ್"],
        correctIndex: 1,
        topic: "Miracles",
        difficulty: "Easy"
      },
      {
        id: 404,
        question: "How many baskets of leftovers were gathered after feeding the 5,000?",
        questionKannada: "ಐದು ಸಾವಿರ ಜನರಿಗೆ ಉಣಿಸಿದ ನಂತರ ಎಷ್ಟು ಬುಟ್ಟಿಗಳಷ್ಟು ಉಳಿಕೆಗಳನ್ನು ಒಟ್ಟುಗೂಡಿಸಲಾಯಿತು?",
        options: ["7 baskets", "12 baskets", "3 baskets", "10 baskets"],
        optionsKannada: ["೭ ಬುಟ್ಟಿಗಳು", "೧೨ ಬುಟ್ಟಿಗಳು", "೩ ಬುಟ್ಟಿಗಳು", "೧೦ ಬುಟ್ಟಿಗಳು"],
        correctIndex: 1,
        topic: "Miracles",
        difficulty: "Medium"
      },
      {
        id: 405,
        question: "What did Jesus use to heal the blind man in John chapter 9?",
        questionKannada: "ಯೋಹಾನ 9 ನೇ ಅಧ್ಯಾಯದಲ್ಲಿ ಕುರುಡನನ್ನು ಗುಣಪಡಿಸಲು ಯೇಸು ಏನನ್ನು ಬಳಸಿದನು?",
        options: ["Only water", "Clay made from dirt and spit", "Olive oil", "A branch of hyssop"],
        optionsKannada: ["ಕೇವಲ ನೀರು", "ಮಣ್ಣು ಮತ್ತು ಉಗುಳಿನಿಂದ ಮಾಡಿದ ಕೆಸರು", "ಒಲೀವ್ ಎಣ್ಣೆ", "ಹಿಸ್ಸೋಪ್ ರೆಂಬೆ"],
        correctIndex: 1,
        topic: "Miracles",
        difficulty: "Hard"
      }
    ]
  },
  {
    id: "level5",
    levelNumber: 5,
    title: "Passion Week & Sacrifice",
    titleKannada: "ಶ್ರಮದ ವಾರ ಮತ್ತು ಬಲಿದಾನ",
    description: "Walk through the dramatic events of the Last Supper, Gethsemane, and the Crucifixion.",
    descriptionKannada: "ಕೊನೆಯ ಭೋಜನ, ಗೆತ್ಸೆಮನೆ ತೋಟದ ಪ್ರಾರ್ಥನೆ ಮತ್ತು ಶಿಲುಬೆಗೇರಿಸುವಿಕೆಯ ಘಟನೆಗಳ ಮೂಲಕ ಸಾಗಿರಿ.",
    difficulty: "Hard",
    requiredLevel: 12,
    xpReward: 220,
    coinReward: 120,
    icon: "cross",
    questions: [
      {
        id: 501,
        question: "What city did Jesus enter riding on a donkey, celebrated with palm branches?",
        questionKannada: "ತಾಳೆ ಗರಿಗಳೊಂದಿಗೆ ಆಚರಿಸಲ್ಪಟ್ಟ ಯೇಸು ಕತ್ತೆಯ ಮೇಲೆ ಹತ್ತಿ ಪ್ರವೇಶಿಸಿದ ಪವಿತ್ರ ನಗರ ಯಾವುದು?",
        options: ["Nazareth", "Jerusalem", "Capernaum", "Bethlehem"],
        optionsKannada: ["ನಜರೇತ್", "ಯೆರೂಸಲೇಮ್", "ಕಪೆರ್ನೌಮ್", "ಬೆತ್ಲೆಹೇಮ್"],
        correctIndex: 1,
        topic: "Passion Week",
        difficulty: "Medium"
      },
      {
        id: 502,
        question: "Which disciple betrayed Jesus for thirty pieces of silver?",
        questionKannada: "ಮೂವತ್ತು ಬೆಳ್ಳಿ ನಾಣ್ಯಗಳಿಗಾಗಿ ಯೇಸುವನ್ನು ದ್ರೋಹ ಮಾಡಿದ ಶಿಷ್ಯ ಯಾರು?",
        options: ["Simon Peter", "Judas Iscariot", "Thomas", "John"],
        optionsKannada: ["ಸೀಮೋನ ಪೇತ್ರ", "ಯೂದ ಇಸ್ಕರಿಯೋತ", "ತೋಮ", "ಯೋಹಾನ"],
        correctIndex: 1,
        topic: "Passion Week",
        difficulty: "Easy"
      },
      {
        id: 503,
        question: "In which garden did Jesus pray in deep agony before His arrest?",
        questionKannada: "ಬಂಧನಕ್ಕೊಳಗಾಗುವ ಮುನ್ನ ಯೇಸು ಅತಿ ದುಃಖದಿಂದ ಪ್ರಾರ್ಥಿಸಿದ ತೋಟ ಯಾವುದು?",
        options: ["Eden", "Gethsemane", "Golgotha", "Carmel"],
        optionsKannada: ["ಏದೆನ್", "ಗೆತ್ಸೇಮನೆ", "ಗೊಲ್ಗೊಥಾ", "ಕರ್ಮೆಲ್"],
        correctIndex: 1,
        topic: "Passion Week",
        difficulty: "Medium"
      },
      {
        id: 504,
        question: "How many times did Simon Peter deny knowing Jesus before the rooster crowed?",
        questionKannada: "ಕೋಳಿ ಕೂಗುವ ಮುನ್ನ ಸೀಮೋನ ಪೇತ್ರನು ಯೇಸುವನ್ನು ತನಗೆ ತಿಳಿಯದೆಂದು ಎಷ್ಟು ಬಾರಿ ನಿರಾಕರಿಸಿದನು?",
        options: ["Once", "Twice", "Three times", "Seven times"],
        optionsKannada: ["ಒಂದು ಬಾರಿ", "ಎರಡು ಬಾರಿ", "ಮೂರು ಬಾರಿ", "ಏಳು ಬಾರಿ"],
        correctIndex: 2,
        topic: "Passion Week",
        difficulty: "Medium"
      },
      {
        id: 505,
        question: "What was the final statement of Jesus on the cross recorded in John 19:30?",
        questionKannada: "ಯೋಹಾನ 19:30 ರಲ್ಲಿ ದಾಖಲಾಗಿರುವ ಯೇಸುವಿನ ಕೊನೆಯ ಮಾತು ಯಾವುದು?",
        options: ["\"It is finished\"", "\"My God, why have you forsaken me?\"", "\"Father, forgive them\"", "\"Into your hands I commit my spirit\""],
        optionsKannada: ["\"ಎಲ್ಲಾ ಮುಗಿಯಿತು\"", "\"ನನ್ನ ದೇವರೇ, ನನ್ನ ದೇವರೇ, ನನ್ನನ್ನು ಏಕೆ ಕೈಬಿಟ್ಟೆ?\"", "\"ತಂದೆಯೇ, ಇವರನ್ನು ಕ್ಷಮಿಸು\"", "\"ತಂದೆಯೇ, ನಿನ್ನ ಕೈಯಲ್ಲಿ ನನ್ನ ಆತ್ಮವನ್ನು ಒಪ್ಪಿಸಿಕೊಡುತ್ತೇನೆ\""],
        correctIndex: 0,
        topic: "Passion Week",
        difficulty: "Hard"
      }
    ]
  },
  {
    id: "level6",
    levelNumber: 6,
    title: "Resurrection & Early Church",
    titleKannada: "ಪುನರುತ್ಥಾನ ಮತ್ತು ಆದಿ ಸಭೆ",
    description: "Witness the empty tomb, the Pentecost, and the spreading of the Gospel to the nations.",
    descriptionKannada: "ಖಾಲಿ ಸಮಾಧಿ, ಪಂಚಾಶತ್ತಮ ಹಬ್ಬದ ಪವಿತ್ರಾತ್ಮನ ಆಗಮನ ಮತ್ತು ಸಭೆಯ ಆರಂಭದ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ.",
    difficulty: "Expert",
    requiredLevel: 15,
    xpReward: 300,
    coinReward: 150,
    icon: "crown",
    questions: [
      {
        id: 601,
        question: "Who was the first person to see the risen Jesus near the empty tomb?",
        questionKannada: "ಖಾಲಿ ಸಮಾಧಿಯ ಬಳಿ ಎದ್ದ ಯೇಸುವನ್ನು ನೋಡಿದ ಮೊದಲ ವ್ಯಕ್ತಿ ಯಾರು?",
        options: ["Simon Peter", "Mary Magdalene", "John", "Mother Mary"],
        optionsKannada: ["ಸೀಮೋನ ಪೇತ್ರ", "ಮರಿಯ ಮಗ್ದಲೇನೆ", "ಯೋಹಾನ", "ತಾಯಿ ಮರಿಯಳು"],
        correctIndex: 1,
        topic: "Resurrection",
        difficulty: "Medium"
      },
      {
        id: 602,
        question: "For how many days did Jesus appear to His disciples before His Ascension?",
        questionKannada: "ಯೇಸು ಪರಲೋಕಕ್ಕೆ ಏರಿಹೋಗುವ ಮುನ್ನ ತನ್ನ ಶಿಷ್ಯರಿಗೆ ಎಷ್ಟು ದಿನಗಳ ಕಾಲ ಕಾಣಿಸಿಕೊಂಡನು?",
        options: ["7 days", "12 days", "40 days", "50 days"],
        optionsKannada: ["೭ ದಿನಗಳು", "೧೨ ದಿನಗಳು", "೪೦ ದಿನಗಳು", "೫೦ ದಿನಗಳು"],
        correctIndex: 2,
        topic: "Resurrection",
        difficulty: "Hard"
      },
      {
        id: 603,
        question: "What major event took place fifty days after Easter, marked by wind and tongues of fire?",
        questionKannada: "ಈಸ್ಟರ್ ಹಬ್ಬದ ನಂತರ ಐವತ್ತನೆಯ ದಿನ ನಡೆದ, ಬಿರುಗಾಳಿ ಮತ್ತು ಅಗ್ನಿನಾಲಿಗೆಗಳಿಂದ ಗುರುತಿಸಲ್ಪಟ್ಟ ಪವಿತ್ರ ದಿನ ಯಾವುದು?",
        options: ["The Ascension", "The Transfiguration", "The Pentecost", "The Passover"],
        optionsKannada: ["ಆರೋಹಣ", "ರೂಪಾಂತರ", "ಪೆಂಟೆಕೋಸ್ಟ್", "ಪಸ್ಕ ಹಬ್ಬ"],
        correctIndex: 2,
        topic: "Early Church",
        difficulty: "Hard"
      },
      {
        id: 604,
        question: "Which prosecutor of the early Church was blinded by a light on the road to Damascus and became an apostle?",
        questionKannada: "ಆದಿ ಸಭೆಯನ್ನು ಹಿಂಸಿಸುತ್ತಿದ್ದ, ದಮಸ್ಕಸ್ ಹಾದಿಯಲ್ಲಿ ಕುರುಡನಾಗಿ ನಂತರ ಅಪೊಸ್ತಲನಾಗಿ ಬದಲಾದವರು ಯಾರು?",
        options: ["Saul (Paul)", "Barnabas", "Stephen", "Cornelius"],
        optionsKannada: ["ಸೌಲ (ಪೌಲ)", "ಬಾರ್ನಬ", "ಸ್ತೇಫನ", "ಕೊರ್ನೇಲ್ಯ"],
        correctIndex: 0,
        topic: "Early Church",
        difficulty: "Medium"
      },
      {
        id: 605,
        question: "In which city were the believers first called \"Christians\"?",
        questionKannada: "ವಿಶ್ವಾಸಿಗಳನ್ನು ಮೊದಲ ಬารಿಗೆ \"ಕ್ರೈಸ್ತರು\" ಎಂದು ಯಾವ ನಗರದಲ್ಲಿ ಕರೆಯಲಾಯಿತು?",
        options: ["Rome", "Jerusalem", "Antioch", "Ephesus"],
        optionsKannada: ["ರೋಮ್", "ಯೆರೂಸಲೇಮ್", "ಅಂತಿಯೋಕ್ಯ", "ಎಫೆಸ"],
        correctIndex: 2,
        topic: "Early Church",
        difficulty: "Hard"
      }
    ]
  }
];

// Re-export original questions arrays pointing to their level subsets for backwards compatibility
export const LIFE_OF_JESUS_QUESTIONS: Question[] = QUIZ_LEVELS[0].questions.concat(QUIZ_LEVELS[4].questions);
export const MIRACLES_QUIZ_QUESTIONS: Question[] = QUIZ_LEVELS[3].questions;


export const BIBLICAL_BOOKS: Book[] = [
  {
    id: "genesis",
    name: "Genesis",
    nameKannada: "ಆದಿಕಾಂಡ",
    category: "Pentateuch",
    description: "The book of beginnings, detailing the creation of the world and the origins of the Israelites.",
    progress: 85,
    author: "Moses",
    date: "c. 1445–1405 BC",
    purpose: "To record God's creation of the world and his desire to have a people set apart to worship him. Genesis sets the stage for the entire Bible, establishing the relationship between the Creator and His creation.",
    keyVerse: "In the beginning, God created the heavens and the earth.",
    keyVerseRef: "Genesis 1:1",
    themes: ["Creation & New Beginnings", "God's Covenant with Mankind", "Origins of the Human Race", "Divine Sovereignty"]
  },
  {
    id: "exodus",
    name: "Exodus",
    nameKannada: "ವಿಮೋಚನಾಕಾಂಡ",
    category: "Pentateuch",
    description: "The liberation of Israel from Egyptian bondage and the giving of the Law at Sinai.",
    progress: 40,
    author: "Moses",
    date: "c. 1445–1405 BC",
    purpose: "To record the events of Israel's deliverance from Egypt, the establishment of the Sinai Covenant, and the building of the Tabernacle to house God's presence.",
    keyVerse: "And I have come down to deliver them out of the hand of the Egyptians and to bring them up out of that land to a good and broad land...",
    keyVerseRef: "Exodus 3:8",
    themes: ["Redemption & Deliverance", "The Law & Covenant", "God's Holy Presence", "Faithfulness vs Grumbling"]
  },
  {
    id: "psalms",
    name: "Psalms",
    nameKannada: "ಕೀರ್ತನೆಗಳು",
    category: "Poetry",
    description: "A collection of prayers, songs, and poems expressing the full range of human emotion to God.",
    progress: 22,
    author: "David, Asaph, Solomon, Moses, etc.",
    date: "c. 1000–500 BC",
    purpose: "To serve as a hymnal and prayer book for Israel, expressing worship, thanksgiving, lament, confession, and trust in God's promises.",
    keyVerse: "The Lord is my shepherd; I shall not want.",
    keyVerseRef: "Psalm 23:1",
    themes: ["Worship & Praise", "Lament & Deliverance", "The Kingship of God", "The Word of God"]
  }
];

export const PROMINENT_FIGURES: Character[] = [
  {
    id: "moses",
    name: "Moses",
    nickname: "Drawn from the water",
    role: "Lawgiver & Prophet",
    tribe: "Tribe of Levi",
    bio: "Moses is one of the most prominent figures in the Old Testament. Raised in Pharaoh's palace but chosen by God to lead Israel out of slavery in Egypt, he received the Ten Commandments on Mount Sinai and led the people through the wilderness for forty years.",
    achievements: [
      "Confronted Pharaoh to demand 'Let my people go'",
      "Parted the Red Sea under God's guidance",
      "Received the Ten Commandments on Sinai",
      "Wrote the Pentateuch (first five books of the Bible)"
    ],
    keyVerses: ["Exodus 3:4", "Deuteronomy 34:10", "Hebrews 11:24"],
    icon: "history_edu"
  },
  {
    id: "david",
    name: "David",
    nickname: "Beloved",
    role: "Shepherd to King",
    tribe: "Tribe of Judah",
    bio: "David, the youngest son of Jesse, began as a humble shepherd boy. Anointed by Samuel to be king, he defeated the giant Goliath, became a mighty warrior, established Jerusalem as Israel's capital, and composed many of the Psalms. God called him 'a man after my own heart.'",
    achievements: [
      "Defeated the Philistine giant Goliath",
      "Anointed King of Israel and unified the kingdom",
      "Conquered Jerusalem and made it the spiritual center",
      "Composed over 70 Psalms of worship and lament"
    ],
    keyVerses: ["1 Samuel 16:7", "2 Samuel 7:12-13", "Acts 13:22"],
    icon: "shield"
  }
];

export const DEFAULT_FAVORITE_VERSES: FavoriteVerse[] = [
  {
    id: "psalm23_1",
    verse: "The Lord is my shepherd; I shall not want.",
    reference: "Psalm 23:1",
    kannadaVerse: "ಯೆಹೋವನು ನನ್ನ ಕುರುಬನಾಗಿದ್ದಾನೆ; ನನಗೆ ಕೊರತೆಯಿರುವುದಿಲ್ಲ."
  },
  {
    id: "jeremiah29_11",
    verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    reference: "Jeremiah 29:11",
    kannadaVerse: "ಯಾಕಂದರೆ ನಾನು ನಿಮ್ಮ ಬಗ್ಗೆ ಇಟ್ಟಿರುವ ಆಲೋಚನೆಗಳನ್ನು ಬಲ್ಲೆನು ಎಂದು ಯೆಹೋವನು ಅನ್ನುತ್ತಾನೆ; ಅವು ಹಾನಿಯದಲ್ಲ, ಕ್ಷೇಮಕರವಾದವುಗಳೇ, ನಿರೀಕ್ಷೆಯುಳ್ಳ ಭವಿಷ್ಯತ್ತನ್ನು ನಿಮಗೆ ಕೊಡುವ ಆಲೋಚನೆಗಳೇ."
  },
  {
    id: "john3_16",
    verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reference: "John 3:16",
    kannadaVerse: "ಯಾಕಂದರೆ ದೇವರು ಲೋಕದ ಮೇಲೆ ಎಷ್ಟೋ ಪ್ರೀತಿಯನ್ನಿಟ್ಟು ತನ್ನ ಒಬ್ಬನೇ ಮಗನನ್ನು ಕೊಟ್ಟನು; ಆತನಲ್ಲಿ ನಂಬಿಕೆಯಿಡುವ ಒಬ್ಬನಾದರೂ ನಾಶವಾಗದೆ ನಿತ್ಯಜೀವವನ್ನು ಪಡೆಯುವಂತೆ ಆತನನ್ನು ಕೊಟ್ಟನು."
  }
];

export const NOAH_ARK_STORY = {
  title: "Noah's Ark",
  chapter: "The Great Vessel",
  part: "Quest Part 1 of 4",
  xpBonus: 250,
  badgeName: "Ark Badge",
  englishText: "God spoke to Noah, \"Build yourself an ark of cypress wood; make rooms in it and coat it with pitch inside and out.\" Noah obeyed every word, preparing for the great rains that would soon cleanse the earth. The massive structure began to take shape, a testament of faith against the horizon.",
  kannadaText: "ದೇವರು ನೋಹನಿಗೆ ಹೀಗೆಂದನು, \"ಗೋಪೆರ್ ಮರದಿಂದ ನಿನಗಾಗಿ ಒಂದು ನಾವೆಯನ್ನು ಮಾಡಿಕೊ; ನಾವೆಯಲ್ಲಿ ಕೋಣೆಗಳನ್ನು ಮಾಡಿ ಒಳಗೂ ಹೊರಗೂ ರಾಳವನ್ನು ಹಚ್ಚು.\" ನೋಹನು ಪ್ರತಿಯೊಂದು ಮಾತನ್ನು ಪಾಲಿಸಿದನು, ಭೂಮಿಯನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸುವ ಮಹಾ ಮಳೆಗಾಗಿ ತಯಾರಿ ನಡೆಸಿದನು. ಆ ಬೃಹತ್ ವಿನ್ಯಾಸವು ದಿಗಂತದ ಮೇಲೆ ನಂಬಿಕೆಯ ಸಾಕ್ಷಿಯಾಗಿ ರೂಪುಗೊಳ್ಳಲು ಪ್ರಾರಂಭಿಸಿತು.",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqgbYc4HA-pqJgZioA1zkWJkV6h78zF4qTmbwYlvIfURTJ3RXuho0Uo8rGO45QzkbF8WE41ZRvSsTi0S3co_1nHq8CM6ZqmeVL5RDRFBmOO8sI8QPYbcfGFZJIocBQzjuq6E8VZ7NqjO8w8dM6uZOXITM4Q4YOyz8K5_6fTZHLDf6OF0b-PPYb_dICjDCNvGNFUTxhrpSD5uJNqZNKR1OvXnCWFdpl0MvGz7McWN68neBz7Xy1adrJJg"
};
