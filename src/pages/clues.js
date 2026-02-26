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
import { formatTime } from "../utils/dateHelpers";

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

// Filter modal component
const FilterModal = ({ open, onClose, children }) => {
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    if (open) {
      document.addEventListener("wheel", preventDefault, { passive: false });
      document.addEventListener("touchmove", preventDefault, {
        passive: false,
      });
    }
    return () => {
      document.removeEventListener("wheel", preventDefault);
      document.removeEventListener("touchmove", preventDefault);
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

// Filter icon component
const FilterIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block"
  >
    <path
      d="M3 4.5h18M6 12h12M9 19.5h6"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

// Book icon component
const BookIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block"
  >
    <path
      d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Clues = ({ data, location }) => {
  const cluesData = data.allCluesJson.nodes;
  const { completedClues } = useContext(UserContext);

  // Read initial filter values from URL parameters
  const getInitialFilter = (paramName, defaultValue) => {
    if (typeof window !== "undefined" && location?.search) {
      const params = new URLSearchParams(location.search);
      return params.get(paramName) || defaultValue;
    }
    return defaultValue;
  };

  // Track dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hoveredClue, setHoveredClue] = useState(null);
  const [hoveredRelease, setHoveredRelease] = useState(null);

  // Filter state - initialize from URL params if present
  const [difficultyFilter, setDifficultyFilter] = useState(() => getInitialFilter("difficulty", "all"));
  const [authorFilter, setAuthorFilter] = useState("all");
  const [unsolvedFilter, setUnsolvedFilter] = useState(false);
  const [typeFilter, setTypeFilter] = useState(() => getInitialFilter("type", "all"));
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  // Get unique authors and types for filter dropdowns
  const uniqueAuthors = [
    ...new Set(cluesData.map((c) => c.source?.value).filter(Boolean)),
  ].sort();
  const uniqueTypes = [
    ...new Set(
      cluesData
        .flatMap((c) => (c.type ? c.type.split(", ").map((t) => t.trim()) : []))
        .filter(Boolean),
    ),
  ].sort();

  // Read URL params on mount (for client-side navigation)
  useEffect(() => {
    if (typeof window !== "undefined" && location?.search) {
      const params = new URLSearchParams(location.search);
      const typeParam = params.get("type");
      const difficultyParam = params.get("difficulty");
      if (typeParam) setTypeFilter(typeParam);
      if (difficultyParam) setDifficultyFilter(difficultyParam);
    }
  }, [location?.search]);

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

  // Helper function to check if clue is today or before
  const isTodayOrBefore = (date1Str) => {
    const date1 = new Date(date1Str);
    const date2 = new Date();
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return d1.getTime() <= d2.getTime();
  };

  // Filter clues
  let archiveTiles = cluesData.filter((clue) => {
    // Only past clues
    if (!isTodayOrBefore(clue.release)) return false;

    // Difficulty filter
    if (
      difficultyFilter !== "all" &&
      String(clue.difficulty) !== difficultyFilter
    ) {
      return false;
    }

    // Author filter
    if (authorFilter !== "all" && clue.source?.value !== authorFilter) {
      return false;
    }

    // Type filter
    if (typeFilter !== "all") {
      const clueTypes = clue.type
        ? clue.type.split(", ").map((t) => t.trim())
        : [];
      if (!clueTypes.includes(typeFilter)) {
        return false;
      }
    }

    // Unsolved filter
    if (unsolvedFilter) {
      const completedClue = completedClues.find(
        (c) => c.id === clue.clid || c.clid === clue.clid,
      );
      if (completedClue && completedClue.how === "g") {
        return false;
      }
    }

    return true;
  });

  archiveTiles = archiveTiles.map((clue, index) => {
    const getRelease = (release) => new Date(release);

    const completedClue = completedClues.find(
      (c) => c.id === clue.clid || c.clid === clue.clid,
    );

    const stats = completedClue && (
      <div className="tile-stats-cell">
        <span className="stat-guesses">{completedClue.guesses}g</span>
        <span className="stat-hints">{completedClue.hints}h</span>
        {completedClue.solveTime != null && (
          <span className="stat-time">{formatTime(completedClue.solveTime)}</span>
        )}
      </div>
    );

    const isHovered = hoveredClue === clue.clid;
    const isReleaseHovered = hoveredRelease === clue.clid;
    const completionText =
      completedClue && completedClue.how === "g" ? "Solved" : "Not solved";

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
                  "--archive-bg": isDarkMode
                    ? completedClue.how === "g"
                      ? "rgb(120, 70, 45)"
                      : "#4A3F6B"
                    : completedClue.how === "g"
                      ? "#FFCBAB"
                      : "#eae4ff",
                }
              : {}),
          }}
          onMouseEnter={() => {
            setHoveredClue(clue.clid);
            setHoveredRelease(clue.clid);
          }}
          onMouseLeave={() => {
            setHoveredClue(null);
            setHoveredRelease(null);
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const newHoveredState = hoveredClue === clue.clid ? null : clue.clid;
            setHoveredClue(newHoveredState);
            if (!newHoveredState) {
              setHoveredRelease(null);
            }
          }}
        >
          <span>
            {getRelease(clue.release).toLocaleString("en-us", {
              weekday: "short",
            })}
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
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <div
            id={clue.id}
            className={`archive-tile border border-[#ddd] dark:!border-[#404040] hover:dark:!bg-neutral-700 hover:dark:!border-neutral-800 `}
            ref={tilesRef.current[index]}
            style={{
              ...(isHovered
                ? {
                    backgroundColor: isDarkMode ? "#404040" : "#ddd",
                  }
                : {}),
              ...(!isHovered && isReleaseHovered &&
              !!completedClue &&
              completedClue.how === "g"
                ? {
                    // For completed clues: match the archive-release color
                    backgroundColor: isDarkMode
                      ? "rgb(120, 70, 45)"
                      : "#FFCBAB",
                    color: isDarkMode ? "white" : "black",
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
            <div className="tile-img-stats">
              {!isHovered && <DifficultyGrid difficulty={clue.difficulty} />}
              {!isHovered &&
                !!completedClue &&
                completedClue.how === "g" &&
                stats}
            </div>
            {isHovered ? (
              <div className="tile-info">
                <span className="text-md">
                  {completionText} • Clue #{clue.clid} • by{" "}
                  {clue.source?.value || "Unknown"}
                </span>
                {!!completedClue && completedClue.how === "g" && (
                  <div className="tile-info-stats">
                    <span
                      style={{
                        backgroundColor: "var(--lc-active-bg)",
                        color: "var(--lc-text-primary)",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                      }}
                    >
                      {completedClue.guesses} {completedClue.guesses === 1 ? "guess" : "guesses"}
                    </span>
                    <span
                      style={{
                        backgroundColor: "var(--lc-highlight-bg)",
                        color: "var(--lc-text-primary)",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                      }}
                    >
                      {completedClue.hints} {completedClue.hints === 1 ? "hint" : "hints"}
                    </span>
                    {completedClue.solveTime != null && (
                      <span
                        style={{
                          backgroundColor: "#e5e5e5",
                          color: "var(--lc-text-primary)",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                        }}
                        className="dark:!bg-neutral-600"
                      >
                        {formatTime(completedClue.solveTime)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <span className="tile-name">{clue.clue.value}</span>
            )}
          </div>
        </Link>
      </div>
    );
  });

  const clearFilters = () => {
    setDifficultyFilter("all");
    setAuthorFilter("all");
    setUnsolvedFilter(false);
    setTypeFilter("all");
  };

  const hasActiveFilters =
    difficultyFilter !== "all" ||
    authorFilter !== "all" ||
    unsolvedFilter ||
    typeFilter !== "all";

  const activeFilterCount = [
    difficultyFilter !== "all",
    authorFilter !== "all",
    typeFilter !== "all",
    unsolvedFilter,
  ].filter(Boolean).length;

  return (
    <Layout>
      <div className="clues lc-container">
        <div className="filters-bar">
          <button
            onClick={() => setFilterModalOpen(true)}
            className={`filter-btn flex items-center gap-1.5 px-3 py-1.5 rounded border transition-colors ${
              hasActiveFilters
                ? "bg-[#eae4ff] dark:bg-[#4A3F6B] border-[#b9ace2] dark:border-[#68589E] text-[#68589E] dark:text-[#9B8FE8]"
                : "bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600"
            }`}
          >
            <FilterIcon />
            <span className="text-xs">Filter</span>
            {activeFilterCount > 0 && (
              <span className="filter-badge bg-[#68589E] text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 underline"
            >
              Clear
            </button>
          )}

          <span className="filter-count text-neutral-500 dark:text-neutral-400">
            {archiveTiles.length} clue{archiveTiles.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="clues-grid">{archiveTiles}</div>
      </div>

      <FilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
      >
        <h2 className="text-lg font-semibold mb-4">Filter Clues</h2>

        <div className="filter-group mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Type
            </label>
            <Link
              to="/learn#learn-types"
              className="flex items-center gap-1 text-xs text-[#68589E] dark:text-[#9B8FE8] hover:underline"
            >
              <BookIcon /> Learn types
            </Link>
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
          >
            <option value="all">All types</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group mb-4">
          <label className="block text-sm font-medium mb-1.5 text-neutral-700 dark:text-neutral-300">
            Difficulty
          </label>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
          >
            <option value="all">All difficulties</option>
            <option value="1">Easy (1)</option>
            <option value="2">Medium (2)</option>
            <option value="3">Hard (3)</option>
            <option value="4">Expert (4)</option>
          </select>
        </div>

        <div className="filter-group mb-4">
          <label className="block text-sm font-medium mb-1.5 text-neutral-700 dark:text-neutral-300">
            Author
          </label>
          <select
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
          >
            <option value="all">All authors</option>
            {uniqueAuthors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={unsolvedFilter}
              onChange={(e) => setUnsolvedFilter(e.target.checked)}
              className="rounded w-4 h-4"
            />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Show unsolved only
            </span>
          </label>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={() => setFilterModalOpen(false)}
            className="flex-1 px-4 py-2 rounded bg-[#68589E] hover:bg-[#5a4b88] text-white font-medium transition-colors"
          >
            Apply
          </button>
          {hasActiveFilters && (
            <button
              onClick={() => {
                clearFilters();
                setFilterModalOpen(false);
              }}
              className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      </FilterModal>
    </Layout>
  );
};

export default Clues;

export const Head = () => (
  <>
    <title>All Cryptic Crossword Clues - Learn Cryptic Archive</title>
    <meta
      name="description"
      content="Browse all daily cryptic crossword clues. Practice with past puzzles, track your solving statistics, and improve your cryptic crossword skills."
    />
    <link rel="canonical" href="https://learncryptic.com/clues" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://learncryptic.com/clues" />
    <meta
      property="og:title"
      content="All Cryptic Crossword Clues - Learn Cryptic Archive"
    />
    <meta
      property="og:description"
      content="Browse all daily cryptic crossword clues. Practice with past puzzles and improve your cryptic crossword skills."
    />
    <meta property="og:image" content="https://learncryptic.com/social.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "All Cryptic Crossword Clues",
        description:
          "Browse all daily cryptic crossword clues. Practice with past puzzles, track your solving statistics, and improve your cryptic crossword skills.",
        url: "https://learncryptic.com/clues",
        isPartOf: {
          "@type": "WebSite",
          name: "Learn Cryptic",
          url: "https://learncryptic.com",
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://learncryptic.com",
            },
            { "@type": "ListItem", position: 2, name: "All Clues" },
          ],
        },
      })}
    </script>
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
