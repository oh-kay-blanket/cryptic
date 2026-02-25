import React, { useRef, useMemo } from "react";
import ButtonContainer from "./ButtonContainer";
import Celebration from "./Celebration";

import getMessage from "../../utils/bottom/getMessage";
import { formatTime } from "../../utils/dateHelpers";

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

  // figure out which text to display
  const message = checkAns ? (
    isCorrectAns ? (
      <div data-testid="message-success">
        <strong>{input.join("").toUpperCase()}</strong> is correct.
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            marginTop: "0.5rem",
          }}
        >
          <span
            style={{
              backgroundColor: "var(--lc-highlight-bg)",
              color: "var(--lc-text-primary)",
              padding: "2px 6px",
              lineHeight: "1.5",
              borderRadius: "4px",
              fontSize: "0.875rem",
            }}
          >
            {stats.hints} {stats.hints === 1 ? "hint" : "hints"}
          </span>
          <span
            style={{
              backgroundColor: "var(--lc-active-bg)",
              color: "var(--lc-text-primary)",
              padding: "2px 6px",
              lineHeight: "1.5",
              borderRadius: "4px",
              fontSize: "0.875rem",
            }}
          >
            {stats.guesses} {stats.guesses === 1 ? "guess" : "guesses"}
          </span>
          {solveTime != null && (
            <span
              style={{
                backgroundColor: "#e5e5e5",
                color: "var(--lc-text-primary)",
                padding: "2px 6px",
                lineHeight: "1.5",
                borderRadius: "4px",
                fontSize: "0.875rem",
              }}
              className="dark:!bg-neutral-600"
            >
              {formatTime(solveTime)}
            </span>
          )}
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

  const explainer = activeClue.hints[nextHint].explainer
    ? activeClue.hints[nextHint].explainer
    : false;

  // Prep message button
  let messageButton;

  const checkIsTodayClue = (activeClue) => {
    const date1 = new Date(activeClue.release);
    const date2 = new Date();

    // Strip time part by setting hours, minutes, seconds, and milliseconds to zero
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

    return d1.getTime() === d2.getTime();
  };
  const isTodayClue = checkIsTodayClue(activeClue);

  // Completed with returnLearn == true
  if (isSolution && returnLearn) {
    messageButton = [buttons.returnLearn];

    // Completed with returnLearn == true
  } else if (checkAns && isCorrectAns && returnLearn) {
    messageButton = [buttons.endClueShowLogic, buttons.returnLearn];

    // Completed with guess and finished logic && today's clue
  } else if (isSolution && showLogic && isTodayClue) {
    messageButton = [buttons.shareScore, buttons.endClueHint];

    // Completed with guess and finished logic &&  is not today's clue
  } else if (isSolution && showLogic && !isTodayClue) {
    messageButton = [buttons.endClueHint];

    // Completed with guess, more clues && today's clue
  } else if (checkAns && isCorrectAns && isTodayClue) {
    messageButton = [
      buttons.endClueShowLogic,
      buttons.shareScore,
      buttons.endClueGuess,
    ];

    // Completed with guess, more clues && is not today's clue
  } else if (checkAns && isCorrectAns && !isTodayClue) {
    messageButton = [buttons.endClueShowLogic, buttons.endClueGuess];

    // Continue showing logic
  } else if (showLogic && !activeClue.hints[nextHint].reveals) {
    messageButton = [buttons.nextLogic];

    // Completed with hint reveal && today's clue
  } else if (
    isSolution &&
    !showLogic &&
    solutionRevealedViaHint &&
    isTodayClue
  ) {
    messageButton = [buttons.shareScore, buttons.endClueHint];

    // Completed with hint reveal && not today's clue
  } else if (
    isSolution &&
    !showLogic &&
    solutionRevealedViaHint &&
    !isTodayClue
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

  return (
    <div
      className={`message ${messageStyle} bg-white dark:!bg-neutral-800 dark:!text-neutral-100`}
      ref={msgContainer}
    >
      {checkAns && isCorrectAns && !isReturningCompleted && <Celebration />}
      {message && !hideMessageForTooltip && (
        <div className={"message-copy lc-container"}>
          {message}
          {explainer && (!checkAns || isCorrectAns) && (
            <div className={"explainer"}>{explainer}</div>
          )}
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
