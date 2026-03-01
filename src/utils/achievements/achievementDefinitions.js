/**
 * Achievement definitions for Learn Cryptic
 * Each achievement has check() for new unlocks and retroactiveCheck() for existing users
 */

export const ACHIEVEMENT_CATEGORIES = {
  STREAK: 'streak',
  VOLUME: 'volume',
  SKILL: 'skill',
  TYPE: 'type',
  FUN: 'fun',
};

// Helper to get hour from completedAt timestamp
const getHour = (completedAt) => {
  if (!completedAt) return null;
  const date = new Date(completedAt);
  return date.getHours();
};

// Achievement definitions
export const achievements = [
  // STREAK ACHIEVEMENTS
  {
    id: 'streak-2',
    category: ACHIEVEMENT_CATEGORIES.STREAK,
    name: 'Getting Started',
    description: '2 day streak',
    icon: 'streak',
    tier: 1,
    check: ({ streak }) => streak >= 2,
    retroactiveCheck: ({ longestStreak }) => longestStreak >= 2,
  },
  {
    id: 'streak-7',
    category: ACHIEVEMENT_CATEGORIES.STREAK,
    name: 'Weekly Warrior',
    description: '7 day streak',
    icon: 'streak',
    tier: 2,
    check: ({ streak }) => streak >= 7,
    retroactiveCheck: ({ longestStreak }) => longestStreak >= 7,
  },
  {
    id: 'streak-30',
    category: ACHIEVEMENT_CATEGORIES.STREAK,
    name: 'Monthly Master',
    description: '30 day streak',
    icon: 'streak',
    tier: 3,
    check: ({ streak }) => streak >= 30,
    retroactiveCheck: ({ longestStreak }) => longestStreak >= 30,
  },
  {
    id: 'streak-100',
    category: ACHIEVEMENT_CATEGORIES.STREAK,
    name: 'Century Club',
    description: '100 day streak',
    icon: 'streak',
    tier: 4,
    check: ({ streak }) => streak >= 100,
    retroactiveCheck: ({ longestStreak }) => longestStreak >= 100,
  },
  {
    id: 'streak-365',
    category: ACHIEVEMENT_CATEGORIES.STREAK,
    name: 'Year of Cryptics',
    description: '365 day streak',
    icon: 'streak',
    tier: 5,
    check: ({ streak }) => streak >= 365,
    retroactiveCheck: ({ longestStreak }) => longestStreak >= 365,
  },

  // VOLUME ACHIEVEMENTS
  {
    id: 'volume-1',
    category: ACHIEVEMENT_CATEGORIES.VOLUME,
    name: 'First Steps',
    description: 'Solve your first clue',
    icon: 'clue',
    tier: 1,
    check: ({ totalSolved }) => totalSolved >= 1,
    retroactiveCheck: ({ completedClues }) => completedClues.length >= 1,
  },
  {
    id: 'volume-10',
    category: ACHIEVEMENT_CATEGORIES.VOLUME,
    name: 'Getting the Hang of It',
    description: 'Solve 10 clues',
    icon: 'clue',
    tier: 2,
    check: ({ totalSolved }) => totalSolved >= 10,
    retroactiveCheck: ({ completedClues }) => completedClues.length >= 10,
  },
  {
    id: 'volume-50',
    category: ACHIEVEMENT_CATEGORIES.VOLUME,
    name: 'Halfway to 100',
    description: 'Solve 50 clues',
    icon: 'clue',
    tier: 3,
    check: ({ totalSolved }) => totalSolved >= 50,
    retroactiveCheck: ({ completedClues }) => completedClues.length >= 50,
  },
  {
    id: 'volume-100',
    category: ACHIEVEMENT_CATEGORIES.VOLUME,
    name: 'Century Solver',
    description: 'Solve 100 clues',
    icon: 'clue',
    tier: 4,
    check: ({ totalSolved }) => totalSolved >= 100,
    retroactiveCheck: ({ completedClues }) => completedClues.length >= 100,
  },
  {
    id: 'volume-500',
    category: ACHIEVEMENT_CATEGORIES.VOLUME,
    name: 'Cryptic Expert',
    description: 'Solve 500 clues',
    icon: 'clue',
    tier: 5,
    check: ({ totalSolved }) => totalSolved >= 500,
    retroactiveCheck: ({ completedClues }) => completedClues.length >= 500,
  },

  // SKILL ACHIEVEMENTS
  {
    id: 'skill-no-hints',
    category: ACHIEVEMENT_CATEGORIES.SKILL,
    name: 'No Help Needed',
    description: 'Solve a clue without hints',
    icon: 'brain',
    tier: 1,
    check: ({ justCompleted }) => justCompleted && justCompleted.hints === 0,
    retroactiveCheck: ({ completedClues }) =>
      completedClues.some((c) => c.hints === 0),
  },
  {
    id: 'skill-first-guess',
    category: ACHIEVEMENT_CATEGORIES.SKILL,
    name: 'First Try',
    description: 'Solve a clue on your first guess',
    icon: 'target',
    tier: 2,
    check: ({ justCompleted }) => justCompleted && justCompleted.guesses === 1,
    retroactiveCheck: ({ completedClues }) =>
      completedClues.some((c) => c.guesses === 1),
  },
  {
    id: 'skill-perfect',
    category: ACHIEVEMENT_CATEGORIES.SKILL,
    name: 'Perfect Solve',
    description: 'Solve with no hints on first guess',
    icon: 'star',
    tier: 3,
    check: ({ justCompleted }) =>
      justCompleted && justCompleted.hints === 0 && justCompleted.guesses === 1,
    retroactiveCheck: ({ completedClues }) =>
      completedClues.some((c) => c.hints === 0 && c.guesses === 1),
  },
  {
    id: 'skill-difficulty-1',
    category: ACHIEVEMENT_CATEGORIES.SKILL,
    name: 'Easy Does It',
    description: 'Solve an easy clue',
    icon: 'difficulty',
    tier: 1,
    check: ({ justCompleted }) =>
      justCompleted && Number(justCompleted.difficulty) === 1,
    retroactiveCheck: ({ completedClues }) =>
      completedClues.some((c) => Number(c.difficulty) === 1),
  },
  {
    id: 'skill-difficulty-2',
    category: ACHIEVEMENT_CATEGORIES.SKILL,
    name: 'Stepping Up',
    description: 'Solve a moderate clue',
    icon: 'difficulty',
    tier: 2,
    check: ({ justCompleted }) =>
      justCompleted && Number(justCompleted.difficulty) === 2,
    retroactiveCheck: ({ completedClues }) =>
      completedClues.some((c) => Number(c.difficulty) === 2),
  },
  {
    id: 'skill-difficulty-3',
    category: ACHIEVEMENT_CATEGORIES.SKILL,
    name: 'Challenge Accepted',
    description: 'Solve a difficult clue',
    icon: 'difficulty',
    tier: 3,
    check: ({ justCompleted }) =>
      justCompleted && Number(justCompleted.difficulty) === 3,
    retroactiveCheck: ({ completedClues }) =>
      completedClues.some((c) => Number(c.difficulty) === 3),
  },
  {
    id: 'skill-difficulty-4',
    category: ACHIEVEMENT_CATEGORIES.SKILL,
    name: 'Expert Level',
    description: 'Solve an expert clue',
    icon: 'difficulty',
    tier: 4,
    check: ({ justCompleted }) =>
      justCompleted && Number(justCompleted.difficulty) === 4,
    retroactiveCheck: ({ completedClues }) =>
      completedClues.some((c) => Number(c.difficulty) === 4),
  },

  // TYPE ACHIEVEMENTS (first of each clue type)
  {
    id: 'type-anagram',
    category: ACHIEVEMENT_CATEGORIES.TYPE,
    name: 'Anagram Ace',
    description: 'Solve your first anagram',
    icon: 'anagram',
    tier: 1,
    check: ({ justCompleted, cluesData }) => {
      if (!justCompleted || !cluesData) return false;
      const clue = cluesData.find((c) => c.clid === justCompleted.clid);
      return clue?.type?.includes('anagram');
    },
    retroactiveCheck: ({ completedClues, cluesData }) => {
      if (!cluesData) return false;
      return completedClues.some((completed) => {
        const clue = cluesData.find((c) => c.clid === completed.clid);
        return clue?.type?.includes('anagram');
      });
    },
  },
  {
    id: 'type-charade',
    category: ACHIEVEMENT_CATEGORIES.TYPE,
    name: 'Charade Champion',
    description: 'Solve your first charade',
    icon: 'charade',
    tier: 1,
    check: ({ justCompleted, cluesData }) => {
      if (!justCompleted || !cluesData) return false;
      const clue = cluesData.find((c) => c.clid === justCompleted.clid);
      return clue?.type?.includes('charade');
    },
    retroactiveCheck: ({ completedClues, cluesData }) => {
      if (!cluesData) return false;
      return completedClues.some((completed) => {
        const clue = cluesData.find((c) => c.clid === completed.clid);
        return clue?.type?.includes('charade');
      });
    },
  },
  {
    id: 'type-container',
    category: ACHIEVEMENT_CATEGORIES.TYPE,
    name: 'Container Cracker',
    description: 'Solve your first container',
    icon: 'container',
    tier: 1,
    check: ({ justCompleted, cluesData }) => {
      if (!justCompleted || !cluesData) return false;
      const clue = cluesData.find((c) => c.clid === justCompleted.clid);
      return clue?.type?.includes('container');
    },
    retroactiveCheck: ({ completedClues, cluesData }) => {
      if (!cluesData) return false;
      return completedClues.some((completed) => {
        const clue = cluesData.find((c) => c.clid === completed.clid);
        return clue?.type?.includes('container');
      });
    },
  },
  {
    id: 'type-deletion',
    category: ACHIEVEMENT_CATEGORIES.TYPE,
    name: 'Deletion Detective',
    description: 'Solve your first deletion',
    icon: 'deletion',
    tier: 1,
    check: ({ justCompleted, cluesData }) => {
      if (!justCompleted || !cluesData) return false;
      const clue = cluesData.find((c) => c.clid === justCompleted.clid);
      return clue?.type?.includes('deletion');
    },
    retroactiveCheck: ({ completedClues, cluesData }) => {
      if (!cluesData) return false;
      return completedClues.some((completed) => {
        const clue = cluesData.find((c) => c.clid === completed.clid);
        return clue?.type?.includes('deletion');
      });
    },
  },
  {
    id: 'type-double-definition',
    category: ACHIEVEMENT_CATEGORIES.TYPE,
    name: 'Double Trouble',
    description: 'Solve your first double definition',
    icon: 'double-definition',
    tier: 1,
    check: ({ justCompleted, cluesData }) => {
      if (!justCompleted || !cluesData) return false;
      const clue = cluesData.find((c) => c.clid === justCompleted.clid);
      return clue?.type?.includes('double-definition');
    },
    retroactiveCheck: ({ completedClues, cluesData }) => {
      if (!cluesData) return false;
      return completedClues.some((completed) => {
        const clue = cluesData.find((c) => c.clid === completed.clid);
        return clue?.type?.includes('double-definition');
      });
    },
  },
  {
    id: 'type-hidden-word',
    category: ACHIEVEMENT_CATEGORIES.TYPE,
    name: 'Hidden Hunter',
    description: 'Solve your first hidden word',
    icon: 'hidden-word',
    tier: 1,
    check: ({ justCompleted, cluesData }) => {
      if (!justCompleted || !cluesData) return false;
      const clue = cluesData.find((c) => c.clid === justCompleted.clid);
      return clue?.type?.includes('hidden-word');
    },
    retroactiveCheck: ({ completedClues, cluesData }) => {
      if (!cluesData) return false;
      return completedClues.some((completed) => {
        const clue = cluesData.find((c) => c.clid === completed.clid);
        return clue?.type?.includes('hidden-word');
      });
    },
  },
  {
    id: 'type-homophone',
    category: ACHIEVEMENT_CATEGORIES.TYPE,
    name: 'Sound Sleuth',
    description: 'Solve your first homophone',
    icon: 'homophone',
    tier: 1,
    check: ({ justCompleted, cluesData }) => {
      if (!justCompleted || !cluesData) return false;
      const clue = cluesData.find((c) => c.clid === justCompleted.clid);
      return clue?.type?.includes('homophone');
    },
    retroactiveCheck: ({ completedClues, cluesData }) => {
      if (!cluesData) return false;
      return completedClues.some((completed) => {
        const clue = cluesData.find((c) => c.clid === completed.clid);
        return clue?.type?.includes('homophone');
      });
    },
  },
  {
    id: 'type-initialism',
    category: ACHIEVEMENT_CATEGORIES.TYPE,
    name: 'Initial Insight',
    description: 'Solve your first initialism',
    icon: 'initialism',
    tier: 1,
    check: ({ justCompleted, cluesData }) => {
      if (!justCompleted || !cluesData) return false;
      const clue = cluesData.find((c) => c.clid === justCompleted.clid);
      return clue?.type?.includes('initialism');
    },
    retroactiveCheck: ({ completedClues, cluesData }) => {
      if (!cluesData) return false;
      return completedClues.some((completed) => {
        const clue = cluesData.find((c) => c.clid === completed.clid);
        return clue?.type?.includes('initialism');
      });
    },
  },
  {
    id: 'type-reversal',
    category: ACHIEVEMENT_CATEGORIES.TYPE,
    name: 'Reversal Revealed',
    description: 'Solve your first reversal',
    icon: 'reversal',
    tier: 1,
    check: ({ justCompleted, cluesData }) => {
      if (!justCompleted || !cluesData) return false;
      const clue = cluesData.find((c) => c.clid === justCompleted.clid);
      return clue?.type?.includes('reversal');
    },
    retroactiveCheck: ({ completedClues, cluesData }) => {
      if (!cluesData) return false;
      return completedClues.some((completed) => {
        const clue = cluesData.find((c) => c.clid === completed.clid);
        return clue?.type?.includes('reversal');
      });
    },
  },
  {
    id: 'type-spoonerism',
    category: ACHIEVEMENT_CATEGORIES.TYPE,
    name: 'Spoonerism Spotter',
    description: 'Solve your first spoonerism',
    icon: 'spoonerism',
    tier: 1,
    check: ({ justCompleted, cluesData }) => {
      if (!justCompleted || !cluesData) return false;
      const clue = cluesData.find((c) => c.clid === justCompleted.clid);
      return clue?.type?.includes('spoonerism');
    },
    retroactiveCheck: ({ completedClues, cluesData }) => {
      if (!cluesData) return false;
      return completedClues.some((completed) => {
        const clue = cluesData.find((c) => c.clid === completed.clid);
        return clue?.type?.includes('spoonerism');
      });
    },
  },

  // FUN ACHIEVEMENTS
  {
    id: 'fun-night-owl',
    category: ACHIEVEMENT_CATEGORIES.FUN,
    name: 'Night Owl',
    description: 'Solve between midnight and 5am',
    icon: 'moon',
    tier: 1,
    check: ({ justCompleted }) => {
      if (!justCompleted?.completedAt) return false;
      const hour = getHour(justCompleted.completedAt);
      return hour !== null && hour >= 0 && hour < 5;
    },
    retroactiveCheck: ({ completedClues }) =>
      completedClues.some((c) => {
        const hour = getHour(c.completedAt);
        return hour !== null && hour >= 0 && hour < 5;
      }),
  },
  {
    id: 'fun-early-bird',
    category: ACHIEVEMENT_CATEGORIES.FUN,
    name: 'Early Bird',
    description: 'Solve between 5am and 7am',
    icon: 'sun',
    tier: 1,
    check: ({ justCompleted }) => {
      if (!justCompleted?.completedAt) return false;
      const hour = getHour(justCompleted.completedAt);
      return hour !== null && hour >= 5 && hour < 7;
    },
    retroactiveCheck: ({ completedClues }) =>
      completedClues.some((c) => {
        const hour = getHour(c.completedAt);
        return hour !== null && hour >= 5 && hour < 7;
      }),
  },
  {
    id: 'fun-speed-demon',
    category: ACHIEVEMENT_CATEGORIES.FUN,
    name: 'Speed Demon',
    description: 'Solve in under 30 seconds',
    icon: 'lightning',
    tier: 2,
    check: ({ justCompleted }) =>
      justCompleted?.solveTime != null && justCompleted.solveTime < 30,
    retroactiveCheck: ({ completedClues }) =>
      completedClues.some((c) => c.solveTime != null && c.solveTime < 30),
  },
  {
    id: 'fun-comeback',
    category: ACHIEVEMENT_CATEGORIES.FUN,
    name: 'Comeback Kid',
    description: 'Return after 7+ days away',
    icon: 'calendar',
    tier: 1,
    // This is checked specially - we can only detect this on completion if we track last activity
    // For now, we'll skip the live check and rely on retroactive (which also can't detect this easily)
    check: () => false, // Cannot easily detect in real-time without additional state
    retroactiveCheck: ({ completedClues }) => {
      // Sort by completedAt and check for 7+ day gaps
      const sorted = [...completedClues]
        .filter((c) => c.completedAt)
        .sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));

      for (let i = 1; i < sorted.length; i++) {
        const prev = new Date(sorted[i - 1].completedAt);
        const curr = new Date(sorted[i].completedAt);
        const daysDiff = (curr - prev) / (1000 * 60 * 60 * 24);
        if (daysDiff >= 7) {
          return true;
        }
      }
      return false;
    },
  },
];

// Get achievement by ID
export const getAchievementById = (id) =>
  achievements.find((a) => a.id === id);

// Get achievements by category
export const getAchievementsByCategory = (category) =>
  achievements.filter((a) => a.category === category);

// Get all achievement IDs
export const getAllAchievementIds = () => achievements.map((a) => a.id);

// Category display names
export const categoryDisplayNames = {
  [ACHIEVEMENT_CATEGORIES.STREAK]: 'Streaks',
  [ACHIEVEMENT_CATEGORIES.VOLUME]: 'Progress',
  [ACHIEVEMENT_CATEGORIES.SKILL]: 'Skills',
  [ACHIEVEMENT_CATEGORIES.TYPE]: 'Clue Types',
  [ACHIEVEMENT_CATEGORIES.FUN]: 'Fun',
};

// Get progress info for incremental achievements (for UI display)
export const getAchievementProgress = (achievementId, context) => {
  const { completedClues = [], streak = 0, longestStreak = 0 } = context;
  const totalSolved = completedClues.length;

  switch (achievementId) {
    case 'streak-2':
      return { current: Math.max(streak, longestStreak), target: 2 };
    case 'streak-7':
      return { current: Math.max(streak, longestStreak), target: 7 };
    case 'streak-30':
      return { current: Math.max(streak, longestStreak), target: 30 };
    case 'streak-100':
      return { current: Math.max(streak, longestStreak), target: 100 };
    case 'streak-365':
      return { current: Math.max(streak, longestStreak), target: 365 };
    case 'volume-1':
      return { current: totalSolved, target: 1 };
    case 'volume-10':
      return { current: totalSolved, target: 10 };
    case 'volume-50':
      return { current: totalSolved, target: 50 };
    case 'volume-100':
      return { current: totalSolved, target: 100 };
    case 'volume-500':
      return { current: totalSolved, target: 500 };
    default:
      return null;
  }
};
