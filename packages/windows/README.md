# Aurora Browser for Windows

> **Status: BETA** — Windows support is experimental. The engine is built for
> Linux/macOS; native Windows builds are not yet supported. Use at your own risk.

## Quick Start

1. **Download** the latest `aurora-browser-{version}-windows-x64.zip` from [GitHub Releases](https://github.com/The-Aurora-Browser/Aurora-Browser/releases).
2. **Extract** the zip to a folder of your choice.
3. **Launch** — double-click `aurora-browser.bat` (or run `aurora-browser.ps1` in PowerShell).

## Directory Structure

```
aurora-browser/
  ladybird.exe          # Engine (present if built natively)
  ladybird              # Engine (Linux binary, run inside WSL2)
  aurora-browser.bat    # Launcher (batch)
  aurora-browser.ps1    # Launcher (PowerShell)
  README.txt            # Package notes
```

## Building from Source

Native Windows builds are not yet supported. Build inside **WSL2 with Ubuntu 24.04+**:

```bash
git clone https://github.com/The-Aurora-Browser/Aurora-Browser
cd Aurora-Browser
bash engine/build.sh
```

The built binary works natively on Windows. To create the distributable zip:

```bash
bash engine/build-exe.sh build/ladybird build 2.1.7
```

Output: `build/aurora-browser-2.1.7-windows-x64.zip`

The release workflow (GitHub Actions) also produces the Windows zip automatically.

## Notes

- The engine is LibWeb (Ladybird), compiled from source — not Chromium.
- The `.bat`/`.ps1` launchers start `ladybird.exe` if present, otherwise they
  point you to the WSL2 build instructions.
- There is no auto-updater yet — download new releases from GitHub Releases.