<p align="center">
  <img alt="Aurora+Browser" src="https://shieldcn.dev/header/gradient.svg?title=Aurora+Browser&subtitle=A+custom+open-source+web+browser+built+on+the+Ladybird+LibWeb+engine.&mode=dark&image=https%3A%2F%2Fi.ibb.co%2FtjLpHmP%2Fjay-bhadreshwara-zw-Il-z0-QRz-Y-unsplash.jpg&overlay=0.85" />
</p>

<p align="center">
    <a href="https://github.com/The-Aurora-Browser/Aurora-Browser/actions/workflows/release.yml">
        <img src="https://shieldcn.dev/badge/Build-Passing-success.svg?logo=githubactions" alt="Build">
    </a>
    <a href="https://github.com/The-Aurora-Browser/Aurora-Browser/releases">
        <img src="https://shieldcn.dev/badge/Version-2.1.7-blue.svg" alt="Version">
    </a>
    <a href="https://github.com/The-Aurora-Browser/Aurora-Browser/blob/main/LICENSE">
        <img src="https://shieldcn.dev/badge/License-MIT-green.svg" alt="License">
    </a>
    <a href="https://github.com/LadybirdBrowser/ladybird">
        <img src="https://shieldcn.dev/badge/Engine-LibWeb%20%28Ladybird%29-purple.svg" alt="Engine">
    </a>
    <a href="https://github.com/The-Aurora-Browser/Aurora-Browser/stargazers">
        <img src="https://shieldcn.dev/github/stars/The-Aurora-Browser/Aurora-Browser.svg" alt="Stars">
    </a>
    <a href="https://github.com/The-Aurora-Browser/Aurora-Browser/forks">
        <img src="https://shieldcn.dev/github/forks/The-Aurora-Browser/Aurora-Browser.svg" alt="Forks">
    </a>
    <a href="https://github.com/The-Aurora-Browser/Aurora-Browser/issues">
        <img src="https://shieldcn.dev/github/issues/The-Aurora-Browser/Aurora-Browser.svg" alt="Issues">
    </a>
    <a href="https://github.com/The-Aurora-Browser/Aurora-Browser/pulls">
        <img src="https://shieldcn.dev/github/prs/The-Aurora-Browser/Aurora-Browser.svg" alt="Pull Requests">
    </a>
    <a href="https://github.com/The-Aurora-Browser/Aurora-Browser/releases">
        <img src="https://shieldcn.dev/github/release/The-Aurora-Browser/Aurora-Browser.svg" alt="Release">
    </a>
</p>

<p align="center">
    <img src="https://shieldcn.dev/badge/Linux-supported-blue.svg?logo=linux" alt="Linux">
    <img src="https://shieldcn.dev/badge/macOS-BETA-lightgrey.svg?logo=apple" alt="macOS">
    <img src="https://shieldcn.dev/badge/Windows-BETA-lightgrey.svg?logo=windows" alt="Windows">
    <img src="https://shieldcn.dev/badge/PRs-Welcome-brightgreen.svg" alt="PRs Welcome">
</p>

---

## Architecture

```
Aurora Browser
├── engine/                    # Build system for the Ladybird engine
│   ├── build.sh              # Main build script (clone + brand + build + package)
│   ├── brand.sh              # Apply Aurora branding to Ladybird source
│   ├── package.sh            # Package built binaries for distribution
│   ├── build-deb.sh          # Build .deb package
│   ├── build-rpm.sh          # Build .rpm package
│   ├── build-appimage.sh     # Build .AppImage
│   ├── build-exe.sh          # Build Windows package
│   ├── sign.sh               # Code signing (osslsigncode / signtool)
│   ├── checksums.sh          # SHA256 checksum generation
│   └── newtab/               # Static new-tab page
│       └── index.html
├── extension/                # React new-tab page (Vite, Manifest V3)
├── installer/                # Native Qt C++ installer
├── packages/                 # Platform READMEs (debian, redhat, arch, appimage, macos, windows)
├── scripts/build/            # Build orchestrator
│   └── build.sh
├── assets/icons/             # Aurora icons
├── VERSION                   # Single source of truth: 2.1.7
├── LICENSE                   # MIT
└── README.md
```
---

## Building from Source

### Prerequisites

| Platform | Requirements |
|----------|-------------|
| Linux | Clang 18+, CMake 3.25+, Ninja, Qt6, Rust, nasm, 30GB+ disk |
| macOS | Xcode CLI tools, Homebrew (cmake, ninja, qt, llvm) |
| Windows | WSL2 with Ubuntu 24.04+ (native Windows not yet supported) |

### Build

```bash
git clone https://github.com/The-Aurora-Browser/Aurora-Browser
cd Aurora-Browser

# Linux
bash engine/build.sh

# macOS
bash engine/build.sh

# Windows (inside WSL2)
bash engine/build.sh
```

The version is read from the `VERSION` file automatically. To override:

```bash
VERSION=2.1.7 bash engine/build.sh
```

Or use the build orchestrator:

```bash
bash scripts/build/build.sh linux      # Linux
bash scripts/build/build.sh macos      # macOS (must run on macOS)
bash scripts/build/build.sh windows    # Windows (prints WSL2 instructions)
```

---
### Build Steps

1. **Clone** — Downloads Ladybird source (`git clone --depth 1`)
2. **Brand** — Applies Aurora Browser name, icons, defaults
3. **Build** — Compiles LibWeb + LibJS + UI (30-120 minutes)
4. **Package** — Creates distributable directory

---

## Code Signing

Aurora Browser uses [osslsigncode](https://github.com/mtrojnar/osslsigncode) for cross-platform code signing and [SignPath Foundation](https://signpath.org) (free for open-source projects).

```bash
# Set signing credentials
export AURORA_SIGN_CERT=/path/to/certificate.pfx
export AURORA_SIGN_PASS=your-password

# Sign all binaries in build/ (target dir + version are optional)
bash engine/sign.sh build 2.1.7
```

---

### SmartScreen Reputation

Windows SmartScreen builds reputation organically after code signing. To expedite:

1. Sign all releases with a consistent certificate (SignPath Foundation is free for OSS)
2. Always timestamp signatures (RFC 3161)
3. Publish `checksums-SHA256.txt` with every release
4. If falsely flagged, submit at https://www.microsoft.com/en-us/wdsi/filesubmission

---

## Engine: LibWeb (Ladybird)

Aurora Browser is built on [LibWeb](https://github.com/LadybirdBrowser/ladybird), the rendering engine from the Ladybird Browser project.

- **License**: BSD-2-Clause (very permissive)
- **Language**: C++23 + Rust
- **Web Standards**: HTML, CSS (Flexbox/Grid), JavaScript (ES2024+), WebGL, SVG, HTTP/3
- **Process Model**: Multi-process sandboxed (one process per tab)
- **No dependencies** on Chromium, Firefox, or WebKit

### What works
- Most websites (Gmail, GitHub, YouTube, ChatGPT, Wikipedia)
- CSS Flexbox, Grid, modern layouts
- JavaScript (ES2024+, WASM)
- HTTP/2, HTTP/3, TLS 1.3
- Basic WebGL

---

### What doesn't (yet)
- Browser extensions
- WebRTC
- WebGPU
- Advanced media codecs
- Full DevTools parity

---

## License

- **Browser**: MIT License
- **Engine (LibWeb)**: BSD-2-Clause License (Ladybird Browser Initiative)

---

## Credits

- [Ladybird Browser Initiative](https://ladybird.org) — LibWeb engine
- [Andreas Kling](https://github.com/awesomekling) — Ladybird creator
- Aurora Browser is not affiliated with the Ladybird Browser Initiative