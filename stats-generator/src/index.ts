import { mkdir, writeFile } from "fs/promises";
import { fetchGitHubStats } from "./api";
import { calculateOverallRank, calculateTrophies } from "./rank";
import { generateStatsSvg, generateTrophiesSvg } from "./svg";

async function main() {
  const username = process.env.GITHUB_USERNAME || "TakumiOkayasu";
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error("GITHUB_TOKEN is required");
    process.exit(1);
  }

  console.log(`Fetching stats for ${username}...`);

  const stats = await fetchGitHubStats(username, token);
  console.log("Stats:", stats);

  const rank = calculateOverallRank(stats);
  console.log("Rank:", rank);

  const trophies = calculateTrophies(stats);
  console.log("Trophies:", trophies);

  const statsSvg = generateStatsSvg(stats, rank, username);
  const trophiesSvg = generateTrophiesSvg(trophies);

  await mkdir("dist", { recursive: true });
  await writeFile("dist/github-stats.svg", statsSvg);
  await writeFile("dist/github-trophies.svg", trophiesSvg);

  console.log("Generated: dist/github-stats.svg, dist/github-trophies.svg");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
