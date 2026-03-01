/**
 * Check for newly unlocked achievements after completing a clue
 */

import { achievements } from './achievementDefinitions';

/**
 * Check which achievements were newly unlocked
 * @param {Object} context - Current user context
 * @param {Object} context.completedClues - Array of completed clues
 * @param {number} context.streak - Current streak
 * @param {number} context.longestStreak - Longest streak
 * @param {Object} context.achievements - Currently unlocked achievements { unlocked: { [id]: { unlockedAt, ... } } }
 * @param {Object} justCompleted - The clue that was just completed (includes hints, guesses, difficulty, solveTime, completedAt)
 * @param {Array} cluesData - All clues data (for type checking)
 * @returns {Array} Array of newly unlocked achievement objects
 */
export const checkNewAchievements = (context, justCompleted, cluesData = []) => {
  const {
    completedClues = [],
    streak = 0,
    longestStreak = 0,
    achievements: userAchievements = { unlocked: {} },
  } = context;

  const unlockedIds = Object.keys(userAchievements.unlocked || {});
  const totalSolved = completedClues.length;

  const newlyUnlocked = [];

  for (const achievement of achievements) {
    // Skip if already unlocked
    if (unlockedIds.includes(achievement.id)) {
      continue;
    }

    // Check if this achievement is now unlocked
    const checkContext = {
      completedClues,
      streak,
      longestStreak,
      totalSolved,
      justCompleted,
      cluesData,
    };

    try {
      if (achievement.check(checkContext)) {
        newlyUnlocked.push(achievement);
      }
    } catch (error) {
      console.error(`Error checking achievement ${achievement.id}:`, error);
    }
  }

  return newlyUnlocked;
};

/**
 * Format newly unlocked achievements for storage
 * @param {Array} newlyUnlocked - Array of achievement objects
 * @returns {Object} Object to merge into achievements.unlocked
 */
export const formatUnlockedAchievements = (newlyUnlocked) => {
  const now = new Date().toISOString();
  const result = {};

  for (const achievement of newlyUnlocked) {
    result[achievement.id] = {
      unlockedAt: now,
    };
  }

  return result;
};
