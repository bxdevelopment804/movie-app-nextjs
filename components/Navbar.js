import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { searchResultsContext } from '../context/SearchResultsProvider';

// import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

const axios = require('axios');

const NavBar = () => {
	const [query, setQuery] = useState('');
	const [userQuery, setUserQuery] = useState('');
	const [resultsArray, setResultsArray] = useState([]);
	// const searchResults = useContext(SearchResultsContext);
	const [searchResults, setSearchResults] = useContext(searchResultsContext);
	const router = useRouter();

	const handleSubmit = () => {
		// console.log('Query: ' + query);
	};

	// const handleChange = (enteredQuery) => {
	async function handleChange(enteredQuery) {
		setUserQuery(enteredQuery);
		setQuery(enteredQuery.replace(' ', '+').toLowerCase());
		// console.log('EnteredQuery: ' + enteredQuery);
		// console.log('Query: ' + query);
		// console.log('UserQuery: ' + userQuery);

		try {
			const searchResponse = await axios.get(
				'https://api.themoviedb.org/3/search/movie?api_key=' +
					`${process.env.NEXT_PUBLIC_API_KEY}` +
					'&query=' +
					enteredQuery
			);
			// console.log('Search Response: ');
			// console.log(searchResponse);
			setResultsArray(searchResponse.data.results);
			// searchResults[1](searchResponse.data.results);
			// useSearchResultsContext.SearchResultsContext[1](
			// 	searchResponse.data.results
			// );
			setSearchResults(searchResponse.data.results);

			// console.log('Results Array: ');
			// console.log(resultsArray);
			// console.log('Context Search Results: ');
			// console.log(searchResults);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div id='navbarContainer'>
			<Link href='/' id='homeButton'>
				{/* <LocalMoviesIcon /> */}
				<h2>HOME</h2>
			</Link>
			<section id='searchBar'>
				{/* <form onSubmit={handleSubmit}> */}
				<label>
					Search:{' '}
					<input
						type='text'
						// value={query}
						value={userQuery}
						placeholder=''
						onClick={() =>
							router.push({
								pathname: '/searchResults',
								// query: { id: heroMoviesObject.tmdbId },
							})
						}
						// onChange={(event) => setQuery(event.target.value)} //Updates state on pace, doesn't allow for real-time search.
						onChange={(event) => handleChange(event.target.value)}
						// onSubmit={() => handleSubmit}
					/>
				</label>
				{/* <input type='submit' value='Submit' /> */}
				{/* </form> */}
				{/* <div>Query: {query}</div> */}
			</section>
		</div>
	);
};

export default NavBar;
