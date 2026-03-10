import { supabase, isSupabaseConfigured } from './supabase';
import { recalculateStreakFromClues } from './dateHelpers';

/**
 * Transform localStorage state to Supabase format
 */
export const localToCloud = {
  // Transform user profile data
  profile: (lcState, userId) => ({
    id: userId,
    show_type: lcState.showType ?? true,
    dark_mode: lcState.darkMode ?? null,
    has_seen_onboarding: lcState.hasSeenOnboarding ?? false,
    has_seen_onboarding_prompt: lcState.hasSeenOnboardingPrompt ?? false,
    has_completed_first_clue: lcState.hasCompletedFirstClue ?? false,
    streak: lcState.streak ?? 0,
    longest_streak: lcState.longestStreak ?? 0,
    last_solved: lcState.lastSolved || null,
    has_seen_achievements_intro: lcState.achievements?.hasSeenAchievementsIntro ?? false,
  }),

  // Transform completed clues array
  completedClues: (completedClues, userId) =>
    completedClues.map((clue) => ({
      user_id: userId,
      clid: clue.clid,
      guesses: clue.guesses ?? 0,
      hints: clue.hints ?? 0,
      how: clue.how ?? 'g',
      difficulty: clue.difficulty ?? null,
      completed_at: clue.completedAt ?? new Date().toISOString(),
      solve_time: clue.solveTime ?? null,
    })),

  // Transform achievements
  achievements: (achievements, userId) => {
    if (!achievements?.unlocked) return [];
    return Object.entries(achievements.unlocked).map(([achievementId, data]) => ({
      user_id: userId,
      achievement_id: achievementId,
      unlocked_at: data.unlockedAt ?? new Date().toISOString(),
      seen_at: data.seenAt ?? null,
    }));
  },
};

/**
 * Transform Supabase data to localStorage format
 */
export const cloudToLocal = {
  // Transform profile to localStorage state shape
  profile: (profile) => ({
    showType: profile.show_type ?? true,
    darkMode: profile.dark_mode ?? null,
    hasSeenOnboarding: profile.has_seen_onboarding ?? false,
    hasSeenOnboardingPrompt: profile.has_seen_onboarding_prompt ?? false,
    hasCompletedFirstClue: profile.has_completed_first_clue ?? false,
    streak: profile.streak ?? 0,
    longestStreak: profile.longest_streak ?? 0,
    lastSolved: profile.last_solved || '',
  }),

  // Transform completed clues from database
  completedClues: (clues) =>
    clues.map((clue) => ({
      clid: clue.clid,
      guesses: clue.guesses ?? 0,
      hints: clue.hints ?? 0,
      how: clue.how ?? 'g',
      difficulty: clue.difficulty ?? null,
      completedAt: clue.completed_at ?? null,
      solveTime: clue.solve_time ?? null,
    })),

  // Transform achievements from database
  achievements: (achievements, hasSeenIntro) => ({
    hasSeenAchievementsIntro: hasSeenIntro ?? false,
    unlocked: achievements.reduce((acc, a) => {
      acc[a.achievement_id] = {
        unlockedAt: a.unlocked_at,
        seenAt: a.seen_at,
      };
      return acc;
    }, {}),
  }),
};

/**
 * Fetch all user data from Supabase
 */
export const fetchCloudData = async (userId) => {
  if (!isSupabaseConfigured() || !userId) {
    return { data: null, error: { message: 'Not configured or not authenticated' } };
  }

  try {
    // Fetch profile
    const { data: profile, error: profileError } = await supabase
      .from('users_profile')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      // PGRST116 = no rows found, which is OK for new users
      throw profileError;
    }

    // Fetch completed clues
    const { data: completedClues, error: cluesError } = await supabase
      .from('completed_clues')
      .select('*')
      .eq('user_id', userId);

    if (cluesError) throw cluesError;

    // Fetch achievements
    const { data: achievements, error: achievementsError } = await supabase
      .from('achievements')
      .select('*')
      .eq('user_id', userId);

    if (achievementsError) throw achievementsError;

    return {
      data: {
        profile: profile || null,
        completedClues: completedClues || [],
        achievements: achievements || [],
      },
      error: null,
    };
  } catch (error) {
    console.error('Error fetching cloud data:', error);
    return { data: null, error };
  }
};

/**
 * Upload local data to cloud (for new accounts or migration)
 */
export const uploadLocalData = async (userId, lcState) => {
  if (!isSupabaseConfigured() || !userId) {
    return { error: { message: 'Not configured or not authenticated' } };
  }

  try {
    // Upsert profile
    const profileData = localToCloud.profile(lcState, userId);
    const { error: profileError } = await supabase
      .from('users_profile')
      .upsert(profileData, { onConflict: 'id' });

    if (profileError) throw profileError;

    // Upsert completed clues (use clid + user_id as unique key)
    if (lcState.completedClues?.length > 0) {
      const cluesData = localToCloud.completedClues(lcState.completedClues, userId);
      const { error: cluesError } = await supabase
        .from('completed_clues')
        .upsert(cluesData, { onConflict: 'user_id,clid' });

      if (cluesError) throw cluesError;
    }

    // Upsert achievements
    if (lcState.achievements?.unlocked && Object.keys(lcState.achievements.unlocked).length > 0) {
      const achievementsData = localToCloud.achievements(lcState.achievements, userId);
      const { error: achievementsError } = await supabase
        .from('achievements')
        .upsert(achievementsData, { onConflict: 'user_id,achievement_id' });

      if (achievementsError) throw achievementsError;
    }

    return { error: null };
  } catch (error) {
    console.error('Error uploading local data:', error);
    return { error };
  }
};

/**
 * Merge local and cloud data
 * Strategy: Cloud is authoritative for preferences, but we take the best of both for progress data
 */
export const mergeData = (localState, cloudData) => {
  const { profile, completedClues: cloudClues, achievements: cloudAchievements } = cloudData;

  // Start with cloud profile data for preferences
  const cloudProfile = profile ? cloudToLocal.profile(profile) : null;

  // For progress data (streak, longestStreak, lastSolved), take the best of both
  const localLastSolved = localState.lastSolved ? new Date(localState.lastSolved) : null;
  const cloudLastSolved = cloudProfile?.lastSolved ? new Date(cloudProfile.lastSolved) : null;

  // Use the more recent lastSolved date
  let bestLastSolved = '';
  if (localLastSolved && cloudLastSolved) {
    bestLastSolved = localLastSolved > cloudLastSolved ? localState.lastSolved : cloudProfile.lastSolved;
  } else {
    bestLastSolved = localState.lastSolved || cloudProfile?.lastSolved || '';
  }

  // Use the higher streak (if lastSolved matches, otherwise use the one with more recent lastSolved)
  let bestStreak = 0;
  const localStreak = localState.streak ?? 0;
  const cloudStreak = cloudProfile?.streak ?? 0;
  if (localLastSolved && cloudLastSolved) {
    bestStreak = localLastSolved > cloudLastSolved ? localStreak : cloudStreak;
  } else if (localLastSolved) {
    bestStreak = localStreak;
  } else if (cloudLastSolved) {
    bestStreak = cloudStreak;
  } else {
    bestStreak = Math.max(localStreak, cloudStreak);
  }

  // Always take the higher longestStreak
  const bestLongestStreak = Math.max(
    localState.longestStreak ?? 0,
    cloudProfile?.longestStreak ?? 0
  );

  const mergedState = {
    // Preferences: cloud is authoritative, fall back to local
    showType: cloudProfile?.showType ?? localState.showType ?? true,
    darkMode: cloudProfile?.darkMode ?? localState.darkMode ?? null,
    hasSeenOnboarding: cloudProfile?.hasSeenOnboarding ?? localState.hasSeenOnboarding ?? false,
    hasSeenOnboardingPrompt: cloudProfile?.hasSeenOnboardingPrompt ?? localState.hasSeenOnboardingPrompt ?? false,
    hasCompletedFirstClue: cloudProfile?.hasCompletedFirstClue ?? localState.hasCompletedFirstClue ?? false,
    // Progress: best of both
    streak: bestStreak,
    longestStreak: bestLongestStreak,
    lastSolved: bestLastSolved,
  };

  // Merge completed clues - cloud is authoritative, but add any local-only clues
  const cloudClueIds = new Set(cloudClues.map((c) => c.clid));
  const localOnlyClues = (localState.completedClues || []).filter(
    (c) => !cloudClueIds.has(c.clid)
  );
  const mergedClues = [
    ...cloudToLocal.completedClues(cloudClues),
    ...localOnlyClues,
  ];

  // Recalculate streak from merged clues as a recovery mechanism
  // This catches cases where profile data got out of sync with actual completions
  const recalculated = recalculateStreakFromClues(mergedClues);

  // Use the better of computed best values vs recalculated values
  const finalStreak = Math.max(mergedState.streak, recalculated.streak);
  const finalLongestStreak = Math.max(mergedState.longestStreak, recalculated.longestStreak);

  // For lastSolved, prefer the more recent date
  let finalLastSolved = mergedState.lastSolved;
  if (recalculated.lastSolved) {
    const mergedDate = mergedState.lastSolved ? new Date(mergedState.lastSolved) : null;
    const recalcDate = new Date(recalculated.lastSolved);
    if (!mergedDate || recalcDate > mergedDate) {
      finalLastSolved = recalculated.lastSolved;
    }
  }

  // Update merged state with final values
  mergedState.streak = finalStreak;
  mergedState.longestStreak = finalLongestStreak;
  mergedState.lastSolved = finalLastSolved;

  // Merge achievements - union of cloud and local
  const cloudAchievementsFormatted = cloudToLocal.achievements(
    cloudAchievements,
    profile?.has_seen_achievements_intro ?? localState.achievements?.hasSeenAchievementsIntro
  );
  const localUnlocked = localState.achievements?.unlocked || {};
  const mergedAchievements = {
    hasSeenAchievementsIntro:
      cloudAchievementsFormatted.hasSeenAchievementsIntro ||
      (localState.achievements?.hasSeenAchievementsIntro ?? false),
    unlocked: {
      ...localUnlocked,
      ...cloudAchievementsFormatted.unlocked, // Cloud takes precedence
    },
  };

  return {
    ...mergedState,
    completedClues: mergedClues,
    achievements: mergedAchievements,
  };
};

/**
 * Check if local data has clues not in cloud
 */
export const hasLocalOnlyData = (localState, cloudData) => {
  if (!cloudData) return localState.completedClues?.length > 0;

  const cloudClueIds = new Set(cloudData.completedClues.map((c) => c.clid));
  const localOnlyClues = (localState.completedClues || []).filter(
    (c) => !cloudClueIds.has(c.clid)
  );

  return localOnlyClues.length > 0;
};

/**
 * Sync a single completed clue to cloud
 */
export const syncCompletedClue = async (userId, clue) => {
  if (!isSupabaseConfigured() || !userId) {
    return { error: { message: 'Not configured or not authenticated' } };
  }

  try {
    const clueData = {
      user_id: userId,
      clid: clue.clid,
      guesses: clue.guesses ?? 0,
      hints: clue.hints ?? 0,
      how: clue.how ?? 'g',
      difficulty: clue.difficulty ?? null,
      completed_at: clue.completedAt ?? new Date().toISOString(),
      solve_time: clue.solveTime ?? null,
    };

    const { error } = await supabase
      .from('completed_clues')
      .upsert(clueData, { onConflict: 'user_id,clid' });

    if (error) throw error;

    return { error: null };
  } catch (error) {
    console.error('Error syncing completed clue:', error);
    return { error };
  }
};

/**
 * Delete a completed clue from cloud
 */
export const deleteCompletedClue = async (userId, clid) => {
  if (!isSupabaseConfigured() || !userId) {
    return { error: { message: 'Not configured or not authenticated' } };
  }

  try {
    const { error } = await supabase
      .from('completed_clues')
      .delete()
      .eq('user_id', userId)
      .eq('clid', clid);

    if (error) throw error;

    return { error: null };
  } catch (error) {
    console.error('Error deleting completed clue:', error);
    return { error };
  }
};

/**
 * Sync profile data to cloud
 */
export const syncProfile = async (userId, lcState) => {
  if (!isSupabaseConfigured() || !userId) {
    return { error: { message: 'Not configured or not authenticated' } };
  }

  try {
    const profileData = localToCloud.profile(lcState, userId);
    const { error } = await supabase
      .from('users_profile')
      .upsert(profileData, { onConflict: 'id' });

    if (error) throw error;

    return { error: null };
  } catch (error) {
    console.error('Error syncing profile:', error);
    return { error };
  }
};

/**
 * Sync a single achievement to cloud
 */
export const syncAchievement = async (userId, achievementId, data) => {
  if (!isSupabaseConfigured() || !userId) {
    return { error: { message: 'Not configured or not authenticated' } };
  }

  try {
    const achievementData = {
      user_id: userId,
      achievement_id: achievementId,
      unlocked_at: data.unlockedAt ?? new Date().toISOString(),
      seen_at: data.seenAt ?? null,
    };

    const { error } = await supabase
      .from('achievements')
      .upsert(achievementData, { onConflict: 'user_id,achievement_id' });

    if (error) throw error;

    return { error: null };
  } catch (error) {
    console.error('Error syncing achievement:', error);
    return { error };
  }
};
