import type { ReactNode } from 'react';

export type Size = 'sm' | 'md' | 'lg';
export type Locale = 'en' | 'hi' | 'ur';
export type Direction = 'ltr' | 'rtl';

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
