// Bible Interactive Games Data - 20 Levels per Game
// Fully structured, rich dataset designed for the 10 arcade games.

export interface CharFindQuestion {
  target: string;
  clues: string[];
  options: string[];
}

export interface MatchPair {
  term: string;
  def: string;
}

export interface MatchRound {
  pairs: MatchPair[];
}

export interface ScrambleVerse {
  full: string;
  words: string[];
  correctOrder: string[];
}

export interface RiddleQuestion {
  riddle: string;
  answer: string;
  options: string[];
}

export interface TFQuestion {
  q: string;
  a: boolean;
}

export interface BlanksQuestion {
  sentence: string;
  missing: string;
  options: string[];
}

export interface OddOneQuestion {
  items: string[];
  odd: string;
  reason: string;
}

export interface BookOrderQuestion {
  initial: string[];
  correct: string[];
}

export interface MapLandmarksQuestion {
  landmark: string;
  answer: string;
  options: string[];
}

// 1. CHARACTER FINDING (20 levels)
export const charFindQuestions: CharFindQuestion[] = [
  {
    target: "Joseph",
    clues: [
      "I was sold into slavery by my brothers for twenty pieces of silver.",
      "I interpreted Pharaoh's dreams about seven years of abundance and seven years of famine.",
      "God blessed me to become a ruler in Egypt, second only to Pharaoh."
    ],
    options: ["Joseph", "Moses", "David", "Daniel"]
  },
  {
    target: "Samson",
    clues: [
      "I was dedicated to God as a Nazirite from my birth.",
      "I slew a lion with my bare hands and carried away the city gates of Gaza.",
      "My long hair was the source of my great strength, which Delilah betrayed."
    ],
    options: ["Gideon", "Samson", "Joshua", "Solomon"]
  },
  {
    target: "Deborah",
    clues: [
      "I am the only female judge of pre-monarchic Israel in the Old Testament.",
      "I sat under my palm tree between Ramah and Bethel to resolve disputes.",
      "I summoned Barak to lead an army of 10,000 men against the Canaanites."
    ],
    options: ["Esther", "Ruth", "Deborah", "Mary Magdalene"]
  },
  {
    target: "Moses",
    clues: [
      "I was drawn out of the Nile River as a baby by Pharaoh's daughter.",
      "I encountered God in a miraculous burning bush on Mount Horeb.",
      "I stretched my rod over the Red Sea to divide the waters and lead the Exodus."
    ],
    options: ["Aaron", "Joshua", "Moses", "Elijah"]
  },
  {
    target: "David",
    clues: [
      "I was a humble shepherd boy who played the harp to soothe King Saul.",
      "I defeated the giant Philistine warrior Goliath with a single sling and stone.",
      "I became the second king of Israel, celebrated as a man after God's own heart."
    ],
    options: ["Saul", "David", "Solomon", "Samuel"]
  },
  {
    target: "Daniel",
    clues: [
      "I was taken captive to Babylon and resolved not to defile myself with the royal food.",
      "I interpreted the writing on the wall for Belshazzar and Nebuchadnezzar's giant statue dream.",
      "God shut the mouths of ravenous beasts when I was cast into the lions' den."
    ],
    options: ["Ezekiel", "Isaiah", "Daniel", "Jeremiah"]
  },
  {
    target: "Esther",
    clues: [
      "I was a Jewish orphan girl raised by my cousin Mordecai.",
      "I won a beauty pageant to succeed Vashti as Queen of the Persian Empire.",
      "I risked my life by approaching King Ahasuerus to expose Haman's wicked plot to annihilate my people."
    ],
    options: ["Ruth", "Esther", "Deborah", "Sarah"]
  },
  {
    target: "Ruth",
    clues: [
      "I was a young Moabite widow who swore loyalty to my mother-in-law Naomi.",
      "I said, 'Where you go I will go, and your people shall be my people, and your God my God.'",
      "I gleaned grain in the fields of Boaz, became his wife, and entered the lineage of King David."
    ],
    options: ["Orpah", "Ruth", "Rebekah", "Leah"]
  },
  {
    target: "Elijah",
    clues: [
      "I called down miraculous fire from heaven to defeat 450 prophets of Baal on Mount Carmel.",
      "I was fed bread and meat twice a day by ravens in the wilderness by the Kerith Ravine.",
      "I did not experience physical death but was taken up to heaven in a whirlwind by a chariot of fire."
    ],
    options: ["Elisha", "Elijah", "Samuel", "Malachi"]
  },
  {
    target: "Paul",
    clues: [
      "I was a Pharisee named Saul who zealously persecuted the early church in Jerusalem.",
      "I was blinded by a glorious light on the road to Damascus and heard Jesus speak.",
      "I became the Apostle to the Gentiles, traveled on missionary journeys, and wrote most New Testament epistles."
    ],
    options: ["Peter", "Barnabas", "Paul", "Timothy"]
  },
  {
    target: "Peter",
    clues: [
      "I was a fisherman on the Sea of Galilee before Jesus called me to be a 'fisher of men'.",
      "I was the only disciple who stepped out of the boat to walk on water towards Jesus.",
      "I denied knowing Jesus three times before the rooster crowed on the night of His arrest."
    ],
    options: ["John", "Andrew", "Peter", "Thomas"]
  },
  {
    target: "Mary Magdalene",
    clues: [
      "Jesus cast seven powerful demons out of my soul, restoring my life.",
      "I stood faithfully weeping near the cross of Jesus while many others fled in fear.",
      "I was the very first person to witness and talk with the resurrected Christ on Easter Sunday."
    ],
    options: ["Mary Magdalene", "Martha", "Elizabeth", "Mary of Bethany"]
  },
  {
    target: "Gideon",
    clues: [
      "An angel of God found me threshing wheat secretly in a winepress to hide from the Midianites.",
      "I tested God's call with a wool fleece, asking for dew only on the fleece and then only on the ground.",
      "I led a tiny selected band of 300 men to victory armed with only trumpets, empty pitchers, and torches."
    ],
    options: ["Samson", "Barak", "Gideon", "Jephthah"]
  },
  {
    target: "Abraham",
    clues: [
      "God called me to leave my native city of Ur and journey to an unknown land.",
      "God promised to make my descendants as numerous as the stars of the heaven and sands of the sea.",
      "My faith was fully tested when I was commanded to offer my long-awaited son Isaac as a sacrifice."
    ],
    options: ["Lot", "Noah", "Jacob", "Abraham"]
  },
  {
    target: "Noah",
    clues: [
      "I was a righteous man who walked with God during a wicked and corrupt generation.",
      "I was instructed to construct a massive gopherwood vessel with precise dimensions to survive a global flood.",
      "I released a raven and a dove to check if the waters had receded, and received a rainbow covenant."
    ],
    options: ["Methuselah", "Enoch", "Noah", "Lamech"]
  },
  {
    target: "Solomon",
    clues: [
      "I was the son of David and Bathsheba, succeeding my father to the golden throne of Israel.",
      "When God offered to give me anything I wanted, I humbly prayed for an understanding heart and wisdom.",
      "I drafted thousands of wise proverbs and constructed the first majestic stone Temple in Jerusalem."
    ],
    options: ["Rehoboam", "Solomon", "Adonijah", "Absalom"]
  },
  {
    target: "John the Baptist",
    clues: [
      "I was a voice crying out in the wilderness, preaching baptism for the repentance of sins.",
      "My clothing was woven from coarse camel's hair, and my daily food consisted of locusts and wild honey.",
      "I declared 'Behold, the Lamb of God!' and baptized Jesus in the cold waters of the Jordan River."
    ],
    options: ["Zechariah", "John the Baptist", "Stephen", "Philip"]
  },
  {
    target: "Joshua",
    clues: [
      "I was Moses' faithful military commander and aide who went up the mountain with him.",
      "I was one of only two spies (along with Caleb) who gave a courageous and encouraging report of Canaan.",
      "I succeeded Moses, led the Israelite armies across the Jordan, and blew horns to collapse the walls of Jericho."
    ],
    options: ["Joshua", "Caleb", "Eleazar", "Gideon"]
  },
  {
    target: "Jonah",
    clues: [
      "I was a stubborn prophet who boarded a ship to Tarshish to run away from God's command to preach in Nineveh.",
      "A terrifying storm arose, and the sailors cast me overboard, instantly calming the sea.",
      "God prepared a great fish to swallow me, and I spent three days and nights praying inside its belly."
    ],
    options: ["Jonah", "Nahum", "Hosea", "Micah"]
  },
  {
    target: "Nehemiah",
    clues: [
      "I was a trusted Jewish cupbearer to King Artaxerxes of Persia.",
      "I wept and fasted upon hearing that the gates of Jerusalem were burned and its walls lay in ruins.",
      "I returned with royal permission and mobilized the citizens to rebuild the massive walls in just 52 days."
    ],
    options: ["Ezra", "Nehemiah", "Zerubbabel", "Haggai"]
  }
];

// 2. WORD MATCHING (20 levels of 4 pairs each)
export const matchRounds: MatchRound[] = [
  {
    pairs: [
      { term: "Manna", def: "Bread from heaven provided to Israelites in the wilderness" },
      { term: "Gethsemane", def: "Garden where Jesus prayed in agony before His arrest" },
      { term: "Golgotha", def: "The hill of crucifixion, meaning 'Place of the Skull'" },
      { term: "Sinai", def: "Mountain where Moses received the stone Ten Commandments" }
    ]
  },
  {
    pairs: [
      { term: "Jordan River", def: "Waters parted by Joshua & where Jesus was baptized" },
      { term: "Patmos", def: "Rocky island where Apostle John received the Revelation" },
      { term: "Jericho", def: "Ancient city whose walls crumbled down after 7 days of marching" },
      { term: "Bethlehem", def: "The humble Judean town where King David & Jesus were born" }
    ]
  },
  {
    pairs: [
      { term: "Genesis", def: "The book of beginnings, creation, and primeval covenants" },
      { term: "Revelation", def: "The final apocalyptic book outlining the new heaven and earth" },
      { term: "Psalms", def: "A massive collection of 150 sacred songs, prayers, and praises" },
      { term: "Proverbs", def: "A compilation of practical wisdom primarily penned by Solomon" }
    ]
  },
  {
    pairs: [
      { term: "Olive Branch", def: "Symbol of peace and dry land brought back to Noah's Ark" },
      { term: "Rainbow", def: "Vivid sign of God's covenant never to flood the earth again" },
      { term: "Brass Serpent", def: "Raised on a pole by Moses so those who looked on it lived" },
      { term: "Golden Calf", def: "Idol crafted by Aaron while Moses was atop Mount Sinai" }
    ]
  },
  {
    pairs: [
      { term: "Nazareth", def: "Humble town of Galilee where Jesus spent His childhood" },
      { term: "Jerusalem", def: "The Holy City where the Temple stood and where Jesus died" },
      { term: "Damascus", def: "Ancient road where Saul was blinded by a heavenly light" },
      { term: "Rome", def: "Imperial capital where Paul was imprisoned and wrote letters" }
    ]
  },
  {
    pairs: [
      { term: "Passover", def: "Annual festival commemorating deliverance from Egypt's plagues" },
      { term: "Pentecost", def: "Feast celebrating the harvest and outpouring of the Holy Spirit" },
      { term: "Tabernacles", def: "Feast remembering the temporary shelters used in the wilderness" },
      { term: "Purim", def: "Joyful celebration of Esther saving the Persian Jews from Haman" }
    ]
  },
  {
    pairs: [
      { term: "Matthew", def: "First Gospel, written by a tax collector turned apostle" },
      { term: "Luke", def: "Comprehensive Gospel written by a beloved Gentile physician" },
      { term: "John", def: "Theological Gospel focusing intensely on the divinity of Christ" },
      { term: "Mark", def: "The shortest Gospel, characterized by the word 'immediately'" }
    ]
  },
  {
    pairs: [
      { term: "Peter", def: "Outspoken apostle who was anointed to lead the Jerusalem church" },
      { term: "Andrew", def: "Peter's brother who always brought people to meet Jesus" },
      { term: "James", def: "The first of the original twelve apostles to suffer martyrdom" },
      { term: "John", def: "The disciple whom Jesus loved, writer of the fourth Gospel" }
    ]
  },
  {
    pairs: [
      { term: "Abraham", def: "The patriarch of faith, originally called out of pagan Ur" },
      { term: "Isaac", def: "The miraculous son of promise born in Abraham's advanced age" },
      { term: "Jacob", def: "Wrestled with God at Peniel and was renamed Israel" },
      { term: "Joseph", def: "Patriarch sold as a slave who saved Egypt from famine" }
    ]
  },
  {
    pairs: [
      { term: "Myrrh", def: "Bitter, aromatic perfume used in ancient burial preparations" },
      { term: "Frankincense", def: "Pure white incense burned in worship, representing prayer" },
      { term: "Gold", def: "Precious metal of royalty, gifted by the wise men to Jesus" },
      { term: "Alabaster Jar", def: "Contained extremely costly oil of spikenard broken by Mary" }
    ]
  },
  {
    pairs: [
      { term: "Samuel", def: "Great prophet and judge who anointed Saul and David as kings" },
      { term: "Eli", def: "Elderly high priest who raised young Samuel in Shiloh" },
      { term: "Saul", def: "The tall, handsome first king of the united monarchy of Israel" },
      { term: "Jonathan", def: "Saul's brave son who formed a covenant friendship with David" }
    ]
  },
  {
    pairs: [
      { term: "Euphrates", def: "Great historic river named as one of the boundaries of Eden" },
      { term: "Nile River", def: "The river turned into blood during Moses' first plague on Egypt" },
      { term: "Red Sea", def: "Waters parted dramatically by a strong east wind sent by God" },
      { term: "Sea of Galilee", def: "Northern lake where Jesus calmed storms and walked on waves" }
    ]
  },
  {
    pairs: [
      { term: "Aaron", def: "Moses' older brother and anointed first High Priest of Israel" },
      { term: "Miriam", def: "Moses' sister, a prophetess who led victory songs with timbrels" },
      { term: "Caleb", def: "Faithful spy who trusted God to conquer the giants in Canaan" },
      { term: "Joshua", def: "Leader who took over after Moses and brought Israel into Canaan" }
    ]
  },
  {
    pairs: [
      { term: "Mt. Ararat", def: "The mountainous ridge where Noah's Ark rested after the deluge" },
      { term: "Mt. Carmel", def: "Where Prophet Elijah dramatically defeated the prophets of Baal" },
      { term: "Mt. Nebo", def: "The peak where Moses viewed the Promised Land before his death" },
      { term: "Mt. Tabor", def: "Traditional mountain in Galilee where Jesus was transfigured" }
    ]
  },
  {
    pairs: [
      { term: "Hezekiah", def: "Righteous king who prayed and had 15 years added to his life" },
      { term: "Josiah", def: "Eight-year-old king who initiated reforms after finding the Law" },
      { term: "Nebuchadnezzar", def: "Babylonian king who went mad and lived like a beast in fields" },
      { term: "Cyrus the Great", def: "Persian ruler who decreed that the Jews could rebuild the Temple" }
    ]
  },
  {
    pairs: [
      { term: "Barnabas", def: "The 'Son of Encouragement' who partnered with Paul in missions" },
      { term: "Timothy", def: "Paul's spiritual son and young pastor of the Ephesian church" },
      { term: "Silas", def: "Paul's companion who sang praises at midnight in a Philippi prison" },
      { term: "Stephen", def: "The first Christian deacon stoned to death while forgiving his killers" }
    ]
  },
  {
    pairs: [
      { term: "Mary of Nazareth", def: "Chosen virgin who gave birth to Jesus and pondered in her heart" },
      { term: "Martha", def: "Lazarus' sister who was distracted with much serving and cooking" },
      { term: "Mary of Bethany", def: "Lazarus' sister who sat at Jesus' feet listening to His words" },
      { term: "Elizabeth", def: "John the Baptist's mother who experienced a miracle in her old age" }
    ]
  },
  {
    pairs: [
      { term: "Exodus", def: "Second book of Moses describing the escape from Egyptian slavery" },
      { term: "Leviticus", def: "Third book detailing priestly duties, offerings, and holiness codes" },
      { term: "Numbers", def: "Fourth book cataloging census records and wilderness journeys" },
      { term: "Deuteronomy", def: "Fifth book containing Moses' final sermon and retelling of the Law" }
    ]
  },
  {
    pairs: [
      { term: "Garden of Eden", def: "The pristine paradise home of Adam and Eve before they sinned" },
      { term: "Ur of Chaldeans", def: "Pagan Mesopotamian city where Abraham lived before God's call" },
      { term: "Sodom", def: "Wicked city from which Lot fled before fire fell from heaven" },
      { term: "Tower of Babel", def: "Where human language was confused to stop a prideful monument" }
    ]
  },
  {
    pairs: [
      { term: "Alpha", def: "The first letter of the Greek alphabet, meaning 'The Beginning'" },
      { term: "Omega", def: "The last letter of the Greek alphabet, meaning 'The End'" },
      { term: "Amen", def: "Solemn Hebrew word translating to 'So be it' or 'Truly'" },
      { term: "Hosanna", def: "Hebrew shout of praise meaning 'Save us now, we pray!'" }
    ]
  }
];

// 3. VERSE SCRAMBLE (20 levels)
export const scrambleVerses: ScrambleVerse[] = [
  {
    full: "I can do all things through Christ who strengthens me",
    words: ["Christ", "do", "I", "all", "things", "through", "who", "me", "strengthens", "can"],
    correctOrder: ["I", "can", "do", "all", "things", "through", "Christ", "who", "strengthens", "me"]
  },
  {
    full: "The Lord is my shepherd I shall not want",
    words: ["is", "not", "shepherd", "The", "Lord", "I", "my", "shall", "want"],
    correctOrder: ["The", "Lord", "is", "my", "shepherd", "I", "shall", "not", "want"]
  },
  {
    full: "For God so loved the world that He gave His only Son",
    words: ["God", "only", "the", "world", "gave", "For", "loved", "Son", "so", "that", "He", "His"],
    correctOrder: ["For", "God", "so", "loved", "the", "world", "that", "He", "gave", "His", "only", "Son"]
  },
  {
    full: "The fear of the Lord is the beginning of wisdom",
    words: ["fear", "is", "of", "the", "wisdom", "beginning", "Lord", "The", "of"],
    correctOrder: ["The", "fear", "of", "the", "Lord", "is", "the", "beginning", "of", "wisdom"]
  },
  {
    full: "Your word is a lamp to my feet and a light to my path",
    words: ["is", "feet", "a", "path", "lamp", "word", "light", "to", "my", "Your", "and", "my", "to"],
    correctOrder: ["Your", "word", "is", "a", "lamp", "to", "my", "feet", "and", "a", "light", "to", "my", "path"]
  },
  {
    full: "Trust in the Lord with all your heart",
    words: ["your", "the", "heart", "with", "all", "Trust", "Lord", "in"],
    correctOrder: ["Trust", "in", "the", "Lord", "with", "all", "your", "heart"]
  },
  {
    full: "Love the Lord your God with all your soul",
    words: ["God", "your", "all", "the", "soul", "with", "your", "Lord", "Love"],
    correctOrder: ["Love", "the", "Lord", "your", "God", "with", "all", "your", "soul"]
  },
  {
    full: "A gentle answer turns away wrath but a harsh word stirs up anger",
    words: ["harsh", "A", "away", "stirs", "answer", "wrath", "gentle", "turns", "but", "a", "word", "up", "anger"],
    correctOrder: ["A", "gentle", "answer", "turns", "away", "wrath", "but", "a", "harsh", "word", "stirs", "up", "anger"]
  },
  {
    full: "Be strong and courageous do not be terrified",
    words: ["courageous", "strong", "Be", "not", "terrified", "do", "and", "be"],
    correctOrder: ["Be", "strong", "and", "courageous", "do", "not", "be", "terrified"]
  },
  {
    full: "The joy of the Lord is your strength",
    words: ["of", "The", "strength", "your", "Lord", "is", "joy"],
    correctOrder: ["The", "joy", "of", "the", "Lord", "is", "your", "strength"]
  },
  {
    full: "But the fruit of the Spirit is love joy peace patience",
    words: ["fruit", "Spirit", "love", "the", "patience", "of", "is", "joy", "But", "peace"],
    correctOrder: ["But", "the", "fruit", "of", "the", "Spirit", "is", "love", "joy", "peace", "patience"]
  },
  {
    full: "Blessed are the peacemakers for they shall be called sons of God",
    words: ["called", "peacemakers", "are", "shall", "be", "God", "the", "sons", "Blessed", "for", "they", "of"],
    correctOrder: ["Blessed", "are", "the", "peacemakers", "for", "they", "shall", "be", "called", "sons", "of", "God"]
  },
  {
    full: "Rejoice in the Lord always and again I say rejoice",
    words: ["Rejoice", "again", "say", "always", "and", "I", "Lord", "in", "the", "rejoice"],
    correctOrder: ["Rejoice", "in", "the", "Lord", "always", "and", "again", "I", "say", "rejoice"]
  },
  {
    full: "Ask and it will be given to you seek and you will find",
    words: ["find", "and", "it", "given", "you", "Ask", "seek", "and", "will", "be", "to", "you", "will"],
    correctOrder: ["Ask", "and", "it", "will", "be", "given", "to", "you", "seek", "and", "you", "will", "find"]
  },
  {
    full: "He restores my soul He leads me in paths of righteousness",
    words: ["leads", "soul", "He", "righteousness", "my", "He", "restores", "paths", "me", "in", "of"],
    correctOrder: ["He", "restores", "my", "soul", "He", "leads", "me", "in", "paths", "of", "righteousness"]
  },
  {
    full: "We walk by faith and not by sight",
    words: ["walk", "not", "faith", "by", "sight", "We", "and", "by"],
    correctOrder: ["We", "walk", "by", "faith", "and", "not", "by", "sight"]
  },
  {
    full: "The grass withers the flower fades but the word of our God stands forever",
    words: ["fades", "word", "grass", "fades", "stands", "withers", "The", "flower", "but", "the", "of", "our", "God", "forever"],
    correctOrder: ["The", "grass", "withers", "the", "flower", "fades", "but", "the", "word", "of", "our", "God", "stands", "forever"]
  },
  {
    full: "In all your ways acknowledge Him and He will make your paths straight",
    words: ["acknowledge", "ways", "paths", "all", "your", "Him", "make", "In", "and", "He", "will", "your", "straight"],
    correctOrder: ["In", "all", "your", "ways", "acknowledge", "Him", "and", "He", "will", "make", "your", "paths", "straight"]
  },
  {
    full: "Come to me all who labor and are heavy laden and I will give you rest",
    words: ["heavy", "labor", "who", "Come", "laden", "me", "to", "all", "and", "are", "and", "I", "will", "give", "you", "rest"],
    correctOrder: ["Come", "to", "me", "all", "who", "labor", "and", "are", "heavy", "laden", "and", "I", "will", "give", "you", "rest"]
  },
  {
    full: "Therefore do not worry about tomorrow for tomorrow will worry about itself",
    words: ["tomorrow", "worry", "do", "about", "Therefore", "not", "for", "tomorrow", "will", "worry", "about", "itself"],
    correctOrder: ["Therefore", "do", "not", "worry", "about", "tomorrow", "for", "tomorrow", "will", "worry", "about", "itself"]
  }
];

// 4. WHO AM I RIDDLES (20 levels)
export const riddles: RiddleQuestion[] = [
  {
    riddle: "I was a tax collector in Jericho. Since I was short, I climbed a sycamore-fig tree to catch a glimpse of Jesus. Who am I?",
    answer: "Zacchaeus",
    options: ["Matthew", "Zacchaeus", "Peter", "Luke"]
  },
  {
    riddle: "I walked on water towards Jesus during a fierce lake storm, but started sinking when I looked at the wind and grew afraid. Who am I?",
    answer: "Peter",
    options: ["John", "Andrew", "Peter", "Thomas"]
  },
  {
    riddle: "I was the mother of Isaac, giving birth to him in my extremely old age as a miraculous fulfillment of God's promise. Who am I?",
    answer: "Sarah",
    options: ["Rebekah", "Rachel", "Sarah", "Hannah"]
  },
  {
    riddle: "I was warned of things not yet seen and built a giant wooden ship to save my family and pairs of every creature from flood. Who am I?",
    answer: "Noah",
    options: ["Abraham", "Noah", "Methuselah", "Lot"]
  },
  {
    riddle: "I was hidden in a papyrus basket on the Nile, grew up in Pharaoh's palace, and was chosen to lead Israel out of Egypt. Who am I?",
    answer: "Moses",
    options: ["Aaron", "Joseph", "Moses", "Joshua"]
  },
  {
    riddle: "I was a prophet of Israel who tried to run away from God on a ship, but ended up spending three days in the belly of a great fish. Who am I?",
    answer: "Jonah",
    options: ["Jonah", "Elijah", "Isaiah", "Amos"]
  },
  {
    riddle: "I was a judge who reduced my army to 300 men based on how they lapped water, and defeated Midian with trumpets and clay jars. Who am I?",
    answer: "Gideon",
    options: ["Samson", "Jephthah", "Gideon", "Barak"]
  },
  {
    riddle: "I was a Jewish queen in Persia who fasted for three days with my maidens before risking death to speak to the king and save my people. Who am I?",
    answer: "Esther",
    options: ["Esther", "Vashti", "Ruth", "Jezebel"]
  },
  {
    riddle: "I was a prophet taken up to heaven in a whirlwind, in a chariot of fire with horses of fire, leaving my mantle with Elisha. Who am I?",
    answer: "Elijah",
    options: ["Moses", "Enoch", "Elijah", "Isaiah"]
  },
  {
    riddle: "I was a shepherd boy who defeated a 9-foot giant using only a sling and five smooth brook stones. Who am I?",
    answer: "David",
    options: ["Saul", "Jonathan", "David", "Solomon"]
  },
  {
    riddle: "I wore clothes of camel's hair, ate locusts and wild honey, and prepared the way for Jesus by baptizing in the wilderness. Who am I?",
    answer: "John the Baptist",
    options: ["John the Apostle", "Elijah", "John the Baptist", "Stephen"]
  },
  {
    riddle: "I was a close friend of Jesus who was dead and buried inside a tomb for four days before Jesus called my name and I walked out. Who am I?",
    answer: "Lazarus",
    options: ["Lazarus", "Nicodemus", "Jairus", "Stephen"]
  },
  {
    riddle: "I was an apostle who refused to believe Jesus had risen until I could touch the print of the nails in His hands. Who am I?",
    answer: "Thomas",
    options: ["Peter", "Philip", "Thomas", "Judas"]
  },
  {
    riddle: "I was a young Hebrew in Babylon who refused the king's food, prayed three times a day, and was preserved in a den of lions. Who am I?",
    answer: "Daniel",
    options: ["Shadrach", "Daniel", "Nehemiah", "Ezekiel"]
  },
  {
    riddle: "I was a mighty Nazirite whose hair was cut by a deceptive woman, causing me to lose my strength, but I pulled down the pagan temple. Who am I?",
    answer: "Samson",
    options: ["Samson", "Gideon", "Eli", "Saul"]
  },
  {
    riddle: "I was a deacon and the first Christian martyr. While being stoned to death, I saw the heavens open and prayed for my executioners. Who am I?",
    answer: "Stephen",
    options: ["Philip", "Stephen", "Paul", "Barnabas"]
  },
  {
    riddle: "I was a Moabite widow who gleaned barley in the field of Boaz, who then became my redeemer and husband. Who am I?",
    answer: "Ruth",
    options: ["Naomi", "Ruth", "Orpah", "Rachel"]
  },
  {
    riddle: "I was a young virgin from Nazareth who received a message from Gabriel that I would give birth to the Son of God. Who am I?",
    answer: "Mary",
    options: ["Elizabeth", "Mary", "Martha", "Anna"]
  },
  {
    riddle: "I succeeded my father David, asked God for wisdom rather than wealth, and resolved a dispute between two mothers. Who am I?",
    answer: "Solomon",
    options: ["Absalom", "Rehoboam", "Solomon", "Hezekiah"]
  },
  {
    riddle: "I am the father of faith. God tested me by asking me to sacrifice my only son Isaac on an altar on Mount Moriah. Who am I?",
    answer: "Abraham",
    options: ["Noah", "Lot", "Jacob", "Abraham"]
  }
];

// 5. WORD GUESS - CANDLELIGHT (20 levels of words)
export const guessWords: string[] = [
  "GOLIATH",
  "BABYLON",
  "COVENANT",
  "SOLOMON",
  "NAZARETH",
  "EPHESIANS",
  "TABERNACLE",
  "BETHLEHEM",
  "REDEMPTION",
  "PENTECOST",
  "CORINTHIANS",
  "SAMARITAN",
  "SALVATION",
  "ZECHARIAH",
  "REVELATION",
  "MELCHIZEDEK",
  "DEUTERONOMY",
  "CENTURION",
  "PROVIDENCE",
  "MONARCHY"
];

// 6. TRUE OR FALSE SPRINT (25 items)
export const tfQuestions: TFQuestion[] = [
  { q: "Moses led the Israelites across the Jordan River into the Promised Land.", a: false },
  { q: "The New Testament contains 27 books in total.", a: true },
  { q: "Noah's Ark came to rest on Mount Ararat as the flood waters receded.", a: true },
  { q: "The Apostle Paul was originally known as Saul of Tarsus.", a: true },
  { q: "David was the very first king of the nation of Israel.", a: false },
  { q: "Jesus turned water into wine at the wedding feast in Cana.", a: true },
  { q: "Judas Iscariot was replaced by Matthias as one of the twelve apostles.", a: true },
  { q: "Daniel was thrown into a fiery furnace with Shadrach and Meshach.", a: false },
  { q: "The book of Psalms contains exactly 150 unique chapters.", a: true },
  { q: "John the Baptist was Jesus' biological cousin.", a: true },
  { q: "The book of Revelation was written by the Apostle Peter.", a: false },
  { q: "King Solomon built the first grand stone Temple of God in Jerusalem.", a: true },
  { q: "Lazarus was dead for seven full days before Jesus raised him.", a: false },
  { q: "The walls of Jericho collapsed after the Israelites marched around it for 7 days.", a: true },
  { q: "Elijah was swept up to heaven in a whirlwind by a chariot of fire.", a: true },
  { q: "The Apostle Matthew was originally a professional Galilee fisherman.", a: false },
  { q: "The Ten Commandments were delivered to Moses on Mount Sinai.", a: true },
  { q: "Adam and Eve lived in the Garden of Gethsemane before their exile.", a: false },
  { q: "The pagan city of Nineveh repented in sackcloth after Jonah preached there.", a: true },
  { q: "Saul of Tarsus was blind for three days after his Damascus road vision.", a: true },
  { q: "The shortest verse in the English Bible is 'Jesus wept'.", a: true },
  { q: "Samson lost his incredible Nazirite strength when his feet were chained.", a: false },
  { q: "Abraham was exactly ninety years old when his son Isaac was born.", a: false },
  { q: "Apostles James and John were nicknamed the 'Sons of Thunder' by Jesus.", a: true },
  { q: "There are exactly twelve gates in the city wall of the New Jerusalem.", a: true }
];

// 7. FILL IN THE BLANKS (20 levels)
export const blanksQuestions: BlanksQuestion[] = [
  {
    sentence: "In the beginning, God created the heavens and the _______.",
    missing: "earth",
    options: ["earth", "world", "universe", "seas"]
  },
  {
    sentence: "The fear of the Lord is the beginning of _______.",
    missing: "wisdom",
    options: ["knowledge", "life", "wisdom", "righteousness"]
  },
  {
    sentence: "Be strong and _______, do not be afraid or discouraged.",
    missing: "courageous",
    options: ["happy", "courageous", "patient", "faithful"]
  },
  {
    sentence: "Your word is a _______ to my feet and a light to my path.",
    missing: "lamp",
    options: ["guide", "lamp", "fire", "shield"]
  },
  {
    sentence: "For God so loved the world that He gave His only _______.",
    missing: "Son",
    options: ["prophet", "angel", "covenant", "Son"]
  },
  {
    sentence: "The Lord is my _______; I shall not want.",
    missing: "shepherd",
    options: ["shepherd", "shield", "helper", "king"]
  },
  {
    sentence: "Blessed are the _______, for they shall inherit the earth.",
    missing: "meek",
    options: ["meek", "rich", "powerful", "strong"]
  },
  {
    sentence: "Trust in the Lord with all your _______.",
    missing: "heart",
    options: ["mind", "heart", "strength", "soul"]
  },
  {
    sentence: "But the fruit of the Spirit is _______, joy, peace, patience...",
    missing: "love",
    options: ["love", "faith", "hope", "kindness"]
  },
  {
    sentence: "A gentle answer turns away _______, but a harsh word stirs up anger.",
    missing: "wrath",
    options: ["wrath", "grief", "sadness", "dispute"]
  },
  {
    sentence: "He who dwells in the shelter of the Most High will abide in the shadow of the _______.",
    missing: "Almighty",
    options: ["Lord", "Creator", "Almighty", "Holy One"]
  },
  {
    sentence: "And now these three remain: faith, hope, and love. But the greatest of these is _______.",
    missing: "love",
    options: ["faith", "hope", "love", "truth"]
  },
  {
    sentence: "Even though I walk through the valley of the shadow of _______, I will fear no evil.",
    missing: "death",
    options: ["death", "gloom", "enemies", "trials"]
  },
  {
    sentence: "I can do all things through _______ who strengthens me.",
    missing: "Christ",
    options: ["Moses", "prayer", "faith", "Christ"]
  },
  {
    sentence: "For I know the _______ I have for you, declares the Lord.",
    missing: "plans",
    options: ["blessings", "plans", "paths", "futures"]
  },
  {
    sentence: "Ask and it will be given to you; _______ and you will find.",
    missing: "seek",
    options: ["knock", "seek", "pray", "ask"]
  },
  {
    sentence: "The joy of the Lord is your _______.",
    missing: "strength",
    options: ["shield", "hope", "salvation", "strength"]
  },
  {
    sentence: "Therefore go and make _______ of all nations, baptizing them...",
    missing: "disciples",
    options: ["believers", "followers", "disciples", "servants"]
  },
  {
    sentence: "Sanctify them in the truth; Your _______ is truth.",
    missing: "word",
    options: ["word", "spirit", "law", "path"]
  },
  {
    sentence: "Set your minds on things _______, not on earthly things.",
    missing: "above",
    options: ["spiritual", "heavenly", "above", "eternal"]
  }
];

// 8. ODD ONE OUT (20 levels)
export const oddOneQuestions: OddOneQuestion[] = [
  {
    items: ["Matthew", "Mark", "Genesis", "Luke"],
    odd: "Genesis",
    reason: "Genesis is an Old Testament Torah book, while the others are New Testament Gospels."
  },
  {
    items: ["David", "Noah", "Saul", "Solomon"],
    odd: "Noah",
    reason: "Noah was a primeval patriarch, while the others were anointed Kings of Israel."
  },
  {
    items: ["Paul", "Peter", "Timothy", "Judas Iscariot"],
    odd: "Judas Iscariot",
    reason: "Judas betrayed Jesus and fell, while the others served as faithful pillars of the early church."
  },
  {
    items: ["Genesis", "Exodus", "Psalms", "Leviticus"],
    odd: "Psalms",
    reason: "Psalms is a poetic book of wisdom and worship, while the others are books of the Law (Pentateuch)."
  },
  {
    items: ["Sinai", "Nile", "Ararat", "Carmel"],
    odd: "Nile",
    reason: "The Nile is a historic river, while Sinai, Ararat, and Carmel are prominent biblical mountains."
  },
  {
    items: ["Gideon", "Samson", "Deborah", "Saul"],
    odd: "Saul",
    reason: "Saul was the anointed King of Israel, while Gideon, Samson, and Deborah were charismatic judges."
  },
  {
    items: ["Shadrach", "Meshach", "Daniel", "Abednego"],
    odd: "Daniel",
    reason: "Daniel was thrown into the lions' den, while his three friends were cast into the fiery furnace."
  },
  {
    items: ["Cain", "Abel", "Seth", "Ham"],
    odd: "Ham",
    reason: "Ham was a son of Noah, while Cain, Abel, and Seth were sons of Adam and Eve."
  },
  {
    items: ["Romans", "Hebrews", "Ephesians", "Isaiah"],
    odd: "Isaiah",
    reason: "Isaiah is an Old Testament major prophetic book, while the others are New Testament epistles."
  },
  {
    items: ["Gold", "Frankincense", "Manna", "Myrrh"],
    odd: "Manna",
    reason: "Manna was bread provided in the desert, while Gold, Frankincense, and Myrrh were gifts of the Magi."
  },
  {
    items: ["Sarah", "Rebekah", "Rachel", "Ruth"],
    odd: "Ruth",
    reason: "Ruth was a Moabite widow, while Sarah, Rebekah, and Rachel were wives of the Hebrew patriarchs."
  },
  {
    items: ["Jordan", "Euphrates", "Tigris", "Sinai"],
    odd: "Sinai",
    reason: "Sinai is a holy mountain, while Jordan, Euphrates, and Tigris are notable biblical rivers."
  },
  {
    items: ["Jericho", "Bethlehem", "Nazareth", "Patmos"],
    odd: "Patmos",
    reason: "Patmos is an Aegean island of exile, while Jericho, Bethlehem, and Nazareth are cities in the land of Israel."
  },
  {
    items: ["Peter", "Andrew", "John", "Barnabas"],
    odd: "Barnabas",
    reason: "Barnabas was Paul's missionary companion, not one of the original twelve apostles selected by Jesus."
  },
  {
    items: ["Esther", "Ruth", "Judith", "James"],
    odd: "James",
    reason: "James is a New Testament book, whereas Esther, Ruth, and Judith are Old Testament narrative books named after women."
  },
  {
    items: ["Pharaoh", "Nebuchadnezzar", "David", "Darius"],
    odd: "David",
    reason: "David was the anointed king of God's covenant people, while the others were powerful foreign emperors."
  },
  {
    items: ["Locusts", "Manna", "Quails", "Figs"],
    odd: "Locusts",
    reason: "Locusts were an insect food eaten by John the Baptist, while the others were miraculous provisions of God."
  },
  {
    items: ["Moses", "Aaron", "David", "Samuel"],
    odd: "David",
    reason: "David was a king, while Moses, Aaron, and Samuel were prophets, priests, and leaders who anointed or led."
  },
  {
    items: ["Mary", "Elizabeth", "Hannah", "Delilah"],
    odd: "Delilah",
    reason: "Delilah was a Philistine temptress who betrayed Samson, while the others were faithful mothers of miraculous children."
  },
  {
    items: ["Elijah", "Enoch", "Moses", "John the Apostle"],
    odd: "Moses",
    reason: "Moses died a physical death and was buried by God, whereas Elijah and Enoch were caught up directly to heaven."
  }
];

// 9. BIBLE BOOK ORDER (20 levels of 4-book blocks)
export const bookOrderQuestions: BookOrderQuestion[] = [
  {
    initial: ["Numbers", "Genesis", "Exodus", "Leviticus"],
    correct: ["Genesis", "Exodus", "Leviticus", "Numbers"]
  },
  {
    initial: ["Romans", "Matthew", "Acts", "Revelation"],
    correct: ["Matthew", "Acts", "Romans", "Revelation"]
  },
  {
    initial: ["Ruth", "Joshua", "Judges", "1 Samuel"],
    correct: ["Joshua", "Judges", "Ruth", "1 Samuel"]
  },
  {
    initial: ["Psalms", "Job", "Proverbs", "Ecclesiastes"],
    correct: ["Job", "Psalms", "Proverbs", "Ecclesiastes"]
  },
  {
    initial: ["Ezra", "Nehemiah", "Esther", "Job"],
    correct: ["Ezra", "Nehemiah", "Esther", "Job"]
  },
  {
    initial: ["Daniel", "Ezekiel", "Lamentations", "Hosea"],
    correct: ["Lamentations", "Ezekiel", "Daniel", "Hosea"]
  },
  {
    initial: ["Mark", "Luke", "John", "Acts"],
    correct: ["Mark", "Luke", "John", "Acts"]
  },
  {
    initial: ["Galatians", "Ephesians", "Philippians", "Colossians"],
    correct: ["Galatians", "Ephesians", "Philippians", "Colossians"]
  },
  {
    initial: ["1 Timothy", "2 Timothy", "Titus", "Philemon"],
    correct: ["1 Timothy", "2 Timothy", "Titus", "Philemon"]
  },
  {
    initial: ["Hebrews", "James", "1 Peter", "2 Peter"],
    correct: ["Hebrews", "James", "1 Peter", "2 Peter"]
  },
  {
    initial: ["1 John", "2 John", "3 John", "Jude"],
    correct: ["1 John", "2 John", "3 John", "Jude"]
  },
  {
    initial: ["Joel", "Amos", "Obadiah", "Jonah"],
    correct: ["Joel", "Amos", "Obadiah", "Jonah"]
  },
  {
    initial: ["Micah", "Nahum", "Habakkuk", "Zephaniah"],
    correct: ["Micah", "Nahum", "Habakkuk", "Zephaniah"]
  },
  {
    initial: ["Haggai", "Zechariah", "Malachi", "Matthew"],
    correct: ["Haggai", "Zechariah", "Malachi", "Matthew"]
  },
  {
    initial: ["Judges", "Ruth", "1 Samuel", "2 Samuel"],
    correct: ["Judges", "Ruth", "1 Samuel", "2 Samuel"]
  },
  {
    initial: ["1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles"],
    correct: ["1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles"]
  },
  {
    initial: ["Luke", "John", "Acts", "Romans"],
    correct: ["Luke", "John", "Acts", "Romans"]
  },
  {
    initial: ["Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy"],
    correct: ["Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy"]
  },
  {
    initial: ["Titus", "Philemon", "Hebrews", "James"],
    correct: ["Titus", "Philemon", "Hebrews", "James"]
  },
  {
    initial: ["Genesis", "Deuteronomy", "Joshua", "Malachi"],
    correct: ["Genesis", "Deuteronomy", "Joshua", "Malachi"]
  }
];

// 10. MAP LANDMARKS (20 levels)
export const mapLandmarksQuestions: MapLandmarksQuestion[] = [
  {
    landmark: "Where did Jesus turn water into wine at a wedding feast?",
    answer: "Cana",
    options: ["Cana", "Nazareth", "Jerusalem", "Capernaum"]
  },
  {
    landmark: "Where did the walls collapse after the Israelites marched around them for seven days?",
    answer: "Jericho",
    options: ["Jericho", "Babylon", "Nineveh", "Hebron"]
  },
  {
    landmark: "Which river was Jesus baptized in by John the Baptist?",
    answer: "Jordan River",
    options: ["Jordan River", "Nile River", "Euphrates River", "Tigris River"]
  },
  {
    landmark: "On which mountain did Moses receive the Ten Commandments written on stone tablets?",
    answer: "Mount Sinai",
    options: ["Mount Sinai", "Mount Ararat", "Mount Nebo", "Mount Carmel"]
  },
  {
    landmark: "Where was Jesus born in a humble stable because there was no room in the inn?",
    answer: "Bethlehem",
    options: ["Jerusalem", "Bethlehem", "Nazareth", "Hebron"]
  },
  {
    landmark: "In which garden did Jesus pray in agony while His sweat became like drops of blood?",
    answer: "Gethsemane",
    options: ["Eden", "Gethsemane", "Bethel", "Sharon"]
  },
  {
    landmark: "Where did Noah's Ark come to rest as the catastrophic floodwaters subsided?",
    answer: "Mount Ararat",
    options: ["Mount Ararat", "Mount Sinai", "Mount Carmel", "Mount Hermon"]
  },
  {
    landmark: "Where did Prophet Elijah defeat the 450 prophets of Baal with fire called from heaven?",
    answer: "Mount Carmel",
    options: ["Mount Sinai", "Mount Carmel", "Mount Nebo", "Mount Tabor"]
  },
  {
    landmark: "Into which sea did the Egyptian army drown after Moses parted the waters with his staff?",
    answer: "Red Sea",
    options: ["Red Sea", "Dead Sea", "Sea of Galilee", "Mediterranean Sea"]
  },
  {
    landmark: "Which city did David capture from the Jebusites and establish as Israel's holy capital?",
    answer: "Jerusalem",
    options: ["Jerusalem", "Samaria", "Hebron", "Jericho"]
  },
  {
    landmark: "Where did God confuse human speech to halt the construction of a prideful monument?",
    answer: "Tower of Babel",
    options: ["Babylon", "Tower of Babel", "Ur", "Nineveh"]
  },
  {
    landmark: "Where was Paul traveling when a blinding light from heaven flashed around him?",
    answer: "Damascus",
    options: ["Damascus", "Jerusalem", "Tarsus", "Antioch"]
  },
  {
    landmark: "On which mountain did Moses stand to view the Promised Land before his death?",
    answer: "Mount Nebo",
    options: ["Mount Sinai", "Mount Nebo", "Mount Hor", "Mount Ararat"]
  },
  {
    landmark: "Where did Jesus live during His childhood after returning from Egypt?",
    answer: "Nazareth",
    options: ["Nazareth", "Bethlehem", "Capernaum", "Jericho"]
  },
  {
    landmark: "Which Jerusalem pool with five porches was the site of Jesus healing a paralyzed man?",
    answer: "Pool of Bethesda",
    options: ["Pool of Siloam", "Pool of Bethesda", "Jordan River", "Well of Harod"]
  },
  {
    landmark: "To which city did Jonah refuse to go, but eventually preached repentance to after the whale?",
    answer: "Nineveh",
    options: ["Nineveh", "Babylon", "Tarshish", "Tyre"]
  },
  {
    landmark: "Which body of water did Jesus walk upon to reach His terrified disciples in a storm?",
    answer: "Sea of Galilee",
    options: ["Sea of Galilee", "Dead Sea", "Red Sea", "Mediterranean Sea"]
  },
  {
    landmark: "Where was John the Apostle exiled when he saw the grand visions of the book of Revelation?",
    answer: "Patmos",
    options: ["Malta", "Cyprus", "Patmos", "Crete"]
  },
  {
    landmark: "Which Egyptian river was the birthplace where Moses was placed in a tiny reed basket?",
    answer: "Nile River",
    options: ["Nile River", "Euphrates River", "Tigris River", "Abana River"]
  },
  {
    landmark: "Where did Joshua and the Israelites set up their first base camp after crossing the Jordan River?",
    answer: "Gilgal",
    options: ["Jericho", "Gilgal", "Shiloh", "Ai"]
  }
];
