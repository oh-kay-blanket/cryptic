import React, { createContext, useState, useEffect, useMemo, useCallback, useContext, useRef } from "react";
import { isSameDay, shouldResetStreak, recalculateStreakFromClues } from "./dateHelpers";
import { checkNewAchievements, formatUnlockedAchievements } from "./achievements";
import { AuthContext } from "./AuthContext";
import {
  fetchCloudData,
  uploadLocalData,
  mergeData,
  hasLocalOnlyData,
  syncCompletedClue,
  syncProfile,
  syncAchievement,
  deleteCompletedClue,
} from "./syncService";
import {
  OperationType,
  processQueue,
  setupOfflineListeners,
  isOnline,
  enqueue,
} from "./offlineQueue";

export const UserContext = createContext({
  completedClues: [],
  showType: true,
  returnLearn: false,
  achievements: { unlocked: {}, hasSeenAchievementsIntro: false },
  newlyUnlockedAchievements: [],
});

export const UserProvider = ({ children }) => {
  const { user, isAuthenticated, loading: authLoading } = useContext(AuthContext);
  const [returnLearn, setReturnLearn] = useState(false);
  const [currentStats, setCurrentStats] = useState(null); // { hints: 0, guesses: 0 } when on clue page
  const [clueStartTime, setClueStartTime] = useState(null); // timestamp when clue was started
  const [clueSolvedTime, setClueSolvedTime] = useState(null); // final solve time in seconds when clue is completed
  const [triggerOnboarding, setTriggerOnboarding] = useState(false); // trigger to start tutorial from anywhere
  const [timerPaused, setTimerPaused] = useState(false); // pause timer during onboarding
  const [newlyUnlockedAchievements, setNewlyUnlockedAchievements] = useState([]); // achievements unlocked in current session
  const [cluesDataRef, setCluesDataRef] = useState(null); // clues data for achievement type checking
  const [openStatsWithTab, setOpenStatsWithTab] = useState(null); // 'stats' | 'achievements' | null - triggers stats modal opening
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle' | 'syncing' | 'synced' | 'error'
  const [showMergePrompt, setShowMergePrompt] = useState(false);
  const [pendingMergeData, setPendingMergeData] = useState(null);
  const lastSyncedUserId = useRef(null);
  const hasCheckedComboAchievement = useRef(false);

  // manage lcState
  const [lcState, setLcState] = useState(() => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("lcState");
      if (storedState) {
        return JSON.parse(storedState);
      }
    }
    return {
      completedClues: [],
      showType: true,
      streak: 0,
      longestStreak: 0,
      lastSolved: "",
      darkMode: null, // null = system preference, true = dark, false = light
      hasSeenOnboarding: false,
      hasSeenOnboardingPrompt: false,
      hasCompletedFirstClue: false,
      hasSeenSyncAnnouncement: false,
      achievements: { unlocked: {}, hasSeenAchievementsIntro: false },
    };
  });

  // Variables
  let completedClues = lcState.completedClues;
  let showType = lcState.showType;
  let streak = lcState.streak;
  let longestStreak = lcState.longestStreak;
  let darkMode = lcState.darkMode;
  let hasSeenOnboarding = lcState.hasSeenOnboarding;
  let hasSeenOnboardingPrompt = lcState.hasSeenOnboardingPrompt;
  let hasCompletedFirstClue = lcState.hasCompletedFirstClue;
  let hasSeenSyncAnnouncement = lcState.hasSeenSyncAnnouncement;
  let achievements = lcState.achievements || { unlocked: {}, hasSeenAchievementsIntro: false };

  // Sync handlers for offline queue
  const syncHandlers = useMemo(() => ({
    syncClue: syncCompletedClue,
    syncProfile: syncProfile,
    syncAchievement: syncAchievement,
    deleteClue: deleteCompletedClue,
  }), []);

  // Retroactive check for combo achievement (clues with multiple types)
  // This runs atomically inside setLcState to avoid race conditions
  useEffect(() => {
    if (!cluesDataRef || hasCheckedComboAchievement.current) return;
    hasCheckedComboAchievement.current = true;

    setLcState((prevState) => {
      const completedClues = prevState.completedClues || [];
      const existingAchievements = prevState.achievements?.unlocked || {};

      // Skip if already has combo achievement
      if (existingAchievements['type-combination']) {
        return prevState;
      }

      // Check if user has completed any clue with multiple types
      const hasCompletedCombo = completedClues.some((completed) => {
        const clue = cluesDataRef.find((c) => c.clid === completed.clid);
        return clue?.type?.includes(',');
      });

      if (!hasCompletedCombo) {
        return prevState;
      }

      // Unlock the combo achievement atomically
      console.log('Retroactively unlocking combo achievement');
      return {
        ...prevState,
        achievements: {
          ...prevState.achievements,
          unlocked: {
            ...existingAchievements,
            'type-combination': {
              unlockedAt: new Date().toISOString(),
              retroactive: true,
            },
          },
        },
      };
    });
  }, [cluesDataRef]);

  // Process offline queue when coming back online
  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;

    const handleOnline = async () => {
      const { processed, failed } = await processQueue(syncHandlers, user.id);
      if (processed > 0) {
        console.log(`Processed ${processed} queued operations`);
      }
      if (failed > 0) {
        console.warn(`${failed} operations failed and remain queued`);
      }
    };

    const cleanup = setupOfflineListeners(handleOnline, null);
    return cleanup;
  }, [isAuthenticated, user?.id, syncHandlers]);

  // Sync with cloud when user authenticates
  useEffect(() => {
    if (authLoading) return;

    const syncWithCloud = async () => {
      if (!isAuthenticated || !user?.id) {
        lastSyncedUserId.current = null;
        return;
      }

      // Don't re-sync if we've already synced for this user
      if (lastSyncedUserId.current === user.id) return;

      setSyncStatus('syncing');

      try {
        // Fetch cloud data
        const { data: cloudData, error: fetchError } = await fetchCloudData(user.id);

        if (fetchError) {
          console.error('Error fetching cloud data:', fetchError);
          setSyncStatus('error');
          return;
        }

        // If user has no cloud data, upload local data
        if (!cloudData?.profile && !cloudData?.completedClues?.length) {
          // New account - upload local data to cloud
          if (lcState.completedClues?.length > 0 || Object.keys(lcState.achievements?.unlocked || {}).length > 0) {
            const { error: uploadError } = await uploadLocalData(user.id, lcState);
            if (uploadError) {
              console.error('Error uploading local data:', uploadError);
              setSyncStatus('error');
              return;
            }
          }
          lastSyncedUserId.current = user.id;
          setSyncStatus('synced');
          return;
        }

        // Check if local data has clues not in cloud
        if (hasLocalOnlyData(lcState, cloudData)) {
          // Prompt user to merge
          setPendingMergeData(cloudData);
          setShowMergePrompt(true);
        } else {
          // No local-only data, just use cloud data
          const mergedState = mergeData(lcState, cloudData);
          setLcState((prevState) => ({
            ...prevState,
            ...mergedState,
          }));
        }

        lastSyncedUserId.current = user.id;
        setSyncStatus('synced');
      } catch (error) {
        console.error('Sync error:', error);
        setSyncStatus('error');
      }
    };

    syncWithCloud();
  }, [isAuthenticated, user?.id, authLoading]);

  // Handle merge prompt response
  const handleMergeDecision = useCallback(async (shouldMerge) => {
    if (!user?.id || !pendingMergeData) return;

    setShowMergePrompt(false);

    if (shouldMerge) {
      // Merge local data with cloud
      const mergedState = mergeData(lcState, pendingMergeData);
      setLcState((prevState) => ({
        ...prevState,
        ...mergedState,
      }));

      // Upload merged data to cloud
      const mergedLcState = { ...lcState, ...mergedState };
      await uploadLocalData(user.id, mergedLcState);
    } else {
      // Discard local data, use cloud only
      const cloudState = mergeData({
        completedClues: [],
        achievements: { unlocked: {} },
      }, pendingMergeData);
      setLcState((prevState) => ({
        ...prevState,
        ...cloudState,
      }));
    }

    setPendingMergeData(null);
  }, [user?.id, pendingMergeData, lcState]);

  // Listen for localStorage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "lcState" && e.newValue) {
        try {
          const newState = JSON.parse(e.newValue);
          setLcState(newState);
        } catch (error) {
          console.error("Failed to parse localStorage data:", error);
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, []);

  // Save to localStorage whenever lcState changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lcState", JSON.stringify(lcState));
    }
  }, [lcState]);

  useEffect(() => {
    const checkStreak = () => {
      console.log("lastSolved", lcState.lastSolved);
      console.log("streak", lcState.streak);

      if (shouldResetStreak(lcState.lastSolved, lcState.streak)) {
        console.log(
          "streak broken, resetting - more than 1 day since last solve",
        );
        setLcState((prevState) => ({
          ...prevState,
          streak: 0,
        }));
      } else {
        console.log("streak intact, retaining");
      }
    };

    checkStreak();
  }, [lcState.lastSolved, lcState.streak]); // Only depend on the specific values that matter

  // Dark mode effect
  useEffect(() => {
    const applyDarkMode = () => {
      let shouldUseDark = false;

      if (darkMode === null) {
        // Use system preference
        shouldUseDark =
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
      } else {
        // Use user preference
        shouldUseDark = darkMode;
      }

      if (shouldUseDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    if (typeof window !== "undefined") {
      applyDarkMode();

      // Listen for system theme changes when using system preference
      if (darkMode === null) {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => applyDarkMode();
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, [darkMode]);

  // Sync completed clue to cloud (background, non-blocking)
  const syncClueToCloud = useCallback(async (clue) => {
    if (!isAuthenticated || !user?.id) return;

    if (isOnline()) {
      const { error } = await syncCompletedClue(user.id, clue);
      if (error) {
        enqueue({ type: OperationType.SYNC_CLUE, data: clue, userId: user.id });
      }
    } else {
      enqueue({ type: OperationType.SYNC_CLUE, data: clue, userId: user.id });
    }
  }, [isAuthenticated, user?.id]);

  // Sync profile to cloud (background, non-blocking)
  const syncProfileToCloud = useCallback(async (state) => {
    if (!isAuthenticated || !user?.id) return;

    if (isOnline()) {
      const { error } = await syncProfile(user.id, state);
      if (error) {
        enqueue({ type: OperationType.SYNC_PROFILE, data: state, userId: user.id });
      }
    } else {
      enqueue({ type: OperationType.SYNC_PROFILE, data: state, userId: user.id });
    }
  }, [isAuthenticated, user?.id]);

  // Functions
  const addCompletedClue = (activeClue, stats, type, solveTime = null) => {
    const guesses = type === "g" ? stats.guesses + 1 : stats.guesses;
    const hints = type === "h" ? stats.hints + 1 : stats.hints;
    const repeat = completedClues.find(
      (completed) => completed.clid === activeClue.clid,
    );
    const knownUser = completedClues && completedClues.length > 0;
    let streak = lcState.streak == null ? 0 : lcState.streak;
    let longestStreak =
      lcState.longestStreak == null ? 0 : lcState.longestStreak;

    const isToday = isSameDay(activeClue.release, new Date());
    if (isToday) {
      streak++;
    }

    // Update longest streak if current streak is longer
    if (streak > longestStreak) {
      longestStreak = streak;
    }

    // Only update if not already in completedClues
    if (!repeat) {
      const completedClueEntry = {
        clid: activeClue.clid,
        guesses: guesses,
        hints: hints,
        how: type,
        difficulty: activeClue.difficulty,
        completedAt: new Date().toISOString(),
        release: activeClue.release,
      };

      // Only add solveTime if provided
      if (solveTime != null) {
        completedClueEntry.solveTime = solveTime;
      }

      // Build new completed clues array
      const newCompletedClues = [...lcState.completedClues, completedClueEntry];

      // Check for newly unlocked achievements
      const achievementContext = {
        completedClues: newCompletedClues,
        streak: streak,
        longestStreak: longestStreak,
        achievements: lcState.achievements || { unlocked: {} },
      };

      const newAchievements = checkNewAchievements(
        achievementContext,
        completedClueEntry,
        cluesDataRef
      );

      // Format achievements for storage
      const formattedAchievements = formatUnlockedAchievements(newAchievements);

      const newState = {
        ...lcState,
        streak: streak,
        longestStreak: longestStreak,
        completedClues: newCompletedClues,
        achievements: {
          ...lcState.achievements,
          unlocked: {
            ...(lcState.achievements?.unlocked || {}),
            ...formattedAchievements,
          },
        },
      };

      // Only update lastSolved if this is today's clue
      if (isToday) {
        newState.lastSolved = activeClue.release;
      }

      setLcState(newState);

      // Sync to cloud in background
      syncClueToCloud(completedClueEntry);

      // Sync profile (for streak updates)
      syncProfileToCloud(newState);

      // Sync new achievements
      if (newAchievements.length > 0) {
        newAchievements.forEach((achievement) => {
          if (isAuthenticated && user?.id) {
            const achievementData = formattedAchievements[achievement.id];
            if (isOnline()) {
              syncAchievement(user.id, achievement.id, achievementData);
            } else {
              enqueue({
                type: OperationType.SYNC_ACHIEVEMENT,
                data: { achievementId: achievement.id, ...achievementData },
                userId: user.id,
              });
            }
          }
        });
      }

      // Set newly unlocked achievements for display
      if (newAchievements.length > 0) {
        setNewlyUnlockedAchievements(newAchievements);
      }

      // GA event - only track daily clue completions (new completions only)
      if (isToday && typeof window.gtag !== "undefined") {
        // Calculate average solve time from clues that have solveTime
        const cluesWithTime = completedClues.filter((c) => c.solveTime != null);
        const avgSolveTime =
          cluesWithTime.length > 0
            ? Math.round(
                cluesWithTime.reduce((sum, c) => sum + c.solveTime, 0) /
                  cluesWithTime.length,
              )
            : null;

        window.gtag("event", "completed_daily_clue", {
          clid: activeClue.clid,
          release: activeClue.release,
          difficulty: activeClue.difficulty,
          hints: hints,
          guesses: guesses,
          how: type,
          dow: activeClue.dow,
          streak: streak,
          total_completed: knownUser && completedClues.length + 1,
          repeat: !!repeat,
          known_user: knownUser,
          avg_guesses: (
            completedClues.reduce((sum, item) => sum + item.guesses, 0) /
            completedClues.length
          ).toFixed(1),
          avg_hints: (
            completedClues.reduce((sum, item) => sum + item.hints, 0) /
            completedClues.length
          ).toFixed(1),
          clue_complete_count: 1,
          solve_time_seconds: solveTime,
          avg_solve_time: avgSolveTime,
        });
      }

      // Return newly unlocked achievements so caller can use them
      return newAchievements;
    } else {
      console.log("clue locked, no update to stats");
      return [];
    }
  };

  // Whether or not to show type pills in clue container
  const setShowType = (newType) => {
    const newState = {
      ...lcState,
      showType: newType,
    };
    setLcState(newState);
    syncProfileToCloud(newState);
  };

  // Dark mode setting
  const setDarkMode = (newMode) => {
    const newState = {
      ...lcState,
      darkMode: newMode,
    };
    setLcState(newState);
    syncProfileToCloud(newState);
  };

  // Onboarding state
  const setHasSeenOnboarding = (value) => {
    const newState = {
      ...lcState,
      hasSeenOnboarding: value,
    };
    setLcState(newState);
    syncProfileToCloud(newState);
  };

  const setHasSeenOnboardingPrompt = (value) => {
    const newState = {
      ...lcState,
      hasSeenOnboardingPrompt: value,
    };
    setLcState(newState);
    syncProfileToCloud(newState);
  };

  const setHasCompletedFirstClue = (value) => {
    const newState = {
      ...lcState,
      hasCompletedFirstClue: value,
    };
    setLcState(newState);
    syncProfileToCloud(newState);
  };

  const setHasSeenSyncAnnouncement = (value) => {
    const newState = {
      ...lcState,
      hasSeenSyncAnnouncement: value,
    };
    setLcState(newState);
    // No need to sync to cloud - this is a local-only flag
  };

  // Refresh state from localStorage (used after migrations)
  const refreshFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("lcState");
      if (storedState) {
        setLcState(JSON.parse(storedState));
      }
    }
  };

  // Recalculate streak from completed clues (recovery mechanism)
  const recalculateStreak = useCallback(() => {
    const recalculated = recalculateStreakFromClues(lcState.completedClues);

    const newState = {
      ...lcState,
      streak: Math.max(lcState.streak, recalculated.streak),
      longestStreak: Math.max(lcState.longestStreak, recalculated.longestStreak),
    };

    // Update lastSolved if recalculated is more recent
    if (recalculated.lastSolved) {
      const currentDate = lcState.lastSolved ? new Date(lcState.lastSolved) : null;
      const recalcDate = new Date(recalculated.lastSolved);
      if (!currentDate || recalcDate > currentDate) {
        newState.lastSolved = recalculated.lastSolved;
      }
    }

    setLcState(newState);
    syncProfileToCloud(newState);

    return recalculated;
  }, [lcState, syncProfileToCloud]);

  // Remove a completed clue (for re-solving)
  const removeCompletedClue = useCallback((clid) => {
    setLcState((prevState) => {
      const newCompletedClues = (prevState.completedClues || []).filter(
        (c) => c.clid !== clid
      );

      // Recalculate streak from remaining clues
      const recalculated = recalculateStreakFromClues(newCompletedClues);

      const newState = {
        ...prevState,
        completedClues: newCompletedClues,
        streak: recalculated.streak,
        longestStreak: Math.max(prevState.longestStreak, recalculated.longestStreak),
        lastSolved: recalculated.lastSolved || '',
      };

      // Sync deletion to cloud (fire-and-forget)
      if (isAuthenticated && user?.id) {
        if (isOnline()) {
          deleteCompletedClue(user.id, clid).then(({ error }) => {
            if (error) {
              enqueue({ type: OperationType.DELETE_CLUE, data: { clid }, userId: user.id });
            }
          });
        } else {
          enqueue({ type: OperationType.DELETE_CLUE, data: { clid }, userId: user.id });
        }
        // Sync updated profile
        syncProfileToCloud(newState);
      }

      return newState;
    });
  }, [isAuthenticated, user?.id, syncProfileToCloud]);

  // Achievement functions
  const setHasSeenAchievementsIntro = useCallback((value) => {
    setLcState((prevState) => {
      const newState = {
        ...prevState,
        achievements: {
          ...prevState.achievements,
          hasSeenAchievementsIntro: value,
        },
      };
      // Note: We don't sync this immediately as it's a minor UI state
      return newState;
    });
  }, []);

  // Clear newly unlocked achievements (after displaying them)
  const clearNewlyUnlockedAchievements = useCallback(() => {
    setNewlyUnlockedAchievements([]);
  }, []);

  // Mark achievements as seen
  const markAchievementsSeen = useCallback((achievementIds) => {
    const now = new Date().toISOString();
    setLcState((prevState) => {
      const updatedUnlocked = { ...prevState.achievements?.unlocked };
      achievementIds.forEach((id) => {
        if (updatedUnlocked[id]) {
          updatedUnlocked[id] = {
            ...updatedUnlocked[id],
            seenAt: now,
          };
          // Sync achievement seen state
          if (isAuthenticated && user?.id) {
            syncAchievement(user.id, id, updatedUnlocked[id]);
          }
        }
      });
      return {
        ...prevState,
        achievements: {
          ...prevState.achievements,
          unlocked: updatedUnlocked,
        },
      };
    });
  }, [isAuthenticated, user?.id]);

  const contextValue = useMemo(
    () => ({
      completedClues,
      addCompletedClue,
      removeCompletedClue,
      streak,
      longestStreak,
      showType,
      setShowType,
      returnLearn,
      setReturnLearn,
      darkMode,
      setDarkMode,
      currentStats,
      setCurrentStats,
      clueStartTime,
      setClueStartTime,
      clueSolvedTime,
      setClueSolvedTime,
      refreshFromStorage,
      recalculateStreak,
      hasSeenOnboarding,
      setHasSeenOnboarding,
      hasSeenOnboardingPrompt,
      setHasSeenOnboardingPrompt,
      hasCompletedFirstClue,
      setHasCompletedFirstClue,
      hasSeenSyncAnnouncement,
      setHasSeenSyncAnnouncement,
      triggerOnboarding,
      setTriggerOnboarding,
      timerPaused,
      setTimerPaused,
      // Achievements
      achievements,
      newlyUnlockedAchievements,
      clearNewlyUnlockedAchievements,
      setHasSeenAchievementsIntro,
      markAchievementsSeen,
      setCluesDataRef,
      // Stats modal trigger
      openStatsWithTab,
      setOpenStatsWithTab,
      // Sync status
      syncStatus,
      showMergePrompt,
      handleMergeDecision,
    }),
    [
      completedClues,
      removeCompletedClue,
      streak,
      longestStreak,
      showType,
      returnLearn,
      darkMode,
      currentStats,
      clueStartTime,
      clueSolvedTime,
      hasSeenOnboarding,
      hasSeenOnboardingPrompt,
      hasCompletedFirstClue,
      hasSeenSyncAnnouncement,
      triggerOnboarding,
      achievements,
      newlyUnlockedAchievements,
      clearNewlyUnlockedAchievements,
      setHasSeenAchievementsIntro,
      markAchievementsSeen,
      recalculateStreak,
      timerPaused,
      openStatsWithTab,
      syncStatus,
      showMergePrompt,
      handleMergeDecision,
    ],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
