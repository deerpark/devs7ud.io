import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/shared/types';

const localePrefix: LocalePrefix = 'as-needed';

// Update this configuration file based on your project information
export const AppConfig = {
  name: 'DEVS7UDIO',
  locales: ['ko', 'en', 'fr'],
  defaultLocale: 'ko',
  localePrefix,
};
