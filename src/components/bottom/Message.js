import React, { useRef, useMemo } from "react";
import ButtonContainer from "./ButtonContainer";
import Celebration from "./Celebration";

import getMessage from "../../utils/bottom/getMessage";
import { formatTime, isTodayClue } from "../../utils/dateHelpers";

// Share icon component
const ShareIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <circle cx="6" cy="12" r="2" />
    <circle cx="18" cy="6" r="2" />
    <circle cx="18" cy="18" r="2" />
    <line x1="8" y1="11" x2="16" y2="7" />
    <line x1="8" y1="13" x2="16" y2="17" />
  </svg>
);

const Message = ({
  activeClue,
  nextHint,
  input,
  checkAns,
  isCorrectAns,
  isSolution,
  returnLearn,
  buttons,
  showLogic,
  setShowLogic,
  solutionRevealedViaHint,
  stats,
  getSolveTime,
  isReturningCompleted,
}) => {
  const msgContainer = useRef();

  // Check if this is today's clue
  const isTodaysClue = isTodayClue(activeClue);

  // Capture solve time once when component mounts (when answer is correct)
  // Use saved solve time from stats if available (for returning to completed clues)
  const solveTime = useMemo(() => {
    if (checkAns && isCorrectAns) {
      // Use saved solve time if available (returning to completed clue)
      if (stats.solveTime != null) {
        return stats.solveTime;
      }
      // Otherwise calculate current solve time
      if (getSolveTime) {
        return getSolveTime();
      }
    }
    return null;
  }, [checkAns, isCorrectAns, getSolveTime, stats.solveTime]);

  // Share score function (for today's clue only)
  const handleShareScore = async () => {
    const date = new Date(activeClue.release);
    const dateFormatted = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);

    const guessText = `${stats.guesses} ${stats.guesses === 1 ? "guess" : "guesses"}`;
    const hintText = `${stats.hints} ${stats.hints === 1 ? "hint" : "hints"}`;
    const actualSolveTime = solveTime ?? stats.solveTime;
    const timeText = actualSolveTime != null ? formatTime(actualSolveTime) : null;

    const statsLine = timeText
      ? `⬜ ${timeText} • 🟧 ${guessText} • 🟪 ${hintText}`
      : `🟧 ${guessText} • 🟪 ${hintText}`;

    const scoreText = `Learn Cryptic #${activeClue.clid} • ${dateFormatted}\n${statsLine}`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile && navigator.share) {
      try {
        await navigator.share({ title: "Clue Score", text: scoreText });
      } catch (err) {
        if (err.name !== "AbortError") {
          alert("Could not share your score.");
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(scoreText);
        alert("Score copied to clipboard!");
      } catch (err) {
        alert("Could not copy your score.");
      }
    }
  };

  // figure out which text to display
  const message = checkAns ? (
    isCorrectAns ? (
      <div data-testid="message-success">
        <strong>{input.join("").toUpperCase()}</strong> is correct!
        <div className="stats-row-wrapper">
          <div className="stats-row">
            {solveTime != null && (
              <span className="stat-time dark:!bg-neutral-600">
                {formatTime(solveTime)}
              </span>
            )}
            <span className="stat-guesses">
              {stats.guesses} {stats.guesses === 1 ? "guess" : "guesses"}
            </span>
            <span className="stat-hints">
              {stats.hints} {stats.hints === 1 ? "hint" : "hints"}
            </span>
            {isTodaysClue && (
              <button
                onClick={handleShareScore}
                className="share-icon-btn"
                aria-label="Share score"
              >
                <ShareIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    ) : (
      <div data-testid="message-error">
        <strong>{input.join("").toUpperCase()}</strong> is not the correct
        answer.
      </div>
    )
  ) : solutionRevealedViaHint && isSolution ? (
    <div data-testid="message-revealed">
      The answer is{" "}
      <strong>{activeClue.solution.arr.join("").toUpperCase()}</strong>
    </div>
  ) : (
    getMessage(activeClue.hints[nextHint])
  );


  // Prep message button
  let messageButton;

  // Completed with returnLearn == true
  if (isSolution && returnLearn) {
    messageButton = [buttons.returnLearn];

    // Completed with returnLearn == true
  } else if (checkAns && isCorrectAns && returnLearn) {
    messageButton = [buttons.endClueShowLogic, buttons.returnLearn];

    // Completed with guess and finished logic && today's clue
  } else if (isSolution && showLogic && isTodaysClue) {
    messageButton = [buttons.endClueHint];

    // Completed with guess and finished logic &&  is not today's clue
  } else if (isSolution && showLogic && !isTodaysClue) {
    messageButton = [buttons.endClueHint];

    // Completed with guess, more clues && today's clue
  } else if (checkAns && isCorrectAns && isTodaysClue) {
    messageButton = [buttons.endClueShowLogic, buttons.endClueGuess];

    // Completed with guess, more clues && is not today's clue
  } else if (checkAns && isCorrectAns && !isTodaysClue) {
    messageButton = [buttons.endClueShowLogic, buttons.endClueGuess];

    // Continue showing logic
  } else if (showLogic && !activeClue.hints[nextHint].reveals) {
    messageButton = [buttons.nextLogic];

    // Completed with hint reveal && today's clue
  } else if (
    isSolution &&
    !showLogic &&
    solutionRevealedViaHint &&
    isTodaysClue
  ) {
    messageButton = [buttons.endClueHint];

    // Completed with hint reveal && not today's clue
  } else if (
    isSolution &&
    !showLogic &&
    solutionRevealedViaHint &&
    !isTodaysClue
  ) {
    messageButton = [buttons.endClueHint];

    // Completed with hint, more clues
  } else if (isSolution && !showLogic) {
    messageButton = [buttons.endClueHint];

    // Incorrect answer - try again
  } else if (checkAns && !isCorrectAns) {
    messageButton = [buttons.tryAgain];

    // Not complete, continue with game
  } else {
    messageButton = [buttons.continue];
  }

  // style message
  let messageStyle = isSolution
    ? "solution"
    : checkAns && isCorrectAns
      ? "is-correct-ans"
      : "continue";

  // Hide message text when tooltip shows it instead:
  // - In showLogic mode (stepping through hints)
  // - When solution is revealed via hint button (tooltip shows the answer)
  const hideMessageForTooltip =
    (showLogic && !checkAns) || (solutionRevealedViaHint && isSolution);

  // Show stats after show logic is complete
  const showPostLogicStats = isSolution && showLogic;

  return (
    <div
      className={`message ${messageStyle} bg-white dark:!bg-neutral-800 dark:!text-neutral-100`}
      ref={msgContainer}
    >
      {checkAns && isCorrectAns && !isReturningCompleted && <Celebration />}
      {message && !hideMessageForTooltip && (
        <div className={"message-copy lc-container"}>{message}</div>
      )}

      {showPostLogicStats && (
        <div className="message-copy lc-container">
          <div className="stats-row-wrapper">
            <div className="stats-row">
              {stats.solveTime != null && (
                <span className="stat-time dark:!bg-neutral-600">
                  {formatTime(stats.solveTime)}
                </span>
              )}
              <span className="stat-guesses">
                {stats.guesses} {stats.guesses === 1 ? "guess" : "guesses"}
              </span>
              <span className="stat-hints">
                {stats.hints} {stats.hints === 1 ? "hint" : "hints"}
              </span>
              {isTodaysClue && (
                <button
                  onClick={handleShareScore}
                  className="share-icon-btn"
                  aria-label="Share score"
                >
                  <ShareIcon />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <ButtonContainer
        btnArr={messageButton}
        isSolution={isSolution}
        stack={isSolution && !showLogic}
      />
    </div>
  );
};

export default Message;
