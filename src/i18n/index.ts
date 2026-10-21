import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import { LS_LOCALE_KEY, COMMON_NAMESPACE, SUPPORTED_LANGUAGES, FALLBACK_LANGUAGE } from '@/constants';

i18n.use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${namespace}/${language}.json`)))
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		ns: COMMON_NAMESPACE,
		defaultNS: COMMON_NAMESPACE,
		fallbackNS: COMMON_NAMESPACE,
		fallbackLng: FALLBACK_LANGUAGE,
		supportedLngs: SUPPORTED_LANGUAGES,
		load: 'languageOnly',
		interpolation: {
			escapeValue: false,
		},
		detection: {
			lookupLocalStorage: LS_LOCALE_KEY,
			convertDetectedLanguage: (lng) => lng.split('-')[0],
		},
	});

export default i18n;
