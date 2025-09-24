import { ref, watch } from 'vue';

interface GeneralSettings {
  username: string;
  email: string;
  about: string;
  gender: string;
  country: string;
}

interface SettingsMap {
  general: GeneralSettings;
  privacy: PrivacySettings;
  notifications: NotificationsSettings;
}

type SettingsKey = keyof SettingsMap

const init = <T extends SettingsKey>(key: T, defaults: SettingsMap[T]) => {
  const stored = localStorage.getItem(key);

  return stored !== null ? JSON.parse(stored) : defaults;
};

const watcher =
  <T extends SettingsKey>(key: T) =>
  (value: SettingsMap[T]) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

const general = ref<GeneralSettings>(
  // IIFE to initialize the data
  init('general', {
    about: '',
    country: 'Mexico',
    gender: 'male',
    email: '',
    username: '',
  }),
);

watch(general, watcher('general'), { deep: true });

interface NotificationsSettings {
  email: boolean;
  sms: boolean;
}

const notifications = ref<NotificationsSettings>(
  init('notifications', {
    email: false,
    sms: false,
  }),
);

watch(notifications, watcher('notifications'), { deep: true })

interface PrivacySettings {
  visibility: Visibility;
  searchEngineIndexing: boolean;
}

type Visibility = 'public' | 'private';

const privacy = ref<PrivacySettings>(
  init('privacy', {
    searchEngineIndexing: false,
    visibility: 'public',
  }),
);

watch(privacy, watcher('privacy'), { deep: true })

export function useSettings() {
  return {
    general,
    notifications,
    privacy,
  };
}
