# AGENTS.md

Guidance for AI coding agents working in the Aurora Browser repository.

## Project Overview

Aurora Browser is a custom, open-source web browser built on the **Ladybird LibWeb engine** (BSD-2-Clause). It is **not** based on Chromium, Firefox, or WebKit. The browser itself is MIT-licensed.

- **Current version:** 2.1.7 (single source of truth: `VERSION` file)
- **Canonical repo:** https://github.com/The-Aurora-Browser/Aurora-Browser
- **Engine upstream:** https://github.com/LadybirdBrowser/ladybird (cloned and branded at build time)

## Repository Layout

```
engine/                    # Build system for the Ladybird engine
  build.sh                # Main build: clone Ladybird + brand + compile + package
  brand.sh                # Applies Aurora branding to a Ladybird source tree
  package.sh              # Creates a distributable directory from a built tree
  build-deb.sh            # .deb builder  (args: <ladybird-build-dir> <output-dir> <version>)
  build-rpm.sh            # .rpm builder  (args: <ladybird-build-dir> <output-dir> <version>)
  build-appimage.sh       # .AppImage builder (args: <ladybird-build-dir> <output-dir> <version>)
  build-exe.sh            # Windows zip builder (args: <ladybird-build-dir> <output-dir> <version>)
  sign.sh                 # Code signing (osslsigncode / signtool); args: [target-dir] [version]
  checksums.sh            # SHA256 checksums; args: [build-dir] [version]
  newtab/index.html       # Static new-tab page (bundled by the installer)
extension/                # React new-tab page (Vite 8, React 19, Framer Motion 13, MV3)
installer/                # Native Qt C++ installer (Qt5/Qt6 auto-detected)
packages/                 # Platform READMEs only (debian, redhat, arch, appimage, macos, windows)
scripts/build/build.sh    # Build orchestrator: {linux|macos|windows|sign|checksums|clean}
scripts/checks/           # Smoke tests, YAML validation
assets/icons/             # Aurora icons (aurora.png is canonical)
.github/workflows/        # ci.yml, package-check.yml, release.yml, release-drafter.yml
```

## Build System

### Key facts

- `engine/build.sh` reads the version from `VERSION` (override with `VERSION=x.y.z`).
- The engine is **compiled from source** — there is no prebuilt engine download and no auto-updater.
- Package builders take **three positional args**: `<ladybird-build-dir> <output-dir> <version>`.
  They expect a built Ladybird tree (produced by `engine/build.sh` into `build/ladybird`).
- Artifacts go to `build/` (gitignored).

### Typical flow

```bash
bash engine/build.sh                                   # clone + brand + compile + package
bash engine/build-deb.sh build/ladybird build 2.1.7    # .deb
bash engine/build-rpm.sh build/ladybird build 2.1.7    # .rpm
bash engine/build-appimage.sh build/ladybird build 2.1.7  # .AppImage
bash engine/build-exe.sh build/ladybird build 2.1.7    # Windows zip
bash installer/build.sh                                # native Qt installer
```

Orchestrator: `bash scripts/build/build.sh {linux|macos|windows|sign|checksums|clean}`

### Platform notes

- **Linux:** Clang 18+, CMake 3.25+, Ninja, Qt6, Rust, nasm, 30GB+ disk.
- **macOS:** Xcode CLI tools + Homebrew (cmake, ninja, qt, llvm). Release workflow ad-hoc signs the `.app`; not notarized (BETA).
- **Windows:** Native builds not supported — build inside WSL2 with Ubuntu 24.04+. The release workflow produces a zip with `.bat`/`.ps1` launchers.

## Extension (`extension/`)

- React 19 + Vite 8 + Framer Motion 13, `manifest_version: 3`, new-tab override.
- `permissions` is intentionally minimal (`storage` only). Adding permissions requires justification + `SECURITY.md` update.
- Commands: `npm --prefix extension install`, `npm --prefix extension run build`, `npm run dev` (inside `extension/`).
- Keep `base: './'` and deterministic `rollupOptions.output` in `vite.config.js`.

## Conventions

- **Commits:** Conventional Commits (`feat(scope): ...`). Scopes: `extension|linux|debian|redhat|arch|appimage|macos|windows|build|release|docs`.
- **Shell:** `set -euo pipefail`, quote all variables, pass `bash -n`, no `cd` without guard.
- **Docs:** Update `README.md` and platform READMEs when install/build behavior changes.
- **Terminology:** Product is **Aurora Browser**; engine is **LibWeb (Ladybird)**. Never describe the engine as Chromium.

## Things That Do NOT Exist (do not reference them)

- No `update.sh`, `update.ps1`, `setup-sandbox.sh`, or `launch.sh` — there is no auto-updater.
- No C# launcher (`windows/src/AuroraBrowser.cs` does not exist).
- No `macos/build.sh`, `windows/build.ps1`, or `linux/build.sh`.
- No `packages/linux/common/` directory.
- No Chromium engine of any kind.

## CI / Release

- `ci.yml`: shell lint, VERSION format check, workflow YAML validation, Ladybird clone + brand dry-run.
- `package-check.yml`: script syntax, VERSION format, YAML validation, newtab HTML check.
- `release.yml`: triggered by `v*.*.*` tags; builds Linux (tarball/.deb/.rpm/.AppImage), macOS (`.dmg`), Windows (zip); creates a GitHub Release with checksums.
- Releases are cut by maintainers via GitHub Actions + `gh release create`.

## Security

- Report vulnerabilities via private GitHub Security Advisory (see `SECURITY.md`).
- Upstream engine vulnerabilities belong to LadybirdBrowser/ladybird.