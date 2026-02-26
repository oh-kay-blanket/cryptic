import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const OnboardingTooltip = ({
  step,
  totalSteps,
  message,
  targetRect,
  onNext,
  onBack,
  onSkip,
  isLastStep,
}) => {
  const tooltipRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState("bottom"); // "bottom" or "top"
  const [arrowOffset, setArrowOffset] = useState(50);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate tooltip position based on target element
  useEffect(() => {
    if (!mounted || !targetRect || !tooltipRef.current) return;

    const tooltip = tooltipRef.current;
    const tooltipRect = tooltip.getBoundingClientRect();
    const padding = 16;
    const arrowHeight = 10;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate center of target
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;

    // Try positioning above the target first
    let top = targetRect.top - tooltipRect.height - arrowHeight - 8;
    let arrow = "bottom";

    // If not enough space above, position below
    if (top < padding) {
      top = targetRect.bottom + arrowHeight + 8;
      arrow = "top";
    }

    // If still not enough space below, center vertically
    if (top + tooltipRect.height > viewportHeight - padding) {
      top = Math.max(padding, (viewportHeight - tooltipRect.height) / 2);
    }

    // Calculate horizontal position (centered on target)
    let left = targetCenterX - tooltipRect.width / 2;

    // Clamp to viewport bounds
    if (left < padding) {
      left = padding;
    } else if (left + tooltipRect.width > viewportWidth - padding) {
      left = viewportWidth - padding - tooltipRect.width;
    }

    // Calculate arrow offset to point at target center
    const arrowLeftPx = targetCenterX - left;
    const arrowOffsetPercent = (arrowLeftPx / tooltipRect.width) * 100;
    const clampedArrowOffset = Math.max(10, Math.min(90, arrowOffsetPercent));

    setPosition({ top, left });
    setArrowPosition(arrow);
    setArrowOffset(clampedArrowOffset);
  }, [mounted, targetRect, step]);

  if (!mounted || !targetRect) return null;

  const tooltip = (
    <div
      ref={tooltipRef}
      className={`onboarding-tooltip onboarding-tooltip-arrow-${arrowPosition}`}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        zIndex: 10001,
      }}
    >
      <div className="onboarding-tooltip-content">
        <div className="onboarding-tooltip-step">
          Step {step + 1} of {totalSteps}
        </div>
        <div
          className="onboarding-tooltip-message"
          dangerouslySetInnerHTML={{ __html: message }}
        />
        <div className="onboarding-tooltip-buttons">
          <button
            className="onboarding-btn onboarding-btn-skip"
            onClick={onSkip}
          >
            Skip
          </button>
          {step > 0 && (
            <button
              className="onboarding-btn onboarding-btn-back"
              onClick={onBack}
            >
              Back
            </button>
          )}
          <button
            className="onboarding-btn onboarding-btn-next"
            onClick={onNext}
          >
            {isLastStep ? "Done" : "Next"}
          </button>
        </div>
      </div>
      <div
        className="onboarding-tooltip-arrow"
        style={{ left: `${arrowOffset}%` }}
      />
    </div>
  );

  return createPortal(tooltip, document.body);
};

export default OnboardingTooltip;
