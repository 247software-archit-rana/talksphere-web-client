import { memo, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

import { DEFAULT_SIZE, DEFAULT_COLOR, DEFAULT_VARIANT, SIZE_CLASSES, BACKDROP_SIZE_CLASSES, INDICATOR_SIZE_CLASSES, DEFAULT_ROOT_ELEMENT_ID } from './loader.constant';

import type { LoaderProps, LoaderContentProps } from './loader.types';

const LoaderContent = memo((props: LoaderContentProps) => {
	const { t, size, color, styles, variant, classNames, description } = props;

	const containerClass = clsx(`ts-loader-${color} flex flex-col items-center justify-center`, SIZE_CLASSES[size], classNames?.container);
	const indicatorClass = clsx('flex h-[1em] w-[1em] items-center justify-center fill-current', INDICATOR_SIZE_CLASSES[size], classNames?.indicator);
	const descriptionClass = clsx('flex items-center justify-center text-center', classNames?.description);

	return (
		<div role='status' style={styles?.container} className={containerClass} aria-label={description ? undefined : t('LOADING')}>
			<div style={styles?.indicator} className={indicatorClass}>
				{variant === 'circle' && (
					<svg className='animate-spin' fill='currentColor' height='1em' width='1em' viewBox='0 0 32 32' aria-hidden='true'>
						<path d='M16 0.75c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0c7.042 0.001 12.75 5.71 12.75 12.751 0 3.521-1.427 6.709-3.734 9.016v0c-0.226 0.226-0.365 0.538-0.365 0.883 0 0.69 0.56 1.25 1.25 1.25 0.346 0 0.659-0.14 0.885-0.367l0-0c2.759-2.76 4.465-6.572 4.465-10.782 0-8.423-6.828-15.251-15.25-15.251h-0z' />
					</svg>
				)}
				{variant === 'arrows' && (
					<svg className='animate-spin' fill='currentColor' height='1em' width='1em' viewBox='64 64 896 896' aria-hidden='true'>
						<path d='M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z' />
					</svg>
				)}
				{variant === 'custom' && props.indicator}
			</div>
			{description && (
				<span style={styles?.description} className={descriptionClass}>
					{description}
				</span>
			)}
		</div>
	);
});

const Loader = (props: LoaderProps) => {
	const { styles, classNames, description, show: showProp = true, size = DEFAULT_SIZE, color = DEFAULT_COLOR, variant = DEFAULT_VARIANT } = props;

	const { t } = useTranslation();

	const [delay] = useState(props.delay);
	const [prevShow, setPrevShow] = useState(showProp);
	const [showLoader, setShowLoader] = useState(false);

	const timer = useRef<number>(undefined);
	const rootElementId = useRef(props.fullscreen ? props.rootElementId || DEFAULT_ROOT_ELEMENT_ID : '');

	if (prevShow !== showProp) {
		setPrevShow(showProp);
		if (!showProp) setShowLoader(false);
	}

	const show = delay ? showProp && showLoader : showProp;
	const commonProps = { t, size, color, styles, classNames, description };
	const variantProps = variant === 'custom' ? { variant, indicator: props.indicator } : { variant };
	const backdropClass = clsx(
		{ fixed: props.fullscreen, absolute: !props.fullscreen && props.backdrop },
		'inset-0 flex items-center justify-center bg-black/45',
		BACKDROP_SIZE_CLASSES[size],
		classNames?.backdrop
	);

	useEffect(() => {
		clearTimeout(timer.current);
		if (!delay || !showProp) return;

		timer.current = setTimeout(() => {
			setShowLoader(true);
		}, delay);

		return () => clearTimeout(timer.current);
	}, [showProp, delay]);

	useEffect(() => {
		if (!props.fullscreen) return;

		const app = document.getElementById(rootElementId.current);
		if (app) app.inert = show;

		return () => app?.removeAttribute('inert');
	}, [show, props.fullscreen]);

	if (props.fullscreen) {
		return (
			show &&
			createPortal(
				<div style={styles?.backdrop} className={backdropClass}>
					<LoaderContent {...commonProps} {...variantProps} />
				</div>,
				document.body
			)
		);
	}

	return (
		<>
			{props.backdrop ? (
				<div style={styles?.root} className={clsx('relative w-full', classNames?.root)} aria-busy={show}>
					{props.children && <div inert={show}>{props.children}</div>}
					{show && (
						<div style={styles?.backdrop} className={backdropClass}>
							<LoaderContent {...commonProps} {...variantProps} />
						</div>
					)}
				</div>
			) : (
				show && (
					<div style={styles?.root} className={clsx('w-fit', classNames?.root)}>
						<LoaderContent {...commonProps} {...variantProps} />
					</div>
				)
			)}
		</>
	);
};

export default memo(Loader);
