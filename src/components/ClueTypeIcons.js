import React from 'react';

// Import SVGs as React components via gatsby-plugin-svgr
import { ReactComponent as AnagramSvg } from '../assets/icons/clue-types/anagram.svg';
import { ReactComponent as CharadeSvg } from '../assets/icons/clue-types/charade.svg';
import { ReactComponent as ContainerSvg } from '../assets/icons/clue-types/container.svg';
import { ReactComponent as DeletionSvg } from '../assets/icons/clue-types/deletion.svg';
import { ReactComponent as DoubleDefinitionSvg } from '../assets/icons/clue-types/double-definition.svg';
import { ReactComponent as HiddenWordSvg } from '../assets/icons/clue-types/hidden-word.svg';
import { ReactComponent as HomophoneSvg } from '../assets/icons/clue-types/homophone.svg';
import { ReactComponent as InitialismSvg } from '../assets/icons/clue-types/initialism.svg';
import { ReactComponent as LetterBankSvg } from '../assets/icons/clue-types/letter-bank.svg';
import { ReactComponent as ReversalSvg } from '../assets/icons/clue-types/reversal.svg';
import { ReactComponent as SpoonerismSvg } from '../assets/icons/clue-types/spoonerism.svg';
import { ReactComponent as LitSvg } from '../assets/icons/clue-types/lit.svg';
import { ReactComponent as CombinationSvg } from '../assets/icons/clue-types/combination.svg';

// Wrapper components that pass through className for styling
export const AnagramIcon = ({ className = '' }) => <AnagramSvg className={className} />;
export const CharadeIcon = ({ className = '' }) => <CharadeSvg className={className} />;
export const ContainerIcon = ({ className = '' }) => <ContainerSvg className={className} />;
export const DeletionIcon = ({ className = '' }) => <DeletionSvg className={className} />;
export const DoubleDefinitionIcon = ({ className = '' }) => <DoubleDefinitionSvg className={className} />;
export const HiddenWordIcon = ({ className = '' }) => <HiddenWordSvg className={className} />;
export const HomophoneIcon = ({ className = '' }) => <HomophoneSvg className={className} />;
export const InitialismIcon = ({ className = '' }) => <InitialismSvg className={className} />;
export const LetterBankIcon = ({ className = '' }) => <LetterBankSvg className={className} />;
export const ReversalIcon = ({ className = '' }) => <ReversalSvg className={className} />;
export const SpoonerismIcon = ({ className = '' }) => <SpoonerismSvg className={className} />;
export const LitIcon = ({ className = '' }) => <LitSvg className={className} />;
export const CombinationIcon = ({ className = '' }) => <CombinationSvg className={className} />;

// Map of type IDs to icon components
export const clueTypeIcons = {
  'anagram': AnagramIcon,
  'charade': CharadeIcon,
  'container': ContainerIcon,
  'deletion': DeletionIcon,
  'double-definition': DoubleDefinitionIcon,
  'hidden-word': HiddenWordIcon,
  'homophone': HomophoneIcon,
  'initialism': InitialismIcon,
  'letter-bank': LetterBankIcon,
  'reversal': ReversalIcon,
  'spoonerism': SpoonerismIcon,
  'lit': LitIcon,
  'combination': CombinationIcon,
};

// Helper component that renders the appropriate icon for a type
export const ClueTypeIcon = ({ type, className = '' }) => {
  const IconComponent = clueTypeIcons[type];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

export default ClueTypeIcon;
