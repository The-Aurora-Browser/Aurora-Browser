export const DEFAULT_SHORTCUTS = [
  { name: 'YouTube',      url: 'https://youtube.com' },
  { name: 'GitHub',       url: 'https://github.com' },
  { name: 'Reddit',       url: 'https://reddit.com' },
  { name: 'Wikipedia',    url: 'https://wikipedia.org' },
  { name: 'Gmail',        url: 'https://mail.google.com' },
  { name: 'X',            url: 'https://x.com' },
  { name: 'Amazon',       url: 'https://amazon.com' },
  { name: 'Netflix',      url: 'https://netflix.com' },
  { name: 'Stack Overflow', url: 'https://stackoverflow.com' },
  { name: 'Discord',      url: 'https://discord.com' },
  { name: 'Twitch',       url: 'https://twitch.tv' },
  { name: 'Spotify',      url: 'https://spotify.com' },
];

const STORAGE_KEY = 'aurora_shortcuts';

export function loadShortcuts() {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    if (val) {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch { /* corrupted data */ }
  // Migrate from cookies if present
  migrateFromCookies();
  return DEFAULT_SHORTCUTS;
}

export function saveShortcuts(shortcuts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shortcuts));
  } catch { /* storage may be full */ }
}

export function resetShortcuts() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch { /* ignore */ }
}

function migrateFromCookies() {
  try {
    const match = document.cookie.match('(^|;)\\s*aurora_shortcuts\\s*=\\s*([^;]+)');
    if (match) {
      const parsed = JSON.parse(decodeURIComponent(match[2]));
      if (Array.isArray(parsed) && parsed.length > 0) {
        saveShortcuts(parsed);
        // Clear the old cookie
        document.cookie = 'aurora_shortcuts=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      }
    }
  } catch { /* no cookie to migrate */ }
}
