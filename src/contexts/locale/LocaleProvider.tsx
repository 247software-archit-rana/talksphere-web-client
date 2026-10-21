import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import LocaleContext from './LocaleContext';

import { getStoredLocale } from '@/utils';

import type { Locale, Direction, LocaleProviderProps } from '@/types';

const LocaleProvider = (props: LocaleProviderProps) => {
	const { i18n } = useTranslation();

	const [locale, setLocale] = useState<Locale>(props.locale || getStoredLocale);
	const [direction, setDirection] = useState<Direction>(props.direction || i18n.dir(locale));

	useEffect(() => {
		document.documentElement.lang = locale;
		document.documentElement.dir = i18n.dir(locale);
	}, [locale, i18n]);

	useEffect(() => {
		document.documentElement.dir = direction;
	}, [direction]);

	const updateLocale = useCallback(
		async (locale: Locale) => {
			try {
				await i18n.changeLanguage(locale);

				setLocale(locale);
				setDirection(i18n.dir(locale));
			} catch (error) {
				throw new Error('Locale update failed', { cause: error });
			}
		},
		[i18n]
	);

	const updateDirection = useCallback((direction: Direction) => {
		setDirection(direction);
	}, []);

	const contextValue = useMemo(
		() => ({
			locale,
			direction,
			updateLocale,
			updateDirection,
		}),
		[locale, direction, updateLocale, updateDirection]
	);

	return <LocaleContext.Provider value={contextValue}>{props.children}</LocaleContext.Provider>;
};

export default LocaleProvider;
