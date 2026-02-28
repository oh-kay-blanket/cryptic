import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';

import { UserContext } from '../utils/UserContext';
import { formatTime } from '../utils/dateHelpers';

import logo from '../assets/img/logo-short.png';
// Custom info icon component
const InfoIcon = () => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='text-neutral-500 dark:text-neutral-200'
  >
    <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2.5' fill='none' />
    <circle cx='12' cy='9' r='1' fill='currentColor' />
    <path d='M11 12h2v5h-2z' fill='currentColor' />
  </svg>
);

const BarGraphIcon = () => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='text-neutral-500 dark:text-neutral-200'
  >
    <rect x='3' y='9' width='3' height='12' rx='1' fill='currentColor' />
    <rect x='10.5' y='3' width='3' height='18' rx='1' fill='currentColor' />
    <rect x='18' y='12' width='3' height='9' rx='1' fill='currentColor' />
  </svg>
);

const ListIcon = () => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='text-neutral-500 dark:text-neutral-200'
  >
    <rect x='3' y='3' width='3' height='3' rx='1' fill='currentColor' />
    <rect x='3' y='10.5' width='3' height='3' rx='1' fill='currentColor' />
    <rect x='3' y='18' width='3' height='3' rx='1' fill='currentColor' />
    <rect x='8' y='3' width='13' height='3' rx='1' fill='currentColor' />
    <rect x='8' y='10.5' width='13' height='3' rx='1' fill='currentColor' />
    <rect x='8' y='18' width='13' height='3' rx='1' fill='currentColor' />
  </svg>
);

const CloseIcon = () => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M18 6L6 18M6 6l12 12'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const SystemIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='2' y='3' width='20' height='14' rx='2' stroke='currentColor' strokeWidth='2' />
    <path d='M8 21h8M12 17v4' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
  </svg>
);

const SunIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='12' cy='12' r='4' stroke='currentColor' strokeWidth='2' />
    <path
      d='M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
);

const MoonIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const Modal = ({ open, onClose, children }) => {
  useEffect(() => {
    if (open) {
      // Prevent background scrolling by hiding overflow on body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className='modal-overlay' onClick={onClose}>
      <div
        className='modal-content bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='modal-close text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
          onClick={onClose}
          aria-label='Close'
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
};

const TopBar = () => {
  const {
    setReturnLearn,
    completedClues = [],
    streak = 0,
    longestStreak = 0,
    darkMode,
    setDarkMode,
    currentStats,
    clueStartTime,
    clueSolvedTime,
    setTriggerOnboarding,
    timerPaused,
  } = useContext(UserContext);
  const [helpOpen, setHelpOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [showCurrentStatsTooltip, setShowCurrentStatsTooltip] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const currentStatsRef = useRef(null);
  const tooltipOpenedByClick = useRef(false);

  // Live timer update (stops when clue is solved or paused)
  useEffect(() => {
    // If clue is solved, use the final solved time
    if (clueSolvedTime != null) {
      setElapsedTime(clueSolvedTime);
      return;
    }

    if (!clueStartTime) {
      setElapsedTime(0);
      return;
    }

    // Don't update timer when paused (e.g., during onboarding)
    if (timerPaused) {
      return;
    }

    // Initial calculation
    setElapsedTime(Math.round((Date.now() - clueStartTime) / 1000));

    // Update every second
    const interval = setInterval(() => {
      setElapsedTime(Math.round((Date.now() - clueStartTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [clueStartTime, clueSolvedTime, timerPaused]);

  // Close tooltip when clicking outside
  useEffect(() => {
    if (!showCurrentStatsTooltip) return;

    const handleClickOutside = (e) => {
      if (currentStatsRef.current && !currentStatsRef.current.contains(e.target)) {
        setShowCurrentStatsTooltip(false);
        tooltipOpenedByClick.current = false;
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, [showCurrentStatsTooltip]);

  const clickTitle = () => {
    setReturnLearn(false);
  };

  // Stats calculations
  const totalSolved = completedClues.length;
  const avgGuesses =
    totalSolved > 0
      ? Math.round(completedClues.reduce((sum, c) => sum + (c.guesses || 0), 0) / totalSolved)
      : 0;
  const avgHints =
    totalSolved > 0
      ? Math.round(completedClues.reduce((sum, c) => sum + (c.hints || 0), 0) / totalSolved)
      : 0;

  // Calculate average solve time (only from clues that have solveTime)
  const cluesWithTime = completedClues.filter((c) => c.solveTime != null);
  const avgSolveTime =
    cluesWithTime.length > 0
      ? Math.round(
          cluesWithTime.reduce((sum, c) => sum + c.solveTime, 0) / cluesWithTime.length
        )
      : null;

  // Perfect solves (0 hints and 1 guess)
  const perfectSolves = completedClues.filter((c) => c.hints === 0 && c.guesses === 1).length;

  // Best time (fastest solve) and which clue it was
  const bestTimeClue =
    cluesWithTime.length > 0
      ? cluesWithTime.reduce((fastest, c) => (c.solveTime < fastest.solveTime ? c : fastest))
      : null;
  const bestTime = bestTimeClue ? bestTimeClue.solveTime : null;

  // Difficulty breakdown (only for clues that have difficulty tracked)
  const cluesWithDifficulty = completedClues.filter((c) => c.difficulty != null);
  const difficultyBreakdown = [1, 2, 3, 4].map(
    (level) => cluesWithDifficulty.filter((c) => Number(c.difficulty) === level).length
  );

  // First solve date
  const cluesWithDate = completedClues.filter((c) => c.completedAt != null);
  const firstSolveDate =
    cluesWithDate.length > 0
      ? new Date(
          cluesWithDate.reduce((earliest, c) =>
            new Date(c.completedAt) < new Date(earliest.completedAt) ? c : earliest
          ).completedAt
        )
      : null;

  return (
    <>
      <header className='top-bar bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700'>
        <div className='top-bar-container lc-container'>
          <div className='topbar-left'>
            <Link
              to='/clues'
              className='icon-btn hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg p-2 transition-colors'
              aria-label='All clues'
            >
              <ListIcon />
            </Link>
            <button
              className='icon-btn hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg p-2 transition-colors'
              aria-label='Stats'
              onClick={() => setStatsOpen(true)}
            >
              <BarGraphIcon />
            </button>
            <button
              className='icon-btn hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg p-2 transition-colors'
              aria-label='Help'
              onClick={() => setHelpOpen(true)}
            >
              <InfoIcon />
            </button>
            {currentStats && (
              <div
                ref={currentStatsRef}
                className='current-stats'
                onMouseEnter={() => {
                  if (!tooltipOpenedByClick.current) {
                    setShowCurrentStatsTooltip(true);
                  }
                }}
                onMouseLeave={() => {
                  if (!tooltipOpenedByClick.current) {
                    setShowCurrentStatsTooltip(false);
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  tooltipOpenedByClick.current = !showCurrentStatsTooltip;
                  setShowCurrentStatsTooltip(!showCurrentStatsTooltip);
                }}
                role='button'
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    tooltipOpenedByClick.current = !showCurrentStatsTooltip;
                    setShowCurrentStatsTooltip(!showCurrentStatsTooltip);
                  }
                }}
              >
                <span className='stat stat-time'>{formatTime(elapsedTime, true)}</span>
                <span className='stat stat-guesses'>{currentStats.guesses}g</span>
                <span className='stat stat-hints'>{currentStats.hints}h</span>
                {showCurrentStatsTooltip && (
                  <div className='current-stats-tooltip'>
                    <span
                      style={{
                        backgroundColor: '#e5e5e5',
                        color: 'var(--lc-text-primary)',
                        padding: '2px 6px',
                        lineHeight: '1.5',
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                      }}
                      className='dark:!bg-neutral-600'
                    >
                      {formatTime(elapsedTime)}
                    </span>
                    <span
                      style={{
                        backgroundColor: 'var(--lc-active-bg)',
                        color: 'var(--lc-text-primary)',
                        padding: '2px 6px',
                        lineHeight: '1.5',
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                      }}
                    >
                      {currentStats.guesses} {currentStats.guesses === 1 ? 'guess' : 'guesses'}
                    </span>
                    <span
                      style={{
                        backgroundColor: 'var(--lc-highlight-bg)',
                        color: 'var(--lc-text-primary)',
                        padding: '2px 6px',
                        lineHeight: '1.5',
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                      }}
                    >
                      {currentStats.hints} {currentStats.hints === 1 ? 'hint' : 'hints'}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          <Link to='/' onClick={clickTitle} className='topbar-logo'>
            <img src={logo} alt='' />
          </Link>
        </div>
      </header>
      <Modal id='modal-info' open={helpOpen} onClose={() => setHelpOpen(false)}>
        <div className='mb-4 mt-4'>
          <h3 className='text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-3'>
            Theme
          </h3>
          <div className='flex'>
            <div className='flex theme-picker-bg rounded-lg p-1 gap-1'>
              <label className='flex items-center cursor-pointer'>
                <input
                  type='radio'
                  name='theme'
                  checked={darkMode === null}
                  onChange={() => setDarkMode(null)}
                  className='sr-only'
                />
                <span
                  className={`flex flex-col items-center gap-1 px-4 py-2 text-sm rounded-md transition-colors ${
                    darkMode === null
                      ? 'bg-white dark:bg-neutral-600 text-neutral-900 dark:text-white shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <SystemIcon />
                  System
                </span>
              </label>
              <label className='flex items-center cursor-pointer'>
                <input
                  type='radio'
                  name='theme'
                  checked={darkMode === false}
                  onChange={() => setDarkMode(false)}
                  className='sr-only'
                />
                <span
                  className={`flex flex-col items-center gap-1 px-4 py-2 text-sm rounded-md transition-colors ${
                    darkMode === false
                      ? 'bg-white dark:bg-neutral-600 text-neutral-900 dark:text-white shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <SunIcon />
                  Light
                </span>
              </label>
              <label className='flex items-center cursor-pointer'>
                <input
                  type='radio'
                  name='theme'
                  checked={darkMode === true}
                  onChange={() => setDarkMode(true)}
                  className='sr-only'
                />
                <span
                  className={`flex flex-col items-center gap-1 px-4 py-2 text-sm rounded-md transition-colors ${
                    darkMode === true
                      ? 'bg-white dark:bg-neutral-600 text-neutral-900 dark:text-white shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <MoonIcon />
                  Dark
                </span>
              </label>
            </div>
          </div>
        </div>

        {currentStats && (
          <div className='border-t border-neutral-200 dark:border-neutral-600 pt-4 mb-4'>
            <h3 className='text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-3'>
              Tutorial
            </h3>
            <button
              onClick={() => {
                setHelpOpen(false);
                setTriggerOnboarding(true);
              }}
              className='group flex items-center text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white transition-colors'
            >
              <span className='group-hover:underline'>Start tutorial</span>
              <span className='ml-1.5 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors'>
                →
              </span>
            </button>
          </div>
        )}

        <div className='border-t border-neutral-200 dark:border-neutral-600 pt-4 mb-4'>
          <h3 className='text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-3'>
            Learn More
          </h3>
          <div className='flex flex-col gap-2'>
            <Link
              to='/learn'
              className='group flex items-center text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white transition-colors'
            >
              <span className='group-hover:underline'>What are cryptics?</span>
              <span className='ml-1.5 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors'>
                →
              </span>
            </Link>
            <Link
              to='/creators'
              className='group flex items-center text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white transition-colors'
            >
              <span className='group-hover:underline'>About us</span>
              <span className='ml-1.5 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors'>
                →
              </span>
            </Link>
          </div>
        </div>

        <div className='border-t border-neutral-200 dark:border-neutral-600 pt-4'>
          <h3 className='text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-3'>
            Contact
          </h3>
          <p className='text-neutral-600 dark:text-neutral-300 text-sm mb-2'>
            Have questions, comments, or want to contribute future cryptic clues?
          </p>
          <a
            href='mailto:learncrypticgame@gmail.com?subject=Learn Cryptic Feedback'
            className='group inline-flex items-center text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white transition-colors'
          >
            <span className='group-hover:underline'>Email us</span>
            <span className='ml-1.5 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors'>
              →
            </span>
          </a>
        </div>
      </Modal>
      <Modal id='modal-stats' open={statsOpen} onClose={() => setStatsOpen(false)}>
        {totalSolved === 0 ? (
          <div className='mt-4 text-center py-6'>
            <p className='text-neutral-500 dark:text-neutral-400 mb-2'>No stats yet</p>
            <p className='text-neutral-700 dark:text-neutral-200'>
              Solve your first clue to start tracking your progress!
            </p>
          </div>
        ) : (
          <>
            <h3 className='text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-3 mt-4'>
              Streaks
            </h3>
            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div className='text-center'>
                <div className='text-3xl font-bold text-neutral-900 dark:text-white'>{streak}</div>
                <div className='text-sm text-neutral-500 dark:text-neutral-400'>Current</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-neutral-900 dark:text-white'>
                  {longestStreak}
                </div>
                <div className='text-sm text-neutral-500 dark:text-neutral-400'>Longest</div>
              </div>
            </div>

            <div className='border-t border-neutral-200 dark:border-neutral-600 pt-4 mb-4'>
              <h3 className='text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-3'>
                Performance
              </h3>
              <div className='grid grid-cols-2 gap-4'>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-neutral-900 dark:text-white'>
                    {totalSolved}
                  </div>
                  <div className='text-sm text-neutral-500 dark:text-neutral-400'>Solved</div>
                </div>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-neutral-900 dark:text-white'>
                    {perfectSolves}
                  </div>
                  <div className='text-sm text-neutral-500 dark:text-neutral-400'>Perfect solves</div>
                </div>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-neutral-900 dark:text-white'>
                    {avgGuesses}
                  </div>
                  <div className='text-sm text-neutral-500 dark:text-neutral-400'>Average guesses</div>
                </div>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-neutral-900 dark:text-white'>
                    {avgHints}
                  </div>
                  <div className='text-sm text-neutral-500 dark:text-neutral-400'>Average hints</div>
                </div>
                {bestTimeClue && (
                  <div className='text-center'>
                    <div className='text-3xl font-bold text-neutral-900 dark:text-white'>
                      {formatTime(bestTime)}
                    </div>
                    <div className='text-sm text-neutral-500 dark:text-neutral-400'>
                      Best time{' '}
                      <Link
                        to={`/clues/${bestTimeClue.clid}`}
                        className='text-neutral-600 dark:text-neutral-300 hover:underline'
                        onClick={() => setStatsOpen(false)}
                      >
                        (#{bestTimeClue.clid})
                      </Link>
                    </div>
                  </div>
                )}
                {avgSolveTime != null && (
                  <div className='text-center'>
                    <div className='text-3xl font-bold text-neutral-900 dark:text-white'>
                      {formatTime(avgSolveTime)}
                    </div>
                    <div className='text-sm text-neutral-500 dark:text-neutral-400'>Average time</div>
                  </div>
                )}
              </div>
            </div>

            {cluesWithDifficulty.length > 0 && (
              <div className='border-t border-neutral-200 dark:border-neutral-600 pt-4 mb-4'>
                <h3 className='text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-3'>
                  By Difficulty
                </h3>
                <div className='grid grid-cols-4 gap-2'>
                  {difficultyBreakdown.map((count, index) => {
                    const difficultyNames = ['Easy', 'Moderate', 'Difficult', 'Expert'];
                    return (
                      <div key={index} className='flex flex-col items-center'>
                        <div className='text-2xl font-bold text-neutral-900 dark:text-white'>
                          {count}
                        </div>
                        <div
                          className={`difficulty-grid difficulty-${index + 1}`}
                          aria-hidden='true'
                        >
                          {[0, 1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className={`difficulty-square ${i < index + 1 ? 'filled' : ''}`}
                            />
                          ))}
                        </div>
                        <div className='text-xs text-neutral-500 dark:text-neutral-400 mt-1'>
                          {difficultyNames[index]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {firstSolveDate && (
              <div className='border-t border-neutral-200 dark:border-neutral-600 pt-4'>
                <h3 className='text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2'>
                  Playing Since
                </h3>
                <p className='text-neutral-700 dark:text-neutral-200'>
                  {firstSolveDate.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            )}
          </>
        )}
      </Modal>
    </>
  );
};

export default TopBar;
