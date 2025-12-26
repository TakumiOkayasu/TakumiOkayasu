# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a **GitHub Profile README** repository (`TakumiOkayasu/TakumiOkayasu`). The main content is a `README.md` that displays on the GitHub profile page, showcasing:
- Developer introduction and tech stack
- GitHub statistics (using various badge/stats services)
- Contribution snake animation

## GitHub Actions Workflows

### snake.yml
Generates contribution snake animation SVG files.
- **Trigger**: Daily at UTC 0:00, on push to main, or manual dispatch
- **Output**: Publishes SVGs to the `output` branch
- Uses `Platane/snk/svg-only@v3` to generate snake animations

### link-check.yml
Validates external image/badge URLs in README.md.
- **Trigger**: Weekly on Monday, on README.md changes, or manual dispatch
- Creates GitHub issue if broken links are detected
- Uploads check results as artifact

## Dependabot

Configured to auto-update GitHub Actions dependencies weekly with `ci:` commit prefix.

## Development Notes

- The `output` branch contains generated snake SVG files (do not edit manually)
- All external badges rely on third-party services (GitHub stats, shields.io, etc.)
- README uses various API services that may have rate limits or temporary outages
