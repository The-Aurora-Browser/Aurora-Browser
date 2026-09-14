# Contributing to Aurora Browser

Thank you for considering a contribution to Aurora Browser! This guide will help you get set up, follow our workflow, and get your pull request merged quickly.

> **New to open source?** Look for issues labeled [`good first issue`](https://github.com/Draftiermovie66/Aurora-Browser/labels/good%20first%20issue) and [`help wanted`](https://github.com/Draftiermovie66/Aurora-Browser/labels/help%20wanted).

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Branching & Workflow](#branching--workflow)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Release Process](#release-process)
- [Getting Help](#getting-help)

---

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold it. Please report unacceptable behavior to the maintainers via the contact listed in [SECURITY.md](SECURITY.md).

---

## How Can I Contribute?

- **Report bugs** — Use the *Bug report* issue template; include platform, version, repro steps, and logs/screenshots.
- **Request features** — Use the *Feature request* template; describe the use case and alternatives.
- **Fix bugs / implement features** — Comment on an issue to claim it, then open a PR (see below).
- **Improve packaging** — `packages/linux/*`, `packages/macos/`, `packages/windows/` all welcome platform-specific expertise.
- **Improve docs** — README, wiki, comments, and examples.
- **Review PRs** — Helpful reviews are a contribution!

---

## Development Setup

### Prerequisites

| Tool | Version | Notes |
|---|---|---|
| Node.js | 20+ | Extension build (`extension/`) |
| npm | 9+ | Installed with Node |
| bash | 4+ | Shell scripts |
| git | 2.30+ | Version control |
| PowerShell | 5+ | Windows build only |
| Xcode CLI Tools | — | macOS `.dmg` only |
| `gh` CLI | — | Release automation only |

### Clone & Install

```bash
git clone https://github.com/Draftiermovie66/Aurora-Browser.git
cd Aurora-Browser

# Install extension deps and build
npm --prefix extension install
npm --prefix extension run build

# Verify shell scripts
bash -n scripts/build/build.sh
bash -n engine/build.sh
bash -n engine/brand.sh
bash -n engine/build-deb.sh
bash -n engine/build-rpm.sh
bash -n engine/build-appimage.sh
bash -n engine/build-exe.sh
```

### Run the Extension in Dev Mode

```bash
cd extension
npm run dev      # Vite dev server at http://localhost:5173
# Edit src/App.jsx, src/components/* — HMR is enabled
npm run build    # Production build to dist/
npm run preview  # Preview dist/ locally
```

### Build a Package Locally

```bash
VERSION=2.1.3 bash engine/build-deb.sh     # .deb
VERSION=2.1.3 bash engine/build-rpm.sh     # .rpm
VERSION=2.1.3 bash engine/build-appimage.sh # .AppImage

# Orchestrator shorthand
bash scripts/build/build.sh linux
bash scripts/build/build.sh macos      # must run on macOS
bash scripts/build/build.sh windows    # must run on Windows / powershell
```

Artifacts land in `build/`. See [`packages/linux/README.md`](packages/linux/README.md) and platform READMEs for details.

---

## Project Structure

```
VERSION                                           # single source of truth
assets/icons/aurora.png                           # canonical icon
engine/                 Build scripts: build.sh, brand.sh, packaging scripts
extension/              React new-tab (Vite). Manifest V3, newtab override.
installer/              Native Qt C++ installer
packages/linux/         Platform READMEs (debian, redhat, arch, appimage)
packages/macos/         macOS packaging
packages/windows/       Windows packaging
scripts/build/          Build orchestrator (build.sh)
scripts/checks/         Smoke tests, YAML validation
```

**Key files to know:**

- `extension/manifest.json` — MV3 new-tab override → `dist/index.html`
- `extension/vite.config.js` — `base: './'`, deterministic asset names
- `engine/build.sh` — Main build script (clone, brand, compile)
- `engine/build-deb.sh`, `engine/build-rpm.sh`, `engine/build-appimage.sh` — Package builders

---

## Branching & Workflow

1. **Fork** the repo (or create a branch if you have push access).
2. **Create a feature branch** from `main`:
   ```bash
   git checkout main
   git pull upstream main
   git checkout -b feat/short-description
   # or: fix/issue-123-short-description
   ```
   Branch naming: `feat/…`, `fix/…`, `docs/…`, `chore/…`, `packaging/…`, `extension/…`.

3. **Make focused commits** (see conventions below).
4. **Keep branch up to date**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

5. **Push and open a PR** against `main`.

---

## Commit Conventions

We follow **Conventional Commits**:

```
<type>(<scope>): <short summary>

[optional body]

[optional footer: Closes #123]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

**Scopes:** `extension`, `linux`, `debian`, `redhat`, `arch`, `appimage`, `macos`, `windows`, `build`, `release`, `docs`

**Examples:**

```
feat(extension): add keyboard shortcut palette
fix(linux): handle missing chrome-linux asset without aborting
docs(readme): add AppImage troubleshooting
chore(deps): bump vite to 6.0.1
```

- Use imperative mood (“add” not “added”).
- One logical change per commit; keep diffs reviewable (<400 lines preferred).
- Reference issues: `Closes #123` or `Fixes #123` in the footer.

---

## Pull Request Process

Before opening a PR:

- [ ] Search existing [issues](https://github.com/Draftiermovie66/Aurora-Browser/issues) and [PRs](https://github.com/Draftiermovie66/Aurora-Browser/pulls) to avoid duplication.
- [ ] Create an issue for large changes and discuss the approach first.
- [ ] Run local checks:
  ```bash
  npm --prefix extension install && npm --prefix extension run build
  for f in scripts/build/build.sh engine/build.sh engine/brand.sh engine/build-deb.sh engine/build-rpm.sh engine/build-appimage.sh engine/build-exe.sh installer/build.sh; do bash -n "$f" && echo "OK $f"; done
  ```
- [ ] Test the package you touched (install the artifact you built if possible).
- [ ] Update docs (`README.md`, `packages/linux/README.md`, etc.) if behavior or install steps changed.

When you open the PR:

1. Fill out the pull request template ( `.github/pull_request_template.md` auto-loads ).
2. Link related issues (`Closes #123`).
3. Add screenshots/recordings for UI changes (`extension/`).
4. Mark as **Draft** if not ready for review.
5. CI must pass (`build-extension` + `lint-shell-scripts`). Fix failures before requesting review.
6. At least one maintainer review is required.

After merge, delete your branch.

### What we look for in reviews

- Correctness, edge cases, and error handling
- No secrets, credentials, or absolute local paths
- Accessibility and performance for `extension/` changes
- Documentation completeness

---

## Coding Standards

Full details: [STYLEGUIDE.md](STYLEGUIDE.md)

**TL;DR:**

- **Shell** — `set -euo pipefail`, `bash -n` clean, quote variables
- **JavaScript/React** — Vite + React 18, Framer Motion for animations, keep components small
- **C# (Windows)** — follow existing `windows/src/AuroraBrowser.cs` style
- **Markdown** — wrap lines sensibly, use fenced code blocks with language tags

Run `npx --prefix extension vite build` and `bash -n` before pushing.

---

## Testing

There is no full automated test suite yet — contributions adding tests are especially welcome.

**Manual testing checklist per PR:**

- [ ] Extension builds without warnings (`npm --prefix extension run build`)
- [ ] New Tab renders correctly (if `extension/` changed) — test via `npm run preview` or installed browser
- [ ] Shell scripts pass `bash -n` and `shellcheck` (if available)
- [ ] Built package installs and launches (test at least one Linux target you modified)
- [ ] No regressions in profile isolation (`--user-data-dir` still self-contained)

If you add automated checks, document how to run them in the PR description and in `STYLEGUIDE.md`.

---

## Release Process

Releases are cut via GitHub Actions and GitHub Releases (maintainers only):

```bash
# Build all packages
bash scripts/build/build.sh linux

# Create a release (requires gh auth + push rights)
gh release create v2.1.4 --title "Aurora Browser v2.1.4" --notes "..." build/*
```

See `.github/workflows/release.yml` and `release-drafter.yml` for automation.

---

## Getting Help

- **Questions / discussion:** Open a [GitHub Discussion](https://github.com/Draftiermovie66/Aurora-Browser/discussions) or comment on a relevant issue.
- **Bugs:** Use the *Bug report* template with platform/version/repro.
- **Security:** See [SECURITY.md](SECURITY.md) — do not open public issues for vulnerabilities.

Thank you for making Aurora better! 🌟
