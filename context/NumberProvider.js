import { createContext, useState } from 'react';

export const numberContext = createContext();

const NumberProvider = (props) => {
	const [number, setNumber] = useState('Default Number Provider Text');

	return (
		<numberContext.Provider value={[number, setNumber]}>
			{props.children}
		</numberContext.Provider>
	);
};

export default NumberProvider;
