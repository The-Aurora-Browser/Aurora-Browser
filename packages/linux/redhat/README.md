# Aurora Browser for Fedora / RHEL / RedHat

Aurora Browser packaged as a Red Hat Package Manager (`.rpm`) for Fedora,
RHEL, CentOS, Rocky, and AlmaLinux.

## Install

```bash
sudo dnf install aurora-browser-$(cat VERSION)-1.x86_64.rpm
```

For RHEL/CentOS that use `yum`:

```bash
sudo yum localinstall aurora-browser-$(cat VERSION)-1.x86_64.rpm
```

The browser engine is compiled from source and included in the package.

## Build from source

Requires `rpm-build`:

```bash
sudo dnf install rpm-build
VERSION=$(cat VERSION) bash engine/build-rpm.sh
```

Output: `build/aurora-browser-$(cat VERSION)-1.x86_64.rpm`

## Install build dependencies

```bash
sudo dnf install rpm-build
```
