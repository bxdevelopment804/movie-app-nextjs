import { createContext, useContext } from 'react';

const TmdbIdContext = createContext();

export function TmdbIdProvider(props) {
	const { value, children } = props;

	return (
		<TmdbIdContext.Provider value={value}>{children}</TmdbIdContext.Provider>
	);
}

export function useTmdbIdContext() {
	return useContext(TmdbIdContext);
}
