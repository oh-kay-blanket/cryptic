import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const OnboardingPrompt = ({ onYes, onNo }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const prompt = (
    <div className="onboarding-prompt-overlay">
      <div className="onboarding-prompt">
        <div className="onboarding-prompt-content">
          <p className="onboarding-prompt-message">
            Would you like to see a quick tutorial?
          </p>
          <div className="onboarding-prompt-buttons">
            <button
              className="onboarding-btn onboarding-btn-skip"
              onClick={onNo}
            >
              No thanks
            </button>
            <button
              className="onboarding-btn onboarding-btn-next"
              onClick={onYes}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(prompt, document.body);
};

export default OnboardingPrompt;
