import React from 'react';
import { computeScoreCounts, formatTime } from '../utils/dateHelpers';

const ROWS = [
  { key: 'time', modifier: 'time', label: 'Time' },
  { key: 'guesses', modifier: 'guesses', label: 'Guesses' },
  { key: 'hints', modifier: 'hints', label: 'Hints' },
];

const ScoreGrid = ({ solveTime, guesses, hints, size = 'sm', showLabels = false, className = '' }) => {
  const counts = computeScoreCounts({ solveTime, guesses, hints });
  const SIZE = 5;

  const getLabel = (key, label) => {
    if (key === 'time' && solveTime != null) return formatTime(solveTime);
    return label;
  };

  // Hide time row when no solve time data exists (pre-timer clues)
  const rows = solveTime != null ? ROWS : ROWS.filter(r => r.key !== 'time');

  return (
    <div className={`score-grid score-grid--${size} ${showLabels ? 'score-grid--labeled' : ''} ${className}`.trim()}>
      {rows.map(({ key, modifier, label }) => (
        <div key={key} className='score-grid__row'>
          {showLabels && <span className='score-grid__label'>{getLabel(key, label)}</span>}
          {Array.from({ length: SIZE }, (_, i) => (
            <div
              key={i}
              className={`score-grid__cell ${
                i < counts[key]
                  ? `score-grid__cell--${modifier}`
                  : 'score-grid__cell--empty'
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ScoreGrid;
