# Aurora Browser for Linux

Aurora Browser is packaged for major Linux distro families. Choose the package type that matches your system.

## Package types

| Directory             | Distro family                                            | Package        |
|-----------------------|----------------------------------------------------------|----------------|
| `appimage/`           | Any Linux distro (universal)                             | `.AppImage`    |
| `debian/`             | Ubuntu, Debian, Linux Mint, Pop!_OS, elementaryOS        | `.deb`         |
| `redhat/`             | Fedora, RHEL, CentOS, Rocky, AlmaLinux                   | `.rpm`         |
| `arch/`               | Arch, Manjaro, EndeavourOS, Garuda                       | `PKGBUILD`     |

## Which should I use?

- **Ubuntu / Debian / Mint** → `debian/` (`.deb`)
- **Fedora / RHEL / CentOS** → `redhat/` (`.rpm`)
- **Arch / Manjaro** → `arch/` (PKGBUILD)
- **Any other distro or just want portability** → `appimage/` (`.AppImage`)

## Building

All builds produce artifacts into the root `build/` directory. The engine is
compiled from the Ladybird source tree first, then packaged.

**Debian (.deb):**
```bash
bash engine/build.sh
bash engine/build-deb.sh build/ladybird build 2.1.7
```

**RedHat / Fedora (.rpm):**
```bash
bash engine/build.sh
bash engine/build-rpm.sh build/ladybird build 2.1.7
```

**Arch (PKGBUILD):**
```bash
cd packages/linux/arch && makepkg -si
```

**AppImage (universal):**
```bash
bash engine/build.sh
bash engine/build-appimage.sh build/ladybird build 2.1.7
```

## Engine scripts (`engine/`)

The `engine/` directory holds the main build and packaging scripts:

- `build.sh` — clones Ladybird, applies branding, compiles, packages
- `brand.sh` — applies Aurora Browser branding to Ladybird source
- `package.sh` — creates a distributable directory from a built tree
- `build-deb.sh` — builds `.deb` packages
- `build-rpm.sh` — builds `.rpm` packages
- `build-appimage.sh` — builds `.AppImage`
- `build-exe.sh` — builds Windows packages

## Engine

Aurora Browser uses the Ladybird LibWeb engine which is compiled from source during the build process. The engine binary is included in the package — no download is needed on first launch.