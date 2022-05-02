import React from 'react';
import Head from 'next/head';
import Movies from '../components/Movies';

export default function Home() {
	return (
		<div id='overallAppContainer'>
			<Head>
				<title>Movie Exploration</title>
			</Head>
			<Movies />
		</div>
	);
}
