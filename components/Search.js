import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
const axios = require('axios');

// import './search.css';

const Search = () => {
	// useEffect(() => {
	// 	window.scrollTo(0, 0);
	// }, []);

	const [filteredArray, setFilteredArray] = useState([]);

	const handleSearch = (event) => {
		const searchPhrase = event.target.value;
		const newFilter = pageIndex.filter((value) => {
			return value.title.toLowerCase().includes(searchPhrase.toLowerCase());
		});
		setFilteredArray(newFilter);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		document.getElementById('inputField').focus();
	}, []);

	return (
		<div>
			<h2>Search for Recipes and Articles Below:</h2>
			<form id='inputFieldForm'>
				<label>
					<input
						id='inputField'
						type='text'
						placeholder='Enter Search Term'
						onChange={handleSearch}
					/>
				</label>
			</form>

			{filteredArray.length !== 0 && (
				<div id='searchBox'>
					{filteredArray.slice(0, 20).map((page) => {
						return (
							<React.Fragment>
								<a href={page.link}>
									<div className='searchLinks'>{page.title}</div>
								</a>
								<br />
							</React.Fragment>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Search;
