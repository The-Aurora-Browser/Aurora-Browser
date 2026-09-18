# Aurora Browser for Arch Linux

## Install from AUR (when published)

```bash
yay -S aurora-browser
```

## Build locally

```bash
cd packages/linux/arch
makepkg -si
```

## Build from source

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