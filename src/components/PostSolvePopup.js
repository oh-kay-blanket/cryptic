import React, { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { UserContext } from '../utils/UserContext';
import { formatTime, formatTimeForShare, isTodayClue } from '../utils/dateHelpers';
import AchievementIcon from './AchievementIcon';

// Hand-drawn share icon
const ShareIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    viewBox='0 0 24 24'
  >
    <path d='M17.8 4.2c.5-.2 1 0 1.4.3.4.4.6.9.5 1.4-.1.5-.5 1-1 1.2-.5.2-1.1.1-1.5-.3-.4-.4-.5-.9-.4-1.5.1-.5.5-.9 1-1.1' fill='currentColor'/>
    <path d='M17.9 17.1c.5-.1 1 .1 1.4.4.4.4.5.9.4 1.4-.2.5-.6.9-1.1 1.1-.5.1-1.1 0-1.4-.4-.4-.4-.5-1-.3-1.5.2-.5.5-.9 1-1' fill='currentColor'/>
    <path d='M5.8 10.2c.5-.2 1.1 0 1.4.4.4.4.5 1 .3 1.5-.2.5-.6.9-1.1 1-.5.2-1.1 0-1.5-.4-.3-.4-.4-1-.2-1.5.2-.5.6-.9 1.1-1' fill='currentColor'/>
    <path d='M7.9 10.8c2.8-1.4 5.7-2.9 8.5-4.3'/>
    <path d='M7.8 13.1c2.9 1.5 5.8 2.8 8.7 4.2'/>
  </svg>
);

const PostSolvePopup = ({
  activeClue,
  stats,
  solveTime,
  unlockedAchievements = [],
  onDismiss,
  onViewAchievements,
}) => {
  const { clearNewlyUnlockedAchievements, markAchievementsSeen } = useContext(UserContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDismiss = () => {
    // Mark achievements as seen and clear from context
    if (unlockedAchievements.length > 0) {
      markAchievementsSeen(unlockedAchievements.map((a) => a.id));
      clearNewlyUnlockedAchievements();
    }
    if (onDismiss) {
      onDismiss();
    }
  };

  const handleViewAchievements = () => {
    if (unlockedAchievements.length > 0) {
      markAchievementsSeen(unlockedAchievements.map((a) => a.id));
      clearNewlyUnlockedAchievements();
    }
    if (onViewAchievements) {
      onViewAchievements();
    }
  };

  // Share score function (for today's clue only)
  const handleShareScore = async () => {
    const guessText = `${stats.guesses} ${stats.guesses === 1 ? 'guess' : 'guesses'}`;
    const hintText = `${stats.hints} ${stats.hints === 1 ? 'hint' : 'hints'}`;
    const timeText = solveTime != null ? formatTimeForShare(solveTime) : null;

    const statsLine = timeText
      ? `⬜ ${timeText} 🟧 ${guessText} 🟪 ${hintText}`
      : `🟧 ${guessText} 🟪 ${hintText}`;

    const scoreText = `Learn Cryptic #${activeClue.clid}\n${statsLine}`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile && navigator.share) {
      try {
        await navigator.share({ title: 'Clue Score', text: scoreText });
      } catch (err) {
        if (err.name !== 'AbortError') {
          alert('Could not share your score.');
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(scoreText);
        alert('Score copied to clipboard!');
      } catch (err) {
        alert('Could not copy your score.');
      }
    }
  };

  if (!mounted) return null;

  const isTodaysClue = isTodayClue(activeClue);

  const content = (
    <div className='post-solve-popup'>
      <div className='post-solve-popup-content bg-white dark:bg-neutral-800'>
        {/* Stats section */}
        <div className='post-solve-stats'>
          <p className='post-solve-title'>Nice work!</p>
          <div className='stats-row'>
            {solveTime != null && (
              <span className='stat-time dark:!bg-neutral-600'>{formatTime(solveTime)}</span>
            )}
            <span className='stat-guesses'>
              {stats.guesses} {stats.guesses === 1 ? 'guess' : 'guesses'}
            </span>
            <span className='stat-hints'>
              {stats.hints} {stats.hints === 1 ? 'hint' : 'hints'}
            </span>
            {isTodaysClue && (
              <button
                onClick={handleShareScore}
                className='share-icon-btn'
                aria-label='Share score'
              >
                <ShareIcon />
              </button>
            )}
          </div>
        </div>

        {/* Achievements section */}
        {unlockedAchievements.length > 0 && (
          <div className='post-solve-achievements'>
            <p className='post-solve-achievements-title'>
              {unlockedAchievements.length === 1 ? 'Achievement unlocked!' : 'Achievements unlocked!'}
            </p>
            <div className='post-solve-achievements-list'>
              {unlockedAchievements.map((achievement, index) => (
                <div
                  key={achievement.id}
                  className='post-solve-achievement'
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className='post-solve-achievement-badge'>
                    <AchievementIcon icon={achievement.icon} className='w-5 h-5' />
                  </div>
                  <div className='post-solve-achievement-info'>
                    <div className='achievement-name'>{achievement.name}</div>
                    <div className='achievement-description'>{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className='post-solve-buttons'>
          <button className='post-solve-btn post-solve-btn-primary' onClick={handleDismiss}>
            Continue
          </button>
          {unlockedAchievements.length > 0 && (
            <button className='post-solve-btn post-solve-btn-secondary' onClick={handleViewAchievements}>
              View all achievements
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(
    <div className='post-solve-popup-overlay'>{content}</div>,
    document.body
  );
};

export default PostSolvePopup;
