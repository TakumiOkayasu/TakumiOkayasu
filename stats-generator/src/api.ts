import type { GitHubStats } from "./types";

const GITHUB_API_URL = "https://api.github.com/graphql";

const STATS_QUERY = `
query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      totalCommitContributions
      restrictedContributionsCount
    }
    pullRequests(first: 1) {
      totalCount
    }
    issues(first: 1) {
      totalCount
    }
    followers {
      totalCount
    }
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
      totalCount
      nodes {
        stargazerCount
      }
    }
    repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
      totalCount
    }
  }
}
`;

interface GraphQLResponse {
  data: {
    user: {
      contributionsCollection: {
        totalCommitContributions: number;
        restrictedContributionsCount: number;
      };
      pullRequests: { totalCount: number };
      issues: { totalCount: number };
      followers: { totalCount: number };
      repositories: {
        totalCount: number;
        nodes: Array<{ stargazerCount: number }>;
      };
      repositoriesContributedTo: { totalCount: number };
    };
  };
}

export async function fetchGitHubStats(
  username: string,
  token: string
): Promise<GitHubStats> {
  const response = await fetch(GITHUB_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: STATS_QUERY,
      variables: { username },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const json = (await response.json()) as GraphQLResponse;
  const user = json.data.user;

  const totalStars = user.repositories.nodes.reduce(
    (sum, repo) => sum + repo.stargazerCount,
    0
  );

  return {
    totalCommits:
      user.contributionsCollection.totalCommitContributions +
      user.contributionsCollection.restrictedContributionsCount,
    totalPRs: user.pullRequests.totalCount,
    totalIssues: user.issues.totalCount,
    totalStars,
    totalReviews: 0, // GraphQL APIでは直接取得困難
    followers: user.followers.totalCount,
    repositories: user.repositories.totalCount,
  };
}
