import { STORIES } from '../content/stories';
import { VIDA_REAL_BADGE } from '../content/missions';
import type { ProgressState } from './progress-types';

/** Pure predicate evaluation — recomputes the full set of badges the player currently qualifies for. */
export function evaluateQualifyingBadges(state: ProgressState): string[] {
  const unlocked = new Set<string>();

  const completedStories = Object.values(state.stories).filter((s) => s.completed).length;
  if (completedStories >= 1) unlocked.add('first-story');
  if (completedStories >= 5) unlocked.add('five-stories');
  if (completedStories >= STORIES.length) unlocked.add('old-testament-complete');

  if (state.streakDays >= 7) unlocked.add('streak-7');
  if (state.streakDays >= 14) unlocked.add('streak-14');
  if (state.streakDays >= 30) unlocked.add('streak-30');

  if (state.versesCollected.length >= 1) unlocked.add('first-verse');
  if (state.versesCollected.length >= 20) unlocked.add('verse-master-20');

  const strongQuizzes = state.quizHistory.filter((q) => q.score / q.total >= 0.8).length;
  if (strongQuizzes >= 10) unlocked.add('quiz-master');

  for (const [missionId, badgeId] of Object.entries(VIDA_REAL_BADGE)) {
    if (state.missions[missionId]?.completed) unlocked.add(badgeId);
  }

  if (state.usedBeforeSevenAm) unlocked.add('early-bird');

  return Array.from(unlocked);
}

export function newlyUnlockedBadges(state: ProgressState): string[] {
  const qualifying = evaluateQualifyingBadges(state);
  return qualifying.filter((id) => !state.badgesUnlocked.includes(id));
}
