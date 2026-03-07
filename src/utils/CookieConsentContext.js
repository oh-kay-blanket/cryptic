import React, { createContext, useState, useEffect, useMemo, useCallback, useRef } from "react";

const GA_TRACKING_ID = "G-FMM13GJQK3";

export const CookieConsentContext = createContext({
  hasConsent: null,
  consentTimestamp: null,
  acceptCookies: () => {},
  declineCookies: () => {},
  withdrawConsent: () => {},
});

export const CookieConsentProvider = ({ children }) => {
  const gaInitialized = useRef(false);

  const [consentState, setConsentState] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lcCookieConsent");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          return { hasConsent: null, consentTimestamp: null };
        }
      }
    }
    return { hasConsent: null, consentTimestamp: null };
  });

  // Save to localStorage whenever consent state changes
  useEffect(() => {
    if (typeof window !== "undefined" && consentState.hasConsent !== null) {
      localStorage.setItem("lcCookieConsent", JSON.stringify(consentState));
    }
  }, [consentState]);

  // Initialize GA with Consent Mode on mount
  useEffect(() => {
    if (typeof window === "undefined" || gaInitialized.current) {
      return;
    }

    gaInitialized.current = true;

    // Initialize gtag before loading the script
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    // Set default consent state BEFORE loading GA
    // This enables Consent Mode - GA will send anonymized pings even when denied
    const defaultConsent = consentState.hasConsent === true ? "granted" : "denied";
    window.gtag("consent", "default", {
      analytics_storage: defaultConsent,
      ad_storage: "denied", // We don't use ads, always deny
      wait_for_update: 500, // Wait up to 500ms for consent update
    });

    // Load gtag.js script
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize GA
    window.gtag("js", new Date());
    window.gtag("config", GA_TRACKING_ID, {
      cookie_expires: 0,
      send_page_view: true,
    });
  }, []);

  // Update consent when user makes a choice
  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) {
      return;
    }

    // Only update if user has made a decision
    if (consentState.hasConsent === null) {
      return;
    }

    const consentValue = consentState.hasConsent ? "granted" : "denied";
    window.gtag("consent", "update", {
      analytics_storage: consentValue,
    });
  }, [consentState.hasConsent]);

  const acceptCookies = useCallback(() => {
    setConsentState({
      hasConsent: true,
      consentTimestamp: new Date().toISOString(),
    });
  }, []);

  const declineCookies = useCallback(() => {
    setConsentState({
      hasConsent: false,
      consentTimestamp: new Date().toISOString(),
    });
  }, []);

  const withdrawConsent = useCallback(() => {
    // Update GA consent to denied
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }

    // Clear GA cookies
    if (typeof document !== "undefined") {
      const cookies = document.cookie.split(";");
      for (const cookie of cookies) {
        const [name] = cookie.trim().split("=");
        if (name.startsWith("_ga") || name.startsWith("_gid") || name.startsWith("_gat")) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
      }
    }

    // Clear consent from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("lcCookieConsent");
    }

    // Reset state
    setConsentState({
      hasConsent: null,
      consentTimestamp: null,
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      hasConsent: consentState.hasConsent,
      consentTimestamp: consentState.consentTimestamp,
      acceptCookies,
      declineCookies,
      withdrawConsent,
    }),
    [consentState.hasConsent, consentState.consentTimestamp, acceptCookies, declineCookies, withdrawConsent]
  );

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}
    </CookieConsentContext.Provider>
  );
};
