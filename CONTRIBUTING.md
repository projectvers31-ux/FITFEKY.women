# Contributing to FITFEKY.women

Thank you for considering contributing to FitFeky. This document outlines the
guidelines for contributing to the repository.

## Code of Conduct

By participating in this project, you agree to maintain a respectful,
inclusive environment. Harassment, trolling and discrimination of any kind
will not be tolerated.

## How to contribute

### Reporting bugs

- Search the [issues](https://github.com/projectvers31-ux/FITFEKY.women/issues)
  first to avoid duplicates.
- Open a new issue with a clear title, steps to reproduce, expected vs actual
  behavior, and environment details (Node version, OS, browser).

### Suggesting features

- Open an issue describing the feature, why the site needs it, and how you'd
  implement it if you had the time.

### Submitting changes

1. Fork the repository and create a branch off `main`:
   ```bash
   git checkout -b feat/my-descriptive-branch-name
   ```
2. Make your changes, keeping the existing code style and naming conventions.
   The project uses TypeScript, Tailwind CSS and shadcn/ui components — mirror
   the surrounding code rather than introducing new patterns.
3. Do not add comments unless they clarify non-obvious logic.
4. Run the verification suite before submitting:
   ```bash
   npm run lint
   npx tsc --noEmit
   npm run build
   ```
5. Commit with a conventional message, e.g.
   `feat: add resistance band category filters` or `fix: improve quiz progress bar`.
6. Push and open a pull request against `main`, describing what changed and why.

## Branching and PR rules

- Branch names: `feat/…`, `fix/…`, `chore/…`, `docs/…`.
- Keep PRs focused — one logical change per PR.
- Squash commits into a single well-named commit if the PR contains many.

## Secrets and environments

- Never commit `.env`, `.env.local` or any real API keys. Copy
  `.env.example` → `.env.local` for local development.
- Coverage and build artifacts (`build_out.txt`, `eslint_*.txt`) are
  gitignored — do not stage them.

## Server-side code

If a change touches `/api` routes, `src/lib/db.ts` or anything running on the
server, verify behavior with a local build (`npm run build; npm run start`)
and confirm secrets are only read via `process.env`.

## Questions?

Open a discussion or community issue — we're happy to help.