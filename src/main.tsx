import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

import { ThemeProvider, LocaleProvider } from '@/contexts';

import '@/i18n';

import './styles/index.css';

createRoot(document.getElementById('app')!).render(
	<StrictMode>
		<Suspense>
			<ThemeProvider>
				<LocaleProvider>
					<App />
				</LocaleProvider>
			</ThemeProvider>
		</Suspense>
	</StrictMode>
);
