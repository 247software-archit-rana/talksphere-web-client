import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import { COMMON_NAMESPACE, SUPPORTED_LANGUAGES, FALLBACK_LANGUAGE } from '@/constants';

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
	});

i18n.on('languageChanged', (lang) => {
	document.documentElement.lang = lang;
	document.documentElement.dir = i18n.dir(lang);
});

export default i18n;
