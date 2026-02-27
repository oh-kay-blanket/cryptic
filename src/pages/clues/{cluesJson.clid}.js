import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { graphql } from "gatsby";
import { UserContext } from "../../utils/UserContext";
import Layout from "../../components/layout";
import Bottom from "../../components/Bottom";
import Tooltip from "../../components/Tooltip";
import HintTooltip from "../../components/HintTooltip";
import OnboardingGuide from "../../components/OnboardingGuide";
import OnboardingPrompt from "../../components/OnboardingPrompt";
import OnboardingFollowUp from "../../components/OnboardingFollowUp";
import prepClue from "../../utils/clue/usePrepClue";
import manageClue from "../../utils/clue/useManageClue";
import handleHint from "../../utils/clue/handleHint";
import highlightLetters from "../../utils/clue/highlightLetters";
import changeColor from "../../utils/clue/changeColor";
import { isTodayClue } from "../../utils/dateHelpers";

// Eye icon components using currentColor to match TopBar icons
const EyeOpenIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-neutral-500 dark:text-neutral-200"
  >
    <g clipPath="url(#clip0_eye_open)">
      <path
        d="M0.833984 10.0002C0.833984 10.0002 4.16732 3.3335 10.0007 3.3335C15.834 3.3335 19.1673 10.0002 19.1673 10.0002C19.1673 10.0002 15.834 16.6668 10.0007 16.6668C4.16732 16.6668 0.833984 10.0002 0.833984 10.0002Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0007 12.5002C11.3814 12.5002 12.5007 11.3809 12.5007 10.0002C12.5007 8.61945 11.3814 7.50016 10.0007 7.50016C8.61994 7.50016 7.50065 8.61945 7.50065 10.0002C7.50065 11.3809 8.61994 12.5002 10.0007 12.5002Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_eye_open">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const HintIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-neutral-600 dark:text-neutral-200"
  >
    <path
      d="M9 18h6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 22h4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EyeClosedIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-neutral-500 dark:text-neutral-200"
  >
    <g clipPath="url(#clip0_eye_closed)">
      <path
        d="M14.9507 14.9502C13.5261 16.036 11.7916 16.6375 10.0007 16.6668C4.16732 16.6668 0.833984 10.0002 0.833984 10.0002C1.87056 8.06841 3.30826 6.38067 5.05065 5.05016M8.25065 3.5335C8.82426 3.39923 9.41154 3.33211 10.0007 3.3335C15.834 3.3335 19.1673 10.0002 19.1673 10.0002C18.6615 10.9465 18.0582 11.8374 17.3673 12.6585M11.7673 11.7668C11.5384 12.0125 11.2624 12.2095 10.9558 12.3461C10.6491 12.4827 10.3181 12.5562 9.98239 12.5621C9.64672 12.5681 9.31329 12.5063 9.00199 12.3806C8.6907 12.2548 8.40792 12.0677 8.17052 11.8303C7.93313 11.5929 7.74598 11.3101 7.62024 10.9988C7.4945 10.6875 7.43276 10.3541 7.43868 10.0184C7.4446 9.68274 7.51807 9.3517 7.65471 9.04504C7.79135 8.73837 7.98836 8.46237 8.23398 8.2335M0.833984 0.833496L19.1673 19.1668"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_eye_closed">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const CluePage = ({ data }) => {
  const dataClue = data.cluesJson;
  const [showDifficultyTooltip, setShowDifficultyTooltip] = useState(false);
  const [revealPopupPosition, setRevealPopupPosition] = useState(null);
  const [hintPosition, setHintPosition] = useState("right"); // "right" or "below"
  const [activeTooltipHint, setActiveTooltipHint] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const [showRevealSolutionConfirm, setShowRevealSolutionConfirm] =
    useState(false);
  const [revealSolutionPopupPosition, setRevealSolutionPopupPosition] =
    useState(null);
  const [solutionRevealedViaHint, setSolutionRevealedViaHint] = useState(false);
  const [showNoMoreHintsTooltip, setShowNoMoreHintsTooltip] = useState(false);
  const [noMoreHintsTooltipPosition, setNoMoreHintsTooltipPosition] =
    useState(null);
  const revealPopupRef = useRef(null);
  const revealSolutionPopupRef = useRef(null);
  const activeTooltipHintRef = useRef(null);
  const [solutionBreakIndex, setSolutionBreakIndex] = useState(null);

  // Onboarding state
  const [showOnboardingGuide, setShowOnboardingGuide] = useState(false);
  const [showOnboardingPrompt, setShowOnboardingPrompt] = useState(false);
  const [showOnboardingFollowUp, setShowOnboardingFollowUp] = useState(false);
  const [followUpWasSolved, setFollowUpWasSolved] = useState(false);

  // Timer pause tracking for onboarding
  const pausedTimeRef = useRef(0); // Accumulated paused time in ms
  const pauseStartRef = useRef(null); // When current pause started

  // Scroll to top to force mobile address bar to show, then add fixed-page class
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Scroll to top first
      window.scrollTo(0, 0);

      // Delay adding fixed-page class to give browser time to show address bar
      requestAnimationFrame(() => {
        document.body.classList.add("fixed-page");
      });

      return () => {
        document.body.classList.remove("fixed-page");
      };
    }
  }, []);

  // Track when users start today's daily clue
  useEffect(() => {
    if (isTodayClue(dataClue) && typeof window.gtag !== "undefined") {
      window.gtag("event", "started_daily_clue", {
        clid: dataClue.clid,
        difficulty: dataClue.difficulty,
        streak: streak,
        clue_start_count: 1,
      });
    }
  }, [dataClue.clid, dataClue.release, dataClue.difficulty, streak]);

  // Helper function for difficulty
  const getDifficultyText = (difficulty) => {
    switch (Number(difficulty)) {
      case 1:
        return "Easy";
      case 2:
        return "Moderate";
      case 3:
        return "Difficult";
      case 4:
        return "Expert";
      default:
        return "Easy";
    }
  };
  const {
    addCompletedClue,
    completedClues,
    showType,
    setShowType,
    returnLearn,
    setReturnLearn,
    streak,
    setCurrentStats,
    setClueStartTime,
    setClueSolvedTime,
    clueSolvedTime,
    hasSeenOnboarding,
    setHasSeenOnboarding,
    hasSeenOnboardingPrompt,
    setHasSeenOnboardingPrompt,
    hasCompletedFirstClue,
    setHasCompletedFirstClue,
    triggerOnboarding,
    setTriggerOnboarding,
    setTimerPaused,
  } = useContext(UserContext);

  // Track if we've already shown onboarding UI this session (to avoid re-prompting)
  const hasShownOnboardingThisSession = useRef(false);

  // Trigger onboarding guide or prompt based on user state (only on mount)
  useEffect(() => {
    // Only run once per session
    if (hasShownOnboardingThisSession.current) return;

    // Small delay to ensure the page has rendered
    const timer = setTimeout(() => {
      // First-time users: auto-show the guide
      if (!hasSeenOnboarding) {
        hasShownOnboardingThisSession.current = true;
        setShowOnboardingGuide(true);
      }
      // Return visitors who haven't completed a clue yet and haven't seen the prompt: show prompt
      else if (hasSeenOnboarding && !hasSeenOnboardingPrompt && completedClues && completedClues.length === 0) {
        hasShownOnboardingThisSession.current = true;
        setShowOnboardingPrompt(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [hasSeenOnboarding, hasSeenOnboardingPrompt, completedClues]);

  // Listen for trigger to start onboarding from TopBar help modal
  useEffect(() => {
    if (triggerOnboarding) {
      setShowOnboardingGuide(true);
      setTriggerOnboarding(false);
    }
  }, [triggerOnboarding, setTriggerOnboarding]);

  // Check if this clue has already been completed
  const completedClueData = completedClues?.find(
    (c) => c.clid === dataClue.clid
  );

  // Track whether the clue was already completed when the page loaded,
  // so solving it during this session doesn't suppress the celebration
  const wasCompletedOnLoad = useRef(null);
  if (wasCompletedOnLoad.current === null) {
    wasCompletedOnLoad.current = !!completedClueData;
  }

  // Set up activeClue
  let { activeClue } = prepClue(dataClue);

  // Keep a ref to always access the latest activeClue in callbacks
  const activeClueRef = useRef(activeClue);
  activeClueRef.current = activeClue;

  // Prepare initial state for completed clues (to avoid flash of input UI)
  const completedInitialState = completedClueData
    ? {
        stats: {
          guesses: completedClueData.guesses || 0,
          hints: completedClueData.hints || 0,
          how: completedClueData.how || "",
          solveTime: completedClueData.solveTime ?? null,
        },
        input: activeClue.solution.arr,
        showMessage: true,
        checkAns: true,
      }
    : null;

  let {
    stats,
    setStats,
    input,
    setInput,
    handleInput,
    nextHint,
    setNextHint,
    showMessage,
    setShowMessage,
    checkAns,
    setCheckAns,
    showLogic,
    setShowLogic,
    revealedLetters,
    showRevealPrompt,
    setShowRevealPrompt,
    revealPromptIndex,
    handleRevealLetter,
    handleSquareClick,
    getSolveTime,
    adjustStartTime,
  } = manageClue(activeClue, completedInitialState);

  // If returning to a completed clue, show the source attribution
  useEffect(() => {
    if (completedClueData) {
      // Show the source attribution after a short delay to ensure ref is available
      setTimeout(() => {
        if (activeClueRef.current.source?.ref?.current) {
          activeClueRef.current.source.ref.current.classList.add("show");
        }
      }, 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataClue.clid]);

  // Sync stats and start time to context for TopBar display
  useEffect(() => {
    setCurrentStats(stats);
    // Only start timer if this is a new (uncompleted) clue
    if (!completedClueData) {
      setClueStartTime(Date.now());
    }
    setClueSolvedTime(completedClueData?.solveTime ?? null);
    return () => {
      setCurrentStats(null);
      setClueStartTime(null);
      setClueSolvedTime(null);
      setTimerPaused(false);
    };
  }, [setCurrentStats, setClueStartTime, setClueSolvedTime, setTimerPaused, completedClueData]);

  // Pause/resume timer when onboarding guide shows/hides
  useEffect(() => {
    if (showOnboardingGuide) {
      // Pause: record when pause started and tell TopBar to stop updating
      pauseStartRef.current = Date.now();
      setTimerPaused(true);
    } else if (pauseStartRef.current !== null) {
      // Resume: add paused duration to accumulated time and adjust start time
      const pausedDuration = Date.now() - pauseStartRef.current;
      pausedTimeRef.current += pausedDuration;
      pauseStartRef.current = null;
      // Adjust the start time forward to account for paused time (both display and solve time)
      setClueStartTime((prev) => prev ? prev + pausedDuration : prev);
      adjustStartTime(pausedDuration);
      setTimerPaused(false);
    }
  }, [showOnboardingGuide, setClueStartTime, setTimerPaused, adjustStartTime]);

  // Update stats in context when they change
  useEffect(() => {
    setCurrentStats(stats);
  }, [stats, setCurrentStats]);

  // Determine if clue is solved (for follow-up prompt)
  const isSolution = activeClue.hints[nextHint]?.reveals;
  const isCorrectAns = checkAns && input.join("").toLowerCase() === activeClue.solution.arr.join("").toLowerCase();

  // Show follow-up prompt for first-time users after completion
  useEffect(() => {
    // Only show for first-time users who haven't completed a clue
    if (hasCompletedFirstClue) return;

    // Check if the clue was just completed (either by guessing or revealing)
    const justCompleted = (checkAns && isCorrectAns) || (isSolution && solutionRevealedViaHint);

    if (justCompleted && showMessage) {
      // Delay showing the follow-up to let the celebration/message play
      const timer = setTimeout(() => {
        setFollowUpWasSolved(isCorrectAns);
        setShowOnboardingFollowUp(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [checkAns, isCorrectAns, isSolution, solutionRevealedViaHint, showMessage, hasCompletedFirstClue]);

  // Calculate tooltip position based on hint refs
  const calculateTooltipPosition = useCallback((hintIndex) => {
    const hint = activeClueRef.current.hints[hintIndex];
    if (!hint) return null;

    // Collect all rects from the hint refs
    const allRects = [];

    // Try hint.ref first (indicator word in clue)
    if (hint.ref && hint.ref.length > 0) {
      hint.ref.forEach((ref) => {
        if (ref && ref.current) {
          allRects.push(ref.current.getBoundingClientRect());
        }
      });
    }

    // If hint.ref didn't work, try addLetters refs as fallback
    if (
      allRects.length === 0 &&
      hint.addLetters &&
      hint.addLetters.ref &&
      hint.addLetters.ref.current
    ) {
      const addLettersRefs = hint.addLetters.ref.current;
      if (Array.isArray(addLettersRefs) && addLettersRefs.length > 0) {
        addLettersRefs.forEach((ref) => {
          if (ref && ref.current) {
            allRects.push(ref.current.getBoundingClientRect());
          }
        });
      }
    }

    // If still no rects found, try the clue section as last resort
    if (allRects.length === 0) {
      const clueSection = document.getElementById("clueSectionRef");
      if (clueSection) {
        const rect = clueSection.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height, placement: "above" };
      }
      return null;
    }

    // Find the min/max positions
    const minTop = Math.min(...allRects.map((rect) => rect.top));
    const maxBottom = Math.max(...allRects.map((rect) => rect.bottom));

    // Determine tooltip placement based on clue layout
    let placement = "above";
    const clueText = document.getElementById("clueTextRef");
    if (clueText) {
      // Use computed line-height for more accurate detection
      const computedStyle = window.getComputedStyle(clueText);
      const lineHeight = parseFloat(computedStyle.lineHeight) || 28;
      const textRect = clueText.getBoundingClientRect();
      // Single-line clues: text height fits within ~1.3 line heights
      const isSingleLine = textRect.height <= lineHeight * 1.3;

      // For single-line clues, always show tooltip above the text
      // For multi-line clues, show below only when focus area is on the bottom line
      if (!isSingleLine) {
        const focusOnBottomLine = minTop > textRect.bottom - lineHeight * 1.3;
        if (focusOnBottomLine) {
          placement = "below";
        }
      }
    }

    // Filter to only rects on the relevant line (within 5px tolerance)
    let targetLineRects;
    let yPosition;

    if (placement === "below") {
      // For below placement, use the bottom line
      targetLineRects = allRects.filter((rect) => maxBottom - rect.bottom < 5);
      yPosition = maxBottom;
    } else {
      // For above placement, use the top line
      targetLineRects = allRects.filter((rect) => rect.top - minTop < 5);
      yPosition = minTop;
    }

    // Calculate horizontal center using only target line elements
    const leftmost = Math.min(...targetLineRects.map((rect) => rect.left));
    const rightmost = Math.max(...targetLineRects.map((rect) => rect.right));

    const centerX = (leftmost + rightmost) / 2;
    return { x: centerX, y: yPosition, placement };
  }, []);

  // Handle show hint click
  const handleShowHint = () => {
    // Check if this is the last hint (reveals solution)
    const isRevealingHint = activeClue.hints[nextHint]?.reveals;

    // For today's clue, don't allow revealing the solution
    if (isRevealingHint && isTodayClue(dataClue)) {
      return;
    }

    if (isRevealingHint) {
      // Show confirmation popup instead of revealing immediately
      const hintButton = document.querySelector(".hint-button");
      if (hintButton) {
        const rect = hintButton.getBoundingClientRect();
        setRevealSolutionPopupPosition({
          top: rect.top,
          left: rect.left + rect.width / 2,
        });
      }
      setShowRevealSolutionConfirm(true);
      return;
    }

    // Gray out the previous hint if one is active
    const prevHintIndex = activeTooltipHintRef.current;
    if (prevHintIndex !== null && prevHintIndex > 0) {
      const prevHint = activeClue.hints[prevHintIndex];
      if (prevHint && prevHint.ref) {
        highlightLetters(prevHint.ref, false, true);
        if (
          prevHint.addLetters &&
          prevHint.addLetters.ref &&
          prevHint.addLetters.ref.current
        ) {
          changeColor(prevHint.addLetters.ref.current, false, true);
        }
      }
    }

    // Store current hint index and refs before state updates
    const currentHintIndex = nextHint;
    const currentHint = activeClue.hints[currentHintIndex];

    setStats((prevStats) => ({ ...prevStats, hints: prevStats.hints + 1 }));
    setCheckAns(false);
    setNextHint(currentHintIndex + 1);

    // Calculate position and show tooltip
    const position = calculateTooltipPosition(currentHintIndex);
    setTooltipPosition(position);
    setActiveTooltipHint(currentHintIndex);
    activeTooltipHintRef.current = currentHintIndex;

    // Run the hint animation after state updates are processed
    // Use the captured hint to ensure we have the correct refs
    setTimeout(() => {
      if (currentHintIndex === 0 && currentHint.ref) {
        // Definition hint - underline directly using inline styles
        currentHint.ref.forEach((ref) => {
          if (ref && ref.current) {
            ref.current.style.textDecoration = "underline";
          }
        });
      }
      handleHint(activeClue, currentHintIndex, true, false, showLogic);
    }, 0);
  };

  // Handle reveal solution confirmation
  const handleRevealSolution = () => {
    setShowRevealSolutionConfirm(false);
    setRevealSolutionPopupPosition(null);

    // Store current hint index before state updates
    const currentHintIndex = nextHint;

    // Stop the timer by capturing and storing the solve time
    const solveTime = getSolveTime();
    setClueSolvedTime(solveTime);

    // Mark as revealed via hint (so Message hides the text, tooltip shows it)
    setSolutionRevealedViaHint(true);

    // Increment hints count
    setStats((prevStats) => ({ ...prevStats, hints: prevStats.hints + 1 }));
    setCheckAns(false);

    // Calculate position and show tooltip with final hint
    const position = calculateTooltipPosition(currentHintIndex);
    setTooltipPosition(position);
    setActiveTooltipHint(currentHintIndex);
    activeTooltipHintRef.current = currentHintIndex;

    // Clear input and show message (for buttons)
    setInput([]);
    setShowMessage(true);

    // Run the hint animation
    setTimeout(() => {
      handleHint(activeClue, currentHintIndex, true, false, showLogic);
    }, 0);
  };

  // Dismiss tooltip and gray out the hint
  const dismissTooltip = useCallback(() => {
    const hintIndex = activeTooltipHintRef.current;
    if (hintIndex !== null && !showLogic) {
      const hint = activeClueRef.current.hints[hintIndex];
      // Only gray out non-definition hints (definition is underlined, not highlighted)
      if (hint && hint.ref && hintIndex > 0) {
        // Gray out the highlight background
        highlightLetters(hint.ref, false, true);
        // Gray out text color for addLetters
        if (
          hint.addLetters &&
          hint.addLetters.ref &&
          hint.addLetters.ref.current
        ) {
          changeColor(hint.addLetters.ref.current, false, true);
        }
      }
    }
    activeTooltipHintRef.current = null;
    setActiveTooltipHint(null);
    setTooltipPosition(null);
  }, [showLogic]);

  // Click outside to dismiss tooltip (only in regular hint mode, not showLogic)
  useEffect(() => {
    // In showLogic mode, don't set up click-outside-to-dismiss
    // User advances with Next button instead
    if (activeTooltipHint === null || showLogic) return;

    const handleClickOutside = () => {
      dismissTooltip();
    };

    // Use a slight delay to avoid immediate dismissal
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeTooltipHint, dismissTooltip, showLogic]);

  // Show tooltip during "Show logic" mode
  useEffect(() => {
    if (showLogic && showMessage && !checkAns) {
      const clue = activeClueRef.current;
      const currentHint = clue.hints[nextHint];
      if (!currentHint) return;

      // Two-step hint categories - these share source letters with their first step
      const twoStepCategories = [
        "ag-2",
        "hw-2",
        "hp-2",
        "in-2",
        "lb-2",
        "sy-2",
      ];
      const isTwoStepSecond = twoStepCategories.includes(currentHint.category);

      // Gray out previous hint when stepping forward (but not for two-step hints)
      if (nextHint > 1 && !isTwoStepSecond) {
        const prevHint = clue.hints[nextHint - 1];
        if (prevHint && prevHint.ref && prevHint.ref.length > 0) {
          highlightLetters(prevHint.ref, false, true);
        }
      }

      // Reset previous hint's addLetters to primary color
      if (nextHint > 0) {
        const prevHint = clue.hints[nextHint - 1];
        if (
          prevHint &&
          prevHint.addLetters &&
          prevHint.addLetters.ref &&
          prevHint.addLetters.ref.current
        ) {
          changeColor(prevHint.addLetters.ref.current, false, true);
        }
      }

      // For definition hint (index 0), underline directly
      // Using inline styles to prevent React from overwriting on re-render
      if (nextHint === 0 && currentHint.ref && currentHint.ref.length > 0) {
        currentHint.ref.forEach((ref) => {
          if (ref && ref.current) {
            ref.current.style.textDecoration = "underline";
          }
        });
      }

      // For indicator hints (nextHint > 0), apply highlighting
      if (nextHint > 0 && currentHint.ref && currentHint.ref.length > 0) {
        highlightLetters(currentHint.ref);
      }

      // Calculate position and show tooltip
      const position = calculateTooltipPosition(nextHint);
      setTooltipPosition(position);
      setActiveTooltipHint(nextHint);
      activeTooltipHintRef.current = nextHint;

      // Run hint animation for additional effects (color changes, letter movements)
      setTimeout(() => {
        handleHint(activeClueRef.current, nextHint, true, false, showLogic);
      }, 0);
    }
  }, [showLogic, showMessage, nextHint, checkAns, calculateTooltipPosition]);

  // Map first-step hint categories to their second-step counterparts
  const twoStepHintMap = {
    anagram: "ag-2",
    "hidden word": "hw-2",
    homophone: "hp-2",
    "letter bank": "lb-2",
    synonym: "sy-2",
  };

  // Handle clicking on highlighted clue text to re-show hint tooltip
  const handleClueLetterClick = useCallback(
    (index) => {
      const clue = activeClueRef.current;
      // Check if this letter is part of any revealed hint (hints 0 through nextHint-1)
      for (let hintIndex = 0; hintIndex < nextHint; hintIndex++) {
        const hint = clue.hints[hintIndex];
        if (hint && hint.ref) {
          const isPartOfHint = hint.ref.some((ref) => {
            // Check if this ref corresponds to the clicked letter index
            return ref && ref.current === clue.clue.ref.current[index]?.current;
          });

          if (isPartOfHint) {
            let targetHintIndex = hintIndex;

            // Check if this is a first-step hint with a revealed second-step
            const secondStepCategory = twoStepHintMap[hint.category];
            if (secondStepCategory) {
              const nextHintObj = clue.hints[hintIndex + 1];
              // If the next hint is the corresponding second-step and has been revealed
              if (
                nextHintObj?.category === secondStepCategory &&
                hintIndex + 1 < nextHint
              ) {
                targetHintIndex = hintIndex + 1;
              }
            }

            const position = calculateTooltipPosition(targetHintIndex);
            setTooltipPosition(position);
            setActiveTooltipHint(targetHintIndex);
            activeTooltipHintRef.current = targetHintIndex;
            return;
          }
        }
      }
    },
    [nextHint, calculateTooltipPosition],
  );

  // Check if all positions are filled (enter button is active)
  const allPositionsFilled = activeClue.solution.arr.every(
    (_, index) => input[index] && input[index] !== "",
  );

  // Determine if hint button should be shown
  // Hide when showing completion message or when all letters are typed (enter is active)
  const showHintButton = !showMessage && !allPositionsFilled;

  // Check if this is today's clue and if hints are exhausted (next hint would reveal solution)
  const isTodaysClue = isTodayClue(dataClue);
  const isRevealingHint = activeClue.hints[nextHint]?.reveals;
  const hintsExhaustedForToday = isTodaysClue && isRevealingHint;

  // Calculate hint button position based on available space
  useEffect(() => {
    const calculateHintPosition = () => {
      const solSection = document.getElementById("solSectionRef");
      if (solSection) {
        const rect = solSection.getBoundingClientRect();
        const rightSpace = window.innerWidth - rect.right;
        // Need at least 60px for the button (40px button + 20px margin)
        setHintPosition(rightSpace >= 60 ? "right" : "below");
      }
    };

    calculateHintPosition();
    window.addEventListener("resize", calculateHintPosition);
    return () => window.removeEventListener("resize", calculateHintPosition);
  }, []);

  // Detect when solution boxes overflow and need smart wrapping
  useEffect(() => {
    const checkSolutionOverflow = () => {
      const solSection = document.getElementById("solSectionRef");
      if (!solSection || !activeClue.solution.wordBreaks) return;

      const containerWidth = solSection.parentElement?.clientWidth || window.innerWidth;
      const boxSize = 30; // matches CSS .solution .letter width
      const totalWidth = activeClue.solution.arr.length * boxSize;

      if (totalWidth > containerWidth) {
        // Find the best break point that keeps both lines balanced
        const wordBreaks = activeClue.solution.wordBreaks;
        let bestBreak = wordBreaks[0];

        if (wordBreaks.length > 1) {
          // For multi-word solutions, find the break closest to center
          const midpoint = activeClue.solution.arr.length / 2;
          let minDiff = Math.abs(wordBreaks[0] - midpoint);

          for (const breakIdx of wordBreaks) {
            const diff = Math.abs(breakIdx - midpoint);
            if (diff < minDiff) {
              minDiff = diff;
              bestBreak = breakIdx;
            }
          }
        }

        setSolutionBreakIndex(bestBreak);
      } else {
        setSolutionBreakIndex(null);
      }
    };

    checkSolutionOverflow();
    window.addEventListener("resize", checkSolutionOverflow);
    return () => window.removeEventListener("resize", checkSolutionOverflow);
  }, [activeClue.solution.arr.length, activeClue.solution.wordBreaks]);

  // Calculate popup position when reveal prompt is shown
  useEffect(() => {
    if (showRevealPrompt && revealPromptIndex !== null) {
      const element = document.getElementById(`i${revealPromptIndex}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        setRevealPopupPosition({
          top: rect.top,
          left: rect.left + rect.width / 2,
        });
      }
    } else {
      setRevealPopupPosition(null);
    }
  }, [showRevealPrompt, revealPromptIndex]);

  // Close reveal popup when clicking outside
  useEffect(() => {
    if (!showRevealPrompt) return;

    const handleClickOutside = (e) => {
      if (
        revealPopupRef.current &&
        !revealPopupRef.current.contains(e.target)
      ) {
        setShowRevealPrompt(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, [showRevealPrompt, setShowRevealPrompt]);

  // Close reveal solution popup when clicking outside
  useEffect(() => {
    if (!showRevealSolutionConfirm) return;

    const handleClickOutside = (e) => {
      if (
        revealSolutionPopupRef.current &&
        !revealSolutionPopupRef.current.contains(e.target)
      ) {
        setShowRevealSolutionConfirm(false);
        setRevealSolutionPopupPosition(null);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, [showRevealSolutionConfirm]);

  // Close no more hints tooltip when clicking outside
  useEffect(() => {
    if (!showNoMoreHintsTooltip) return;

    const handleClickOutside = () => {
      setShowNoMoreHintsTooltip(false);
      setNoMoreHintsTooltipPosition(null);
    };

    // Use a slight delay to avoid immediate dismissal from the same click
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showNoMoreHintsTooltip]);

  // type HTML
  const pillList = activeClue.type.map((t, index) => (
    <li
      key={`type_${index}`}
      className="type-pill tooltip-parent tooltip-offset-left border border-neutral-400 dark:!border-neutral-500 dark:!text-white"
      aria-describedby="tooltip-id"
    >
      {t}
      <Tooltip text={t} />
    </li>
  ));

  const typeInsert = showType ? (
    <>
      <li className="eyecon">
        <button aria-label="Hide type" onClick={() => setShowType(false)}>
          <EyeClosedIcon />
        </button>
      </li>
      {pillList}
    </>
  ) : (
    <>
      <li className="eyecon">
        <button onClick={() => setShowType(true)} aria-label="Show type">
          <EyeOpenIcon />
        </button>
      </li>
      <li className="type-text">
        <button onClick={() => setShowType(true)} aria-label="Expand type">
          See type
        </button>
      </li>
    </>
  );

  // Check if a letter at given index is part of any revealed hint
  const isLetterInRevealedHint = (index) => {
    for (let hintIndex = 0; hintIndex < nextHint; hintIndex++) {
      const hint = activeClue.hints[hintIndex];
      if (hint && hint.ref) {
        const isInHint = hint.ref.some(
          (ref) =>
            ref && ref.current === activeClue.clue.ref.current[index]?.current,
        );
        if (isInHint) return true;
      }
    }
    return false;
  };

  // clue HTML
  const clueInsert = activeClue.clue.arr.map((letter, index) => {
    const inRevealedHint = isLetterInRevealedHint(index);
    return (
      <span
        key={`cluearr_${index}`}
        ref={activeClue.clue.ref.current[index]}
        className={`letter${inRevealedHint ? " hint-clickable" : ""}`}
        onClick={
          inRevealedHint
            ? (e) => {
                e.stopPropagation();
                handleClueLetterClick(index);
              }
            : undefined
        }
        style={inRevealedHint ? { cursor: "pointer" } : undefined}
      >
        {letter}
      </span>
    );
  });

  // addLetters HTML
  let addInsert = [];
  activeClue.hints.forEach((hint, parentIndex) => {
    if (
      hint.type === "indicator" &&
      !!hint.addLetters &&
      !!hint.addLetters.value
    ) {
      const lettersInsert = hint.addLetters.value.map((letter, childIndex) => (
        <span
          key={`${parentIndex}_${childIndex}`}
          ref={activeClue.addLetters.ref.current[parentIndex][childIndex]}
          className="letter"
        >
          {letter}
        </span>
      ));

      const brCats = [
        "container",
        "reversal",
        "ag-2",
        "lb-2",
        "hw-2",
        "spoonerism",
      ];
      const addBr = brCats.includes(hint.category);
      const br = (
        <span key={`br_${parentIndex}`} style={{ flexBasis: "100%" }}></span>
      );

      const addSpoon = hint.category === "spoonerism";
      const spoon = (
        <>
          <svg
            key={`svg_${parentIndex}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="20px"
            height="20px"
            ref={activeClue.spoon}
          >
            <path d="M245.8 220.9c-14.5-17.6-21.8-39.2-21.8-60.8C224 80 320 0 416 0c53 0 96 43 96 96c0 96-80 192-160.2 192c-21.6 0-43.2-7.3-60.8-21.8L54.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L245.8 220.9z" />
          </svg>
          <span style={{ flexBasis: "100%" }}></span>
        </>
      );

      addBr && addInsert.push(br);
      addSpoon && addInsert.push(spoon);
      addInsert.push(
        <span
          key={`${parentIndex}_word`}
          ref={hint.addLetters.wordRef}
          className="word"
        >
          {lettersInsert}&nbsp;
        </span>,
      );
    }
  });

  // Find the first empty, non-revealed position for the cursor
  const getCursorPosition = () => {
    for (let i = 0; i < activeClue.solution.arr.length; i++) {
      if ((!input[i] || input[i] === "") && !revealedLetters.includes(i)) {
        return i;
      }
    }
    return activeClue.solution.arr.length;
  };
  const cursorPosition = showMessage ? -1 : getCursorPosition();

  // solution HTML
  const solInsert = activeClue.solution.arr.flatMap((letter, index) => {
    const isActive = index === cursorPosition;
    const isRevealed = revealedLetters.includes(index);
    const isEmpty = !input[index] || input[index] === "";
    const wouldBeLastLetter =
      revealedLetters.length >= activeClue.solution.arr.length - 1;
    const canReveal =
      isEmpty && !isRevealed && !showMessage && !wouldBeLastLetter;

    let cursor = "default";

    if (canReveal) {
      cursor = "pointer";
    }

    const squareStyle = {
      borderWidth: "0.75px",
      cursor,
      pointerEvents: canReveal ? "auto" : "none",
      ...(isActive && { backgroundColor: "var(--lc-active-bg)" }),
    };

    const elements = [];

    // Insert line break before this letter if it's the break point
    if (solutionBreakIndex !== null && index === solutionBreakIndex) {
      elements.push(
        <span
          key="solution-break"
          className="solution-break"
          style={{ flexBasis: "100%", height: 0 }}
          aria-hidden="true"
        />
      );
    }

    elements.push(
      <span
        key={`solarr_${index}`}
        id={`i${index}`}
        className="letter border-neutral-900 dark:!border-white"
        style={squareStyle}
        onClick={() => handleSquareClick(index)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleSquareClick(index);
          }
        }}
        role={canReveal ? "button" : "presentation"}
        tabIndex={canReveal ? 0 : -1}
        aria-label={canReveal ? `Reveal letter ${index + 1}` : undefined}
        data-testid={`solution-square-${index}`}
        data-revealed={isRevealed ? "true" : "false"}
      >
        <span
          id={`sl${index}`}
          ref={activeClue.solution.ref.current[index]}
          className="solLetter"
        >
          {letter}
        </span>
        <span
          className="typeLetter"
          style={isRevealed ? { color: "var(--lc-highlight-text)" } : {}}
        >
          {input[index]}
        </span>
      </span>
    );

    return elements;
  });

  // solution length
  const solLength = (
    <span
      id="solLengthRef"
      ref={activeClue.solution.length.ref}
      className="solution-letters"
      data-testid="solution-length"
    >
      &nbsp;{activeClue.solution.length.value}
    </span>
  );

  // source HTML
  const sourceInsert = activeClue.source.href ? (
    <a target="_blank" rel="noreferrer" href={activeClue.source.href}>
      {activeClue.source.value}
    </a>
  ) : (
    <span>{activeClue.source.value}</span>
  );

  return (
    <Layout>
      <div className="clue-page">
        <div
          id="clue-container"
          className="clue lc-container"
          data-testid="clue-container"
        >
          <ul className="type">{typeInsert}</ul>
          <div
            id="clueSectionRef"
            ref={activeClue.clue.sectionRef}
            className="clue"
            data-testid="clue-text"
          >
            <div id="clueTextRef">
              {clueInsert} {solLength}
            </div>
          </div>
          <div className="addLetters">{addInsert}</div>
          <div className="sol-section">
            <div className="solution-wrapper">
              <div
                id="solSectionRef"
                ref={activeClue.solution.sectionRef}
                className="solution"
              >
                {solInsert}
              </div>
              {showHintButton && (
                <button
                  className={`hint-button hint-${hintPosition}${hintsExhaustedForToday ? " hint-disabled" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (hintsExhaustedForToday) {
                      const hintButton = e.currentTarget;
                      const rect = hintButton.getBoundingClientRect();
                      setNoMoreHintsTooltipPosition({
                        top: rect.top,
                        left: rect.left + rect.width / 2,
                      });
                      setShowNoMoreHintsTooltip(true);
                    } else {
                      handleShowHint();
                    }
                  }}
                  onMouseEnter={() => {
                    if (hintsExhaustedForToday) {
                      const hintButton = document.querySelector(".hint-button");
                      if (hintButton) {
                        const rect = hintButton.getBoundingClientRect();
                        setNoMoreHintsTooltipPosition({
                          top: rect.top,
                          left: rect.left + rect.width / 2,
                        });
                      }
                      setShowNoMoreHintsTooltip(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (hintsExhaustedForToday) {
                      setShowNoMoreHintsTooltip(false);
                      setNoMoreHintsTooltipPosition(null);
                    }
                  }}
                  aria-label={
                    hintsExhaustedForToday
                      ? "No more hints available"
                      : "Show hint"
                  }
                >
                  <HintIcon />
                </button>
              )}
            </div>
            <div id="sourceRef" ref={activeClue.source.ref} className="source">
              by {sourceInsert}
            </div>
          </div>
          <div className="clue-difficulty">
            <button
              className="difficulty-button"
              aria-label={`Difficulty: ${getDifficultyText(
                dataClue.difficulty,
              )}`}
              onMouseEnter={() => setShowDifficultyTooltip(true)}
              onMouseLeave={() => setShowDifficultyTooltip(false)}
              onClick={() => setShowDifficultyTooltip(!showDifficultyTooltip)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setShowDifficultyTooltip(!showDifficultyTooltip);
                }
              }}
            >
              <div
                className={`difficulty-grid difficulty-${dataClue.difficulty}`}
                aria-hidden="true"
              >
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`difficulty-square ${i < dataClue.difficulty ? "filled" : ""}`}
                  />
                ))}
              </div>
            </button>
            {showDifficultyTooltip && (
              <div className="difficulty-tooltip">
                {getDifficultyText(dataClue.difficulty)}
              </div>
            )}
          </div>
        </div>
        <Bottom
          showMessage={showMessage}
          setShowMessage={setShowMessage}
          nextHint={nextHint}
          setNextHint={setNextHint}
          activeClue={activeClue}
          addCompletedClue={addCompletedClue}
          input={input}
          setInput={setInput}
          handleInput={handleInput}
          checkAns={checkAns}
          setCheckAns={setCheckAns}
          stats={stats}
          setStats={setStats}
          returnLearn={returnLearn}
          setReturnLearn={setReturnLearn}
          showLogic={showLogic}
          setShowLogic={setShowLogic}
          revealedLetters={revealedLetters}
          solutionRevealedViaHint={solutionRevealedViaHint}
          getSolveTime={getSolveTime}
          setClueSolvedTime={setClueSolvedTime}
          clueSolvedTime={clueSolvedTime}
          isReturningCompleted={wasCompletedOnLoad.current}
        />
      </div>

      {showRevealPrompt &&
        revealPromptIndex !== null &&
        revealPopupPosition && (
          <div
            ref={revealPopupRef}
            className="reveal-popup"
            style={{
              position: "fixed",
              top: revealPopupPosition.top - 10,
              left: revealPopupPosition.left,
              transform: "translate(-50%, -100%)",
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0.75rem 1rem 0.5rem",
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reveal-letter-title"
          >
            <p
              id="reveal-letter-title"
              style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem" }}
            >
              Reveal letter?
            </p>
            <button
              className="bg-purple-200 dark:!bg-[#4A3F6B] dark:!text-white"
              style={{
                padding: "0.35rem 0.75rem",
                borderRadius: "50px",
                border: "none",
                cursor: "pointer",
                fontSize: "0.8rem",
              }}
              onClick={() => handleRevealLetter(revealPromptIndex)}
              data-testid="modal-reveal-confirm"
            >
              Reveal
            </button>
            <div className="popup-arrow" />
          </div>
        )}

      {showRevealSolutionConfirm && revealSolutionPopupPosition && (
        <div
          ref={revealSolutionPopupRef}
          className="reveal-popup"
          style={{
            position: "fixed",
            top: revealSolutionPopupPosition.top - 10,
            left: revealSolutionPopupPosition.left,
            transform: "translate(-75%, -100%)",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0.75rem 1rem 0.5rem",
            whiteSpace: "nowrap",
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="reveal-solution-title"
        >
          <p
            id="reveal-solution-title"
            style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem" }}
          >
            Reveal solution?
          </p>
          <button
            className="bg-purple-200 dark:!bg-[#4A3F6B] dark:!text-white"
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
            onClick={handleRevealSolution}
            data-testid="modal-reveal-solution-confirm"
          >
            Reveal
          </button>
          <div className="popup-arrow" style={{ left: "75%" }} />
        </div>
      )}

      {showNoMoreHintsTooltip && noMoreHintsTooltipPosition && (
        <div
          className="hint-tooltip no-more-hints-tooltip"
          style={{
            position: "fixed",
            top: noMoreHintsTooltipPosition.top - 12,
            left: noMoreHintsTooltipPosition.left,
            transform: "translate(-75%, -100%)",
            zIndex: 100,
          }}
        >
          <div className="hint-tooltip-content">
            <div className="hint-tooltip-message">No more hints available</div>
          </div>
          <div className="hint-tooltip-arrow" style={{ left: "75%" }} />
        </div>
      )}

      {activeTooltipHint !== null && tooltipPosition && (
        <HintTooltip
          hint={activeClue.hints[activeTooltipHint]}
          position={tooltipPosition}
          onDismiss={dismissTooltip}
        />
      )}

      {/* Onboarding Guide */}
      <OnboardingGuide
        isVisible={showOnboardingGuide}
        onComplete={() => setShowOnboardingGuide(false)}
      />

      {/* Onboarding Prompt for return visitors */}
      {showOnboardingPrompt && (
        <OnboardingPrompt
          onYes={() => {
            setShowOnboardingPrompt(false);
            setHasSeenOnboardingPrompt(true);
            setShowOnboardingGuide(true);
          }}
          onNo={() => {
            setShowOnboardingPrompt(false);
            setHasSeenOnboardingPrompt(true);
          }}
        />
      )}

      {/* Post-completion follow-up for first-time users */}
      {showOnboardingFollowUp && (
        <OnboardingFollowUp
          wasSolved={followUpWasSolved}
          onDismiss={() => setShowOnboardingFollowUp(false)}
        />
      )}
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    cluesJson(id: { eq: $id }) {
      id
      clid
      clue {
        value
      }
      release
      difficulty
      dow
      type
      definition
      hints {
        category
        value
        explainer
        end {
          value
        }
      }
      solution {
        value
      }
      source {
        value
      }
    }
  }
`;

export default CluePage;

export const Head = ({ data }) => {
  const clue = data.cluesJson;
  const clueDate = new Date(clue.release).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <title>{`Cryptic Clue #${clue.clid} - ${clueDate} | Learn Cryptic`}</title>
      <meta
        name="description"
        content={`Solve today's cryptic crossword clue: "${clue.clue.value}". Interactive hints and explanations to help you learn cryptic crossword techniques.`}
      />
      <link
        rel="canonical"
        href={`https://learncryptic.com/clues/${clue.clid}`}
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Question",
          name: `Cryptic Clue #${clue.clid}`,
          text: clue.clue.value,
          datePublished: clue.release,
          author: {
            "@type": "Organization",
            name: "Learn Cryptic",
          },
          acceptedAnswer: {
            "@type": "Answer",
            text: clue.solution.value,
          },
          difficulty: clue.difficulty,
          about: {
            "@type": "Thing",
            name: "Cryptic Crossword",
            description:
              "A type of crossword puzzle where each clue is a word puzzle in itself",
          },
        })}
      </script>
    </>
  );
};
