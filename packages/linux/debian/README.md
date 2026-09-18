# Aurora Browser for Debian / Ubuntu

## Install

```bash
sudo dpkg -i aurora-browser_2.1.7_amd64.deb
sudo apt-get install -f
```

The engine is compiled into the package — no download is needed on first launch.

## Build from source

```bash
sudo apt install dpkg-dev fakeroot
bash engine/build.sh
bash engine/build-deb.sh build/ladybird build 2.1.7
sudo dpkg -i build/aurora-browser_2.1.7_amd64.deb
```

## Build the extension (React)

```bash
cd extension
npm install
npm run build
```

The built extension output goes to `extension/dist/`.

## Supported versions

- Ubuntu 20.04 LTS+
- Ubuntu 22.04 LTS+
- Ubuntu 24.04 LTS+
- Any Debian-based distro (Debian 11+, Linux Mint, Pop!_OS, etc.)

## Updating

Download the latest `.deb` from [GitHub Releases](https://github.com/The-Aurora-Browser/Aurora-Browser/releases) and reinstall:

```bash
sudo dpkg -i aurora-browser_<version>_amd64.deb
```