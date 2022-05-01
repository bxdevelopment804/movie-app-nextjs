import React from 'react';
import Image from 'next/image';
import defaultHeadshot from '../images/defaultHeadshot.svg';

const Profile = (props) => {
	return (
		<div id='profileContainer'>
			<div id='profileHeadshot'>
				{props.photo === 'No Photo Found' && (
					<div id='profileBlank' className='headshot'>
						<Image
							id='defaultHeadshot'
							src={defaultHeadshot}
							alt='headshot placeholder'
						/>
					</div>
				)}
				{props.photo !== 'No Photo Found' && (
					<img
						id='profilePhoto'
						className='headshot'
						src={props.photo}
						alt='head shot'
					/>
				)}
			</div>

			<h3 id='profileName'>{props.name}</h3>
			<p id='profileRole'>{props.role}</p>
		</div>
	);
};

export default Profile;
