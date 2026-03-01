import React, { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { UserContext } from '../utils/UserContext';
import AchievementIcon from './AchievementIcon';

const AchievementsIntroModal = ({ retroactiveAchievements = [], onDismiss, onViewAll }) => {
  const { setHasSeenAchievementsIntro } = useContext(UserContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDismiss = () => {
    setHasSeenAchievementsIntro(true);
    if (onDismiss) {
      onDismiss();
    }
  };

  const handleViewAll = () => {
    setHasSeenAchievementsIntro(true);
    if (onViewAll) {
      onViewAll();
    }
  };

  if (!mounted) return null;

  // Show up to 5 preview badges
  const previewBadges = retroactiveAchievements.slice(0, 5);
  const remainingCount = retroactiveAchievements.length - previewBadges.length;

  const content = (
    <div className='achievements-intro-modal'>
      <div className='achievements-intro-content bg-white dark:bg-neutral-800'>
        <div className='achievements-intro-header'>
          <h2 className='achievements-intro-title'>Achievements are here!</h2>
          <p className='achievements-intro-subtitle'>
            Track your progress and unlock badges as you master cryptic clues.
          </p>
        </div>

        {retroactiveAchievements.length > 0 && (
          <div className='achievements-intro-earned'>
            <p className='achievements-intro-earned-text'>
              Based on your history, you've already earned{' '}
              <strong>{retroactiveAchievements.length}</strong>{' '}
              {retroactiveAchievements.length === 1 ? 'badge' : 'badges'}!
            </p>
            <div className='achievements-intro-preview'>
              {previewBadges.map((achievement) => (
                <div
                  key={achievement.id}
                  className='achievement-preview-badge'
                  title={`${achievement.name}: ${achievement.description}`}
                >
                  <AchievementIcon icon={achievement.icon} className='w-6 h-6' />
                </div>
              ))}
              {remainingCount > 0 && (
                <div className='achievement-preview-more'>+{remainingCount}</div>
              )}
            </div>
          </div>
        )}

        <div className='achievements-intro-buttons'>
          <button
            className='achievements-intro-btn achievements-intro-btn-primary'
            onClick={handleViewAll}
          >
            View achievements
          </button>
          <button
            className='achievements-intro-btn achievements-intro-btn-secondary'
            onClick={handleDismiss}
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(
    <div className='achievements-intro-overlay'>{content}</div>,
    document.body
  );
};

export default AchievementsIntroModal;
