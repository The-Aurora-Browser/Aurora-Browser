# Aurora Browser for macOS (BETA)

> **Status: BETA** — This build is experimental and may change. Packaging and
> updates are works in progress. Use at your own risk, and back up your data.

## Requirements

- macOS 11.0 (Big Sur) or later
- Apple Silicon (M1/M2/M3) or Intel Mac
- The LibWeb (Ladybird) engine is compiled into the app — no download on first run

## Install

The BETA is distributed as a `.dmg`:

1. Download `Aurora-Browser-{version}-macOS.dmg` from Releases
2. Open the DMG and drag **Aurora Browser** into Applications
3. First launch: right-click the app → **Open** (macOS Gatekeeper will warn
   about the unsigned BETA build)

## Build from source

Builds must run on macOS (for `.dmg` creation):

```bash
bash engine/build.sh
```

This clones Ladybird, applies Aurora branding, compiles the engine, and
produces `build/aurora-browser-{version}-macos/Aurora Browser.app`.

To create a `.dmg`, use the release workflow (GitHub Actions) or run:

```bash
hdiutil create -volname "Aurora Browser" \
  -srcfolder "build/aurora-browser-2.1.7-macos/Aurora Browser.app" \
  -ov -format UDZO "build/Aurora-Browser-2.1.7-macOS.dmg"
```

## Structure

Inside the app bundle:

```
Aurora Browser.app/
  Contents/
    Info.plist            # patched to "Aurora Browser" / com.aurora.browser
    MacOS/ladybird        # engine binary
    Resources/            # engine resources
```

## Notes

- The engine is LibWeb (Ladybird), compiled from source — not Chromium.
- The release workflow ad-hoc signs the app (`codesign --force --deep --sign -`);
  it is not notarized yet — expected for a BETA.
- The static new-tab page (`engine/newtab/index.html`) is bundled by the
  native installer (`installer/build.sh`).