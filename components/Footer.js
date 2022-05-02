import React from 'react';
import Image from 'next/image';
import tmdbLogo from '../images/tmdbLogo.svg';

const Footer = () => {
	return (
		<div id='footerContainer'>
			<div id='credits'>
				<i>Movie Data Provided by </i>
				<div id='logoContainer'>
					<Image id='tmdbLogo' src={tmdbLogo} alt='tmdbLogo' />
				</div>
			</div>
			<div id='signature'>
				<i>Page Created by BX Development</i>
			</div>
		</div>
	);
};

export default Footer;
