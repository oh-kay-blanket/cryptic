import React from 'react';

// Import achievement SVGs as React components
import { ReactComponent as StreakSvg } from '../assets/icons/achievements/streak.svg';
import { ReactComponent as ClueSvg } from '../assets/icons/achievements/clue.svg';
import { ReactComponent as BrainSvg } from '../assets/icons/achievements/brain.svg';
import { ReactComponent as TargetSvg } from '../assets/icons/achievements/target.svg';
import { ReactComponent as StarSvg } from '../assets/icons/achievements/star.svg';
import { ReactComponent as DifficultySvg } from '../assets/icons/achievements/difficulty.svg';
import { ReactComponent as MoonSvg } from '../assets/icons/achievements/moon.svg';
import { ReactComponent as SunSvg } from '../assets/icons/achievements/sun.svg';
import { ReactComponent as LightningSvg } from '../assets/icons/achievements/lightning.svg';
import { ReactComponent as CalendarSvg } from '../assets/icons/achievements/calendar.svg';

// Import clue type SVGs for type achievements
import { ReactComponent as AnagramSvg } from '../assets/icons/clue-types/anagram.svg';
import { ReactComponent as CharadeSvg } from '../assets/icons/clue-types/charade.svg';
import { ReactComponent as ContainerSvg } from '../assets/icons/clue-types/container.svg';
import { ReactComponent as DeletionSvg } from '../assets/icons/clue-types/deletion.svg';
import { ReactComponent as DoubleDefinitionSvg } from '../assets/icons/clue-types/double-definition.svg';
import { ReactComponent as HiddenWordSvg } from '../assets/icons/clue-types/hidden-word.svg';
import { ReactComponent as HomophoneSvg } from '../assets/icons/clue-types/homophone.svg';
import { ReactComponent as InitialismSvg } from '../assets/icons/clue-types/initialism.svg';
import { ReactComponent as ReversalSvg } from '../assets/icons/clue-types/reversal.svg';
import { ReactComponent as SpoonerismSvg } from '../assets/icons/clue-types/spoonerism.svg';
import { ReactComponent as CombinationSvg } from '../assets/icons/clue-types/combination.svg';
import { ReactComponent as LetterBankSvg } from '../assets/icons/clue-types/letter-bank.svg';
import { ReactComponent as LitSvg } from '../assets/icons/clue-types/lit.svg';

// Map icon names to components
const iconComponents = {
  // Achievement icons
  streak: StreakSvg,
  clue: ClueSvg,
  brain: BrainSvg,
  target: TargetSvg,
  star: StarSvg,
  difficulty: DifficultySvg,
  moon: MoonSvg,
  sun: SunSvg,
  lightning: LightningSvg,
  calendar: CalendarSvg,
  // Clue type icons (for type achievements)
  anagram: AnagramSvg,
  charade: CharadeSvg,
  container: ContainerSvg,
  deletion: DeletionSvg,
  'double-definition': DoubleDefinitionSvg,
  'hidden-word': HiddenWordSvg,
  homophone: HomophoneSvg,
  initialism: InitialismSvg,
  reversal: ReversalSvg,
  spoonerism: SpoonerismSvg,
  combination: CombinationSvg,
  'letter-bank': LetterBankSvg,
  lit: LitSvg,
};

/**
 * Renders an achievement icon
 * @param {string} icon - Icon name from achievement definition
 * @param {string} className - Optional CSS class
 */
const AchievementIcon = ({ icon, className = '' }) => {
  const IconComponent = iconComponents[icon];

  if (!IconComponent) {
    console.warn(`Unknown achievement icon: ${icon}`);
    return null;
  }

  return <IconComponent className={className} />;
};

export default AchievementIcon;
