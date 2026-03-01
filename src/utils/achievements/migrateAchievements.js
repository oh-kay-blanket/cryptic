/**
 * One-time migration to calculate retroactive achievements for existing users.
 * Similar pattern to migrateCompletedClues.js
 */

import { achievements } from './achievementDefinitions';

const MIGRATION_KEY = 'lcMigration_achievements_v1';

/**
 * Migrate existing user data to calculate retroactive achievements
 * @param {Array} cluesData - All clues data (for type checking)
 * @returns {Object|null} Object with { migrated: boolean, newAchievements: Array } or null if no migration needed
 */
export const migrateAchievements = (cluesData) => {
  // Check if migration already ran
  if (typeof window === 'undefined') return null;
  if (localStorage.getItem(MIGRATION_KEY)) return null;

  // Get current state
  const storedState = localStorage.getItem('lcState');
  if (!storedState) {
    // No state to migrate, mark as done
    localStorage.setItem(MIGRATION_KEY, 'true');
    return null;
  }

  try {
    const lcState = JSON.parse(storedState);
    const completedClues = lcState.completedClues || [];
    const streak = lcState.streak || 0;
    const longestStreak = lcState.longestStreak || 0;

    // If user has no completed clues, nothing to migrate
    if (completedClues.length === 0) {
      localStorage.setItem(MIGRATION_KEY, 'true');
      return null;
    }

    // Check if user already has achievements state
    const existingAchievements = lcState.achievements?.unlocked || {};
    const existingIds = Object.keys(existingAchievements);

    // Build context for retroactive checks
    const context = {
      completedClues,
      streak,
      longestStreak,
      cluesData,
    };

    // Check all achievements retroactively
    const now = new Date().toISOString();
    const newUnlocked = {};
    const newAchievements = [];

    for (const achievement of achievements) {
      // Skip if already unlocked
      if (existingIds.includes(achievement.id)) {
        continue;
      }

      try {
        if (achievement.retroactiveCheck(context)) {
          newUnlocked[achievement.id] = {
            unlockedAt: now,
            retroactive: true,
          };
          newAchievements.push(achievement);
        }
      } catch (error) {
        console.error(`Error checking retroactive achievement ${achievement.id}:`, error);
      }
    }

    // Save updated state
    const updatedState = {
      ...lcState,
      achievements: {
        unlocked: {
          ...existingAchievements,
          ...newUnlocked,
        },
        hasSeenAchievementsIntro: false,
      },
    };

    localStorage.setItem('lcState', JSON.stringify(updatedState));
    localStorage.setItem(MIGRATION_KEY, 'true');

    console.log(`Achievement migration complete: unlocked ${newAchievements.length} retroactive achievements`);

    return {
      migrated: true,
      newAchievements,
    };
  } catch (error) {
    console.error('Achievement migration failed:', error);
    localStorage.setItem(MIGRATION_KEY, 'true'); // Don't retry on error
    return null;
  }
};

/**
 * Check if migration has run
 * @returns {boolean}
 */
export const hasMigrationRun = () => {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem(MIGRATION_KEY) === 'true';
};

/**
 * Reset migration flag (for testing)
 */
export const resetMigration = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(MIGRATION_KEY);
};
