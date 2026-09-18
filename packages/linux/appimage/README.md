# Aurora Browser AppImage

A portable, self-contained AppImage that runs on **any Linux distribution**
without installing dependencies.

## Run

```bash
chmod +x Aurora-Browser-$(cat VERSION)-x86_64.AppImage
./Aurora-Browser-$(cat VERSION)-x86_64.AppImage
```

On some distros you may need to enable FUSE:

```bash
sudo apt install libfuse2   # Debian/Ubuntu
sudo dnf install fuse       # Fedora
```

## Auto-install

The first time you run the AppImage it auto-installs itself into your desktop
session: a menu entry (`.desktop` file) and an icon are created under
`~/.local/share`. If you later move or rename the AppImage, the entry is
updated automatically on the next launch.

CLI switches:

```bash
./Aurora-Browser-$(cat VERSION)-x86_64.AppImage --aurora-help            # show options
./Aurora-Browser-$(cat VERSION)-x86_64.AppImage --aurora-no-integrate    # run w/o registering
./Aurora-Browser-$(cat VERSION)-x86_64.AppImage --aurora-uninstall       # remove menu entry + icon
```

## Build from source

```bash
VERSION=$(cat VERSION) bash engine/build-appimage.sh
```

The script downloads `linuxdeploy` automatically on first run and produces:

```
build/Aurora-Browser-$(cat VERSION)-x86_64.AppImage
```

## Notes

- The engine is compiled from source during the build process.
- Store the `.AppImage` anywhere; it carries its own launcher.
