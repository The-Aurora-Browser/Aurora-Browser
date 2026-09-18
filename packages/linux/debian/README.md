# Aurora Browser for Debian / Ubuntu

## Install

```bash
sudo dpkg -i aurora-browser_$(cat VERSION)_amd64.deb
sudo apt-get install -f
```

The browser engine is compiled from source and included in the package.

## Build from source

```bash
sudo apt install dpkg-dev fakeroot
VERSION=$(cat VERSION) bash engine/build-deb.sh
sudo dpkg -i aurora-browser_*.deb
```

## Supported versions

- Ubuntu 20.04 LTS+
- Ubuntu 22.04 LTS+
- Ubuntu 24.04 LTS+
- Any Debian-based distro (Debian 11+, Linux Mint, Pop!_OS, etc.)
