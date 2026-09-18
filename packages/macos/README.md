# Aurora Browser for macOS (BETA)

> **Status: BETA** — This build is experimental and may change. Packaging and
> updates are works in progress. Use at your own risk, and back up your data.

## Requirements

- macOS 11.0 (Big Sur) or later
- Apple Silicon (M1/M2/M3) or Intel Mac

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

Outputs:
- `build/aurora-browser-{version}/Aurora Browser.app` — the app bundle
- `build/Aurora-Browser-{version}-macOS.dmg` — the installer (requires hdiutil)

## Structure

```
Aurora Browser.app/
  Contents/
    Info.plist
    MacOS/ladybird       # engine binary
    Resources/
      aurora.png         # app icon
```

## Notes

- The engine is the Ladybird LibWeb engine, compiled from source.
- No code signing or notarization yet — expected for a BETA.
- The custom new-tab React page is fully supported.
