import React from 'react';

const MovieProfile = (props) => {
	//Renders the movie icons for [id].js
	return (
		<div id='moviePosterContainer'>
			<div id='moviePoster'>
				{props.poster === 'No Photo Found' && (
					<div id='blankPoster' className='poster'>
						No Photo Found
					</div>
				)}
				{props.title !== 'No Photo Found' && (
					<img
						id='profilePhoto'
						className='poster'
						src={props.poster}
						alt='movie poster'
					/>
				)}
			</div>
		</div>
	);
};

export default MovieProfile;
