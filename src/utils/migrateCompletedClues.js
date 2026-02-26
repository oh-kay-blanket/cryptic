/**
 * One-time migration to backfill difficulty data for completed clues.
 * Cross-references completed clues with clues data to add missing difficulty field.
 */

const MIGRATION_KEY = 'lcMigration_difficulty_v1';

export const migrateCompletedCluesDifficulty = (cluesData) => {
  // Check if migration already ran
  if (typeof window === 'undefined') return false;
  if (localStorage.getItem(MIGRATION_KEY)) return false;

  // Get current state
  const storedState = localStorage.getItem('lcState');
  if (!storedState) {
    // No state to migrate, mark as done
    localStorage.setItem(MIGRATION_KEY, 'true');
    return false;
  }

  try {
    const lcState = JSON.parse(storedState);
    const completedClues = lcState.completedClues || [];

    // Check if any clues need migration (missing difficulty)
    const needsMigration = completedClues.some((c) => c.difficulty == null);
    if (!needsMigration) {
      localStorage.setItem(MIGRATION_KEY, 'true');
      return false;
    }

    // Create a lookup map from clues data
    const cluesMap = {};
    cluesData.forEach((clue) => {
      cluesMap[clue.clid] = clue;
    });

    // Update completed clues with difficulty
    let migratedCount = 0;
    const updatedCompletedClues = completedClues.map((completed) => {
      if (completed.difficulty != null) {
        return completed; // Already has difficulty
      }

      const clueData = cluesMap[completed.clid];
      if (clueData && clueData.difficulty != null) {
        migratedCount++;
        return {
          ...completed,
          difficulty: clueData.difficulty,
        };
      }

      return completed; // Clue not found in data, leave as-is
    });

    // Save updated state
    const updatedState = {
      ...lcState,
      completedClues: updatedCompletedClues,
    };
    localStorage.setItem('lcState', JSON.stringify(updatedState));
    localStorage.setItem(MIGRATION_KEY, 'true');

    console.log(`Migration complete: updated ${migratedCount} clues with difficulty data`);
    return true;
  } catch (error) {
    console.error('Migration failed:', error);
    return false;
  }
};
