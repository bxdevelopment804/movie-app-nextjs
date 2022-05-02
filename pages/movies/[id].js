import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import Profile from '../../components/Profile';
import MovieProfile from '../../components/MovieProfile';
import NavBar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ModalVideo = dynamic(() => import('react-modal-video'), { ssr: false });
const axios = require('axios');

export default function IndividualMovie() {
	const [currentPosterPath, setCurrentPosterPath] = useState('');
	const router = useRouter();
	const [tmdbId, setTmdbId] = useState();

	useEffect(() => {
		getCastInfo();
		getMovieInfo();
		getMovieRecommendations();
	}, [tmdbId, router.query.id]);

	const [castList, setCastList] = useState([]);
	const [crewList, setCrewList] = useState([]);
	const [movieInfo, setMovieInfo] = useState({});
	const [director, setDirector] = useState();
	const [trailerModalIsOpen, setTrailerModalIsOpen] = useState(false);
	const [recommendations, setRecommendations] = useState([]);

	var tempCastArray = [];
	var tempCrewArray = [];
	var recommendationArray = [];

	Modal.setAppElement('#__next');

	async function getCastInfo() {
		try {
			const castResponse = await axios.get(
				'https://api.themoviedb.org/3/movie/' +
					router.query.id +
					'/credits?api_key=' +
					`${process.env.NEXT_PUBLIC_API_KEY}` +
					'&language=en-US'
			);

			for (let i = 0; i < 10; i++) {
				//Limits cast to ten.
				if (castResponse.data.cast[i]) {
					if (!castResponse.data.cast[i].profile_path) {
						let tempCastInfo = {
							name: castResponse.data.cast[i].name,
							role: castResponse.data.cast[i].character,
							photo: 'No Photo Found',
						};

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

			for (let i = 0; i < 10; i++) {
				//Limits cast to ten.
				if (castResponse.data.crew[i]) {
					if (!castResponse.data.crew[i].profile_path) {
						let tempCrewInfo = {
							name: castResponse.data.crew[i].name,
							role: castResponse.data.crew[i].job,
							photo: 'No Photo Found',
						};

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
				}
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function getMovieInfo() {
		try {
			const movieResponse = await axios.get(
				'https://api.themoviedb.org/3/movie/' +
					router.query.id +
					'?api_key=' +
					`${process.env.NEXT_PUBLIC_API_KEY}` +
					'&language=en-US&append_to_response=videos'
			);

			setCurrentPosterPath(
				'https://image.tmdb.org/t/p/w500/' + movieResponse.data.poster_path
			);

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

					break;
				} else if (
					movieResponse.data.videos.results[i].name.includes('Trailer') ||
					movieResponse.data.videos.results[i].name.includes('trailer')
				) {
					officialTrailer = movieResponse.data.videos.results[i].key;

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

			for (let i = 0; i < renderedGenres; i++) {
				if (i === 0) {
					genres += movieResponse.data.genres[i].name + ' | ';
				} else if (i === renderedGenres - 1) {
					genres += movieResponse.data.genres[i].name;
				} else {
					genres += movieResponse.data.genres[i].name + ' | ';
				}
			}

			let tempMovieObject = {
				title: movieResponse.data.title,
				overview: movieResponse.data.overview,
				length: runtimeHours + 'h ' + runtimeMins + 's',
				releaseYear: releaseYear,
				genres: genres,
				trailer: officialTrailer,
				backdrop:
					'https://image.tmdb.org/t/p/original/' +
					movieResponse.data.backdrop_path,
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
			const recommendationResponse = await axios.get(
				'https://api.themoviedb.org/3/movie/' +
					router.query.id +
					'/recommendations?api_key=' +
					`${process.env.NEXT_PUBLIC_API_KEY}` +
					'&language=en-US&page=1'
			);

			for (let i = 0; i < 4; i++) {
				if (recommendationResponse.data.results[i]) {
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
			}
		} catch (error) {
			console.error(error);
		}
	}

	//Opens movie trailer modal
	function openTrailerModal() {
		setTrailerModalIsOpen(true);
	}

	//Closes movie trailer modal
	function closeTrailerModal() {
		setTrailerModalIsOpen(false);
	}

	return (
		<div id='detailContainer'>
			<header id='detailHeader'>
				<NavBar />
				<div id='secondaryContainer'>
					<div
						id='backgroundImage'
						style={{ backgroundImage: `url(${movieInfo.backdrop})` }}
					></div>
					<img id='detailPoster' src={currentPosterPath} alt='movie poster' />
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

						<div id='movieDescription' className='movieDetailItem'>
							{movieInfo.overview}
						</div>
					</div>
				</div>
				<div id='gradientBox' className='gradientBox'></div>
			</header>

			<section id='bodyContainer'>
				<h2 className='castAndCrewHeader'>Cast</h2>
				<span id='castList'>
					{castList.map((castMember, index) => {
						return (
							<div key={castMember.name + index}>
								<Profile {...castMember} key={castMember.name + index} />
							</div>
						);
					})}
				</span>
				<h2 className='castAndCrewHeader'>Crew</h2>
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
								onClick={() =>
									router.push({
										pathname: '/movies/[id]',
										query: { id: movie.tmdbId },
									})
								}
							>
								<MovieProfile {...movie} key={movie.tmdbId} />
							</div>
						);
					})}
				</span>
			</section>
			<Footer />
		</div>
	);
}
