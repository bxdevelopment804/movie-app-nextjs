import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NavBar from './Navbar';
//TESTING

import Link from 'next/link';

const axios = require('axios');

const Movies = () => {
	useEffect(() => {
		getMovies();
	}, []);

	// const [randomHeroMovieId, setRandomHeroMovieId] = useState(
	// 	Math.floor(Math.random() * 968820) + 1
	// );
	const [heroMoviesObject, setHeroMoviesObject] = useState([]);
	const [trendingMoviesArray, setTrendingMoviesArray] = useState([]);
	const [popularMoviesArray, setPopularMoviesArray] = useState([]);
	const [topRatedMoviesArray, setTopRatedMoviesArray] = useState([]);
	const [comedyMoviesArray, setComedyMoviesArray] = useState([]);
	const [actionMoviesArray, setActionMoviesArray] = useState([]);
	const [romanticMoviesArray, setRomanticMoviesArray] = useState([]);
	const [crimeMoviesArray, setCrimeMoviesArray] = useState([]);
	const [horrorMoviesArray, setHorrorMoviesArray] = useState([]);
	const [animatedMoviesArray, setAnimatedMoviesArray] = useState([]);
	const router = useRouter();

	async function getMovies() {
		// console.log('randomHeroMovieId: ' + randomHeroMovieId);

		let endpoints = [
			// 'https://api.themoviedb.org/3/movie/' +
			// 	`${randomHeroMovieId}` +
			// 	'?api_key=' +
			// 	`${process.env.NEXT_PUBLIC_API_KEY}` +
			// 	'&language=en-US',
			'https://api.themoviedb.org/3/discover/movie?api_key=' +
				`${process.env.NEXT_PUBLIC_API_KEY}` +
				'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_cast=true&with_crew=true&with_watch_monetization_types=flatrate',
			'https://api.themoviedb.org/3/trending/movie/week?api_key=' +
				`${process.env.NEXT_PUBLIC_API_KEY}`,
			'https://api.themoviedb.org/3/movie/popular?api_key=' +
				`${process.env.NEXT_PUBLIC_API_KEY}` +
				'&language=en-US&page=1',
			'https://api.themoviedb.org/3/movie/top_rated?api_key=' +
				`${process.env.NEXT_PUBLIC_API_KEY}` +
				'&language=en-US&page=1',
			'https://api.themoviedb.org/3/discover/movie?api_key=' +
				`${process.env.NEXT_PUBLIC_API_KEY}` +
				'&language=en-US&sort_by=popularity.desc&page=1&with_genres=35',
			'https://api.themoviedb.org/3/discover/movie?api_key=' +
				`${process.env.NEXT_PUBLIC_API_KEY}` +
				'&language=en-US&sort_by=popularity.desc&page=1&with_genres=28',
			'https://api.themoviedb.org/3/discover/movie?api_key=' +
				`${process.env.NEXT_PUBLIC_API_KEY}` +
				'&language=en-US&sort_by=popularity.desc&page=1&with_genres=10749',
			'https://api.themoviedb.org/3/discover/movie?api_key=' +
				`${process.env.NEXT_PUBLIC_API_KEY}` +
				'&language=en-US&sort_by=popularity.desc&page=1&with_genres=80',
			'https://api.themoviedb.org/3/discover/movie?api_key=' +
				`${process.env.NEXT_PUBLIC_API_KEY}` +
				'&language=en-US&sort_by=popularity.desc&page=1&with_genres=27',
			// 'https://api.themoviedb.org/3/discover/movie?api_key=' +
			// `${process.env.NEXT_PUBLIC_API_KEY}` +
			// '&language=en-US&sort_by=popularity.desc&page=1&with_genres=99',
			'https://api.themoviedb.org/3/discover/movie?api_key=' +
				`${process.env.NEXT_PUBLIC_API_KEY}` +
				'&language=en-US&sort_by=popularity.desc&page=1&with_genres=12',
		];
		try {
			Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
				([
					{ data: hero },
					{ data: trending },
					{ data: popular },
					{ data: topRated },
					{ data: comedy },
					{ data: action },
					{ data: romantic },
					{ data: crime },
					{ data: horror },
					{ data: animated },
				]) => {
					// HERO MOVIE SECTION
					// The below gets the ID of the latest movie, and generates a random movie for the hero section of the homepage.
					// var highestId = hero.id;
					var randomId = Math.floor(Math.random() * 20);
					// console.log(randomId);
					console.log(hero);

					console.log('Testing: ' + hero.results[randomId].title);

					let heroArray = [];
					if (
						hero.results[randomId].poster_path !== null &&
						hero.results[randomId].adult === false
					) {
						var tempHeroObject = {
							title: hero.results[randomId].title,
							overview: hero.results[randomId].overview,
							popularity: hero.results[randomId].popularity,
							tmdbId: hero.results[randomId].id,
							poster_path:
								'https://image.tmdb.org/t/p/w500/' +
								hero.results[randomId].poster_path,
							// backdrop:
							// 	'https://image.tmdb.org/t/p/w500/' +
							// 	hero.results[randomId].backdrop_path,
							backdrop:
								'https://image.tmdb.org/t/p/original/' +
								hero.results[randomId].backdrop_path,
							adult: hero.results[randomId].adult,
						};
						// heroArray.push(tempHeroObject);
						setHeroMoviesObject(tempHeroObject);
					}
					// else {
					// 	randomId = Math.floor(Math.random() * 20);
					// 	let tempHeroObject = {
					// 		title: hero[randomId].title,
					// 		overview: hero[randomId].overview,
					// 		popularity: hero[randomId].popularity,
					// 		tmdbId: hero[randomId].id,
					// 		poster_path: hero[randomId].poster_path,
					// 		adult: hero[randomId].adult,
					// 	};
					// 	heroArray.push(tempHeroObject);
					// }
					// setHeroMoviesObject(heroArray);

					let heroArrayString = JSON.stringify(heroArray, null, 4);
					console.log('Hero Array Below:');
					console.log(heroArrayString);

					//TRENDING MOVIE SECTION
					//The below takes the 15 most popular trending movies, makes sure at least 10 of them has movie posters, and saves that filtered list of 10.  This helps prevent empty posters showing up on the home page.
					let trendingArray = [];
					for (let i = 0; i < 15; ++i) {
						if (
							trending.results[i].poster_path !== null &&
							trendingArray.length < 10 &&
							trending.results[i].adult === false
						) {
							let tempTrendingObject = {
								title: trending.results[i].title,
								overview: trending.results[i].overview,
								popularity: trending.results[i].popularity,
								tmdbId: trending.results[i].id,
								poster_path: trending.results[i].poster_path,
								adult: trending.results[i].adult,
							};
							trendingArray.push(tempTrendingObject);
						}
					}
					setTrendingMoviesArray(trendingArray);

					// let trendingArrayString = JSON.stringify(trendingArray, null, 4);
					// console.log('Trending Array Below:');
					// console.log(trendingArrayString);

					//POPULAR MOVIE SECTION
					//The below takes the 15 most popular movies, makes sure at least 10 of them has movie posters, and saves that filtered list of 10.  This helps prevent empty posters showing up on the home page.
					let popularArray = [];
					for (let i = 0; i < 15; ++i) {
						if (
							popular.results[i].poster_path !== null &&
							popularArray.length < 10 &&
							popular.results[i].adult === false
						) {
							let tempPopularObject = {
								title: popular.results[i].title,
								overview: popular.results[i].overview,
								popularity: popular.results[i].popularity,
								tmdbId: popular.results[i].id,
								poster_path: popular.results[i].poster_path,
								adult: popular.results[i].adult,
							};
							popularArray.push(tempPopularObject);
						}
					}
					setPopularMoviesArray(popularArray);

					// let popularArrayString = JSON.stringify(popularArray, null, 4);
					// console.log('Popular Array Below:');
					// console.log(popularArrayString);

					//TOP RATED MOVIE SECTION
					//The below takes the 15 top rated movies, makes sure at least 10 of them has movie posters, and saves that filtered list of 10.  This helps prevent empty posters showing up on the home page.
					let topRatedArray = [];
					for (let i = 0; i < 15; ++i) {
						if (
							topRated.results[i].poster_path !== null &&
							topRatedArray.length < 10 &&
							topRated.results[i].adult === false
						) {
							let tempTopRatedObject = {
								title: topRated.results[i].title,
								overview: topRated.results[i].overview,
								popularity: topRated.results[i].popularity,
								tmdbId: topRated.results[i].id,
								poster_path: topRated.results[i].poster_path,
								adult: topRated.results[i].adult,
							};
							topRatedArray.push(tempTopRatedObject);
						}
					}
					setTopRatedMoviesArray(topRatedArray);

					// let topRatedArrayString = JSON.stringify(topRatedArray, null, 4);
					// console.log('Top Rated Array Below:');
					// console.log(topRatedArrayString);

					//COMEDY MOVIE SECTION
					//The below takes the top 15 comedy movies, makes sure at least 10 of them has movie posters, and saves that filtered list of 10.  This helps prevent empty posters showing up on the home page.
					let comedyArray = [];
					for (let i = 0; i < 15; ++i) {
						if (
							comedy.results[i].poster_path !== null &&
							comedyArray.length < 10 &&
							comedy.results[i].adult === false
						) {
							let tempComedyObject = {
								title: comedy.results[i].title,
								overview: comedy.results[i].overview,
								popularity: comedy.results[i].popularity,
								tmdbId: comedy.results[i].id,
								poster_path: comedy.results[i].poster_path,
								adult: comedy.results[i].adult,
							};
							comedyArray.push(tempComedyObject);
						}
					}
					setComedyMoviesArray(comedyArray);

					// let comedyArrayString = JSON.stringify(comedyArray, null, 4);
					// console.log('Comedy Array Below:');
					// console.log(comedyArrayString);

					//ACTION MOVIE SECTION
					//The below takes the top 15 action movies, makes sure at least 10 of them has movie posters, and saves that filtered list of 10.  This helps prevent empty posters showing up on the home page.
					let actionArray = [];
					for (let i = 0; i < 15; ++i) {
						if (
							action.results[i].poster_path !== null &&
							actionArray.length < 10 &&
							action.results[i].adult === false
						) {
							let tempActionObject = {
								title: action.results[i].title,
								overview: action.results[i].overview,
								popularity: action.results[i].popularity,
								tmdbId: action.results[i].id,
								poster_path: action.results[i].poster_path,
								adult: action.results[i].adult,
							};
							actionArray.push(tempActionObject);
						}
					}
					setActionMoviesArray(actionArray);

					// let actionArrayString = JSON.stringify(actionArray, null, 4);
					// console.log('Action Array Below:');
					// console.log(actionArrayString);

					//ROMANTIC MOVIE SECTION
					//The below takes the top 15 romantic movies, makes sure at least 10 of them has movie posters, and saves that filtered list of 10.  This helps prevent empty posters showing up on the home page.
					let romanticArray = [];
					for (let i = 0; i < 15; ++i) {
						if (
							romantic.results[i].poster_path !== null &&
							romanticArray.length < 10 &&
							romantic.results[i].adult === false
						) {
							let tempRomanticObject = {
								title: romantic.results[i].title,
								overview: romantic.results[i].overview,
								popularity: romantic.results[i].popularity,
								tmdbId: romantic.results[i].id,
								poster_path: romantic.results[i].poster_path,
								adult: romantic.results[i].adult,
							};
							romanticArray.push(tempRomanticObject);
						}
					}
					setRomanticMoviesArray(romanticArray);

					// let romanticArrayString = JSON.stringify(romanticArray, null, 4);
					// console.log('Romantic Array Below:');
					// console.log(romanticArrayString);

					//CRIME MOVIE SECTION
					//The below takes the top 15 crime movies, makes sure at least 10 of them has movie posters, and saves that filtered list of 10.  This helps prevent empty posters showing up on the home page.
					let crimeArray = [];
					for (let i = 0; i < 15; ++i) {
						if (
							crime.results[i].poster_path !== null &&
							crimeArray.length < 10 &&
							crime.results[i].adult === false
						) {
							let tempCrimeObject = {
								title: crime.results[i].title,
								overview: crime.results[i].overview,
								popularity: crime.results[i].popularity,
								tmdbId: crime.results[i].id,
								poster_path: crime.results[i].poster_path,
								adult: crime.results[i].adult,
							};
							crimeArray.push(tempCrimeObject);
						}
					}
					setCrimeMoviesArray(crimeArray);

					// let crimeArrayString = JSON.stringify(crimeArray, null, 4);
					// console.log('Crime Array Below:');
					// console.log(crimeArrayString);

					//HORROR MOVIE SECTION
					//The below takes the 15 most popular horror movies, makes sure at least 10 of them has movie posters, and saves that filtered list of 10.  This helps prevent empty posters showing up on the home page.
					let horrorArray = [];
					for (let i = 0; i < 15; ++i) {
						if (
							horror.results[i].poster_path !== null &&
							horrorArray.length < 10 &&
							horror.results[i].adult === false
						) {
							let tempHorrorObject = {
								title: horror.results[i].title,
								overview: horror.results[i].overview,
								popularity: horror.results[i].popularity,
								tmdbId: horror.results[i].id,
								poster_path: horror.results[i].poster_path,
								adult: horror.results[i].adult,
							};
							horrorArray.push(tempHorrorObject);
						}
					}
					setHorrorMoviesArray(horrorArray);

					// let horrorArrayString = JSON.stringify(horrorArray, null, 4);
					// console.log('Horror Array Below:');
					// console.log(horrorArrayString);

					//ANIMATED MOVIE SECTION
					//The below takes the 15 most popular animated movies, makes sure at least 10 of them has movie posters, and saves that filtered list of 10.  This helps prevent empty posters showing up on the home page.
					let animatedArray = [];
					for (let i = 0; i < 15; ++i) {
						if (
							animated.results[i].poster_path !== null &&
							animatedArray.length < 10 &&
							animated.results[i].adult === false
						) {
							let tempAnimatedObject = {
								title: animated.results[i].title,
								overview: animated.results[i].overview,
								popularity: animated.results[i].popularity,
								tmdbId: animated.results[i].id,
								poster_path: animated.results[i].poster_path,
								adult: animated.results[i].adult,
							};
							animatedArray.push(tempAnimatedObject);
						}
					}
					setAnimatedMoviesArray(animatedArray);

					// let animatedArrayString = JSON.stringify(
					// 	animatedArray,
					// 	null,
					// 	4
					// );
					// console.log('Animated Array Below:');
					// console.log(animatedArrayString);
				}
			);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div id='moviePageContainer'>
			<div id='heroMovieContainer'>
				<div
					id='heroBackgroundImage'
					style={{ backgroundImage: `url(${heroMoviesObject.backdrop})` }}
					// style={{ backgroundImage: `url(${heroMoviesObject.poster_path})` }}
				></div>

				{/* TEMPORARILY HIDING NAVBAR UNTIL SEARCH FUNCTION IS UP AND RUNNING */}
				{/* <NavBar /> */}
				<div id='alignmentContainer'>
					<div id='heroDetailContainer'>
						<div id='heroTitle' className='heroDetailItem'>
							{heroMoviesObject.title}
						</div>
						<button
							id='heroDetailsButton'
							className='heroDetailItem'
							onClick={() =>
								router.push({
									pathname: '/movies/[id]',
									query: { id: heroMoviesObject.tmdbId },
								})
							}
						>
							Details
						</button>

						<div id='heroDescription' className='heroDetailItem'>
							{heroMoviesObject.overview}
						</div>
					</div>
				</div>

				<div id='gradientBox'></div>
			</div>

			<div id='generalMovieContainer'>
				<h2>Trending Movies</h2>
				<div id='trendingMovieContainer' className='movieContainer'>
					{trendingMoviesArray.map((movie) => {
						return (
							<div key={movie.tmdbId}>
								<Link
									key={movie.tmdbId}
									href={{
										pathname: 'movies/[id]',
										query: { id: `${movie.tmdbId}` },
									}}
									state={{
										tmdbId: `${movie.tmdbId}`,
										poster_path: `${movie.poster_path}`,
									}}
								>
									<img
										src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
										alt=''
										className='movieItem'
										key={movie.tmdbId}
									/>
								</Link>
							</div>
						);
					})}
				</div>

				<h2>Popular Movies</h2>
				<div id='popularMovieContainer' className='movieContainer'>
					{popularMoviesArray.map((movie) => {
						return (
							<div key={movie.tmdbId}>
								<Link
									key={movie.tmdbId}
									href={{
										pathname: 'movies/[id]',
										query: { id: `${movie.tmdbId}` },
									}}
									state={{
										tmdbId: `${movie.tmdbId}`,
										poster_path: `${movie.poster_path}`,
									}}
								>
									<img
										src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
										alt=''
										className='movieItem'
										key={movie.tmdbId}
									/>
								</Link>
							</div>
						);
					})}
				</div>

				<h2>Top Rated Movies</h2>
				<div id='topRatedMovieContainer' className='movieContainer'>
					{topRatedMoviesArray.map((movie) => {
						return (
							<div key={movie.tmdbId}>
								<Link
									key={movie.tmdbId}
									href={{
										pathname: 'movies/[id]',
										query: { id: `${movie.tmdbId}` },
									}}
									state={{
										tmdbId: `${movie.tmdbId}`,
										poster_path: `${movie.poster_path}`,
									}}
								>
									<img
										src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
										alt=''
										className='movieItem'
										key={movie.tmdbId}
									/>
								</Link>
							</div>
						);
					})}
				</div>

				<h2>Comedy Movies</h2>
				<div id='comedyMovieContainer' className='movieContainer'>
					{comedyMoviesArray.map((movie) => {
						return (
							<div key={movie.tmdbId}>
								<Link
									key={movie.tmdbId}
									href={{
										pathname: 'movies/[id]',
										query: { id: `${movie.tmdbId}` },
									}}
									state={{
										tmdbId: `${movie.tmdbId}`,
										poster_path: `${movie.poster_path}`,
									}}
								>
									<img
										src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
										alt=''
										className='movieItem'
										key={movie.tmdbId}
									/>
								</Link>
							</div>
						);
					})}
				</div>

				<h2>Action Movies</h2>
				<div id='actionMovieContainer' className='movieContainer'>
					{actionMoviesArray.map((movie) => {
						return (
							<div key={movie.tmdbId}>
								<Link
									key={movie.tmdbId}
									href={{
										pathname: 'movies/[id]',
										query: { id: `${movie.tmdbId}` },
									}}
									state={{
										tmdbId: `${movie.tmdbId}`,
										poster_path: `${movie.poster_path}`,
									}}
								>
									<img
										src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
										alt=''
										className='movieItem'
										key={movie.tmdbId}
									/>
								</Link>
							</div>
						);
					})}
				</div>

				<h2>Romantic Movies</h2>
				<div id='romanticMovieContainer' className='movieContainer'>
					{romanticMoviesArray.map((movie) => {
						return (
							<div key={movie.tmdbId}>
								<Link
									key={movie.tmdbId}
									href={{
										pathname: 'movies/[id]',
										query: { id: `${movie.tmdbId}` },
									}}
									state={{
										tmdbId: `${movie.tmdbId}`,
										poster_path: `${movie.poster_path}`,
									}}
								>
									<img
										src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
										alt=''
										className='movieItem'
										key={movie.tmdbId}
									/>
								</Link>
							</div>
						);
					})}
				</div>

				<h2>Crime Movies</h2>
				<div id='crimeMovieContainer' className='movieContainer'>
					{crimeMoviesArray.map((movie) => {
						return (
							<div key={movie.tmdbId}>
								<Link
									key={movie.tmdbId}
									href={{
										pathname: 'movies/[id]',
										query: { id: `${movie.tmdbId}` },
									}}
									state={{
										tmdbId: `${movie.tmdbId}`,
										poster_path: `${movie.poster_path}`,
									}}
								>
									<img
										src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
										alt=''
										className='movieItem'
										key={movie.tmdbId}
									/>
								</Link>
							</div>
						);
					})}
				</div>
				<h2>Horror Movies</h2>
				<div id='horrorMovieContainer' className='movieContainer'>
					{horrorMoviesArray.map((movie) => {
						return (
							<div key={movie.tmdbId}>
								<Link
									key={movie.tmdbId}
									href={{
										pathname: 'movies/[id]',
										query: { id: `${movie.tmdbId}` },
									}}
									state={{
										tmdbId: `${movie.tmdbId}`,
										poster_path: `${movie.poster_path}`,
									}}
								>
									<img
										src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
										alt=''
										className='movieItem'
										key={movie.tmdbId}
									/>
								</Link>
							</div>
						);
					})}
				</div>

				<h2>Animated</h2>
				<div id='animatedMovieContainer' className='movieContainer'>
					{animatedMoviesArray.map((movie) => {
						return (
							<div key={movie.tmdbId}>
								<Link
									key={movie.tmdbId}
									href={{
										pathname: 'movies/[id]',
										query: { id: `${movie.tmdbId}` },
									}}
									state={{
										tmdbId: `${movie.tmdbId}`,
										poster_path: `${movie.poster_path}`,
									}}
								>
									<img
										src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
										alt=''
										className='movieItem'
										key={movie.tmdbId}
									/>
								</Link>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Movies;
