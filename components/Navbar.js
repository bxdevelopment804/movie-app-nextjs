import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { searchResultsContext } from '../context/SearchResultsProvider';

const axios = require('axios');

const NavBar = () => {
	const [query, setQuery] = useState('');
	const [userQuery, setUserQuery] = useState('');
	const [resultsArray, setResultsArray] = useState([]);
	const [searchResults, setSearchResults] = useContext(searchResultsContext);
	const router = useRouter();

	async function handleChange(enteredQuery) {
		setUserQuery(enteredQuery);
		setQuery(enteredQuery.replace(' ', '+').toLowerCase());

		try {
			const searchResponse = await axios.get(
				'https://api.themoviedb.org/3/search/movie?api_key=' +
					`${process.env.NEXT_PUBLIC_API_KEY}` +
					'&query=' +
					enteredQuery
			);
			setResultsArray(searchResponse.data.results);
			setSearchResults(searchResponse.data.results);
		} catch (error) {
			setSearchResults(['No Results Found']);
		}
	}

	return (
		<div id='navbarContainer'>
			<Link href='/' id='homeButton'>
				<h2>HOME</h2>
			</Link>
			<section id='searchBar'>
				<label>
					Search:{' '}
					<input
						type='text'
						value={userQuery}
						placeholder=''
						onClick={() =>
							router.push({
								pathname: '/searchResults',
							})
						}
						onChange={(event) => handleChange(event.target.value)}
					/>
				</label>
			</section>
		</div>
	);
};

export default NavBar;
