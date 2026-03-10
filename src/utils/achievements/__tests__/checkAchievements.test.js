import { checkNewAchievements, formatUnlockedAchievements } from '../checkAchievements';

describe('checkNewAchievements', () => {
  const baseContext = {
    completedClues: [],
    streak: 0,
    longestStreak: 0,
    achievements: { unlocked: {} },
  };

  describe('volume achievements', () => {
    it('should unlock "First Steps" on first clue completion', () => {
      const context = {
        ...baseContext,
        completedClues: [{ clid: 1, hints: 0, guesses: 1, difficulty: 1 }],
      };
      const justCompleted = { clid: 1, hints: 0, guesses: 1, difficulty: 1 };

      const unlocked = checkNewAchievements(context, justCompleted);

      expect(unlocked.some((a) => a.id === 'volume-1')).toBe(true);
    });

    it('should unlock "Getting the Hang of It" on 10th clue', () => {
      const completedClues = Array.from({ length: 10 }, (_, i) => ({
        clid: i + 1,
        hints: 0,
        guesses: 1,
        difficulty: 1,
      }));
      const context = {
        ...baseContext,
        completedClues,
        achievements: { unlocked: { 'volume-1': { unlockedAt: 'test' } } },
      };
      const justCompleted = completedClues[9];

      const unlocked = checkNewAchievements(context, justCompleted);

      expect(unlocked.some((a) => a.id === 'volume-10')).toBe(true);
    });
  });

  describe('streak achievements', () => {
    it('should unlock "Getting Started" on 2 day streak', () => {
      const context = {
        ...baseContext,
        streak: 2,
        completedClues: [{ clid: 1 }, { clid: 2 }],
      };
      const justCompleted = { clid: 2, hints: 0, guesses: 1 };

      const unlocked = checkNewAchievements(context, justCompleted);

      expect(unlocked.some((a) => a.id === 'streak-2')).toBe(true);
    });

    it('should unlock "Weekly Warrior" on 7 day streak', () => {
      const context = {
        ...baseContext,
        streak: 7,
        completedClues: Array.from({ length: 7 }, (_, i) => ({ clid: i + 1 })),
        achievements: { unlocked: { 'streak-2': { unlockedAt: 'test' } } },
      };
      const justCompleted = { clid: 7, hints: 0, guesses: 1 };

      const unlocked = checkNewAchievements(context, justCompleted);

      expect(unlocked.some((a) => a.id === 'streak-7')).toBe(true);
    });
  });

  describe('skill achievements', () => {
    it('should unlock "No Help Needed" when solving without hints', () => {
      const context = {
        ...baseContext,
        completedClues: [{ clid: 1, hints: 0, guesses: 2 }],
      };
      const justCompleted = { clid: 1, hints: 0, guesses: 2 };

      const unlocked = checkNewAchievements(context, justCompleted);

      expect(unlocked.some((a) => a.id === 'skill-no-hints')).toBe(true);
    });

    it('should unlock "First Try" when solving on first guess', () => {
      const context = {
        ...baseContext,
        completedClues: [{ clid: 1, hints: 1, guesses: 1 }],
      };
      const justCompleted = { clid: 1, hints: 1, guesses: 1 };

      const unlocked = checkNewAchievements(context, justCompleted);

      expect(unlocked.some((a) => a.id === 'skill-first-guess')).toBe(true);
    });

    it('should unlock "Perfect Solve" when solving without hints on first guess', () => {
      const context = {
        ...baseContext,
        completedClues: [{ clid: 1, hints: 0, guesses: 1 }],
      };
      const justCompleted = { clid: 1, hints: 0, guesses: 1 };

      const unlocked = checkNewAchievements(context, justCompleted);

      expect(unlocked.some((a) => a.id === 'skill-perfect')).toBe(true);
    });

    it('should unlock difficulty achievements based on clue difficulty', () => {
      const context = {
        ...baseContext,
        completedClues: [{ clid: 1, hints: 0, guesses: 1, difficulty: 3 }],
      };
      const justCompleted = { clid: 1, hints: 0, guesses: 1, difficulty: 3 };

      const unlocked = checkNewAchievements(context, justCompleted);

      expect(unlocked.some((a) => a.id === 'skill-difficulty-3')).toBe(true);
    });

  });

  describe('type achievements', () => {
    it('should unlock "Anagram Ace" when solving an anagram clue', () => {
      const cluesData = [{ clid: 1, type: 'anagram' }];
      const context = {
        ...baseContext,
        completedClues: [{ clid: 1, hints: 0, guesses: 1 }],
      };
      const justCompleted = { clid: 1, hints: 0, guesses: 1 };

      const unlocked = checkNewAchievements(context, justCompleted, cluesData);

      expect(unlocked.some((a) => a.id === 'type-anagram')).toBe(true);
    });

    it('should unlock "Double Trouble" when solving a double definition clue', () => {
      const cluesData = [{ clid: 1, type: 'double definition' }];
      const context = {
        ...baseContext,
        completedClues: [{ clid: 1, hints: 0, guesses: 1 }],
      };
      const justCompleted = { clid: 1, hints: 0, guesses: 1 };

      const unlocked = checkNewAchievements(context, justCompleted, cluesData);

      expect(unlocked.some((a) => a.id === 'type-double-definition')).toBe(true);
    });

    it('should unlock "Combo Breaker" when solving a clue with multiple types', () => {
      // Type is stored as comma-separated string (e.g., "charade, container")
      const cluesData = [{ clid: 1, type: 'charade, container' }];
      const context = {
        ...baseContext,
        completedClues: [{ clid: 1, hints: 0, guesses: 1 }],
      };
      const justCompleted = { clid: 1, hints: 0, guesses: 1 };

      const unlocked = checkNewAchievements(context, justCompleted, cluesData);

      expect(unlocked.some((a) => a.id === 'type-combination')).toBe(true);
    });

    it('should not unlock "Combo Breaker" when solving a clue with single type', () => {
      const cluesData = [{ clid: 1, type: 'anagram' }];
      const context = {
        ...baseContext,
        completedClues: [{ clid: 1, hints: 0, guesses: 1 }],
      };
      const justCompleted = { clid: 1, hints: 0, guesses: 1 };

      const unlocked = checkNewAchievements(context, justCompleted, cluesData);

      expect(unlocked.some((a) => a.id === 'type-combination')).toBe(false);
    });
  });

  describe('speed achievements', () => {
    it('should unlock "Speed Demon" when solving in under 30 seconds', () => {
      const context = {
        ...baseContext,
        completedClues: [{ clid: 1, hints: 0, guesses: 1, solveTime: 25 }],
      };
      const justCompleted = { clid: 1, hints: 0, guesses: 1, solveTime: 25 };

      const unlocked = checkNewAchievements(context, justCompleted);

      expect(unlocked.some((a) => a.id === 'skill-speed-demon')).toBe(true);
    });

    it('should unlock "Quick Thinker" when solving in under 60 seconds', () => {
      const context = {
        ...baseContext,
        completedClues: [{ clid: 1, hints: 0, guesses: 1, solveTime: 55 }],
      };
      const justCompleted = { clid: 1, hints: 0, guesses: 1, solveTime: 55 };

      const unlocked = checkNewAchievements(context, justCompleted);

      expect(unlocked.some((a) => a.id === 'skill-quick-thinker')).toBe(true);
    });

    it('should unlock "Lightning Fast" when solving in under 15 seconds', () => {
      const context = {
        ...baseContext,
        completedClues: [{ clid: 1, hints: 0, guesses: 1, solveTime: 10 }],
      };
      const justCompleted = { clid: 1, hints: 0, guesses: 1, solveTime: 10 };

      const unlocked = checkNewAchievements(context, justCompleted);

      expect(unlocked.some((a) => a.id === 'skill-lightning-fast')).toBe(true);
    });
  });

  describe('duplicate prevention', () => {
    it('should not unlock already unlocked achievements', () => {
      const context = {
        ...baseContext,
        completedClues: [{ clid: 1, hints: 0, guesses: 1 }],
        achievements: {
          unlocked: {
            'volume-1': { unlockedAt: '2024-01-01' },
            'skill-no-hints': { unlockedAt: '2024-01-01' },
            'skill-first-guess': { unlockedAt: '2024-01-01' },
            'skill-perfect': { unlockedAt: '2024-01-01' },
          },
        },
      };
      const justCompleted = { clid: 1, hints: 0, guesses: 1 };

      const unlocked = checkNewAchievements(context, justCompleted);

      expect(unlocked.some((a) => a.id === 'volume-1')).toBe(false);
      expect(unlocked.some((a) => a.id === 'skill-no-hints')).toBe(false);
    });
  });
});

describe('formatUnlockedAchievements', () => {
  it('should format achievements with timestamps', () => {
    const achievements = [
      { id: 'volume-1', name: 'First Steps' },
      { id: 'streak-2', name: 'Getting Started' },
    ];

    const formatted = formatUnlockedAchievements(achievements);

    expect(formatted['volume-1']).toBeDefined();
    expect(formatted['volume-1'].unlockedAt).toBeDefined();
    expect(formatted['streak-2']).toBeDefined();
    expect(formatted['streak-2'].unlockedAt).toBeDefined();
  });
});
