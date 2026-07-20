import { DEFAULT_SETTINGS } from "../config/defaults";
import type { Settings } from "../types";

// Versioning for settings schema
const SETTINGS_VERSION = "2.0.0";

interface StoredSettings {
  version: string;
  settings: Settings;
  lastUpdated: string;
}




const SETTINGS_STORAGE_KEY = "pedro_settings";

function migrateSettings(stored: Partial<StoredSettings>): Settings {
  const defaults = { ...DEFAULT_SETTINGS };

  if (!stored.settings) {
    return defaults;
  }

  const migrated: Settings = { ...defaults };

  Object.keys(stored.settings).forEach((key) => {
    if (key in migrated) {
      // @ts-ignore
      migrated[key] = stored.settings[key];
    }
  });

  // If robot dimensions look like old inch values (< 25), reset to cm defaults
  if (migrated.rWidth < 25) migrated.rWidth = defaults.rWidth;
  if (migrated.rHeight < 25) migrated.rHeight = defaults.rHeight;

  if (
    typeof migrated.fieldMap === "string" &&
    migrated.fieldMap.startsWith("custom||")
  ) {
    const [, embeddedImage = ""] = migrated.fieldMap.split("||");
    migrated.fieldMap = "custom";
    if (embeddedImage && !migrated.customFieldImage) {
      migrated.customFieldImage = embeddedImage;
    }
  }

  if (!migrated.fieldMap) {
    migrated.fieldMap = defaults.fieldMap;
  }

  return migrated;
}

// Always start fresh — no persistence across sessions
export async function loadSettings(): Promise<Settings> {
  return { ...DEFAULT_SETTINGS };
}

export async function saveSettings(_settings: Settings): Promise<boolean> {
  return true;
}

// Reset settings to defaults
export async function resetSettings(): Promise<Settings> {
  const defaults = { ...DEFAULT_SETTINGS };
  await saveSettings(defaults);
  return defaults;
}

// Check if settings exist in localStorage
export async function settingsFileExists(): Promise<boolean> {
  return !!localStorage.getItem(SETTINGS_STORAGE_KEY);
}
