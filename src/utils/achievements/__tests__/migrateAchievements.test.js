import { migrateAchievements, hasMigrationRun, resetMigration } from '../migrateAchievements';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('migrateAchievements', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  const cluesData = [
    { clid: 1, type: ['anagram'], difficulty: 1 },
    { clid: 2, type: ['charade'], difficulty: 2 },
    { clid: 3, type: ['container'], difficulty: 3 },
  ];

  it('should return null if migration already ran', () => {
    localStorageMock.setItem('lcMigration_achievements_v1', 'true');

    const result = migrateAchievements(cluesData);

    expect(result).toBeNull();
  });

  it('should return null if no stored state', () => {
    const result = migrateAchievements(cluesData);

    expect(result).toBeNull();
    expect(localStorageMock.getItem('lcMigration_achievements_v1')).toBe('true');
  });

  it('should return null if no completed clues', () => {
    localStorageMock.setItem(
      'lcState',
      JSON.stringify({
        completedClues: [],
        streak: 0,
        longestStreak: 0,
      })
    );

    const result = migrateAchievements(cluesData);

    expect(result).toBeNull();
    expect(localStorageMock.getItem('lcMigration_achievements_v1')).toBe('true');
  });

  it('should migrate retroactive achievements for existing users', () => {
    const existingState = {
      completedClues: [
        { clid: 1, hints: 0, guesses: 1, difficulty: 1 },
        { clid: 2, hints: 1, guesses: 2, difficulty: 2 },
      ],
      streak: 2,
      longestStreak: 5,
    };
    localStorageMock.setItem('lcState', JSON.stringify(existingState));

    const result = migrateAchievements(cluesData);

    expect(result).not.toBeNull();
    expect(result.migrated).toBe(true);
    expect(result.newAchievements.length).toBeGreaterThan(0);

    // Check that achievements were saved
    const updatedState = JSON.parse(localStorageMock.getItem('lcState'));
    expect(updatedState.achievements).toBeDefined();
    expect(updatedState.achievements.unlocked).toBeDefined();
    expect(Object.keys(updatedState.achievements.unlocked).length).toBeGreaterThan(0);
  });

  it('should mark retroactive achievements as retroactive', () => {
    const existingState = {
      completedClues: [{ clid: 1, hints: 0, guesses: 1, difficulty: 1 }],
      streak: 0,
      longestStreak: 0,
    };
    localStorageMock.setItem('lcState', JSON.stringify(existingState));

    migrateAchievements(cluesData);

    const updatedState = JSON.parse(localStorageMock.getItem('lcState'));
    const unlockedAchievements = Object.values(updatedState.achievements.unlocked);
    expect(unlockedAchievements.every((a) => a.retroactive === true)).toBe(true);
  });

  it('should not unlock achievements that are already unlocked', () => {
    const existingState = {
      completedClues: [{ clid: 1, hints: 0, guesses: 1, difficulty: 1 }],
      streak: 0,
      longestStreak: 0,
      achievements: {
        unlocked: {
          'volume-1': { unlockedAt: '2024-01-01', retroactive: false },
        },
      },
    };
    localStorageMock.setItem('lcState', JSON.stringify(existingState));

    const result = migrateAchievements(cluesData);

    expect(result.newAchievements.some((a) => a.id === 'volume-1')).toBe(false);

    const updatedState = JSON.parse(localStorageMock.getItem('lcState'));
    // Original achievement should be preserved
    expect(updatedState.achievements.unlocked['volume-1'].retroactive).toBe(false);
  });

  it('should unlock type achievements based on clue types', () => {
    const existingState = {
      completedClues: [
        { clid: 1, hints: 0, guesses: 1, difficulty: 1 },
        { clid: 2, hints: 0, guesses: 1, difficulty: 2 },
      ],
      streak: 0,
      longestStreak: 0,
    };
    localStorageMock.setItem('lcState', JSON.stringify(existingState));

    const result = migrateAchievements(cluesData);

    expect(result.newAchievements.some((a) => a.id === 'type-anagram')).toBe(true);
    expect(result.newAchievements.some((a) => a.id === 'type-charade')).toBe(true);
  });
});

describe('hasMigrationRun', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it('should return false if migration has not run', () => {
    expect(hasMigrationRun()).toBe(false);
  });

  it('should return true if migration has run', () => {
    localStorageMock.setItem('lcMigration_achievements_v1', 'true');
    expect(hasMigrationRun()).toBe(true);
  });
});

describe('resetMigration', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it('should remove the migration flag', () => {
    localStorageMock.setItem('lcMigration_achievements_v1', 'true');
    resetMigration();
    expect(localStorageMock.getItem('lcMigration_achievements_v1')).toBeNull();
  });
});
