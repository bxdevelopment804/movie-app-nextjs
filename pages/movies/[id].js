import React, { useEffect, useState, useContext } from 'react';
import Profile from '../../components/Profile';
import MovieProfile from '../../components/MovieProfile';
import NavBar from '../../components/Navbar';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// import { ReactDOM } from 'react';
import Modal from 'react-modal';
// import ModalVideo from 'react-modal-video';
// import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
// import '../../node_modules/react-modal-video/scss/modal-video.scss';

const ModalVideo = dynamic(() => import('react-modal-video'), { ssr: false });

const axios = require('axios');

// export default function IndividualMovie({ location }) {
export default function IndividualMovie() {
	const [currentPosterPath, setCurrentPosterPath] = useState('');
	const router = useRouter();
	const [tmdbId, setTmdbId] = useState();

	useEffect(() => {
		// setTmdbId(router.query.id);
		console.log('UseEffect Triggered!');
		console.log('Router ID: ' + router.query.id);
		console.log('tmdbId: ' + tmdbId);
		// console.log('location.state.tmdbId: ' + location.state.tmdbId);
		getCastInfo();
		getMovieInfo();
		getMovieRecommendations();
	}, [tmdbId, router.query.id]);
	// }, [router.query.id]);  //THIS LINE IS WORKING, DO NOT DELETE!! 4/27/22 8:25AM
	// }, [tmdbId]);
	// }, [currentPosterPath]);
	// });

	const [castList, setCastList] = useState([]);
	const [crewList, setCrewList] = useState([]);
	const [movieInfo, setMovieInfo] = useState({});
	const [director, setDirector] = useState();
	const [trailerModalIsOpen, setTrailerModalIsOpen] = useState(false);
	const [recommendations, setRecommendations] = useState([]);

	var tempCastArray = [];
	var tempCrewArray = [];
	var recommendationArray = [];

	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		},
	};

	Modal.setAppElement('#__next');

	let subtitle;

	async function getCastInfo() {
		try {
			// const castResponse = await axios.get(
			// 	'https://api.themoviedb.org/3/movie/' +
			// 		location.state.tmdbId +
			// 		'/credits?api_key=' +
			// 		`${process.env.NEXT_PUBLIC_API_KEY}` +
			// 		'&language=en-US'
			// );
			// const castResponse = await axios.get(
			// 	'https://api.themoviedb.org/3/movie/' +
			// 		number +
			// 		'/credits?api_key=' +
			// 		`${process.env.NEXT_PUBLIC_API_KEY}` +
			// 		'&language=en-US'
			// );
			const castResponse = await axios.get(
				'https://api.themoviedb.org/3/movie/' +
					router.query.id +
					'/credits?api_key=' +
					`${process.env.NEXT_PUBLIC_API_KEY}` +
					'&language=en-US'
			);

			// console.log(castResponse);

			//Below logic accounts for situations where let than 10 cast members are returned.
			// var numReturnedCast = castResponse.data.cast.length;
			// var numRenderedCast;

			// if (numReturnedCast >= 10) {
			// 	numRenderedCast = 10;
			// } else {
			// 	numRenderedCast = numReturnedCast;
			// }

			for (let i = 0; i < 10; i++) {
				if (castResponse.data.cast[i]) {
					//Makes sure there are at least 10 folks before performing the below.
					if (!castResponse.data.cast[i].profile_path) {
						let tempCastInfo = {
							name: castResponse.data.cast[i].name,
							role: castResponse.data.cast[i].character,
							photo: 'No Photo Found',
						};
						// console.log('No Photo Found: ' + castResponse.data.cast[i].name);
						tempCastArray.push(tempCastInfo);
					} else {
						let tempCastInfo = {
							name: castResponse.data.cast[i].name,
							role: castResponse.data.cast[i].character,
							photo:
								'https://image.tmdb.org/t/p/w500' +
								castResponse.data.cast[i].profile_path,
						};
						tempCastArray.push(tempCastInfo);
					}
				}
			}
			setCastList(tempCastArray);

			//Below logic accounts for situations where let than 10 crew members are returned.
			// var numReturnedCrew = castResponse.data.crew.length;
			// var numRenderedCrew;

			// if (numReturnedCrew >= 10) {
			// 	numRenderedCrew = 10;
			// } else {
			// 	numRenderedCrew = numReturnedCrew;
			// }

			for (let i = 0; i < 10; i++) {
				if (castResponse.data.crew[i]) {
					//Makes sure there are at least 10 folks before performing the below.
					if (!castResponse.data.crew[i].profile_path) {
						let tempCrewInfo = {
							name: castResponse.data.crew[i].name,
							role: castResponse.data.crew[i].job,
							photo: 'No Photo Found',
						};
						// console.log('No Photo Found: ' + castResponse.data.crew[i].name);
						tempCrewArray.push(tempCrewInfo);
					} else {
						let tempCrewInfo = {
							name: castResponse.data.crew[i].name,
							role: castResponse.data.crew[i].job,
							photo:
								'https://image.tmdb.org/t/p/w500' +
								castResponse.data.crew[i].profile_path,
						};
						tempCrewArray.push(tempCrewInfo);
					}
				}
			}
			setCrewList(tempCrewArray);

			for (let n = 0; n < castResponse.data.crew.length; n++) {
				if (castResponse.data.crew[n].job == 'Director') {
					let director = castResponse.data.crew[n].name;
					setDirector(director);
					// console.log('Director: ' + director);
				}
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function getMovieInfo() {
		try {
			// const movieResponse = await axios.get(
			// 	'https://api.themoviedb.org/3/movie/' +
			// 		location.state.tmdbId +
			// 		'?api_key=' +
			// 		`${process.env.NEXT_PUBLIC_API_KEY}` +
			// 		'&language=en-US&append_to_response=videos'
			// );
			// const movieResponse = await axios.get(
			// 	'https://api.themoviedb.org/3/movie/' +
			// 		number +
			// 		'?api_key=' +
			// 		`${process.env.NEXT_PUBLIC_API_KEY}` +
			// 		'&language=en-US&append_to_response=videos'
			// );
			const movieResponse = await axios.get(
				'https://api.themoviedb.org/3/movie/' +
					router.query.id +
					'?api_key=' +
					`${process.env.NEXT_PUBLIC_API_KEY}` +
					'&language=en-US&append_to_response=videos'
			);

			console.log(movieResponse);

			setCurrentPosterPath(
				'https://image.tmdb.org/t/p/w500/' + movieResponse.data.poster_path
			);
			console.log('Current Poster Path Updated!');

			// neededPosterPath =
			// 	'https://image.tmdb.org/t/p/w500/' + movieResponse.data.poster_path;
			// console.log('Needed Poster Path Updated!');

			let runtimeHours = Math.floor(movieResponse.data.runtime / 60);
			let runtimeMins = movieResponse.data.runtime - runtimeHours * 60;
			let releaseYear = movieResponse.data.release_date.slice(0, 4);
			var officialTrailer;
			var genres = '';

			for (let i = 0; i < movieResponse.data.videos.results.length; i++) {
				if (
					movieResponse.data.videos.results[i].name.includes(
						'Official Trailer'
					) ||
					movieResponse.data.videos.results[i].name.includes('official trailer')
				) {
					officialTrailer = movieResponse.data.videos.results[i].key;
					// console.log(
					// 	movieResponse.data.videos.results[i].name +
					// 		' official trailer: ' +
					// 		officialTrailer
					// );
					break;
				} else if (
					movieResponse.data.videos.results[i].name.includes('Trailer') ||
					movieResponse.data.videos.results[i].name.includes('trailer')
				) {
					officialTrailer = movieResponse.data.videos.results[i].key;
					// console.log(
					// 	movieResponse.data.videos.results[i].name +
					// 		' other trailer: ' +
					// 		officialTrailer
					// );
					break;
				}
			}

			var numGenres = movieResponse.data.genres.length;
			var renderedGenres;
			if (numGenres >= 3) {
				renderedGenres = 3;
			} else {
				renderedGenres = numGenres;
			}

			// console.log('numGenres: ' + numGenres);
			// console.log('renderedGenres: ' + renderedGenres);

			for (let i = 0; i < renderedGenres; i++) {
				if (i === 0) {
					genres += movieResponse.data.genres[i].name + ' | ';
					// console.log(
					// 	'MovieResponse.data.genres 1: ' + movieResponse.data.genres[i].name
					// );
				} else if (i === renderedGenres - 1) {
					genres += movieResponse.data.genres[i].name;
					// console.log(
					// 	'MovieResponse.data.genres 2: ' + movieResponse.data.genres[i].name
					// );
				} else {
					genres += movieResponse.data.genres[i].name + ' | ';
					// console.log(
					// 	'MovieResponse.data.genres 3: ' + movieResponse.data.genres[i].name
					// );
				}
			}

			// let genresString = JSON.stringify(genres, null, 4);
			// console.log('Genres String Below:');
			// console.log(genresString);

			let tempMovieObject = {
				title: movieResponse.data.title,
				overview: movieResponse.data.overview,
				length: runtimeHours + 'h ' + runtimeMins + 's',
				releaseYear: releaseYear,
				genres: genres,
				trailer: officialTrailer,
				backdrop:
					'https://image.tmdb.org/t/p/w500/' + movieResponse.data.backdrop_path,
			};
			setMovieInfo(tempMovieObject);

			let movieString = JSON.stringify(tempMovieObject, null, 4);
			console.log('Movie Object Below:');
			console.log(movieString);
		} catch (error) {
			console.error(error);
		}
	}

	async function getMovieRecommendations() {
		try {
			// const recommendationResponse = await axios.get(
			// 	'https://api.themoviedb.org/3/movie/' +
			// 		location.state.tmdbId +
			// 		'/recommendations?api_key=' +
			// 		`${process.env.NEXT_PUBLIC_API_KEY}` +
			// 		'&language=en-US&page=1'
			// );
			// const recommendationResponse = await axios.get(
			// 	'https://api.themoviedb.org/3/movie/' +
			// 		number +
			// 		'/recommendations?api_key=' +
			// 		`${process.env.NEXT_PUBLIC_API_KEY}` +
			// 		'&language=en-US&page=1'
			// );
			const recommendationResponse = await axios.get(
				'https://api.themoviedb.org/3/movie/' +
					router.query.id +
					'/recommendations?api_key=' +
					`${process.env.NEXT_PUBLIC_API_KEY}` +
					'&language=en-US&page=1'
			);

			console.log(recommendationResponse);

			for (let i = 0; i < 4; i++) {
				if (recommendationResponse.data.results[i]) {
					// if (movieResponse.data.videos.results[i].name == 'Official Trailer') {
					let tempRecommendationObject = {
						title: recommendationResponse.data.results[i].title,
						poster:
							'https://image.tmdb.org/t/p/w500/' +
							recommendationResponse.data.results[i].poster_path,
						tmdbId: recommendationResponse.data.results[i].id,
					};
					recommendationArray.push(tempRecommendationObject);
					// }
				}
			}

			if (recommendationArray.length > 0) {
				setRecommendations(recommendationArray);

				let recommendationString = JSON.stringify(recommendationArray, null, 4);
				console.log('Recommendation Array Below:');
				console.log(recommendationString);
			}
		} catch (error) {
			console.error(error);
		}
	}

	// Modal.setAppElement(`#___gatsby`);

	//Opens modal to add a city.
	function openTrailerModal() {
		setTrailerModalIsOpen(true);
	}

	// function afterOpenTrailerModal() {
	// 	UNUSED
	// }

	function closeTrailerModal() {
		setTrailerModalIsOpen(false);
	}

	function updateTmdbId(id) {
		setTmdbId(id);
		// router.query.id = id;  //This line show the right page, but does not update the URL, nor does it stay after a refresh.
		console.log('Updated TMDB ID: ' + id);
	}

	return (
		<>
			<div id='detailContainer'>
				<header
					id='detailHeader'
					// style={{ 'background-image': `url(${movieInfo.backdrop})` }}
				>
					<NavBar />
					{/* <h2>Number Context: {number}</h2>
					<h2>Router ID: {router.query.id}</h2> */}
					{/* <h2>tmdbId: {tmdbId}</h2> */}

					<div id='secondaryContainer'>
						<div
							id='backgroundImage'
							// style={{ 'background-image': `url(${movieInfo.backdrop})` }}
							style={{ backgroundImage: `url(${movieInfo.backdrop})` }}
						></div>
						<img
							id='detailPoster'
							// src={
							// 	'https://image.tmdb.org/t/p/w500/' + location.state.poster_path
							// }
							src={currentPosterPath}
							// src={neededPosterPath}
							alt='movie poster'
						/>
						<div id='movieDetailContainer'>
							<div id='detailTitle' className='movieDetailItem'>
								{movieInfo.title}
							</div>
							<div id='detailReleaseYear' className='movieDetailItem'>
								<strong>({movieInfo.releaseYear})</strong>
							</div>
							<div id='detailDirector' className='movieDetailItem'>
								Directed by <strong>{director}</strong>
							</div>
							<div id='movieLength' className='movieDetailItem'>
								{movieInfo.length}
							</div>
							<div id='movieGenres' className='movieDetailItem'>
								{movieInfo.genres}
							</div>

							{movieInfo.trailer && (
								<button
									id='movieTrailerButton'
									className='movieDetailItem'
									onClick={openTrailerModal}
								>
									Play Trailer
								</button>
							)}

							<ModalVideo
								channel='youtube'
								autoplay
								isOpen={trailerModalIsOpen}
								videoId={movieInfo.trailer}
								onClose={closeTrailerModal}
							/>
							{/* <Modal
								channel='youtube'
								autoplay
								isOpen={trailerModalIsOpen}
								videoId={movieInfo.trailer}
								style={customStyles}
								onClose={closeTrailerModal}
							/> */}

							<div id='movieDescription' className='movieDetailItem'>
								{movieInfo.overview}
							</div>
						</div>
					</div>
				</header>

				<section id='bodyContainer'>
					<span id='castList'>
						{castList.map((castMember, index) => {
							return (
								<div key={castMember.name + index}>
									<Profile {...castMember} key={castMember.name + index} />
								</div>
							);
						})}
					</span>
					<span id='crewList'>
						{crewList.map((crewMember, index) => {
							return (
								<div key={crewMember.name + index}>
									<Profile {...crewMember} key={crewMember.name + index} />
								</div>
							);
						})}
					</span>
					<h2>More Like This</h2>
					<span id='recommendationList'>
						{recommendations.map((movie) => {
							return (
								<div
									className='recommendedPosters'
									key={movie.tmdbId}
									// onClick={() => updateTmdbId(movie.tmdbId)} // Temporarily hiding, but part of current best solution.
									onClick={() =>
										router.push({
											pathname: '/movies/[id]',
											query: { id: movie.tmdbId },
										})
									}
								>
									{/* <Link
										href={{
											pathname: 'movies/[id]',
											query: { id: `${movie.tmdbId}` },
										}}
									> */}
									<MovieProfile {...movie} key={movie.tmdbId} />
									{/* <MovieProfile {...movie} /> */}
									{/* </Link> */}
								</div>
							);
						})}
					</span>
				</section>
			</div>
		</>
	);
}
