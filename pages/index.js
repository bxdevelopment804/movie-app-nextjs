import React from 'react';
import Head from 'next/head';
import Movies from '../components/Movies';
import Navbar from '../components/Navbar';
// import { SearchResultsProvider } from '../context/SearchResultsProvider';

export default function Home() {
	return (
		<div id='overallAppContainer'>
			{/* <Head>
				<title>{siteTitle}</title>
			</Head> */}
			{/* <SearchResultsProvider> */}
			{/* <Navbar /> */}
			<Movies />
			{/* </SearchResultsProvider> */}
		</div>
	);
}
