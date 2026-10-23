import type { ReactNode } from 'react';

export type Size = 'sm' | 'md' | 'lg';
export type Mode = 'system' | 'light' | 'dark';
export type Locale = 'en' | 'hi' | 'ur';
export type Direction = 'ltr' | 'rtl';

export interface ThemeContextType {
	mode: Mode;
	isDarkTheme: boolean;
	updateMode: (mode: Mode) => void;
}

export interface ThemeProviderProps {
	mode?: Mode;
	children: ReactNode;
}

export interface LocaleContextType {
	locale: Locale;
	direction: Direction;
	updateLocale: (locale: Locale) => Promise<void>;
	updateDirection: (direction: Direction) => void;
}

export interface LocaleProviderProps {
	locale?: Locale;
	children: ReactNode;
	direction?: Direction;
}
