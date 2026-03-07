import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "@reach/router";
import { UserContext } from "../utils/UserContext";
import { AuthContext } from "../utils/AuthContext";

const SyncFeatureAnnouncement = ({ onSignIn, targetRef }) => {
  const { hasSeenSyncAnnouncement, setHasSeenSyncAnnouncement } = useContext(UserContext);
  const { isAuthenticated, isSupabaseConfigured } = useContext(AuthContext);
  const location = useLocation();
  const tooltipRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [arrowOffset, setArrowOffset] = useState(50);

  const isHomepage = location.pathname === "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Show tooltip if:
    // - On the homepage
    // - Supabase is configured
    // - User hasn't seen this announcement
    // - User is not already authenticated
    // - Target element exists
    if (mounted && isHomepage && isSupabaseConfigured && !hasSeenSyncAnnouncement && !isAuthenticated && targetRef?.current) {
      // Small delay for smoother UX
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, [mounted, isHomepage, isSupabaseConfigured, hasSeenSyncAnnouncement, isAuthenticated, targetRef]);

  // Calculate tooltip position
  useLayoutEffect(() => {
    if (!visible || !targetRef?.current || !tooltipRef.current) return;

    const calculatePosition = () => {
      const target = targetRef.current;
      const tooltip = tooltipRef.current;
      if (!target || !tooltip) return;

      const targetRect = target.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const padding = 12;
      const arrowHeight = 10;
      const viewportWidth = window.innerWidth;

      // Position below the target
      const top = targetRect.bottom + arrowHeight + 4;

      // Center horizontally on target, but clamp to viewport
      const targetCenterX = targetRect.left + targetRect.width / 2;
      let left = targetCenterX - tooltipRect.width / 2;

      // Clamp to viewport bounds
      if (left < padding) {
        left = padding;
      } else if (left + tooltipRect.width > viewportWidth - padding) {
        left = viewportWidth - padding - tooltipRect.width;
      }

      // Calculate arrow offset to point at target center (in pixels)
      const arrowLeftPx = targetCenterX - left;
      // Clamp arrow to stay within tooltip bounds (with 15px padding from edges)
      const clampedArrowPx = Math.max(15, Math.min(tooltipRect.width - 15, arrowLeftPx));

      setPosition({ top, left });
      setArrowOffset(clampedArrowPx);
    };

    calculatePosition();
    const frameId = requestAnimationFrame(calculatePosition);

    // Recalculate on resize
    window.addEventListener('resize', calculatePosition);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [visible, targetRef]);

  const handleDismiss = () => {
    setVisible(false);
    setHasSeenSyncAnnouncement(true);
  };

  const handleSignIn = () => {
    setVisible(false);
    setHasSeenSyncAnnouncement(true);
    if (onSignIn) onSignIn();
  };

  if (!mounted || !visible) return null;

  const tooltip = (
    <div
      ref={tooltipRef}
      className="sync-tooltip"
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        zIndex: 10001,
      }}
    >
      <div
        className="sync-tooltip-arrow"
        style={{ left: `${arrowOffset}px` }}
      />
      <div className="sync-tooltip-content">
        <p className="sync-tooltip-title">New: Save your progress</p>
        <p className="sync-tooltip-message">
          Sync stats and streaks across devices
        </p>
        <div className="sync-tooltip-buttons">
          <button
            className="onboarding-btn onboarding-btn-skip"
            onClick={handleDismiss}
          >
            Dismiss
          </button>
          <button
            className="onboarding-btn onboarding-btn-next"
            onClick={handleSignIn}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(tooltip, document.body);
};

export default SyncFeatureAnnouncement;
