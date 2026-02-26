import React, { useContext, useEffect, useState } from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import { ClueTypeIcon } from "../components/ClueTypeIcons";

import { UserContext } from "../utils/UserContext";

const Learn = () => {
  const { typeViewed } = useContext(UserContext);

  // Collapsible intro state - default collapsed for returning users
  const isReturningUser = typeViewed.length > 0;
  const [introExpanded, setIntroExpanded] = useState(!isReturningUser);

  // Types ordered by frequency (most common first)
  const typesArr = [
    { name: "Anagram", id: "anagram" },
    { name: "Charade", id: "charade" },
    { name: "Container", id: "container" },
    { name: "Deletion", id: "deletion" },
    { name: "Homophone", id: "homophone" },
    { name: "Hidden Word", id: "hidden-word" },
    { name: "Double Definition", id: "double-definition" },
    { name: "Reversal", id: "reversal" },
    { name: "Initialism", id: "initialism" },
    { name: "Letter Bank", id: "letter-bank" },
    { name: "Spoonerism", id: "spoonerism" },
    { name: "& Lit.", id: "lit" },
    { name: "Combination", id: "combination" },
  ];

  // Indicator words for each type
  const typeIndicators = {
    anagram: ["wild", "crazy", "scrambled", "mixed"],
    charade: [],
    container: ["in", "around", "holding", "inside"],
    deletion: ["losing", "without", "missing", "dropped"],
    homophone: ["heard", "sounds like", "aloud", "spoken"],
    "hidden-word": ["in", "within", "part of", "some"],
    "double-definition": [],
    reversal: ["back", "up", "returned", "flipped"],
    initialism: ["initially", "first", "starts", "heads"],
    "letter-bank": ["letters from", "using"],
    spoonerism: ["Spooner", "spoonerism"],
    lit: [],
    combination: [],
  };

  const types = typesArr.map((type) => {
    const isViewed = typeViewed.find((viewed) => viewed === type.id);
    const indicators = typeIndicators[type.id] || [];
    return (
      <li
        key={type.id}
        className={
          isViewed
            ? "viewed dark:!bg-[#47387b] dark:!border-[#47387b] dark:!text-white"
            : ""
        }
      >
        <Link to={type.id} className="flex flex-col items-center justify-center gap-1 p-2 h-full">
          <div className="w-5 h-5 flex items-center justify-center">
            <ClueTypeIcon type={type.id} className="w-full h-full" />
          </div>
          <span className="text-sm text-center">{type.name}</span>
          {indicators.length > 0 && (
            <span className="type-indicators text-xs text-center text-neutral-500 dark:text-neutral-400">
              {indicators.slice(0, 3).join(", ")}
            </span>
          )}
        </Link>
      </li>
    );
  });

  // Handle anchor link
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      // Only proceed if hash exists and is not empty
      if (hash && hash.length > 1) {
        // slight delay ensures element is present
        setTimeout(() => {
          try {
            const el = document.querySelector(hash);
            if (el) {
              el.scrollIntoView({ behavior: "instant" });
            }
          } catch (error) {
            // Silently handle any errors with scrollIntoView
            console.warn("Error scrolling to anchor:", error);
          }
        }, 10); // Increased timeout for better reliability
      }
    }
  }, []);

  return (
    <Layout>
      <div className="learn lc-container">
        <div className="learn-section learn-intro">
          <button
            className="learn-intro-header"
            onClick={() => setIntroExpanded(!introExpanded)}
            aria-expanded={introExpanded}
          >
            <h1 className="text-3xl font-bold my-4">
              What are cryptic crosswords?
            </h1>
            <span className={`chevron ${introExpanded ? "expanded" : ""}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </button>
          <div className={`learn-intro-content ${introExpanded ? "expanded" : ""}`}>
            <p className="my-2">
              In a cryptic (British-style) crossword, each clue is a little puzzle
              in itself—involving wordplay such as anagrams, homophones, hidden
              words, and other devilish tricks.
            </p>
            <p className="my-2">
              The surface reading of the clue is not important. Rather, the clue
              hints at the solution in two different ways, and thus is composed of
              two parts:
            </p>
            <ul className="no-dec">
              <li className="mt-4">
                <p className="font-bold">The definition</p>
                <p className="my-2">
                  This part of the clue is a straightforward (or thinly/thickly disguised) definition
                  of the solution. The definition always appears at the start or end of the
                  clue.
                </p>
              </li>
              <li className="mt-4">
                <p className="font-bold">The wordplay</p>
                <p className="my-2">
                  The rest of the clue is an enigmatic hint, in which
                  wordplay gives a second path to the solution.
                </p>
              </li>
            </ul>
            <p className="font-bold my-4">Example</p>
            <div className="example-container">
              <p className="example">Wild West goulash (4)</p>
              <div className="explanation dark:!bg-neutral-700 dark:!text-neutral-100">
                <ul className="mt-0 list-disc my-3">
                  <li>
                    <strong>GOULASH</strong> is the definition
                  </li>
                  <li>
                    <strong>WILD</strong> indicates an anagram of <strong>WEST</strong>
                  </li>
                  <li>
                    <strong>WEST</strong> anagrams to <strong>STEW</strong>
                  </li>
                </ul>
                <div className="solution">
                  <span className="letter">s</span>
                  <span className="letter">t</span>
                  <span className="letter">e</span>
                  <span className="letter">w</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="learn-types" className="learn-section">
          <h2 className="text-2xl font-bold my-4">
            Types of wordplay
          </h2>
          <ul className="learn-types no-dec">{types}</ul>
        </div>
      </div>
    </Layout>
  );
};

export default Learn;

export const Head = () => (
  <>
    <title>Learn Cryptic Crosswords - Complete Guide & Tutorial</title>
    <meta
      name="description"
      content="Master cryptic crosswords with our comprehensive guide. Learn anagrams, charades, containers, and more. Interactive tutorials for all skill levels."
    />
    <link rel="canonical" href="https://learncryptic.com/learn" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://learncryptic.com/learn" />
    <meta property="og:title" content="Learn Cryptic Crosswords - Complete Guide & Tutorial" />
    <meta property="og:description" content="Master cryptic crosswords with our comprehensive guide. Learn anagrams, charades, containers, and more." />
    <meta property="og:image" content="https://learncryptic.com/social.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Learn Cryptic Crosswords",
        "description": "Master cryptic crosswords with our comprehensive guide covering anagrams, charades, containers, double definitions, and more.",
        "provider": {
          "@type": "Organization",
          "name": "Learn Cryptic",
          "url": "https://learncryptic.com"
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "online",
          "courseWorkload": "PT1H"
        }
      })}
    </script>
  </>
);

