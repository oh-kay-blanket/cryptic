import React from 'react';
import { computeScoreCounts } from '../utils/dateHelpers';

const ROWS = [
  { key: 'time', modifier: 'time' },
  { key: 'guesses', modifier: 'guesses' },
  { key: 'hints', modifier: 'hints' },
];

const ScoreGrid = ({ solveTime, guesses, hints, size = 'sm', className = '' }) => {
  const counts = computeScoreCounts({ solveTime, guesses, hints });
  const SIZE = 5;

  return (
    <div className={`score-grid score-grid--${size} ${className}`.trim()}>
      {ROWS.map(({ key, modifier }) => (
        <div key={key} className='score-grid__row'>
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
