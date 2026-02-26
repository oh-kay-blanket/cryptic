import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const OnboardingSpotlight = ({ targetRect, padding = 8 }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !targetRect) return null;

  // Calculate the spotlight cutout coordinates with padding
  const x = targetRect.left - padding;
  const y = targetRect.top - padding;
  const width = targetRect.width + padding * 2;
  const height = targetRect.height + padding * 2;
  const borderRadius = 8;

  // Create clip-path polygon that covers the entire viewport except the spotlight area
  // Uses a technique where we draw a path around the viewport and then cut out the spotlight
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // SVG approach for rounded rectangle cutout
  const spotlight = (
    <div className="onboarding-spotlight">
      <svg
        width="100%"
        height="100%"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
        }}
      >
        <defs>
          <mask id="spotlight-mask">
            {/* White = visible, Black = hidden */}
            <rect width="100%" height="100%" fill="white" />
            <rect
              x={x}
              y={y}
              width={width}
              height={height}
              rx={borderRadius}
              ry={borderRadius}
              fill="black"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.7)"
          mask="url(#spotlight-mask)"
          style={{ pointerEvents: "auto" }}
        />
      </svg>
    </div>
  );

  return createPortal(spotlight, document.body);
};

export default OnboardingSpotlight;
