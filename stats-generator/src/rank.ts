import type { GitHubStats, OverallRank, TrophyRank } from "./types";

// github-readme-stats のランク計算を参考
// https://github.com/anuraghazra/github-readme-stats/blob/master/src/calculateRank.js
export function calculateOverallRank(stats: GitHubStats): OverallRank {
  const score =
    stats.totalCommits * 1 +
    stats.totalPRs * 2 +
    stats.totalIssues * 3 +
    stats.totalReviews * 1 +
    stats.totalStars * 5 +
    stats.followers * 1;

  // スコアに基づくランク判定
  if (score >= 10000) return "S";
  if (score >= 5000) return "A+";
  if (score >= 2000) return "A";
  if (score >= 1000) return "B+";
  if (score >= 500) return "B";
  return "C";
}

// github-profile-trophy のランク計算を参考
// https://github.com/ryo-ma/github-profile-trophy
function calculateTrophyLevel(
  count: number,
  thresholds: number[]
): TrophyRank["rank"] {
  const [sss, ss, s, aaa, aa, a, b] = thresholds;
  if (count >= sss) return "SSS";
  if (count >= ss) return "SS";
  if (count >= s) return "S";
  if (count >= aaa) return "AAA";
  if (count >= aa) return "AA";
  if (count >= a) return "A";
  if (count >= b) return "B";
  return "C";
}

export function calculateTrophies(stats: GitHubStats): TrophyRank[] {
  return [
    {
      category: "Commits",
      count: stats.totalCommits,
      rank: calculateTrophyLevel(stats.totalCommits, [
        5000, 2000, 1000, 500, 200, 100, 50,
      ]),
    },
    {
      category: "PRs",
      count: stats.totalPRs,
      rank: calculateTrophyLevel(stats.totalPRs, [
        1000, 500, 200, 100, 50, 20, 10,
      ]),
    },
    {
      category: "Issues",
      count: stats.totalIssues,
      rank: calculateTrophyLevel(stats.totalIssues, [
        500, 200, 100, 50, 20, 10, 5,
      ]),
    },
    {
      category: "Stars",
      count: stats.totalStars,
      rank: calculateTrophyLevel(stats.totalStars, [
        2000, 1000, 500, 200, 100, 50, 20,
      ]),
    },
    {
      category: "Followers",
      count: stats.followers,
      rank: calculateTrophyLevel(stats.followers, [
        1000, 500, 200, 100, 50, 20, 10,
      ]),
    },
    {
      category: "Repos",
      count: stats.repositories,
      rank: calculateTrophyLevel(stats.repositories, [
        100, 50, 30, 20, 15, 10, 5,
      ]),
    },
  ];
}
