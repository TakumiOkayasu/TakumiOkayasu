# Repository Guidelines

## Project Structure

`README.md` is the public GitHub profile. Edit it to update the introduction, project descriptions, or activity images. The Bun and TypeScript generator lives in `stats-generator/src/`. `index.ts` runs the generator, `api.ts` fetches GitHub GraphQL data, `rank.ts` scores activity, `svg.ts` renders SVGs, and `types.ts` holds shared types.

`.github/workflows/generate.yml` publishes stats, trophies, and light and dark contribution snake SVGs to the `output` branch. Change published assets through the generator or workflow.

## Local Development

Set `GITHUB_TOKEN` in your environment before running the generator. Keep the token out of tracked files and logs. `GITHUB_USERNAME` defaults to `TakumiOkayasu`.

```sh
cd stats-generator
bun install
bun run generate
```

`bun install` installs dependencies. `bun run generate` runs the TypeScript entry point and writes `dist/github-stats.svg` and `dist/github-trophies.svg` inside `stats-generator/`.

## Coding Style

Match the TypeScript source with two-space indentation, double quotes, and semicolons. Use camelCase for functions and variables, PascalCase for types, and `import type` for type-only imports. Keep profile copy in Japanese and give images descriptive alt text.

## Testing and Preview

For generator changes, run `bun run generate` and open both SVGs to check that the text and layout render as expected. For README changes, preview the rendered Markdown and verify changed links and images. Review the `link-check-results` artifact from `.github/workflows/link-check.yml` for image URL check results.

## Commits and Pull Requests

Use a short, descriptive subject with an existing prefix such as `docs:`, `feat:`, `fix:`, or `ci:`. In the pull request, explain what changed and why, link any related issue, and list the checks you ran. Include a screenshot for visible profile or SVG changes.
