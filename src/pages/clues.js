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
import ClueTypeIcon from "../components/ClueTypeIcons";

// Custom dropdown component with icons
const CustomDropdown = ({ value, onChange, options, placeholder, renderOption, openUpward = false, maxHeight = "max-h-48" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="custom-dropdown-btn w-full px-3 py-2 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 text-sm text-left flex items-center justify-between"
      >
        <span className="flex items-center gap-2">
          {selectedOption ? renderOption(selectedOption) : placeholder}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className={`absolute z-50 w-full bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded shadow-lg ${maxHeight} overflow-y-auto ${openUpward ? "bottom-full mb-1" : "mt-1"}`}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 ${
                value === option.value ? "bg-neutral-100 dark:bg-neutral-600" : ""
              }`}
            >
              {renderOption(option)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

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

// Close icon for modal
const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6.2 6.1c3.9 3.8 7.7 7.8 11.6 11.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17.9 6.2c-3.8 3.9-7.8 7.7-11.7 11.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Filter modal component
const FilterModal = ({ open, onClose, children }) => {
  useEffect(() => {
    const preventDefault = (e) => {
      // Allow scrolling inside scrollable dropdown menus
      const scrollableParent = e.target.closest('.overflow-y-auto');
      if (scrollableParent) {
        return;
      }
      e.preventDefault();
    };
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
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
};

// Hand-drawn filter/sliders icon component
const FilterIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block"
  >
    {/* Top slider line */}
    <path d="M3.1 5.2c5.8.1 11.9-.1 17.8.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Top slider knob */}
    <circle cx="8" cy="5.2" r="2.5" stroke="currentColor" strokeWidth="2" fill="none" />
    {/* Middle slider line */}
    <path d="M3.2 12.1c5.7-.1 12 .1 17.7-.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Middle slider knob */}
    <circle cx="16" cy="12" r="2.5" stroke="currentColor" strokeWidth="2" fill="none" />
    {/* Bottom slider line */}
    <path d="M3.1 18.9c5.9.1 11.8-.1 17.9.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Bottom slider knob */}
    <circle cx="11" cy="19" r="2.5" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

// Hand-drawn book icon component
const BookIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block"
  >
    {/* Book spine */}
    <path d="M5.2 4.1c.1 5.3-.1 10.7.1 15.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Book cover top */}
    <path d="M5.1 4.2c5.1-.2 10.2.1 15.1-.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Book cover right */}
    <path d="M20.1 4.1c.1 5.2-.1 10.4.1 15.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Book cover bottom */}
    <path d="M5.2 19.9c5-.1 10.1.2 15-.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Page lines */}
    <path d="M8.1 8.2c3.2-.1 6.3.1 9.5-.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8.2 12.1c3.1.1 6.2-.1 9.3.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
        {completedClue.solveTime != null && (
          <span className="stat-time">{formatTime(completedClue.solveTime, true)}</span>
        )}
        <span className="stat-guesses">{completedClue.guesses}g</span>
        <span className="stat-hints">{completedClue.hints}h</span>
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
        <div className="filters-bar justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterModalOpen(true)}
              className={`filter-btn flex items-center gap-1 px-2 py-1.5 rounded border transition-colors ${
                hasActiveFilters
                  ? "bg-[#eae4ff] dark:bg-[#4A3F6B] border-[#b9ace2] dark:border-[#68589E] text-[#68589E] dark:text-[#9B8FE8]"
                  : "bg-transparent border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
            }`}
            >
              <FilterIcon />
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
          </div>

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
        <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-3 mt-4">Filter Clues</h3>

        <div className="filter-group mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Type
            </label>
            <Link
              to="/learn#learn-types"
              className="flex items-center gap-1 text-xs text-[#68589E] dark:text-[#9B8FE8] underline"
            >
              <BookIcon /> Learn types
            </Link>
          </div>
          <CustomDropdown
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { value: "all", label: "All types" },
              ...uniqueTypes.map((type) => ({ value: type, label: type })),
            ]}
            placeholder="All types"
            renderOption={(option) => {
              // Convert type value to icon key (spaces to hyphens, handle "& Lit.")
              const iconKey = option.value === "& Lit."
                ? "lit"
                : option.value.toLowerCase().replace(/\s+/g, "-");
              return (
                <>
                  {option.value !== "all" && (
                    <ClueTypeIcon type={iconKey} className="w-4 h-4" />
                  )}
                  <span>{option.label}</span>
                </>
              );
            }}
          />
        </div>

        <div className="filter-group mb-4">
          <label className="block text-sm font-medium mb-1.5 text-neutral-700 dark:text-neutral-300">
            Difficulty
          </label>
          <CustomDropdown
            value={difficultyFilter}
            onChange={setDifficultyFilter}
            options={[
              { value: "all", label: "All difficulties" },
              { value: "1", label: "Easy", difficulty: 1 },
              { value: "2", label: "Medium", difficulty: 2 },
              { value: "3", label: "Hard", difficulty: 3 },
              { value: "4", label: "Expert", difficulty: 4 },
            ]}
            placeholder="All difficulties"
            renderOption={(option) => (
              <>
                {option.difficulty && (
                  <DifficultyGrid difficulty={option.difficulty} />
                )}
                <span>{option.label}</span>
              </>
            )}
          />
        </div>

        <div className="filter-group mb-4">
          <label className="block text-sm font-medium mb-1.5 text-neutral-700 dark:text-neutral-300">
            Author
          </label>
          <CustomDropdown
            value={authorFilter}
            onChange={setAuthorFilter}
            options={[
              { value: "all", label: "All authors" },
              ...uniqueAuthors.map((author) => ({ value: author, label: author })),
            ]}
            placeholder="All authors"
            renderOption={(option) => <span>{option.label}</span>}
            maxHeight="max-h-28"
          />
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
            className="show-btn primary flex-1"
          >
            Apply
          </button>
          {hasActiveFilters && (
            <button
              onClick={() => {
                clearFilters();
                setFilterModalOpen(false);
              }}
              className="show-btn secondary"
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
