import React, { useContext } from 'react';
import NavBar from '../components/Navbar';
import { searchResultsContext } from '../context/SearchResultsProvider';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function SearchResults() {
	const [searchResults, setSearchResults] = useContext(searchResultsContext);

	return (
		<section id='searchResultsPageContainer'>
			<NavBar />
			<h2 id='searchResultsHeader'>Search Results:</h2>
			<div id='searchResultsContainer' className='movieContainer'>
				{searchResults.map((movie) => {
					return (
						<div key={'Link Container' + movie.id}>
							{movie.poster_path && (
								<div key={movie.id}>
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
											src={
												'https://image.tmdb.org/t/p/w500/' + movie.poster_path
											}
											alt=''
											className='searchResult'
											key={movie.id}
										/>
									</Link>
								</div>
							)}
						</div>
					);
				})}
			</div>
			<Footer />
		</section>
	);
}
