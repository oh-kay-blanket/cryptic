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

const Modal = ({ open, onClose, children }) => {
  useEffect(() => {
    const preventDefault = (e) => {
      e.preventDefault();
    };

    if (open) {
      // Prevent scrolling by blocking wheel and touch events
      document.addEventListener('wheel', preventDefault, { passive: false });
      document.addEventListener('touchmove', preventDefault, { passive: false });
    }

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener('wheel', preventDefault);
      document.removeEventListener('touchmove', preventDefault);
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
          &times;
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
  } = useContext(UserContext);
  const [helpOpen, setHelpOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [showCurrentStatsTooltip, setShowCurrentStatsTooltip] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const currentStatsRef = useRef(null);
  const tooltipOpenedByClick = useRef(false);

  // Live timer update (stops when clue is solved)
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

    // Initial calculation
    setElapsedTime(Math.round((Date.now() - clueStartTime) / 1000));

    // Update every second
    const interval = setInterval(() => {
      setElapsedTime(Math.round((Date.now() - clueStartTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [clueStartTime, clueSolvedTime]);

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
      ? (completedClues.reduce((sum, c) => sum + (c.guesses || 0), 0) / totalSolved).toFixed(1)
      : '0';
  const avgHints =
    totalSolved > 0
      ? (completedClues.reduce((sum, c) => sum + (c.hints || 0), 0) / totalSolved).toFixed(1)
      : '0';

  // Calculate average solve time (only from clues that have solveTime)
  const cluesWithTime = completedClues.filter((c) => c.solveTime != null);
  const avgSolveTime =
    cluesWithTime.length > 0
      ? Math.round(
          cluesWithTime.reduce((sum, c) => sum + c.solveTime, 0) / cluesWithTime.length
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
                <span className='stat stat-hints'>{currentStats.hints}h</span>
                <span className='stat stat-guesses'>{currentStats.guesses}g</span>
                <span className='stat stat-time'>{formatTime(elapsedTime)}</span>
                {showCurrentStatsTooltip && (
                  <div className='current-stats-tooltip'>
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
        <div className='mt-6'>
          <h3 className='font-semibold mb-3'>Theme</h3>
          <div className='flex mb-4'>
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
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    darkMode === null
                      ? 'bg-white dark:bg-neutral-600 text-neutral-900 dark:text-white shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
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
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    darkMode === false
                      ? 'bg-white dark:bg-neutral-600 text-neutral-900 dark:text-white shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
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
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    darkMode === true
                      ? 'bg-white dark:bg-neutral-600 text-neutral-900 dark:text-white shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  Dark
                </span>
              </label>
            </div>
          </div>
          <div className='mt-4 border-t border-neutral-200 dark:border-neutral-600 pt-4'>
            <p>
              <Link to='/learn' className='underline'>
                What are cryptics?
              </Link>
            </p>

            <p className='mt-4'>
              <Link to='/creators' className='underline'>
                About us
              </Link>
            </p>
          </div>

          <div className='mt-4 border-t border-neutral-200 dark:border-neutral-600 pt-4'>
            <p>
              Have questions, comments, or want to contribute future cryptic clues?
              <a
                href='mailto:learncrypticgame@gmail.com?subject=Learn Cryptic Feedback'
                className='underline mt-2 block'
              >
                Email us
              </a>
            </p>
          </div>
        </div>
      </Modal>
      <Modal id='modal-stats' open={statsOpen} onClose={() => setStatsOpen(false)}>
        <h2 className='my-3 text-xl font-semibold'>Statistics</h2>
        <div className='stats-list'>
          <div className='stat-item'>
            🔥 <span className='font-medium mx-1'>Current Streak:</span> {streak}
          </div>
          <div className='stat-item'>
            🏆 <span className='font-medium mx-1'>Longest Streak:</span> {longestStreak}
          </div>
          <div className='stat-item'>
            🧩 <span className='font-medium mx-1'>Clues solved:</span> {totalSolved}
          </div>
          <div className='stat-item'>
            🎯 <span className='font-medium mx-1'>Avg guesses:</span> {avgGuesses}
          </div>
          <div className='stat-item'>
            💡 <span className='font-medium mx-1'>Avg hints:</span> {avgHints}
          </div>
          {avgSolveTime != null && (
            <div className='stat-item'>
              ⏱️ <span className='font-medium mx-1'>Avg time:</span> {formatTime(avgSolveTime)}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default TopBar;
