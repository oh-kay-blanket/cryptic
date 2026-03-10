import React, { useContext } from "react";
import Layout from "../components/layout";
import { CookieConsentContext } from "../utils/CookieConsentContext";

const Privacy = () => {
  const { hasConsent, acceptCookies, withdrawConsent } = useContext(CookieConsentContext);

  const getConsentStatusText = () => {
    if (hasConsent === true) return "Accepted";
    if (hasConsent === false) return "Declined";
    return "Not yet decided";
  };

  const getConsentIndicatorClass = () => {
    if (hasConsent === true) return "consented";
    if (hasConsent === false) return "declined";
    return "undecided";
  };

  return (
    <Layout>
      <div className="privacy lc-container">
        <h1>Privacy Policy</h1>
        <p className="privacy-last-updated">Last updated: March 2025</p>

        <p>
          Learn Cryptic ("we", "us", "our") is committed to protecting your privacy. This policy
          explains what data we collect, how we use it, and your rights regarding your personal
          information.
        </p>

        <h2>Data We Collect</h2>

        <h3>Local Storage Data</h3>
        <p>
          We store the following data locally on your device using your browser's localStorage.
          This data never leaves your device unless you create an account:
        </p>
        <ul>
          <li>Game progress (completed clues, hints used, solve times)</li>
          <li>Your current streak and longest streak</li>
          <li>Display preferences (dark mode, clue type visibility)</li>
          <li>Onboarding completion status</li>
          <li>Unlocked achievements</li>
        </ul>

        <h3>Account Data (Optional)</h3>
        <p>
          If you choose to create an account, we collect and store:
        </p>
        <ul>
          <li>Email address</li>
          <li>Encrypted password (we cannot read your password)</li>
          <li>Your game progress synced across devices</li>
        </ul>
        <p>
          Account data is stored securely using Supabase, a trusted cloud database provider.
          Creating an account is entirely optional and the app works fully without one.
        </p>

        <h3>Analytics Data (With Your Consent)</h3>
        <p>
          With your consent, we use Google Analytics to collect anonymised usage data to help us
          improve the site. This includes:
        </p>
        <ul>
          <li>Pages visited</li>
          <li>Time spent on pages</li>
          <li>General location (country/region level)</li>
          <li>Device type and browser</li>
          <li>Clue completion statistics (aggregate only)</li>
        </ul>
        <p>
          We do not track individual users or build profiles. Analytics data is used solely to
          understand how people use Learn Cryptic so we can make it better.
        </p>

        <h2>Your Cookie Preferences</h2>

        <div className="privacy-consent-section">
          <div className="privacy-consent-status">
            <span className={`privacy-consent-indicator ${getConsentIndicatorClass()}`} />
            <span>Current status: {getConsentStatusText()}</span>
          </div>

          <div className="privacy-consent-buttons">
            {hasConsent !== true && (
              <button
                onClick={acceptCookies}
                className="privacy-consent-button accept"
              >
                Accept Analytics Cookies
              </button>
            )}
            {hasConsent === true && (
              <button
                onClick={withdrawConsent}
                className="privacy-consent-button withdraw"
              >
                Withdraw Consent
              </button>
            )}
          </div>
        </div>

        <h2>Your Rights</h2>

        <p>Under UK GDPR, you have the right to:</p>
        <ul>
          <li>
            <strong>Access</strong> - Request a copy of the personal data we hold about you
          </li>
          <li>
            <strong>Rectification</strong> - Request correction of inaccurate data
          </li>
          <li>
            <strong>Erasure</strong> - Request deletion of your data ("right to be forgotten")
          </li>
          <li>
            <strong>Portability</strong> - Request your data in a portable format
          </li>
          <li>
            <strong>Withdraw consent</strong> - Withdraw your consent for analytics at any time
            using the button above
          </li>
        </ul>
        <p>
          For local storage data, you can clear this yourself using your browser's settings
          (Clear site data for learncryptic.com).
        </p>

        <h2>Third Parties</h2>

        <h3>Google Analytics</h3>
        <p>
          We use Google Analytics 4 to collect anonymised usage statistics. Google Analytics only
          loads after you give consent. You can learn more about how Google handles data in
          their{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          .
        </p>

        <h3>Supabase</h3>
        <p>
          If you create an account, your data is stored using Supabase. You can read their{" "}
          <a
            href="https://supabase.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          .
        </p>

        <h3>GitHub Pages</h3>
        <p>
          This site is hosted on GitHub Pages. GitHub may collect basic server logs. See their{" "}
          <a
            href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Statement
          </a>
          .
        </p>

        <h2>Data Retention</h2>
        <p>
          Local storage data remains on your device until you clear it. If you have an account,
          your data is retained until you request deletion. Analytics data is retained for 14
          months as per Google Analytics defaults.
        </p>

        <h2>Contact Us</h2>

        <div className="privacy-contact">
          <p>
            If you have any questions about this privacy policy or wish to exercise your rights,
            please contact us at:
          </p>
          <p>
            <a href="mailto:learncrypticgame@gmail.com">learncrypticgame@gmail.com</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;

export const Head = () => (
  <>
    <title>Privacy Policy | Learn Cryptic</title>
    <meta
      name="description"
      content="Learn Cryptic privacy policy. Information about data collection, cookies, analytics, and your rights under UK GDPR."
    />
    <link rel="canonical" href="https://learncryptic.com/privacy" />
  </>
);
