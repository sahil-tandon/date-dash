# Project Instructions

## Versioning & Changelog

- **Always update `CHANGELOG.md`** when creating a new version/feature PR
- **Always bump the version in `package.json`** to match the new changelog entry
- Use [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format
- PR titles for version bumps must be prefixed with `vX.X.X:` (e.g., `v0.9.0: implement save/bookmark`)

## Git Workflow

- Never commit directly to `main` — always use `develop` branch and create a PR
- One logical change per commit, following Conventional Commits (see global CLAUDE.md)
- PR title format for releases: `vX.X.X: short description`

## Deployment

- Deployed on Vercel from `main` branch (production) and `develop` branch (preview)
- Required environment variables: `GOOGLE_API_KEY`, `MONGODB_URI`, `MONGODB_DB`
- MongoDB Atlas network access must allow `0.0.0.0/0` for Vercel's dynamic IPs
