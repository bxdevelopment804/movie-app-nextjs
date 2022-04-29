import React, { useState } from 'react';
import Link from 'next/link';
// import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

const NavBar = () => {
	const [query, setQuery] = useState('');

	const handleSubmit = () => {
		// console.log('Query: ' + query);
	};

	const handleChange = () => {
		// setQuery(event.target.value);
		console.log('Query: ' + query);
	};

	return (
		<div id='navbarContainer'>
			<Link href='/' id='homeButton'>
				{/* <LocalMoviesIcon /> */}
				Home Button
			</Link>
			<section id='searchBar'>
				{/* <form onSubmit={handleSubmit}> */}
				<label>
					Name:
					<input
						type='text'
						value={query}
						onChange={(event) => setQuery(event.target.value)}
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
