# Aurora Browser for Windows

## Quick Start

1. **Extract** — Unzip the release archive to a folder of your choice.

2. **Launch** — Double-click `aurora-browser.bat` or run `aurora-browser.ps1` in PowerShell.

3. **Building from source** — Windows builds require WSL2 with Ubuntu 24.04+.

## Requirements

- Windows 10/11
- WSL2 with Ubuntu 24.04+ (for building from source)

## Building from Source

The engine must be compiled inside WSL2, but the resulting binary runs natively on Windows.

```bash
# Inside WSL2
git clone https://github.com/The-Aurora-Browser/Aurora-Browser
cd Aurora-Browser
bash engine/build.sh
```

The build output will contain `ladybird.exe` and supporting files.

## Directory Structure

```
aurora-browser/
  ladybird.exe          # Engine binary
  aurora-browser.bat    # Batch launcher
  aurora-browser.ps1    # PowerShell launcher
  aurora.png            # App icon
  version.txt           # Current version
```

## Notes

- The engine is the Ladybird LibWeb engine, compiled from source via WSL2.
- No Chromium or Firefox dependency — fully independent engine.
- The `.bat` and `.ps1` launchers provide a native Windows experience.
