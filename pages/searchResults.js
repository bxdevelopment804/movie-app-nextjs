import React, { useContext, useState } from 'react';
import NavBar from '../components/Navbar';
import { searchResultsContext } from '../context/SearchResultsProvider';
import Link from 'next/link';

export default function SearchResults() {
	// const searchResults = useContext(SearchResultsContext);
	const [searchResults, setSearchResults] = useContext(searchResultsContext);
	const [compiledSearchResults, setCompiledSearchResults] = useState(['']);
	// setCompiledSearchResults(searchResults);

	console.log('Search Results Page, Search Results Context: ');
	console.log(searchResults);
	console.log(searchResults[0].title);

	return (
		<section id='searchResultsPageContainer'>
			<NavBar />
			<div>Search Results</div>
			{/* <div>{searchResults[0].title}</div> */}
			<div id='searchResultsContainer' className='movieContainer'>
				{searchResults.map((movie) => {
					{
						/* {compiledSearchResults[0].map((movie, index) => { */
					}
					return (
						<div key={movie.id}>
							{/* <div key={movie.id} className='searchResult'> */}
							<Link
								key={movie.id}
								href={{
									pathname: 'movies/[id]',
									query: { id: `${movie.id}` },
								}}
								state={{
									tmdbId: `${movie.id}`,
									poster_path: `${movie.poster_path}`,
								}}
							>
								<img
									src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
									alt=''
									// className='movieItem'
									className='searchResult'
									key={movie.id}
								/>
							</Link>
						</div>
					);
				})}
			</div>
		</section>
	);
}
