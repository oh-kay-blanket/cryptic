import React, { useState, useEffect, useCallback, useContext } from "react";
import OnboardingSpotlight from "./OnboardingSpotlight";
import OnboardingTooltip from "./OnboardingTooltip";
import { UserContext } from "../utils/UserContext";

// Guide steps configuration
const GUIDE_STEPS = [
  {
    target: "clueTextRef",
    message:
      'Each cryptic clue has TWO parts: a <strong>definition</strong> (always at the start or end) and <strong>wordplay</strong> that hints at the answer. Ignore the surface meaning - it\'s designed to mislead!',
    padding: 8,
  },
  {
    target: "type-pills",
    message:
      'These tags reveal what type of wordplay is used. Tap the <strong>eye icon</strong> to show/hide them. Tap a tag for more info.',
    padding: 8,
  },
  {
    target: "solSectionRef",
    message:
      "Type your answer here using the keyboard.",
    padding: 8,
  },
  {
    target: "hint-button",
    message:
      'Stuck? Tap the <strong>lightbulb</strong> for step-by-step hints that break down the wordplay.',
    padding: 8,
  },
  {
    target: "solution-squares",
    message:
      "You can tap any empty square to reveal that letter - useful when you're almost there!",
    padding: 8,
  },
  {
    target: "difficulty-grid",
    message:
      "Clues get harder through the week. Monday is easiest, Sunday is trickiest.",
    padding: 8,
  },
];

const OnboardingGuide = ({ isVisible, onComplete }) => {
  const { setHasSeenOnboarding } = useContext(UserContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState(null);

  // Handle completion (skip or finish)
  const handleComplete = useCallback(() => {
    setHasSeenOnboarding(true);
    if (onComplete) {
      onComplete();
    }
  }, [setHasSeenOnboarding, onComplete]);

  // Get the target element for the current step
  const getTargetElement = useCallback((stepIndex) => {
    const step = GUIDE_STEPS[stepIndex];
    if (!step) return null;

    let element = null;

    switch (step.target) {
      case "clueTextRef":
        element = document.getElementById("clueTextRef");
        break;
      case "type-pills":
        // Find the type pills container (ul.type element)
        element = document.querySelector(".clue .type");
        break;
      case "solSectionRef":
        element = document.getElementById("solSectionRef");
        break;
      case "hint-button":
        element = document.querySelector(".hint-button");
        // If hint button isn't visible (clue completed), skip to solution squares
        if (!element) {
          return null;
        }
        break;
      case "solution-squares":
        // Target the first solution square
        element = document.getElementById("i0");
        break;
      case "difficulty-grid":
        element = document.querySelector(".difficulty-grid");
        break;
      default:
        element = document.getElementById(step.target);
    }

    return element;
  }, []);

  // Update target rect when step changes or window resizes
  const updateTargetRect = useCallback(() => {
    const element = getTargetElement(currentStep);
    if (element) {
      const rect = element.getBoundingClientRect();
      setTargetRect(rect);
    } else {
      // If target element doesn't exist, skip to next step
      if (currentStep < GUIDE_STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleComplete();
      }
    }
  }, [currentStep, getTargetElement, handleComplete]);

  useEffect(() => {
    if (!isVisible) return;

    // Initial update
    updateTargetRect();

    // Update on resize and scroll
    window.addEventListener("resize", updateTargetRect);
    window.addEventListener("scroll", updateTargetRect, true);

    return () => {
      window.removeEventListener("resize", updateTargetRect);
      window.removeEventListener("scroll", updateTargetRect, true);
    };
  }, [isVisible, updateTargetRect]);

  // Handle next step
  const handleNext = useCallback(() => {
    if (currentStep < GUIDE_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  }, [currentStep, handleComplete]);

  // Handle back step
  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  // Handle skip
  const handleSkip = useCallback(() => {
    handleComplete();
  }, [handleComplete]);

  if (!isVisible || !targetRect) return null;

  const currentStepConfig = GUIDE_STEPS[currentStep];

  return (
    <>
      <OnboardingSpotlight
        targetRect={targetRect}
        padding={currentStepConfig.padding}
      />
      <OnboardingTooltip
        step={currentStep}
        totalSteps={GUIDE_STEPS.length}
        message={currentStepConfig.message}
        targetRect={targetRect}
        onNext={handleNext}
        onBack={handleBack}
        onSkip={handleSkip}
        isLastStep={currentStep === GUIDE_STEPS.length - 1}
      />
    </>
  );
};

export default OnboardingGuide;
