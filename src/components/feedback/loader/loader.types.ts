import type { ReactNode, CSSProperties } from 'react';
import type { TFunction } from 'i18next';

import type { Size } from '@/types';

export type LoaderSize = 'inherit' | Size;
export type LoaderVariant = 'circle' | 'arrows' | 'custom';
export type LoaderColor = 'current' | 'primary' | 'info' | 'error' | 'success' | 'warning';

interface StyleSlots<T> {
	/** Root wrapper element */
	root?: T;
	/** Background overlay element */
	backdrop?: T;
	/** Inner layout container */
	container?: T;
	/** Loading indicator */
	indicator?: T;
	/** Description wrapper element */
	description?: T;
}

type PresetLoaderProps = {
	/**
	 * Controls the visual appearance
	 * of the loading indicator
	 *
	 * Set to `'custom'` when want to show a
	 * custom element via the `indicator` prop.
	 *
	 * @default `'circle'`
	 */
	variant?: Exclude<LoaderVariant, 'custom'>;
	indicator?: never;
};

type CustomLoaderProps = {
	variant: 'custom';
	/**
	 * Custom react element to render as the loader.
	 */
	indicator: ReactNode;
};

type LoaderBackdropProps =
	| {
			/**
			 * Overlays the loader on `children`, dimming them and
			 * blocking interaction while loading. Without it the
			 * loader renders on its own, with no wrapper.
			 *
			 * @default `false`
			 */
			backdrop: true;
			children: ReactNode;
	  }
	| {
			backdrop?: false;
			children?: never;
	  };

type LoaderFullscreenProps =
	| {
			/**
			 * Renders the loader over the whole viewport, blocking
			 * the page until the load finished. Implies `backdrop`.
			 *
			 * @default `false`
			 */
			fullscreen: true;
			/**
			 * Id of the element your app mounts on. A fullscreen loader is portalled
			 * outside it so the two are siblings, letting the app be marked `inert`
			 * making it non-interactive while the loader stays interactive.
			 *
			 * @default `'root'`
			 */
			rootElementId?: string;
	  }
	| ({
			fullscreen?: false;
			rootElementId?: never;
	  } & LoaderBackdropProps);

type CommonLoaderProps = {
	/**
	 * Controls the loader's visibility, allowing the parent to
	 * keep it mounted and toggle it with one flag instead of
	 * using conditional rendering.
	 *
	 * @default `true`
	 */
	show?: boolean;
	/**
	 * Milliseconds to wait before showing the loader, so fast
	 * responses don't cause a flash. Omit to show it instantly.
	 */
	delay?: number;
	/**
	 * Controls the size of the loader. Pick `sm`, `md` or `lg` for
	 * a fixed size or `inherit` to take the parent's font size.
	 *
	 * @default `'md'`
	 */
	size?: LoaderSize;
	/**
	 * Controls the color of the loader — `current` inherits the
	 * parent's text color, `primary` for the brand color, or
	 * one of the status colors.
	 *
	 * @default `'primary'`
	 */
	color?: LoaderColor;
	/**
	 * Message rendered alongside the indicator to give
	 * context to the wait (e.g., "loading...").
	 */
	description?: ReactNode;
	/**
	 * Custom classes you can add to the component's style
	 * slots. Appended after the component's own classes.
	 */
	classNames?: StyleSlots<string>;
	/**
	 * Custom styles you can add to the component's style slots.
	 * Applied inline, so they override the component's own.
	 */
	styles?: StyleSlots<CSSProperties>;
};

export type LoaderProps = CommonLoaderProps & (PresetLoaderProps | CustomLoaderProps) & LoaderFullscreenProps;

export type LoaderContentProps = Required<Pick<LoaderProps, 'size' | 'color'>> &
	Pick<LoaderProps, 'description' | 'styles' | 'classNames'> &
	(Required<Pick<PresetLoaderProps, 'variant'>> | CustomLoaderProps) & {
		t: TFunction;
	};
