import { LS_LOCALE_KEY, DEFAULT_LOCALE, SUPPORTED_LANGUAGES } from '@/constants';

import type { Locale } from '@/types';

/**
 * Retrieves the locale from localStorage — falls back
 * to the default locale if no valid locale is found.
 *
 * @returns {Locale} The stored locale or the default locale
 */
export const getStoredLocale = (): Locale => {
	const locale = localStorage.getItem(LS_LOCALE_KEY);

	if (locale && SUPPORTED_LANGUAGES.includes(locale as Locale)) {
		return locale as Locale;
	}

	return DEFAULT_LOCALE;
};
