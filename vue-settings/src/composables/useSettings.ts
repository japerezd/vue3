import { ref, watch } from "vue";

interface GeneralSettings {
  username: string;
  email: string;
  about: string;
  gender: string;
  country: string
}

const general = ref<GeneralSettings>(
  // IIFE to initialize the data
  (() => {
  const stored = localStorage.getItem('general');

  return stored !== null
    ? JSON.parse(stored)
    : {
        about: '',
        country: 'Mexico',
        gender: 'male',
        email: '',
        username: '',
      };
})());

watch(
  general,
  (value) => {
    localStorage.setItem('general', JSON.stringify(value));
  },
  { deep: true },
);

interface NotificationsSettings {
  email: boolean;
  sms: boolean;
}

const notifications = ref<NotificationsSettings>({
  email: false,
  sms: false
});

interface PrivacySettings {
  visibility: Visibility;
  searchEngineIndexing: boolean;
}

type Visibility = 'public' | 'private';

const privacy = ref<PrivacySettings>({
  searchEngineIndexing: false,
  visibility: 'public'
});

export function useSettings() {
  return {
    general,
    notifications,
    privacy
  }
}