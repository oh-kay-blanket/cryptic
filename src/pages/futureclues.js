import React, {
  useRef,
  createRef,
  useContext,
  useState,
  useEffect,
} from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import { UserContext } from "../utils/UserContext";
import ScoreGrid from "../components/ScoreGrid";

// Difficulty grid component
const DifficultyGrid = ({ difficulty }) => (
  <div
    className={`difficulty-grid difficulty-${difficulty}`}
    aria-label={`Difficulty ${difficulty}`}
  >
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        className={`difficulty-square ${i < difficulty ? "filled" : ""}`}
      />
    ))}
  </div>
);

const Clues = ({ data }) => {
  const cluesData = data.allCluesJson.nodes;
  const { completedClues, removeCompletedClue } = useContext(UserContext);

  // Track dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hoveredClue, setHoveredClue] = useState(null);
  const [hoveredRelease, setHoveredRelease] = useState(null);
  const [pinnedClue, setPinnedClue] = useState(null);

  // Dismiss pinned clue when clicking outside
  useEffect(() => {
    if (!pinnedClue) return;

    const handleClickOutside = (e) => {
      if (!e.target.closest('.archive-clue')) {
        setPinnedClue(null);
        setHoveredClue(null);
        setHoveredRelease(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [pinnedClue]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initial check
      setIsDarkMode(document.documentElement.classList.contains("dark"));

      // Watch for dark mode changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "class") {
            setIsDarkMode(document.documentElement.classList.contains("dark"));
          }
        });
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      return () => observer.disconnect();
    }
  }, []);

  let tilesRef = useRef(cluesData.map(() => createRef()));

  // only future clues
  let archiveTiles = cluesData.filter((clue) => {
    function isTodayOrAfter(date1Str) {
      const date1 = new Date(date1Str);
      const date2 = new Date();

      // Strip time part by setting hours, minutes, seconds, and milliseconds to zero
      const d1 = new Date(
        date1.getFullYear(),
        date1.getMonth(),
        date1.getDate(),
      );
      const d2 = new Date(
        date2.getFullYear(),
        date2.getMonth(),
        date2.getDate(),
      );

      // Compare the two dates
      if (d1.getTime() === d2.getTime()) {
        return false; // Same day
      } else if (d1.getTime() < d2.getTime()) {
        return false; // date1 is before date2
      } else {
        return true; // date1 is after date2
      }
    }

    return isTodayOrAfter(clue.release);
  });

  archiveTiles = archiveTiles
    .map((clue, index) => {
      const getRelease = (release) => new Date(release);

      const completedClue = completedClues.find(
        (c) => c.id === clue.clid || c.clid === clue.clid,
      );

      const stats = completedClue && (
        <div className="tile-stats-cell">
          <ScoreGrid
            solveTime={completedClue.solveTime}
            guesses={completedClue.guesses || 0}
            hints={completedClue.hints || 0}
          />
        </div>
      );

      const isHovered = hoveredClue === clue.clid || pinnedClue === clue.clid;
      const isReleaseHovered = hoveredRelease === clue.clid;

      return (
        <div
          className={`archive-clue${
            !!completedClue && completedClue.how === "g" ? " completed" : ""
          } ${
            !!completedClue && completedClue.how === "g" ? completedClue.how : ""
          }`}
          key={clue.id}
        >
          <div
            className={`archive-release ${
              isReleaseHovered ? "archive-release-hovered" : ""
            }`}
            style={{
              cursor: "pointer",
              "--hover-bg": isDarkMode ? "#404040" : "#ddd",
              "--hover-border": isDarkMode ? "#404040" : "#ddd",
              ...(completedClue
                ? {
                    "--archive-bg": completedClue.how === "g"
                      ? "var(--lc-active-bg-light)"
                      : "var(--lc-highlight-bg-light)",
                  }
                : {}),
            }}
            onMouseEnter={() => {
              if (!pinnedClue) {
                setHoveredClue(clue.clid);
                setHoveredRelease(clue.clid);
              }
            }}
            onMouseLeave={() => {
              if (pinnedClue !== clue.clid) {
                setHoveredClue(null);
                setHoveredRelease(null);
              }
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (pinnedClue === clue.clid) {
                setPinnedClue(null);
                setHoveredClue(null);
                setHoveredRelease(null);
              } else {
                setPinnedClue(clue.clid);
                setHoveredClue(clue.clid);
                setHoveredRelease(clue.clid);
              }
            }}
          >
            <span className="archive-release-dow">
              {getRelease(clue.release).toLocaleString("en-us", {
                weekday: "short",
              })}
              <DifficultyGrid difficulty={clue.difficulty} />
            </span>
            <span>
              <span>
                {getRelease(clue.release).toLocaleString("en-us", {
                  month: "short",
                })}
              </span>
              &nbsp;
              <span>{getRelease(clue.release).getDate()}</span>
            </span>
            <span>{getRelease(clue.release).getFullYear()}</span>
          </div>
          <Link
            to={`/clues/${clue.clid}`}
            className="archive-tile-link"
            onClick={(e) => {
              if (pinnedClue === clue.clid) {
                e.preventDefault();
                setPinnedClue(null);
                setHoveredClue(null);
                setHoveredRelease(null);
              } else {
                window.scrollTo(0, 0);
              }
            }}
          >
            <div
              id={clue.id}
              className={`archive-tile border border-[#ddd] dark:!border-[#404040] hover:dark:!bg-neutral-700 hover:dark:!border-neutral-800 `}
              ref={tilesRef.current[index]}
              style={{
                ...(isHovered
                  ? {
                      backgroundColor: "transparent",
                    }
                  : {}),
                ...(!isHovered && isReleaseHovered &&
                !!completedClue &&
                completedClue.how === "g"
                  ? {
                      // For completed clues: subtle warm gray
                      backgroundColor: isDarkMode ? "#3d3a37" : "#eae7e2",
                    }
                  : {}),
                ...(!isHovered && isReleaseHovered &&
                (!completedClue || completedClue.how !== "g")
                  ? {
                      // For incomplete clues: subtle gray background
                      backgroundColor: isDarkMode ? "#404040" : "#ddd",
                    }
                  : {}),
              }}
            >
              {!isHovered &&
                !!completedClue &&
                completedClue.how === "g" && (
                <div className="tile-img-stats">
                  {stats}
                </div>
              )}
              {isHovered ? (
                <div className="tile-info">
                  {!!completedClue && completedClue.how === "g" ? (
                    <div className="tile-info-stats">
                      <ScoreGrid
                        solveTime={completedClue.solveTime}
                        guesses={completedClue.guesses || 0}
                        hints={completedClue.hints || 0}
                        size="md"
                        showLabels
                      />
                      <div className="tile-info-meta">
                        <span>#{clue.clid} · by {clue.source?.value || "Unknown"}</span>
                        <button
                          className="tile-clear-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeCompletedClue(clue.clid);
                          }}
                          aria-label="Clear completion"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span className="text-md">
                      Clue #{clue.clid} · by {clue.source?.value || "Unknown"}
                    </span>
                  )}
                </div>
              ) : (
                <span className="tile-name">{clue.clue.value}</span>
              )}
            </div>
          </Link>
        </div>
      );
    })
    .reverse();

  return (
    <Layout>
      <div className="clues lc-container">
        <div className="clues-grid">{archiveTiles}</div>
      </div>
    </Layout>
  );
};

export default Clues;

export const Head = () => (
  <>
    <meta name="robots" content="noindex, nofollow" />
  </>
);

export const query = graphql`
  query {
    allCluesJson {
      nodes {
        clue {
          value
        }
        source {
          value
        }
        type
        difficulty
        release
        clid
        id
      }
    }
  }
`;
