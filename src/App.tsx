import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const App = () => {
	const { t } = useTranslation();

	useEffect(() => {
		document.title = t('TALKSPHERE_MESSAGING');
	}, [t]);

	return <>TalkSphere | Messaging</>;
};

export default App;
