import React, { useContext, useEffect } from 'react';
import { UserContext } from '../utils/UserContext';

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

const MergePromptModal = () => {
  const { showMergePrompt, handleMergeDecision, completedClues } = useContext(UserContext);

  // Prevent background scrolling
  useEffect(() => {
    if (showMergePrompt) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showMergePrompt]);

  if (!showMergePrompt) return null;

  const localClueCount = completedClues?.length || 0;

  return (
    <div className='modal-overlay'>
      <div
        className='modal-content merge-modal bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='modal-close text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
          onClick={() => handleMergeDecision(false)}
          aria-label='Close'
        >
          <CloseIcon />
        </button>
        <div className='merge-modal-body'>
          <h2 className='merge-title'>Merge Your Progress?</h2>
          <p className='merge-description'>
            You have {localClueCount} solved {localClueCount === 1 ? 'clue' : 'clues'} on this device
            that {localClueCount === 1 ? "isn't" : "aren't"} in your account yet.
            Would you like to add {localClueCount === 1 ? 'it' : 'them'} to your account?
          </p>
          <div className='merge-buttons'>
            <button
              className='merge-btn merge-btn-primary'
              onClick={() => handleMergeDecision(true)}
            >
              Yes, merge
            </button>
            <button
              className='merge-btn merge-btn-secondary'
              onClick={() => handleMergeDecision(false)}
            >
              No, discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MergePromptModal;
