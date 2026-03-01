import React from 'react';
import { ClueTypeIcon } from './ClueTypeIcons';

/**
 * AchievementBadge - Composable badge component for achievements
 *
 * Usage:
 *   <AchievementBadge type="anagram" tier="gold" unlocked={true} />
 *   <AchievementBadge type="charade" tier="bronze" unlocked={false} size="lg" />
 */

const tierStyles = {
  bronze: {
    bg: 'bg-amber-700',
    border: 'border-amber-600',
    glow: 'shadow-amber-500/50',
    darkBg: 'dark:bg-amber-800',
    darkBorder: 'dark:border-amber-700',
  },
  silver: {
    bg: 'bg-slate-400',
    border: 'border-slate-300',
    glow: 'shadow-slate-300/50',
    darkBg: 'dark:bg-slate-500',
    darkBorder: 'dark:border-slate-400',
  },
  gold: {
    bg: 'bg-yellow-500',
    border: 'border-yellow-400',
    glow: 'shadow-yellow-400/50',
    darkBg: 'dark:bg-yellow-600',
    darkBorder: 'dark:border-yellow-500',
  },
  platinum: {
    bg: 'bg-cyan-300',
    border: 'border-cyan-200',
    glow: 'shadow-cyan-300/50',
    darkBg: 'dark:bg-cyan-400',
    darkBorder: 'dark:border-cyan-300',
  },
};

const sizeStyles = {
  sm: {
    container: 'w-10 h-10',
    icon: 'w-5 h-5',
    border: 'border-2',
  },
  md: {
    container: 'w-14 h-14',
    icon: 'w-7 h-7',
    border: 'border-2',
  },
  lg: {
    container: 'w-20 h-20',
    icon: 'w-10 h-10',
    border: 'border-3',
  },
};

export const AchievementBadge = ({
  type,
  tier = 'bronze',
  unlocked = true,
  size = 'md',
  showGlow = true,
  className = '',
}) => {
  const tierStyle = tierStyles[tier] || tierStyles.bronze;
  const sizeStyle = sizeStyles[size] || sizeStyles.md;

  const containerClasses = [
    'rounded-full flex items-center justify-center',
    sizeStyle.container,
    sizeStyle.border,
    unlocked ? tierStyle.bg : 'bg-neutral-300 dark:bg-neutral-600',
    unlocked ? tierStyle.border : 'border-neutral-400 dark:border-neutral-500',
    unlocked ? tierStyle.darkBg : '',
    unlocked ? tierStyle.darkBorder : '',
    unlocked && showGlow ? `shadow-lg ${tierStyle.glow}` : '',
    !unlocked ? 'grayscale opacity-50' : '',
    'transition-all duration-300',
    className,
  ].filter(Boolean).join(' ');

  const iconClasses = [
    sizeStyle.icon,
    unlocked ? 'text-amber-900 dark:text-white' : 'text-neutral-500 dark:text-neutral-400',
  ].join(' ');

  return (
    <div className={containerClasses}>
      <ClueTypeIcon type={type} className={iconClasses} />
    </div>
  );
};

/**
 * AchievementBadgeGroup - Display multiple badges in a row
 */
export const AchievementBadgeGroup = ({ badges, size = 'md', className = '' }) => (
  <div className={`flex gap-2 flex-wrap ${className}`}>
    {badges.map((badge, index) => (
      <AchievementBadge
        key={badge.type || index}
        type={badge.type}
        tier={badge.tier}
        unlocked={badge.unlocked}
        size={size}
      />
    ))}
  </div>
);

export default AchievementBadge;
