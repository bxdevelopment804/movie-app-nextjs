import { createContext, useState } from 'react';

export const tmdbIdContext = createContext();

const TmdbIdProvider = (props) => {
	const [tmdbId, setTmdbId] = useState(['Default TMDB ID Provider Text']);

	return (
		<tmdbIdContext.Provider value={[tmdbId, setTmdbId]}>
			{props.children}
		</tmdbIdContext.Provider>
	);
};

export default TmdbIdProvider;
