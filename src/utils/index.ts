import { LS_LOCALE_KEY, DEFAULT_LOCALE, SUPPORTED_LANGUAGES, LS_MODE_KEY, DEFAULT_MODE } from '@/constants';

import type { Locale, Mode } from '@/types';

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

/**
 * Retrieves the mode from localStorage — falls back
 * to the default mode if no valid mode is found.
 *
 * @returns {Mode} The stored mode or the default mode
 */
export const getStoredMode = (): Mode => {
	const mode = localStorage.getItem(LS_MODE_KEY);

	switch (mode) {
		case 'dark':
		case 'light':
		case 'system':
			return mode;
		default:
			return DEFAULT_MODE;
	}
};
