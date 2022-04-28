import React from 'react';
import Head from 'next/head';
import Movies from '../components/Movies';
// import Layout, { siteTitle } from '../components/layout';
// import utilStyles from '../styles/utils.module.css';
import Navbar from '../components/Navbar';

// import TmdbIdProvider from '../context/AppContext';

export default function Home() {
	return (
		// <Layout home>
		// <TmdbIdProvider>
		<div id='overallAppContainer'>
			{/* <Head>
				<title>{siteTitle}</title>
			</Head> */}
			<Navbar />
			<Movies />
		</div>
		// </TmdbIdProvider>
		// </Layout>
	);
}
