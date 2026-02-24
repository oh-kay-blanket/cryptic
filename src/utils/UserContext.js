import React, { createContext, useState, useEffect, useMemo } from "react";
import { isSameDay, shouldResetStreak } from "./dateHelpers";

export const UserContext = createContext({
  completedClues: [],
  showType: true,
  typeViewed: [],
  returnLearn: false,
});

export const UserProvider = ({ children }) => {
  const [returnLearn, setReturnLearn] = useState(false);
  const [currentStats, setCurrentStats] = useState(null); // { hints: 0, guesses: 0 } when on clue page

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
      typeViewed: [],
      streak: 0,
      longestStreak: 0,
      lastSolved: "",
      darkMode: null, // null = system preference, true = dark, false = light
    };
  });

  // Variables
  let completedClues = lcState.completedClues;
  let showType = lcState.showType;
  let typeViewed = lcState.typeViewed;
  let streak = lcState.streak;
  let longestStreak = lcState.longestStreak;
  let darkMode = lcState.darkMode;

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

  // Functions
  const addCompletedClue = (activeClue, stats, type) => {
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
      const newState = {
        ...lcState,
        streak: streak,
        longestStreak: longestStreak,
        completedClues: [
          ...lcState.completedClues,
          {
            clid: activeClue.clid,
            guesses: guesses,
            hints: hints,
            how: type,
          },
        ],
      };

      // Only update lastSolved if this is today's clue
      if (isToday) {
        newState.lastSolved = activeClue.release;
      }

      setLcState(newState);
    } else {
      console.log("clue locked, no update to stats");
    }

    // GA event - only track daily clue completions
    if (isToday && typeof window.gtag !== "undefined") {
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
      });
    }
  };

  // Whether or not to show type pills in clue container
  const setShowType = (newType) => {
    setLcState({
      ...lcState,
      showType: newType,
    });
  };

  // List of types viewed in Learn module
  const setTypeViewed = (newType) => {
    setLcState({
      ...lcState,
      typeViewed: [...lcState.typeViewed, newType],
    });
  };

  // Dark mode setting
  const setDarkMode = (newMode) => {
    setLcState({
      ...lcState,
      darkMode: newMode,
    });
  };

  const contextValue = useMemo(
    () => ({
      completedClues,
      addCompletedClue,
      streak,
      longestStreak,
      showType,
      setShowType,
      typeViewed,
      setTypeViewed,
      returnLearn,
      setReturnLearn,
      darkMode,
      setDarkMode,
      currentStats,
      setCurrentStats,
    }),
    [
      completedClues,
      streak,
      longestStreak,
      showType,
      typeViewed,
      returnLearn,
      darkMode,
      currentStats,
    ],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
