# Security Policy

## Supported Versions

Aurora Browser is under active development. Only the latest release line receives security updates.

| Version | Supported |
|---|---|
| `2.1.x` (latest `2.1.7`) | ✅ |
| `< 2.1` | ❌ — please upgrade |

We release patches for critical vulnerabilities as fast as possible (target: 7 days from report to fix or mitigation). Check [Releases](https://github.com/The-Aurora-Browser/Aurora-Browser/releases) for the latest version.

---

## Reporting a Vulnerability

**Please do NOT open a public GitHub issue for security vulnerabilities.** Public disclosure puts users at risk before a fix is available.

### How to Report

1. **Preferred:** Open a **private Security Advisory** via GitHub:
   - Go to [`Security` → `Report a vulnerability`](https://github.com/The-Aurora-Browser/Aurora-Browser/security/advisories/new) on this repo
2. **Alternative:** Contact the maintainers directly via the repository's GitHub organization: [`The-Aurora-Browser`](https://github.com/The-Aurora-Browser)

Include:

- Affected version(s) and platform (`.deb`/`.rpm`/AppImage/`.dmg`/Windows zip)
- Description of the vulnerability and impact
- Steps to reproduce (PoC if possible)
- Whether the issue is in:
  - the **build / packaging scripts** (`engine/*.sh`, `scripts/build/build.sh`)
  - the **native installer** (`installer/src/*`)
  - the **New Tab page** (`extension/src/*`, `engine/newtab/index.html`)
  - the **LibWeb engine** itself (we may need to defer to upstream Ladybird)
- Your preferred contact for follow-up and disclosure credit

### What to Expect

- **Acknowledgement** within **48 hours**
- **Triage & validation** within **5 business days** — we’ll confirm reproducibility and severity
- **Fix timeline** communicated after triage; critical issues are prioritized for an out-of-band release
- **Coordinated disclosure** — we’ll agree on a disclosure date and credit you if desired

We use CVSS 3.1 to prioritize. Critical/High issues (remote code execution, sandbox escape, arbitrary file write via packaging scripts, credential exposure) are treated as emergencies.

---

## Security Considerations for Users & Contributors

### Build & Engine Downloads

- `engine/build.sh` clones the Ladybird source tree and compiles it locally. **Verify** you are building from the official [LadybirdBrowser/ladybird](https://github.com/LadybirdBrowser/ladybird) repository and the official Aurora Browser repository.
- Do not run `engine/build.sh` or `installer/build.sh` with untrusted environment variables (`LADYBIRD_REPO`, `LADYBIRD_BRANCH`) — they control which source tree is cloned and built.
- Only install packages downloaded from the official [GitHub Releases](https://github.com/The-Aurora-Browser/Aurora-Browser/releases) page.

### Profile Data

- Aurora Browser stores user data (cookies, history, etc.) in the standard user-data location used by the LibWeb engine. Restrict access to your user account and do not share the profile directory between users.

### New Tab Page

- `extension/` is a Manifest V3 new-tab override with `storage` permission only. It does **not** request broad host permissions.
- `engine/newtab/index.html` is a static page bundled by the installer — it contains no scripts that fetch remote content.
- If you add new permissions in `manifest.json`, justify them in your PR and update this policy.

### Supply Chain

- `extension/package-lock.json` is committed — run `npm audit` and keep deps updated (see `.github/dependabot.yml` — weekly npm + Actions updates).
- GitHub Actions workflows are pinned to major versions (`actions/checkout@v4`, `actions/upload-artifact@v4`, `actions/download-artifact@v8`). Avoid introducing unpinned or unreviewed actions.

---

## Scope & Out-of-Scope

**In scope:**

- Remote code execution via packaged scripts or the New Tab page
- Sandbox escape / privilege escalation via the build or packaging scripts
- Arbitrary file write via packaging scripts or the installer
- Data exfiltration via the New Tab page

**Out of scope (unless chainable):**

- Social engineering, physical access
- Vulnerabilities in the upstream LibWeb engine itself — report those to the [Ladybird Browser Initiative](https://github.com/LadybirdBrowser/ladybird/security) and link the upstream advisory in your Aurora report

---

## Disclosure Policy

We practice **coordinated disclosure**:

1. Reporter submits privately → we confirm & fix
2. Fix is released and users have time to update (typically 14 days after patch release)
3. Public advisory (GitHub Security Advisory) is published with thanks to the reporter (unless they prefer anonymity)

If you have already disclosed publicly, please still report — we’ll prioritize a fix.

---

## Security Updates

- Watch releases: [GitHub Releases](https://github.com/The-Aurora-Browser/Aurora-Browser/releases) → **Watch → Custom → Releases**
- Update promptly by downloading the latest release for your platform, or rebuild from source:
  ```bash
  git clone https://github.com/The-Aurora-Browser/Aurora-Browser
  cd Aurora-Browser
  bash engine/build.sh
  ```

Thank you for helping keep Aurora Browser and its users safe!