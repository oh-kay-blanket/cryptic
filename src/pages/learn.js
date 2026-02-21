import React, { useContext, useEffect } from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import ButtonContainer from "../components/bottom/ButtonContainer";

import { UserContext } from "../utils/UserContext";
import { isTodayClue } from "../utils/dateHelpers";

import typePill from "../assets/img/learn/type-pill-reveal.png";
import showHint from "../assets/img/learn/show-hint.png";
import reveal from "../assets/img/learn/reveal.png";
import difficulty from "../assets/img/learn/difficulty.png";

const Learn = ({ data }) => {
  const { typeViewed } = useContext(UserContext);
  const cluesData = data.allCluesJson.nodes;
  const todayClue = cluesData.find(isTodayClue);

  // buttons
  const buttons = {
    todayClue: {
      path: `/clues/${todayClue.clid}`,
      name: "Play today's clue",
      style: "primary",
    },
    allClues: {
      path: "/clues",
      name: "See all clues",
      style: "secondary",
    },
  };
  const btnArr = [buttons.todayClue, buttons.allClues];

  const typesArr = [
    { name: "Anagram", id: "anagram" },
    { name: "Charade", id: "charade" },
    { name: "Container", id: "container" },
    { name: "Deletion", id: "deletion" },
    { name: "Double Definition", id: "double-definition" },
    { name: "Hidden Word", id: "hidden-word" },
    { name: "Homophone", id: "homophone" },
    { name: "Initialism", id: "initialism" },
    { name: "Letter Bank", id: "letter-bank" },
    { name: "Reversal", id: "reversal" },
    { name: "Spoonerism", id: "spoonerism" },
    { name: "& Lit.", id: "lit" },
    { name: "Combination", id: "combination" },
  ];

  const types = typesArr.map((type) => {
    const isViewed = typeViewed.find((viewed) => viewed === type.id);
    return (
      <li
        key={type.id}
        className={
          isViewed
            ? "viewed dark:!bg-[#47387b] dark:!border-[#47387b] dark:!text-white"
            : ""
        }
      >
        <Link to={type.id}>{type.name}</Link>
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
        <h1 className="text-3xl font-bold my-4">Learn Cryptic Crosswords</h1>
        <div className="learn-section">
          <h2 className="text-2xl font-bold my-4">
            What is a cryptic crossword?
          </h2>
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

        <div className="learn-section">
          <h2 className="text-2xl font-bold my-4">What is Learn Cryptic?</h2>
          <p className="my-2">
            Learn Cryptic is a daily game that teaches the cryptic-curious how
            to decipher clues.
          </p>
          <p className="my-2">
            As with regular (American-style) crosswords, it takes a lot of
            practice to get good at solving cryptic puzzles. For beginners, the
            learning curve can be steep. There are several kinds of hints to
            help guide you:
          </p>
          <ul className="no-dec">
            <li className="mt-4">
              <p className="font-bold">Clue type</p>
              <p className="my-2">
                At the top left of the screen, purple pills tell you the type(s)
                of wordplay used. A single clue can use as many as four
                different types of wordplay. Tap the pills to learn about each
                type. Tap the eye to toggle this feature off and on.
              </p>
              <img className="border" src={typePill} alt="Screenshot showing purple clue type pills that reveal the wordplay type used in each cryptic clue" />
            </li>
            <li className="mt-4">
              <p className="font-bold">Hints</p>
              <p className="my-2">
                The "Show hint" and "Reveal solution" buttons guide you through
                each step of deciphering the clue. If you've correctly guessed
                the solution but you're not sure how the clue works, press the
                "Show logic" button to be guided through the steps.{" "}
              </p>
              <img className="border" src={showHint} alt="Screenshot showing the Show hint and Reveal solution buttons that guide you through solving cryptic clues" />
            </li>
            <li className="mt-4">
              <p className="font-bold">Reveal letter</p>
              <p className="my-2">
                Need help with just one letter? Tap any blank square in the
                solution box to reveal that specific letter.
              </p>
              <img className="border" src={reveal} alt="Screenshot showing how to tap a blank square to reveal a single letter in the solution" />
            </li>
            <li className="mt-4">
              <p className="font-bold">Difficulty</p>
              <p className="my-2">
                A new clue is released each day. They progress in difficulty as
                the week goes on—Monday's are the easiest clues, while Sunday's
                are the trickiest. The difficulty indicator will tell you how
                challenging a clue might be.
              </p>
              <img className="border" src={difficulty} alt="Screenshot showing the difficulty indicator that rates clues from easy Monday puzzles to challenging Sunday puzzles" />
            </li>
          </ul>
        </div>

        <div id="learn-types" className="learn-section">
          <h2 className="text-2xl font-bold my-4">
            What different types of wordplay will I find?
          </h2>
          <p className="mb-3">Tap a type below to explore:</p>
          <ul className="learn-types no-dec">{types}</ul>
        </div>

        <div className="learn-section">
          <h2 className="text-2xl font-bold my-4">
            Anything else I should know?
          </h2>
          <p className="mb-3">
            You now know the basics of cryptic crosswords, let's dive in!
          </p>
          <div className="mt-4">
            <ButtonContainer btnArr={btnArr} stack={true} />
          </div>
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

export const query = graphql`
  query {
    allCluesJson {
      nodes {
        release
        clid
      }
    }
  }
`;
