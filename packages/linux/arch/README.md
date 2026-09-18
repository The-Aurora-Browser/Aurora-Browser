# Aurora Browser for Arch Linux

## Install from AUR (when published)

```bash
yay -S aurora-browser
```

## Build locally

The PKGBUILD builds the Ladybird engine from source (clone + brand + compile),
which takes **30-120 minutes** and requires the toolchain in `makedepends`
(Clang, CMake, Ninja, Qt6, Rust, nasm).

```bash
cd packages/linux/arch
makepkg -si
```

## Build from source (pre-built engine)

If you already built the engine with `engine/build.sh`, the PKGBUILD reuses
`build/aurora-browser-${pkgver}` and only packages it:

```bash
# First build the engine
bash engine/build.sh

# Then build the Arch package
cd packages/linux/arch
makepkg -si
```

## Manual install from .deb

Arch Linux can install .deb packages directly using `debtap`:

```bash
yay -S debtap
debtap build/aurora-browser_2.1.7_amd64.deb
sudo pacman -U aurora-browser-2.1.7-1-x86_64.pkg.tar.zst
```