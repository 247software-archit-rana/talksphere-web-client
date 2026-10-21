import { createContext } from 'react';

import type { LocaleContextType } from '@/types';

const LocaleContext = createContext<LocaleContextType | null>(null);

export default LocaleContext;
