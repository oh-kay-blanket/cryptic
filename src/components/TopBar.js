import React, { useContext, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'gatsby';

import { UserContext } from '../utils/UserContext';
import { formatTime, isSameDay, stripTime } from '../utils/dateHelpers';
import CalendarIcon from '../assets/icons/achievements/calendar.svg';
import ClueIcon from '../assets/icons/achievements/clue.svg';
import {
  achievements,
  ACHIEVEMENT_CATEGORIES,
  categoryDisplayNames,
  getAchievementProgress,
} from '../utils/achievements';
import AchievementIcon from './AchievementIcon';

import logo from '../assets/img/logo-short.png';
// Hand-drawn style icons
const InfoIcon = () => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='text-neutral-500 dark:text-neutral-200'
  >
    <path d='M12.2 2.1c2.8.2 5.4 1.3 7.2 3.3 1.9 2 2.9 4.6 2.7 7.3-.2 2.7-1.4 5.2-3.2 7-2 1.9-4.6 2.9-7.3 2.7-2.7-.2-5.1-1.4-6.9-3.3-1.9-2-2.8-4.6-2.6-7.3.2-2.6 1.3-5 3.2-6.8 1.8-1.8 4.3-2.8 6.9-2.9' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
    <path d='M11.6 6.8c.7-.3 1.5.1 1.8.7.3.7 0 1.4-.6 1.8-.7.3-1.4 0-1.8-.6-.4-.7-.1-1.5.6-1.9' fill='currentColor' />
    <path d='M12.1 11.8c-.1 1.2.1 2.4-.1 3.6' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
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
    <path d='M3.2 21.1c-.1-4 .1-8-.1-12' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
    <path d='M10.1 21.2c.1-5.3-.1-10.6.1-15.9' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
    <path d='M17.2 21.1c-.1-3 .1-6-.1-9' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
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
    <path d='M3.5 4.8c.6-.2 1.3.2 1.5.8.3.6 0 1.3-.5 1.6-.6.3-1.3.1-1.6-.5-.4-.6-.1-1.4.6-1.9' fill='currentColor' />
    <path d='M3.6 11.4c.6-.2 1.3.1 1.6.6.3.6.1 1.3-.4 1.7-.6.3-1.3.1-1.7-.5-.3-.6-.1-1.3.5-1.8' fill='currentColor' />
    <path d='M3.5 17.8c.6-.2 1.3.1 1.6.7.3.6 0 1.3-.5 1.6-.6.3-1.3 0-1.6-.6-.3-.6 0-1.3.5-1.7' fill='currentColor' />
    <path d='M8.2 5.9c4.4.1 8.8-.1 13.2.1' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
    <path d='M8.1 12.1c4.4-.1 8.9.1 13.3-.1' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
    <path d='M8.2 18.2c4.4.1 8.8-.1 13.2.1' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
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
    <path d='M6.2 6.1c3.9 3.8 7.7 7.8 11.6 11.7' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
    <path d='M17.9 6.2c-3.8 3.9-7.8 7.7-11.7 11.6' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
  </svg>
);

const SystemIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    {/* Hand-drawn monitor */}
    <path d='M4.1 3.2c5.2.1 10.5-.1 15.7.1.8.2 1.3.8 1.3 1.6-.1 3.1.1 6.3-.1 9.4-.2.7-.8 1.2-1.5 1.2-5.1-.1-10.3.1-15.4-.1-.7-.1-1.2-.6-1.3-1.3.1-3.2-.1-6.4.1-9.6.2-.7.6-1.2 1.2-1.3' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
    {/* Stand */}
    <path d='M9.2 15.8c-.3 1.5-.1 3.1-.2 4.6' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
    <path d='M14.9 15.7c.2 1.6-.1 3.2.1 4.8' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
    <path d='M6.8 20.8c3.4-.1 6.9.2 10.3-.1' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
  </svg>
);

const SunIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M12.2 8.1c1.2.1 2.3.6 3.1 1.5.8.9 1.2 2 1.1 3.2-.1 1.1-.6 2.2-1.4 2.9-.9.8-2 1.2-3.2 1.1-1.1-.1-2.2-.5-2.9-1.4-.8-.9-1.2-2-1.1-3.2.1-1.1.5-2.1 1.4-2.9.8-.7 1.9-1.2 3-1.2' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
    <path d='M12.1 2.2c-.1 1.2.1 2.4-.1 3.6' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
    <path d='M12.2 18.1c-.1 1.3.1 2.5-.1 3.8' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
    <path d='M5.1 5.2c.8.7 1.5 1.6 2.3 2.4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
    <path d='M16.8 16.1c.7.8 1.6 1.5 2.4 2.3' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
    <path d='M2.2 12.1c1.2-.1 2.4.1 3.6-.1' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
    <path d='M18.1 12.2c1.3-.1 2.5.1 3.8-.1' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
    <path d='M5.2 18.9c.7-.8 1.6-1.5 2.4-2.3' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
    <path d='M16.9 7.1c.8-.7 1.5-1.6 2.3-2.4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
  </svg>
);

const MoonIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M20.8 13.2c-.3 2.1-1.4 4-3 5.3-1.7 1.3-3.8 2-5.9 1.8-2.2-.2-4.2-1.2-5.6-2.8-1.5-1.6-2.3-3.7-2.1-5.9.2-2.1 1.2-4.1 2.8-5.5 1.5-1.4 3.5-2.2 5.6-2.1-.8 1.3-1.2 2.8-1.1 4.3.1 1.6.7 3.1 1.8 4.3 1.1 1.2 2.5 1.9 4.1 2.1 1.5.2 3-.1 4.4-.5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
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
    achievements: userAchievements = { unlocked: {} },
    openStatsWithTab,
    setOpenStatsWithTab,
  } = useContext(UserContext);
  const [helpOpen, setHelpOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [statsTab, setStatsTab] = useState('stats'); // 'stats' or 'achievements'
  const [showCurrentStatsTooltip, setShowCurrentStatsTooltip] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState(null);
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

  // Listen for external trigger to open stats modal
  useEffect(() => {
    if (openStatsWithTab) {
      setStatsTab(openStatsWithTab);
      setStatsOpen(true);
      setOpenStatsWithTab(null); // Reset the trigger
    }
  }, [openStatsWithTab, setOpenStatsWithTab]);

  // Close achievement tooltip when clicking outside or scrolling
  useEffect(() => {
    if (!selectedAchievement || !statsOpen) return;

    const handleClick = (e) => {
      // Check if click is inside an achievement badge or tooltip
      if (!e.target.closest('.achievement-badge') && !e.target.closest('.achievement-tooltip-portal')) {
        setSelectedAchievement(null);
        setTooltipPosition(null);
      }
    };

    const handleScroll = () => {
      setSelectedAchievement(null);
      setTooltipPosition(null);
    };

    document.addEventListener('click', handleClick);
    // Listen for scroll on the achievements tab
    const achievementsTab = document.querySelector('.achievements-tab');
    if (achievementsTab) {
      achievementsTab.addEventListener('scroll', handleScroll);
    }

    return () => {
      document.removeEventListener('click', handleClick);
      if (achievementsTab) {
        achievementsTab.removeEventListener('scroll', handleScroll);
      }
    };
  }, [selectedAchievement, statsOpen]);

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

  // Calculate last 7 days activity for the calendar
  const getLast7DaysActivity = () => {
    const today = stripTime(new Date());
    const days = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      const solved = completedClues.some(clue => {
        if (!clue.completedAt) return false;
        return isSameDay(new Date(clue.completedAt), date);
      });

      days.push({
        date,
        solved,
        dayLabel: date.toLocaleDateString('en-US', { weekday: 'narrow' }),
      });
    }
    return days;
  };

  const last7Days = getLast7DaysActivity();

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
      <Modal id='modal-stats' open={statsOpen} onClose={() => { setStatsOpen(false); setSelectedAchievement(null); setTooltipPosition(null); }}>
        {/* Tab switcher */}
        <div className='flex gap-1 p-1 theme-picker-bg rounded-lg mb-4 mt-4'>
          <button
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              statsTab === 'stats'
                ? 'bg-white dark:bg-neutral-600 text-neutral-900 dark:text-white shadow-sm'
                : 'text-neutral-600 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white'
            }`}
            onClick={() => { setStatsTab('stats'); setSelectedAchievement(null); setTooltipPosition(null); }}
          >
            Stats
          </button>
          <button
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              statsTab === 'achievements'
                ? 'bg-white dark:bg-neutral-600 text-neutral-900 dark:text-white shadow-sm'
                : 'text-neutral-600 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white'
            }`}
            onClick={() => { setStatsTab('achievements'); setSelectedAchievement(null); setTooltipPosition(null); }}
          >
            Achievements
          </button>
        </div>

        {/* Tab content container - fixed height to prevent resize on tab switch */}
        <div className='stats-modal-content'>
        {/* Stats tab content */}
        {statsTab === 'stats' && (
          <>
            {totalSolved === 0 ? (
              <div className='text-center py-6'>
                <p className='text-neutral-500 dark:text-neutral-400 mb-2'>No stats yet</p>
                <p className='text-neutral-700 dark:text-neutral-200'>
                  Solve your first clue to start tracking your progress!
                </p>
              </div>
            ) : (
              <>
                {/* Hero Cards */}
                <div className='stats-hero-cards'>
                  <div className='hero-card hero-card--streak'>
                    <div className='hero-card-icon'>
                      <img src={CalendarIcon} alt='' />
                    </div>
                    <div className='hero-card-value'>{streak}</div>
                    <div className='hero-card-label'>Day Streak</div>
                    <div className='hero-card-sub'>Best: {longestStreak}</div>
                  </div>
                  <div className='hero-card hero-card--solved'>
                    <div className='hero-card-icon'>
                      <img src={ClueIcon} alt='' />
                    </div>
                    <div className='hero-card-value'>{totalSolved}</div>
                    <div className='hero-card-label'>Clues Solved</div>
                    <div className='hero-card-sub'>{perfectSolves} perfect</div>
                  </div>
                </div>

                {/* 7-Day Activity Calendar */}
                <div className='stats-calendar'>
                  <h3 className='stats-section-title'>Daily Clues - Last 7 Days</h3>
                  <div className='calendar-row'>
                    {last7Days.map((day, index) => (
                      <div key={index} className='calendar-day'>
                        <div className={`calendar-dot ${day.solved ? 'filled' : ''}`} />
                        <div className='calendar-label'>{day.dayLabel}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Stats */}
                {(bestTimeClue || avgSolveTime != null) && (
                  <div className='stats-time-section'>
                    <h3 className='stats-section-title'>Time</h3>
                    <div className='stats-time-grid'>
                      {bestTimeClue && (
                        <div className='stats-time-item'>
                          <div className='stats-time-value'>
                            {bestTime < 60 ? <>{bestTime}<span className='stats-time-unit'>s</span></> : formatTime(bestTime)}
                          </div>
                          <div className='stats-time-label'>
                            best{' '}
                            <Link
                              to={`/clues/${bestTimeClue.clid}`}
                              className='stats-time-link'
                              onClick={() => setStatsOpen(false)}
                            >
                              (#{bestTimeClue.clid})
                            </Link>
                          </div>
                        </div>
                      )}
                      {avgSolveTime != null && (
                        <div className='stats-time-item'>
                          <div className='stats-time-value'>
                            {avgSolveTime < 60 ? <>{avgSolveTime}<span className='stats-time-unit'>s</span></> : formatTime(avgSolveTime)}
                          </div>
                          <div className='stats-time-label'>average</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Performance Stats */}
                <div className='stats-performance-section'>
                  <h3 className='stats-section-title'>Performance</h3>
                  <div className='stats-performance-row'>
                    <div className='stats-perf-item'>
                      <span className='stats-perf-value'>{avgGuesses}</span>
                      <span className='stats-perf-label'>avg guesses</span>
                    </div>
                    <div className='stats-perf-divider' />
                    <div className='stats-perf-item'>
                      <span className='stats-perf-value'>{avgHints}</span>
                      <span className='stats-perf-label'>avg hints</span>
                    </div>
                  </div>
                </div>

                {/* Difficulty Breakdown */}
                {cluesWithDifficulty.length > 0 && (
                  <div className='stats-difficulty-section'>
                    <h3 className='stats-section-title'>By Difficulty</h3>
                    <div className='grid grid-cols-4 gap-2'>
                      {difficultyBreakdown.map((count, index) => {
                        const difficultyNames = ['Easy', 'Moderate', 'Difficult', 'Expert'];
                        return (
                          <div key={index} className='flex flex-col items-center'>
                            <div className='text-lg font-bold text-[#666] dark:text-neutral-100'>
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

                {/* Playing Since Footer */}
                {firstSolveDate && (
                  <div className='stats-footer'>
                    Playing since {firstSolveDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Achievements tab content */}
        {statsTab === 'achievements' && (
          <div
            className='achievements-tab'
            onClick={(e) => {
              // Close tooltip when clicking on blank space (not on a badge)
              if (!e.target.closest('.achievement-badge')) {
                setSelectedAchievement(null);
                setTooltipPosition(null);
              }
            }}
          >
            {/* Achievement categories */}
            {Object.values(ACHIEVEMENT_CATEGORIES).map((category) => {
              const categoryAchievements = achievements.filter((a) => a.category === category);
              const unlockedCount = categoryAchievements.filter(
                (a) => userAchievements.unlocked?.[a.id]
              ).length;

              return (
                <div key={category} className='mb-4'>
                  <h3 className='text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2 flex justify-between'>
                    <span>{categoryDisplayNames[category]}</span>
                    <span className='text-xs'>
                      {unlockedCount}/{categoryAchievements.length}
                    </span>
                  </h3>
                  <div className='achievement-grid grid grid-cols-5 gap-2'>
                    {categoryAchievements.map((achievement) => {
                      const isUnlocked = userAchievements.unlocked?.[achievement.id];
                      const isSelected = selectedAchievement?.id === achievement.id;

                      return (
                        <button
                          key={achievement.id}
                          className={`achievement-badge ${isUnlocked ? 'unlocked' : 'locked'} ${isSelected ? 'selected' : ''}`}
                          onClick={(e) => {
                            if (isSelected) {
                              setSelectedAchievement(null);
                              setTooltipPosition(null);
                            } else {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setTooltipPosition({
                                top: rect.bottom + 8,
                                left: rect.left + rect.width / 2,
                              });
                              setSelectedAchievement(achievement);
                            }
                          }}
                          aria-label={`${achievement.name}: ${achievement.description}`}
                        >
                          <AchievementIcon icon={achievement.icon} className='w-5 h-5' />
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Achievement tooltip rendered via portal */}
        {selectedAchievement && tooltipPosition && typeof document !== 'undefined' && (() => {
          const padding = 16;
          const tooltipWidth = 180;
          const halfWidth = tooltipWidth / 2;
          const screenWidth = window.innerWidth;

          // Calculate clamped left position
          let left = tooltipPosition.left;
          let arrowOffset = 0;

          if (left - halfWidth < padding) {
            // Too close to left edge
            arrowOffset = left - (padding + halfWidth);
            left = padding + halfWidth;
          } else if (left + halfWidth > screenWidth - padding) {
            // Too close to right edge
            arrowOffset = left - (screenWidth - padding - halfWidth);
            left = screenWidth - padding - halfWidth;
          }

          return createPortal(
            <div
              className='achievement-tooltip-portal'
              style={{
                position: 'fixed',
                top: tooltipPosition.top,
                left: left,
                transform: 'translateX(-50%)',
                zIndex: 10000,
                '--arrow-offset': `${arrowOffset}px`,
              }}
            >
            <div className='achievement-tooltip-name'>{selectedAchievement.name}</div>
            <div className='achievement-tooltip-desc'>{selectedAchievement.description}</div>
            {(() => {
              const progress = getAchievementProgress(selectedAchievement.id, {
                completedClues,
                streak,
                longestStreak,
              });
              const isUnlocked = userAchievements.unlocked?.[selectedAchievement.id];
              if (progress && !isUnlocked) {
                return (
                  <div className='achievement-tooltip-progress'>
                    {progress.current} / {progress.target}
                  </div>
                );
              }
              return null;
            })()}
          </div>,
          document.body
        );
        })()}
        </div>
      </Modal>
    </>
  );
};

export default TopBar;
