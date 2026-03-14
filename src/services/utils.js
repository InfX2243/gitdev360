export const calculateGitDevScore = (profile, repos, activity) => {
  // ActivityScore: events in last 90 days
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  const recentEvents = activity.filter(ev => new Date(ev.created_at) >= ninetyDaysAgo);
  const activityScore = Math.min(recentEvents.length / 100, 1);

  // PopularityScore: total stars + forks
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);
  const popularityScore = Math.min((totalStars + totalForks) / 50, 1);

  // RepoScore: total repos
  const repoScore = Math.min(repos.length / 50, 1);

  // Final GitDev360 Score
  const score = (activityScore * 0.3 + popularityScore * 0.4 + repoScore * 0.3) * 100;
  return Math.round(score);
};
