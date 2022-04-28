import { createContext, useContext } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
	let sharedState = 'Testing Next.js Context';

	return (
		<AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
	);
}

export function useAppContext() {
	return useContext(AppContext);
}
