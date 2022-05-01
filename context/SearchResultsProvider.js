import { createContext, useState } from 'react';

export const searchResultsContext = createContext();

const SearchResultsProvider = (props) => {
	const [searchResults, setSearchResults] = useState([
		'Default Search Results Provider Text',
	]);

	return (
		<searchResultsContext.Provider value={[searchResults, setSearchResults]}>
			{props.children}
		</searchResultsContext.Provider>
	);
};

export default SearchResultsProvider;
