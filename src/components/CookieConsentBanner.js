import React, { useContext } from "react";
import { Link } from "gatsby";
import { CookieConsentContext } from "../utils/CookieConsentContext";

const CookieConsentBanner = () => {
  const { hasConsent, isHydrated, acceptCookies, declineCookies } = useContext(CookieConsentContext);

  // Wait for hydration to avoid flash, then show only when consent is undecided
  if (!isHydrated || hasConsent !== null) {
    return null;
  }

  return (
    <div className="cookie-consent-banner" role="dialog" aria-labelledby="cookie-consent-title">
      <div className="cookie-consent-content">
        <p id="cookie-consent-title" className="cookie-consent-text">
          We use cookies to analyse site usage and improve your experience.{" "}
          <Link to="/privacy" className="cookie-consent-link">
            Learn more
          </Link>
        </p>
        <div className="cookie-consent-buttons">
          <button
            onClick={declineCookies}
            className="cookie-consent-button cookie-consent-decline"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="cookie-consent-button cookie-consent-accept"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
