# Aurora Browser for Fedora / RHEL / RedHat

Aurora Browser packaged as a Red Hat Package Manager (`.rpm`) for Fedora,
RHEL, CentOS, Rocky, and AlmaLinux.

## Install

```bash
sudo dnf install aurora-browser-2.1.7-1.x86_64.rpm
```

For RHEL/CentOS that use `yum`:

```bash
sudo yum localinstall aurora-browser-2.1.7-1.x86_64.rpm
```

The engine is compiled into the package — no download is needed on first launch.

## Build from source

Requires `rpm-build`:

```bash
sudo dnf install rpm-build
bash engine/build.sh
bash engine/build-rpm.sh build/ladybird build 2.1.7
```

Output: `build/aurora-browser-2.1.7-1.x86_64.rpm`

## Install build dependencies

```bash
sudo dnf install rpm-build curl unzip
```

## Updating

Download the latest `.rpm` from [GitHub Releases](https://github.com/The-Aurora-Browser/Aurora-Browser/releases) and reinstall:

```bash
sudo dnf install aurora-browser-<version>-1.x86_64.rpm
```