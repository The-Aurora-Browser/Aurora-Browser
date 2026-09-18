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

All builds produce artifacts into the root `build/` directory.

**Debian (.deb):**
```bash
VERSION=$(cat VERSION) bash engine/build-deb.sh
```

**RedHat / Fedora (.rpm):**
```bash
VERSION=$(cat VERSION) bash engine/build-rpm.sh
```

**Arch (PKGBUILD):**
```bash
cd packages/linux/arch && makepkg -si
```

**AppImage (universal):**
```bash
VERSION=$(cat VERSION) bash engine/build-appimage.sh
```

## Engine scripts (`engine/`)

The `engine/` directory holds the main build and packaging scripts:

- `build.sh` — clones Ladybird, applies branding, compiles
- `brand.sh` — applies Aurora Browser branding to Ladybird source
- `build-deb.sh` — builds `.deb` packages
- `build-rpm.sh` — builds `.rpm` packages
- `build-appimage.sh` — builds `.AppImage`
- `build-exe.sh` — builds Windows packages

## Engine

Aurora Browser uses the Ladybird LibWeb engine which is compiled from source during the build process. The engine binary is included in the package.
