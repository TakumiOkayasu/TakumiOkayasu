export interface GitHubStats {
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalStars: number;
  totalReviews: number;
  followers: number;
  repositories: number;
}

export interface TrophyRank {
  category: string;
  count: number;
  rank: "SSS" | "SS" | "S" | "AAA" | "AA" | "A" | "B" | "C";
}

export type OverallRank = "S" | "A+" | "A" | "B+" | "B" | "C";
