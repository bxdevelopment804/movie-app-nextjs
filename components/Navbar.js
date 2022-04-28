import React from 'react';
// import { Link } from 'gatsby';
import Link from 'next/link';

// import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

const NavBar = () => {
	return (
		<div id='navbarContainer'>
			{/* <Link to='/' id='homeButton'> */}
			<Link href='/' id='homeButton'>
				{/* <LocalMoviesIcon /> */}
				Home Button
			</Link>
			<section id='searchBar'>Search Bar</section>
		</div>
	);
};

export default NavBar;
