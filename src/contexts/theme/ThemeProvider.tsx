import { useState, useMemo, useEffect, useCallback } from 'react';

import ThemeContext from './ThemeContext';

import { LS_MODE_KEY } from '@/constants';
import { getStoredMode } from '@/utils';

import type { Mode, ThemeProviderProps } from '@/types';

const ThemeProvider = (props: ThemeProviderProps) => {
	const [mode, setMode] = useState<Mode>(props.mode || getStoredMode);
	const [isDarkTheme, setIsDarkTheme] = useState(() => {
		if (mode !== 'system') return mode === 'dark';
		else return window.matchMedia('(prefers-color-scheme: dark)').matches;
	});

	useEffect(() => {
		const element = document.documentElement;
		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const updateIsDarkTheme = () => setIsDarkTheme(media.matches);

		if (mode === 'system') {
			delete element.dataset.theme;
			media.addEventListener('change', updateIsDarkTheme);
		} else {
			element.dataset.theme = mode;
		}

		localStorage.setItem(LS_MODE_KEY, mode);

		return () => {
			media.removeEventListener('change', updateIsDarkTheme);
		};
	}, [mode]);

	const updateMode = useCallback((mode: Mode) => {
		let isDarkTheme: boolean;

		if (mode !== 'system') isDarkTheme = mode === 'dark';
		else isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

		setMode(mode);
		setIsDarkTheme(isDarkTheme);
	}, []);

	const contextValue = useMemo(
		() => ({
			mode,
			isDarkTheme,
			updateMode,
		}),
		[mode, isDarkTheme, updateMode]
	);

	return <ThemeContext.Provider value={contextValue}>{props.children}</ThemeContext.Provider>;
};

export default ThemeProvider;
