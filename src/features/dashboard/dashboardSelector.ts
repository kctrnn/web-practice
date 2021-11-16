import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

const dashboardStatistics = (state: RootState) => state.dashboard.statistics;

// Calculate total of cart
export const totalReputation = createSelector(
  dashboardStatistics,
  ({ totalVote, totalSolution }) => {
    let total = 0;
    // 1 vote = 5r
    total += totalVote * 5;

    // 1-8 solution = 5r
    // 8-16 solution = 10r
    // 16-24 solution = 15r
    if (totalSolution > 16)
      return (total += 8 * 5 + 8 * 10 + (totalSolution - 16) * 15);

    if (totalSolution > 8) return (total += 8 * 5 + (totalSolution - 8) * 10);

    return (total += totalSolution * 5);
  }
);
