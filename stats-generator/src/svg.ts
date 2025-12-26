import type { GitHubStats, OverallRank, TrophyRank } from "./types";

const COLORS = {
  bg: "#0d1117",
  border: "#30363d",
  title: "#58a6ff",
  text: "#c9d1d9",
  icon: "#8b949e",
  rankS: "#FFD700",
  rankAPlus: "#E6B422",
  rankA: "#C0C0C0",
  rankBPlus: "#CD7F32",
  rankB: "#A0522D",
  rankC: "#808080",
};

const TROPHY_COLORS: Record<TrophyRank["rank"], string> = {
  SSS: "#FFD700",
  SS: "#E6B422",
  S: "#DAA520",
  AAA: "#C0C0C0",
  AA: "#A8A8A8",
  A: "#909090",
  B: "#CD7F32",
  C: "#808080",
};

function getRankColor(rank: OverallRank): string {
  const colors: Record<OverallRank, string> = {
    S: COLORS.rankS,
    "A+": COLORS.rankAPlus,
    A: COLORS.rankA,
    "B+": COLORS.rankBPlus,
    B: COLORS.rankB,
    C: COLORS.rankC,
  };
  return colors[rank];
}

export function generateStatsSvg(
  stats: GitHubStats,
  rank: OverallRank,
  username: string
): string {
  const width = 450;
  const height = 195;

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .title { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${COLORS.title}; }
    .stat-label { font: 400 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${COLORS.text}; }
    .stat-value { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${COLORS.text}; }
    .rank { font: 800 48px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${getRankColor(rank)}; }
    .rank-label { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${COLORS.icon}; }
  </style>

  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="4.5" fill="${COLORS.bg}" stroke="${COLORS.border}"/>

  <text x="25" y="35" class="title">${username}'s GitHub Stats</text>

  <!-- Stats -->
  <g transform="translate(25, 60)">
    <text x="0" y="0" class="stat-label">Total Commits:</text>
    <text x="150" y="0" class="stat-value">${stats.totalCommits.toLocaleString()}</text>

    <text x="0" y="30" class="stat-label">Total PRs:</text>
    <text x="150" y="30" class="stat-value">${stats.totalPRs.toLocaleString()}</text>

    <text x="0" y="60" class="stat-label">Total Issues:</text>
    <text x="150" y="60" class="stat-value">${stats.totalIssues.toLocaleString()}</text>

    <text x="0" y="90" class="stat-label">Total Stars:</text>
    <text x="150" y="90" class="stat-value">${stats.totalStars.toLocaleString()}</text>
  </g>

  <!-- Rank Circle -->
  <g transform="translate(${width - 80}, ${height / 2})">
    <circle cx="0" cy="0" r="40" fill="none" stroke="${getRankColor(rank)}" stroke-width="4" opacity="0.3"/>
    <text x="0" y="12" class="rank" text-anchor="middle">${rank}</text>
  </g>
</svg>`;
}

export function generateTrophiesSvg(trophies: TrophyRank[]): string {
  const trophyWidth = 120;
  const trophyHeight = 120;
  const cols = 3;
  const rows = Math.ceil(trophies.length / cols);
  const width = trophyWidth * cols;
  const height = trophyHeight * rows;

  const trophySvgs = trophies
    .map((trophy, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = col * trophyWidth;
      const y = row * trophyHeight;
      const color = TROPHY_COLORS[trophy.rank];

      return `
    <g transform="translate(${x}, ${y})">
      <rect x="5" y="5" width="${trophyWidth - 10}" height="${trophyHeight - 10}" rx="4" fill="${COLORS.bg}" stroke="${COLORS.border}"/>

      <!-- Trophy Icon -->
      <g transform="translate(${trophyWidth / 2}, 40)">
        <path d="M-15,-15 L-15,5 Q-15,15 0,20 Q15,15 15,5 L15,-15 L10,-15 L10,-20 L-10,-20 L-10,-15 Z"
              fill="none" stroke="${color}" stroke-width="2"/>
        <rect x="-8" y="20" width="16" height="5" fill="${color}"/>
        <rect x="-12" y="25" width="24" height="3" fill="${color}"/>
      </g>

      <text x="${trophyWidth / 2}" y="75" text-anchor="middle" style="font: 600 12px 'Segoe UI', Sans-Serif; fill: ${COLORS.text};">${trophy.category}</text>
      <text x="${trophyWidth / 2}" y="92" text-anchor="middle" style="font: 800 14px 'Segoe UI', Sans-Serif; fill: ${color};">${trophy.rank}</text>
      <text x="${trophyWidth / 2}" y="107" text-anchor="middle" style="font: 400 10px 'Segoe UI', Sans-Serif; fill: ${COLORS.icon};">${trophy.count.toLocaleString()}</text>
    </g>`;
    })
    .join("");

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${trophySvgs}
</svg>`;
}
