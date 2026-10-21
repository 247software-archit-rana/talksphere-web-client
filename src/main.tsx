import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

import { LocaleProvider } from '@/contexts';

import '@/i18n';

import './styles/index.css';

createRoot(document.getElementById('app')!).render(
	<StrictMode>
		<Suspense>
			<LocaleProvider>
				<App />
			</LocaleProvider>
		</Suspense>
	</StrictMode>
);
