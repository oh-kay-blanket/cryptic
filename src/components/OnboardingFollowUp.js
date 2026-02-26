import React, { useState, useEffect, useContext } from "react";
import { Link } from "gatsby";
import { createPortal } from "react-dom";
import { UserContext } from "../utils/UserContext";

const OnboardingFollowUp = ({ wasSolved, onDismiss }) => {
  const { setHasCompletedFirstClue } = useContext(UserContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDismiss = () => {
    setHasCompletedFirstClue(true);
    if (onDismiss) {
      onDismiss();
    }
  };

  const handleLinkClick = () => {
    setHasCompletedFirstClue(true);
  };

  if (!mounted) return null;

  const content = wasSolved ? (
    // Success variant - user solved the clue
    <div className="onboarding-followup">
      <div className="onboarding-followup-content">
        <p className="onboarding-followup-title">Nice work!</p>
        <p className="onboarding-followup-message">
          Want to learn about the different types of cryptic clues?
        </p>
        <div className="onboarding-followup-buttons">
          <button
            className="onboarding-btn onboarding-btn-skip"
            onClick={handleDismiss}
          >
            Maybe later
          </button>
          <Link
            to="/learn#learn-types"
            className="onboarding-btn onboarding-btn-next"
            onClick={handleLinkClick}
          >
            Explore clue types
          </Link>
        </div>
      </div>
    </div>
  ) : (
    // Revealed variant - user revealed the solution
    <div className="onboarding-followup">
      <div className="onboarding-followup-content">
        <p className="onboarding-followup-title">No worries!</p>
        <p className="onboarding-followup-message">
          Practice makes perfect. Try some easier clues to build your skills.
        </p>
        <div className="onboarding-followup-buttons">
          <button
            className="onboarding-btn onboarding-btn-skip"
            onClick={handleDismiss}
          >
            Maybe later
          </button>
          <Link
            to="/clues?difficulty=1"
            className="onboarding-btn onboarding-btn-next"
            onClick={handleLinkClick}
          >
            Practice easy clues
          </Link>
        </div>
      </div>
    </div>
  );

  return createPortal(
    <div className="onboarding-followup-overlay">{content}</div>,
    document.body
  );
};

export default OnboardingFollowUp;
