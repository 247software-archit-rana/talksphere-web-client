import type { LoaderSize } from './loader.types';

export const DEFAULT_SIZE = 'md';
export const DEFAULT_COLOR = 'primary';
export const DEFAULT_VARIANT = 'circle';
export const DEFAULT_ROOT_ELEMENT_ID = 'root';

export const SIZE_CLASSES: Record<LoaderSize, string> = {
	sm: 'gap-2 text-base/[1]',
	md: 'gap-2.5 text-lg/[1]',
	lg: 'gap-3 text-xl/[1]',
	inherit: 'ts-loader-inherit',
} as const;

export const BACKDROP_SIZE_CLASSES: Record<LoaderSize, string> = {
	sm: 'p-2',
	md: 'p-2.5',
	lg: 'p-3',
	inherit: 'p-2.5',
} as const;

export const INDICATOR_SIZE_CLASSES: Record<LoaderSize, string> = {
	sm: 'text-lg/[1]',
	md: 'text-2xl/[1]',
	lg: 'text-3xl/[1]',
	inherit: '',
} as const;
