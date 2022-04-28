import React from 'react';
// import '../styles/styles.css';

const MovieProfile = (props) => {
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

			{/* <h3 id='profileName'>{props.name}</h3>
			<p id='profileRole'>{props.role}</p> */}
		</div>
	);
};

export default MovieProfile;
