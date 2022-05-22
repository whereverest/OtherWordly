// TODO: add wordPillsList

const dataSource = [

  { storeName: 'isInGameMode', data: false }, // shows/hides basic page layout header and footer elements

  // Stats --------------------------------------------------------------------
  { storeName: 'currentMission',      data: 7 },
  { storeName: 'currentChapter',    data: 1 },
  { storeName: 'yourSidekick',      data: 'Astra' },
  { storeName: 'timeElapsed',       data: '1:15' },
  { storeName: 'wordsMatched',      data: 15 },
  { storeName: 'multiHitCombos',    data: 16 },
  { storeName: 'minesShattered',    data: 119 },
  { storeName: 'blocksRemoved',     data: 115 },
  { storeName: 'wormHolesCreated',  data: 2 },

  // Level after specific values ----------------------------------------------
  { storeName: 'levelNumber', data: 18 }, //Math.round(1 + (levelData.length - 1) * Math.random());
  { storeName: 'isTutorial', data: false }, // whether or not bonus stars and "improved result" badge showed
  { storeName: 'levelType', data: 'normal' }, // 'normal','bonus'
  { storeName: 'result', data: 'win' }, // 'win','fail'
  { storeName: 'referrer', data: 17 }, // 0 - 180

  { storeName: 'isAntonym', data: true }, // for "Word is opposite of", "Word matched by"

  { storeName: 'throwCount', data: 23 },
  { storeName: 'matchRate', data: 0.9130 }, // only display "improved result" badge if this value is greater than "levelCompletePriorBest"
  { storeName: 'priorBest', data: 0.3463 }, // if it's "-1" don't show "previous best" section

  { storeName: 'bonusStar1',
    data: { complete: true, text: "Matched <b>two</b> words starting with “<b>S</b>”"}
  },
  { storeName: 'bonusStar2',
    data: { complete: false, text: "<b>Perfect play</b> - complete the level with no misses"}
  },
  { storeName: 'bonusStar3',
    data: { complete: true, text: "Make a <b>combo</b> - two matches in one throw"}
  },

  // Options ------------------------------------------------------------------
  { storeName: 'difficultyLevel',     data: 'X' },
                                // X - 'kids/easy', Y - 'ELL/adaptive/medium', Z - 'adult/hardest'
  { storeName: 'revealLettersLevel',  data: 'N' }, // M - 'reveal most', N - 'normal', O - 'hide more'
  { storeName: 'isBottomHeavyFont',   data: false },
  { storeName: 'isReduceMotion',      data: true },
  { storeName: 'isFingerTouches',     data: false },

  { storeName: 'isMusic',             data: true },
  { storeName: 'isSoundFx',           data: false },
  { storeName: 'isHaptics',           data: false },

  { storeName: 'isICloudSync',        data: true },
  { storeName: 'isAnalytics',         data: false },

  // Start page ---------------------------------------------------------------
  {
    storeName: 'startPage',
    data: 'chapter' // 'chapter','level','challenge','options'
  },

  // Chapter page state -------------------------------------------------------
  {
    storeName: 'chapterPageState',
    data: 'minimized' // minimized, full
  },

  // Challenge mode -----------------------------------------------------------
  {
    storeName: 'challengeMode',
    data: 'unplayed' // 'unplayed','played','lose','win'
  },

  // User info ----------------------------------------------------------------
  {
    storeName: 'starsEarned',
    data: 183
  },

  // Title that is used on Chapter (Level) page over the level selection carousel
  {
    storeName: 'selectAMissionTitle',
    data: 'Select a Mission'
  },

  // Selected chapter number --------------------------------------------------
  {
    storeName: 'selectedChapterId',
    data: 3
  },

  // WeeklyChallenge Hexagon titles -------------------------------------------
  {
    storeName: 'hexagonState0Title',
    data: 'Ready, Steady, GO!'
  },
  {
    storeName: 'hexagonState1Title',
    data: 'Played!'
  },
  {
    storeName: 'hexagonState2Title',
    data: 'Almost There!'
  },
  {
    storeName: 'hexagonState3Title',
    data: 'Blazing Fast!'
  },

  // Time needed to earn a badge ----------------------------------------------
  {
    storeName: 'timeToEarnABadge',
    data: 99
  },

  // User's best time ---------------------------------------------------------
  {
    storeName: 'usersBestTime',
    data: 83.2
  },

  // Current challenge timer --------------------------------------------------
  {
    storeName: 'currentChallengeTimer',
    data: '6D 4H'
  },

  // Chapters list ------------------------------------------------------------
  {
    storeName: 'chaptersList',
    data: [
      { title: 'The Matchmaker',
        mainIcon: 'hand_gesture',
        challengeNameWords: ['Tutorial'],
        faceIcons: [ 'menu-image-char01_tyto.png' ],
        chapterNum: 1,
        progress: 10,
        progressBarNames: ['Tyto'],
        isLocked: false,
        isUnlockable: true,
        description: 'The words of Alphazoid Prime are vanishing! Can you help?',
        stripeColors: ['a78f5b', '8e7942'],
        lockLatchColor: 'cdb7c6',
        lockBodyColor: ['f6f2ec','cda29d'],
        stars: { numerator: 10, denominator: 20 },
        gifts: { numerator: 10, denominator: 20 },
        unlockValue: 25,
        confettiColors: ['#ffffff','#dddd66','#666666'],
        progressBarGradient: ['#efd0a9', '#ea924d', '#dd7d50']
      },
      { title: 'All That Glitters',
        mainIcon: 'magic',
        challengeNameWords: ['Stardust','Power'],
        faceIcons: [ 'menu-image-char02_barabell.png', 'menu-image-char03_jaleen.png' ],
        chapterNum: 2,
        progress: 64,
        progressBarNames: ['Barabell','Jaleen'],
        isLocked: true,
        isUnlockable: true,
        description: 'What is the strange object seen flying through Alphazoid Prime?',
        stripeColors: ['73b3b2', '4f8784'],
        lockLatchColor: 'b8b0eb',
        lockBodyColor: ['dfe9f2','9e85c8'],
        stars: { numerator: 10, denominator: 20 },
        gifts: { numerator: 10, denominator: 20 },
        unlockValue: 25,
        confettiColors: ['#ffffff', '#666666', '#69d1fa', '#ea6ff6'],
        progressBarGradient: ['#95c9f2', '#8b8dff', '#b95dea']
      },
      { title: 'Breaking the Code',
        mainIcon: 'radar',
        challengeNameWords: ['Radar','Power'],
        faceIcons: [ 'menu-image-char04_hemdar.png', 'menu-image-char05_sindert.png', 'menu-image-char06_tasha.png' ],
        chapterNum: 3,
        progress: 32,
        progressBarNames: ['Sindert','Hemdar','Tasha'],
        isLocked: true,
        isUnlockable: false,
        description: 'Is the probe’s message encoded? Or does the problem run deeper?',
        stripeColors: ['91b47a', '688954'],
        lockLatchColor: 'b7bce1',
        lockBodyColor: ['dbe3d7','a69084'],
        stars: { numerator: 10, denominator: 20 },
        gifts: { numerator: 10, denominator: 20 },
        unlockValue: 25,
        confettiColors: ['#ffffff', '#666666', '#abfa69', '#ea6ff6'],
        progressBarGradient: ['#b4db9c', '#e07dc6', '#d08350']
      },
      { title: 'The Mix-Up',
        mainIcon: 'diagonal_arrows',
        challengeNameWords: ['Shuffle','Power'],
        faceIcons: ['menu-image-char07_glooper.png', 'menu-image-char08_murka.png'],
        chapterNum: 4,
        progress: 93,
        progressBarNames: ['Glooper','Murka'],
        isLocked: true,
        isUnlockable: true,
        description: 'How can an artist and a baker possibly help save the galaxy?',
        stripeColors: ['9f70b6', '744b87'],
        lockLatchColor: 'c3b0d7',
        lockBodyColor: ['e7d5d4','839cb3'],
        stars: { numerator: 10, denominator: 20 },
        gifts: { numerator: 10, denominator: 20 },
        unlockValue: 25,
        confettiColors: ['#ffffff', '#666666', '#ff8544', '#ea6ff6'],
        progressBarGradient: ['#f7aea5', '#ce7ad7', '#7598da']
      },
      { title: 'Lightning Strikes',
        mainIcon: 'lightning',
        challengeNameWords: ['Zap','Power'],
        faceIcons: [ 'menu-image-char09_thorsaren.png', 'menu-image-char10_rejka.png', 'menu-image-char11_gillim.png' ],
        chapterNum: 5,
        progress: 56,
        progressBarNames: ['Rejka','Thorsaren','Gillim'],
        isLocked: true,
        isUnlockable: true,
        description: 'The Lexiborgs disappeared eons ago… Where could they be now?',
        stripeColors: ['a89e60', '7b743e'],
        lockLatchColor: 'd6b5a3',
        lockBodyColor: ['e5e0d5','a77a98'],
        stars: { numerator: 10, denominator: 20 },
        gifts: { numerator: 10, denominator: 20 },
        unlockValue: 25,
        confettiColors: ['#ffffff','#dddd66','#666666','#ff50ab'],
        progressBarGradient: ['#e1e5a1', '#ee8b95', '#b059ef']
      },
      { title: 'Reaching Out',
        mainIcon: 'magic',
        challengeNameWords: ['Tentacles','Power'],
        faceIcons: [ 'menu-image-char12_vasta.png', 'menu-image-char13_gege.png', 'menu-image-char14_jozi.png' ],
        chapterNum: 6,
        progress: 12,
        progressBarNames: ['Gege','Vasta','Jozi'],
        isLocked: true,
        isUnlockable: true,
        description: 'The Glyphians want to destroy Alphazoid Prime! Can’t we talk this out?',
        stripeColors: ['9aa15d', '70783d'],
        lockLatchColor: 'acc297',
        lockBodyColor: ['e2e3d5','889291'],
        stars: { numerator: 10, denominator: 20 },
        gifts: { numerator: 10, denominator: 20 },
        unlockValue: 25,
        confettiColors: ['#ffffff', '#52faff', '#a3cd00', '#ff9387' ],
        progressBarGradient: ['#f6d6a0', '#de81b1', '#c9619a']
      },
      { title: 'Rainbow Legacy',
        mainIcon: 'crystals',
        challengeNameWords: ['Crystal','Power'],
        faceIcons: [ 'menu-image-char15_astra.png' ],
        chapterNum: 7,
        progress: 42,
        progressBarNames: ['Astra'],
        isLocked: true,
        isUnlockable: true,
        description: 'Can you harvest enough energy before it’s too late?',
        stripeColors: ['97378e', '701e68'],
        lockLatchColor: '979797',
        lockBodyColor: ['cdd2e2','be94bf'],
        stars: { numerator: 10, denominator: 20 },
        gifts: { numerator: 10, denominator: 20 },
        unlockValue: 25,
        confettiColors: ['#ffffff', '#666666', '#ea6ff6'],
        progressBarGradient: ['#c1dfb6', '#dbad76', '#cb844f']
      }
    ]
  },

  // Badges list --------------------------------------------------------------
  {
    storeName: 'badgesList',
    data: [
      { date: '17 Oct 2021', elapsed: '84.8s', topic: 'Geography',
        imageFileName: 'challenge_badge_1',
        topPercentage: 5
      },
      { date: '10 Oct 2021', elapsed: '88.2s', topic: 'The 1960’s',
        imageFileName: 'challenge_badge_2' },
      { date: '3 Oct 2021', elapsed: '58.9s', topic: 'The 1980’s',
        imageFileName: 'challenge_badge_3' },
      { date: '26 Sep 2021', elapsed: '75.3s', topic: 'Health & fitness',
        imageFileName: 'challenge_badge_4',
        topPercentage: 10
      },
      { date: '19 Sep 2021', elapsed: '62.1s', topic: 'Candy brands',
        imageFileName: 'challenge_badge_5' },
      { date: '12 Sep 2021', elapsed: '86.1s', topic: 'Popular culture',
        imageFileName: 'challenge_badge_1' },
      { date: '5 Sep 2021', elapsed: '88.7s', topic: 'Politics',
        imageFileName: 'challenge_badge_2' },
      { date: '29 Aug 2021', elapsed: '91.5s', topic: 'Environment',
        imageFileName: 'challenge_badge_3' },
      { date: '22 Aug 2021', elapsed: '59.4s', topic: 'Ecosystems',
        imageFileName: 'challenge_badge_4' },
      { date: '15 Aug 2021', elapsed: '82.0s', topic: 'Religion',
        imageFileName: 'challenge_badge_5' },
      { date: '8 Aug 2021', elapsed: '96.2s', topic: 'Nature',
        imageFileName: 'challenge_badge_1' },
      { date: '1 Aug 2021', elapsed: '91.5s', topic: 'Marine & oceans',
        imageFileName: 'challenge_badge_2' },
      { date: '25 Jul 2021', elapsed: '66.6s', topic: 'Science',
        imageFileName: 'challenge_badge_3' },
      { date: '18 Jul 2021', elapsed: '85.1s', topic: 'Buddhism',
        imageFileName: 'challenge_badge_4' },
      { date: '11 Jul 2021', elapsed: '78.1s', topic: 'Ancient animals',
        imageFileName: 'challenge_badge_5' },
      { date: '4 Jul 2021', elapsed: '65.6s', topic: 'The media',
        imageFileName: 'challenge_badge_1' },
      { date: '27 Jun 2021', elapsed: '58.1s', topic: 'Folklore',
        imageFileName: 'challenge_badge_2' },
      { date: '20 Jun 2021', elapsed: '57.9s', topic: 'Jobs & work',
        imageFileName: 'challenge_badge_3' },
      { date: '13 Jun 2021', elapsed: '72.6s', topic: 'Christianity',
        imageFileName: 'challenge_badge_4' },
      { date: '6 Jun 2021', elapsed: '83.2s', topic: 'Love & families',
        imageFileName: 'challenge_badge_5' },
      { date: '30 May 2021', elapsed: '74.7s', topic: 'Mind & feelings',
        imageFileName: 'challenge_badge_1' },
      { date: '23 May 2021', elapsed: '95.2s', topic: 'Math & Physics',
        imageFileName: 'challenge_badge_2' },
      { date: '16 May 2021', elapsed: '86.0s', topic: 'The 1930’s',
        imageFileName: 'challenge_badge_3' },
      { date: '9 May 2021', elapsed: '64.4s', topic: 'The 1970’s',
        imageFileName: 'challenge_badge_4' },
      { date: '2 May 2021', elapsed: '90.2s', topic: 'The 1920’s',
        imageFileName: 'challenge_badge_5' },
      { date: '25 Apr 2021', elapsed: '84.2s', topic: 'The 2000’s',
        imageFileName: 'challenge_badge_1' },
      { date: '18 Apr 2021', elapsed: '94.3s', topic: 'History of the Americas',
        imageFileName: 'challenge_badge_2' },
      { date: '11 Apr 2021', elapsed: '95.4s', topic: '19th century',
        imageFileName: 'challenge_badge_3' },
      { date: '4 Apr 2021', elapsed: '55.9s', topic: 'Islam',
        imageFileName: 'challenge_badge_4' },
      { date: '28 Mar 2021', elapsed: '58.3s', topic: 'Disasters',
        imageFileName: 'challenge_badge_5' },
      { date: '21 Mar 2021', elapsed: '76.0s', topic: 'The 1990’s',
        imageFileName: 'challenge_badge_1' },
      { date: '14 Mar 2021', elapsed: '56.5s', topic: 'Ideas & philosophy',
        imageFileName: 'challenge_badge_2' },
      { date: '7 Mar 2021', elapsed: '59.6s', topic: 'Olympic Sports',
        imageFileName: 'challenge_badge_3' },
      { date: '28 Feb 2021', elapsed: '77.9s', topic: 'Money & numbers',
        imageFileName: 'challenge_badge_4' },
      { date: '21 Feb 2021', elapsed: '80.3s', topic: 'The 1950’s',
        imageFileName: 'challenge_badge_5' },
      { date: '14 Feb 2021', elapsed: '84.5s', topic: 'The 1940’s',
        imageFileName: 'challenge_badge_1' },
      { date: '7 Feb 2021', elapsed: '91.6s', topic: 'Food & Cooking',
        imageFileName: 'challenge_badge_2' },
      { date: '31 Jan 2021', elapsed: '91.1s', topic: 'Foreign words',
        imageFileName: 'challenge_badge_3' },
      { date: '24 Jan 2021', elapsed: '79.4s', topic: 'Law & order',
        imageFileName: 'challenge_badge_4' },
      { date: '17 Jan 2021', elapsed: '72.1s', topic: 'Hinduism',
        imageFileName: 'challenge_badge_5' },
      { date: '10 Jan 2021', elapsed: '89.4s', topic: 'The 1910’s',
        imageFileName: 'challenge_badge_1' },
      { date: '3 Jan 2021', elapsed: '61.3s', topic: 'Ball Sports',
        imageFileName: 'challenge_badge_2' },
      { date: '27 Dec 20', elapsed: '64.2s', topic: 'Animals',
        imageFileName: 'challenge_badge_3' },
      { date: '20 Dec 20', elapsed: '80.3s', topic: 'Entertainment',
        imageFileName: 'challenge_badge_4' },
      { date: '13 Dec 20', elapsed: '93.4s', topic: 'elapsed',
        imageFileName: 'challenge_badge_5' },
      { date: '6 Dec 20', elapsed: '81.1s', topic: 'Inequality',
        imageFileName: 'challenge_badge_1' },
      { date: '29 Nov 20', elapsed: '60.5s', topic: 'Cities',
        imageFileName: 'challenge_badge_2' },
      { date: '22 Nov 20', elapsed: '79.5s', topic: 'Ancient History',
        imageFileName: 'challenge_badge_3' },
      { date: '15 Nov 20', elapsed: '59.0s', topic: 'Ancient peoples',
        imageFileName: 'challenge_badge_4' },
      { date: '8 Nov 20', elapsed: '57.4s', topic: 'Arts',
        imageFileName: 'challenge_badge_5' },
      { date: '1 Nov 20', elapsed: '78.4s', topic: 'The 2010’s',
        imageFileName: 'challenge_badge_1' },
      { date: '25 Oct 20', elapsed: '93.5s', topic: 'Judaism ',
        imageFileName: 'challenge_badge_2' },
      { date: '18 Oct 20', elapsed: '97.8s', topic: 'The 1950’s',
        imageFileName: 'challenge_badge_3' },
      { date: '11 Oct 20', elapsed: '81.8s', topic: 'The 1940’s',
        imageFileName: 'challenge_badge_4' },
      { date: '4 Oct 20', elapsed: '75.7s', topic: 'The 1920’s',
        imageFileName: 'challenge_badge_5' },
      { date: '27 Sep 20', elapsed: '88.3s', topic: 'Cities',
        imageFileName: 'challenge_badge_1' },
      { date: '20 Sep 20', elapsed: '87.0s', topic: 'The media',
        imageFileName: 'challenge_badge_2' },
      { date: '13 Sep 20', elapsed: '73.4s', topic: 'Mind & feelings',
        imageFileName: 'challenge_badge_3' },
      { date: '6 Sep 20', elapsed: '77.8s', topic: 'Geography',
        imageFileName: 'challenge_badge_4' },
      { date: '30 Aug 20', elapsed: '80.7s', topic: 'Hinduism',
        imageFileName: 'challenge_badge_5' },
      { date: '23 Aug 20', elapsed: '65.1s', topic: 'Religion',
        imageFileName: 'challenge_badge_1' },
      { date: '16 Aug 20', elapsed: '89.8s', topic: 'Nature',
        imageFileName: 'challenge_badge_2' },
      { date: '9 Aug 20', elapsed: '78.1s', topic: 'Math & Physics',
        imageFileName: 'challenge_badge_3' },
      { date: '2 Aug 20', elapsed: '59.3s', topic: 'Money & numbers',
        imageFileName: 'challenge_badge_4' },
      { date: '26 Jul 20', elapsed: '79.6s', topic: 'Entertainment',
        imageFileName: 'challenge_badge_5' },
      { date: '19 Jul 20', elapsed: '73.6s', topic: 'History of the Americas',
        imageFileName: 'challenge_badge_1' },
      { date: '12 Jul 20', elapsed: '88.7s', topic: 'The 1910’s',
        imageFileName: 'challenge_badge_2' },
      { date: '5 Jul 20', elapsed: '90.8s', topic: 'The 2000’s',
        imageFileName: 'challenge_badge_3' },
      { date: '28 Jun 20', elapsed: '96.4s', topic: 'Animals',
        imageFileName: 'challenge_badge_4' },
      { date: '21 Jun 20', elapsed: '98.7s', topic: 'The 1970’s',
        imageFileName: 'challenge_badge_5' },
      { date: '14 Jun 20', elapsed: '65.4s', topic: 'Islam',
        imageFileName: 'challenge_badge_1' },
      { date: '7 Jun 20', elapsed: '94.3s', topic: 'Inequality',
        imageFileName: 'challenge_badge_2' },
      { date: '31 May 20', elapsed: '67.7s', topic: 'Olympic Sports',
        imageFileName: 'challenge_badge_3' },
      { date: '24 May 20', elapsed: '66.6s', topic: 'The 1980’s',
        imageFileName: 'challenge_badge_4' },
      { date: '17 May 20', elapsed: '81.4s', topic: 'Judaism ',
        imageFileName: 'challenge_badge_5' },
      { date: '10 May 20', elapsed: '59.5s', topic: 'Ancient animals',
        imageFileName: 'challenge_badge_1' },
      { date: '3 May 20', elapsed: '93.6s', topic: 'Disasters',
        imageFileName: 'challenge_badge_2' },
      { date: '26 Apr 20', elapsed: '63.0s', topic: '19th century',
        imageFileName: 'challenge_badge_3' },
      { date: '19 Apr 20', elapsed: '67.8s', topic: 'Folklore',
        imageFileName: 'challenge_badge_4' },
      { date: '12 Apr 20', elapsed: '88.7s', topic: 'Marine & oceans',
        imageFileName: 'challenge_badge_5' },
      { date: '5 Apr 20', elapsed: '57.6s', topic: 'Popular culture',
        imageFileName: 'challenge_badge_1' },
      { date: '29 Mar 20', elapsed: '95.5s', topic: 'Ecosystems',
        imageFileName: 'challenge_badge_2' },
      { date: '22 Mar 20', elapsed: '62.3s', topic: 'Environment',
        imageFileName: 'challenge_badge_3' },
      { date: '15 Mar 20', elapsed: '83.2s', topic: 'Politics',
        imageFileName: 'challenge_badge_4' },
      { date: '8 Mar 20', elapsed: '86.8s', topic: 'Jobs & work',
        imageFileName: 'challenge_badge_5' },
      { date: '1 Mar 20', elapsed: '95.9s', topic: 'The 2010’s',
        imageFileName: 'challenge_badge_1' },
      { date: '23 Feb 20', elapsed: '75.7s', topic: 'Ancient peoples',
        imageFileName: 'challenge_badge_2' },
      { date: '16 Feb 20', elapsed: '58.0s', topic: 'Food & Cooking',
        imageFileName: 'challenge_badge_3' },
      { date: '9 Feb 20', elapsed: '78.6s', topic: 'Ideas & philosophy',
        imageFileName: 'challenge_badge_4' },
      { date: '2 Feb 20', elapsed: '90.0s', topic: 'Christianity',
        imageFileName: 'challenge_badge_5' },
      { date: '26 Jan 20', elapsed: '87.2s', topic: 'Buddhism',
        imageFileName: 'challenge_badge_1' },
      { date: '19 Jan 20', elapsed: '75.5s', topic: 'The 1930’s',
        imageFileName: 'challenge_badge_2' },
      { date: '12 Jan 20', elapsed: '56.7s', topic: 'The 1990’s',
        imageFileName: 'challenge_badge_3' },
      { date: '5 Jan 20', elapsed: '79.7s', topic: 'Candy brands',
        imageFileName: 'challenge_badge_4' },
      { date: '29 Dec 19', elapsed: '97.0s', topic: 'Science',
        imageFileName: 'challenge_badge_5' },
      { date: '22 Dec 19', elapsed: '85.6s', topic: 'Arts',
        imageFileName: 'challenge_badge_1' },
      { date: '15 Dec 19', elapsed: '63.8s', topic: 'Foreign words',
        imageFileName: 'challenge_badge_2' },
      { date: '8 Dec 19', elapsed: '67.2s', topic: 'Law & order',
        imageFileName: 'challenge_badge_3' },
      { date: '1 Dec 19', elapsed: '59.1s', topic: 'Health & fitness',
        imageFileName: 'challenge_badge_4' },
      { date: '24 Nov 19', elapsed: '64.6s', topic: 'Ancient History',
        imageFileName: 'challenge_badge_5' }
    ]
  },

  // Word pills list ----------------------------------------------------------
  {
    storeName: 'wordsPillsList',
    data: [
      { word: 'citrus', color: '#a48731'},
      { word: 'price', color: '#8d2b75'},
      { word: 'blend', color: '#1e7361'},
      { word: 'saga', color: '#415198'},
      { word: 'visual art', color: '#2d7f91'},
      { word: 'citrus2', color: '#a48731'},
      { word: 'price2', color: '#8d2b75'},
      { word: 'blend2', color: '#1e7361'},
      { word: 'saga2', color: '#415198'},
      { word: 'visual art2', color: '#2d7f91'},
      { word: 'citrus3', color: '#a48731'},
      { word: 'price3', color: '#8d2b75'},
      { word: 'blend3', color: '#1e7361'},
      { word: 'saga3', color: '#415198'},
      { word: 'visual art3', color: '#2d7f91'}
    ]
  }
  
  
  
];

if (!window.dataSource) {
  window.dataSource = dataSource;
}

export default dataSource;