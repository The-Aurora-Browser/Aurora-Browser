# Aurora Browser AppImage

A portable, self-contained AppImage that runs on **any Linux distribution**
without installing dependencies.

## Run

```bash
chmod +x Aurora-Browser-2.1.7-x86_64.AppImage
./Aurora-Browser-2.1.7-x86_64.AppImage
```

On some distros you may need to enable FUSE:

```bash
sudo apt install libfuse2   # Debian/Ubuntu
sudo dnf install fuse       # Fedora
```

## Build from source

```bash
bash engine/build.sh
bash engine/build-appimage.sh build/ladybird build 2.1.7
```

The script downloads `linuxdeploy` automatically on first run and produces:

```
build/Aurora-Browser-2.1.7-x86_64.AppImage
```

## Notes

- The engine is compiled into the AppImage — no download is needed on first run.
- Store the `.AppImage` anywhere; it is fully self-contained.